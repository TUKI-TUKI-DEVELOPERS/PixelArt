#!/usr/bin/env python3
"""Apply the established physical open-book treatment to one approved V9 preview.

No image-generation API call occurs here. The V9 scene and its deterministic text are
preserved; this compositor only adds the measured adult-preview treatment: paper edge,
page contour, center gutter and interior page shadows. The output is review-only and
is never uploaded by this script.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v9-reference-pilot" / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV9.png"
DESTINATION = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-pilot" / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV10.webp"
CANVAS = (1600, 944)
CENTER_X = CANVAS[0] // 2


def curved_line(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], fill: tuple[int, int, int, int], width: int) -> None:
    draw.line(points, fill=fill, width=width, joint="curve")


def compose_open_book(source: Image.Image) -> Image.Image:
    if source.size != CANVAS:
        raise RuntimeError(f"Expected {CANVAS}, received {source.size}")

    image = source.convert("RGBA")

    # The current adult references use a dark, narrow physical gutter plus a wider
    # inward page shadow. It is intentionally a gradient, never a single divider.
    gutter_shadow = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(gutter_shadow)
    for x in range(CANVAS[0]):
        distance = abs(x - CENTER_X)
        broad_shadow = 28 * math.exp(-((distance / 68) ** 2))
        inner_shadow = 70 * math.exp(-((distance / 12) ** 2))
        alpha = int(broad_shadow + inner_shadow)
        if alpha:
            shadow_draw.line((x, 0, x, CANVAS[1]), fill=(8, 7, 6, alpha))
    image = Image.alpha_composite(image, gutter_shadow)

    chrome = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(chrome)

    # Page contour: the outer rim is pale paper, while its paired dark line gives
    # a thin stack-of-pages appearance. The shallow curves match the reference
    # previews without distorting faces or the approved V9 composition.
    paper = (239, 230, 210, 190)
    paper_highlight = (255, 249, 235, 185)
    page_shadow = (20, 17, 14, 175)
    page_stack = (173, 157, 133, 110)

    curved_line(draw, [(5, 10), (205, 8), (510, 5), (CENTER_X - 8, 2)], paper_highlight, 2)
    curved_line(draw, [(CENTER_X + 8, 2), (1090, 5), (1395, 8), (1595, 10)], paper_highlight, 2)
    curved_line(draw, [(5, CANVAS[1] - 10), (205, CANVAS[1] - 8), (510, CANVAS[1] - 5), (CENTER_X - 8, CANVAS[1] - 2)], paper, 2)
    curved_line(draw, [(CENTER_X + 8, CANVAS[1] - 2), (1090, CANVAS[1] - 5), (1395, CANVAS[1] - 8), (1595, CANVAS[1] - 10)], paper, 2)

    draw.line((5, 10, 5, CANVAS[1] - 10), fill=paper_highlight, width=2)
    draw.line((1595, 10, 1595, CANVAS[1] - 10), fill=paper_highlight, width=2)
    draw.line((1, 12, 1, CANVAS[1] - 12), fill=page_shadow, width=2)
    draw.line((1599, 12, 1599, CANVAS[1] - 12), fill=page_shadow, width=2)

    # Subtle horizontal page stack marks near the exterior edges, visible only at
    # full size and consistent with the existing adult previews.
    for offset, alpha in ((14, 70), (18, 50), (22, 34)):
        draw.line((offset, 20, offset, CANVAS[1] - 20), fill=(230, 218, 195, alpha), width=1)
        draw.line((CANVAS[0] - offset, 20, CANVAS[0] - offset, CANVAS[1] - 20), fill=(230, 218, 195, alpha), width=1)

    # The central lomo is shaped, rather than a constant bar: it pinches gently at
    # the midpoint and deepens at the top/bottom where pages meet.
    left_spine: list[tuple[int, int]] = []
    right_spine: list[tuple[int, int]] = []
    for y in range(CANVAS[1]):
        normalized = abs((y - (CANVAS[1] / 2)) / (CANVAS[1] / 2))
        half_width = 4 + int(3 * (normalized ** 1.7))
        left_spine.append((CENTER_X - half_width, y))
        right_spine.append((CENTER_X + half_width, y))
    draw.polygon(left_spine + list(reversed(right_spine)), fill=(7, 6, 5, 205))
    draw.line((CENTER_X - 6, 8, CENTER_X - 4, CANVAS[1] - 8), fill=(116, 104, 90, 105), width=1)
    draw.line((CENTER_X + 5, 8, CENTER_X + 7, CANVAS[1] - 8), fill=(0, 0, 0, 145), width=1)

    # Small top and bottom notch/shadow where the folded pages converge.
    draw.polygon([(CENTER_X - 10, 2), (CENTER_X, 12), (CENTER_X + 10, 2)], fill=(5, 4, 3, 170))
    draw.polygon(
        [(CENTER_X - 12, CANVAS[1] - 2), (CENTER_X, CANVAS[1] - 16), (CENTER_X + 12, CANVAS[1] - 2)],
        fill=(5, 4, 3, 150),
    )

    return Image.alpha_composite(image, chrome)


def main() -> None:
    source = Image.open(SOURCE)
    result = compose_open_book(source)
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    result.convert("RGB").save(DESTINATION, "WEBP", quality=96, method=6)
    with Image.open(DESTINATION) as output:
        if output.format != "WEBP" or output.size != CANVAS:
            raise RuntimeError("V10 output verification failed")
    print(f"OK {DESTINATION.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
