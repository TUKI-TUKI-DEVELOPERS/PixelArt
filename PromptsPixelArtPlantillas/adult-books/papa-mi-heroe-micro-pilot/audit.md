# Auditoría — Papá, Mi Héroe adulto

## Resultado rápido

El libro infantil existente no debe reutilizarse directamente para adultos. Sirve como referencia emocional, pero muchas escenas, títulos y prompts hablan desde una voz infantil o usan una estructura visual legacy con libro abierto/lomo pintado.

La versión adulta debe conservar la emoción central —admiración hacia papá—, pero cambiar la voz hacia hijo/hija adulto/a que reconoce años de esfuerzo, guía y presencia.

## Estado actual encontrado

| Área | Hallazgo | Decisión para adulto |
|---|---|---|
| Variantes | Existen 40 plantillas: 20 hija → papá y 20 hijo → papá. | Mantener la misma cobertura: 20 hijo adulto → papá + 20 hija adulta → papá. |
| Fuente de prompts | `PromptsPixelArtPlantillas/Familia/Papá, Mi Héroe/Libro-1-Unica.md` y `Libro-1-De-Hijo-Para-Papa.md`. | Crear fuente adulta separada; no pisar los `.md` infantiles. |
| Estructura visual | Los prompts fuente usan “libro abierto”, “lomo/pliegue” y curvatura de papel. | La versión adulta debe usar la lógica plana validada en `_plantilla-maestra.md` v6 para generación real. |
| Tono | Varias escenas son heroicas/fantásticas con mirada infantil: superhéroe, rey, pirata, vikingo, gladiador. | Reinterpretar símbolos con madurez: héroe cotidiano, legado, consejo, protección, presencia. |
| Lenguaje | Hay términos infantiles: niño, niña, pequeño, pequeña. | Evitarlos salvo como recuerdo explícito y controlado. No hablar desde voz de niño. |
| Poemas | Poemas actuales pueden usar nombre/apodo, pero muchos tienen voz infantil. | Reescribir poemas adultos, rimados, en castellano neutral y usando `{APODO_DESTINATARIO}`. |
| Roles backend | Las plantillas usan `recipient` y `dedicator`. | Mantener esos roles para el micro-piloto. |
| Género/dirección | Hijo → papá usa `HE_TO_HE`; hija → papá usa `SHE_TO_HE`. | Mantener direcciones explícitas. |
| Costos | El manifest registra `cost_usd`; referencia actual ~`$0.041` por imagen. | Estimar y aprobar presupuesto antes de generar. |

## Riesgos principales

1. Que el resultado parezca una plantilla infantil reciclada.
2. Que el poema hable como niño pequeño.
3. Que el prompt conserve lomo/pliegue cuando la generación real necesita imagen plana.
4. Que la magia se vuelva caricaturesca.
5. Que la figura del padre se vuelva demasiado épica/falsa y pierda emoción real.
6. Que se genere sin confirmar la dimensión final correcta del pipeline.

## Decisión de micro-piloto

Crear 4 plantillas adultas de prueba:

| Variante | Cantidad | Objetivo |
|---|---:|---|
| Hijo adulto → papá | 2 | Validar admiración masculina adulta sin tono infantil. |
| Hija adulta → papá | 2 | Validar ternura y gratitud adulta sin infantilizar. |

No se generan imágenes todavía. Primero se aprueban textos, prompts y presupuesto.

## Dimensión definida para el micro-piloto

Se revisaron las imágenes generadas actualmente en `PromptsPixelArtPlantillas/output/` y todas están en `1600x944`. En `PromptsPixelArtPlantillas/output/Papá, Mi Héroe/` también hay 20 imágenes en `1600x944`.

Decisión: usar `1600x944` para el micro-piloto adulto, porque es la dimensión real del material actual mostrado/usado para plantillas.

| Fuente revisada | Dimensión encontrada |
|---|---:|
| `PromptsPixelArtPlantillas/output/` | `100` imágenes en `1600x944` |
| `PromptsPixelArtPlantillas/output/Papá, Mi Héroe/` | `20` imágenes en `1600x944` |

Nota: `_plantilla-maestra.md` v6 menciona `1392x1008`, pero para este piloto prevalece la dimensión actual del material existente: `1600x944`.
