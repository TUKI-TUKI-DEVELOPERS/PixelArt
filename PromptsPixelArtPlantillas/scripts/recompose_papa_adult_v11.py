"""Recompose V11 spreads from their saved raw renders. No OpenAI call, no cost.

Typography is drawn locally on top of the raw image, so any title, poem or shadow
correction only needs this — regenerating would cost money and change the art.

    python3 recompose_papa_adult_v11.py              # every raw render present
    python3 recompose_papa_adult_v11.py --only 13:SHE_TO_HE
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
PROGRAM = ROOT / "adult-books" / "papa-mi-heroe-adult-full"
CONFIG = PROGRAM / "v11-faithful-adult-themes-11-20-source-config.json"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v11-faithful-themes-11-20"

sys.path.insert(0, str(SCRIPTS))
import generate_papa_adult_demo_v10_corrected_infant_themes_11_20 as v10  # noqa: E402

v10.OUTPUT, v10.WORK = OUTPUT, OUTPUT / "work"
first_ten = v10.first_ten
first_ten.OUTPUT, first_ten.WORK = OUTPUT, OUTPUT / "work"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--only", help="Comma-separated position:DIRECTION pairs, e.g. 13:SHE_TO_HE")
    args = parser.parse_args()

    wanted = None
    if args.only:
        wanted = {(int(c.split(":")[0]), c.split(":")[1].strip().upper()) for c in args.only.split(",")}

    rows = json.loads(CONFIG.read_text(encoding="utf-8"))["templates"]
    done = skipped = 0
    for row in rows:
        if wanted and (row["position"], row["target_direction"]) not in wanted:
            continue
        item = v10.item_for(row)
        direction = v10.DIRECTIONS[v10.direction_key(row)]
        raw_path = first_ten.raw_path(item, direction)
        if not raw_path.exists():
            skipped += 1
            continue
        background = first_ten.apply_binding(first_ten.fit_to_canvas(raw_path.read_bytes()))
        destination = first_ten.output_path(item, direction)
        first_ten.compose_editorial(background, item, direction, destination)
        print(f"OK {row['position']} {row['target_direction']} -> {destination.name}")
        done += 1

    print(f"recompuestas={done} sin_raw={skipped} costo=$0.00")


if __name__ == "__main__":
    main()
