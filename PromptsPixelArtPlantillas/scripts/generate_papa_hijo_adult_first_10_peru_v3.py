#!/usr/bin/env python3
"""Regenerate the first 10 Papá, Mi Héroe adult previews with deterministic typography.

This V3 batch creates text-free, full-bleed background art through the image model,
then composites the exact Montserrat title, poem, rules, and house-heart ornament
locally. It preserves V2, never uploads to MinIO, and never changes SQL, manifest,
frontend, or production.
"""

from __future__ import annotations

import copy
import importlib.util
import io
import json
import sys
import time
import urllib.error
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
V2_SCRIPT = ROOT / "scripts" / "generate_papa_hijo_adult_first_10_peru_v2.py"
FONT_PATH = ROOT / "fonts" / "Montserrat-VariableFont_wght.ttf"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "peru-v3"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
MAX_ATTEMPTS = 2
CANVAS = (1600, 944)
GOLD = (222, 178, 91, 255)
GOLD_LIGHT = (244, 214, 146, 255)
CREAM = (244, 230, 197, 255)

spec = importlib.util.spec_from_file_location("papa_hijo_v2", V2_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V2_SCRIPT}")
v2 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v2
spec.loader.exec_module(v2)
base = v2.base

# Explicit rotation: nickname at the beginning, then middle, then ending, repeating.
POEMS = {
    1: """Papá Leo,
cuando el mundo pesa demasiado,
tu forma de estar a mi lado
convierte el miedo en camino.

No llevas capa ni emblema:
llevas paciencia, verdad y abrigo.
Por eso, en cada noche difícil,
sigues siendo mi superhéroe personal.""",
    2: """Hay puentes que parecen imposibles
cuando uno los mira desde lejos;
pero la confianza aprende a cruzarlos
paso a paso, sin hacer ruido.

Papá Leo, tu palabra fue mi armadura:
me enseñaste a avanzar erguido.
Gracias por ser mi caballero
de alma noble y mirada brillante.""",
    3: """En mi reino no mandan coronas:
mandan tus manos, tu ejemplo
y la calma con que nombras las cosas.

Me enseñaste que reinar es cuidar,
sin pedir nunca un aplauso.
Mi mejor riqueza es tenerte conmigo.
Gracias, Papá Leo.""",
    4: """Papá Leo,
no necesito alas para saber
que alguien cuida mi camino:
tu luz aparece cuando hace falta.

En las tormentas de la vida,
tu voz me devuelve la calma.
Mi ángel guardián tiene tu rostro,
tu paso firme y tu forma de amar.""",
    5: """Un horizonte no es algo
que se mira siempre de lejos:
es una pregunta que se navega
cuando se comparte el timón.

Papá Leo, contigo aprendí
que la risa también da valor.
Eres mi pirata aventurero,
mi mejor brújula y mi hogar.""",
    6: """Tu fuerza nunca fue una batalla:
fue abrirme espacio cuando dudaba
y enseñarme a defender lo correcto.

Tu coraje no necesita ruido;
se reconoce en tu forma de cuidar.
Aprendí que ser fuerte es amar.
Gracias, Papá Leo.""",
    7: """Papá Leo,
cuando no sabía hacia dónde ir,
tu forma de mirar el horizonte
me enseñó a confiar en el viaje.

No llevas mi vida por mí:
me das criterio para pilotearla.
Mi capitán de todos los días,
gracias por enseñarme a volar.""",
    8: """No me enseñaste a no huir del viento,
sino a remar cuando el mar cambia;
a entender que el horizonte
se alcanza en compañía.

Papá Leo, tu ejemplo me dejó
coraje para seguir adelante.
Mi vikingo valiente, contigo
la fuerza también sabe acompañar.""",
    9: """Los sueños no llegan terminados:
se dibujan, se cuidan, se sostienen
y se vuelven casa con paciencia.

En cada plano de mi vida
hay una línea que aprendí de ti.
Mi arquitecto de sueños, gracias
por construir mi porvenir.
Papá Leo.""",
    10: """Papá Leo,
me enseñaste que vencer no es golpear:
es sostenerse cuando algo cuesta
y levantarse con dignidad.

Tu victoria fue mostrarme
que el amor también es valentía.
Mi gladiador de corazón noble,
contigo aprendí a no rendirme.""",
}

