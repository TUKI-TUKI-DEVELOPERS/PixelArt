#!/usr/bin/env python3
"""Generate and publish adult custom-book web assets.

Creates adult-specific thumbnails, detail backgrounds and carousel images for the
approved adult books, leaving Papa adult untouched because its web assets were
handled separately.
"""
from __future__ import annotations

import base64
import hashlib
import io
import json
import os
import re
import subprocess
import sys
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parent
OUTPUT = ROOT / "output"
ADULT_DIR = ROOT / "adult-books"
MANIFEST = ROOT / "manifest.json"
MODEL = "gpt-image-2"
QUALITY = "medium"
MODERATION = "auto"
VERSION = "adult-web-assets"
PRICES = {"gpt-image-2": {"text_in": 5.00, "image_out": 30.00}}


@dataclass(frozen=True)
class BookAssets:
    key: str
    name: str
    slug: str
    model_name: str
    category: str
    family: str
    local_dir: str
    storage_dir: str
    mini_key: str
    mini_home_key: str
    background_key: str
    central_keys: tuple[str, str, str]
    theme: str
    subject: str
    palette: str
    no_animals: bool = True
    memorial: bool = False
    pet: bool = False


BOOKS: list[BookAssets] = [
    BookAssets(
        "mama", "Mamá, Mi Heroína Adulto", "mama-mi-heroina-adulto", "Mamá, Mi Heroína Adulto", "Libros de Familia", "familia",
        "Mamá, Mi Heroína Adulto Assets", "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Mama_mi_heroina_Adulto.webp",
        (
            "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central.webp",
            "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central_2.webp",
            "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Libros_Familia_MamamiHeroina_Adulto_Central_3.webp",
        ),
        "gratitud madura, cuidado, calma y memoria compartida", "una mamá adulta y su hijo o hija adulta en una relación cálida y madura", "ámbar suave, crema, verde oliva y luz de tarde",
    ),
    BookAssets(
        "abuelo", "Te Amo, Abuelo Adulto", "te-amo-abuelo-adulto", "Te Amo, Abuelo Adulto", "Libros de Familia", "familia",
        "Te Amo, Abuelo Adulto Assets", "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuelo_Adulto.webp",
        (
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central.webp",
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central_2.webp",
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Libros_Familia_TeAmoAbuelo_Adulto_Central_3.webp",
        ),
        "legado, consejos, raíces y ternura adulta", "un abuelo y un nieto o nieta adulta conversando, caminando o revisando recuerdos", "azul petróleo, cuero, dorado bajo y niebla cálida",
    ),
    BookAssets(
        "abuela", "Te Amo, Abuela Adulto", "te-amo-abuela-adulto", "Te Amo, Abuela Adulto", "Libros de Familia", "familia",
        "Te Amo, Abuela Adulto Assets", "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Familia_Te_amo_abuela_Adulto.webp",
        (
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central.webp",
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central_2.webp",
            "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Libros_Familia_TeAmoAbuela_Adulto_Central_3.webp",
        ),
        "hogar, ternura, cocina emocional y memoria luminosa", "una abuela y un nieto o nieta adulta en escenas de hogar, jardín o paseo", "rosa viejo, crema, verde salvia y luz dorada discreta",
    ),
    BookAssets(
        "equipo", "El Mejor Equipo Adulto", "el-mejor-equipo-adulto", "El Mejor Equipo Adulto", "Libros de Familia", "familia",
        "El Mejor Equipo Adulto Assets", "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Familia_El_mejor_equipo_Adulto.webp",
        (
            "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central.webp",
            "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central_2.webp",
            "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Libros_Familia_ElMejorEquipo_Adulto_Central_3.webp",
        ),
        "hermanos adultos, complicidad, bromas, lealtad y equipo", "dos o tres hermanos adultos con energía de equipo y rostros visibles", "azul noche, cobre, verde oscuro y luz urbana",
    ),
    BookAssets(
        "familia", "Mi Familia Adulto", "la-familia-adulto", "Mi Familia Adulto", "Libros de Familia", "familia",
        "Mi Familia Adulto Assets", "IA_Books/Family_Books_Page/Libros/La_familia_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Familia_La_Familia_Adulto.webp",
        (
            "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central.webp",
            "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central_2.webp",
            "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Libros_Familia_MiFamilia_Adulto_Central_3.webp",
        ),
        "familia adulta, pertenencia, mesa amplia, generaciones y regreso", "una familia adulta multigeneracional, natural, caminando o compartiendo recuerdos", "terracota, crema, verde bosque y luz de sobremesa",
    ),
    BookAssets(
        "aventura", "Aventura Entre Patas Adulto", "aventura-entre-patas-adulto", "Aventura Entre Patas Adulto", "Libros de Mascotas", "mascotas",
        "Aventura Entre Patas Adulto Assets", "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Mascotas_Aventuras_Entre_Patas_Adulto.webp",
        (
            "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central.webp",
            "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central_2.webp",
            "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Libros_Mascotas_AventuraEntrePatas_Adulto_Central_3.webp",
        ),
        "aventura cotidiana con perro protagonista, ternura adulta y humor de mascota", "Rocky, perro mediano dorado protagonista, con uno, dos o tres adultos", "verde bosque, arena, azul cielo y luz de aventura", no_animals=False, pet=True,
    ),
    BookAssets(
        "corazon-abuelo", "Siempre en mi Corazón Abuelo Adulto", "siempre-en-mi-corazon-abuelo-adulto", "Siempre en mi Corazón Abuelo Adulto", "Libros de Memorias Familiares", "memorial",
        "Siempre en mi Corazón Abuelo Adulto Assets", "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon_abuelo_Adulto.webp",
        (
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central_2.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuelo_Adulto_Central_3.webp",
        ),
        "recuerdo luminoso de abuelo, presencia y memoria sanadora", "un adulto recordando a su abuelo mediante álbumes, cartas, luz y una paloma lineal mínima", "azul gris, crema, dorado pálido y blanco suave", memorial=True,
    ),
    BookAssets(
        "corazon-abuela", "Siempre en mi Corazón Abuela Adulto", "siempre-en-mi-corazon-abuela-adulto", "Siempre en mi Corazón Abuela Adulto", "Libros de Memorias Familiares", "memorial",
        "Siempre en mi Corazón Abuela Adulto Assets", "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_en_mi_corazon_abuela_Adulto.webp",
        (
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central_2.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Libros_Memoria_Familiar_SiempreEnMiCorazonAbuela_Adulto_Central_3.webp",
        ),
        "recuerdo luminoso de abuela, ternura y memoria sanadora", "un adulto recordando a su abuela mediante álbumes, flores, luz y una paloma lineal mínima", "malva, crema, verde salvia, dorado pálido y blanco suave", memorial=True,
    ),
    BookAssets(
        "angel-padre", "Mi Ángel Guardián Padre Adulto", "mi-angel-guardian-padre-adulto", "Mi Ángel Guardián Padre Adulto", "Libros de Memorias Familiares", "memorial",
        "Mi Ángel Guardián Padre Adulto Assets", "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian_padre_Adulto.webp",
        (
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central.webp",
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central_2.webp",
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Libros_Memoria_Familiar_MiAngelGuardianPadre_Adulto_Central_3.webp",
        ),
        "padre como guía protectora, ruta, brújula y cuidado sobrio", "un adulto guiado por la memoria de su padre mediante rutas, cartas, mapas y una paloma lineal mínima", "azul noche, bronce, niebla fría y luz protectora", memorial=True,
    ),
    BookAssets(
        "angel-madre", "Mi Ángel Guardián Madre Adulto", "mi-angel-guardian-madre-adulto", "Mi Ángel Guardián Madre Adulto", "Libros de Memorias Familiares", "memorial",
        "Mi Ángel Guardián Madre Adulto Assets", "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Mi_angel_guardian_madre_Adulto.webp",
        (
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central.webp",
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central_2.webp",
            "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Libros_Memoria_Familiar_MiAngelGuardianMadre_Adulto_Central_3.webp",
        ),
        "madre como refugio protector, voz, umbral y cuidado luminoso", "un adulto guiado por la memoria de su madre mediante luz, cartas, jardín y una paloma lineal mínima", "marfil, rosa viejo, verde salvia y luz protectora", memorial=True,
    ),
    BookAssets(
        "siempre-seras", "Siempre Serás Parte de Mí Adulto", "siempre-seras-parte-de-mi-adulto", "Siempre Serás Parte de Mí Adulto", "Libros de Memorias Familiares", "memorial",
        "Siempre Serás Parte de Mí Adulto Assets", "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp",
        "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura_Home.webp",
        "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Siempre_seras_parte_de_mi_Adulto.webp",
        (
            "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central_2.webp",
            "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Libros_Memoria_Familiar_SiempreSerasParteDeMi_Adulto_Central_3.webp",
        ),
        "hermanos, complicidad, memoria viva y presencia interior", "dos hermanos adultos visibles en una escena compartida de memoria, sin retrato escondido", "azul petróleo, cobre, verde profundo y luz cálida", memorial=True,
    ),
]


