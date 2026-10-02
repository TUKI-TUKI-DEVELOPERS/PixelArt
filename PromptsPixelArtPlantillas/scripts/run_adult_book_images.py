"""Generate catalogue spreads for any adult book, driven by the database.

The Papá runner hardcoded the recipient ("Leo, a fictional Peruvian-Latin father of
58") inside its prompt, so it could not serve another book. This one takes the
recipient and the two dedicators from a per-book spec and reads everything else —
name, scene, poem, the infant reference key — straight from the database, which is
now the source of truth after the rebuild.

It reuses the proven V10 mechanics untouched (reference fetch, textless pass, the
edit call, the binding finish and the local typography) by repointing them.

    python3 run_adult_book_images.py --book 9861 --dry-run
    python3 run_adult_book_images.py --book 9861 --only 1:SHE_TO_SHE
    python3 run_adult_book_images.py --book 9861
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))
import generate_papa_adult_demo_v10_open_book_first_10 as mech  # noqa: E402

COST_PER_IMAGE_USD = 0.047

BOOKS: dict[int, dict] = {
    9861: {
        "label": "Mamá, Mi Heroína Adulto",
        "infant_model": 9,
        "folder": "Mamá, Mi Heroína Adulto",
        "output": "demo-mama-adulto-v1",
        "key_prefix": "IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/",
        "recipient": ("Carmen, a fictional Peruvian-Latin mother of 58 with dark hair streaked "
                      "with silver, a warm noble expression and an unmistakably adult face"),
        # El catálogo nunca puede mostrar un placeholder: la base de datos conserva
        # {APODO_DESTINATARIO} para el producto real, y aquí se rellena con el nombre
        # de ejemplo de este libro, igual que hace el pipeline infantil.
        "example_names": {"recipient": "Carmen", "hijo": "Mateo", "hija": "María"},
        "directions": {
            "HE_TO_SHE": {"label": "Hijo adulto → Mamá", "slug": "hijo_a_mama", "block": 0,
                          "person": ("Mateo, her fictional Peruvian-Latin adult son of 32, "
                                     "wearing mature contemporary clothing")},
            "SHE_TO_SHE": {"label": "Hija adulta → Mamá", "slug": "hija_a_mama", "block": 20,
                           "person": ("María, her fictional Peruvian-Latin adult daughter of 30, "
                                      "wearing mature contemporary clothing")},
        },
    },
    9863: {
        "label": "Te Amo, Abuela Adulto",
        "infant_model": 11,
        "folder": "Te Amo, Abuela Adulto",
        "output": "demo-abuela-adulto-v1",
        "key_prefix": "IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/",
        "recipient": ("Rosa, a fictional Peruvian-Latin grandmother of 75 with white hair worn up, "
                      "a warm noble expression and an unmistakably adult face"),
        "example_names": {"recipient": "Rosa", "nieto": "Mateo", "nieta": "María"},
        "directions": {
            "HE_TO_SHE": {"label": "Nieto adulto → Abuela", "slug": "nieto_a_abuela", "block": 0,
                          "person": ("Mateo, her fictional Peruvian-Latin adult grandson of 32, "
                                     "wearing mature contemporary clothing")},
            "SHE_TO_SHE": {"label": "Nieta adulta → Abuela", "slug": "nieta_a_abuela", "block": 20,
                           "person": ("María, her fictional Peruvian-Latin adult granddaughter of 30, "
                                      "wearing mature contemporary clothing")},
        },
    },
        9862: {
            "label": "Te Amo, Abuelo Adulto",
            "infant_model": 10,
            "folder": "Te Amo, Abuelo Adulto",
            "output": "demo-abuelo-adulto-v1",
            "key_prefix": "IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/",
            "recipient": ("Jorge, a fictional Peruvian-Latin grandfather of 75 with white hair, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Jorge", "nieto": "Mateo", "nieta": "María"},
            "directions": {
                "HE_TO_HE": {"label": "Nieto adulto → Abuelo", "slug": "nieto_a_abuelo", "block": 0,
                             "person": ("Mateo, his fictional Peruvian-Latin adult grandson of 32, "
                                        "wearing mature contemporary clothing")},
                "SHE_TO_HE": {"label": "Nieta adulta → Abuelo", "slug": "nieta_a_abuelo", "block": 20,
                              "person": ("María, his fictional Peruvian-Latin adult granddaughter of 30, "
                                         "wearing mature contemporary clothing")},
            },
        },
        9859: {
            "label": "El Mejor Equipo Adulto",
            "infant_model": 12,
            "folder": "El Mejor Equipo Adulto",
            "output": "demo-mejor-equipo-adulto-v1",
            "key_prefix": "IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/",
            "recipient": ("Mateo, a fictional Peruvian-Latin adult brother of 32 with dark hair, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Mateo", "yo": "María"},
            "directions": {
                "": {"label": "Hermanos adultos", "slug": "yo_a_hermano", "block": 0,
                     "person": ("María, his fictional Peruvian-Latin adult sister of 30, "
                                "wearing mature contemporary clothing")},
            },
        },
        9860: {
            "label": "Mi Familia Adulto",
            "infant_model": 13,
            "folder": "Mi Familia Adulto",
            "output": "demo-mi-familia-adulto-v1",
            "key_prefix": "IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/",
            "recipient": ("Rosa, a fictional Peruvian-Latin mother of 58 with dark hair streaked with silver, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Rosa", "yo": "Mateo"},
            "directions": {
                "": {"label": "Familia adulta", "slug": "yo_a_familia", "block": 0,
                     "person": ("Mateo, her fictional Peruvian-Latin adult son of 32, "
                                "wearing mature contemporary clothing")},
            },
        },
        9864: {
            "label": "Siempre en mi Corazón Abuelo Adulto",
            "infant_model": 1112,
            "folder": "Siempre en mi Corazón Abuelo Adulto",
            "output": "demo-corazon-abuelo-adulto-v1",
            "key_prefix": "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/",
            "recipient": ("Jorge, a fictional Peruvian-Latin grandfather of 75 with white hair, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Jorge", "nieto": "Mateo"},
            "directions": {
                "M": {"label": "Nieto adulto → Abuelo", "slug": "nieto_a_abuelo", "block": 0,
                      "person": ("Mateo, his fictional Peruvian-Latin adult grandson of 32, "
                                 "wearing mature contemporary clothing")},
            },
        },
        9865: {
            "label": "Siempre en mi Corazón Abuela Adulto",
            "infant_model": 1112,
            "folder": "Siempre en mi Corazón Abuela Adulto",
            "output": "demo-corazon-abuela-adulto-v1",
            "key_prefix": "IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/",
            "recipient": ("Rosa, a fictional Peruvian-Latin grandmother of 75 with white hair worn up, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Rosa", "nieta": "María"},
            "directions": {
                "F": {"label": "Nieta adulta → Abuela", "slug": "nieta_a_abuela", "block": 0,
                      "person": ("María, her fictional Peruvian-Latin adult granddaughter of 30, "
                                 "wearing mature contemporary clothing")},
            },
        },
        9866: {
            "label": "Mi Ángel Guardián Padre Adulto",
            "infant_model": 1063,
            "folder": "Mi Ángel Guardián Padre Adulto",
            "output": "demo-angel-padre-adulto-v1",
            "key_prefix": "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/",
            "recipient": ("Leo, a fictional Peruvian-Latin father of 58 with silver hair, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Leo", "hijo": "Mateo"},
            "directions": {
                "M": {"label": "Hijo adulto → Padre", "slug": "hijo_a_padre", "block": 0,
                      "person": ("Mateo, his fictional Peruvian-Latin adult son of 32, "
                                 "wearing mature contemporary clothing")},
            },
        },
        9867: {
            "label": "Mi Ángel Guardián Madre Adulto",
            "infant_model": 1063,
            "folder": "Mi Ángel Guardián Madre Adulto",
            "output": "demo-angel-madre-adulto-v1",
            "key_prefix": "IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/",
            "recipient": ("Carmen, a fictional Peruvian-Latin mother of 58 with dark hair streaked with silver, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Carmen", "hija": "María"},
            "directions": {
                "F": {"label": "Hija adulta → Madre", "slug": "hija_a_madre", "block": 0,
                      "person": ("María, her fictional Peruvian-Latin adult daughter of 30, "
                                 "wearing mature contemporary clothing")},
            },
        },
        9868: {
            "label": "Siempre Serás Parte de Mí Adulto",
            "infant_model": 1164,
            "folder": "Siempre Serás Parte de Mí Adulto",
            "output": "demo-parte-de-mi-adulto-v1",
            "key_prefix": "IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/",
            "recipient": ("Mateo, a fictional Peruvian-Latin adult brother of 32 with dark hair, "
                          "a warm noble expression and an unmistakably adult face"),
            "example_names": {"recipient": "Mateo", "hermano": "Mateo", "hermana": "María"},
            "directions": {
                "M": {"label": "Hermano adulto", "slug": "hermano_recordado", "block": 0,
                      "person": ("Mateo, his fictional Peruvian-Latin adult brother of 32, "
                                 "wearing mature contemporary clothing")},
                "F": {"label": "Hermana adulta", "slug": "hermana_recordada", "block": 20,
                      "person": ("María, his fictional Peruvian-Latin adult sister of 30, "
                                 "wearing mature contemporary clothing")},
            },
        },
        9857: {
            "label": "Aventura Entre Patas Adulto",
            "infant_model": 5,
            "folder": "Aventura Entre Patas Adulto",
            "output": "demo-aventura-patas-adulto-v1",
            "key_prefix": "IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/",
            "recipient": ("Toby, a fictional adult Peruvian family dog with golden fur, "
                          "warm loyal eyes and a clearly adult animal appearance"),
            "example_names": {"recipient": "Toby", "humano": "Mateo"},
            "directions": {
                "": {"label": "Adulto → Mascota", "slug": "humano_a_mascota", "block": 0,
                     "person": ("Mateo, the dog's fictional Peruvian-Latin adult owner of 32, "
                                "wearing mature contemporary clothing")},
            },
        },
}

LAYOUT = (
    "Mantén a las dos figuras completas en la PÁGINA IZQUIERDA, con el fondo continuo "
    "fluyendo hacia la derecha. ZONA DEL TÍTULO (obligatorio): el tercio superior de la "
    "página izquierda queda como espacio negativo tranquilo, sin caras, sin cabezas y sin "
    "detalle de alto contraste; todas las cabezas van por debajo de esa franja. DOBLEZ "
    "(obligatorio): ninguna cara, mano ni punto de contacto cae sobre el pliegue central. "
    "BORDE SUPERIOR: ninguna cabeza queda cortada por el borde de la página. "
    "SIN UTILERÍA INFANTIL (obligatorio): los protagonistas son adultos, así que no hay "
    "peluches, ositos, juguetes, cunas, ropa de cama con estampado infantil ni decoración "
    "de cuarto de niños en ninguna parte de la escena."
)


def psql(sql: str) -> list[list[str]]:
    out = subprocess.run(
        ["docker", "exec", "pixelart_postgres", "psql", "-U", "pixelart", "-d", "pixelart",
         "-P", "pager=off", "-A", "-F", "\x1f", "-R", "\x1e", "-t", "-c", sql],
        capture_output=True, text=True, check=True).stdout
    return [r.split("\x1f") for r in out.split("\x1e") if r.strip()]


def slugify(text: str) -> str:
    plain = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"_+", "_", re.sub(r"[^a-z0-9]+", "_", plain.lower())).strip("_")


def ordinal_of(key: str) -> int:
    return int(re.search(r"plantilla_(\d+)_", key, re.IGNORECASE).group(1))


def build_jobs(book: dict) -> list[dict]:
    """One job per adult template, carrying its infant reference and its own content."""
    infant = {}
    for key, direction, name in psql(
            "SELECT template_preview_key, coalesce(gender_direction,''), name FROM "
            f"personalized_templates WHERE model_id={book['infant_model']} AND is_active;"):
        infant[(ordinal_of(key), direction)] = key

    jobs = []
    for key, direction, name, scene, poem in psql(
            "SELECT template_preview_key, coalesce(gender_direction,''), name, "
            "coalesce(scene_visual,''), coalesce(poem_template,'') FROM "
            f"personalized_templates WHERE model_id={book['adult_model']} AND is_active ORDER BY id;"):
        spec = book["directions"][direction]
        position = ordinal_of(key) - spec["block"]
        reference = infant.get((position, direction))
        if reference is None:
            raise SystemExit(f"[error] sin referencia infantil para posición {position} {direction}")
        title = re.sub(r" De .*$", "", name)
        jobs.append({
            "position": position, "direction": direction, "title": title, "name": name,
            "slug": slugify(title), "theme": scene, "poem": poem, "layout": LAYOUT,
            "reference_key": reference, "current_key": key,
            "target_key": f"{book['key_prefix']}Plantilla_{ordinal_of(key):02d}_{slugify(title)}_{spec['slug']}.webp",
        })
    return jobs


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--book", type=int, required=True, help="Adult model id")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--only", help="Comma-separated position:DIRECTION pairs")
    args = parser.parse_args()

    if args.book not in BOOKS:
        raise SystemExit(f"[error] libro {args.book} no está en BOOKS; agrégalo primero")
    book = {**BOOKS[args.book], "adult_model": args.book}

    jobs = build_jobs(book)
    if args.only:
        wanted = {(int(c.split(":")[0]), c.split(":")[1].strip().upper()) for c in args.only.split(",")}
        jobs = [j for j in jobs if (j["position"], j["direction"]) in wanted]
        if not jobs:
            raise SystemExit("[error] --only no coincidió con ninguna plantilla")

    out_dir = ROOT / "output" / book["folder"] / book["output"]
    mech.OUTPUT, mech.WORK, mech.REVIEW = out_dir, out_dir / "work", out_dir / "review"
    (out_dir / "work").mkdir(parents=True, exist_ok=True)

    original_prompt = mech.prompt_for

    def prompt_for(item: dict, direction: dict) -> str:
        """Same prompt as Papá, with the recipient taken from the book spec."""
        text = original_prompt(item, direction)
        return text.replace(
            "Leo, a fictional Peruvian-Latin father of 58 with silver hair, a warm noble "
            "expression and an unmistakably adult face",
            book["recipient"])

    mech.prompt_for = prompt_for

    print(f"libro      : {book['label']}")
    print(f"salida     : {out_dir.relative_to(ROOT)}")
    print(f"plantillas : {len(jobs)}")
    if not args.dry_run:
        print(f"costo est. : ~${len(jobs) * COST_PER_IMAGE_USD:.2f}")

    results, failures = [], []
    api_key = None if args.dry_run else mech.base.load_api_key()
    for job in jobs:
        direction = book["directions"][job["direction"]]
        ejemplos = book["example_names"]
        poem = job["poem"]
        for marcador, valor in (
                ("{APODO_DESTINATARIO}", ejemplos["recipient"]),
                ("{NOMBRE_DESTINATARIO}", ejemplos["recipient"]),
                ("{APODO_DEDICANTE}", ejemplos[direction["slug"].split("_")[0]]),
                ("{NOMBRE_DEDICANTE}", ejemplos[direction["slug"].split("_")[0]]),
                ("{APELLIDO}", "")):
            poem = poem.replace(marcador, valor)
        if "{" in poem:
            raise SystemExit(f"[error] quedó un placeholder sin rellenar en {job['position']} {job['direction']}: "
                             f"{poem[poem.index('{'):poem.index('{') + 40]}")
        item = {**job, "poem": poem, "number": job["position"],
                "reference_label": f"{job['position']:02d}-{job['slug']}", "title_max_width": 470}
        destination = out_dir / "webp" / f"plantilla_{job['position']:02d}_{job['slug']}_{direction['slug']}.webp"
        if destination.exists():
            print(f"saltada {job['position']:>2} {job['direction']}")
            continue
        if args.dry_run:
            mech.fetch_reference(item)
            print(f"READY {job['position']:>2} {job['direction']:<11} ref={job['reference_key'].rsplit('/',1)[1]}")
            continue
        reference = mech.make_textless_reference(item)
        # Moderation is probabilistic: an innocuous template can trip the output filter
        # once and pass on the next call. Retry once, then record it for manual work and
        # keep going — a single block must not take down a 40-image run.
        error = None
        for attempt in (1, 2):
            try:
                raw, cost, _usage = mech.request_edit(reference, item, direction, api_key)
            except Exception as exc:  # noqa: BLE001 - the SDK raises several unrelated types
                error = exc
                print(f"   intento {attempt} falló para {job['position']:>2} {job['direction']}: "
                      f"{type(exc).__name__}")
                continue
            error = None
            break
        if error is not None:
            failures.append({"position": job["position"], "direction": job["direction"],
                             "title": job["title"], "error": str(error)[:300]})
            print(f"FALLÓ {job['position']:>2} {job['direction']:<11} {job['title']} — para manual")
            continue
        (out_dir / "work" / f"raw-{job['position']:02d}-{direction['slug']}.png").write_bytes(raw)
        background = mech.apply_binding(mech.fit_to_canvas(raw))
        mech.compose_editorial(background, item, direction, destination)
        results.append({**{k: job[k] for k in ("position", "direction", "title", "target_key")},
                        "output": str(destination.relative_to(ROOT)), "cost_usd": cost})
        print(f"OK {job['position']:>2} {job['direction']:<11} {job['title']}  ${cost}")

    if results or failures:
        (out_dir / "report.json").write_text(
            json.dumps({"generadas": results, "fallidas": failures}, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8")
        print(f"\ngeneradas {len(results)}  fallidas {len(failures)}  "
              f"costo ${sum(r['cost_usd'] or 0 for r in results):.4f}")
        for f in failures:
            print(f"   para manual: {f['position']:>2} {f['direction']} — {f['title']}")


if __name__ == "__main__":
    main()
