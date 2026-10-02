"""Rebuild every adult book's content from its infant counterpart.

The adult line was written from a formula: seven of the twelve books carry ONE scene
and ONE poem across all 20-40 templates, and the names are invented rather than
adapted. This restores name, scene, background, magic effects and lighting from the
infant template that each adult template corresponds to, which also brings the magic
back for free. Poems are NOT touched here — they are written per book, original.

Emits a backfill SQL matched on template_preview_key (stable across environments),
never on id. Read-only against the database; it only prints and writes the .sql.

    python3 rebuild_adult_books_from_infant.py            # all books
    python3 rebuild_adult_books_from_infant.py --book 9861
"""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "backend/api/src/database/content/rebuild-adult-books-from-infant.sql"

# adult model id -> (infant model id, label). Split books take only their own direction.
PAIRS = {
    9775: (8, "Papá, Mi Héroe"),
    9861: (9, "Mamá, Mi Heroína"),
    9862: (10, "Te amo, abuelo"),
    9863: (11, "Te amo, abuela"),
    9859: (12, "El Mejor Equipo"),
    9860: (13, "Mi Familia"),
    9857: (5, "Aventura entre patas"),
    9868: (1164, "Siempre seras parte de mi"),
    9864: (1112, "Siempre en mi corazon"),
    9865: (1112, "Siempre en mi corazon"),
    9866: (1063, "Mi angel guardian"),
    9867: (1063, "Mi angel guardian"),
}

# The infant scene describes a child. These rewrite the actor's age without touching
# the costume, the staging or the setting, which are the theme itself.
#
# Order matters: the combined "kneeling TO REACH the child" patterns must run before
# the bare height ones, or the kneeling verb survives and produces "arrodillado de pie
# junto a". Kneeling that is NOT about height — "arrodillados junto a un cantero de
# flores" — must be left alone, which is why none of these match a bare "arrodillado".
AGE_SUBS = [
    # 1. Kneeling only in order to reach the child's height.
    (r"arrodillad([oa])s? (?:para estar )?a la altura de su (hij[oa]|niet[oa]|hermanit[oa])\w*(\s+ya adult[oa])?",
     r"de pie junto a su \2"),
    (r"arrodillad([oa])s? de pie junto a", "de pie junto a"),
    # 2. Height references without the kneeling verb.
    (r"a la altura de su (hij[oa]|niet[oa]|hermanit[oa])\w*", r"de pie junto a su \1"),
    # 3. Being carried, held or sat on a lap.
    (r"cargando en brazos a", "abrazando de pie a"),
    (r"cargándol([oa]) en brazos", r"abrazándol\1 de pie"),
    (r"en brazos de su", "junto a su"),
    (r"\bEn sus brazos,", "A su lado,"),
    (r"Recostad([oa]) en su regazo", r"Sentad\1 a su lado"),
    (r"(abrazando de pie a [^,.]{0,60}?) con facilidad", r"\1"),
    (r"sobre sus hombros", "a su lado"),
    (r"con los pies sobre los de su (pap[áa]|mam[áa])", "bailando de pie sobre el suelo"),
    # 3b. Props that encode the child's age as surely as the pose does.
    (r",?\s*(?:con |y )?(?:un |una |unos |unas )?(?:osit[oa]s? de )?peluches?[^,.]{0,30}", ""),
    (r",?\s*(?:con |y )?(?:un |una |unos |unas )?juguetes?[^,.]{0,30}", ""),
    (r",?\s*(?:con |y )?(?:una )?cuna[^,.]{0,30}", ""),
    (r"cuarto de niñ[oa]s?", "dormitorio"),
    (r"habitación infantil", "dormitorio"),
    # 4. Naming the child as a child.
    (r"\bsu hijo pequeño\b", "su hijo ya adulto"),
    (r"\bsu hija pequeña\b", "su hija ya adulta"),
    (r"\bsu hijo\b", "su hijo ya adulto"),
    (r"\bsu hija\b", "su hija ya adulta"),
    (r"\bsu nieto\b", "su nieto ya adulto"),
    (r"\bsu nieta\b", "su nieta ya adulta"),
    (r"\bel niño\b", "el hijo adulto"),
    (r"\bla niña\b", "la hija adulta"),
    (r"\bniño pequeño\b", "hombre adulto"),
    (r"\bniña pequeña\b", "mujer adulta"),
]

ADULT_CLAUSE = (
    "Todos los protagonistas son adultos de estatura normal y comparable: el hijo o la "
    "hija tiene entre 30 y 35 años y el padre o la madre entre 60 y 70. Nadie es gigante "
    "ni diminuto, nadie va en brazos y nadie se arrodilla a la altura del otro. El vínculo "
    "es familiar en todo momento, nunca de pareja. Conserva intactos el vestuario, los "
    "objetos, el escenario y los efectos mágicos del original: son el tema."
)


