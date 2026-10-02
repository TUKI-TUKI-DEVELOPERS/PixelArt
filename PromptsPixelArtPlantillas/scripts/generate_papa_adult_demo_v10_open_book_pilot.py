#!/usr/bin/env python3
"""Generate only V10 template 01, Hijo adulto → Papá, with physical open-book treatment.

The image-edit input is the existing infant preview after readable text is feathered out.
It is used as a hard visual reference for the front-facing interior double-page geometry:
page edges, central binding crease, matte paper and shallow curvature. The generated
scene replaces all people with adults; the shared local compositor adds deterministic
Spanish title and poem. This script is review-only: it never uploads or updates SQL.
"""

from __future__ import annotations

import base64
import importlib.util
import io
import json
import sys
import time
import urllib.error
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlretrieve

from openai import OpenAI, OpenAIError
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
V3_SCRIPT = ROOT / "scripts" / "generate_papa_hijo_adult_first_10_peru_v3.py"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v10-open-book-ai-pilot"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
WORK = OUTPUT / "work"
CANVAS = (1600, 944)
EDIT_SIZE = "1536x1024"
MAX_ATTEMPTS = 2
REFERENCE_KEY = "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal.png"

spec = importlib.util.spec_from_file_location("papa_demo_v3", V3_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V3_SCRIPT}")
v3 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v3
spec.loader.exec_module(v3)
base = v3.base

ITEM = {
    "number": 1,
    "direction": "Hijo adulto → Papá",
    "slug": "mi_superheroe_personal_hijo_a_papa",
    "title": "MI SUPERHÉROE PERSONAL",
    "title_max_width": 470,
    "title_x": 74,
    "title_y": 84,
    "poem": "Papá Leo,\ncuando el mundo pesa demasiado,\ntu forma de estar a mi lado\nconvierte el miedo en camino.\n\nNo llevas capa ni emblema:\nllevas paciencia, verdad y abrigo.\nPor eso, en cada noche difícil,\nsigues siendo mi superhéroe personal.",
}


def output_path() -> Path:
    return OUTPUT / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV10.png"


def webp_path() -> Path:
    return output_path().with_suffix(".webp")


def fetch_reference() -> Path:
    destination = WORK / "infant-open-book-reference-original.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return destination
    url = f"http://localhost:9000/pixelart-assets/{quote(REFERENCE_KEY, safe='/')}"
    urlretrieve(url, destination)
    return destination


def make_textless_reference(source: Path) -> Path:
    """Keep the physical-book visual language while making old child text unreadable."""
    destination = WORK / "infant-open-book-reference-textless.png"
    if destination.exists():
        return destination
    image = Image.open(source).convert("RGB")
    blurred = image.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", image.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    # Text only. The outer page rim and central physical crease stay intact.
    for box in ((0, 40, 560, 355), (1020, 190, 1600, 590)):
        mask_draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    Image.composite(blurred, image, mask).save(destination, "PNG", optimize=True)
    return destination


def make_prompt() -> str:
    return """Use the supplied image as a strict visual layout and physical-book reference, not as a source of identity, age, or readable text.

Create one hyperrealistic 1600×944 customer-demo interior spread for “Mi Superhéroe Personal”, front-facing and filling the full canvas. The required object is an OPEN BOOK INTERIOR, not a flat poster: retain two visible facing pages, a subtle pale outer paper edge, a natural vertical central binding gutter/crease, matte fine-art paper texture, soft inward shadows next to the crease, and slight page curvature toward the binding. The image must flow continuously across both pages. Do not make a product mockup: no cover, no table, no hands holding the book, no exterior background, no angled perspective.

Maintain the supplied composition: a compact quiet title area in the upper-left page, Papá Leo in the central hero position but fully clear of title and center gutter, the adult son in the lower-right page below a calm poem area, and quiet negative space in the upper-right page. Keep faces, eyes, hands, title area, poem area and ornaments out of the central 10% gutter zone.

Replace all people from the reference. Papá Leo is a fictional Peruvian-Latin man of 58 with silver hair, warm noble expression, visibly adult, wearing an original dark blue, copper and gold superhero suit, flowing cape and an abstract glowing heart-shaped light at his chest. Mateo is his fictional Peruvian-Latin adult son of 32 in contemporary dark-blue clothing, looking up at his father with gratitude and pride. Both people must be photorealistic, large, clear and unoccluded. Create a spectacular magical night sky, city and golden energy that remain coherent across both pages.

Do not render any text, letters, numbers, logo, watermark, title, poem, separator, icon, panel, box, fake border, franchise character, recognizable costume, weapon, violence, anime, illustration or cartoon. The existing book edges and central crease must look physically integrated into the paper, never drawn as graphic lines."""