def read_env_value(path: Path, key: str) -> str | None:
    if not path.exists():
        return None
    for raw in path.read_text(encoding="utf-8").splitlines():
        if raw.startswith(f"{key}="):
            return raw.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def load_openai_key() -> str:
    value = read_env_value(ROOT / ".env", "OPENAI_API_KEY") or read_env_value(PROJECT / ".env.docker", "OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not value or "PEGA-TU-KEY" in value:
        raise SystemExit("OPENAI_API_KEY no configurada")
    return value


def cost_from_usage(usage: dict[str, Any] | None) -> float | None:
    if not usage:
        return None
    details = usage.get("input_tokens_details") or {}
    text_in = details.get("text_tokens") or usage.get("input_tokens") or 0
    out = usage.get("output_tokens") or 0
    p = PRICES[MODEL]
    return round(text_in / 1e6 * p["text_in"] + out / 1e6 * p["image_out"], 4)


def generate_image(prompt: str, size: str, dest: Path, key: str) -> float | None:
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": size,
        "quality": QUALITY,
        "moderation": MODERATION,
        "n": 1,
    }).encode("utf-8")
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
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=95, method=6)
    return cost_from_usage(data.get("usage"))


def local_web_dir(book: BookAssets) -> Path:
    return OUTPUT / book.local_dir / "web-assets"


