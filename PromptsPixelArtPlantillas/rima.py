"""Rima castellana, aproximación honesta.

Comparar las dos últimas vocales solo vale para palabras llanas: marcaba
`avanzar`/`mirar` como que no rimaban, cuando es rima consonante perfecta. En
castellano la rima se mide desde la última vocal TÓNICA.

Tres reglas que hay que respetar o el resultado es basura:
  - la u de gue, gui, que, qui es muda y no cuenta como vocal
  - dentro de un diptongo la tónica es la vocal fuerte (a, e, o), no la primera
  - sin tilde: llana si termina en vocal, n o s; aguda en cualquier otro caso
"""

import re

VOC = "aeiouáéíóúü"
SIN_TILDE = str.maketrans("áéíóúü", "aeiouu")


def diptongo(a: str, b: str) -> bool:
    """Dos vocales solo van juntas si al menos una es debil y sin tilde.

    a+e, e+o, o+a son hiatos (pe-a-je, tres silabas), y una i o u con tilde
    rompe el diptongo (dia vs di-a). Agruparlas movia la tonica un lugar, y en la
    asonancia reducia `ae` de `cae` a una sola vocal.
    """
    if a in "íú" or b in "íú":
        return False
    return not (a in "aeoáéó" and b in "aeoáéó")


def _grupos(palabra: str) -> list[tuple[int, str]]:
    """Vocales de la palabra agrupadas por silaba."""
    grupos, i = [], 0
    while i < len(palabra):
        if palabra[i] in VOC:
            ini = i
            while (i + 1 < len(palabra) and palabra[i + 1] in VOC
                   and diptongo(palabra[i], palabra[i + 1])):
                i += 1
            grupos.append((ini, palabra[ini:i + 1]))
        i += 1
    return grupos


def _normalizar(palabra: str) -> str:
    """Borra la u muda de gue/gui/que/qui escribiendo el sonido: que -> ke.

    Marcarla y restaurarla despues la devolvia a la cadena, y la asonancia la
    contaba como vocal: `toque` daba o-u-e y dejaba de rimar con `roble`.
    La u de gue/gui con dieresis (`ü`) si suena, y por eso no entra aqui.
    """
    p = palabra.lower()
    p = re.sub(r"qu([eéií])", r"k\1", p)
    return re.sub(r"gu([eéií])", r"g\1", p)


def _tonica(palabra: str) -> int:
    """Índice de la vocal tónica sobre la palabra normalizada."""
    grupos = _grupos(palabra)
    if not grupos:
        return -1

    def nucleo(g):
        ini, letras = g
        for j, c in enumerate(letras):
            if c in "áéíóú":
                return ini + j
        for j, c in enumerate(letras):
            if c in "aeo":
                return ini + j
        return ini + len(letras) - 1

    acentuado = [k for k, (_, letras) in enumerate(grupos) if any(c in "áéíóú" for c in letras)]
    if acentuado:
        return nucleo(grupos[acentuado[-1]])
    if palabra[-1] in "aeiouns" and len(grupos) >= 2:
        return nucleo(grupos[-2])
    return nucleo(grupos[-1])


def desde_tonica(palabra: str, sin_tilde: bool = True) -> str:
    """Cola de la palabra desde su vocal tonica.

    Devuelve la cola CON tildes cuando `sin_tilde` es False: la asonancia las
    necesita, porque una i o u acentuada marca hiato (`habia` suena i-a, no a) y
    quitarlas antes de medir hacia que `habia` dejara de rimar con `avenida`.
    """
    p = _normalizar(palabra)
    i = _tonica(p)
    cola = p if i < 0 else p[i:]
    return cola.translate(SIN_TILDE) if sin_tilde else cola


def vocales_asonancia(cola: str) -> str:
    """Vocales que cuentan para la asonancia, una por silaba.

    En un diptongo solo suena el nucleo: `cauta` asona en a-a, no en a-u-a, y por
    eso rima con `falta`. Contar las dos vocales marcaba como fallo rimas validas
    (`sitio`/`requisito`, `cae`/`aire`).
    """
    nucleos = []
    for _, grupo in _grupos(cola):
        fuerte = [c for c in grupo if c in "aeoáéó"]
        nucleos.append(fuerte[0] if fuerte else grupo[-1])
    return "".join(nucleos).translate(SIN_TILDE)


def riman(a: str, b: str, asonante: bool = True) -> bool:
    if desde_tonica(a) == desde_tonica(b):
        return True
    if not asonante:
        return False
    va = vocales_asonancia(desde_tonica(a, sin_tilde=False))
    vb = vocales_asonancia(desde_tonica(b, sin_tilde=False))
    return bool(va) and va == vb


def ultima_palabra(verso: str) -> str:
    """Palabra final del verso, ignorando placeholders tipo {APODO_X}."""
    limpio = re.sub(r"\{[A-Z_]+\}", " ", verso)
    p = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", limpio)
    return p[-1].lower() if p else ""
