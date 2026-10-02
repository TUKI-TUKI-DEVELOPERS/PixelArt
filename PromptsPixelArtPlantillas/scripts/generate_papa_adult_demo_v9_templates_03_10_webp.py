#!/usr/bin/env python3
"""Generate one WebP Papá adult V9 template (03–10) from its infant flat layout.

The script deliberately requires one template and one direction per invocation. This
keeps the credit-consuming image edits reviewable and prevents accidental batches.
It never uploads to MinIO or changes database/application data.
"""

from __future__ import annotations

import argparse
import base64
import importlib.util
import io
import json
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
V3_SCRIPT = ROOT / "scripts" / "generate_papa_hijo_adult_first_10_peru_v3.py"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v9-reference-pilot"
WEBP = OUTPUT / "webp"
WORK = OUTPUT / "work"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
BUCKET = "pixelart-assets"
PREFIX = "IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas/"
EDIT_SIZE = "1536x1024"
CANVAS = (1600, 944)
MAX_ATTEMPTS = 2
WEBP_QUALITY = 96

spec = importlib.util.spec_from_file_location("papa_demo_v3", V3_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V3_SCRIPT}")
v3 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v3
spec.loader.exec_module(v3)
base = v3.base

# The theme keeps the child book's central fantasy intact while changing only the
# ages, relationship wording, and unsafe child-only/violent details.
TEMPLATES = {
    3: {
        "slug": "mi_rey",
        "title": "MI REY",
        "reference_name": "PLANTILLA_3_Mi_Rey.png",
        "poem": "Papá Leo,\nen mi reino no mandan coronas:\nmandan tus manos, tu ejemplo\ny la calma con que nombras las cosas.\n\nMe enseñaste que ser rey\nes cuidar sin pedir aplauso.\nPor eso mi mejor riqueza\nes tenerte como padre y aliado.",
        "theme": "A grand magical throne hall of purple velvet, old gold, stained-glass light and floating palace constellations. Leo is a benevolent adult king in a deep purple royal coat with a refined gold crown and a ceremonial staff; the adult child is his royal companion. The impossible kingdom must feel monumental, warm and photorealistic.",
    },
    4: {
        "slug": "mi_angel_guardian",
        "title": "MI ÁNGEL GUARDIÁN",
        "reference_name": "PLANTILLA_4_Mi_Ángel_Guardián.png",
        "poem": "Papá Leo,\nno necesito alas para saber\nque alguien cuida mi camino:\ntu luz aparece cuando hace falta.\n\nEn las tormentas de la vida\ntu voz me devuelve la calma.\nMi ángel guardián tiene tu rostro,\ntu paso firme y tu forma de amar.",
        "theme": "A celestial adult guardian scene in a dramatic sky of cloud architecture, white-gold light and suspended feathers. Leo wears a refined white coat with luminous gold details and immense abstract wings made of light, not a religious icon. The adult child stands protected beside him beneath a tangible dome of light. Peaceful, spectacular magic; no halos, text, or religious symbols.",
    },
    5: {
        "slug": "mi_pirata_aventurero",
        "title": "MI PIRATA AVENTURERO",
        "reference_name": "PLANTILLA_5_Mi_Pirata_Aventurero.png",
        "poem": "Papá Leo,\ncontigo aprendí que un horizonte\nno es algo que se mira de lejos:\nes una pregunta que se navega.\n\nCuando el mar cambia de rumbo,\ntu risa me devuelve el valor.\nEres mi pirata aventurero,\nmi mejor brújula y mi hogar.",
        "theme": "An original magical pirate voyage: a grand wooden ship crossing a turquoise night ocean, sails shaped by constellations, a heart-shaped compass and luminous islands rising from the map. Leo is an elegant adult captain in linen, navy and copper; the adult child is his capable first mate. No skulls, protected pirates, logos, guns, or violence.",
    },
    6: {
        "slug": "mi_guerrero_protector",
        "title": "MI GUERRERO PROTECTOR",
        "reference_name": "PLANTILLA_6_Mi_Guerrero_Protector.png",
        "poem": "Papá Leo,\ntu fuerza nunca fue una batalla:\nfue abrirme espacio cuando dudaba\ny enseñarme a defender lo correcto.\n\nTu coraje no necesita ruido;\nse reconoce en tu forma de cuidar.\nMi guerrero protector, contigo\naprendí que ser fuerte es amar.",
        "theme": "A nonviolent magical protector in a windswept amber landscape. Leo wears a deep bronze and charcoal ceremonial coat with a flowing red cape; a heart-shaped shield of pure light opens a safe path through an impossible storm. The adult child stands with him, touching the luminous shield. No weapon, combat, army, injury, or violence.",
    },
    7: {
        "slug": "mi_capitan_piloto",
        "title": "MI CAPITÁN / PILOTO",
        "reference_name": "PLANTILLA_7_Mi_Capitán_Piloto.png",
        "poem": "Papá Leo,\ncuando no sabía hacia dónde ir,\ntu forma de mirar el horizonte\nme enseñó a confiar en el viaje.\n\nNo llevas mi vida por mí:\nme das criterio para pilotearla.\nMi capitán de todos los días,\ngracias por enseñarme a volar.",
        "theme": "An original exploration airship cockpit above copper sunset clouds, with an impossible celestial map and routes of light flowing through the sky. Leo wears an elegant navy exploration-pilot jacket with subtle copper trim, never an airline uniform; the adult child is the capable co-pilot. No aircraft brand, logo, commercial cabin, or real airline reference.",
        "poem_layout": {"font_size": 18, "y": 28, "line_height": 23, "ornament_gap": 6},
    },
    8: {
        "slug": "mi_vikingo_valiente",
        "title": "MI VIKINGO VALIENTE",
        "reference_name": "PLANTILLA_8_Mi_Vikingo_Valiente.png",
        "poem": "Papá Leo,\nme enseñaste a no huir del viento\nni a esperar que el mar esté quieto.\nTu valentía fue remar conmigo\ncuando el horizonte parecía lejano.\n\nMi vikingo valiente, tu ejemplo\nme dejó coraje para avanzar.\nContigo aprendí que la fuerza\ntambién sabe acompañar.",
        "theme": "An original northern explorer voyage: a longship travels a river of liquid auroras among impossible fjords. Leo wears a dignified grey wool and deep-blue ceremonial explorer coat with abstract copper clasps; the adult child rows beside him. The rowing awakens a luminous route across the water. No weapons, horned helmet, historic symbols, known characters, or violence.",
    },
    9: {
        "slug": "mi_arquitecto_de_suenos",
        "title": "MI ARQUITECTO DE SUEÑOS",
        "reference_name": "PLANTILLA_9_Mi_Arquitecto_de_Sueños.png",
        "poem": "Papá Leo,\nme mostraste que los sueños\nno llegan terminados a la puerta:\nse dibujan, se cuidan, se sostienen.\n\nEn cada plano de mi vida\nhay una línea que aprendí de ti.\nMi arquitecto de sueños, gracias\npor enseñarme a construir mi porvenir.",
        "theme": "A magical night architecture studio open to a city of light. Leo, in a rolled-sleeve white shirt and deep-blue work vest, and the adult child draw together on luminous plans. Their lines rise into full-scale impossible bridges, homes and towers of warm gold. No brand, real landmark, legible drafting text, or corporate logo.",
        "poem_layout": {"font_size": 18, "y": 28, "line_height": 23, "ornament_gap": 6},
    },
    10: {
        "slug": "mi_gladiador",
        "title": "MI GLADIADOR",
        "reference_name": "PLANTILLA_10_Mi_Gladiador.png",
        "poem": "Papá Leo,\nme enseñaste que vencer no es golpear:\nes sostenerse cuando algo cuesta\ny levantarse con dignidad.\n\nTu victoria más grande fue mostrarme\nque el amor también es valentía.\nMi gladiador de corazón noble,\ncontigo aprendí a no rendirme.",
        "theme": "A ceremonial magical arena of warm stone, stars and falling flower petals. Leo wears a matte-bronze, deep-blue ceremonial champion coat with a short cape; the adult child embraces him after they cross a radiant doorway together. Victory means affection and resilience. No weapons, fight, injury, Roman insignia, known monument, or violence.",
        "poem_layout": {"font_size": 18, "y": 28, "line_height": 23, "ornament_gap": 6},
    },
}

