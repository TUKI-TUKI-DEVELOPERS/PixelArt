#!/usr/bin/env python3
"""Third-pass rerenders for the sibling and Abuela/Nieta memorial pilot scenes.

Creates three local WebP review renders only. It preserves v1/v2 and never changes
MinIO, PostgreSQL, the manifest, frontend, or production.
"""

from __future__ import annotations

import copy
import importlib.util
import json
import sys
import time
import urllib.error
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE_SCRIPT = ROOT / "scripts" / "generate_peru_adult_first_pilots.py"
OUTPUT = ROOT / "output" / "_peru-adult-first-template-pilot-v3"
REVIEW = ROOT / "adult-books" / "peru-adult-first-template-pilot" / "v3"
MAX_ATTEMPTS = 2

spec = importlib.util.spec_from_file_location("peru_pilot_v1", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = base
spec.loader.exec_module(base)
# V3 must describe original constraints, not name any external animation studio.
base.DETALLES_TECNICOS = base.DETALLES_TECNICOS.replace(", no Pixar", "")

UPDATES = {
    "14_corazon_abuela_retablo_bordado": {
        "change": "Replace the ordinary handmade scene with a tangible, Peru-rooted magical reunion across an original woven bridge.",
        "title": "EL PUENTE QUE TEJIÓ NUESTRA MEMORIA",
        "scene": "Isabel, abuela adulta que ya partió, y Valentina, su nieta adulta, cruzan tomadas de la mano un puente textil gigantesco e imposible suspendido entre una quebrada nocturna y un cielo lleno de estrellas. Ambas aparecen de cuerpo entero, reconocibles, tangibles y con rostros visibles en tres cuartos. El puente se construye físicamente delante de sus pasos a partir de fibras que salen de las manos unidas de ambas; Isabel guía a Valentina, sonríe y la acompaña. No es un retrato, cuadro, retablo, fotografía, estatua ni una aparición: Isabel vive plenamente este reencuentro imaginado.",
        "background": "Un valle andino nocturno realista muy abajo, cerros en silueta y cielo profundo; el puente usa fibras, nudos y patrones textiles originales inspirados en técnicas de tejido andino, sin copiar una obra existente ni mostrar lugares turísticos. Sin marcos, álbumes, flores de cempasúchil, calaveras, velorio ni funeral. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La magia ES el puente: cada paso activa hilos luminosos de cobre, índigo, rojo profundo y marfil; los nudos se expanden en rutas de estrellas y pequeñas casas abstractas antes de convertirse otra vez en tejido resistente bajo sus pies. Sin halos, alas humanas, transparencia, fantasmas ni efectos de aparición.",
        "lighting": "Luz lunar azul índigo, fibras cálidas de cobre y marfil, rostros iluminados por la misma luz física y tangible. El puente domina la composición y se pierde en el cielo.",
    },
    "15_siempre_seras_hermano_pichanga": {
        "change": "Replace a normal football scene with a live-action, impossible-match adventure where the magic drives the action.",
        "scene": "Emiliano y Gabriel, hermanos jóvenes adultos, juegan una pichanga imposible sobre una cancha fotorrealista que se extiende desde una azotea de barrio peruano hasta las nubes. Gabriel salta muy alto para recibir el balón mientras Emiliano corre hacia él, ambos de cuerpo entero, tangibles, reconocibles y con expresiones de adrenalina y alegría. La relación debe leerse inequívocamente como hermandad, no como pareja. Gabriel comparte este partido imaginado de forma física: no es retrato, fantasma, figura transparente ni presencia de fondo.",
        "background": "La cancha comienza con cemento real y arcos sencillos, pero se curva suavemente hacia un horizonte de nubes y ciudad nocturna muy abajo. Sin estadio real, logos, camisetas oficiales, nombres de clubes, marcas ni elementos de franquicias deportivas. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La magia ES el partido: el balón cruza el aire como un cometa de luz cálida; cada pase enciende una sección nueva de la cancha suspendida y crea rutas de constelaciones bajo los botines. Una paloma lineal mínima aparece únicamente debajo del poema. Sin estilo animado, sin caricatura, sin rayos de energía tipo anime, sin halos, alas, transparencia ni fantasmas.",
        "lighting": "Atardecer naranja sobre nubes azul profundo, reflejos cobrizos en el cemento y luz realista de ciudad; escala épica con rostros y cuerpos humanos fotorrealistas.",
    },
    "16_siempre_seras_hermana_pichanga": {
        "change": "Replace a normal football scene with a live-action, impossible-match adventure where the magic drives the action.",
        "scene": "Camila y Valentina, hermanas jóvenes adultas, juegan una pichanga imposible sobre una cancha fotorrealista que se extiende desde una azotea de barrio peruano hasta las nubes. Valentina salta muy alto para recibir el balón mientras Camila corre hacia ella, ambas de cuerpo entero, tangibles, reconocibles y con expresiones de adrenalina y alegría. La relación debe leerse inequívocamente como hermandad, no como pareja. Valentina comparte este partido imaginado de forma física: no es retrato, fantasma, figura transparente ni presencia de fondo.",
        "background": "La cancha comienza con cemento real y arcos sencillos, pero se curva suavemente hacia un horizonte de nubes y ciudad nocturna muy abajo. Sin estadio real, logos, camisetas oficiales, nombres de clubes, marcas ni elementos de franquicias deportivas. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La magia ES el partido: el balón cruza el aire como un cometa de luz cálida; cada pase enciende una sección nueva de la cancha suspendida y crea rutas de constelaciones bajo los botines. Una paloma lineal mínima aparece únicamente debajo del poema. Sin estilo animado, sin caricatura, sin rayos de energía tipo anime, sin halos, alas, transparencia ni fantasmas.",
        "lighting": "Atardecer naranja sobre nubes azul profundo, reflejos cobrizos en el cemento y luz realista de ciudad; escala épica con rostros y cuerpos humanos fotorrealistas.",
    },
}


def pilots_to_rerender() -> list[dict]:
    pilots = []
    originals = {pilot["key"]: pilot for pilot in base.PILOTS}
    missing = set(UPDATES) - set(originals)
    if missing:
        raise RuntimeError(f"Unknown v1 pilot keys: {sorted(missing)}")
    for key, update in UPDATES.items():
        pilot = copy.deepcopy(originals[key])
        pilot.update({name: value for name, value in update.items() if name != "change"})
        pilot["change"] = update["change"]
        pilots.append(pilot)
    return pilots


def create_contact_sheet(results: list[dict]) -> Path:
    width, height, label_height = 540, 318, 62
    sheet = Image.new("RGB", (width, len(results) * (height + label_height)), "#f4f0e9")
    draw = ImageDraw.Draw(sheet)
    for index, result in enumerate(results):
        image = Image.open(result["path"]).convert("RGB")
        image.thumbnail((width, height))
        y = index * (height + label_height)
        sheet.paste(image, (0, y))
        draw.multiline_text((12, y + height + 8), f"{index + 1:02d}. {result['title']}\n{result['direction']}", fill="#25211d", spacing=3)
    REVIEW.mkdir(parents=True, exist_ok=True)
    out = REVIEW / "contact-sheet-peru-first-templates-v3.jpg"
    sheet.save(out, "JPEG", quality=92)
    return out


def write_report(results: list[dict], contact_sheet: Path | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    total_cost = round(sum(row["cost_usd"] or 0 for row in results), 4)
    payload = {
        "model": base.MODEL,
        "quality": base.QUALITY,
        "size": base.SIZE,
        "attempt_limit": MAX_ATTEMPTS,
        "total_cost_usd": total_cost,
        "results": results,
        "contact_sheet": str(contact_sheet) if contact_sheet else None,
    }
    (REVIEW / "run-report.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    lines = [
        "# Peru-rooted adult template pilot — v3",
        "",
        "V3 preserves v1/v2 and changes only the three scenes requested after visual review.",
        "",
        f"- Renders requested: `{len(results)}`",
        f"- Successful renders: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Actual tracked cost: `${total_cost:.4f}`",
        "",
    ]
    for row in results:
        cost = "n/a" if row["cost_usd"] is None else f"${row['cost_usd']:.4f}"
        lines.append(f"- **{row['title']}** — {row['book']} ({row['direction']}): `{row['status']}`, {cost}")
        lines.append(f"  - Correction: {row['change']}")
    if contact_sheet:
        lines.extend(["", f"Contact sheet: `{contact_sheet.relative_to(ROOT)}`"])
    (REVIEW / "review.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    api_key = base.load_api_key()
    pilots = pilots_to_rerender()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    results: list[dict] = []
    for index, pilot in enumerate(pilots, start=1):
        dest = OUTPUT / f"{pilot['key']}.webp"
        print(f"[{index:02d}/{len(pilots)}] {pilot['book']} — {pilot['direction']} — {pilot['title']}", flush=True)
        error = None
        cost = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost = base.request_image(base.build_prompt(pilot), api_key)
                base.save_webp(raw, dest)
                print(f"  OK (attempt {attempt}) -> {dest.relative_to(ROOT)} | ${cost if cost is not None else '?'}", flush=True)
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError) as exc:
                error = str(exc)
                print(f"  FAILED attempt {attempt}: {error}", flush=True)
                if attempt < MAX_ATTEMPTS:
                    time.sleep(2)
        results.append({
            "key": pilot["key"],
            "book": pilot["book"],
            "direction": pilot["direction"],
            "title": pilot["title"],
            "change": pilot["change"],
            "status": "ok" if dest.exists() else "failed",
            "path": str(dest) if dest.exists() else None,
            "cost_usd": cost if dest.exists() else None,
            "error": error if not dest.exists() else None,
        })
    successes = [row for row in results if row["status"] == "ok"]
    contact_sheet = create_contact_sheet(successes) if successes else None
    write_report(results, contact_sheet)
    total_cost = sum(row["cost_usd"] or 0 for row in results)
    print(f"\nCompleted {len(successes)}/{len(pilots)} rerenders. Actual tracked cost: ${total_cost:.4f}")
    if contact_sheet:
        print(f"Contact sheet: {contact_sheet.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
