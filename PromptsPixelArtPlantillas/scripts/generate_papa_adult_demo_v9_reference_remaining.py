#!/usr/bin/env python3
"""Generate the three remaining Papá adult reference-layout pilot previews.

Uses the V9 image-edit method approved for template 01 Hijo→Papá: each current flat
infant preview provides composition only, adult people replace the child characters,
and deterministic typography is added locally. No MinIO upload or app data change.
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
BUCKET = "pixelart-assets"

spec = importlib.util.spec_from_file_location("papa_demo_v3", V3_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V3_SCRIPT}")
v3 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v3
spec.loader.exec_module(v3)
base = v3.base

REFERENCE_SUPERHERO = "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal.png"
REFERENCE_KNIGHT = "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/PLANTILLA_2_Mi_Caballero_de_Armadura_Brillante.png"

TEMPLATES = [
    {
        "number": 1,
        "direction": "Hija adulta → Papá",
        "slug": "mi_superheroe_personal_hija_a_papa",
        "title": "MI SUPERHÉROE PERSONAL",
        "poem": "Papá Leo,\ncuando el mundo pesa demasiado,\ntu forma de estar a mi lado\nconvierte el miedo en camino.\n\nNo llevas capa ni emblema:\nllevas paciencia, verdad y abrigo.\nPor eso, en cada noche difícil,\nsigues siendo mi superhéroe personal.",
        "reference_key": REFERENCE_SUPERHERO,
        "reference_label": "superhero",
        "people": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión cálida, y María, su hija adulta peruano-latina ficticia de 30 años, expresión agradecida y madura",
        "theme": "Leo es un superhéroe adulto original de azul profundo, cobre y oro, con capa elegante y una fuente de luz abstracta con forma de corazón en el pecho. María usa ropa contemporánea azul oscuro.",
        "layout": "Preservar la composición plana de referencia: Papá al centro como héroe, hija adulta completa abajo a la derecha, claramente debajo del poema.",
    },
    {
        "number": 2,
        "direction": "Hijo adulto → Papá",
        "slug": "mi_caballero_de_armadura_brillante_hijo_a_papa",
        "title": "MI CABALLERO DE ARMADURA BRILLANTE",
        "poem": "Hay puentes que parecen imposibles\ncuando uno los mira desde lejos;\npero la confianza aprende a cruzarlos\npaso a paso, sin hacer ruido.\n\nPapá Leo, tu palabra fue mi armadura:\nme enseñaste a avanzar erguido.\nGracias por ser mi caballero\nde alma noble y mirada brillante.",
        "reference_key": REFERENCE_KNIGHT,
        "reference_label": "knight",
        "people": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión noble, y Mateo, su hijo adulto peruano-latino ficticio de 32 años, expresión agradecida y madura",
        "theme": "Leo es un caballero adulto original y mágico, con abrigo ceremonial azul profundo y protección de constelaciones luminosas alrededor de los hombros; no lleva armadura metálica pesada ni armas. Mateo usa ropa de explorador contemporánea.",
        "layout": "Preservar la composición plana de referencia: Papá ocupa el centro-derecha, hijo adulto completo abajo a la izquierda y por debajo del título compacto. El poema queda libre arriba a la derecha.",
    },
    {
        "number": 2,
        "direction": "Hija adulta → Papá",
        "slug": "mi_caballero_de_armadura_brillante_hija_a_papa",
        "title": "MI CABALLERO DE ARMADURA BRILLANTE",
        "poem": "Hay puentes que parecen imposibles\ncuando una los mira desde lejos;\npero la confianza aprende a cruzarlos\npaso a paso, sin hacer ruido.\n\nPapá Leo, tu palabra fue mi armadura:\nme enseñaste a avanzar erguida.\nGracias por ser mi caballero\nde alma noble y mirada brillante.",
        "reference_key": REFERENCE_KNIGHT,
        "reference_label": "knight",
        "people": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión noble, y María, su hija adulta peruano-latina ficticia de 30 años, expresión agradecida y madura",
        "theme": "Leo es un caballero adulto original y mágico, con abrigo ceremonial azul profundo y protección de constelaciones luminosas alrededor de los hombros; no lleva armadura metálica pesada ni armas. María usa ropa de exploradora contemporánea.",
        "layout": "Preservar la composición plana de referencia: Papá ocupa el centro-derecha, hija adulta completa abajo a la izquierda y por debajo del título compacto. El poema queda libre arriba a la derecha.",
    },
]


def output_path(item: dict) -> Path:
    return OUTPUT / f"Plantilla_{item['number']:02d}_{item['slug']}_DemoV9.png"


def fetch_reference(key: str, label: str) -> Path:
    destination = WORK / f"infant-{label}-layout-original.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not destination.exists():
        urlretrieve(f"http://localhost:9000/{BUCKET}/{quote(key, safe='/')}", destination)
    return destination


def make_textless_reference(source: Path, label: str) -> Path:
    destination = WORK / f"infant-{label}-layout-textless-feathered.png"
    if destination.exists():
        return destination
    image = Image.open(source).convert("RGB")
    blurred = image.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    for box in ((0, 40, 560, 355), (1020, 190, 1600, 590)):
        draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    Image.composite(blurred, image, mask).save(destination, "PNG", optimize=True)
    return destination


def make_prompt(item: dict) -> str:
    return f"""Use the supplied image strictly as a composition reference, not as a source of identity or text.

