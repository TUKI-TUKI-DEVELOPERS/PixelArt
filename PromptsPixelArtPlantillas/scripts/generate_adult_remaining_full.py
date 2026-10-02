#!/usr/bin/env python3
"""Generate/publish remaining adult custom-book interiors book by book.

This is a loop runner: it processes one configured book at a time, writes local WebP
outputs, uploads to local MinIO, syncs local Postgres rows, and creates a contact
sheet. It intentionally avoids the already-completed Papa and Aventura loops.
"""
from __future__ import annotations

import base64
import io
import json
import os
import re
import subprocess
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
ADULT_DIR = ROOT / "adult-books"
MODEL = "gpt-image-2"
QUALITY = "medium"
SIZE = "1600x944"
MODERATION = "auto"
VERSION = "full-adult"
PRICES = {"gpt-image-2": {"text_in": 5.00, "image_out": 30.00}}

FAMILY_TITLES = [
    "La calma que me enseñó a respirar",
    "El mapa de tus consejos",
    "La mesa donde siempre vuelvo",
    "Tus manos hicieron hogar",
    "La fuerza que no hacía ruido",
    "El abrigo de los días difíciles",
    "La luz de las pequeñas costumbres",
    "El puente hacia mi propio camino",
    "La paciencia que me dio raíces",
    "La voz que todavía me ordena el mundo",
    "El refugio de las conversaciones pendientes",
    "La brújula de mis decisiones",
    "El jardín de lo que sembraste en mí",
    "La casa que llevo por dentro",
    "El oficio silencioso de cuidar",
    "La risa que me devuelve al origen",
    "El legado de mirar con ternura",
    "La ventana donde aprendí a esperar",
    "La promesa de volver a casa",
    "Siempre seré parte de tu historia",
]

TEAM_TITLES = [
    "La estrategia de nuestras locuras",
    "El pacto de llegar juntos",
    "La banda sonora de nuestras batallas",
    "El idioma privado de las bromas",
    "La ruta que inventamos sin mapa",
    "El archivo de nuestras victorias pequeñas",
    "La mesa de los planes imposibles",
    "El código secreto de la confianza",
    "La noche en que supimos cubrirnos",
    "El taller de las soluciones raras",
    "La patrulla de los días difíciles",
    "El refugio donde nadie actúa solo",
    "La brújula de los hermanos",
    "El puente después de cada pelea",
    "La celebración de seguir siendo equipo",
    "El mapa de nuestras diferencias",
    "La carrera donde nadie queda atrás",
    "El laboratorio de la complicidad",
    "La promesa de estar cerca",
    "El mejor equipo todavía en marcha",
]

FAMILY_GROUP_TITLES = [
    "La casa de los mil regresos",
    "El laboratorio de nuestras mezclas",
    "La mesa donde todos cabemos",
    "La ruta de las voces mezcladas",
    "El archivo de las sobremesas",
    "La coreografía de los días comunes",
    "La cocina donde empieza la historia",
    "El mapa de nuestras mudanzas",
    "La sala de los planes pendientes",
    "El jardín de las generaciones",
    "La noche de las historias repetidas",
    "El puente de los apellidos",
    "La estación de los abrazos largos",
    "La biblioteca de fotos familiares",
    "El taller de arreglarlo juntos",
    "La terraza de los domingos",
    "El viaje donde cabemos todos",
    "La luz que prende cada regreso",
    "El álbum de lo que somos",
    "La familia que siempre encuentra camino",
]

MEMORIAL_TITLES = [
    "El faro que aún me guía",
    "La ruta de tus pasos buenos",
    "El jardín de tus fechas queridas",
    "El manto de tus historias",
    "La lámpara de tu cuidado",
    "El archivo luminoso de tu voz",
    "La silla donde vuelve tu risa",
    "El puente de nuestras conversaciones",
    "La ventana donde te recuerdo",
    "El mapa de tu legado",
    "La mesa que guarda tu nombre",
    "El refugio de tus consejos",
    "La constelación de tus gestos",
    "La carta que sigo escribiendo",
    "La fotografía que respira contigo",
    "El camino que dejaste abierto",
    "La luz que no se apaga",
    "El abrazo que aprendí de ti",
    "El lugar donde vuelvo a encontrarte",
    "Siempre en mi corazón",
]

