"""Emit the poem backfill for "Mamá, Mi Heroína Adulto" (model 9861).

Matches each poem to its template by the position encoded in template_preview_key
and the gender direction, never by id — ids are auto-generated and differ per
environment. Writes to backend/api/src/database/content/.
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = ROOT / "backend/api/src/database/content/backfill-mama-mi-heroina-adult-poems.sql"
MODEL = 9861
DIRECTION_TO_KEY = {"SHE_TO_SHE": "hija", "HE_TO_SHE": "hijo"}

sys.path.insert(0, str(HERE))
from poems import POEMS  # noqa: E402


def main() -> None:
    rows = subprocess.run(
        ["docker", "exec", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart",
         "-P", "pager=off", "-A", "-F", "|", "-t", "-c",
         "SELECT template_preview_key, gender_direction, name FROM personalized_templates "
         f"WHERE model_id={MODEL} AND is_active ORDER BY id;"],
        capture_output=True, text=True, check=True).stdout

    entries, seen = [], set()
    for line in rows.splitlines():
        if not line.strip():
            continue
        key, direction, name = line.split("|", 2)
        ordinal = int(re.search(r"[Pp]lantilla_(\d+)_", key).group(1))
        position = ordinal if ordinal <= 20 else ordinal - 20
        who = DIRECTION_TO_KEY[direction]
        poem = POEMS[position][who]
        entries.append((position, who, name.strip(), key, poem))
        seen.add((position, who))

    missing = {(p, w) for p in POEMS for w in ("hija", "hijo")} - seen
    if missing or len(entries) != 40:
        raise SystemExit(f"[error] {len(entries)} filas, faltan {sorted(missing)}")

    body = []
    for position, who, name, key, poem in entries:
        tag = f"mh{position}{who[-1]}"
        body.append(
            f"-- {position:>2}. {name}\n"
            "UPDATE personalized_templates SET\n"
            f"  poem_template = ${tag}p${poem}${tag}p$,\n"
            "  updated_at = now()\n"
            f"WHERE template_preview_key = ${tag}k${key}${tag}k$ AND is_active;")

    OUT.write_text(
        '-- Poemas originales para "Mamá, Mi Heroína Adulto".\n'
        "--\n"
        "-- El libro venía con UN solo esqueleto de poema repetido en sus 40 plantillas,\n"
        "-- con el título enchufado en una ranura. Estos son 20 poemas nuevos, uno por\n"
        "-- tema, en las dos direcciones, escritos con la forma del libro infantil: tres\n"
        "-- estrofas de cuatro versos, rima AABB y las imágenes del propio tema. Lo único\n"
        "-- que cambia es la voz, que es la de un hijo o una hija ya adultos.\n"
        "--\n"
        "-- El apodo rota por posición en vez de abrir siempre el poema:\n"
        "--   inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20 · final 3,6,9,12,15,18\n"
        "--\n"
        "-- Matchea por template_preview_key, nunca por id.\n\n"
        + "\n\n".join(body) + "\n", encoding="utf-8")
    print(f"escrito: {OUT.relative_to(ROOT)}  ({len(entries)} poemas)")


if __name__ == "__main__":
    main()