Create a hyperrealistic, magical, flat customer-demo spread. Preserve the reference's successful visual structure exactly: a compact title area at the upper-left, calm natural negative space at the upper-right for a poem, and people staged away from both text areas. {item['layout']} Do not draw panels, boxes, borders, pages, books, a spine, mockups, text, words, numbers, logos, watermarks, or decorative typography.

Replace all people from the reference with {item['people']}. Both are visibly adult, have large clear three-quarter faces, and must not be hidden or become silhouettes. {item['theme']} Preserve the spectacular magical world of the reference—castle/city, golden energy, stars, clouds and fantasy atmosphere—without any protected character, recognizable franchise costume, known logo, child, weapon, violence, anime, illustration, or cartoon style."""


def request_edit(reference: Path, item: dict, api_key: str) -> tuple[bytes, float | None, dict | None]:
    client = OpenAI(api_key=api_key)
    with reference.open("rb") as image_file:
        response = client.images.edit(
            model="gpt-image-2",
            image=image_file,
            prompt=make_prompt(item),
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


def selected_templates(args: list[str]) -> list[dict]:
    """Require explicit individual targets to avoid accidental credit-consuming batches."""
    available = {item["slug"] for item in TEMPLATES}
    requested = set(args)
    if not requested:
        raise SystemExit(f"Pass one or more explicit slugs: {', '.join(sorted(available))}")
    unknown = requested - available
    if unknown:
        raise SystemExit(f"Unknown slug(s): {', '.join(sorted(unknown))}")
    return [item for item in TEMPLATES if item["slug"] in requested]


def main() -> None:
    api_key = base.load_api_key()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    selected = selected_templates(sys.argv[1:])
    results: list[dict] = []
    for item in selected:
        destination = output_path(item)
        if destination.exists():
            results.append({"direction": item["direction"], "number": item["number"], "status": "skipped", "path": str(destination), "cost_usd": None})
            continue
        reference = make_textless_reference(fetch_reference(item["reference_key"], item["reference_label"]), item["reference_label"])
        error = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost, usage = request_edit(reference, item, api_key)
                v3.compose_editorial_art(fit_edit_to_canvas(raw), item, destination)
                results.append({"direction": item["direction"], "number": item["number"], "status": "ok", "path": str(destination), "cost_usd": cost, "usage": usage})
                print(f"OK {item['direction']} #{item['number']} attempt={attempt} cost=${cost if cost is not None else '?'}")
                break
            except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
                error = str(exc)
                retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
                print(f"FAILED {item['direction']} #{item['number']} attempt={attempt}: {error}")
                if attempt < MAX_ATTEMPTS and retryable:
                    time.sleep(2)
                    continue
                results.append({"direction": item["direction"], "number": item["number"], "status": "failed", "path": None, "cost_usd": None, "error": error})
                break
    REVIEW.mkdir(parents=True, exist_ok=True)
    total_cost = round(sum(row.get("cost_usd") or 0 for row in results), 4)
    report = {"scope": "Papá adult DemoV9 remaining first-two templates", "method": "approved reference-layout image edit", "total_cost_usd_excluding_input_image_tokens": total_cost, "results": results}
    (REVIEW / "demo-v9-reference-remaining-01-02-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(f"Completed new={sum(row['status']=='ok' for row in results)}/{len(selected)} cost=${total_cost:.4f}")


if __name__ == "__main__":
    main()
