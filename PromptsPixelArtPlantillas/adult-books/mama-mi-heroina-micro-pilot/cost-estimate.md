# Presupuesto — Mamá, Mi Heroína adulto micro-piloto

## Configuración de referencia

| Parámetro | Valor |
|---|---|
| Entorno | `PromptsPixelArtPlantillas/` |
| Script | `scripts/generate.py` |
| Modelo | `gpt-image-2` |
| Calidad | `medium` |
| Tamaño aprobado para micro-piloto | `1600x944` |
| Costo unitario de planificación | `$0.041 USD / imagen` |
| Registro real | `manifest.json > cost_usd` |

## Micro-piloto

| Concepto | Cantidad |
|---|---:|
| Plantillas hijo adulto → mamá | 2 |
| Plantillas hija adulta → mamá | 2 |
| Assets adicionales | 0 |
| Total imágenes base | 4 |

| Escenario | Cálculo | Estimación |
|---|---:|---:|
| 1 intento | `4 × $0.041` | `$0.16` |
| +20% reintentos | `4 × 1.2 × $0.041` | `$0.20` |
| Máximo 2 intentos | `4 × 2 × $0.041` | `$0.33` |

## Libro completo adulto — solo interiores

| Concepto | Cantidad |
|---|---:|
| Hijo adulto → mamá | 20 |
| Hija adulta → mamá | 20 |
| Total interiores | 40 |

| Escenario | Cálculo | Estimación |
|---|---:|---:|
| 1 intento | `40 × $0.041` | `$1.64` |
| +20% reintentos | `40 × 1.2 × $0.041` | `$1.97` |
| Máximo 2 intentos | `40 × 2 × $0.041` | `$3.28` |

## No incluido todavía

Se presupuesta después de aprobar la dirección visual:

- miniatura/card adulto;
- imagen Home;
- background/carrusel;
- imágenes centrales de página detalle;
- portada/contratapa si aplica.

## Gate

- Presupuesto micro-piloto aprobado por usuario: pendiente.
- Dimensión final propuesta: `1600x944`.
- Generación de imágenes: bloqueada hasta aprobación de textos/prompts y presupuesto.
