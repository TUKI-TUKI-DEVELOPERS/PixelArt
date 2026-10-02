# Revisión — Siempre en mi corazón — Abuelo adulto micro-piloto foto visible

## Motivo de regeneración

La tanda anterior tenía buena composición, pero la foto/retrato del abuelo no se percibía lo suficiente. Como la plataforma pide fotos del abuelo para generar demos, cada plantilla debe justificar visualmente esa carga.

Regla aplicada:

```txt
La foto/retrato del abuelo debe ser visible, reconocible y emocionalmente relevante.
No puede quedar como detalle pequeño, escondido o secundario.
No convertirlo en fantasma literal ni persona viva presente; usar foto, retrato, álbum, marco, carta con retrato o recuerdo visual claramente integrado.
```

## Resultado de generación

| Parámetro | Valor |
|---|---|
| Modelo | `gpt-image-2` |
| Calidad | `medium` |
| Tamaño | `1600x944` |
| Libro específico | `Siempre en mi corazón — Abuelo` |
| Versión | `micro-piloto-foto-visible` |
| Nombres de preview | `Abuelo Ricardo`, `Mateo`, `Valeria` |

## Costo real registrado

| Imagen | Costo |
|---|---:|
| 01 — El faro que aún me guía | `$0.0444` |
| 02 — La ruta de tus pasos buenos | `$0.0443` |
| 03 — El jardín de tus fechas queridas | `$0.0444` |
| 04 — La constelación de tus historias | `$0.0444` |
| **Total** | **`$0.1775`** |

## Archivos generados

| # | Archivo | Estado preliminar |
|---|---|---|
| 1 | `output/Siempre en mi Corazón Abuelo Adulto/micro-piloto-foto-visible/ADULTO_SIEMPRE_CORAZON_ABUELO_FOTO_VISIBLE_01_El_faro_que_aun_me_guia.png` | Candidata fuerte; foto visible en manos del hijo. |
| 2 | `output/Siempre en mi Corazón Abuelo Adulto/micro-piloto-foto-visible/ADULTO_SIEMPRE_CORAZON_ABUELO_FOTO_VISIBLE_02_La_ruta_de_tus_pasos_buenos.png` | Candidata fuerte; foto visible mientras camina la ruta. |
| 3 | `output/Siempre en mi Corazón Abuelo Adulto/micro-piloto-foto-visible/ADULTO_SIEMPRE_CORAZON_ABUELO_FOTO_VISIBLE_03_El_jardin_de_tus_fechas_queridas.png` | Candidata muy fuerte; retrato del abuelo claramente visible y emocionalmente integrado. |
| 4 | `output/Siempre en mi Corazón Abuelo Adulto/micro-piloto-foto-visible/ADULTO_SIEMPRE_CORAZON_ABUELO_FOTO_VISIBLE_04_La_constelacion_de_tus_historias.png` | Candidata fuerte; foto visible en manos de la hija. |

## Contact sheet

`PromptsPixelArtPlantillas/adult-books/siempre-en-mi-corazon-abuelo-micro-pilot/review-assets/contact-sheet-foto-visible.jpg`

## Checklist rápido

- [x] 4 imágenes generadas.
- [x] Dimensión `1600x944`.
- [x] Costo real registrado.
- [x] Libro específico, no categoría genérica.
- [x] Solo abuelo; no mezcla con abuela.
- [x] Direcciones cubiertas: 2 hijo adulto → abuelo, 2 hija adulta → abuelo.
- [x] Foto/retrato del abuelo visible en las 4 imágenes.
- [x] Sin fantasmas literales visibles.
- [x] Sin mascotas/perros/gatos/animales visibles.
- [ ] Revisión visual del usuario.

## Revisión interna

La corrección funcionó: ahora sí se entiende por qué el usuario subiría la foto del abuelo. La 03 es la más clara en uso de retrato. La 01, 02 y 04 también muestran la foto en manos del dedicante; no son tan grandes como la 03, pero ya no quedan escondidas como detalle secundario. La tanda mantiene buena variedad espacial: faro, ruta, jardín y constelación.

## Corrección posterior — ambos rostros deben verse

El usuario rechazó esta tanda como insuficiente: aunque la foto del abuelo aparece, el dedicante sigue apareciendo muchas veces de espaldas y la presencia memorial no puede depender de una foto pequeña.

Nueva regla para la próxima regeneración:

```txt
Si la plataforma pide foto del cliente y de la persona fallecida, ambas identidades deben verse claramente.
Dedicante: rostro visible frontal o tres cuartos; prohibido de espaldas.
Persona fallecida: retrato/foto grande y emocionalmente protagonista, no miniatura ni prop secundario.
Memorial: se debe sentir por composición, luz, álbum/retrato/carta/paisaje y símbolo; no por fantasma literal.
```

Esta tanda queda rechazada como final. Solo sirve como referencia de temas generales. Los prompts fueron reescritos en `generation-prompts.md`.