TEMPLATES = copy.deepcopy(v2.TEMPLATES)
for item in TEMPLATES:
    item["poem"] = POEMS[item["number"]]

# The model ignored the generic safe-zone instruction in these two dense scenes.
# Their figures must therefore be held left of the poem area.
SAFE_PLACEMENT_OVERRIDES = {
    1: "Ubicar a Papá Leo y Mateo juntos en la zona inferior centro-izquierda, con sus cabezas claramente debajo del título. Todo el tercio derecho debe quedar solo con cielo nocturno y arquitectura tenue para el poema; no dibujar paneles, bordes ni marcos.",
    4: "Ubicar a Papá Leo y Mateo juntos en la zona inferior centro-izquierda, con sus cabezas claramente debajo del título. Todo el tercio derecho debe quedar solo con lluvia, cielo y cúpula luminosa tenue para el poema; no dibujar paneles, bordes ni marcos.",
}


def font(size: int, weight: bytes) -> ImageFont.FreeTypeFont:
    loaded = ImageFont.truetype(FONT_PATH, size)
    loaded.set_variation_by_name(weight)
    return loaded


def make_background_prompt(item: dict) -> str:
    return f"""[IMAGEN BASE]
Fotografía hiperrealista cinematográfica horizontal 1600x944, plana y a sangre completa. Esta imagen será una ilustración interior final: nunca mostrar libro físico, páginas, hojas, lomo, pliegue, marcos, bordes, mesas ni mockups. No incluir letras, palabras, números, iconos, logotipos, marcas de agua ni texto de ningún tipo; toda tipografía se añadirá después fuera del modelo.

[PERSONAJES]
Personajes ficticios de preview: Papá Leo, hombre peruano-latino de 58 años, cabello entrecano y expresión cálida; Mateo, su hijo adulto peruano-latino de 32 años, expresión agradecida y madura. Los dos aparecen de cuerpo entero, con el rostro grande, reconocible, iluminado y visible en tres cuartos. No niños, no personas de espaldas, no caras ocultas, no retratos enmarcados, no collage, no terceros ni animales.

[ESCENA]
{item['scene']}

[MAGIA]
{item['magic']}

[ESPACIO NEGATIVO TIPOGRÁFICO, INVISIBLE]
La escena debe leerse como una composición natural y continua, sin tarjetas, recuadros, paneles, bordes, líneas, marcos, ventanas ni áreas dibujadas para texto. Dejar el tercio superior izquierdo con cielo, niebla, pared o textura oscura tranquila para el título. Dejar todo el tercio derecho con ambiente homogéneo y sin figuras para el poema. Ninguna persona, rostro, cabello, mano, capa, ropa, animal u objeto importante puede entrar en esos espacios negativos; se añadirán letras localmente sobre el ambiente natural.

[UBICACIÓN DE PERSONAJES]
Colocar a todas las personas completas en el sector inferior centro-izquierdo. La parte superior de cada cabeza debe quedar claramente en la mitad inferior del lienzo, con una separación amplia debajo del título; no elevar brazos, puños, capas ni objetos hacia el título. Ninguna parte del cuerpo puede entrar en el tercio derecho reservado al poema. Mantener el eje vertical central libre de rostros, ojos, manos u objetos importantes. Los rostros deben quedar a más de 8% de los bordes. Composición asimétrica, editorial y adulta.
{SAFE_PLACEMENT_OVERRIDES.get(item['number'], '')}

[COLOR]
{item['palette']} Hiperrealismo editorial premium, textura natural, luz cinematográfica y anatomía correcta.

[RESTRICCIONES]
Sin caricatura, anime, infantilización, franquicias, personajes reconocibles, logotipos, marcas, uniformes oficiales, violencia gráfica, armas en uso, alas humanas, halos, fantasmas, mascotas ni animales."""


