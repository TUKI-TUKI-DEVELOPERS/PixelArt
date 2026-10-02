#!/usr/bin/env python3
"""Generate and publish the adult full preview set for Aventura(s) Entre Patas.

Loop scope: one book only.
- Uses the approved 4-image pilot as templates 01-04 (no extra API cost).
- Generates templates 05-20 with gpt-image-2.
- Saves WebP locally, uploads to local MinIO, and syncs local Postgres rows.

This script intentionally lives under PromptsPixelArtPlantillas/ (gitignored).
"""

from __future__ import annotations

import base64
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parent
MANIFEST = ROOT / "manifest.json"
OUTPUT = ROOT / "output"
PILOT_DIR = ROOT / "adult-books" / "aventuras-entre-patas-micro-pilot"
REVIEW_DIR = PILOT_DIR / "review-assets"
MODEL = "gpt-image-2"
QUALITY = "medium"
SIZE = "1600x944"
MODERATION = "auto"
BOOK_LOCAL = "Aventuras Entre Patas Adulto"
BOOK_DB = "Aventura Entre Patas Adulto"
BOOK_SLUG = "aventura-entre-patas-adulto"
CATEGORY_NAME = "Libros de Mascotas"
VERSION = "full-adult"
STORAGE_BASE = "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas"
PRICES = {"gpt-image-2": {"text_in": 5.00, "image_out": 30.00}}

PILOT_FILES = {
    1: ROOT / "output/Aventuras Entre Patas Adulto/micro-piloto-huella/ADULTO_AVENTURAS_ENTRE_PATAS_HUELLA_01_El_explorador_de_senderos_secretos.webp",
    2: ROOT / "output/Aventuras Entre Patas Adulto/micro-piloto-huella/ADULTO_AVENTURAS_ENTRE_PATAS_HUELLA_02_El_capitan_de_las_tardes_de_playa.webp",
    3: ROOT / "output/Aventuras Entre Patas Adulto/micro-piloto-huella/ADULTO_AVENTURAS_ENTRE_PATAS_HUELLA_03_El_detective_de_huellas_felices.webp",
    4: ROOT / "output/Aventuras Entre Patas Adulto/micro-piloto-huella/ADULTO_AVENTURAS_ENTRE_PATAS_HUELLA_04_El_guardian_del_campamento.webp",
}


@dataclass(frozen=True)
class Template:
    num: int
    title: str
    human_count: int
    scene: str
    background: str
    color: str
    poem: str

    @property
    def slug(self) -> str:
        value = self.title.lower()
        value = value.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n")
        value = re.sub(r"[^a-z0-9]+", "_", value).strip("_")
        return value

    @property
    def filename(self) -> str:
        return f"Plantilla_{self.num:02d}_{self.slug}.webp"

    @property
    def storage_key(self) -> str:
        return f"{STORAGE_BASE}/{self.filename}"


def poem(*lines: str) -> str:
    return "\n".join(lines)


