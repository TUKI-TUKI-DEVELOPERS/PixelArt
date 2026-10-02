"""Build a faithful adult source-config for "Papá, Mi Héroe" positions 11-20.

The previous config rewrote every theme into a new realistic or symbolic scene,
which deleted the theme itself (the titan, the crown, the embrace). This builds
each adult theme from the ACTUAL infant scene stored in the database backfills,
changing only the age of the child.

Inputs  : backend/api/src/database/content/backfill-papa-mi-heroe-hijo-content.sql  (HE_TO_HE)
          backend/api/src/database/content/backfill-familia-content.sql             (SHE_TO_HE)
Output  : adult-books/papa-mi-heroe-adult-full/v11-faithful-adult-themes-11-20-source-config.json
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROGRAM = ROOT / "PromptsPixelArtPlantillas" / "adult-books" / "papa-mi-heroe-adult-full"
PREVIOUS = PROGRAM / "v10-corrected-infant-themes-11-20-source-config.json"
OUTPUT = PROGRAM / "v11-faithful-adult-themes-11-20-source-config.json"

# (file, statement marker, preview-key fragment identifying THIS book's direction).
# backfill-familia-content.sql holds six books that all reuse the same $fNa$ tag
# names ($f12a$ appears 12 times), so blocks must be tied to the preview key of
# their own statement, never to the tag number.
SOURCES = {
    "HE_TO_HE": (
        ROOT / "backend/api/src/database/content/backfill-papa-mi-heroe-hijo-content.sql",
        "INSERT INTO personalized_templates",
        "Papa_mi_heroe/Plantillas_Hijo/",
    ),
    "SHE_TO_HE": (
        ROOT / "backend/api/src/database/content/backfill-familia-content.sql",
        "UPDATE personalized_templates SET",
        "Papa_mi_heroe/Plantillas/",
    ),
}

POSITIONS = range(11, 21)
FIELDS = {"a": "scene", "b": "background", "c": "effects", "d": "lighting", "e": "poem"}

# Poem corrections found while reviewing the rendered v10 spreads.
POEM_FIXES = {
    ("HE_TO_HE", 13): [("ante de entender el mundo", "antes de entender el mundo")],
    ("HE_TO_HE", 15): [("es porque tu fe la sostengo.", "es porque en tu fe me sostengo.")],
    ("SHE_TO_HE", 13): [("me enseñó a no aceptar menos jamás.", "me enseñó mi dignidad.")],
    ("SHE_TO_HE", 20): [("ni cuánto cambie el camino:", "ni cuánto cambie mi vida:")],
}

# Two of the ten themes stage contact that the age change breaks physically: 13 has the
# father kneeling to the child's height, and 20 has him carrying the child. The warmth
# itself is not the problem — fathers and grown children hug — so the embrace is kept and
# only the mechanics are adjusted. The sole guard is couple grammar: hands on the waist
# and interlaced fingers, which is what actually reads as a partner rather than a parent.
POSE_OVERRIDES = {
    14: """
AJUSTE DE POSE (obligatorio): la escena infantil pone al niño de pie SOBRE los pies de su
papá. Eso obliga a encoger al adulto y produce un papá gigante junto a una persona
diminuta. Conserva la misma sala, la misma luz y la misma alegría del baile, y conserva
que se toman de las manos en posición de baile. Cambia solo esto: los dos bailan de pie
sobre el suelo, cada uno con su propio peso.
ESCALA (obligatorio): los dos son adultos de estatura normal y comparable. La diferencia
de altura entre ellos no supera la de dos adultos cualesquiera. Ninguno es gigante,
ninguno es diminuto, y ninguno flota ni salta en el aire.
""".strip(),
    13: """