def local_name_from_storage(key: str) -> str:
    return Path(key).name


def local_path(book: BookAssets, storage_key: str) -> Path:
    return local_web_dir(book) / local_name_from_storage(storage_key)


def raw_mockup_path(book: BookAssets) -> Path:
    return local_web_dir(book) / f"raw_{book.key}_book_mockup.webp"


def prompt_common(book: BookAssets) -> str:
    rules = [
        "Premium editorial web asset for PixelArt personalized books in Peru.",
        "Mature adult emotional tone, modern, cinematic, polished, not childish.",
        "No brand logos, no watermark, no UI, no random extra text.",
        "Avoid cheap stock-photo look; use natural faces, realistic hands, refined color grading.",
    ]
    if book.no_animals:
        rules.append("Do not include pets, dogs, cats, birds or animals of any kind.")
    if book.memorial:
        rules.append("Memorial tone must be hopeful and luminous, not funerary, not dark, no halo, no human wings.")
        rules.append("Do not show the deceased person as a transparent apparition, floating face, face in the sky, ghostly overlay, spirit silhouette or supernatural body.")
        rules.append("If the deceased is referenced, show them only through a framed photograph, album print, letter, engraved object, or clear non-transparent portrait/artwork physically placed in the scene.")
        rules.append("A minimal line dove motif is allowed as a small design symbol only; it must not become wings or a ghost.")
    if book.pet:
        rules.append("The dog must be explicit: Rocky is a medium golden dog, emotionally central and recognizable; humans are adults only, 1 to 3 visible humans maximum.")
    return "\n".join(rules)


PIXELART_THUMBNAIL_TITLES = {
    "abuelo": "Te amo, abuelo",
    "abuela": "Te amo, abuela",
    "mama": "Mamá, mi heroína",
    "equipo": "El mejor equipo",
    "familia": "Mi familia",
    "aventura": "Aventura entre patas",
}


def thumbnail_title(book: BookAssets) -> str:
    return PIXELART_THUMBNAIL_TITLES.get(book.key, re.sub(r"\s+Adulto$", "", book.name, flags=re.IGNORECASE))


