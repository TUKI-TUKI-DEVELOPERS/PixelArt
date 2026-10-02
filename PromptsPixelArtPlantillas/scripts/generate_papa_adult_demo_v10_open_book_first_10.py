#!/usr/bin/env python3
"""Generate the approved V10 open-book preview set: first 10 × two adult directions.

V10 keeps the approved V9 fantasy themes and deterministic Spanish editorial typography.
The only visual-system change is mandatory: every scene is generated as a front-facing
open interior spread with physical paper rims, a binding crease and matte page texture.
The already reviewed template 01 Hijo→Papá is reused byte-for-byte; the other 19 are
created through gpt-image-2. This script never uploads to MinIO or changes PostgreSQL.
"""

from __future__ import annotations

import argparse
import base64
import copy
import importlib.util
import io
import json
import math
import shutil
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
SCRIPTS = ROOT / "scripts"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-first-10"
WORK = OUTPUT / "work"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
APPROVED_HIJO_01 = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-ai-pilot" / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV10.webp"
BUCKET = "pixelart-assets"
PREFIX = "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/"
CANVAS = (1600, 944)
EDIT_SIZE = "1536x1024"
MAX_ATTEMPTS = 2
CENTER_X = CANVAS[0] // 2


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


v3 = load_module("papa_v10_v3", SCRIPTS / "generate_papa_hijo_adult_first_10_peru_v3.py")
v9_first = load_module("papa_v10_first", SCRIPTS / "generate_papa_adult_demo_v9_reference_pilot.py")
v9_remaining = load_module("papa_v10_remaining", SCRIPTS / "generate_papa_adult_demo_v9_reference_remaining.py")
v9_03_10 = load_module("papa_v10_03_10", SCRIPTS / "generate_papa_adult_demo_v9_templates_03_10_webp.py")
base = v3.base

DIRECTIONS = {
    "hijo": {
        "label": "Hijo adulto → Papá",
        "slug": "hijo_a_papa",
        "person": "Mateo, his fictional Peruvian-Latin adult son of 32, wearing mature contemporary dark-blue clothing",
        "display_suffix": "De Hijo a Papá",
    },
    "hija": {
        "label": "Hija adulta → Papá",
        "slug": "hija_a_papa",
        "person": "María, his fictional Peruvian-Latin adult daughter of 30, wearing mature contemporary dark-blue clothing",
        "display_suffix": "De Hija a Papá",
    },
}


def item_for(number: int, direction: str) -> dict:
    if number == 1 and direction == "hijo":
        item = copy.deepcopy(v9_first.ITEM)
        item.update(
            {
                "reference_key": v9_first.REFERENCE_KEY,
                "theme": "Leo is an original adult superhero in deep blue, copper and gold, with an elegant flowing cape and an abstract heart-shaped light at his chest. Mateo looks at him with gratitude and pride.",
                "layout": "Keep Papá Leo in the central hero position and Mateo fully in the lower-right page below the poem area.",
                "title_max_width": 470,
                "approved_source": APPROVED_HIJO_01,
            }
        )
        return item

    if number in {1, 2}:
        target_direction = "Hija" if direction == "hija" else "Hijo"
        source = next(
            item
            for item in v9_remaining.TEMPLATES
            if item["number"] == number and item["direction"].startswith(target_direction)
        )
        item = copy.deepcopy(source)
        item["title_max_width"] = 470
        return item

    item = copy.deepcopy(v9_03_10.TEMPLATES[number])
    item["number"] = number
    item["reference_key"] = PREFIX + item["reference_name"]
    item["reference_label"] = f"{number:02d}-{item['slug']}"
    item["layout"] = (
        "Preserve the supplied reference's successful scene placement exactly: retain its compact upper-left title field, "
        "quiet upper-right poem field, and its relationship staging away from those text zones."
    )
    item["title_max_width"] = 400
    return item


