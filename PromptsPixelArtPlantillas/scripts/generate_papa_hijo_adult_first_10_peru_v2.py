#!/usr/bin/env python3
"""Generate the first 10 revised adult previews for Papá, Mi Héroe.

Scope: Hijo adulto → Papá only, templates 01–10 of the approved 20-title list.
Writes versioned PNG previews into the existing local full-preview folder. This
script never uploads to MinIO or changes SQL, the manifest, or production.
"""

from __future__ import annotations

import importlib.util
import io
import json
import sys
import time
import urllib.error
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BASE_SCRIPT = ROOT / "scripts" / "generate_peru_adult_first_pilots.py"
# All revised Peru v2 previews stay isolated from the legacy full-preview set.
OUTPUT = ROOT / "output" / "Papá, Mi Héroe Adulto" / "peru-v2"
REVIEW = ROOT / "adult-books" / "papa-mi-heroe-adult-full" / "review-assets"
MAX_ATTEMPTS = 2

spec = importlib.util.spec_from_file_location("peru_pilot_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = base
spec.loader.exec_module(base)

# These previews must avoid naming external studios, franchises, teams, or brands.
base.DETALLES_TECNICOS = base.DETALLES_TECNICOS.replace(", no Pixar", "")

TEMPLATES = [
    {
        "number": 1,
        "slug": "mi_superheroe_personal",
        "title": "MI SUPERHÉROE PERSONAL",
        "scene": "Papá Leo, hombre peruano-latino de 58 años, y Mateo, su hijo adulto de 32 años, están de cuerpo entero sobre la azotea de una casa de barrio al caer la noche. Papá Leo lleva un abrigo sastre azul profundo y un broche artesanal de cobre, no uniforme ni logotipo; Mateo lleva ropa contemporánea sobria. Ambos tienen el rostro grande, nítido y visible en tres cuartos. Leo sostiene una estrella caída entre sus manos mientras Mateo le ayuda a elevarla: el gesto expresa que el heroísmo real es acompañar y levantar a otro.",
        "magic": "La estrella que sostienen abre alrededor de ambos una bóveda protectora de luz azul y cobre, formada por líneas arquitectónicas que cubren la ciudad. La magia nace de la acción compartida, no de partículas decorativas.",
        "palette": "Azul noche, cobre cálido, dorado tenue y luces lejanas de ciudad.",
        "poem": "Para Papá Leo,\ncuando el mundo pesa demasiado,\ntu forma de estar a mi lado\nconvierte el miedo en camino.\n\nNo llevas capa ni emblema:\nllevas paciencia, verdad y abrigo.\nPor eso, en cada noche difícil,\nsigues siendo mi superhéroe personal.",
    },
    {
        "number": 2,
        "slug": "mi_caballero_de_armadura_brillante",
        "title": "MI CABALLERO DE ARMADURA BRILLANTE",
        "scene": "Papá Leo y Mateo, ambos adultos, caminan juntos por un puente de piedra imposible suspendido sobre una quebrada al amanecer. Leo viste una armadura ceremonial original, elegante y sin símbolos de franquicias: placas de plata mate con finos grabados de cobre; Mateo lleva un abrigo contemporáneo y sostiene una pequeña brújula. Sus rostros se ven grandes, en tres cuartos, y se miran mientras Leo le ofrece la mano para cruzar. No hay combate, espadas levantadas ni violencia.",
        "magic": "Con cada paso que dan juntos, el puente se prolonga delante de ellos y los grabados de la armadura se encienden como una ruta de constelaciones. El puente es la magia central y representa confianza, no un fondo genérico.",
        "palette": "Plata suave, cobre, azul de amanecer y piedra gris cálida.",
        "poem": "Para Papá Leo,\nno viniste a salvarme de la vida:\nme enseñaste a cruzarla erguido,\ncon la mirada limpia y serena.\n\nTu armadura no hace ruido:\nes tu palabra cuando me acompaña.\nPor cada puente que hoy me atrevo a cruzar,\ngracias, mi caballero de alma brillante.",
    },
    {
        "number": 3,
        "slug": "mi_rey",
        "title": "MI REY",
        "scene": "Papá Leo y Mateo, ambos adultos, están sentados lado a lado en una gran biblioteca nocturna cuya mesa central se transforma en un reino hecho de libros abiertos y caminos de papel. Leo viste una chaqueta de terciopelo borgoña con una corona mínima de cobre, no caricaturesca; Mateo usa camisa oscura contemporánea. Los dos rostros son visibles, grandes y cálidos, y sus manos colocan juntos una pequeña corona sobre un mapa de su historia familiar.",
        "magic": "Los libros abiertos se elevan y construyen una ciudad de páginas, balcones y rutas luminosas a escala real alrededor de ambos. El reino surge del conocimiento y del vínculo entre padre e hijo.",
        "palette": "Borgoña, oro viejo, azul tinta y marfil de papel.",
        "poem": "Para Papá Leo,\nen mi reino no mandan coronas:\nmandan tus manos, tu ejemplo\ny la calma con que nombras las cosas.\n\nMe enseñaste que ser rey\nes cuidar sin pedir aplauso.\nPor eso mi mejor riqueza\nes tenerte como padre y aliado.",
    },
    {
        "number": 4,
        "slug": "mi_angel_guardian",
        "title": "MI ÁNGEL GUARDIÁN",
        "scene": "Papá Leo y Mateo, ambos adultos, se encuentran de pie en un camino de montaña durante una lluvia nocturna. Leo no lleva alas, halo ni túnica: viste una casaca impermeable elegante y sostiene un farol artesanal. Mateo, con ropa contemporánea, se cubre junto a él bajo una gran estructura translúcida de luz. Ambos rostros se ven claramente en tres cuartos, cercanos y serenos; Leo mira a Mateo mientras lo guía hacia adelante.",
        "magic": "El farol de Leo despliega físicamente una cúpula de luz cálida que convierte la tormenta en cientos de líneas de lluvia suspendidas, y abre un sendero sólido sobre el vacío. La protección se ve como una acción imposible, humana y tangible.",
        "palette": "Azul tormenta, ámbar de farol, cobre y gris profundo.",
        "poem": "Para Papá Leo,\nno necesito alas para saber\nque alguien cuida mi camino:\ntu luz aparece cuando hace falta.\n\nEn las tormentas de la vida\ntu voz me devuelve la calma.\nMi ángel guardián tiene tu rostro,\ntu paso firme y tu forma de amar.",
    },
    {
        "number": 5,
        "slug": "mi_pirata_aventurero",
        "title": "MI PIRATA AVENTURERO",
        "scene": "Papá Leo y Mateo, ambos adultos, navegan una embarcación de madera original por un océano nocturno que refleja el cielo. Leo lleva camisa de lino, chaleco azul marino, abrigo largo y un pañuelo discreto; Mateo sostiene una brújula y una carta náutica. No hay calaveras, banderas reconocibles ni referencias a franquicias. Ambos muestran rostros grandes y nítidos en tres cuartos: Leo al timón sonríe hacia Mateo, que señala el horizonte.",
        "magic": "La carta náutica se convierte delante de ellos en un archipiélago de islas hechas de luz y cada ola forma brevemente una ruta luminosa navegable. La aventura imposible sucede entre ambos, no en un fondo distante.",
        "palette": "Azul petróleo, turquesa oscura, oro viejo y naranja de amanecer.",
        "poem": "Para Papá Leo,\ncontigo aprendí que un horizonte\nno es algo que se mira de lejos:\nes una pregunta que se navega.\n\nCuando el mar cambia de rumbo,\ntu risa me devuelve el valor.\nEres mi pirata aventurero,\nmi mejor brújula y mi hogar.",
    },
    {
        "number": 6,
        "slug": "mi_guerrero_protector",
        "title": "MI GUERRERO PROTECTOR",
        "scene": "Papá Leo y Mateo, ambos adultos, están frente a una gran puerta de metal y madera que se abre hacia un amanecer lleno de viento. Leo lleva una armadura ceremonial contemporánea de cobre envejecido y cuero oscuro, sin armas ni referencias militares; Mateo usa chaqueta clara y apoya una mano sobre el antebrazo de su padre. Ambos se miran de frente en tres cuartos, con sus rostros claramente visibles y expresión de confianza.",
        "magic": "Leo y Mateo empujan juntos la puerta, que se convierte en un inmenso escudo transparente frente a una tormenta de hojas y luz. Al abrirla, el escudo se transforma en un camino cálido bajo sus pies: la fuerza protectora es crear paso, no pelear.",
        "palette": "Bronce, negro carbón, dorado solar y verde profundo.",
        "poem": "Para Papá Leo,\ntu fuerza nunca fue una batalla:\nfue abrirme espacio cuando dudaba\ny enseñarme a defender lo correcto.\n\nTu coraje no necesita ruido;\nse reconoce en tu forma de cuidar.\nMi guerrero protector, contigo\naprendí que ser fuerte es amar.",
    },
    {
        "number": 7,
        "slug": "mi_capitan_piloto",
        "title": "MI CAPITÁN / PILOTO",
        "scene": "Papá Leo y Mateo, ambos adultos, están dentro de una cabina de vuelo completamente original y sin logotipos, suspendida entre nubes de cobre sobre un paisaje peruano abstracto. Leo no usa uniforme de una aerolínea: lleva chaqueta de piloto de exploración en azul oscuro y Mateo ropa contemporánea. Ambos rostros son grandes, nítidos y visibles; Mateo mira a Leo mientras ambos toman la misma palanca de mando.",
        "magic": "La cabina no pertenece a un avión comercial: es una nave de exploración que dibuja con su vuelo rutas luminosas sobre las nubes. Cada decisión compartida hace nacer una nueva constelación que funciona como mapa del cielo.",
        "palette": "Azul profundo, naranja de atardecer, cobre y marfil.",
        "poem": "Para Papá Leo,\ncuando no sabía hacia dónde ir,\ntu forma de mirar el horizonte\nme enseñó a confiar en el viaje.\n\nNo llevas mi vida por mí:\nme das criterio para pilotearla.\nMi capitán de todos los días,\ngracias por enseñarme a volar.",
    },
    {
        "number": 8,
        "slug": "mi_vikingo_valiente",
        "title": "MI VIKINGO VALIENTE",
        "scene": "Papá Leo y Mateo, ambos adultos, avanzan sobre una embarcación larga completamente original que navega un río de auroras entre montañas imposibles. Leo lleva un abrigo ceremonial de lana gris, cuero y broches de cobre inspirados de forma abstracta en un explorador nórdico, sin casco con cuernos ni símbolos históricos específicos; Mateo lleva ropa de viaje contemporánea. Ambos rostros se ven grandes, claros y en tres cuartos mientras reman juntos y se miran con determinación tranquila.",
        "magic": "Los remos de ambos despiertan una ruta de auroras líquidas que se convierte en río luminoso bajo la nave. El valor se expresa en remar juntos hacia un paisaje que se construye con cada movimiento.",
        "palette": "Índigo, verde aurora, gris piedra, cobre y oro pálido.",
        "poem": "Para Papá Leo,\nme enseñaste a no huir del viento\nni a esperar que el mar esté quieto.\nTu valentía fue remar conmigo\ncuando el horizonte parecía lejano.\n\nMi vikingo valiente, tu ejemplo\nme dejó coraje para avanzar.\nContigo aprendí que la fuerza\ntambién sabe acompañar.",
    },
    {
        "number": 9,
        "slug": "mi_arquitecto_de_suenos",
        "title": "MI ARQUITECTO DE SUEÑOS",
        "scene": "Papá Leo y Mateo, ambos adultos, trabajan cara a cara sobre una mesa de planos en un taller nocturno abierto hacia la ciudad. Leo viste camisa arremangada y chaleco de trabajo; Mateo sostiene una regla de cobre y mira a su padre con admiración madura. Sus rostros aparecen grandes, nítidos y claramente visibles en tres cuartos. Los planos muestran solo líneas abstractas, sin marcas ni edificios reconocibles.",
        "magic": "Cada trazo que ambos hacen sobre el plano se eleva en el aire y construye una arquitectura imposible a tamaño real: puentes, patios y casas de luz donde se ven rutas abiertas hacia el cielo. La obra surge de sus manos compartidas.",
        "palette": "Azul tinta, papel marfil, cobre, verde oscuro y dorado tenue.",
        "poem": "Para Papá Leo,\nme mostraste que los sueños\nno llegan terminados a la puerta:\nse dibujan, se cuidan, se sostienen.\n\nEn cada plano de mi vida\nhay una línea que aprendí de ti.\nMi arquitecto de sueños, gracias\npor enseñarme a construir mi porvenir.",
    },
    {
        "number": 10,
        "slug": "mi_gladiador",
        "title": "MI GLADIADOR",
        "scene": "Papá Leo y Mateo, ambos adultos, se encuentran en el centro de una arena circular completamente abstracta, construida con piedra cálida y estrellas, sin símbolos romanos, armas ni violencia. Leo lleva una armadura ceremonial de bronce mate y una capa corta azul oscuro; Mateo ropa contemporánea con una banda de cobre en la muñeca. Sus rostros son grandes, nítidos y visibles; en vez de combatir, se abrazan después de atravesar juntos una puerta de luz abierta en la arena.",
        "magic": "Las gradas vacías se transforman en círculos de constelaciones que suben desde el suelo y forman un camino para ambos. El triunfo no es vencer a alguien, sino salir juntos de una prueba imposible.",
        "palette": "Bronce, arena, azul noche, carmesí oscuro y oro suave.",
        "poem": "Para Papá Leo,\nme enseñaste que vencer no es golpear:\nes sostenerse cuando algo cuesta\ny levantarse con dignidad.\n\nTu victoria más grande fue mostrarme\nque el amor también es valentía.\nMi gladiador de corazón noble,\ncontigo aprendí a no rendirme.",
    },
]


def make_prompt(item: dict) -> str:
    return f"""[FORMATO Y DISEÑO EDITORIAL]
Fotografía hiperrealista de una doble página interior de libro abierto, horizontal 1600x944, ocupando todo el encuadre. Solo se ven las dos páginas de papel mate de algodón, unidas por un pliegue central vertical natural; no tapas, mesa, manos externas ni fondo. La escena visual fluye de una página a otra por detrás de texto y no debe cortar los rostros.

[PREVIEW FICTICIO]
Los personajes son ficticios y se usan solo para la plantilla estática: Papá Leo, hombre peruano-latino de 58 años, cabello entrecano, rasgos naturales; Mateo, hijo adulto peruano-latino de 32 años. AMBOS deben aparecer de cuerpo entero y con rostro grande, reconocible, iluminado y visible en tres cuartos. No niños, no personas de espaldas, no caras ocultas, no personajes diminutos, no retratos enmarcados, no collage.

[ESCENA PRINCIPAL]
{item['scene']}

[MAGIA CENTRAL]
{item['magic']}

[COLOR E ILUMINACIÓN]
{item['palette']} Iluminación cinematográfica sobria, elegante, adulta y fotorrealista. La magia ilumina los rostros sin ocultarlos.

[MAQUETACIÓN]
Página izquierda: título EXACTO en mayúsculas, tipografía editorial dorada elegante, grande, con separador dorado fino debajo: “{item['title']}”.
Página derecha: poema EXACTO impreso de forma legible en español, tipografía editorial marfil/dorada, alineado a la izquierda, sin cambiar una letra:
“{item['poem']}”
Debajo del poema, un ícono lineal pequeño de casa con corazón. Todo el texto está impreso directamente sobre el papel; no overlay digital ni marca de agua.

[RESTRICCIONES]
Fotorrealismo editorial adulto; sin apariencia infantil, caricatura, anime, franquicias, personajes reconocibles, logotipos, marcas, uniformes oficiales, violencia gráfica, armas en uso, alas humanas, halos, fotografía enmarcada, animales ni mascotas. El resultado debe sentirse como una situación mágica imposible que solo la IA puede mostrar, con los dos rostros como centro emocional."""


def output_path(item: dict) -> Path:
    return OUTPUT / f"Plantilla_{item['number']:02d}_{item['slug']}_Hijo_a_Papa_PeruV2.png"


def save_png(raw: bytes, dest: Path) -> None:
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    if image.size != (1600, 944):
        raise RuntimeError(f"Unexpected image size {image.size}; expected (1600, 944)")
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "PNG", optimize=True)


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
        draw.multiline_text((x + 10, y + thumb_height + 7), f"{result['number']:02d}. {result['title']}\nHijo adulto → Papá", fill="#25211d", spacing=3)
    REVIEW.mkdir(parents=True, exist_ok=True)
    dest = REVIEW / "contact-sheet-peru-v2-hijo-01-10.jpg"
    sheet.save(dest, "JPEG", quality=92)
    return dest