def thumbnail_prompt(book: BookAssets) -> str:
    title = thumbnail_title(book)
    return f"""
{prompt_common(book)}

Create ONE catalog thumbnail for the adult product "{book.name}" following the PixelArt thumbnail contract.

NON-NEGOTIABLE PRODUCT MOCKUP CONTRACT:
- This is a 3D hard-cover PRODUCT MOCKUP, not cover art and not a vertical editorial novel.
- Closed landscape book, physical 29x21 proportion, clearly wider than tall.
- Almost frontal view, matching the existing PixelArt child thumbnails: the cover faces the viewer with only a very mild backward recline, about 3 to 6 degrees.
- The lower edge is slightly closer to the camera; the top edge only recedes subtly. Do not make the book stand upright, and do not make it lie flat.
- Thin left spine visible, thin lower edge visible, soft contact shadow only.
- The book fills almost the full thumbnail width, similar to the approved Papa adult thumbnail; no tiny product floating in a large white field.
- Pure white studio background outside the book; no table, hands, props, scenery or extra decoration outside the book.

COVER PRINT:
- Print the title exactly as "{title}".
- Never print the word "Adulto" on the cover; the UI owns the version label.
- Optional small personalized names at the bottom are allowed if they support the product mockup.
- Cover art concept: {book.theme}. Main subject: {book.subject}. Palette: {book.palette}.

CROP / POSTPROCESS REQUIREMENT:
- The final asset must crop to the physical book, not to the generated background or shadow.
- Reject circular/elliptical halos, side haze and orphan shadows below the book.
- Before scaling beyond a pilot, compare against the child thumbnail and the approved Papa adult thumbnail on an actual category card.
""".strip()


def background_prompt(book: BookAssets) -> str:
    return f"""
{prompt_common(book)}

Create a wide website hero background for "{book.name}".
No book mockup, no text. Cinematic atmospheric scene only.
Concept: {book.theme}. Main subject direction: {book.subject}. Palette: {book.palette}.
Leave soft negative space near the center-left for web copy overlays, with gentle depth of field and premium editorial lighting.
Aspect ratio 1600x944. Full-bleed image, no borders.
""".strip()


def central_prompt(book: BookAssets, index: int) -> str:
    scene = [
        "a refined editorial scene with the protagonists in motion, not seated stiffly, with a symbolic object in the foreground",
        "a warm close human moment with visible faces, layered depth and subtle magical light trails integrated naturally",
        "a wider cinematic scene with environment, horizon or architecture, showing the emotional world of the book",
    ][index - 1]
    return f"""
{prompt_common(book)}

Create a detail-page carousel image for "{book.name}".
No UI, no book mockup, no readable text. Full-bleed cinematic illustration/photo-real editorial artwork.
Scene direction: {scene}.
Concept: {book.theme}. Main subject: {book.subject}. Palette: {book.palette}.
Use mature composition, movement, visible frontal or three-quarter faces where humans appear, and strong premium visual hierarchy.
Aspect ratio 1536x1024.
""".strip()


def find_non_white_bbox(image: Image.Image, threshold: int = 248):
    rgb = image.convert("RGB")
    bg = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg).convert("L")
    mask = diff.point(lambda px: 255 if px > (255 - threshold) else 0)
    return mask.getbbox()