def output_path(item: dict, direction: dict) -> Path:
    slug = item["slug"]
    direction_suffix = f"_{direction['slug']}"
    if slug.endswith(direction_suffix):
        slug = slug[: -len(direction_suffix)]
    return OUTPUT / "webp" / f"plantilla_{item['number']:02d}_{slug}_{direction['slug']}.webp"


def raw_path(item: dict, direction: dict) -> Path:
    return WORK / f"raw-{item['number']:02d}-{direction['slug']}.png"


def normalized_keys(key: str) -> list[str]:
    return [unicodedata.normalize(form, key) for form in ("NFC", "NFD")]


def fetch_reference(item: dict) -> Path:
    label = item.get("reference_label", item["slug"])
    destination = WORK / f"infant-{label}-open-book-reference.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        with Image.open(destination) as image:
            if image.size != CANVAS:
                image.convert("RGB").resize(CANVAS, Image.Resampling.LANCZOS).save(destination)
        return destination
    errors: list[str] = []
    for key in normalized_keys(item["reference_key"]):
        try:
            with urlopen(f"http://localhost:9000/{BUCKET}/{quote(key, safe='/')}", timeout=30) as response:
                destination.write_bytes(response.read())
            with Image.open(destination) as image:
                if image.size != CANVAS:
                    # Some older memorial references were uploaded at 1633x963 with the
                    # same aspect ratio as the adult canvas. Normalize the local working
                    # copy so dry-run and generation can still use the real infant art.
                    # Only a matching aspect ratio may be rescaled: anything else would be
                    # stretched silently, and the textless pass blurs fixed rectangles that
                    # assume the canvas proportions.
                    desvio = abs(image.width / image.height - CANVAS[0] / CANVAS[1])
                    if desvio / (CANVAS[0] / CANVAS[1]) > 0.01:
                        raise RuntimeError(
                            f"Reference {item['reference_key']} is {image.size}, a different "
                            f"aspect ratio than {CANVAS}. Fix the source art instead of rescaling.")
                    image.convert("RGB").resize(CANVAS, Image.Resampling.LANCZOS).save(destination)
            return destination
        except (urllib.error.URLError, urllib.error.HTTPError, OSError, RuntimeError) as exc:
            errors.append(str(exc))
    raise RuntimeError(f"Could not fetch reference for {item['slug']}: {' | '.join(errors)}")


def make_textless_reference(item: dict) -> Path:
    label = item.get("reference_label", item["slug"])
    destination = WORK / f"infant-{label}-open-book-textless.png"
    if destination.exists():
        return destination
    source = Image.open(fetch_reference(item)).convert("RGB")
    blurred = source.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", source.size, 0)
    draw = ImageDraw.Draw(mask)
    # Typography alone is blurred. The physical page rim and center crease must remain
    # available to image editing as the visual authority for the V10 book treatment.
    for box in ((0, 40, 560, 355), (1020, 190, 1600, 590)):
        draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    Image.composite(blurred, source, mask).save(destination, "PNG", optimize=True)
    return destination


def prompt_for(item: dict, direction: dict) -> str:
    return f"""Use the supplied image as a strict visual layout and physical-book reference, not as a source of identity, age, or readable text.

Create one hyperrealistic 1600×944 customer-demo interior spread for “{item['title']}”, front-facing and filling the full canvas. The required object is an OPEN BOOK INTERIOR, not a flat poster: retain two visible facing pages, a subtle pale outer paper edge, a natural vertical central binding gutter/crease, matte fine-art paper texture, soft inward shadows next to the crease, and slight page curvature toward the binding. The image must flow continuously across both pages. Do not make a product mockup: no cover, no table, no hands holding the book, no exterior background, no angled perspective.

{item['layout']} The top-right poem field from x=1000 through the right edge and y=70 through y=540 must be natural background only: no face, head, torso, hand, limb, clothing, prop, or foreground object may enter it. Keep faces, eyes, hands, title area, poem area and ornaments out of the central 10% gutter zone.

Replace all source people with Leo, a fictional Peruvian-Latin father of 58 with silver hair, a warm noble expression and an unmistakably adult face, plus {direction['person']}. Both people must be visibly adult, fully recognizable, large, photographic and in clear three-quarter view. {item['theme']}

Do not render any text, letters, numbers, logo, watermark, title, poem, separator, icon, panel, box, fake border, franchise character, recognizable costume, celebrity, child, anime, illustration, cartoon style, weapon, injury or violence. The existing book edges and central crease must look physically integrated into the paper, never drawn as graphic lines."""