DIRECTIONS = {
    "hijo": {
        "label": "Hijo adulto → Papá",
        "slug": "hijo_a_papa",
        "person": "Mateo, his fictional Peruvian-Latin adult son of 32, in mature contemporary clothing",
    },
    "hija": {
        "label": "Hija adulta → Papá",
        "slug": "hija_a_papa",
        "person": "María, his fictional Peruvian-Latin adult daughter of 30, in mature contemporary clothing",
    },
}


def output_path(template: dict, direction: dict) -> Path:
    return WEBP / f"plantilla_{template['number']:02d}_{template['slug']}_{direction['slug']}.webp"


def normalized_keys(reference_name: str) -> list[str]:
    return [PREFIX + unicodedata.normalize(form, reference_name) for form in ("NFC", "NFD")]


def fetch_reference(template: dict) -> Path:
    destination = WORK / f"infant-{template['number']:02d}-{template['slug']}-layout-original.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return destination
    errors: list[str] = []
    for key in normalized_keys(template["reference_name"]):
        url = f"http://localhost:9000/{BUCKET}/{quote(key, safe='/')}"
        try:
            with urlopen(url, timeout=30) as response:
                destination.write_bytes(response.read())
            if Image.open(destination).size != CANVAS:
                raise RuntimeError(f"Unexpected reference dimensions in {key}")
            return destination
        except (urllib.error.URLError, urllib.error.HTTPError, OSError, RuntimeError) as exc:
            errors.append(str(exc))
    raise RuntimeError(f"Could not fetch layout reference {template['reference_name']}: {' | '.join(errors)}")


