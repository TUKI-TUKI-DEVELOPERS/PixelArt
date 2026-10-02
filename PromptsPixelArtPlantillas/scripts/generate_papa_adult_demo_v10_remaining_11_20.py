#!/usr/bin/env python3
"""Generate V10 previews for adult Papá positions 11–20 in both directions.

The source config preserves each existing adult theme, scene and poem. Its matching
existing adult preview is supplied as a textless layout reference; V10 regenerates the
scene as a physical open-book interior and draws all Spanish typography locally. This
script is review-only: it never uploads to MinIO or changes PostgreSQL.
"""

from __future__ import annotations

import argparse
import base64
import importlib.util
import io
import json
import re
import sys
import time
import unicodedata
import urllib.error
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen

from openai import OpenAI, OpenAIError
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FIRST_TEN_SCRIPT = ROOT / "scripts" / "generate_papa_adult_demo_v10_open_book_first_10.py"
CONFIG = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "v10-remaining-11-20-source-config.json"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-remaining-11-20"
WORK = OUTPUT / "work"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
BUCKET = "pixelart-assets"
CANVAS = (1600, 944)
EDIT_SIZE = "1536x1024"
MAX_ATTEMPTS = 2


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


v10 = load_module("papa_v10_first_ten", FIRST_TEN_SCRIPT)
base = v10.base


DIRECTIONS = {
    "HE_TO_HE": {
        "slug": "hijo_a_papa",
        "label": "Hijo adulto → Papá",
        "recipient_name": "Leonardo",
        "recipient_nickname": "Papá Leo",
        "dedicator_name": "Mateo",
        "dedicator_description": "Mateo, his fictional Peruvian-Latin adult son of 32, in mature contemporary clothing",
        "suffix": "De Hijo a Papá",
    },
    "SHE_TO_HE": {
        "slug": "hija_a_papa",
        "label": "Hija adulta → Papá",
        "recipient_name": "Leonardo",
        "recipient_nickname": "Papá Leo",
        "dedicator_name": "María",
        "dedicator_description": "María, his fictional Peruvian-Latin adult daughter of 30, in mature contemporary clothing",
        "suffix": "De Hija a Papá",
    },
}


def title_from_name(name: str, direction: dict) -> str:
    suffix = f" {direction['suffix']}"
    if not name.endswith(suffix):
        raise RuntimeError(f"Template name does not end in expected direction suffix: {name}")
    return name[: -len(suffix)].upper()


def slugify(title: str) -> str:
    folded = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", "_", folded).strip("_")


def substitute_preview_tokens(value: str, direction: dict) -> str:
    replacements = {
        "{NOMBRE_DESTINATARIO}": direction["recipient_name"],
        "{APODO_DESTINATARIO}": direction["recipient_nickname"],
        "{NOMBRE_DEDICANTE}": direction["dedicator_name"],
        "{APODO_DEDICANTE}": direction["dedicator_name"],
    }
    for token, replacement in replacements.items():
        value = value.replace(token, replacement)
    return value


def destination(row: dict, direction: dict) -> Path:
    title = title_from_name(row["name"], direction)
    return OUTPUT / "webp" / f"plantilla_{row['position']:02d}_{slugify(title)}_{direction['slug']}.webp"


def raw_destination(row: dict, direction: dict) -> Path:
    return WORK / f"raw-{row['position']:02d}-{direction['slug']}.png"


def fetch_reference(row: dict, direction: dict) -> Path:
    destination = WORK / f"adult-{row['position']:02d}-{direction['slug']}-reference.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return destination
    candidates = [unicodedata.normalize(form, row["template_preview_key"]) for form in ("NFC", "NFD")]
    errors: list[str] = []
    for key in candidates:
        try:
            with urlopen(f"http://localhost:9000/{BUCKET}/{quote(key, safe='/')}", timeout=30) as response:
                destination.write_bytes(response.read())
            with Image.open(destination) as image:
                if image.size != CANVAS:
                    raise RuntimeError(f"Unexpected dimensions {image.size} for {key}")
            return destination
        except (urllib.error.URLError, urllib.error.HTTPError, OSError, RuntimeError) as exc:
            errors.append(str(exc))
    raise RuntimeError(f"Could not fetch reference for template {row['id']}: {' | '.join(errors)}")


def make_textless_reference(row: dict, direction: dict) -> Path:
    destination = WORK / f"adult-{row['position']:02d}-{direction['slug']}-textless.png"
    if destination.exists():
        return destination
    source = Image.open(fetch_reference(row, direction)).convert("RGB")
    blurred = source.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", source.size, 0)
    draw = ImageDraw.Draw(mask)
    # Existing adult previews consistently reserve these two editorial areas. Blur only
    # their old typography, preserving source composition, page rims and binding.
    for box in ((0, 40, 600, 380), (1000, 70, 1600, 590)):
        draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    Image.composite(blurred, source, mask).save(destination, "PNG", optimize=True)
    return destination


