#!/usr/bin/env python3
"""Generate one controlled adult demo from the proven infant layout reference.

This V9 pilot deliberately generates only template 01, Hijo adulto → Papá. It uses the
current flat infant preview as an image-edit layout reference, removes its child text,
and replaces the people with adult preview characters. Local typography is then added
by the shared compositor. It never uploads, changes SQL, manifests, frontend, or
production data.
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
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v9-reference-pilot"
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
    return OUTPUT / "Plantilla_01_mi_superheroe_personal_hijo_a_papa_DemoV9.png"


def fetch_reference() -> Path:
    bucket = "pixelart-assets"
    destination = WORK / "infant-layout-reference-original.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return destination
    url = f"http://localhost:9000/{bucket}/{quote(REFERENCE_KEY, safe='/')}"
    urlretrieve(url, destination)
    return destination


def make_textless_reference(source: Path) -> Path:
    """Erase readable child typography with feathered blur, never visible panels."""
    destination = WORK / "infant-layout-reference-textless-feathered.png"
    if destination.exists():
        return destination
    image = Image.open(source).convert("RGB")
    blurred = image.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", image.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    # Existing flat child layout: compact title left/top and poem right/top.
    # The strong feather keeps text unreadable without giving the edit model a box.
    for box in ((0, 40, 560, 355), (1020, 190, 1600, 590)):
        mask_draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    image = Image.composite(blurred, image, mask)
    image.save(destination, "PNG", optimize=True)
    return destination


def make_prompt() -> str:
    return """Use the supplied image strictly as a composition reference, not as a source of identity or text.

Create a hyperrealistic, magical, flat 1600×944 customer-demo spread for "Mi Superhéroe Personal". Preserve the reference's successful flat double-page structure: a compact title area at the upper-left, the father in the central hero position, the adult son in the lower-right below the poem area, and calm negative space at the upper-right for a poem. Keep all people fully clear of the title and poem locations. Do not draw panels, boxes, borders, pages, books, a spine, a mockup, text, words, numbers, logos, watermarks, or decorative typography.

Replace all people from the reference. Papá Leo is a fictional Peruvian-Latin man of 58, silver hair, warm and noble expression, visibly adult, in an original blue, copper, and gold superhero suit with a flowing cape and an abstract heart-shaped light source at his chest. Mateo is his fictional Peruvian-Latin adult son of 32, visibly adult, in contemporary dark blue clothing, looking at his father with gratitude and pride. Both faces must be clear, large, and in three-quarter view. The supernatural sky, city, stars, and golden energy must be spectacular and magical, but the people remain readable and unoccluded.

No protected characters, recognizable franchise costume, known logo, child, weapon, violence, anime, illustration, or cartoon style."""


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
        "scope": "Papá, Mi Héroe Adulto — template 01 Hijo → Papá — flat infant layout reference — DemoV9",
        "status": status,
        "output": str(output_path()) if output_path().exists() else None,
        "reference_key": REFERENCE_KEY,
        "reference_method": "textless infant flat layout sent through images.edit with high input fidelity",
        "model": "gpt-image-2",
        "edit_size": EDIT_SIZE,
        "final_size": "1600x944",
        "cost_usd_excluding_input_image_tokens": cost,
        "usage": usage,
        "error": error,
    }
    (REVIEW / "demo-v9-reference-hijo-01-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    if output_path().exists():
        print(f"SKIP existing {output_path().relative_to(ROOT)}")
        return
    api_key = base.load_api_key()
    source = fetch_reference()
    reference = make_textless_reference(source)
    error = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            raw, cost, usage = request_edit(reference, api_key)
            v3.compose_editorial_art(fit_edit_to_canvas(raw), ITEM, output_path())
            write_report("ok", cost, usage, None)
            print(f"OK attempt={attempt} output={output_path().relative_to(ROOT)} cost=${cost if cost is not None else '?'}")
            return
        except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
            error = str(exc)
            print(f"FAILED attempt={attempt}: {error}")
            # Configuration and validation errors are deterministic and must not
            # consume a second call. Only transient service errors may retry once.
            retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
            if attempt < MAX_ATTEMPTS and retryable:
                time.sleep(2)
                continue
            break
    write_report("failed", None, None, error)
    raise SystemExit(error or "Unknown generation failure")


if __name__ == "__main__":
    main()