def psql(sql: str) -> list[list[str]]:
    out = subprocess.run(
        ["docker", "exec", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart",
         "-P", "pager=off", "-A", "-F", "\x1f", "-R", "\x1e", "-t", "-c", sql],
        capture_output=True, text=True, check=True).stdout
    return [r.split("\x1f") for r in out.split("\x1e") if r.strip()]


def position(key: str) -> int | None:
    m = re.search(r"plantilla_(\d+)_", key, re.IGNORECASE)
    return int(m.group(1)) if m else None


def fetch(model_id: int) -> dict[tuple[int, str], dict]:
    rows = psql(
        "SELECT template_preview_key, coalesce(gender_direction,''), name, "
        "coalesce(scene_visual,''), coalesce(background_details,''), "
        "coalesce(magic_effects,''), coalesce(lighting_color,'') "
        f"FROM personalized_templates WHERE model_id={model_id} AND is_active ORDER BY id;")
    out: dict[tuple[int, str], dict] = {}
    for key, direction, name, scene, bg, fx, light in rows:
        pos = position(key)
        if pos is None:
            continue
        # Adult hija/second-direction keys continue the numbering past the first block.
        out[(pos, direction)] = dict(key=key, name=name, scene=scene, bg=bg, fx=fx, light=light)
    return out


def normalise(block: dict[tuple[int, str], dict]) -> dict[tuple[int, str], dict]:
    """Collapse key numbering so a book's second direction restarts at 1."""
    by_dir: dict[str, list[tuple[int, dict]]] = {}
    for (pos, direction), row in block.items():
        by_dir.setdefault(direction, []).append((pos, row))
    out: dict[tuple[int, str], dict] = {}
    for direction, items in by_dir.items():
        for ordinal, (_pos, row) in enumerate(sorted(items), start=1):
            out[(ordinal, direction)] = row
    return out


def adultise(text: str) -> str:
    for pattern, replacement in AGE_SUBS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text


def sql_literal(value: str, tag: str) -> str:
    return f"${tag}${value}${tag}$"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--book", type=int, help="Only this adult model id")
    args = parser.parse_args()

    statements: list[str] = []
    report: list[tuple[str, int, int]] = []

    for adult_id, (infant_id, label) in PAIRS.items():
        if args.book and adult_id != args.book:
            continue
        adult = normalise(fetch(adult_id))
        infant = normalise(fetch(infant_id))
        matched = missing = 0
        for (ordinal, direction), arow in sorted(adult.items()):
            irow = infant.get((ordinal, direction)) or infant.get((ordinal, ""))
            if irow is None:
                missing += 1
                continue
            matched += 1
            tag = f"r{adult_id}_{ordinal}_{direction or 'x'}".lower()
            suffix = re.search(r" De .*$", arow["name"])
            name = re.sub(r" De .*$", "", irow["name"]) + (suffix.group(0) if suffix else "")
            statements.append(
                "UPDATE personalized_templates SET\n"
                f"  name = {sql_literal(name, tag + 'n')},\n"
                f"  scene_visual = {sql_literal(adultise(irow['scene']) + chr(10)*2 + ADULT_CLAUSE, tag + 'a')},\n"
                f"  background_details = {sql_literal(irow['bg'], tag + 'b')},\n"
                f"  magic_effects = {sql_literal(irow['fx'], tag + 'c')},\n"
                f"  lighting_color = {sql_literal(irow['light'], tag + 'd')},\n"
                "  updated_at = now()\n"
                f"WHERE template_preview_key = {sql_literal(arow['key'], tag + 'k')} AND is_active;")
        report.append((label + f" (adulto {adult_id})", matched, missing))

    header = (
        "-- Reconstruye el contenido de los libros adultos a partir de su libro infantil.\n"
        "-- Siete de los doce tenían UNA sola escena y UN solo poema repetidos en todas sus\n"
        "-- plantillas, y nombres inventados en vez de adaptados. Esto devuelve nombre,\n"
        "-- escena, fondo, efectos mágicos e iluminación del infantil que le corresponde a\n"
        "-- cada plantilla adulta, con la edad de los protagonistas ajustada.\n"
        "--\n"
        "-- Los poemas NO se tocan acá: se escriben originales, libro por libro.\n"
        "-- Matchea por template_preview_key, nunca por id (los ids difieren entre entornos).\n\n")
    OUT.write_text(header + "\n\n".join(statements) + "\n", encoding="utf-8")

    print(f"{'libro':<40} {'emparejadas':>12} {'sin par':>8}")
    for label, matched, missing in report:
        print(f"{label:<40} {matched:>12} {missing:>8}")
    print(f"\nescrito: {OUT.relative_to(ROOT)}  ({len(statements)} UPDATE)")


if __name__ == "__main__":
    main()