def fit_title(title: str, max_width: int, max_lines: int = 3) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    """Fit every line, including a single long word, inside the title column."""
    words = title.split()
    measure = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    for size in range(76, 24, -2):
        candidate = font(size, b"ExtraBold")
        lines: list[str] = []
        current = ""
        overflow = False
        for word in words:
            # A word cannot be wrapped further; shrink the candidate font instead
            # of emitting a line that extends into a character's space.
            if measure.textlength(word, font=candidate) > max_width:
                overflow = True
                break
            proposal = word if not current else f"{current} {word}"
            if measure.textlength(proposal, font=candidate) <= max_width:
                current = proposal
            else:
                if current:
                    lines.append(current)
                current = word
        if not overflow and current:
            lines.append(current)
        if not overflow and len(lines) <= max_lines:
            return candidate, lines
    raise RuntimeError(f"Title cannot fit in {max_width}px across {max_lines} lines: {title}")


def soft_text_vignette(image: Image.Image) -> Image.Image:
    """Add continuous ambient contrast for local text without drawing a visible panel."""
    alpha = Image.new("L", CANVAS, 0)
    pixels = alpha.load()
    width, height = CANVAS
    for y in range(height):
        for x in range(width):
            # Left title support fades naturally from the upper-left corner.
            left_x = max(0.0, 1.0 - (x / 760))
            left_y = max(0.0, 1.0 - (y / 470))
            left_alpha = 96 * left_x * left_y
            # Right poem support fades in from the center; it has no hard top/bottom edge.
            right_progress = max(0.0, min(1.0, (x - 840) / 620))
            right_alpha = 112 * (right_progress * right_progress)
            pixels[x, y] = int(max(left_alpha, right_alpha))
    overlay = Image.new("RGBA", CANVAS, (2, 7, 17, 0))
    overlay.putalpha(alpha)
    return Image.alpha_composite(image.convert("RGBA"), overlay)


def draw_gold_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, selected_font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int]) -> None:
    x, y = xy
    # The drop shadow has to scale with the glyph. A fixed 2/3px offset plus a 1px
    # stroke is ~4% of a title glyph, but ~14% of the 21px poem text, where it stops
    # reading as a shadow and turns into a dirty halo over bright backgrounds.
    size = getattr(selected_font, "size", 21)
    offset_x, offset_y = max(1, round(size * 0.04)), max(1, round(size * 0.055))
    stroke = 1 if size >= 36 else 0
    draw.text((x + offset_x, y + offset_y), text, font=selected_font, fill=(0, 0, 0, 180), stroke_width=stroke, stroke_fill=(0, 0, 0, 120))
    draw.text((x, y), text, font=selected_font, fill=fill, stroke_width=0)


def draw_title_separator(draw: ImageDraw.ImageDraw, x: int, y: int, width: int) -> None:
    center = x + width // 2
    gap = 18
    draw.line((x, y, center - gap, y), fill=GOLD, width=2)
    draw.line((center + gap, y, x + width, y), fill=GOLD, width=2)
    draw.polygon([(center, y - 8), (center + 8, y), (center, y + 8), (center - 8, y)], outline=GOLD, fill=None, width=2)


