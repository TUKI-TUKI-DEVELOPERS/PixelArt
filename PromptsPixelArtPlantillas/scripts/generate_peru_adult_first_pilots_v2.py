#!/usr/bin/env python3
"""Second-pass rerenders for the Peru-rooted adult template pilot.

This reruns only the eleven images corrected after visual review. It preserves v1,
writes WebP locally, and never changes MinIO, PostgreSQL, manifest, or production.
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
OUTPUT = ROOT / "output" / "_peru-adult-first-template-pilot-v2"
REVIEW = ROOT / "adult-books" / "peru-adult-first-template-pilot" / "v2"
MAX_ATTEMPTS = 2

spec = importlib.util.spec_from_file_location("peru_pilot_v1", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = base
spec.loader.exec_module(base)

UPDATES = {
    "01_papa_hijo_danzante": {
        "change": "The complete Danza de las Tijeras attire must read immediately, not blend into a dark scene.",
        "scene": "Javier, padre peruano adulto, y Mateo, su hijo adulto, aparecen de cuerpo entero en una plaza andina contemporánea al atardecer. Javier realiza una pose respetuosa inspirada en la Danza de las Tijeras. Su traje ceremonial completo debe dominar claramente la imagen: chaqueta oscura de manga larga con bordados multicolores muy visibles, pantalón negro con bordados luminosos, faja tejida, pañuelo y tijeras metálicas abiertas en sus manos. Mateo lo acompaña con admiración serena. Ambos tienen rostros claros en tres cuartos; no parecen turistas ni modelos genéricos.",
        "background": "La plaza queda abierta y oscura detrás para que el atuendo bordado se lea con nitidez de pies a cabeza; músicos desenfocados y cielo de cobre y azul profundo, sin monumentos ni postal turística.",
        "magic": "Los bordados del traje de Javier se encienden por secciones como hilos de constelación y las tijeras trazan arcos de luz plateada. La magia ilumina el textil y mantiene cada detalle del traje visible, elegante y adulto.",
        "lighting": "Luz lateral de atardecer con un borde cálido que separa a Javier del fondo oscuro; bordados en rojo, oro, turquesa y plata claramente legibles.",
    },
    "02_papa_hija_danzante": {
        "change": "The complete Danza de las Tijeras attire must read immediately, not blend into a dark scene.",
        "scene": "Javier, padre peruano adulto, y Alondra, su hija adulta, aparecen de cuerpo entero en una plaza andina contemporánea al atardecer. Javier realiza una pose respetuosa inspirada en la Danza de las Tijeras. Su traje ceremonial completo debe dominar claramente la imagen: chaqueta oscura de manga larga con bordados multicolores muy visibles, pantalón negro con bordados luminosos, faja tejida, pañuelo y tijeras metálicas abiertas en sus manos. Alondra lo acompaña con orgullo y ternura. Ambos tienen rostros claros en tres cuartos; no parecen turistas ni modelos genéricos.",
        "background": "La plaza queda abierta y oscura detrás para que el atuendo bordado se lea con nitidez de pies a cabeza; músicos desenfocados y cielo de cobre y azul profundo, sin monumentos ni postal turística.",
        "magic": "Los bordados del traje de Javier se encienden por secciones como hilos de constelación y las tijeras trazan arcos de luz plateada. La magia ilumina el textil y mantiene cada detalle del traje visible, elegante y adulto.",
        "lighting": "Luz lateral de atardecer con un borde cálido que separa a Javier del fondo oscuro; bordados en rojo, oro, turquesa y plata claramente legibles.",
    },
    "07_abuela_nieto_tejedor": {
        "change": "Move beyond a normal loom scene: make the craft tactile, handmade, and visibly magical.",
        "scene": "Isabel, abuela peruana adulta, y Mateo, su nieto adulto, trabajan juntos en un telar de cintura contemporáneo que ocupa una parte importante de la escena. Las manos de ambos se ven claramente tensando, anudando y guiando fibras reales; Isabel guía el gesto con calma y Mateo aprende mirando sus manos. La pieza tejida debe verse artesanal, gruesa, imperfecta y hecha a mano, nunca como decoración industrial. Rostros visibles y relación familiar inequívoca.",
        "background": "Patio luminoso con banco de madera, ovillos de lana, fibras naturales y una pared de adobe contemporánea; ambiente doméstico peruano refinado, no museo ni souvenir.",
        "magic": "Cada hebra que sale del telar se convierte en un hilo de luz física que viaja por el aire y va tejiendo brevemente pequeñas rutas, casas y abrazos abstractos antes de volver a la tela. La magia debe salir de las manos y del trabajo manual, no de un efecto genérico.",
        "lighting": "Crema cálido, terracota, verde salvia y reflejos de cobre que revelan la textura de cada fibra y el polvo suspendido del taller.",
    },
    "08_abuela_nieta_tejedor": {
        "change": "Move beyond a normal loom scene: make the craft tactile, handmade, and visibly magical.",
        "scene": "Isabel, abuela peruana adulta, y Valentina, su nieta adulta, trabajan juntas en un telar de cintura contemporáneo que ocupa una parte importante de la escena. Las manos de ambas se ven claramente tensando, anudando y guiando fibras reales; Isabel guía el gesto con calma y Valentina aprende mirando sus manos. La pieza tejida debe verse artesanal, gruesa, imperfecta y hecha a mano, nunca como decoración industrial. Rostros visibles y relación familiar inequívoca.",
        "background": "Patio luminoso con banco de madera, ovillos de lana, fibras naturales y una pared de adobe contemporánea; ambiente doméstico peruano refinado, no museo ni souvenir.",
        "magic": "Cada hebra que sale del telar se convierte en un hilo de luz física que viaja por el aire y va tejiendo brevemente pequeñas rutas, casas y abrazos abstractos antes de volver a la tela. La magia debe salir de las manos y del trabajo manual, no de un efecto genérico.",
        "lighting": "Crema cálido, terracota, verde salvia y reflejos de cobre que revelan la textura de cada fibra y el polvo suspendido del taller.",
    },
    "08_equipo_mundial": {
        "change": "Turn a normal neighborhood football photo into an emotionally impossible, unbranded dream of winning with Peru.",
        "scene": "Valentina, Mateo y Sofía, hermanos adultos peruanos, se abrazan con lágrimas y euforia en el instante posterior a una final mundial imaginaria ganada por Perú. No están posando para una foto de cancha: están juntos en medio de una emoción enorme y física, con ropa cotidiana elegante y acentos rojo y blanco sin escudos, logotipos, camisetas oficiales, nombres de torneo ni trofeos identificables. Rostros nítidos, ojos húmedos, manos entrelazadas y alegría genuina.",
        "background": "Una ciudad nocturna imposible se abre detrás de ellos: balcones, calles y cerros lejanos se encienden en rojo y blanco, mientras una copa dorada abstracta e irreconocible se forma solo como constelación en el cielo. No mostrar estadio real, marca deportiva, escudo ni copa oficial.",
        "magic": "La emoción de los tres libera olas de luz roja y blanca que atraviesan la ciudad y elevan pequeñas chispas hasta la copa-constelación. Debe sentirse como un sueño colectivo que no puede fotografiarse, no como una foto familiar ordinaria en una cancha.",
        "lighting": "Azul noche profundo, rojo carmesí, blanco cálido y destellos dorados; escala épica pero intimidad emocional en el abrazo.",
    },
    "11_angel_padre_velada": {
        "change": "Remove the framed portrait. The father must be a life-size, tangible protagonist in a magical reunion.",
        "scene": "Ricardo, padre adulto que ya partió, aparece de cuerpo entero, tangible y reconocible junto a Mateo, su hijo adulto, caminando hombro a hombro por una ruta nocturna de faroles. Ricardo toca suavemente el hombro de Mateo y ambos se miran con cariño real; la escena muestra un reencuentro que no pudieron vivir, no una ausencia. Ricardo no es retrato, cuadro, fotografía, estatua ni figura transparente: es una persona viva y físicamente presente en la escena.",
        "background": "Camino abierto con faroles artesanales, panes tradicionales y flores discretas a los lados, cielo nocturno profundo. Sin marcos, álbumes, retratos, velorio ni funeral. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Los faroles dejan una ruta cálida de luz que se eleva hacia un cielo lleno de constelaciones pequeñas, como si cada consejo de Ricardo iluminara el camino de Mateo. Magia intensa pero tangible: sin fantasmas, transparencias, halos ni alas humanas.",
        "lighting": "Ámbar de farol, cobre y azul noche; Ricardo y Mateo iluminados con la misma luz real, sin diferenciar al padre como aparición.",
    },
    "12_angel_madre_velas": {
        "change": "Remove the framed portrait. The mother must be a life-size, tangible protagonist in a magical reunion.",
        "scene": "Elena, madre adulta que ya partió, aparece de cuerpo entero, tangible y reconocible junto a Camila, su hija adulta, construyendo juntas una gran instalación de velas flotantes sobre una mesa de patio. Elena toma las manos de Camila para encender una vela y ambas sonríen con emoción contenida; es una escena nueva que no pudieron vivir. Elena no es retrato, cuadro, fotografía, estatua ni figura transparente: es una persona viva y físicamente presente.",
        "background": "Patio nocturno íntimo con flores crema, panes tradicionales y telas suaves; sin marcos, álbumes, retratos, velorio ni funeral. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Las velas encendidas se elevan lentamente como pequeñas luciérnagas y forman sobre ellas un techo de luz cálida, sin halos, alas humanas, fantasmas ni efectos de aparición.",
        "lighting": "Marfil, terracota, ámbar y azul profundo; la misma luz corporal y cálida cae sobre Elena y Camila.",
    },
    "13_corazon_abuelo_album_marinera": {
        "change": "Remove the album and photo treatment. Show a tangible grandfather and granddaughter in an impossible magical memory.",
        "scene": "Ricardo, abuelo adulto que ya partió, baila marinera con Valentina, su nieta adulta, sobre una terraza alta que parece extenderse hacia un cielo nocturno lleno de estrellas. Ambos son de cuerpo entero, reconocibles, tangibles y se miran con alegría real. Ricardo no aparece dentro de un álbum, foto, marco, pintura ni objeto memorial: está presente como persona viva en este momento imaginado que nunca pudieron compartir.",
        "background": "Terraza sobria con pañuelos blancos, una radio criolla antigua y luces de ciudad lejanas; sin retratos, álbumes, cuadros, velorio ni funeral. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Los pañuelos dibujan arcos de luz marfil que se convierten en una vía de estrellas alrededor de los dos, mientras la música parece levantar suavemente el borde de la noche. Sin fantasmas, transparencia, halos ni alas humanas.",
        "lighting": "Azul tinta, marfil, plata y ámbar tenue; la luz trata a Ricardo y Valentina como cuerpos igualmente reales.",
    },
    "14_corazon_abuela_retablo_bordado": {
        "change": "Remove the retablo as a frame. Show the grandmother as a tangible participant in a magical handmade scene.",
        "scene": "Isabel, abuela adulta que ya partió, y Valentina, su nieta adulta, están de cuerpo entero en un patio nocturno creando juntas un gran tejido floral suspendido. Ambas manipulan hilos reales, se miran y ríen; Isabel es reconocible, cálida y físicamente presente. No existe como retrato bordado, cuadro, retablo, foto, estatua ni silueta: es protagonista viva de una escena imaginada que no pudieron compartir.",
        "background": "Patio de madera y adobe contemporáneo, flores, fibras naturales y pequeñas luces; sin marcos, álbumes, cuadros, velorio ni funeral. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "El tejido que construyen se despliega por encima de ellas como un jardín de flores luminosas en movimiento; los hilos trazan rutas de memoria sin volver a Isabel una aparición. Sin halos, alas humanas, fantasmas ni transparencia.",
        "lighting": "Terracota, granate, crema, índigo y cobre; textura artesanal viva y emoción cálida.",
    },
    "15_siempre_seras_hermano_pichanga": {
        "change": "Keep both brothers physically present but make the memory impossible, magical, and emotionally vivid.",
        "scene": "Emiliano y Gabriel, hermanos jóvenes adultos, juegan una pichanga de barrio en una cancha que al anochecer se transforma en una extensión abierta de cielo y ciudad. Ambos están de cuerpo entero, tangibles, reconocibles y ríen después de una jugada; debe leerse inequívocamente como hermandad, no como pareja. Gabriel no es una aparición, retrato ni figura de fondo: comparte físicamente la escena que sus hermanos no pudieron volver a vivir.",
        "background": "La cancha empieza real y se abre hacia una ciudad nocturna imposible de luces cálidas; amigos muy desenfocados al fondo, sin animales ni mascotas.",
        "magic": "El balón deja una ruta de luz que levanta del césped pequeñas constelaciones y crea una paloma lineal mínima cerca del poema. El mundo se siente extraordinario sin volver a ninguno de los hermanos transparente, alado o fantasmagórico.",
        "lighting": "Atardecer naranja, azul noche, cobre y destellos blancos; emoción de juego, nostalgia y alegría a la vez.",
    },
    "16_siempre_seras_hermana_pichanga": {
        "change": "Keep both sisters physically present but make the memory impossible, magical, and emotionally vivid.",
        "scene": "Camila y Valentina, hermanas jóvenes adultas, juegan una pichanga de barrio en una cancha que al anochecer se transforma en una extensión abierta de cielo y ciudad. Ambas están de cuerpo entero, tangibles, reconocibles y ríen después de una jugada; debe leerse inequívocamente como hermandad, no como pareja. Valentina no es una aparición, retrato ni figura de fondo: comparte físicamente la escena que sus hermanas no pudieron volver a vivir.",
        "background": "La cancha empieza real y se abre hacia una ciudad nocturna imposible de luces cálidas; amistades muy desenfocadas al fondo, sin animales ni mascotas.",
        "magic": "El balón deja una ruta de luz que levanta del césped pequeñas constelaciones y crea una paloma lineal mínima cerca del poema. El mundo se siente extraordinario sin volver a ninguna hermana transparente, alada o fantasmagórica.",
        "lighting": "Atardecer naranja, azul noche, cobre y destellos blancos; emoción de juego, nostalgia y alegría a la vez.",
    },
}


def pilots_to_rerender() -> list[dict]:
    pilots = []
    base_keys = {pilot["key"] for pilot in base.PILOTS}
    missing = set(UPDATES) - base_keys
    if missing:
        raise RuntimeError(f"Unknown v1 pilot keys: {sorted(missing)}")
    for original in base.PILOTS:
        if original["key"] not in UPDATES:
            continue
        pilot = copy.deepcopy(original)
        update = UPDATES[pilot["key"]]
        pilot.update({key: value for key, value in update.items() if key != "change"})
        pilot["change"] = update["change"]
        pilots.append(pilot)
    return pilots


def create_contact_sheet(results: list[dict]) -> Path:
    thumb_width, thumb_height, label_height = 480, 283, 54
    columns = 3
    rows = (len(results) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb_width, rows * (thumb_height + label_height)), "#f4f0e9")
    draw = ImageDraw.Draw(sheet)
    for index, result in enumerate(results):
        image = Image.open(result["path"]).convert("RGB")
        image.thumbnail((thumb_width, thumb_height))
        x = (index % columns) * thumb_width
        y = (index // columns) * (thumb_height + label_height)
        sheet.paste(image, (x, y))
        draw.multiline_text(
            (x + 10, y + thumb_height + 7),
            f"{index + 1:02d}. {result['title']}\n{result['direction']}",
            fill="#25211d",
            spacing=3,
        )
    REVIEW.mkdir(parents=True, exist_ok=True)
    out = REVIEW / "contact-sheet-peru-first-templates-v2.jpg"
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
        "# Peru-rooted adult template pilot — v2",
        "",
        "Rerender after visual review. V1 was preserved; this run never changes MinIO, PostgreSQL, manifest, or production.",
        "",
        f"- Renders requested: `{len(results)}`",
        f"- Successful renders: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Actual tracked cost: `${total_cost:.4f}`",
        "",
        "## Corrected results",
        "",
    ]
    for row in results:
        cost = "n/a" if row["cost_usd"] is None else f"${row['cost_usd']:.4f}"
        lines.append(f"- **{row['title']}** — {row['book']} ({row['direction']}): `{row['status']}`, {cost}")
        lines.append(f"  - Correction: {row['change']}")
        if row.get("error"):
            lines.append(f"  - Error: `{row['error']}`")
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