def prompt_for(row: dict, direction: dict) -> str:
    title = title_from_name(row["name"], direction)
    scene = substitute_preview_tokens(row["scene_visual"], direction)
    return f"""Use the supplied image as a strict visual layout and physical-book reference, not as a source of identity or readable text.

Create one hyperrealistic 1600×944 customer-demo interior spread for “{title}”, front-facing and filling the full canvas. The required object is an OPEN BOOK INTERIOR, not a flat poster: retain two visible facing pages, a subtle pale outer paper edge, a natural vertical central binding gutter/crease, matte fine-art paper texture, soft inward shadows next to the crease, and slight page curvature toward the binding. The image must flow continuously across both pages. Do not make a product mockup: no cover, no table, no hands holding the book, no exterior background, no angled perspective.

Preserve the supplied reference's approved visual hierarchy: compact title area on the upper-left page, a calm upper-right poem area, and all characters staged away from both text areas and the center binding. The poem field from x=1000 through the right edge and y=70 through y=560 must remain natural background only, with no face, head, torso, hand, limb, clothing, prop, or foreground object. Use the following only for scene, relationship, setting and mood; ignore any phrase that describes a flat/full-bleed image or printed typography: {scene}

Replace every source person with Papá Leo, a fictional Peruvian-Latin father of 58 with silver hair, a warm noble expression and an unmistakably adult face, plus {direction['dedicator_description']}. Both people must be visibly adult, fully recognizable, photographic and in clear three-quarter view.

Do not render any text, letters, numbers, logo, watermark, title, poem, separator, icon, panel, box, fake border, child, celebrity, anime, illustration, cartoon style, weapon, injury or violence. The page edges and central crease must look physically integrated into the paper, never drawn as graphic lines."""


def request_edit(reference: Path, row: dict, direction: dict, api_key: str) -> tuple[bytes, float | None, dict | None]:
    client = OpenAI(api_key=api_key)
    with reference.open("rb") as image_file:
        response = client.images.edit(
            model="gpt-image-2",
            image=image_file,
            prompt=prompt_for(row, direction),
            size=EDIT_SIZE,
            quality="medium",
            output_format="png",
        )
    b64 = response.data[0].b64_json if response.data else None
    if not b64:
        raise RuntimeError("OpenAI edit returned no image data")
    usage = response.usage.model_dump() if response.usage else None
    return base64.b64decode(b64), base.cost_from_usage(usage), usage


def to_item(row: dict, direction: dict) -> dict:
    return {
        "number": row["position"],
        "title": title_from_name(row["name"], direction),
        "title_max_width": 400,
        "poem": substitute_preview_tokens(row["poem_template"], direction),
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Validate all source references without calling the image API.")
    return parser.parse_args()


def write_report(results: list[dict]) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    report = {
        "scope": "Papá, Mi Héroe Adulto — V10 physical-open-book remaining positions 11–20 per direction",
        "method": "gpt-image-2 image edit from matching existing adult open-book reference + deterministic binding finish + deterministic local typography",
        "outputs": results,
        "total_cost_usd_excluding_input_image_tokens": round(sum(row.get("cost_usd") or 0 for row in results), 4),
    }
    (REVIEW / "demo-v10-open-book-remaining-11-20-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    args = parse_args()
    config = json.loads(CONFIG.read_text())
    rows = config["templates"]
    if len(rows) != 20:
        raise RuntimeError(f"Expected 20 config rows, got {len(rows)}")
    jobs = [(row, DIRECTIONS[row["gender_direction"]]) for row in rows]
    if args.dry_run:
        for row, direction in jobs:
            fetch_reference(row, direction)
            print(f"READY template_id={row['id']} position={row['position']} direction={direction['slug']}")
        print("READY jobs=20")
        return

    api_key = base.load_api_key()
    results: list[dict] = []
    for row, direction in jobs:
        output = destination(row, direction)
        if output.exists():
            results.append({"template_id": row["id"], "position": row["position"], "direction": direction["label"], "status": "skipped_existing", "output": str(output.relative_to(ROOT)), "cost_usd": None})
            continue
        reference = make_textless_reference(row, direction)
        error = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost, usage = request_edit(reference, row, direction, api_key)
                raw_destination(row, direction).write_bytes(raw)
                item = to_item(row, direction)
                background = v10.apply_binding(v10.fit_to_canvas(raw))
                v10.compose_editorial(background, item, direction, output)
                results.append({"template_id": row["id"], "position": row["position"], "title": item["title"], "direction": direction["label"], "status": "ok", "output": str(output.relative_to(ROOT)), "dimensions": "1600x944", "format": "webp", "cost_usd": cost, "usage": usage})
                print(f"OK template_id={row['id']} position={row['position']} direction={direction['slug']} attempt={attempt} cost=${cost if cost is not None else '?'}")
                break
            except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
                error = str(exc)
                print(f"FAILED template_id={row['id']} position={row['position']} direction={direction['slug']} attempt={attempt}: {error}")
                retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
                if attempt < MAX_ATTEMPTS and retryable:
                    time.sleep(2)
                    continue
                results.append({"template_id": row["id"], "position": row["position"], "direction": direction["label"], "status": "failed", "output": None, "cost_usd": None, "error": error})
                break
    write_report(results)
    failures = [row for row in results if row["status"] == "failed"]
    print(f"COMPLETED total={len(results)} generated={sum(row['status']=='ok' for row in results)} skipped={sum(row['status']=='skipped_existing' for row in results)} failed={len(failures)} cost=${sum(row.get('cost_usd') or 0 for row in results):.4f}")
    if failures:
        raise SystemExit("One or more V10 generations failed; do not deploy this partial set.")


if __name__ == "__main__":
    main()