SIBLING_MEMORIAL_TITLES = [
    "El equipo que sigue conmigo",
    "La ruta de nuestras bromas",
    "El refugio de nuestras locuras",
    "La promesa de seguir jugando",
    "La complicidad que no se rompe",
    "El mapa de nuestros secretos",
    "La tarde donde todavía te escucho",
    "El puente de nuestras peleas y risas",
    "La canción que era de los dos",
    "La patrulla de infancia eterna",
    "La mesa de nuestras conspiraciones",
    "El álbum donde seguimos juntos",
    "La carrera hasta el fin del mundo",
    "El código de hermanos",
    "La noche de nuestras historias",
    "El jardín de los recuerdos vivos",
    "La luz que dejó tu risa",
    "La esquina donde empieza la memoria",
    "El lazo que no aprende a irse",
    "Siempre serás parte de mí",
]

SCENES = [
    "una terraza urbana al atardecer con viento suave y objetos cotidianos significativos",
    "un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica",
    "una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos",
    "un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos",
    "una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire",
    "un malecón al amanecer con agua serena, bancas de madera y horizonte abierto",
    "una estación de tren tranquila con maletas, relojes antiguos y luz de mañana",
    "una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo",
    "un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen",
    "un camino de montaña con neblina suave, mochila y cielo amplio",
    "un estudio de arte con lienzos, papeles, cartas y reflejos dorados",
    "una sala moderna con proyector de fotos familiares y sombras suaves",
    "un mercado de flores al aire libre con toldos, texturas y color sobrio",
    "una playa fría al atardecer con arena húmeda, mantas y faroles",
    "un patio interior con plantas, lluvia fina y luces cálidas colgantes",
    "una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos",
    "una ruta costera con auto detenido, mapas y luz baja de viaje",
    "un muelle de madera sobre lago tranquilo con termos, remos y niebla",
    "un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio",
    "una habitación de lectura con ventana grande, sillón y luz serena",
]

GROUP_ACTIONS = [
    "caminan juntos con movimiento natural, sin posar rígidamente",
    "preparan una ruta con mapas y objetos repartidos sobre una mesa amplia",
    "comparten una conversación activa mientras ordenan fotos y recuerdos",
    "cruzan un espacio abierto con energía de equipo y rostros visibles",
    "resuelven juntos una pequeña tarea cotidiana convertida en escena simbólica",
]


@dataclass(frozen=True)
class BookConfig:
    key: str
    local_name: str
    db_name: str
    slug: str
    category: str
    storage_base: str
    kind: str
    count: int
    titles: list[str]
    review_package: str
    subject_m: str = ""
    subject_f: str = ""
    base_slug: str = ""
    adult_tagline: str = ""