def draw_house_ornament(draw: ImageDraw.ImageDraw, center_x: int, y: int) -> None:
    line_start, line_end, gap = center_x - 128, center_x + 128, 28
    draw.line((line_start, y, center_x - gap, y), fill=GOLD, width=2)
    draw.line((center_x + gap, y, line_end, y), fill=GOLD, width=2)
    roof_top, roof_y, wall_bottom = y + 7, y + 23, y + 45
    draw.line((center_x - 22, roof_y, center_x, roof_top), fill=GOLD, width=2)
    draw.line((center_x, roof_top, center_x + 22, roof_y), fill=GOLD, width=2)
    draw.line((center_x - 17, roof_y, center_x - 17, wall_bottom), fill=GOLD, width=2)
    draw.line((center_x + 17, roof_y, center_x + 17, wall_bottom), fill=GOLD, width=2)
    draw.line((center_x - 17, wall_bottom, center_x + 17, wall_bottom), fill=GOLD, width=2)
    heart_y = y + 30
    draw.ellipse((center_x - 8, heart_y - 5, center_x, heart_y + 3), outline=GOLD, width=1)
    draw.ellipse((center_x, heart_y - 5, center_x + 8, heart_y + 3), outline=GOLD, width=1)
    draw.polygon([(center_x - 8, heart_y), (center_x + 8, heart_y), (center_x, heart_y + 11)], outline=GOLD, fill=None, width=1)


