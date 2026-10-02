"""Run the V10 open-book generator against the faithful V11 manifest.

Reuses the proven V10 mechanics untouched: this only repoints the config and the
output folder, and adds --only so a two-image test can be run before paying for
the rest.

    python3 run_papa_adult_v11_faithful.py --dry-run
    python3 run_papa_adult_v11_faithful.py --only 18:HE_TO_HE,13:SHE_TO_HE
    python3 run_papa_adult_v11_faithful.py
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROGRAM = ROOT / "adult-books" / "papa-mi-heroe-adult-full"
CONFIG = PROGRAM / "v11-faithful-adult-themes-11-20-source-config.json"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v11-faithful-themes-11-20"
REPORT = PROGRAM / "review-assets" / "demo-v11-faithful-themes-11-20-report.json"

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate_papa_adult_demo_v10_corrected_infant_themes_11_20 as v10  # noqa: E402

COST_PER_IMAGE_USD = 0.041


def parse_only(raw: str | None) -> set[tuple[int, str]] | None:
    if not raw:
        return None
    wanted: set[tuple[int, str]] = set()
    for chunk in raw.split(","):
        position, _, direction = chunk.strip().partition(":")
        if not direction:
            raise SystemExit(f"[error] formato esperado posicion:DIRECCION, recibí {chunk!r}")
        wanted.add((int(position), direction.strip().upper()))
    return wanted


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Validate lineage and fetch references without calling OpenAI.")
    parser.add_argument("--only", help="Comma-separated position:DIRECTION pairs, e.g. 18:HE_TO_HE,13:SHE_TO_HE")
    args = parser.parse_args()

    wanted = parse_only(args.only)
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    rows = config["templates"]
    if wanted:
        rows = [r for r in rows if (r["position"], r["target_direction"]) in wanted]
        missing = wanted - {(r["position"], r["target_direction"]) for r in rows}
        if missing:
            raise SystemExit(f"[error] no están en el manifiesto: {sorted(missing)}")
        config = {**config, "templates": rows}

    print(f"manifiesto : {CONFIG.name}")
    print(f"salida     : {OUTPUT.relative_to(ROOT)}")
    print(f"plantillas : {len(rows)}")
    if not args.dry_run:
        print(f"costo est. : ~${len(rows) * COST_PER_IMAGE_USD:.2f}")

    # Repoint the V10 module without editing it: its main() reads these at call time.
    v10.CONFIG, v10.OUTPUT, v10.WORK, v10.REPORT = CONFIG, OUTPUT, OUTPUT / "work", REPORT
    v10.load_config = lambda: config
    v10.parse_args = lambda: argparse.Namespace(dry_run=args.dry_run)
    v10.main()


if __name__ == "__main__":
    main()