def crop_and_fit(input_path: Path, output_path: Path, canvas: tuple[int, int], padding_ratio: float) -> None:
    image = Image.open(input_path).convert("RGBA")
    bbox = find_non_white_bbox(image)
    if not bbox:
        bbox = (0, 0, image.width, image.height)
    cropped = image.crop(bbox)
    canvas_w, canvas_h = canvas
    pad = int(min(canvas_w, canvas_h) * padding_ratio)
    max_w = canvas_w - pad * 2
    max_h = canvas_h - pad * 2
    scale = min(max_w / cropped.width, max_h / cropped.height)
    fitted = cropped.resize((max(1, round(cropped.width * scale)), max(1, round(cropped.height * scale))), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", canvas, (255, 255, 255, 0))
    out.alpha_composite(fitted, ((canvas_w - fitted.width) // 2, (canvas_h - fitted.height) // 2))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    out.save(output_path, "WEBP", quality=95, method=6)


def create_home_thumbnail_from_catalog(input_path: Path, output_path: Path) -> None:
    """Create the Home-card thumbnail from the approved catalog mockup.

    PixelArt Home thumbnails are the same product mockup language as catalog
    thumbnails, but placed on a vertical 1190x1322 canvas and rotated about
    6 degrees counterclockwise so the right side sits higher. This deterministic
    postprocess preserves the approved cover/people/text instead of asking the
    image model to reinterpret the book.
    """
    image = Image.open(input_path).convert("RGBA")
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        bbox = (0, 0, image.width, image.height)
    book = image.crop(bbox)

    # Generated mockups often carry a thick dark rim/shadow under the book.
    # Trim a tiny strip before rotation; the Home view adds its own soft shadow.
    if book.height > 20:
        book = book.crop((0, 0, book.width, book.height - 10))

    rotated = book.rotate(6.0, expand=True, resample=Image.Resampling.BICUBIC)
    rot_px = rotated.load()
    for y in range(rotated.height):
        for x in range(rotated.width):
            r, g, b, a = rot_px[x, y]
            if a < 5:
                rot_px[x, y] = (255, 255, 255, 0)

    canvas = (1190, 1322)
    target_width = 1112
    scale = target_width / rotated.width
    fitted = rotated.resize((target_width, max(1, round(rotated.height * scale))), Image.Resampling.LANCZOS)
    x = (canvas[0] - fitted.width) // 2
    y = 207

    alpha = fitted.getchannel("A")
    shadow_alpha = Image.new("L", fitted.size, 0)
    for yy in range(fitted.height):
        base = 0.10 if yy < fitted.height * 0.72 else 0.18
        for xx in range(fitted.width):
            a = alpha.getpixel((xx, yy))
            if a:
                shadow_alpha.putpixel((xx, yy), min(55, int(a * base)))
    shadow = Image.new("RGBA", fitted.size, (0, 0, 0, 0))
    shadow.putalpha(shadow_alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))

    out = Image.new("RGBA", canvas, (255, 255, 255, 0))
    out.alpha_composite(shadow, (x + 2, y + 14))
    out.alpha_composite(fitted, (x, y))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    out.save(output_path, "WEBP", quality=95, method=6)


def save_manifest_entry(entry: dict[str, Any]) -> None:
    data: list[dict[str, Any]] = []
    if MANIFEST.exists():
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    data.append(entry)
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def minio_env() -> tuple[str, str, str]:
    access = read_env_value(PROJECT / ".env.docker", "MINIO_ACCESS_KEY")
    secret = read_env_value(PROJECT / ".env.docker", "MINIO_SECRET_KEY")
    bucket = read_env_value(PROJECT / ".env.docker", "MINIO_BUCKET") or "pixelart-assets"
    if not access or not secret:
        raise SystemExit("MinIO credentials missing in .env.docker")
    return access, secret, bucket


def upload_file(local: Path, storage_key: str) -> None:
    access, secret, bucket = minio_env()
    subprocess.run(["mc", "alias", "set", "pixelart-local", "http://localhost:9000", access, secret], check=True, stdout=subprocess.DEVNULL)
    subprocess.run(["mc", "cp", str(local), f"pixelart-local/{bucket}/{storage_key}"], check=True, stdout=subprocess.DEVNULL)


def psql(sql: str) -> str:
    return subprocess.check_output(["docker", "exec", "-i", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart", "-Atc", sql], text=True)


def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sync_cover_asset(book: BookAssets) -> None:
    content_hash = hashlib.sha256(book.mini_key.encode("utf-8")).hexdigest()
    sql = f"""
INSERT INTO assets (storage_key, original_filename, mime_type, content_hash)
VALUES ({sql_quote(book.mini_key)}, {sql_quote(book.mini_key)}, 'image/webp', {sql_quote(content_hash)})
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = {sql_quote(book.model_name)} AND a.storage_key = {sql_quote(book.mini_key)};

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = {sql_quote(book.model_name)} AND a.storage_key = {sql_quote(book.mini_key)};
"""
    psql(sql)


def generate_book(book: BookAssets, key: str) -> dict[str, Any]:
    print(f"\n=== {book.name} ===", flush=True)
    total_cost = 0.0
    generated = skipped = failed = 0

    tasks = [
        ("background", book.background_key, "1600x944", background_prompt(book)),
        ("central-1", book.central_keys[0], "1536x1024", central_prompt(book, 1)),
        ("central-2", book.central_keys[1], "1536x1024", central_prompt(book, 2)),
        ("central-3", book.central_keys[2], "1536x1024", central_prompt(book, 3)),
    ]

    raw = raw_mockup_path(book)
    if raw.exists():
        skipped += 1
        print(f"  skip raw thumbnail mockup", flush=True)
    else:
        try:
            c = generate_image(thumbnail_prompt(book), "1600x1200", raw, key)
            total_cost += c or 0.0
            generated += 1
            save_manifest_entry({"book": book.name, "slug": book.slug, "asset_type": "thumbnail-raw", "version": VERSION, "status": "done", "file": str(raw.relative_to(ROOT)), "cost_usd": c, "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "format": "webp", "width": 1600, "height": 1200})
            print(f"  generated raw thumbnail cost=${c or 0:.4f}", flush=True)
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"  FAIL raw thumbnail: {exc}", flush=True)

    # Derive catalog first, then derive the Home view from that approved
    # catalog mockup. The Home asset is not a fresh reinterpretation; it is
    # the same physical book rotated into the homepage pose.
    if raw.exists():
        mini = local_path(book, book.mini_key)
        mini_home = local_path(book, book.mini_home_key)
        if not mini.exists():
            crop_and_fit(raw, mini, (1310, 926), 0.03)
        if not mini_home.exists():
            create_home_thumbnail_from_catalog(mini, mini_home)
        upload_file(mini, book.mini_key)
        upload_file(mini_home, book.mini_home_key)
        sync_cover_asset(book)

    for asset_type, storage_key, size, prompt in tasks:
        dest = local_path(book, storage_key)
        if dest.exists():
            skipped += 1
            upload_file(dest, storage_key)
            print(f"  skip/upload {asset_type}", flush=True)
            continue
        try:
            c = generate_image(prompt, size, dest, key)
            total_cost += c or 0.0
            generated += 1
            upload_file(dest, storage_key)
            save_manifest_entry({"book": book.name, "slug": book.slug, "asset_type": asset_type, "storage_key": storage_key, "version": VERSION, "status": "done", "file": str(dest.relative_to(ROOT)), "cost_usd": c, "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "format": "webp", "size": size})
            print(f"  generated/uploaded {asset_type} cost=${c or 0:.4f}", flush=True)
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"  FAIL {asset_type}: {exc}", flush=True)

    create_contact_sheet(book)
    return {"book": book.name, "slug": book.slug, "generated": generated, "skipped": skipped, "failed": failed, "cost": round(total_cost, 4)}


def create_contact_sheet(book: BookAssets) -> None:
    files = [local_path(book, book.mini_key), local_path(book, book.mini_home_key), local_path(book, book.background_key), *[local_path(book, k) for k in book.central_keys]]
    existing = [p for p in files if p.exists()]
    if not existing:
        return
    thumbs: list[Image.Image] = []
    labels: list[str] = []
    for p in existing:
        im = Image.open(p).convert("RGB")
        im.thumbnail((320, 220), Image.Resampling.LANCZOS)
        tile = Image.new("RGB", (340, 260), "white")
        tile.paste(im, ((340 - im.width) // 2, 28 + (220 - im.height) // 2))
        d = ImageDraw.Draw(tile)
        d.text((10, 8), p.name[:45], fill=(20, 20, 20))
        thumbs.append(tile)
    cols = 3
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 340, rows * 260), "white")
    for idx, tile in enumerate(thumbs):
        sheet.paste(tile, ((idx % cols) * 340, (idx // cols) * 260))
    out = ADULT_DIR / re.sub(r"[^a-z0-9]+", "-", book.slug.lower()).strip("-") / "review-assets" / "web-assets-contact-sheet.jpg"
    # Keep contact sheets near existing package folders when possible.
    package_map = {
        "mama": "mama-mi-heroina-micro-pilot",
        "abuelo": "te-amo-abuelo-micro-pilot",
        "abuela": "te-amo-abuela-micro-pilot",
        "equipo": "el-mejor-equipo-micro-pilot",
        "familia": "mi-familia-micro-pilot",
        "aventura": "aventuras-entre-patas-micro-pilot",
        "corazon-abuelo": "siempre-en-mi-corazon-abuelo-micro-pilot",
        "corazon-abuela": "siempre-en-mi-corazon-abuela-micro-pilot",
        "angel-padre": "mi-angel-guardian-padre-micro-pilot",
        "angel-madre": "mi-angel-guardian-madre-micro-pilot",
        "siempre-seras": "siempre-seras-parte-de-mi-micro-pilot",
    }
    out = ADULT_DIR / package_map[book.key] / "review-assets" / "web-assets-contact-sheet.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, quality=92)


def main() -> None:
    selected = set(sys.argv[1:])
    books = [b for b in BOOKS if not selected or b.key in selected or b.slug in selected]
    key = load_openai_key()
    results = []
    total = 0.0
    for book in books:
        result = generate_book(book, key)
        results.append(result)
        total += result["cost"]
        print(json.dumps(result, ensure_ascii=False), flush=True)
    print("\nSUMMARY")
    print(json.dumps({"books": results, "total_cost": round(total, 4)}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