def compose_editorial_art(raw: bytes, item: dict, dest: Path) -> None:
    background = Image.open(io.BytesIO(raw)).convert("RGBA")
    if background.size != CANVAS:
        raise RuntimeError(f"Unexpected image size {background.size}; expected {CANVAS}")
    image = soft_text_vignette(background)
    draw = ImageDraw.Draw(image)

    # Match the proven infant layout: a compact title column on the upper-left,
    # leaving the central scene unobstructed for the people.
    title_font, title_lines = fit_title(item["title"], item.get("title_max_width", 470))
    title_x, title_y, title_gap = item.get("title_x", 74), item.get("title_y", 84), 2
    current_y = title_y
    title_block_width = 0
    for line in title_lines:
        draw_gold_text(draw, (title_x, current_y), line, title_font, GOLD_LIGHT)
        bbox = draw.textbbox((title_x, current_y), line, font=title_font)
        title_block_width = max(title_block_width, bbox[2] - bbox[0])
        current_y = bbox[3] + title_gap
    draw_title_separator(draw, title_x, current_y + 15, max(320, title_block_width))

    # The poem, divider, and house ornament share a single visual axis.
    # This prevents the lower ornament from drifting away from the poem block.
    poem_font = font(21, b"Medium")
    poem_center_x, poem_y, poem_line_height = 1260, 128, 32
    for line in item["poem"].splitlines():
        if line:
            bbox = draw.textbbox((0, 0), line, font=poem_font)
            poem_x = poem_center_x - ((bbox[2] - bbox[0]) // 2)
            draw_gold_text(draw, (poem_x, poem_y), line, poem_font, CREAM)
        poem_y += poem_line_height
    draw_house_ornament(draw, poem_center_x, poem_y + 22)

    dest.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(dest, "PNG", optimize=True)


def output_path(item: dict) -> Path:
    return OUTPUT / f"Plantilla_{item['number']:02d}_{item['slug']}_Hijo_a_Papa_PeruV3.png"


def create_contact_sheet(results: list[dict]) -> Path:
    thumb_width, thumb_height, label_height, columns = 480, 283, 50, 2
    rows = (len(results) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb_width, rows * (thumb_height + label_height)), "#f4f0e9")
    draw = ImageDraw.Draw(sheet)
    for index, result in enumerate(results):
        image = Image.open(result["path"]).convert("RGB")
        image.thumbnail((thumb_width, thumb_height))
        x = (index % columns) * thumb_width
        y = (index // columns) * (thumb_height + label_height)
        sheet.paste(image, (x, y))
        draw.multiline_text((x + 10, y + thumb_height + 7), f"{result['number']:02d}. {result['title']}\nHijo adulto → Papá · PeruV3", fill="#25211d", spacing=3)
    REVIEW.mkdir(parents=True, exist_ok=True)
    dest = REVIEW / "contact-sheet-peru-v3-hijo-01-10.jpg"
    sheet.save(dest, "JPEG", quality=92)
    return dest


def write_report(results: list[dict], contact_sheet: Path | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    total_cost = round(sum(row["cost_usd"] or 0 for row in results), 4)
    report = {
        "scope": "Papá, Mi Héroe Adulto — Hijo adulto → Papá — templates 01–10 — PeruV3",
        "model": base.MODEL,
        "quality": base.QUALITY,
        "size": base.SIZE,
        "attempt_limit": MAX_ATTEMPTS,
        "total_cost_usd": total_cost,
        "output_directory": str(OUTPUT),
        "font": str(FONT_PATH),
        "text_compositing": "deterministic Montserrat overlay after text-free image generation",
        "contact_sheet": str(contact_sheet) if contact_sheet else None,
        "results": results,
    }
    (REVIEW / "peru-v3-hijo-01-10-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    lines = [
        "# Papá, Mi Héroe Adulto — PeruV3 — Hijo 01–10",
        "",
        "V3 has text-free full-bleed generated backgrounds and deterministic local Montserrat typography; it preserves V2 and does not upload or change production data.",
        "",
        f"- Requested: `{len(results)}`",
        f"- Successful: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Skipped: `{sum(row['status'] == 'skipped' for row in results)}`",
        f"- Actual tracked cost: `${total_cost:.4f}`",
        "",
    ]
    for row in results:
        cost = "n/a" if row["cost_usd"] is None else f"${row['cost_usd']:.4f}"
        lines.append(f"- `{row['number']:02d}` **{row['title']}**: `{row['status']}`, {cost}")
        if row.get("error"):
            lines.append(f"  - Error: `{row['error']}`")
    if contact_sheet:
        lines.extend(["", f"Contact sheet: `{contact_sheet.relative_to(ROOT)}`"])
    (REVIEW / "peru-v3-hijo-01-10-review.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    if not FONT_PATH.exists():
        raise RuntimeError(f"Missing required Montserrat font: {FONT_PATH}")
    api_key = base.load_api_key()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    results: list[dict] = []
    for index, item in enumerate(TEMPLATES, start=1):
        dest = output_path(item)
        if dest.exists():
            print(f"[{index:02d}/{len(TEMPLATES)}] SKIP existing {dest.name}", flush=True)
            results.append({"number": item["number"], "title": item["title"], "status": "skipped", "path": str(dest), "cost_usd": None, "error": None})
            continue
        print(f"[{index:02d}/{len(TEMPLATES)}] {item['title']}", flush=True)
        error = None
        cost = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost = base.request_image(make_background_prompt(item), api_key)
                compose_editorial_art(raw, item, dest)
                print(f"  OK (attempt {attempt}) -> {dest.relative_to(ROOT)} | ${cost if cost is not None else '?'}", flush=True)
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError, OSError) as exc:
                error = str(exc)
                print(f"  FAILED attempt {attempt}: {error}", flush=True)
                if attempt < MAX_ATTEMPTS:
                    time.sleep(2)
        results.append({
            "number": item["number"],
            "title": item["title"],
            "status": "ok" if dest.exists() else "failed",
            "path": str(dest) if dest.exists() else None,
            "cost_usd": cost if dest.exists() else None,
            "error": error if not dest.exists() else None,
        })
    successful = [row for row in results if row["status"] in {"ok", "skipped"}]
    contact_sheet = create_contact_sheet(successful) if successful else None
    write_report(results, contact_sheet)
    total_cost = sum(row["cost_usd"] or 0 for row in results)
    print(f"\nCompleted {sum(row['status'] == 'ok' for row in results)}/{len(TEMPLATES)} new renders; {sum(row['status'] == 'skipped' for row in results)} skipped. Actual tracked cost: ${total_cost:.4f}")
    if contact_sheet:
        print(f"Contact sheet: {contact_sheet.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
