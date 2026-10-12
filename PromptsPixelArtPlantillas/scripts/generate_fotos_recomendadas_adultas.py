"""Retratos de ejemplo para la guía "Así deben verse tus fotos" de los libros adultos.

Los libros adultos mostraban la guía del libro infantil, así que el dedicante salía
como un niño de ocho años cuando en el libro adulto tiene treinta y dos. Estos son
los retratos adultos equivalentes, con el mismo tratamiento que los existentes:
1024×1280, fondo gris liso de estudio, torso y cara, luz suave frontal.

    python3 generate_fotos_recomendadas_adultas.py --dry-run
    python3 generate_fotos_recomendadas_adultas.py
"""

from __future__ import annotations

import argparse
import base64
import importlib.util
import sys
from pathlib import Path

from openai import OpenAI

ROOT = Path(__file__).resolve().parent.parent
SALIDA = ROOT / "output" / "_FotosRecomendadas_Adultas"
TAMANO = "1024x1280"

spec = importlib.util.spec_from_file_location(
    "base", ROOT / "scripts" / "generate_papa_adult_demo_v10_open_book_first_10.py")
mech = importlib.util.module_from_spec(spec)
sys.modules["base"] = mech
spec.loader.exec_module(mech)

ESTILO = (
    "Studio reference headshot, waist-up, facing the camera straight on, photorealistic, "
    "seamless plain light grey studio background with no props and no furniture, soft even "
    "frontal lighting with no harsh shadows, calm natural warm smile, eyes looking at the "
    "camera, simple plain everyday clothing in muted colours. No text, no logo, no watermark, "
    "no border, no second person, no pet, no illustration or cartoon style."
)

RETRATOS = {
    "papa-58": "A fictional Peruvian-Latin man of 58 with short silver hair and a trimmed grey beard",
    "mama-58": "A fictional Peruvian-Latin woman of 58 with dark shoulder-length hair streaked with silver",
    "abuelo-75": "A fictional Peruvian-Latin man of 75 with full white hair and deep warm wrinkles",
    "abuela-75": "A fictional Peruvian-Latin woman of 75 with white hair worn up in a bun",
    "hijo-adulto-32": "A fictional Peruvian-Latin man of 32 with short dark hair and light stubble",
    "hija-adulta-30": "A fictional Peruvian-Latin woman of 30 with long dark wavy hair",
    "hermano-adulto-32": "A fictional Peruvian-Latin man of 32 with wavy dark hair, clean shaven",
    "hermana-adulta-30": "A fictional Peruvian-Latin woman of 30 with dark hair tied back",
}


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()

    SALIDA.mkdir(parents=True, exist_ok=True)
    pendientes = {k: v for k, v in RETRATOS.items() if not (SALIDA / f"{k}.png").exists()}
    print(f"retratos : {len(RETRATOS)}  pendientes: {len(pendientes)}")
    if args.dry_run:
        for k, v in pendientes.items():
            print(f"  READY {k}: {v[:70]}…")
        return

    client = OpenAI(api_key=mech.base.load_api_key())
    hechos = fallidos = 0
    for nombre, sujeto in pendientes.items():
        try:
            r = client.images.generate(
                model="gpt-image-2", prompt=f"{sujeto}. {ESTILO}",
                size=TAMANO, quality="medium", output_format="png", n=1)
            (SALIDA / f"{nombre}.png").write_bytes(base64.b64decode(r.data[0].b64_json))
            coste = mech.base.cost_from_usage(r.usage.model_dump() if r.usage else None)
            print(f"OK   {nombre}  ${coste or 0:.4f}")
            hechos += 1
        except Exception as exc:  # noqa: BLE001 - el SDK lanza varios tipos
            print(f"FALLÓ {nombre}: {type(exc).__name__} {str(exc)[:120]}")
            fallidos += 1
    print(f"\ngenerados {hechos}  fallidos {fallidos}")


if __name__ == "__main__":
    main()
