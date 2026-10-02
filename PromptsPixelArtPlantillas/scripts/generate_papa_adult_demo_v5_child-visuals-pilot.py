#!/usr/bin/env python3
"""Regenerate the first two child-theme demos with visibly fantastical adult scenes.

This isolated V5 pilot produces exactly four static customer-demo spreads. It keeps
the original child visual themes while replacing every child with a clearly visible
adult son or daughter. It never uploads assets, changes SQL, manifests, frontend
code, or production data.
"""

from __future__ import annotations

import importlib.util
import json
import sys
import time
import urllib.error
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
V3_SCRIPT = ROOT / "scripts" / "generate_papa_hijo_adult_first_10_peru_v3.py"
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "demo-v5-child-visuals-pilot"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
MAX_ATTEMPTS = 2

spec = importlib.util.spec_from_file_location("papa_demo_v3", V3_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V3_SCRIPT}")
v3 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v3
spec.loader.exec_module(v3)
base = v3.base

TEMPLATES = [
    {
        "number": 1,
        "direction": "Hijo adulto → Papá",
        "slug": "mi_superheroe_personal_hijo_a_papa",
        "title": "MI SUPERHÉROE PERSONAL",
        "characters": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión cálida; Mateo, su hijo adulto peruano-latino ficticio de 32 años, expresión agradecida y madura.",
        "scene": "Como en la plantilla infantil original, Leo aparece como un superhéroe adulto original sobre una plataforma elevada frente a una ciudad al atardecer. Lleva un traje heroico elegante azul profundo, dorado y plata, sin logotipos ni símbolos reconocibles, con una capa larga ondeando. Su postura es noble y protectora, con un puño levantado. Mateo, su hijo adulto, aparece junto a él claramente visible, de pie y mirando a su padre con orgullo; viste ropa contemporánea azul y gris. Ningún niño ni personaje de franquicia.",
        "magic": "Rayos de luz dorada emanan de una insignia abstracta y original en el pecho de Leo, mientras auroras y constelaciones rodean el cielo sobre la ciudad. La magia sucede alrededor de ambos y hace que la escena sea fantástica sin ocultar sus rostros ni convertirlos en siluetas.",
        "palette": "Azul noche, cobre cálido, dorado tenue y luces lejanas de ciudad.",
        "poem": "Papá Leo,\ncuando el mundo pesa demasiado,\ntu forma de estar a mi lado\nconvierte el miedo en camino.\n\nNo llevas capa ni emblema:\nllevas paciencia, verdad y abrigo.\nPor eso, en cada noche difícil,\nsigues siendo mi superhéroe personal.",
    },
    {
        "number": 2,
        "direction": "Hijo adulto → Papá",
        "slug": "mi_caballero_de_armadura_brillante_hijo_a_papa",
        "title": "MI CABALLERO DE ARMADURA BRILLANTE",
        "characters": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión cálida; Mateo, su hijo adulto peruano-latino ficticio de 32 años, expresión agradecida y madura.",
        "scene": "Como en la plantilla infantil original, Leo y Mateo aparecen con claridad ante un castillo fantástico de piedra gris, torres altas y estandartes abstractos azul y dorado. Leo es un caballero adulto noble y protector, pero viste un abrigo ceremonial azul profundo y ropa elegante contemporánea, no una armadura metálica pesada; una protección translúcida de luz con forma de armadura flota alrededor de sus hombros. Mateo, su hijo adulto, está junto a él con ropa de explorador contemporánea y expresión de admiración. No hay combate, golpes ni armas en uso.",
        "magic": "El castillo se eleva sobre nubes y un arco de luz dorada cruza el cielo. La protección luminosa alrededor de Leo brilla como una armadura imposible de constelaciones, mientras pétalos de luz y banderas abstractas vuelan alrededor de ambos. La fantasía sucede alrededor de los personajes y no tapa sus rostros.",
        "palette": "Plata suave, cobre, azul de amanecer y piedra gris cálida.",
        "poem": "Hay puentes que parecen imposibles\ncuando uno los mira desde lejos;\npero la confianza aprende a cruzarlos\npaso a paso, sin hacer ruido.\n\nPapá Leo, tu palabra fue mi armadura:\nme enseñaste a avanzar erguido.\nGracias por ser mi caballero\nde alma noble y mirada brillante.",
    },
    {
        "number": 1,
        "direction": "Hija adulta → Papá",
        "slug": "mi_superheroe_personal_hija_a_papa",
        "title": "MI SUPERHÉROE PERSONAL",
        "characters": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión cálida; María, su hija adulta peruano-latina ficticia de 30 años, expresión agradecida y madura.",
        "scene": "Como en la plantilla infantil original, Leo aparece como un superhéroe adulto original sobre una plataforma elevada frente a una ciudad al atardecer. Lleva un traje heroico elegante azul profundo, dorado y plata, sin logotipos ni símbolos reconocibles, con una capa larga ondeando. Su postura es noble y protectora, con un puño levantado. María, su hija adulta, aparece junto a él claramente visible, de pie y mirando a su padre con orgullo; viste ropa contemporánea azul y gris. Ninguna niña ni personaje de franquicia.",
        "magic": "Rayos de luz dorada emanan de una insignia abstracta y original en el pecho de Leo, mientras auroras y constelaciones rodean el cielo sobre la ciudad. La magia sucede alrededor de ambos y hace que la escena sea fantástica sin ocultar sus rostros ni convertirlos en siluetas.",
        "palette": "Azul noche, cobre cálido, dorado tenue y luces lejanas de ciudad.",
        "poem": "Papá Leo,\ncuando el mundo pesa demasiado,\ntu forma de estar a mi lado\nconvierte el miedo en camino.\n\nNo llevas capa ni emblema:\nllevas paciencia, verdad y abrigo.\nPor eso, en cada noche difícil,\nsigues siendo mi superhéroe personal.",
    },
    {
        "number": 2,
        "direction": "Hija adulta → Papá",
        "slug": "mi_caballero_de_armadura_brillante_hija_a_papa",
        "title": "MI CABALLERO DE ARMADURA BRILLANTE",
        "characters": "Papá Leo, hombre peruano-latino ficticio de 58 años, cabello entrecano y expresión cálida; María, su hija adulta peruano-latina ficticia de 30 años, expresión agradecida y madura.",
        "scene": "Como en la plantilla infantil original, Leo y María aparecen con claridad ante un castillo fantástico de piedra gris, torres altas y estandartes abstractos azul y dorado. Leo es un caballero adulto noble y protector, pero viste un abrigo ceremonial azul profundo y ropa elegante contemporánea, no una armadura metálica pesada; una protección translúcida de luz con forma de armadura flota alrededor de sus hombros. María, su hija adulta, está junto a él con ropa de exploradora contemporánea y expresión de admiración. No hay combate, golpes ni armas en uso.",
        "magic": "El castillo se eleva sobre nubes y un arco de luz dorada cruza el cielo. La protección luminosa alrededor de Leo brilla como una armadura imposible de constelaciones, mientras pétalos de luz y banderas abstractas vuelan alrededor de ambos. La fantasía sucede alrededor de los personajes y no tapa sus rostros.",
        "palette": "Plata suave, cobre, azul de amanecer y piedra gris cálida.",
        "poem": "Hay puentes que parecen imposibles\ncuando una los mira desde lejos;\npero la confianza aprende a cruzarlos\npaso a paso, sin hacer ruido.\n\nPapá Leo, tu palabra fue mi armadura:\nme enseñaste a avanzar erguida.\nGracias por ser mi caballero\nde alma noble y mirada brillante.",
    },
]