def request_edit(reference: Path, api_key: str) -> tuple[bytes, float | None, dict | None]:
    client = OpenAI(api_key=api_key)
    with reference.open("rb") as image_file:
        response = client.images.edit(
            model="gpt-image-2",
            image=image_file,
            prompt=make_prompt(),
            size=EDIT_SIZE,
            quality="medium",
            output_format="png",
        )
    b64 = response.data[0].b64_json if response.data else None
    if not b64:
        raise RuntimeError("OpenAI edit returned no image data")
    usage = response.usage.model_dump() if response.usage else None
    return base64.b64decode(b64), base.cost_from_usage(usage), usage


def fit_edit_to_canvas(raw: bytes) -> bytes:
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    if image.size != (1536, 1024):
        raise RuntimeError(f"Unexpected edit dimensions {image.size}; expected 1536x1024")
    crop_height = round(image.width / (CANVAS[0] / CANVAS[1]))
    top = (image.height - crop_height) // 2
    image = image.crop((0, top, image.width, top + crop_height)).resize(CANVAS, Image.Resampling.LANCZOS)
    output = io.BytesIO()
    image.save(output, "PNG", optimize=True)
    return output.getvalue()


def write_report(status: str, cost: float | None, usage: dict | None, error: str | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    report = {
        "scope": "Papá, Mi Héroe Adulto — template 01 Hijo → Papá — V10 physical open-book reference pilot",
        "status": status,
        "output": str(output_path()) if output_path().exists() else None,
        "webp_output": str(webp_path()) if webp_path().exists() else None,
        "reference_key": REFERENCE_KEY,
        "reference_method": "textless infant open-book preview supplied to images.edit; page rim and binding crease retained",
        "model": "gpt-image-2",
        "edit_size": EDIT_SIZE,
        "final_size": "1600x944",
        "cost_usd_excluding_input_image_tokens": cost,
        "usage": usage,
        "error": error,
    }
    (REVIEW / "demo-v10-open-book-hijo-01-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    if output_path().exists() or webp_path().exists():
        print(f"SKIP existing {output_path().relative_to(ROOT)}")
        return
    api_key = base.load_api_key()
    reference = make_textless_reference(fetch_reference())
    error = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            raw, cost, usage = request_edit(reference, api_key)
            v3.compose_editorial_art(fit_edit_to_canvas(raw), ITEM, output_path())
            with Image.open(output_path()) as image:
                image.convert("RGB").save(webp_path(), "WEBP", quality=96, method=6)
            write_report("ok", cost, usage, None)
            print(f"OK attempt={attempt} output={output_path().relative_to(ROOT)} webp={webp_path().relative_to(ROOT)} cost=${cost if cost is not None else '?'}")
            return
        except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
            error = str(exc)
            print(f"FAILED attempt={attempt}: {error}")
            retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
            if attempt < MAX_ATTEMPTS and retryable:
                time.sleep(2)
                continue
            break
    write_report("failed", None, None, error)
    raise SystemExit(error or "Unknown generation failure")


if __name__ == "__main__":
    main()