TEMPLATES: list[Template] = [
    Template(1, "El explorador de senderos secretos", 2, "Bosque húmedo de montaña; Rocky avanza al frente siguiendo huellas luminosas mientras dos adultos leen un mapa y una brújula.", "Sendero natural con hojas mojadas, raíces, neblina suave y luz filtrada entre árboles.", "verde bosque, ámbar y sombra cinematográfica", poem("Para Rocky, cada sendero empieza al mirar,", "tu cola encendida queriendo avanzar.", "No importa la ruta ni la dirección,", "contigo el camino se vuelve emoción.", "Hoy sigo tus huellas con lenta alegría,", "tu paso convierte la tarde en guía.", "Si el mundo se cansa de tanto correr,", "tu forma de andar me enseña a volver.")),
    Template(2, "El capitán de las tardes de playa", 2, "Playa adulta al atardecer; Rocky corre delante de dos adultos caminando por la orilla, con linterna, cuerda náutica y huellas brillantes.", "Costa amplia, mar bajo, cielo naranja, manta sobria y farol encendido en la arena.", "turquesa profundo, coral, naranja de atardecer", poem("Cuando la tarde se empieza a dorar,", "tu paso en la arena nos llama a jugar.", "No llevas bandera ni gran timón,", "pero haces del viento una celebración.", "Hoy, Rocky, volvemos al mismo lugar,", "donde cada ola nos sabe esperar.", "Si el día fue largo y perdió su color,", "tu playa secreta devuelve el humor.")),
    Template(3, "El detective de huellas felices", 2, "Calle lluviosa elegante; Rocky olfatea huellas luminosas mientras dos adultos lo siguen con paraguas, linterna y libreta.", "Café urbano, adoquines mojados, faroles cálidos reflejados en el piso y lluvia fina.", "azul grisáceo, dorado cálido, reflejos de lluvia", poem("La lluvia dibuja secretos al pasar,", "y tú los descubres con solo olfatear.", "Cada pisada parece contar", "un pequeño misterio listo para jugar.", "Si falta una risa o sobra preocupación,", "tu hocico encuentra la mejor solución.", "Ningún día gris se queda aquí,", "cuando aparece mi detective Rocky.")),
    Template(4, "El guardián del campamento", 2, "Campamento nocturno adulto; Rocky sentado alerta junto a una fogata, dos adultos toman café alrededor, montañas y estrellas al fondo.", "Carpa sobria, manta de lana, termo, lámpara de camping, pinos y cielo estrellado.", "azul noche, naranja fogata, plata lunar", poem("Cuando la noche se abre alrededor,", "tu calma enciende pequeño valor.", "No hace falta hablar para proteger:", "tu mirada sabe quedarse y creer.", "Tu amor, Rocky, sabe acompañar,", "en rutas de estrellas y viento al pasar.", "Si afuera la vida se vuelve feroz,", "tu fuego en nosotros levanta su voz.")),
    Template(5, "La ruta que elegimos juntos", 1, "Carretera panorámica; una persona adulta abre la puerta de una camioneta vintage mientras Rocky espera listo para subir, protagonista y sonriente.", "Mirador andino, maleta de lona, termo, mapa doblado sobre el capó y horizonte despejado.", "azul mineral, beige arena y cobre de tarde", poem("No hace falta saber dónde llegar,", "si vienes conmigo listo para avanzar.", "Tu mirada pregunta, mi mano responde,", "y el día se abre por cualquier horizonte.", "Rocky, contigo la ruta es señal,", "un mapa sencillo hacia algo especial.", "Si el mundo se vuelve difícil de leer,", "tu paso me enseña por dónde volver.")),
    Template(6, "Tres huellas en la ciudad", 3, "Tres personas adultas cruzan una avenida tranquila de noche con Rocky al centro, todos con rostros visibles, como equipo urbano de aventuras cotidianas.", "Ciudad moderna con cruces peatonales brillantes, letreros cálidos, cafeterías y reflejos sobre asfalto limpio.", "azul petróleo, neón suave y dorado urbano", poem("La ciudad se enciende, empieza a sonar,", "y tú vas al centro marcando el compás.", "Tres pasos humanos siguen tu señal,", "la noche se vuelve paseo especial.", "Rocky, pequeño faro de buen humor,", "haces de cada esquina un lugar mejor.", "Si el ruido nos quiere hacer olvidar,", "tu huella nos vuelve a encontrar.")),
    Template(7, "El mapa de los domingos", 1, "Una persona adulta y Rocky revisan un mapa sobre una mesa de picnic exterior; Rocky apoya una pata cerca de la próxima ruta.", "Parque amplio, bicicleta apoyada, canasta de picnic sobria, árboles altos y luz de domingo.", "verde oliva, crema y amarillo suave", poem("Hay mapas que no se aprenden mirando,", "se entienden contigo saliendo andando.", "Una pata decide la dirección,", "y el domingo despierta nueva emoción.", "Rocky, mi brújula de libertad,", "me recuerdas mirar con curiosidad.", "Si la semana pesó más de lo normal,", "tu mapa sencillo me devuelve al final.")),
    Template(8, "El copiloto de las montañas", 2, "Dos personas adultas y Rocky contemplan una cadena de montañas desde un mirador; Rocky en primer plano con pañuelo sobrio.", "Mirador de piedra, viento suave, mochila técnica, nubes bajas y valle profundo.", "gris montaña, azul frío y naranja amanecer", poem("Sube la altura, respira el lugar,", "tu cola me invita a no abandonar.", "No dices palabra, no das explicación,", "pero llenas de calma cada decisión.", "Rocky, copiloto de cielo y sendero,", "contigo el esfuerzo se vuelve ligero.", "Si falta energía para continuar,", "tu forma de mirar me ayuda a llegar.")),
    Template(9, "El café donde siempre volvemos", 1, "Una persona adulta en terraza de café con Rocky descansando junto a la silla, ambos mirando hacia la calle con calma feliz.", "Café europeo sobrio, mesa pequeña, taza humeante, plantas, vitrales y luz de mañana.", "madera oscura, crema, verde salvia", poem("Hay días que piden bajar la velocidad,", "sentarse contigo y mirar la ciudad.", "Tu calma se queda junto a mi café,", "como si supieras todo sin saber.", "Rocky, compañero de pausa y andar,", "hasta el silencio se vuelve hogar.", "Si afuera la prisa me quiere arrastrar,", "tu sueño tranquilo me enseña a estar.")),
    Template(10, "La patrulla de las luces", 3, "Tres personas adultas caminan con Rocky por un malecón nocturno; Rocky guía con una correa luminosa muy sutil y postura alegre.", "Malecón junto al agua, faroles en línea, reflejos, bancas de madera y cielo azul profundo.", "azul noche, oro viejo y blanco lunar", poem("Cuando las luces empiezan a arder,", "sales primero queriendo entender.", "Tres voces te siguen con buen corazón,", "y el paseo se vuelve pequeña misión.", "Rocky, guardián de la ruta final,", "haces segura la noche normal.", "Si alguna sombra nos quiere alcanzar,", "tu paso contento nos sabe cuidar.")),
    Template(11, "El buscador de tesoros simples", 2, "Dos personas adultas y Rocky en un mercado de pulgas al aire libre; Rocky descubre una caja de objetos antiguos con una pata curiosa.", "Puestos de madera, cámaras antiguas, brújulas, libros usados, toldos de lona y luz cálida.", "ocre, terracota y verde botella", poem("No todo tesoro se esconde en el mar,", "a veces espera en un viejo lugar.", "Tú lo descubres con pura emoción,", "nariz de aventura, mirada de sol.", "Rocky, experto en hallar claridad,", "ves magia sencilla donde otros no están.", "Si busco motivos para sonreír,", "tu pata me muestra por dónde seguir.")),
    Template(12, "La carrera contra el viento", 1, "Una persona adulta corre por un sendero costero mientras Rocky corre delante con alegría, movimiento fuerte y rostros visibles.", "Acantilado seguro, mar al fondo, pasto movido por viento, zapatillas, reloj deportivo y cielo amplio.", "azul océano, blanco espuma, verde seco", poem("El viento pregunta quién va a ganar,", "y tú ya respondes saliendo a volar.", "No corres por premio ni por competir,", "corres porque el mundo te invita a vivir.", "Rocky, alegría que sabe empujar,", "tu ritmo me ayuda a respirar.", "Si el cansancio me quiere vencer,", "tu risa peluda me enseña a correr.")),
    Template(13, "El picnic de las grandes historias", 3, "Tres personas adultas sentadas sobre una manta en parque amplio, no rígidas ni posadas; Rocky en primer plano roba la atención con expresión divertida.", "Parque urbano maduro, manta de lino, frutas, libro abierto, cámara instantánea y árboles de sombra.", "verde parque, rojo suave y crema", poem("Entre historias, fruta y conversación,", "tu hocico aparece robando atención.", "No necesitas saber qué contar,", "te basta mirarnos para hacer reír más.", "Rocky, maestro del buen compartir,", "contigo un picnic aprende a latir.", "Si la tarde se quiere dormir,", "tu gesto travieso la vuelve a encender aquí.")),
    Template(14, "El faro de los días largos", 1, "Una persona adulta vuelve a casa al anochecer; Rocky la recibe en una entrada iluminada, protagonista, grande y emotivo.", "Puerta moderna cálida, paraguas, abrigo, luz interior dorada y calle tranquila con lluvia fina.", "azul lluvia, ámbar hogar y gris suave", poem("Cuando el día se hizo demasiado largo,", "tu espera convierte el cansancio en abrazo.", "No preguntas nada, sabes mirar,", "como si supieras curar al llegar.", "Rocky, faro pequeño de mi habitación,", "enciendes la casa con pura emoción.", "Si afuera la vida pesa al volver,", "tu bienvenida me enseña a creer.")),
    Template(15, "El guardián de la biblioteca", 2, "Dos personas adultas en biblioteca antigua con Rocky acostado entre libros, alerta y sereno, con una huella luminosa en el piso.", "Biblioteca de madera, lámparas verdes, escaleras, libros antiguos y polvo dorado en luz lateral.", "marrón nogal, verde biblioteca y oro suave", poem("Entre páginas viejas y olor a papel,", "te quedas atento cuidando mi fe.", "Cada historia parece empezar", "cuando tu mirada decide escuchar.", "Rocky, guardián de relatos sin fin,", "conviertes silencio en lugar feliz.", "Si pierdo una frase para continuar,", "tu calma me ayuda a volver a empezar.")),
    Template(16, "La brújula de los días nuevos", 3, "Tres personas adultas y Rocky preparan mochilas en un muelle al amanecer; Rocky al centro con postura de guía.", "Muelle de madera, lago sereno, termos metálicos, remos, mochilas y niebla baja.", "azul lago, cobre amanecer y verde pino", poem("Amanece lento sobre el lugar,", "y tú ya sabes por dónde empezar.", "Tres manos preparan la nueva estación,", "tu cola confirma la dirección.", "Rocky, brújula de días por abrir,", "contigo es más fácil salir y vivir.", "Si el futuro parece difícil de ver,", "tu paso primero me invita a creer.")),
    Template(17, "El taller de trucos imposibles", 1, "Una persona adulta entrena trucos con Rocky en un taller creativo; Rocky salta atravesando un aro bajo con expresión feliz.", "Taller luminoso con madera, herramientas seguras, aro, premios de entrenamiento, plantas y luz lateral.", "madera clara, azul acero y amarillo cálido", poem("Una vuelta, una pata, un salto audaz,", "contigo lo imposible se ríe un poco más.", "No importa si sale perfecto o no,", "tu intento ya llena de gracia el salón.", "Rocky, inventor de torpes hazañas,", "vuelves brillante cualquier mañana.", "Si la vida exige hacerlo todo bien,", "tu juego me enseña a probar otra vez.")),
    Template(18, "La noche de cine bajo estrellas", 2, "Dos personas adultas ven cine al aire libre con Rocky entre mantas; los adultos están sentados de costado en vista tres cuartos hacia cámara, rostros claramente visibles iluminados por el proyector, con la pantalla visible detrás en segundo plano. Rocky queda protagonista en primer plano.", "Patio o terraza con proyector, pantalla blanca al fondo, mantas, luces colgantes y cielo con estrellas.", "azul profundo, blanco proyector y naranja cálido", poem("La pantalla brilla, la noche se va,", "y tú eliges sitio para acompañar.", "No entiendes la trama ni el final,", "pero haces la escena más especial.", "Rocky, función de ternura real,", "tu sombra en la manta nos sabe cuidar.", "Si el mundo parece ponerse gris,", "tu noche de cine me deja feliz.")),
    Template(19, "El jardín de las huellas brillantes", 3, "Tres personas adultas y Rocky atraviesan un jardín botánico al atardecer; huellas doradas discretas marcan el camino.", "Invernadero de cristal, plantas grandes, senderos húmedos, bancos de hierro y luz verde dorada.", "verde botánico, oro tenue y cristal", poem("En cada hoja parece latir", "una pequeña ruta lista para seguir.", "Tú vas dejando señales de luz,", "y el jardín entero camina según tú.", "Rocky, jardinero de felicidad,", "haces florecer nuestra complicidad.", "Si faltan razones para celebrar,", "tus huellas brillantes nos vuelven a juntar.")),
    Template(20, "Aventuras que siempre vuelven", 2, "Escena final: dos personas adultas y Rocky miran un álbum de fotos de viajes en una terraza nocturna; Rocky grande y cercano, emocional.", "Terraza con mesa baja, álbum abierto, luces cálidas, ciudad lejana y cielo despejado.", "azul medianoche, dorado íntimo y crema", poem("Algunas aventuras terminan por hoy,", "pero dejan caminos en donde voy.", "Tu nombre se queda en cada estación,", "huella pequeña, enorme emoción.", "Rocky, compañero de tanto vivir,", "contigo siempre hay algo por descubrir.", "Si cierro el libro para descansar,", "mañana tus patas lo vuelven a empezar.")),
]


