import argparse
import importlib.util
import sys
from pathlib import Path
from PIL import ImageDraw, Image

ROOT = Path(__file__).resolve().parent

parser = argparse.ArgumentParser()
parser.add_argument('folder')
parser.add_argument('--name', default='<NOMBRE_EJEMPLO>')
args = parser.parse_args()

sys.path.insert(0, str(ROOT / 'adult-books' / args.folder))
import poems  # type: ignore

spec = importlib.util.spec_from_file_location('v3', ROOT / 'scripts/generate_papa_hijo_adult_first_10_peru_v3.py')
v3 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v3)  # type: ignore

draw = ImageDraw.Draw(Image.new('RGB', (1600, 944)))
f = v3.font(21, b'Medium')
LIMITE = 520

def ubic(p: str) -> str:
    i = p.find('{APODO')
    return 'inicio' if i <= len(p) / 3 else ('medio' if i <= 2 * len(p) / 3 else 'final')

errores, anchos = [], []
for pos in sorted(poems.POEMS):
    for quien, texto in poems.POEMS[pos].items():
        est = [e for e in texto.split('\n\n') if e.strip()]
        if len(est) != 3 or {len(e.strip().split('\n')) for e in est} != {4}:
            errores.append(('estructura', pos, quien))
        if ubic(texto) != poems.EXPECTED[pos]:
            errores.append(('apodo', pos, quien, ubic(texto)))
        for l in texto.split('\n'):
            if l.strip():
                w = draw.textbbox((0, 0), l.replace('{APODO_DESTINATARIO}', args.name), font=f)[2]
                if w > LIMITE:
                    anchos.append((w, pos, quien, l))

estructura = [e for e in errores if e[0] == 'estructura']
apodo = [e for e in errores if e[0] == 'apodo']
print(f'folder: {args.folder}')
print(f'problemas estructura: {len(estructura)}')
print(f'problemas apodo: {len(apodo)}')
print(f'versos que se desbordan: {len(anchos)}')
if errores:
    print('errores:', errores[:20])
if anchos:
    for a in sorted(anchos, reverse=True)[:20]:
        print(' ', a)
raise SystemExit(1 if errores or anchos else 0)
