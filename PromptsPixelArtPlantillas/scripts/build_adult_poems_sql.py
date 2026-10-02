"""Emit the poem backfill for any adult book whose poems live in adult-books/<dir>/poems.py.

Replaces the per-book copy that started with Mamá. Matches each poem to its template by
the position encoded in template_preview_key plus the gender direction, never by id —
ids are auto-generated and differ per environment.

    python3 build_adult_poems_sql.py --book 9863
"""

from __future__ import annotations

import argparse
import importlib.util
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT.parent / "backend/api/src/database/content"

# adult model id -> (folder under adult-books/, direction -> key in POEMS, sql slug)
REGISTRY = {
    9861: ("mama-mi-heroina-adult", {"HE_TO_SHE": "hijo", "SHE_TO_SHE": "hija"}, "mama-mi-heroina"),
    9863: ("te-amo-abuela-adult", {"HE_TO_SHE": "nieto", "SHE_TO_SHE": "nieta"}, "te-amo-abuela"),
    9862: ("te-amo-abuelo-adult", {"HE_TO_HE": "nieto", "SHE_TO_HE": "nieta"}, "te-amo-abuelo"),
    9859: ("el-mejor-equipo-adult", {"": "yo"}, "el-mejor-equipo"),
    9860: ("mi-familia-adult", {"": "yo"}, "mi-familia"),
    9864: ("siempre-en-mi-corazon-abuelo-adult", {"M": "nieto"}, "siempre-en-mi-corazon-abuelo"),
    9865: ("siempre-en-mi-corazon-abuela-adult", {"F": "nieta"}, "siempre-en-mi-corazon-abuela"),
    9866: ("mi-angel-guardian-padre-adult", {"M": "hijo"}, "mi-angel-guardian-padre"),
    9867: ("mi-angel-guardian-madre-adult", {"F": "hija"}, "mi-angel-guardian-madre"),
    9868: ("siempre-seras-parte-de-mi-adult", {"M": "hermano", "F": "hermana"}, "siempre-seras-parte-de-mi"),
    9857: ("aventura-entre-patas-adult", {"": "humano"}, "aventura-entre-patas"),
}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--book", type=int, required=True)
    args = parser.parse_args()
    if args.book not in REGISTRY:
        raise SystemExit(f"[error] libro {args.book} no está en REGISTRY")
    folder, dirmap, slug = REGISTRY[args.book]

    spec = importlib.util.spec_from_file_location(
        "poems", ROOT / "adult-books" / folder / "poems.py")
    poems = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(poems)

    rows = subprocess.run(
        ["docker", "exec", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart",
         "-P", "pager=off", "-A", "-F", "|", "-t", "-c",
         "SELECT template_preview_key, gender_direction, name FROM personalized_templates "
         f"WHERE model_id={args.book} AND is_active ORDER BY id;"],
        capture_output=True, text=True, check=True).stdout

    body, seen = [], set()
    for line in rows.splitlines():
        if not line.strip():
            continue
        key, direction, name = line.split("|", 2)
        ordinal = int(re.search(r"[Pp]lantilla_(\d+)_", key).group(1))
        position = ordinal if ordinal <= 20 else ordinal - 20
        who = dirmap[direction]
        poem = poems.POEMS[position][who]
        seen.add((position, who))
        tag = f"{slug.replace('-', '')}{position}{who}"
        body.append(
            f"-- {position:>2}. {name.strip()}\n"
            "UPDATE personalized_templates SET\n"
            f"  poem_template = ${tag}p${poem}${tag}p$,\n"
            "  updated_at = now()\n"
            f"WHERE template_preview_key = ${tag}k${key}${tag}k$ AND is_active;")

    expected = {(p, w) for p in poems.POEMS for w in dirmap.values()}
    if seen != expected or len(body) != len(expected):
        raise SystemExit(f"[error] {len(body)} filas, faltan {sorted(expected - seen)}")

    out = CONTENT / f"backfill-{slug}-adult-poems.sql"
    out.write_text(
        f"-- Poemas originales para el libro adulto (modelo {args.book}).\n"
        "--\n"
        "-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.\n"
        "-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma\n"
        "-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del\n"
        "-- propio tema. Lo único que cambia es la voz, que es la de un adulto.\n"
        "--\n"
        "-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20\n"
        "-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.\n\n"
        + "\n\n".join(body) + "\n", encoding="utf-8")
    print(f"escrito: {out.name}  ({len(body)} poemas)")


if __name__ == "__main__":
    main()