def make_textless_reference(template: dict) -> Path:
    destination = WORK / f"infant-{template['number']:02d}-{template['slug']}-layout-textless-feathered.png"
    if destination.exists():
        return destination
    source = Image.open(fetch_reference(template)).convert("RGB")
    blurred = source.filter(ImageFilter.GaussianBlur(34))
    mask = Image.new("L", source.size, 0)
    draw = ImageDraw.Draw(mask)
    # All current flat sources place the title upper-left and the poem upper-right.
    # A heavy feather removes text without defining literal rectangular panels.
    for box in ((0, 40, 560, 355), (1020, 190, 1600, 590)):
        draw.rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(58))
    Image.composite(blurred, source, mask).save(destination, "PNG", optimize=True)
    return destination


def prompt_for(template: dict, direction: dict) -> str:
    return f"""Use the supplied image strictly as a composition reference, not as a source of identity or text.

Create a hyperrealistic, spectacular magical, flat customer-demo spread for the title \"{template['title']}\". Preserve the exact successful composition of the reference: title space at upper-left, poem space at upper-right, and all people positioned only where the reference places them. The top-right poem field (from x=1000 to the right edge, y=70 through y=540) must be natural background only: no face, head, torso, hand, limb, clothing, prop, or foreground object may enter it. If a person is on the right, their entire head must begin below y=560. Keep every person entirely clear of both text spaces and the ornament below the poem. Replace all source text with clean natural scenery. Do not draw panels, boxes, borders, physical pages, books, a spine, a mockup, words, letters, numbers, logos, watermarks, or decorative typography.

Replace the source people with Leo, a fictional Peruvian-Latin father of 58 with silver hair, a warm noble expression and an unmistakably adult face, plus {direction['person']}. Both must be visibly adult, fully recognizable, large, photographic, and in clear three-quarter view. {template['theme']}

The fantasy is central and impossible but the relationship is affectionate and adult. No protected character, recognizable franchise costume, celebrity, child, anime, illustration, cartoon style, product logo, text, watermark, weapon, injury, or violence."""