BOOKS: list[BookConfig] = [
    BookConfig("mama", "Mamá, Mi Heroína Adulto", "Mamá, Mi Heroína Adulto", "mama-mi-heroina-adulto", "Libros de Familia", "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas", "mother", 40, FAMILY_TITLES, "mama-mi-heroina-micro-pilot", subject_f="Mamá", base_slug="mama-mi-heroina", adult_tagline="PARA LA MAMÁ QUE SOSTUVO MI VIDA"),
    BookConfig("abuelo", "Te Amo, Abuelo Adulto", "Te Amo, Abuelo Adulto", "te-amo-abuelo-adulto", "Libros de Familia", "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas", "grandfather", 40, FAMILY_TITLES, "te-amo-abuelo-micro-pilot", subject_m="Abuelo", base_slug="te-amo-abuelo", adult_tagline="PARA EL ABUELO QUE ME DEJÓ RAÍCES"),
    BookConfig("abuela", "Te Amo, Abuela Adulto", "Te Amo, Abuela Adulto", "te-amo-abuela-adulto", "Libros de Familia", "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas", "grandmother", 40, FAMILY_TITLES, "te-amo-abuela-micro-pilot", subject_f="Abuela", base_slug="te-amo-abuela", adult_tagline="PARA LA ABUELA QUE HIZO HOGAR"),
    BookConfig("equipo", "El Mejor Equipo Adulto", "El Mejor Equipo Adulto", "el-mejor-equipo-adulto", "Libros de Familia", "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas", "siblings_team", 20, TEAM_TITLES, "el-mejor-equipo-micro-pilot", base_slug="el-mejor-equipo", adult_tagline="PARA LOS HERMANOS QUE SIGUEN SIENDO EQUIPO"),
    BookConfig("familia", "Mi Familia Adulto", "Mi Familia Adulto", "la-familia-adulto", "Libros de Familia", "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas", "family_group", 20, FAMILY_GROUP_TITLES, "mi-familia-micro-pilot", base_slug="la-familia", adult_tagline="PARA LA FAMILIA QUE SIEMPRE VUELVE"),
    BookConfig("corazon-abuelo", "Siempre en mi Corazón Abuelo Adulto", "Siempre en mi Corazón Abuelo Adulto", "siempre-en-mi-corazon-abuelo-adulto", "Libros de Memorias Familiares", "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas", "memorial_grandfather", 20, MEMORIAL_TITLES, "siempre-en-mi-corazon-abuelo-micro-pilot", subject_m="Abuelo", base_slug="siempre-en-mi-corazon", adult_tagline="PARA RECORDAR AL ABUELO QUE SIGUE PRESENTE"),
    BookConfig("corazon-abuela", "Siempre en mi Corazón Abuela Adulto", "Siempre en mi Corazón Abuela Adulto", "siempre-en-mi-corazon-abuela-adulto", "Libros de Memorias Familiares", "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas", "memorial_grandmother", 20, MEMORIAL_TITLES, "siempre-en-mi-corazon-abuela-micro-pilot", subject_f="Abuela", base_slug="siempre-en-mi-corazon", adult_tagline="PARA RECORDAR A LA ABUELA QUE SIGUE PRESENTE"),
    BookConfig("angel-padre", "Mi Ángel Guardián Padre Adulto", "Mi Ángel Guardián Padre Adulto", "mi-angel-guardian-padre-adulto", "Libros de Memorias Familiares", "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas", "angel_father", 20, MEMORIAL_TITLES, "mi-angel-guardian-padre-micro-pilot", subject_m="Padre", base_slug="mi-angel-guardian", adult_tagline="PARA EL PADRE QUE AÚN CUIDA MI CAMINO"),
    BookConfig("angel-madre", "Mi Ángel Guardián Madre Adulto", "Mi Ángel Guardián Madre Adulto", "mi-angel-guardian-madre-adulto", "Libros de Memorias Familiares", "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas", "angel_mother", 20, MEMORIAL_TITLES, "mi-angel-guardian-madre-micro-pilot", subject_f="Madre", base_slug="mi-angel-guardian", adult_tagline="PARA LA MADRE QUE AÚN CUIDA MI CAMINO"),
    BookConfig("siempre-seras", "Siempre Serás Parte de Mí Adulto", "Siempre Serás Parte de Mí Adulto", "siempre-seras-parte-de-mi-adulto", "Libros de Memorias Familiares", "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas", "sibling_memory", 40, SIBLING_MEMORIAL_TITLES, "siempre-seras-parte-de-mi-micro-pilot", base_slug="siempre-seras-parte-de-mi", adult_tagline="PARA EL HERMANO QUE SIEMPRE SERÁ PARTE DE MÍ"),
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


def load_manifest() -> list[dict[str, Any]]:
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def save_manifest_entry(entry: dict[str, Any]) -> None:
    manifest = load_manifest()
    idx = {row["id"]: i for i, row in enumerate(manifest)}
    if entry["id"] in idx:
        manifest[idx[entry["id"]]] = entry
    else:
        manifest.append(entry)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


def cost_from_usage(usage: dict[str, Any] | None) -> float | None:
    if not usage:
        return None
    details = usage.get("input_tokens_details") or {}
    text_in = details.get("text_tokens") or usage.get("input_tokens") or 0
    out = usage.get("output_tokens") or 0
    p = PRICES[MODEL]
    return round(text_in / 1e6 * p["text_in"] + out / 1e6 * p["image_out"], 4)


def slugify(value: str) -> str:
    value = value.lower()
    for a, b in [("á", "a"), ("é", "e"), ("í", "i"), ("ó", "o"), ("ú", "u"), ("ñ", "n")]:
        value = value.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "_", value).strip("_")


def template_title(book: BookConfig, num: int) -> str:
    base = book.titles[(num - 1) % 20]
    if book.count == 40:
        if book.kind in {"mother", "grandmother"}:
            return f"{base} {'De Hijo a ' + book.subject_f if num <= 20 else 'De Hija a ' + book.subject_f}"
        if book.kind == "grandfather":
            return f"{base} {'De Nieto a Abuelo' if num <= 20 else 'De Nieta a Abuelo'}"
        if book.kind == "sibling_memory":
            return f"{base} {'Hermano' if num <= 20 else 'Hermana'}"
    return base