def make_background_prompt(item: dict) -> str:
    return f"""[IMAGEN BASE]
Fotografía hiperrealista cinematográfica horizontal 1600x944, plana y a sangre completa. Esta imagen será el preview de una doble página: nunca mostrar libro físico, páginas, hojas, lomo, pliegue, marcos, bordes, mesas ni mockups. No incluir letras, palabras, números, iconos, logotipos, marcas de agua ni texto de ningún tipo; toda tipografía se añadirá después fuera del modelo.

[PERSONAJES]
Personajes ficticios de preview: {item['characters']} Ambos aparecen de cuerpo entero, con el rostro grande, reconocible, iluminado y visible en tres cuartos. Son dos adultos. No niños, no personas de espaldas, no caras ocultas, no retratos enmarcados, no collage, no terceros ni animales.

[TEMA RESTAURADO DEL LIBRO INFANTIL]
{item['scene']}

[MAGIA]
{item['magic']}

[COMPOSICIÓN OBLIGATORIA]
La escena y la luz fluyen de borde a borde. Reservar una zona oscura, limpia y sin figuras en el tercio superior izquierdo para el título, y otra zona visualmente tranquila, oscura y sin figuras en el tercio derecho para el poema. Ubicar el rostro de Leo entre x=470 y x=650 y el rostro de su hijo o hija entre x=880 y x=1000, ambos por debajo de y=330; no colocar rostros, ojos, manos ni elementos importantes entre x=720 y x=880. No colocar ninguna figura ni objeto importante a la derecha de x=1010. Los rostros deben quedar fuera de las dos zonas tipográficas y a más de 8% de los bordes. Composición asimétrica, editorial y adulta.

[COLOR]
{item['palette']} Hiperrealismo editorial premium, textura natural, luz cinematográfica y anatomía correcta.

[RESTRICCIONES]
Sin caricatura, anime, infantilización, franquicias, personajes reconocibles, logotipos, marcas, uniformes oficiales, violencia gráfica, armas en uso, alas humanas, halos, fantasmas, mascotas ni animales."""