def request_edit(reference: Path, item: dict, direction: dict, api_key: str) -> tuple[bytes, float | None, dict | None]:
    client = OpenAI(api_key=api_key)
    with reference.open("rb") as image_file:
        response = client.images.edit(
            model="gpt-image-2",
            image=image_file,
            prompt=prompt_for(item, direction),
            size=EDIT_SIZE,
            quality="medium",
            output_format="png",
        )
    b64 = response.data[0].b64_json if response.data else None
    if not b64:
        raise RuntimeError("OpenAI edit returned no image data")
    usage = response.usage.model_dump() if response.usage else None
    return base64.b64decode(b64), base.cost_from_usage(usage), usage


def fit_to_canvas(raw: bytes) -> Image.Image:
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    if image.size != (1536, 1024):
        raise RuntimeError(f"Unexpected edit dimensions {image.size}; expected 1536x1024")
    crop_height = round(image.width / (CANVAS[0] / CANVAS[1]))
    top = (image.height - crop_height) // 2
    return image.crop((0, top, image.width, top + crop_height)).resize(CANVAS, Image.Resampling.LANCZOS)


def apply_binding(image: Image.Image) -> Image.Image:
    """Finish the crease consistently when a foreground figure weakens it."""
    if image.size != CANVAS:
        raise RuntimeError(f"Expected {CANVAS}, received {image.size}")
    result = image.convert("RGBA")
    shadow = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    for x in range(CANVAS[0]):
        distance = abs(x - CENTER_X)
        alpha = int(21 * math.exp(-((distance / 52) ** 2)) + 52 * math.exp(-((distance / 9) ** 2)))
        if alpha:
            draw.line((x, 0, x, CANVAS[1]), fill=(11, 9, 7, alpha))
    for y in range(CANVAS[1]):
        normalized = abs((y - CANVAS[1] / 2) / (CANVAS[1] / 2))
        half_width = 3 + int(2 * normalized**1.8)
        draw.line((CENTER_X - half_width, y, CENTER_X + half_width, y), fill=(6, 5, 4, 125), width=1)
    draw.line((CENTER_X - 6, 10, CENTER_X - 4, CANVAS[1] - 10), fill=(179, 154, 117, 42), width=1)
    draw.line((CENTER_X + 5, 10, CENTER_X + 7, CANVAS[1] - 10), fill=(0, 0, 0, 85), width=1)
    return Image.alpha_composite(result, shadow)