def gender_direction(book: BookConfig, num: int) -> str | None:
    if book.kind == "mother":
        return "HE_TO_SHE" if num <= 20 else "SHE_TO_SHE"
    if book.kind == "grandmother":
        return "HE_TO_SHE" if num <= 20 else "SHE_TO_SHE"
    if book.kind == "grandfather":
        return "HE_TO_HE" if num <= 20 else "SHE_TO_HE"
    if book.kind in {"memorial_grandfather", "angel_father"}:
        return "M"
    if book.kind in {"memorial_grandmother", "angel_mother"}:
        return "F"
    if book.kind == "sibling_memory":
        return "M" if num <= 20 else "F"
    return None


def filename(book: BookConfig, num: int) -> str:
    return f"Plantilla_{num:02d}_{slugify(template_title(book, num))}.webp"


def storage_key(book: BookConfig, num: int) -> str:
    return f"{book.storage_base}/{filename(book, num)}"


def local_path(book: BookConfig, num: int) -> Path:
    return OUTPUT / book.local_name / VERSION / filename(book, num)


def subject_phrase(book: BookConfig, num: int) -> tuple[str, str, str]:
    # returns visual subject, preview relationship, display apodo
    if book.kind == "mother":
        rel = "hijo adulto" if num <= 20 else "hija adulta"
        return "Mamá Elena y su " + rel + " con rostros visibles, como adultos compartiendo memoria y gratitud", rel, "Mamá"
    if book.kind == "grandfather":
        rel = "nieto adulto" if num <= 20 else "nieta adulta"
        return "Abuelo Arturo y su " + rel + " con rostros visibles, unidos por memoria, consejo y ternura", rel, "Abuelo"
    if book.kind == "grandmother":
        rel = "nieto adulto" if num <= 20 else "nieta adulta"
        return "Abuela Rosa y su " + rel + " con rostros visibles, unidos por memoria, cuidado y ternura", rel, "Abuela"
    if book.kind == "siblings_team":
        return "dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura", "hermanos adultos", "Equipo"
    if book.kind == "family_group":
        return "una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales", "familia adulta", "Familia"
    if book.kind == "memorial_grandfather":
        return "un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal", "nieto/a adulto/a", "Abuelo"
    if book.kind == "memorial_grandmother":
        return "un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal", "nieto/a adulto/a", "Abuela"
    if book.kind == "angel_father":
        return "un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo", "hijo/a adulto/a", "Papá"
    if book.kind == "angel_mother":
        return "un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo", "hijo/a adulto/a", "Mamá"
    if book.kind == "sibling_memory":
        rel = "hermano recordado" if num <= 20 else "hermana recordada"
        return "dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma", rel, "Hermano"
    return "personas adultas con rostros visibles", "adultos", "" 


def icon_rule(book: BookConfig) -> str:
    if book.kind.startswith("memorial") or book.kind.startswith("angel") or book.kind == "sibling_memory":
        return "Debajo del poema colocar una paloma lineal minimalista, pequeña y sobria. Prohibido usar casita, casa con corazón, halo, alas humanas o fantasma literal."
    return "Debajo del poema colocar un ornamento lineal minimalista coherente con el tema, pequeño y sobrio. No usar mascotas ni animales en libros que no sean de mascotas."