def output_path(item: dict) -> Path:
    return OUTPUT / f"Plantilla_{item['number']:02d}_{item['slug']}_DemoV5.png"


def create_contact_sheet(results: list[dict]) -> Path:
    thumbnail_width, thumbnail_height, label_height, columns = 480, 283, 52, 2
    rows = (len(results) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumbnail_width, rows * (thumbnail_height + label_height)), "#f4f0e9")
    draw = ImageDraw.Draw(sheet)
    for index, result in enumerate(results):
        image = Image.open(result["path"]).convert("RGB")
        image.thumbnail((thumbnail_width, thumbnail_height))
        x = (index % columns) * thumbnail_width
        y = (index // columns) * (thumbnail_height + label_height)
        sheet.paste(image, (x, y))
        draw.multiline_text((x + 10, y + thumbnail_height + 7), f"{result['number']:02d}. {result['title']}\n{result['direction']} · DemoV5", fill="#25211d", spacing=3)
    REVIEW.mkdir(parents=True, exist_ok=True)
    destination = REVIEW / "contact-sheet-demo-v5-child-visuals-01-02-both-directions.jpg"
    sheet.save(destination, "JPEG", quality=92)
    return destination


def write_report(results: list[dict], contact_sheet: Path | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    total_cost = round(sum(row["cost_usd"] or 0 for row in results), 4)
    report = {
        "scope": "Papá, Mi Héroe Adulto — original child visuals with adult characters — templates 01–02 — both directions — DemoV5",
        "model": base.MODEL,
        "quality": base.QUALITY,
        "size": base.SIZE,
        "attempt_limit": MAX_ATTEMPTS,
        "total_cost_usd": total_cost,
        "output_directory": str(OUTPUT),
        "text_compositing": "deterministic Montserrat overlay after text-free image generation",
        "contact_sheet": str(contact_sheet) if contact_sheet else None,
        "results": results,
    }
    (REVIEW / "demo-v5-child-visuals-01-02-both-directions-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    lines = [
        "# Papá, Mi Héroe Adulto — DemoV5 — original child visuals with adult characters",
        "",
        "Four isolated customer-demo previews: templates 01–02 for Hijo adulto → Papá and Hija adulta → Papá, following original child visual themes with adult characters.",
        "The image model generates a text-free 1600×944 flat spread; Montserrat title and poem are composed locally.",
        "",
        f"- Requested: `{len(results)}`",
        f"- Successful: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Skipped: `{sum(row['status'] == 'skipped' for row in results)}`",
        f"- Actual tracked cost: `${total_cost:.4f}`",
        "",
    ]
    for row in results:
        cost = "n/a" if row["cost_usd"] is None else f"${row['cost_usd']:.4f}"
        lines.append(f"- `{row['direction']}` · `{row['number']:02d}` **{row['title']}**: `{row['status']}`, {cost}")
        if row.get("error"):
            lines.append(f"  - Error: `{row['error']}`")
    if contact_sheet:
        lines.extend(["", f"Contact sheet: `{contact_sheet.relative_to(ROOT)}`"])
    (REVIEW / "demo-v5-child-visuals-01-02-both-directions-review.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    if not v3.FONT_PATH.exists():
        raise RuntimeError(f"Missing required Montserrat font: {v3.FONT_PATH}")
    api_key = base.load_api_key()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    results: list[dict] = []

    for index, item in enumerate(TEMPLATES, start=1):
        destination = output_path(item)
        if destination.exists():
            print(f"[{index:02d}/{len(TEMPLATES)}] SKIP existing {destination.name}", flush=True)
            results.append({**item, "status": "skipped", "path": str(destination), "cost_usd": None})
            continue

        print(f"[{index:02d}/{len(TEMPLATES)}] {item['direction']} · {item['title']}", flush=True)
        error = None
        cost = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost = base.request_image(make_background_prompt(item), api_key)
                v3.compose_editorial_art(raw, item, destination)
                print(f"  OK (attempt {attempt}) -> {destination.relative_to(ROOT)} | ${cost if cost is not None else '?'}", flush=True)
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError, OSError) as exc:
                error = str(exc)
                print(f"  FAILED attempt {attempt}: {error}", flush=True)
                if attempt < MAX_ATTEMPTS:
                    time.sleep(2)

        results.append({
            **item,
            "status": "ok" if destination.exists() else "failed",
            "path": str(destination) if destination.exists() else None,
            "cost_usd": cost if destination.exists() else None,
            "error": error if not destination.exists() else None,
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
