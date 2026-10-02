#!/usr/bin/env python3
"""Generate the corrected V10 Papá adult positions 11–20 from infant sources only.

This intentionally does not upload to MinIO or update PostgreSQL. It refuses every
reference outside infant model 8 and validates the complete source/target lineage
before an OpenAI call is allowed.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
PROGRAM = ROOT / "adult-books" / "papa-mi-heroe-adult-full"
CONFIG = PROGRAM / "v10-corrected-infant-themes-11-20-source-config.json"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-corrected-infant-themes-11-20"
WORK = OUTPUT / "work"
REVIEW = PROGRAM / "review-assets"
REPORT = REVIEW / "demo-v10-corrected-infant-themes-11-20-report.json"
CANVAS = (1600, 944)
MAX_ATTEMPTS = 2


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


first_ten = load_module("papa_v10_approved_first_ten", SCRIPTS / "generate_papa_adult_demo_v10_open_book_first_10.py")
DIRECTIONS = first_ten.DIRECTIONS


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Validate database lineage and fetch all infant references without calling OpenAI.")
    return parser.parse_args()


def load_config() -> dict:
    config = json.loads(CONFIG.read_text())
    rows = config.get("templates", [])
    if config.get("source_model", {}).get("id") != 8 or config.get("target_model", {}).get("id") != 9775:
        raise RuntimeError("Incorrect source or target model in corrected source manifest")
    if len(rows) != 20 or len({row["target_template_id"] for row in rows}) != 20:
        raise RuntimeError("Corrected source manifest must contain exactly 20 unique target rows")
    expected = {("HE_TO_HE", position) for position in range(11, 21)} | {("SHE_TO_HE", position) for position in range(11, 21)}
    actual = {(row["target_direction"], row["position"]) for row in rows}
    if actual != expected:
        raise RuntimeError(f"Source manifest direction/position coverage mismatch: {actual ^ expected}")
    for row in rows:
        key = row["reference_key"]
        if "/Papa_mi_heroe/" not in key or "Papa_mi_heroe_adulto" in key:
            raise RuntimeError(f"Adult or non-infant reference forbidden: {key}")
        if row["source_direction"] != row["target_direction"]:
            raise RuntimeError(f"Direction mismatch for target {row['target_template_id']}")
        if not all(row.get(field) for field in ("source_template_id", "source_name", "title", "target_name", "slug", "theme", "layout", "poem")):
            raise RuntimeError(f"Incomplete source record for target {row['target_template_id']}")
    return config


def query_templates(ids: list[int]) -> dict[int, dict]:
    sql = "SELECT id, model_id, gender_direction, name, template_preview_key FROM personalized_templates WHERE id IN (" + ",".join(map(str, ids)) + ") ORDER BY id;"
    result = subprocess.run(
        ["docker", "exec", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart", "-P", "pager=off", "-A", "-F", "|", "-t", "-c", sql],
        check=True,
        text=True,
        capture_output=True,
    )
    rows: dict[int, dict] = {}
    for line in result.stdout.splitlines():
        if not line:
            continue
        identifier, model_id, direction, name, key = line.split("|", 4)
        rows[int(identifier)] = {"model_id": int(model_id), "gender_direction": direction, "name": name, "template_preview_key": key}
    if len(rows) != len(ids):
        raise RuntimeError(f"Database lineage query returned {len(rows)} rows for {len(ids)} expected IDs")
    return rows


def validate_database_lineage(rows: list[dict]) -> None:
    source_db = query_templates([row["source_template_id"] for row in rows])
    target_db = query_templates([row["target_template_id"] for row in rows])
    for row in rows:
        source = source_db[row["source_template_id"]]
        target = target_db[row["target_template_id"]]
        if (source["model_id"], source["gender_direction"], source["name"], source["template_preview_key"]) != (8, row["source_direction"], row["source_name"], row["reference_key"]):
            raise RuntimeError(f"Infant source drift for target {row['target_template_id']}: {source}")
        if (target["model_id"], target["gender_direction"]) != (9775, row["target_direction"]):
            raise RuntimeError(f"Adult target drift for target {row['target_template_id']}: {target}")


def direction_key(row: dict) -> str:
    return "hijo" if row["target_direction"] == "HE_TO_HE" else "hija"


def item_for(row: dict) -> dict:
    return {
        "number": row["position"],
        "slug": row["slug"],
        "title": row["title"],
        "poem": row["poem"],
        "theme": row["theme"],
        "layout": row["layout"],
        "reference_key": row["reference_key"],
        "reference_label": f"source-{row['source_template_id']}-{row['position']:02d}-{direction_key(row)}",
        "source_template_id": row["source_template_id"],
        "target_template_id": row["target_template_id"],
        "poem_layout": {"font_size": 21, "y": 128, "line_height": 32},
    }


def write_report(config: dict, results: list[dict], status: str) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    report = {
        "scope": "Papá, Mi Héroe Adulto — corrected V10 positions 11–20 from exact infant themes",
        "status": status,
        "method": "gpt-image-2 image edit from matching textless infant open-book reference + deterministic binding finish + deterministic local typography",
        "source_model_id": 8,
        "target_model_id": 9775,
        "forbidden_reference_class": "Any Papa_mi_heroe_adulto preview key",
        "lineage": [
            {
                "target_template_id": row["target_template_id"],
                "target_direction": row["target_direction"],
                "position": row["position"],
                "source_template_id": row["source_template_id"],
                "source_name": row["source_name"],
                "reference_key": row["reference_key"],
                "adult_title": row["title"],
            }
            for row in config["templates"]
        ],
        "outputs": results,
        "total_cost_usd_excluding_input_image_tokens": round(sum(row.get("cost_usd") or 0 for row in results), 4),
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    args = parse_args()
    config = load_config()
    rows = config["templates"]
    validate_database_lineage(rows)

    # Reuse only the approved first-ten V10 mechanics; all source data comes from
    # this corrected infant-only manifest.
    first_ten.OUTPUT = OUTPUT
    first_ten.WORK = WORK
    first_ten.REVIEW = REVIEW
    WORK.mkdir(parents=True, exist_ok=True)
    jobs = [(row, item_for(row), DIRECTIONS[direction_key(row)]) for row in rows]

    if args.dry_run:
        for row, item, _direction in jobs:
            reference = first_ten.fetch_reference(item)
            if not reference.exists():
                raise RuntimeError(f"Missing source reference for infant {row['source_template_id']}")
            print(f"READY target={row['target_template_id']} source={row['source_template_id']} key={row['reference_key']}")
        write_report(config, [], "source-validated-dry-run")
        print("READY jobs=20 sources=20 infant_only=true")
        return

    api_key = first_ten.base.load_api_key()
    results: list[dict] = []
    for row, item, direction in jobs:
        destination = first_ten.output_path(item, direction)
        if destination.exists():
            results.append({"target_template_id": row["target_template_id"], "source_template_id": row["source_template_id"], "title": item["title"], "direction": direction["label"], "status": "skipped_existing", "output": str(destination.relative_to(ROOT)), "cost_usd": None})
            continue
        reference = first_ten.make_textless_reference(item)
        raw_destination = first_ten.raw_path(item, direction)
        raw_destination.parent.mkdir(parents=True, exist_ok=True)
        error: Exception | None = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost, usage = first_ten.request_edit(reference, item, direction, api_key)
                raw_destination.write_bytes(raw)
                background = first_ten.apply_binding(first_ten.fit_to_canvas(raw))
                destination.parent.mkdir(parents=True, exist_ok=True)
                first_ten.compose_editorial(background, item, direction, destination)
                results.append({"target_template_id": row["target_template_id"], "source_template_id": row["source_template_id"], "title": item["title"], "direction": direction["label"], "status": "ok", "output": str(destination.relative_to(ROOT)), "dimensions": "1600x944", "format": "webp", "cost_usd": cost, "usage": usage})
                print(f"OK target={row['target_template_id']} source={row['source_template_id']} cost={cost}")
                break
            except Exception as exc:  # Keep the exact error in the report and retry only transient API failures once.
                error = exc
                if attempt == MAX_ATTEMPTS:
                    results.append({"target_template_id": row["target_template_id"], "source_template_id": row["source_template_id"], "title": item["title"], "direction": direction["label"], "status": "failed", "error": str(exc), "cost_usd": None})
                    print(f"FAILED target={row['target_template_id']} source={row['source_template_id']} error={exc}")
                else:
                    time.sleep(3)
        if error is not None and results[-1]["status"] == "failed":
            continue
    status = "generated" if all(row["status"] in {"ok", "skipped_existing"} for row in results) else "generated-with-failures"
    write_report(config, results, status)
    print(f"COMPLETE status={status} outputs={len(results)}")


if __name__ == "__main__":
    main()
