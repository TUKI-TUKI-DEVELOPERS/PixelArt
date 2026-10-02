"""Paso 3.bis — las comprobaciones que delatan un poema de fórmula.

Mide la rima con rima.py (desde la vocal tónica), no con las dos últimas vocales:
`avanzar`/`mirar` es rima consonante perfecta y el método viejo la marcaba como fallo.
"""

import argparse
import importlib.util
from collections import Counter
from pathlib import Path

from rima import desde_tonica, riman, ultima_palabra

ROOT = Path(__file__).resolve().parent

parser = argparse.ArgumentParser()
parser.add_argument("folder")
args = parser.parse_args()

spec = importlib.util.spec_from_file_location(
    "poems", ROOT / "adult-books" / args.folder / "poems.py")
poems = importlib.util.module_from_spec(spec)
spec.loader.exec_module(poems)

finales: Counter[str] = Counter()
colas: Counter[str] = Counter()
sin_rima: list[tuple[int, str, str, str]] = []
auto_rima: list[tuple[int, str, str]] = []
total = 0

for pos, por_direccion in poems.POEMS.items():
    for quien, texto in por_direccion.items():
        total += 1
        for verso in texto.splitlines():
            if verso.strip():
                palabra = ultima_palabra(verso)
                finales[palabra] += 1
                colas[desde_tonica(palabra)] += 1
        for estrofa in [e for e in texto.split("\n\n") if e.strip()]:
            versos = [v for v in estrofa.splitlines() if v.strip()]
            if len(versos) != 4:
                continue
            for x, y in ((0, 1), (2, 3)):
                a, b = ultima_palabra(versos[x]), ultima_palabra(versos[y])
                if a == b:
                    auto_rima.append((pos, quien, a))
                elif not riman(a, b):
                    sin_rima.append((pos, quien, a, b))

versos_totales = sum(finales.values())
print(f"folder: {args.folder}  ({total} poemas, {versos_totales} versos)")
print(f"pareados sin rima: {len(sin_rima)} de {total * 6}")
for e in sin_rima[:20]:
    print("  ", e)
print(f"pareados que riman una palabra consigo misma: {len(auto_rima)}")
for e in auto_rima[:20]:
    print("  ", e)
print("palabras finales más repetidas:")
excesos = 0
for palabra, veces in finales.most_common(6):
    pct = veces / versos_totales * 100
    marca = "  <-- PASA DEL 2%" if pct > 2 else ""
    excesos += pct > 2
    print(f"   {palabra:<16} {veces:>4}  ({pct:.1f}%){marca}")

# El lote de formula pasaba los chequeos de arriba: rimar todo en -ado "rima".
# Lo que lo delata es la concentracion de terminaciones. Medido sobre los libros
# escritos a mano, la cola mas repetida llega al 10,8%; el molde llegaba al 66,7%.
print("terminaciones de rima más repetidas:")
cola_excesiva = 0
for cola, veces in colas.most_common(3):
    pct = veces / versos_totales * 100
    marca = "  <-- PASA DEL 20%: huele a plantilla" if pct > 20 else ""
    cola_excesiva += pct > 20
    print(f"   -{cola:<15} {veces:>4}  ({pct:.1f}%){marca}")

raise SystemExit(1 if sin_rima or auto_rima or excesos or cola_excesiva else 0)