def poem_for(book: BookConfig, num: int) -> str:
    title = book.titles[(num - 1) % 20].lower()
    _, _, apodo = subject_phrase(book, num)
    if book.kind in {"mother", "grandfather", "grandmother"}:
        return "\n".join([
            f"Para {apodo}, guardo este lugar,",
            "donde tu voz me vuelve a acompañar.",
            "Lo que me diste no se queda atrás,",
            "camina conmigo cuando necesito paz.",
            "Hoy miro la vida con otra claridad,",
            "con tus consejos y tu forma de amar.",
            f"En {title}, vuelvo a comprender,",
            "que tu amor me enseñó a permanecer.",
        ])
    if book.kind == "siblings_team":
        return "\n".join([
            "Hay equipos que no firma el azar,",
            "se hacen con risas, peleas y lealtad.",
            "Si el mundo se pone difícil de leer,",
            "juntos encontramos qué hacer.",
            "Hermano, hermana, misma dirección,",
            "distintas maneras, un solo corazón.",
            "Y aunque cambie la vida alrededor,",
            "nuestro equipo conserva su valor.",
        ])
    if book.kind == "family_group":
        return "\n".join([
            "Familia es volver sin tener que explicar,",
            "un idioma propio para descansar.",
            "Somos mezcla de historias y verdad,",
            "raíces, camino y complicidad.",
            "Cada abrazo guarda una estación,",
            "cada mesa, una conversación.",
            "Y si el mundo nos quiere separar,",
            "nuestro amor sabe regresar.",
        ])
    # memorial
    if book.kind == "sibling_memory":
        return "\n".join([
            "Hermano, tu risa no aprende a partir,",
            "sigue en mis días queriendo vivir.",
            "No como sombra ni como final,",
            "sino en recuerdos de fuerza real.",
            "Vuelvo a encontrarte en cada canción,",
            "en nuestras bromas y en mi corazón.",
            "Aunque la vida cambió su color,",
            "sigues conmigo en forma de amor.",
        ])
    return "\n".join([
        f"Para {apodo}, en este lugar,",
        "tu luz tranquila vuelve a llegar.",
        "No como ausencia ni despedida,",
        "sino memoria que cuida la vida.",
        "Cada consejo, cada mirar,",
        "sigue enseñándome a caminar.",
        "Y bajo esta paloma de amor,",
        "tu recuerdo permanece en mi corazón.",
    ])


def generation_prompt(book: BookConfig, num: int) -> str:
    title = template_title(book, num)
    scene = SCENES[(num - 1) % len(SCENES)]
    subject, relationship, _ = subject_phrase(book, num)
    action = GROUP_ACTIONS[(num - 1) % len(GROUP_ACTIONS)]
    negatives = "no mascotas, no perros, no gatos, no aves, no animales" if book.kind != "pet" else ""
    memorial_tone = "" 
    if book.kind.startswith("memorial") or book.kind.startswith("angel") or book.kind == "sibling_memory":
        memorial_tone = "Ambas identidades humanas deben verse claramente. No usar fantasmas literales, religión kitsch, halos, alas humanas ni figuras de espaldas. "
    return f"""Crear una ilustración hiperrealista editorial para una DOBLE PÁGINA ABIERTA de libro personalizado adulto, formato horizontal 1600x944, vista frontal plana, a sangre completa, sin portada, sin mesa exterior, sin mockup, sin manos sosteniendo el libro.

[LIBRO]
{book.local_name}. Dirección adulta, sobria, cinematográfica, emocional y realista. No infantilizar.

[SUJETOS]
Mostrar {subject}. {memorial_tone}Rostros visibles en vista frontal o tres cuartos; prohibido mostrar protagonistas de espaldas o como siluetas anónimas.

[ESCENA]
La escena ocurre en {scene}; los protagonistas {action}. Composición con movimiento, profundidad y acción cotidiana; evitar personas rígidas sentadas alrededor de una mesa salvo que la escena lo justifique.

[DISEÑO EDITORIAL]
- Una única fotografía continua atraviesa el pliegue central como una sola imagen.
- Título grande en página izquierda: “{title.upper()}”.
- Poema en página derecha, tipografía Montserrat moderna, limpia, perfectamente legible y menor que el título.
- {icon_rule(book)}
- Separador fino bajo el título con ornamento geométrico pequeño.

[POEMA — TEXTO EXACTO]
{poem_for(book, num)}

[LUZ Y COLOR]
Paleta temática, no dorado fijo: alternar azul profundo, ámbar suave, verde frío, terracota, crema, madera, niebla y luz lateral según escena. Magia conceptual mínima: hilos de luz, partículas sutiles, reflejos o líneas poéticas integradas a la fotografía.

[NEGATIVOS]
No caricatura, no Pixar, no infantil, no bebés, no niños pequeños, no exceso de texto ilegible, no manos sosteniendo el libro, no portada, no mockup exterior, {negatives}.
"""


