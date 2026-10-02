#!/usr/bin/env python3
"""Finish the physical binding on the single V10 open-book AI pilot.

The image model already produced the paper rims and page stack. This deterministic pass
only restores the central binding crease it under-emphasized when the hero crossed the
gutter. It does not regenerate art, alter typography, upload assets, or touch database
records.
"""

from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-ai-pilot"
SOURCE = OUTPUT / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV10.png"
BACKUP = OUTPUT / "work" / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV10-before-binding.png"
WEBP = SOURCE.with_suffix(".webp")
CANVAS = (1600, 944)
CENTER_X = CANVAS[0] // 2


def apply_binding(image: Image.Image) -> Image.Image:
    if image.size != CANVAS:
        raise RuntimeError(f"Expected {CANVAS}, received {image.size}")

    result = image.convert("RGBA")
    shadow = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)

    # The broad falloff is the inward page shade; the short dark band is the actual
    # paper fold. Both mimic the existing catalog rather than drawing a graphic rule.
    for x in range(CANVAS[0]):
        distance = abs(x - CENTER_X)
        alpha = int(21 * math.exp(-((distance / 52) ** 2)) + 52 * math.exp(-((distance / 9) ** 2)))
        if alpha:
            draw.line((x, 0, x, CANVAS[1]), fill=(11, 9, 7, alpha))

    for y in range(CANVAS[1]):
        normalized = abs((y - CANVAS[1] / 2) / (CANVAS[1] / 2))
        half_width = 3 + int(2 * normalized**1.8)
        draw.line(
            (CENTER_X - half_width, y, CENTER_X + half_width, y),
            fill=(6, 5, 4, 125),
            width=1,
        )

    # Tiny asymmetric highlights give the paper fold depth without changing the scene.
    draw.line((CENTER_X - 6, 10, CENTER_X - 4, CANVAS[1] - 10), fill=(179, 154, 117, 42), width=1)
    draw.line((CENTER_X + 5, 10, CENTER_X + 7, CANVAS[1] - 10), fill=(0, 0, 0, 85), width=1)
    return Image.alpha_composite(result, shadow)


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing V10 source: {SOURCE}")
    BACKUP.parent.mkdir(parents=True, exist_ok=True)
    if not BACKUP.exists():
        shutil.copy2(SOURCE, BACKUP)
    with Image.open(BACKUP) as source:
        finished = apply_binding(source)
    finished.convert("RGB").save(SOURCE, "PNG", optimize=True)
    finished.convert("RGB").save(WEBP, "WEBP", quality=96, method=6)
    with Image.open(SOURCE) as png, Image.open(WEBP) as webp:
        assert png.size == CANVAS and webp.size == CANVAS and webp.format == "WEBP"
    print(f"OK {SOURCE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