def compose_editorial(background: Image.Image, item: dict, direction: dict, destination: Path) -> None:
    image = v3.soft_text_vignette(background.convert("RGBA"))
    draw = ImageDraw.Draw(image)

    title_font, title_lines = v3.fit_title(item["title"], item.get("title_max_width", 470))
    title_x, current_y, title_gap = 74, 84, 2
    title_block_width = 0
    for line in title_lines:
        v3.draw_gold_text(draw, (title_x, current_y), line, title_font, v3.GOLD_LIGHT)
        bbox = draw.textbbox((title_x, current_y), line, font=title_font)
        title_block_width = max(title_block_width, bbox[2] - bbox[0])
        current_y = bbox[3] + title_gap
    v3.draw_title_separator(draw, title_x, current_y + 15, max(320, title_block_width))

    layout = item.get("poem_layout", {})
    poem_font = v3.font(layout.get("font_size", 21), b"Medium")
    poem_center_x = 1260
    poem_y = layout.get("y", 128)
    poem_line_height = layout.get("line_height", 32)
    for line in item["poem"].splitlines():
        if line:
            bbox = draw.textbbox((0, 0), line, font=poem_font)
            poem_x = poem_center_x - ((bbox[2] - bbox[0]) // 2)
            v3.draw_gold_text(draw, (poem_x, poem_y), line, poem_font, v3.CREAM)
        poem_y += poem_line_height
    v3.draw_house_ornament(draw, poem_center_x, poem_y + layout.get("ornament_gap", 22))

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(destination, "WEBP", quality=96, method=6)
    with Image.open(destination) as output:
        if output.format != "WEBP" or output.size != CANVAS:
            raise RuntimeError(f"Output verification failed for {destination}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Validate all references and print the 20-item plan without calling OpenAI.")
    return parser.parse_args()


def write_report(results: list[dict]) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    report = {
        "scope": "Papá, Mi Héroe Adulto — V10 physical-open-book first 10 per direction",
        "method": "gpt-image-2 image edit from matching textless infant open-book reference + deterministic binding finish + deterministic local typography",
        "outputs": results,
        "total_cost_usd_excluding_input_image_tokens": round(sum(row.get("cost_usd") or 0 for row in results), 4),
    }
    (REVIEW / "demo-v10-open-book-first-10-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    args = parse_args()
    jobs = [(number, key, item_for(number, key), DIRECTIONS[key]) for number in range(1, 11) for key in ("hijo", "hija")]
    if args.dry_run:
        for number, key, item, direction in jobs:
            fetch_reference(item)
            print(f"READY template={number:02d} direction={key} reference={item['reference_key']}")
        print(f"READY jobs={len(jobs)} generated=19 reused_approved=1")
        return

    api_key = base.load_api_key()
    results: list[dict] = []
    for number, key, item, direction in jobs:
        destination = output_path(item, direction)
        if destination.exists():
            results.append({"template": number, "direction": direction["label"], "status": "skipped_existing", "output": str(destination.relative_to(ROOT)), "cost_usd": None})
            continue
        if "approved_source" in item:
            if not item["approved_source"].exists():
                raise RuntimeError(f"Approved V10 source is missing: {item['approved_source']}")
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item["approved_source"], destination)
            results.append({"template": number, "direction": direction["label"], "status": "reused_approved_v10", "output": str(destination.relative_to(ROOT)), "cost_usd": 0.0})
            print(f"REUSED template={number:02d} direction={key} output={destination.relative_to(ROOT)}")
            continue

        reference = make_textless_reference(item)
        error = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost, usage = request_edit(reference, item, direction, api_key)
                raw_path(item, direction).write_bytes(raw)
                composed_background = apply_binding(fit_to_canvas(raw))
                compose_editorial(composed_background, item, direction, destination)
                results.append({"template": number, "title": item["title"], "direction": direction["label"], "status": "ok", "output": str(destination.relative_to(ROOT)), "dimensions": "1600x944", "format": "webp", "cost_usd": cost, "usage": usage})
                print(f"OK template={number:02d} direction={key} attempt={attempt} cost=${cost if cost is not None else '?'}")
                break
            except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
                error = str(exc)
                print(f"FAILED template={number:02d} direction={key} attempt={attempt}: {error}")
                retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
                if attempt < MAX_ATTEMPTS and retryable:
                    time.sleep(2)
                    continue
                results.append({"template": number, "title": item["title"], "direction": direction["label"], "status": "failed", "output": None, "cost_usd": None, "error": error})
                break
    write_report(results)
    failures = [row for row in results if row["status"] == "failed"]
    print(f"COMPLETED total={len(results)} generated={sum(row['status']=='ok' for row in results)} reused={sum(row['status']=='reused_approved_v10' for row in results)} skipped={sum(row['status']=='skipped_existing' for row in results)} failed={len(failures)} cost=${sum(row.get('cost_usd') or 0 for row in results):.4f}")
    if failures:
        raise SystemExit("One or more V10 generations failed; do not deploy this partial set.")


if __name__ == "__main__":
    main()
