#!/usr/bin/env python3
"""No-cost title-safe recomposition for corrected V10 infant-theme outputs.

Preserves each approved AI background and physical binding, but adds a feathered matte
paper field beneath the local title so no title is placed directly over a person.
Original generated WebP files are copied to `before-title-safe/` before replacement.
"""

from __future__ import annotations

import importlib.util
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
CORRECTED = SCRIPTS / "generate_papa_adult_demo_v10_corrected_infant_themes_11_20.py"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-corrected-infant-themes-11-20"
WORK = OUTPUT / "work"
WEBP = OUTPUT / "webp"
BACKUP = OUTPUT / "before-title-safe"
CANVAS = (1600, 944)


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


corrected = load_module("papa_v10_corrected_recompose", CORRECTED)
first_ten = corrected.first_ten


def matte_title_field(image: Image.Image) -> Image.Image:
    """Create a page-integrated, edgeless matte paper field under the title."""
    # No border, no box stroke: only a wide, feathered paper-density change in the
    # title region. Its opacity deliberately removes faces/figures from beneath text.
    mask = Image.new("L", CANVAS, 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle((34, 42, 590, 370), fill=246)
    mask = mask.filter(ImageFilter.GaussianBlur(32))
    overlay = Image.new("RGBA", CANVAS, (29, 24, 19, 0))
    overlay.putalpha(mask)
    return Image.alpha_composite(image, overlay)


def compose(background: Image.Image, item: dict, direction: dict, destination: Path) -> None:
    v3 = first_ten.v3
    image = matte_title_field(v3.soft_text_vignette(background.convert("RGBA")))
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
    image.convert("RGB").save(destination, "WEBP", quality=96, method=6)


def main() -> None:
    config = corrected.load_config()
    corrected.validate_database_lineage(config["templates"])
    first_ten.OUTPUT = OUTPUT
    first_ten.WORK = WORK
    BACKUP.mkdir(parents=True, exist_ok=True)
    for row in config["templates"]:
        item = corrected.item_for(row)
        direction = corrected.DIRECTIONS[corrected.direction_key(row)]
        destination = first_ten.output_path(item, direction)
        raw = first_ten.raw_path(item, direction)
        if not raw.exists() or not destination.exists():
            raise RuntimeError(f"Missing raw or output for target {row['target_template_id']}")
        backup = BACKUP / destination.name
        if not backup.exists():
            shutil.copy2(destination, backup)
        background = first_ten.apply_binding(first_ten.fit_to_canvas(raw.read_bytes()))
        compose(background, item, direction, destination)
        with Image.open(destination) as output:
            if output.format != "WEBP" or output.size != CANVAS:
                raise RuntimeError(f"Invalid recomposed output {destination}")
        print(f"RECOMPOSED target={row['target_template_id']} output={destination.name}")
    print("COMPLETE recomposed=20 cost_usd=0")


if __name__ == "__main__":
    main()