AJUSTE DE POSE (obligatorio): el papá no puede arrodillarse a la altura de una persona
adulta. Conserva el mismo salón, el mismo sofá, las mismas fotografías familiares y la
misma luz cálida, y conserva el abrazo con toda su ternura: el papá abraza a su hijo
adulto o a su hija adulta, que apoya la cabeza en su pecho con los ojos cerrados, igual
que en el original. Ajusta solo la mecánica: ambos sentados en el sofá, o el papá de pie
abrazándola o abrazándolo. El papá sostiene, el hijo o la hija se deja sostener.
EVITA únicamente la gramática de pareja: manos en la cintura y dedos entrelazados.
""".strip(),
    20: """
AJUSTE DE POSE (obligatorio): nadie carga en brazos a una persona de 30 años. El original
ya es una progresión de edades (niño cargado a la izquierda, adolescente abrazado a la
derecha); esta versión la extiende un paso más. Conserva el mismo jardín familiar bajo el
gran árbol y la misma luz dorada atemporal. UNA SOLA ESCENA (obligatorio): el original muestra dos momentos distintos, uno en cada
mitad. Esta versión NO los repite. Dibuja UNA sola pareja de figuras —un papá y un hijo
adulto o una hija adulta— y nada más. No dupliques, no espejes y no repitas a las mismas
personas en la otra mitad de la hoja. La mitad derecha es jardín y luz, sin figuras.
El papá, ya mayor, abraza a
su hijo adulto o a su hija adulta, con la cabeza de él o ella apoyada en su hombro —
exactamente el mismo gesto de la infancia, ahora entre adultos. Esa repetición del gesto
es lo que dice que sigue siendo su niño o su niña.
EVITA únicamente la gramática de pareja: manos en la cintura y dedos entrelazados.
""".strip(),
}

ADULT_RULE = """
VERSIÓN ADULTA FIEL — regla principal: reproduce EXACTAMENTE la misma escena, el mismo
vestuario, los mismos objetos, la misma puesta en escena y el mismo escenario de la
plantilla infantil original. Lo único que cambia es la edad del hijo o la hija.

ESCENA ORIGINAL (reprodúcela fielmente):
{scene}

FONDO: {background}

EFECTOS: {effects}

ILUMINACIÓN Y COLOR: {lighting}

CAMBIO DE EDAD: el niño o la niña de la escena original es ahora una persona adulta de
unos 30 a 35 años, la misma persona ya crecida. Papá Leo es un hombre mayor de unos 65.
Conserva idénticos el vestuario, las posiciones y el vínculo emocional del original;
ajusta solo la postura y la escala para que la puesta en escena funcione entre dos
adultos (por ejemplo, un abrazo de rodillas a la altura del niño pasa a ser el mismo
abrazo, con la misma calidez, de pie o sentados).

PARENTESCO (obligatorio): son PADRE e HIJO ADULTO / PADRE e HIJA ADULTA. Afecto
familiar únicamente. Nunca una pareja romántica, nunca cónyuges. No los compongas como
pareja: sin abrazos por la cintura desde atrás, sin miradas de enamorados, sin
mejilla contra mejilla.

CONSERVA LA FANTASÍA (obligatorio): el disfraz, el elemento mítico y los objetos del
original SON el tema. No vuelvas la escena literal, realista ni meramente simbólica.
No elimines armaduras, katanas, capas, coronas, energía cósmica ni diferencias de
escala. Si el original muestra al papá como titán gigante, el adulto también lo muestra
como titán gigante.
""".strip()

LAYOUT_RULE = """
Mantén a las dos figuras completas en la PÁGINA IZQUIERDA, con el fondo continuo
fluyendo hacia la página derecha.

ZONA DEL TÍTULO (obligatorio): reserva el tercio superior de la página IZQUIERDA como
espacio negativo tranquilo para el título. Sin caras, sin cabezas y sin detalle de alto
contraste en esa franja. Todas las cabezas quedan por debajo de ella.

ZONA DEL POEMA (obligatorio): reserva la página DERECHA superior entera para el poema:
solo cielo, pared o fondo suave, sin figuras ni detalle.