def request_edit(reference: Path, template: dict, direction: dict, api_key: str) -> tuple[bytes, float | None, dict | None]:
    client = OpenAI(api_key=api_key)
    with reference.open("rb") as image_file:
        response = client.images.edit(
            model="gpt-image-2",
            image=image_file,
            prompt=prompt_for(template, direction),
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
    data = io.BytesIO()
    image.save(data, "PNG", optimize=True)
    return data.getvalue()


def compose_webp(raw: bytes, template: dict, direction: dict, destination: Path) -> None:
    """Compose deterministic text; template-specific poem geometry avoids known faces."""
    background = Image.open(io.BytesIO(fit_edit_to_canvas(raw))).convert("RGBA")
    image = v3.soft_text_vignette(background)
    draw = ImageDraw.Draw(image)

    title_font, title_lines = v3.fit_title(template["title"], 400)
    title_x, current_y, title_gap = 74, 84, 2
    title_block_width = 0
    for line in title_lines:
        v3.draw_gold_text(draw, (title_x, current_y), line, title_font, v3.GOLD_LIGHT)
        bbox = draw.textbbox((title_x, current_y), line, font=title_font)
        title_block_width = max(title_block_width, bbox[2] - bbox[0])
        current_y = bbox[3] + title_gap
    v3.draw_title_separator(draw, title_x, current_y + 15, max(320, title_block_width))

    layout = template.get("poem_layout", {})
    poem_font = v3.font(layout.get("font_size", 21), b"Medium")
    poem_center_x = 1260
    poem_y = layout.get("y", 128)
    poem_line_height = layout.get("line_height", 32)
    for line in template["poem"].splitlines():
        if line:
            bbox = draw.textbbox((0, 0), line, font=poem_font)
            poem_x = poem_center_x - ((bbox[2] - bbox[0]) // 2)
            v3.draw_gold_text(draw, (poem_x, poem_y), line, poem_font, v3.CREAM)
        poem_y += poem_line_height
    v3.draw_house_ornament(draw, poem_center_x, poem_y + layout.get("ornament_gap", 22))

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(destination, "WEBP", quality=WEBP_QUALITY, method=6)


def write_report(result: dict) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    report_path = REVIEW / "demo-v9-reference-03-10-webp-report.json"
    existing = {"method": "V9 image edit from infant flat layout, deterministic local typography, WebP export", "outputs": []}
    if report_path.exists():
        existing = json.loads(report_path.read_text())
    existing["outputs"] = [row for row in existing.get("outputs", []) if row.get("output") != result.get("output")]
    existing["outputs"].append(result)
    existing["outputs"].sort(key=lambda row: (row["template"], row["direction"]))
    existing["total_cost_usd_excluding_input_image_tokens"] = round(sum(row.get("cost_usd") or 0 for row in existing["outputs"]), 4)
    report_path.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--template", type=int, choices=sorted(TEMPLATES), required=True)
    parser.add_argument("--direction", choices=sorted(DIRECTIONS), required=True)
    parser.add_argument("--force", action="store_true", help="Regenerate an existing output after a reviewed local-composition fix.")
    parser.add_argument("--recompose", action="store_true", help="Recompose an existing saved raw scene only; never calls the image API.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    template = {"number": args.template, **TEMPLATES[args.template]}
    direction = DIRECTIONS[args.direction]
    destination = output_path(template, direction)
    if destination.exists() and not args.force and not args.recompose:
        print(f"SKIP existing {destination.relative_to(ROOT)}")
        return
    raw_path = WORK / f"raw-{template['number']:02d}-{direction['slug']}.png"
    if args.recompose:
        if not raw_path.exists():
            raise SystemExit(f"Missing saved raw scene for no-cost recomposition: {raw_path}")
        compose_webp(raw_path.read_bytes(), template, direction, destination)
        print(f"RECOMPOSED template={template['number']:02d} direction={args.direction} output={destination.relative_to(ROOT)} cost=$0.0000")
        return
    api_key = base.load_api_key()
    reference = make_textless_reference(template)
    error = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            raw, cost, usage = request_edit(reference, template, direction, api_key)
            # Retain the untyped edited scene so any later typography-only change
            # can be recomposed without a second image-generation charge.
            raw_path.write_bytes(raw)
            compose_webp(raw, template, direction, destination)
            result = {"template": template["number"], "title": template["title"], "direction": direction["label"], "status": "ok", "output": str(destination.relative_to(ROOT)), "dimensions": "1600x944", "format": "webp", "cost_usd": cost, "usage": usage}
            write_report(result)
            print(f"OK template={template['number']:02d} direction={args.direction} output={destination.relative_to(ROOT)} cost=${cost if cost is not None else '?'}")
            return
        except (OpenAIError, urllib.error.HTTPError, RuntimeError, OSError) as exc:
            error = str(exc)
            print(f"FAILED template={template['number']:02d} direction={args.direction} attempt={attempt}: {error}")
            retryable = "429" in error or "rate limit" in error.lower() or "timeout" in error.lower()
            if attempt < MAX_ATTEMPTS and retryable:
                time.sleep(2)
                continue
            break
    write_report({"template": template["number"], "title": template["title"], "direction": direction["label"], "status": "failed", "output": None, "cost_usd": None, "error": error})
    raise SystemExit(error or "Unknown generation failure")


if __name__ == "__main__":
    main()