def read_env_value(path: Path, key: str) -> str | None:
    if not path.exists():
        return None
    for raw in path.read_text(encoding="utf-8").splitlines():
        if raw.startswith(f"{key}="):
            return raw.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def load_openai_key() -> str:
    value = read_env_value(ROOT / ".env", "OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not value or "PEGA-TU-KEY" in value:
        raise SystemExit("Missing OPENAI_API_KEY")
    return value


def cost_from_usage(usage: dict[str, Any] | None) -> float | None:
    if not usage:
        return None
    details = usage.get("input_tokens_details") or {}
    text_in = details.get("text_tokens") or usage.get("input_tokens") or 0
    out = usage.get("output_tokens") or 0
    p = PRICES[MODEL]
    return round(text_in / 1e6 * p["text_in"] + out / 1e6 * p["image_out"], 4)


def load_manifest() -> list[dict[str, Any]]:
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def save_manifest_entry(entry: dict[str, Any]) -> None:
    manifest = load_manifest()
    idx_by_id = {row["id"]: i for i, row in enumerate(manifest)}
    if entry["id"] in idx_by_id:
        manifest[idx_by_id[entry["id"]]] = entry
    else:
        manifest.append(entry)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


def generation_prompt(t: Template) -> str:
    if t.human_count == 1:
        humans = "una persona adulta latina de aproximadamente 30-40 años, rostro visible en vista frontal o tres cuartos"
    elif t.human_count == 2:
        humans = "dos personas adultas latinas de aproximadamente 30-40 años, rostros visibles en vista frontal o tres cuartos"
    else:
        humans = "tres personas adultas latinas de aproximadamente 30-40 años, rostros visibles en vista frontal o tres cuartos"
    return f"""Crear una ilustración hiperrealista editorial para una DOBLE PÁGINA ABIERTA de libro personalizado adulto, formato horizontal 1600x944, vista perfectamente frontal y plana, a sangre completa, sin mesa, sin portada, sin mockup exterior, sin manos sosteniendo el libro.

[LIBRO]
Aventuras Entre Patas — versión adulta. Mascota protagonista: Rocky, perro mediano dorado con orejas caídas, reconocible, grande y emocionalmente central. No inventar gato ni otra especie.

[COMPOSICIÓN HUMANA]
La escena debe mostrar {humans} junto a Rocky. Límite absoluto: máximo 3 personas humanas visibles, sin contar la mascota. No agregar personas extra. No convertirlo en pareja fija si el prompt pide 1 o 3 personas. Prohibido mostrar humanos de espaldas o como figuras anónimas.

[ESCENA]
{t.scene}

[FONDO]
{t.background}

[DISEÑO EDITORIAL]
- Una única imagen continua cruza naturalmente el pliegue central.
- Título grande en página izquierda: “{t.title.upper()}”.
- Poema en página derecha, tipografía Montserrat moderna, limpia, perfectamente legible, más pequeña que el título.
- Debajo del poema colocar un icono lineal minimalista de huella de pata/patita con un pequeño destello integrado.
- No usar casita, casa con corazón, paloma, alas humanas, halo ni simbología memorial.
- Separador fino bajo el título con ornamento geométrico pequeño.

[POEMA — TEXTO EXACTO]
{t.poem}

[LUZ Y COLOR]
Paleta: {t.color}. Luz cinematográfica sobria, adulta, con detalle fotográfico realista. La magia debe sentirse conceptual y sutil, integrada a la escena mediante huellas luminosas, reflejos o pequeñas partículas, nunca como fantasía infantil.

[NEGATIVOS]
No caricatura, no Pixar, no infantil, no bebé, no niños, no sala genérica, no mesa central genérica, no personas sentadas sin acción, no animales extra, no gato, no paloma, no casita bajo poema, no exceso de texto ilegible.
"""


def db_fields(t: Template) -> tuple[str, str, str, str, str, str]:
    scene_visual = (
        "Una única fotografía continua, plana y a sangre completa, con tono adulto, aventurero y emocional. "
        f"{t.scene} Rocky ({'{NOMBRE_DESTINATARIO}'}) debe verse como mascota protagonista, reconocible y central. "
        "La composición admite de 1 a 3 personas adultas según las fotos subidas; máximo 3 humanos visibles, sin contar la mascota. "
        "Los rostros humanos deben verse frontal o tres cuartos; no usar personas de espaldas ni figuras anónimas."
    )
    background = t.background
    magic = "Huellas de pata luminosas, reflejos sutiles o partículas pequeñas acompañan la escena como metáfora de aventura cotidiana. Debe sentirse integrado a una fotografía real, no fantasía infantil. Bajo el poema debe aparecer una huella de pata minimalista; nunca casita ni paloma."
    lighting = f"Iluminación cinematográfica adulta con paleta {t.color}. Contraste sobrio, profundidad fotográfica y atmósfera cálida sin infantilizar."
    poem_template = t.poem.replace("Rocky", "{APODO_DESTINATARIO}").replace("rocky", "{APODO_DESTINATARIO}")
    roles = json.dumps([{"key": "pet", "count": 1}, {"key": "owners", "max": 3}], ensure_ascii=False)
    return scene_visual, background, magic, lighting, poem_template, roles


def ensure_prompt_invariants() -> None:
    rendered = "\n".join(generation_prompt(t) for t in TEMPLATES).lower()
    checks = {
        "20 templates": len(TEMPLATES) == 20,
        "paw icon": rendered.count("huella de pata") >= 20 or rendered.count("patita") >= 20,
        "no house": "casita" in rendered and "no casita" in rendered and "no usar casita" in rendered,
        "no dove": "no paloma" in rendered,
        "dog explicit": rendered.count("perro mediano dorado") >= 20,
        "max 3 humans": rendered.count("máximo 3") >= 20,
    }
    failed = [name for name, ok in checks.items() if not ok]
    if failed:
        raise SystemExit(f"Prompt invariant failed: {failed}")


def local_path(t: Template) -> Path:
    return OUTPUT / BOOK_LOCAL / VERSION / t.filename


def generate_image(t: Template, key: str) -> tuple[float | None, str]:
    prompt = generation_prompt(t)
    body = json.dumps({"model": MODEL, "prompt": prompt, "size": SIZE, "quality": QUALITY, "moderation": MODERATION, "n": 1}).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        method="POST",
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=420) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    raw = base64.b64decode(data["data"][0]["b64_json"])
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    if im.size != (1600, 944):
        raise RuntimeError(f"Unexpected image size for {t.num}: {im.size}")
    dest = local_path(t)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=95, method=6)
    return cost_from_usage(data.get("usage")), str(dest.relative_to(ROOT))