DOBLEZ CENTRAL (obligatorio): ninguna cara, mano ni punto de contacto entre las figuras
puede caer sobre el pliegue central. El abrazo, las manos unidas o las miradas que se
cruzan deben quedar completos dentro de la página izquierda.

BORDE SUPERIOR: ninguna cabeza puede quedar cortada por el borde de la página.
""".strip()


def parse_source(path: Path, marker: str, book_key: str) -> dict[int, dict[str, str]]:
    """Pull the dollar-quoted blocks per SQL statement, keyed by template position.

    Each statement is matched to the book and position of its own preview key, so
    tag names colliding across books in the same file cannot cross-contaminate.
    """
    out: dict[int, dict[str, str]] = {}
    for statement in path.read_text(encoding="utf-8").split(marker):
        key = re.search(rf"{re.escape(book_key)}PLANTILLA_(\d+)_", statement)
        if not key:
            continue
        position = int(key.group(1))
        if position not in POSITIONS:
            continue
        fields = {
            FIELDS[tag[-1]]: body.strip()
            for tag, body in re.findall(r"\$(\w*?\d+[a-e])\$(.*?)\$\1\$", statement, re.S)
            if tag[-1] in FIELDS
        }
        if position in out:
            raise SystemExit(f"[error] {path.name}: posicion {position} aparece dos veces para {book_key}")
        out[position] = fields
    return out


def apply_poem_fixes(direction: str, position: int, poem: str) -> str:
    for old, new in POEM_FIXES.get((direction, position), []):
        if old not in poem:
            raise SystemExit(f"[error] {direction} pos {position}: no encontré {old!r} en el poema")
        poem = poem.replace(old, new)
    return poem


def main() -> None:
    previous = json.loads(PREVIOUS.read_text(encoding="utf-8"))
    infant = {d: parse_source(p, marker, key) for d, (p, marker, key) in SOURCES.items()}

    for direction, rows in infant.items():
        missing = [p for p in POSITIONS if p not in rows]
        if missing:
            raise SystemExit(f"[error] faltan posiciones {missing} para {direction}")
        for position, fields in rows.items():
            absent = [f for f in ("scene", "background", "effects", "lighting") if not fields.get(f)]
            if absent:
                raise SystemExit(f"[error] {direction} pos {position}: faltan campos {absent}")

    templates = []
    for row in previous["templates"]:
        direction, position = row["target_direction"], row["position"]
        src = infant[direction][position]

        # The adult title must equal the infant title exactly — v10 silently
        # changed the capitalisation of 5 of the 10, splitting the catalogue.
        infant_title = row["source_name"].replace(" De Hijo a Papá", "").replace(" De Hija a Papá", "")

        templates.append({
            **row,
            "title": infant_title,
            "target_name": row["source_name"],
            "theme": "\n\n".join(
                part for part in (ADULT_RULE.format(**src), POSE_OVERRIDES.get(position)) if part
            ),
            "layout": LAYOUT_RULE,
            "poem": apply_poem_fixes(direction, position, row["poem"]),
        })

    OUTPUT.write_text(json.dumps({
        **previous,
        "status": "ready",
        "purpose": (
            "Papá, Mi Héroe — adult positions 11-20 rebuilt from the real infant scenes. "
            "Same theme, costume and staging; only the child's age changes. Adds the "
            "reserved title zone, the gutter rule and the explicit father/adult-child "
            "relationship, and corrects four poem errors found in the v10 spreads."
        ),
        "built_from": {d: str(p.relative_to(ROOT)) for d, (p, _, _) in SOURCES.items()},
        "templates": templates,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    changed = sum(1 for r, o in zip(templates, previous["templates"]) if r["title"] != o["title"])
    print(f"escrito: {OUTPUT.relative_to(ROOT)}")
    print(f"  plantillas            : {len(templates)}")
    print(f"  titulos corregidos    : {changed}")
    print(f"  poemas corregidos     : {len(POEM_FIXES)}")


if __name__ == "__main__":
    main()
