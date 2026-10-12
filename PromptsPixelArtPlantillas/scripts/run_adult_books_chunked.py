"""Corre run_adult_book_images.py en tandas cortas, un proceso por tanda.

La corrida larga la mató el sistema por falta de memoria dos veces: el intérprete
acumula heap a lo largo de 220 imágenes y la máquina ya estaba en 0,4 GB libres.
Cada tanda termina y devuelve su memoria, así que el pico queda acotado.

No duplica gasto: run_adult_book_images.py salta las plantillas que ya existen en
disco antes de pedir nada a la API, así que repetir una tanda hecha es gratis.

    python3 run_adult_books_chunked.py --books 9859,9860 --size 4
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RUNNER = ROOT / "run_adult_book_images.py"


def direcciones(book: int) -> list[str]:
    """Claves de dirección del libro, leídas del BOOKS del runner."""
    src = (RUNNER).read_text()
    bloque = re.search(rf"{book}: \{{(.*?)\n(?:        |    )\}},", src, re.S)
    if not bloque:
        raise SystemExit(f"[error] {book} no está en BOOKS")
    dirs = re.findall(r"\"([A-Z_]*)\": \{\"label\"", bloque.group(1))
    return dirs or [""]


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--books", required=True, help="ids separados por coma")
    p.add_argument("--size", type=int, default=4, help="imágenes por proceso")
    p.add_argument("--positions", type=int, default=20)
    args = p.parse_args()

    for book in [int(b) for b in args.books.split(",")]:
        pares = [f"{pos}:{d}" for d in direcciones(book) for pos in range(1, args.positions + 1)]
        tandas = [pares[i:i + args.size] for i in range(0, len(pares), args.size)]
        print(f"######## LIBRO {book} — {len(pares)} plantillas en {len(tandas)} tandas ########",
              flush=True)
        for n, tanda in enumerate(tandas, 1):
            r = subprocess.run(
                [sys.executable, str(RUNNER), "--book", str(book), "--only", ",".join(tanda)],
                capture_output=True, text=True)
            for linea in r.stdout.splitlines():
                # el runner imprime FALLÓ con tilde: sin ella el filtro ocultaba
                # todos los fallos y cada libro parecía terminar limpio
                if linea.startswith(("OK", "saltada", "FALLÓ", "FALLO", "[error]", "generadas")):
                    print(f"  {linea}", flush=True)
            if r.returncode != 0:
                print(f"  [tanda {n}/{len(tandas)} terminó con código {r.returncode}]", flush=True)
                print(r.stderr[-500:], flush=True)
            time.sleep(1)  # deja que el sistema recupere las páginas liberadas
        print(f"######## FIN LIBRO {book} ########", flush=True)


if __name__ == "__main__":
    main()