def copy_pilot(t: Template) -> tuple[float, str]:
    src = PILOT_FILES[t.num]
    if not src.exists():
        raise FileNotFoundError(src)
    dest = local_path(t)
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    return 0.0, str(dest.relative_to(ROOT))


def upload_all() -> None:
    env = PROJECT / ".env.docker"
    access = read_env_value(env, "MINIO_ACCESS_KEY")
    secret = read_env_value(env, "MINIO_SECRET_KEY")
    bucket = read_env_value(env, "MINIO_BUCKET") or "pixelart-assets"
    if not access or not secret:
        raise SystemExit("Missing MinIO credentials in .env.docker")
    subprocess.run(["mc", "alias", "set", "pixelart-local", "http://localhost:9000", access, secret], check=True, stdout=subprocess.DEVNULL)
    for t in TEMPLATES:
        src = local_path(t)
        subprocess.run(["mc", "cp", "--attr", "Content-Type=image/webp", str(src), f"pixelart-local/{bucket}/{t.storage_key}"], check=True, stdout=subprocess.DEVNULL)


def sql_quote(value: str) -> str:
    return "$q$" + value.replace("$q$", "$ q $") + "$q$"


def sync_db() -> None:
    values = []
    for t in TEMPLATES:
        scene, bg, magic, light, poem_template, roles = db_fields(t)
        values.append(
            "(" + ", ".join([
                sql_quote(t.storage_key),
                sql_quote(t.title),
                sql_quote(scene),
                sql_quote(bg),
                sql_quote(magic),
                sql_quote(light),
                sql_quote(poem_template),
                sql_quote(roles),
            ]) + ")"
        )
    sql = f"""
BEGIN;

WITH cat AS (
  SELECT id FROM personalized_categories WHERE name = {sql_quote(CATEGORY_NAME)}
), inserted_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, {sql_quote(BOOK_DB)}, {sql_quote(BOOK_SLUG)}, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM inserted_model
  UNION ALL
  SELECT id FROM personalized_models WHERE name = {sql_quote(BOOK_DB)} AND slug = {sql_quote(BOOK_SLUG)}
  LIMIT 1
), inserted_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT {sql_quote(BOOK_DB)}, 'CUSTOM_BOOK', {sql_quote('Versión adulta del libro de mascotas para celebrar aventuras reales con la mascota como protagonista.')}, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = {sql_quote(BOOK_DB)})
  RETURNING id
), catalog_row AS (
  SELECT id FROM inserted_catalog
  UNION ALL
  SELECT id FROM catalog_books WHERE name = {sql_quote(BOOK_DB)}
  LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name = {sql_quote(BOOK_DB)} LIMIT 1)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_GRUESA', 15000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();

CREATE TEMP TABLE tmp_adult_aventuras_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;

INSERT INTO tmp_adult_aventuras_templates VALUES
{",\n".join(values)};

WITH model_row AS (
  SELECT id FROM personalized_models WHERE name = {sql_quote(BOOK_DB)} AND slug = {sql_quote(BOOK_SLUG)} LIMIT 1
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction, scene_visual, background_details,
  magic_effects, lighting_color, poem_template, character_roles, is_active
)
SELECT model_row.id, t.name, t.template_preview_key, NULL, t.scene_visual, t.background_details,
       t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_aventuras_templates t CROSS JOIN model_row
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates existing
  WHERE existing.model_id = model_row.id
    AND existing.template_preview_key = t.template_preview_key
);

UPDATE personalized_templates p
SET name = t.name,
    scene_visual = t.scene_visual,
    background_details = t.background_details,
    magic_effects = t.magic_effects,
    lighting_color = t.lighting_color,
    poem_template = t.poem_template,
    character_roles = t.character_roles,
    is_active = true,
    updated_at = now()
FROM tmp_adult_aventuras_templates t
WHERE p.template_preview_key = t.template_preview_key;

COMMIT;
"""
    sql_path = PILOT_DIR / "backfill-aventura-entre-patas-adult-local.sql"
    sql_path.write_text(sql, encoding="utf-8")
    subprocess.run(["docker", "exec", "-i", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart"], input=sql.encode("utf-8"), check=True)


def create_contact_sheet() -> None:
    cells = []
    for t in TEMPLATES:
        im = Image.open(local_path(t)).convert("RGB")
        th = ImageOps.contain(im, (380, 224), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (400, 280), "white")
        canvas.paste(th, ((400 - th.width) // 2, 28))
        d = ImageDraw.Draw(canvas)
        d.text((10, 8), f"{t.num:02d} {t.title[:42]}", fill=(0, 0, 0))
        cells.append(canvas)
    cols = 4
    rows = 5
    out = Image.new("RGB", (cols * 400, rows * 280), "white")
    for i, cell in enumerate(cells):
        out.paste(cell, ((i % cols) * 400, (i // cols) * 280))
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    out.save(REVIEW_DIR / "contact-sheet-full-adult-huella.jpg", quality=92)


def main() -> None:
    ensure_prompt_invariants()
    key = load_openai_key()
    total = 0.0
    generated = 0
    reused = 0
    for t in TEMPLATES:
        entry = {
            "id": f"adult-aventuras-entre-patas-full-{t.num:02d}-{t.slug}",
            "libro": BOOK_LOCAL,
            "version": VERSION,
            "num": t.num,
            "titulo": t.title,
            "source": "adult-books/aventuras-entre-patas-micro-pilot/full-generation",
            "filename": t.filename,
            "storage_key": t.storage_key,
            "prompt": generation_prompt(t),
            "status": "pending",
            "file": None,
            "cost_usd": None,
            "generated_at": None,
            "format": "webp",
            "human_count": t.human_count,
        }
        if local_path(t).exists():
            entry.update(status="done", file=str(local_path(t).relative_to(ROOT)), cost_usd=0.0, generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"), reused_existing=True)
            save_manifest_entry(entry)
            reused += 1
            print(f"[{t.num:02d}] skip existing {t.filename}")
            continue
        try:
            if t.num in PILOT_FILES:
                cost, rel = copy_pilot(t)
                reused += 1
                entry.update(status="done", file=rel, cost_usd=cost, generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"), reused_from_pilot=True)
                print(f"[{t.num:02d}] copied pilot -> {t.filename}")
            else:
                cost, rel = generate_image(t, key)
                generated += 1
                if cost:
                    total += cost
                entry.update(status="done", file=rel, cost_usd=cost, generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"), attempts=1, width=1600, height=944)
                print(f"[{t.num:02d}] generated {t.filename} ${cost if cost is not None else '?'} session=${total:.4f}")
        except urllib.error.HTTPError as err:
            msg = err.read().decode("utf-8", "ignore")
            entry.update(status="failed", error=f"HTTP {err.code}: {msg[:500]}")
            save_manifest_entry(entry)
            raise
        except Exception as exc:
            entry.update(status="failed", error=f"{type(exc).__name__}: {exc}")
            save_manifest_entry(entry)
            raise
        save_manifest_entry(entry)
    upload_all()
    sync_db()
    create_contact_sheet()
    print(json.dumps({
        "book": BOOK_LOCAL,
        "generated_new": generated,
        "reused": reused,
        "cost_usd_new": round(total, 4),
        "outputs": str((OUTPUT / BOOK_LOCAL / VERSION).relative_to(ROOT)),
        "contact_sheet": str((REVIEW_DIR / "contact-sheet-full-adult-huella.jpg").relative_to(ROOT)),
        "storage_base": STORAGE_BASE,
        "slug": BOOK_SLUG,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