def write_report(results: list[dict], contact_sheet: Path | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    total_cost = round(sum(result["cost_usd"] or 0 for result in results), 4)
    report = {
        "scope": "Papá, Mi Héroe Adulto — Hijo adulto → Papá — templates 01–10",
        "model": base.MODEL,
        "quality": base.QUALITY,
        "size": base.SIZE,
        "attempt_limit": MAX_ATTEMPTS,
        "total_cost_usd": total_cost,
        "output_directory": str(OUTPUT),
        "contact_sheet": str(contact_sheet) if contact_sheet else None,
        "results": results,
    }
    (REVIEW / "peru-v2-hijo-01-10-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    lines = [
        "# Papá, Mi Héroe Adulto — Peru v2 — Hijo 01–10",
        "",
        "Versioned local preview run. It preserves previous full-preview assets and does not upload or modify production data.",
        "",
        f"- Requested: `{len(results)}`",
        f"- Successful: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Skipped (already present): `{sum(row['status'] == 'skipped' for row in results)}`",
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
    (REVIEW / "peru-v2-hijo-01-10-review.md").write_text("\n".join(lines) + "\n")


def main() -> None:
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
                raw, cost = base.request_image(make_prompt(item), api_key)
                save_png(raw, dest)
                print(f"  OK (attempt {attempt}) -> {dest.relative_to(ROOT)} | ${cost if cost is not None else '?'}", flush=True)
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError) as exc:
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
