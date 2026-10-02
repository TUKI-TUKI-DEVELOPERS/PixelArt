import importlib.util
import re
from itertools import combinations
from pathlib import Path


def ult(verso: str) -> str:
    words = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", verso)
    return words[-1].lower() if words else ""


libros: dict[str, tuple[set[str], set[str]]] = {}
for directory in sorted(Path("adult-books").glob("*-adult")):
    spec = importlib.util.spec_from_file_location(f"x{directory.name}", directory / "poems.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    rimas, versos = set(), set()
    for por_direccion in module.POEMS.values():
        for texto in por_direccion.values():
            for verso in texto.splitlines():
                if verso.strip() and "{APODO" not in verso:
                    rimas.add(ult(verso))
                    versos.add(verso.strip())
    libros[directory.name] = (rimas, versos)

fallos = 0
for left, right in combinations(sorted(libros), 2):
    left_rimas, left_versos = libros[left]
    right_rimas, right_versos = libros[right]
    compartidas = len(left_rimas & right_rimas) / len(left_rimas | right_rimas) * 100
    versos_iguales = len(left_versos & right_versos)
    if compartidas > 20 or versos_iguales > 0:
        fallos += 1
        print(
            f"FALLA {compartidas:5.1f}% rimas · {versos_iguales:>3} versos iguales "
            f":: {left} <-> {right}",
        )
print("pares que fallan:", fallos)