def db_fields(book: BookConfig, num: int) -> tuple[str, str, str, str, str, str]:
    title = template_title(book, num)
    scene = SCENES[(num - 1) % len(SCENES)]
    subject, _, _ = subject_phrase(book, num)
    scene_visual = f"Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar {subject}. La escena ocurre en {scene}. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas."
    if book.kind not in {"pet"}:
        scene_visual += " No incluir mascotas, perros, gatos, aves ni animales."
    background = f"Ambiente realista y adulto: {scene}. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural."
    magic = "Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema."
    if book.kind.startswith("memorial") or book.kind.startswith("angel") or book.kind == "sibling_memory":
        magic += " Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal."
    light = "Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil."
    pm = poem_for(book, num).replace("Mamá", "{APODO_DESTINATARIO}").replace("Papá", "{APODO_DESTINATARIO}").replace("Abuelo", "{APODO_DESTINATARIO}").replace("Abuela", "{APODO_DESTINATARIO}").replace("Hermano", "{APODO_DESTINATARIO}")
    if book.kind == "siblings_team":
        roles = [{"key": "hermanos", "count": 3}]
    elif book.kind == "family_group":
        roles = [{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]
    elif book.kind == "sibling_memory":
        roles = [{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]
    else:
        roles = [{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]
    return scene_visual, background, magic, light, pm, json.dumps(roles, ensure_ascii=False)


def ensure_prompt_invariants(book: BookConfig) -> None:
    rendered = "\n".join(generation_prompt(book, n).lower() for n in range(1, book.count + 1))
    failed = []
    if book.kind != "pet" and any(w in rendered for w in ["perro protagonista", "gato protagonista"]):
        failed.append("non-pet protagonist animal")
    if book.kind.startswith("memorial") or book.kind.startswith("angel") or book.kind == "sibling_memory":
        if rendered.count("paloma lineal minimalista") < book.count:
            failed.append("missing dove")
        if "casa con corazón" not in rendered:
            failed.append("missing house negative")
    if rendered.count("rostros visibles") < book.count:
        failed.append("visible faces")
    if failed:
        raise SystemExit(f"Prompt invariant failed for {book.key}: {failed}")


def generate_image(book: BookConfig, num: int, key: str) -> float | None:
    prompt = generation_prompt(book, num)
    body = json.dumps({"model": MODEL, "prompt": prompt, "size": SIZE, "quality": QUALITY, "moderation": MODERATION, "n": 1}).encode("utf-8")
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body, method="POST", headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=420) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    raw = base64.b64decode(data["data"][0]["b64_json"])
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    if im.size != (1600, 944):
        raise RuntimeError(f"Unexpected size {im.size}")
    dest = local_path(book, num)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=95, method=6)
    return cost_from_usage(data.get("usage"))


def upload_book(book: BookConfig) -> None:
    env = PROJECT / ".env.docker"
    access = read_env_value(env, "MINIO_ACCESS_KEY")
    secret = read_env_value(env, "MINIO_SECRET_KEY")
    bucket = read_env_value(env, "MINIO_BUCKET") or "pixelart-assets"
    if not access or not secret:
        raise SystemExit("Missing MinIO credentials")
    subprocess.run(["mc", "alias", "set", "pixelart-local", "http://localhost:9000", access, secret], check=True, stdout=subprocess.DEVNULL)
    for num in range(1, book.count + 1):
        subprocess.run(["mc", "cp", "--attr", "Content-Type=image/webp", str(local_path(book, num)), f"pixelart-local/{bucket}/{storage_key(book, num)}"], check=True, stdout=subprocess.DEVNULL)


def sql_quote(value: str) -> str:
    return "$q$" + value.replace("$q$", "$ q $") + "$q$"


def sync_db(book: BookConfig) -> None:
    rows = []
    for num in range(1, book.count + 1):
        scene, bg, magic, light, pm, roles = db_fields(book, num)
        gd = gender_direction(book, num)
        rows.append("(" + ", ".join([
            sql_quote(storage_key(book, num)),
            sql_quote(template_title(book, num)),
            "NULL" if gd is None else sql_quote(gd),
            sql_quote(scene), sql_quote(bg), sql_quote(magic), sql_quote(light), sql_quote(pm), sql_quote(roles)
        ]) + ")")
    sql = f"""
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = {sql_quote(book.category)}),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, {sql_quote(book.db_name)}, {sql_quote(book.slug)}, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name={sql_quote(book.db_name)} AND slug={sql_quote(book.slug)} LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT {sql_quote(book.db_name)}, 'CUSTOM_BOOK', {sql_quote('Versión adulta de ' + book.db_name + ' para el catálogo PixelArt.')}, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name={sql_quote(book.db_name)})
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name={sql_quote(book.db_name)} LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name={sql_quote(book.db_name)} LIMIT 1)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_GRUESA', 15000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

CREATE TEMP TABLE tmp_adult_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender_direction VARCHAR(20),
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;
INSERT INTO tmp_adult_templates VALUES
{",\n".join(rows)};

WITH model_row AS (SELECT id FROM personalized_models WHERE name={sql_quote(book.db_name)} AND slug={sql_quote(book.slug)} LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug={sql_quote(book.slug)}
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
"""
    out_dir = ADULT_DIR / book.review_package
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"backfill-{book.slug}-local.sql").write_text(sql, encoding="utf-8")
    subprocess.run(["docker", "exec", "-i", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart"], input=sql.encode("utf-8"), check=True, stdout=subprocess.DEVNULL)


def create_contact_sheet(book: BookConfig) -> None:
    cells = []
    for num in range(1, book.count + 1):
        im = Image.open(local_path(book, num)).convert("RGB")
        th = ImageOps.contain(im, (380, 224), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (400, 280), "white")
        canvas.paste(th, ((400 - th.width) // 2, 28))
        d = ImageDraw.Draw(canvas)
        d.text((10, 8), f"{num:02d} {template_title(book, num)[:40]}", fill=(0, 0, 0))
        cells.append(canvas)
    cols = 4
    rows = (book.count + cols - 1) // cols
    out = Image.new("RGB", (cols * 400, rows * 280), "white")
    for i, cell in enumerate(cells):
        out.paste(cell, ((i % cols) * 400, (i // cols) * 280))
    review = ADULT_DIR / book.review_package / "review-assets"
    review.mkdir(parents=True, exist_ok=True)
    out.save(review / "contact-sheet-full-adult.jpg", quality=92)


def run_book(book: BookConfig, key: str) -> dict[str, Any]:
    ensure_prompt_invariants(book)
    generated = skipped = failed = 0
    cost = 0.0
    for num in range(1, book.count + 1):
        entry = {
            "id": f"adult-{book.slug}-full-{num:02d}",
            "libro": book.local_name,
            "version": VERSION,
            "num": num,
            "titulo": template_title(book, num),
            "source": f"adult-books/{book.review_package}/full-generation",
            "filename": filename(book, num),
            "storage_key": storage_key(book, num),
            "prompt": generation_prompt(book, num),
            "status": "pending",
            "file": None,
            "cost_usd": None,
            "generated_at": None,
            "format": "webp",
        }
        if local_path(book, num).exists():
            skipped += 1
            entry.update(status="done", file=str(local_path(book, num).relative_to(ROOT)), cost_usd=0.0, generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"), reused_existing=True)
            save_manifest_entry(entry)
            continue
        try:
            c = generate_image(book, num, key)
            generated += 1
            if c:
                cost += c
            entry.update(status="done", file=str(local_path(book, num).relative_to(ROOT)), cost_usd=c, generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"), attempts=1, width=1600, height=944)
            save_manifest_entry(entry)
            if generated % 5 == 0 or num == book.count:
                print(f"  {book.key}: generated {generated} skipped {skipped} cost=${cost:.4f}", flush=True)
        except Exception as exc:
            failed += 1
            entry.update(status="failed", error=f"{type(exc).__name__}: {exc}")
            save_manifest_entry(entry)
            raise
    upload_book(book)
    sync_db(book)
    create_contact_sheet(book)
    return {"book": book.local_name, "slug": book.slug, "generated": generated, "skipped": skipped, "failed": failed, "cost": round(cost, 4), "count": book.count}


def main() -> None:
    selected = set(sys_arg for sys_arg in os.sys.argv[1:] if sys_arg)
    books = [b for b in BOOKS if not selected or b.key in selected or b.slug in selected]
    key = load_openai_key()
    results = []
    total = 0.0
    for book in books:
        print(f"\n=== {book.local_name} ({book.count}) ===", flush=True)
        result = run_book(book, key)
        total += result["cost"]
        results.append(result)
        print(json.dumps(result, ensure_ascii=False), flush=True)
    print("\nSUMMARY")
    print(json.dumps({"books": results, "total_cost": round(total, 4)}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
