# Revisión — Mi Familia adulto micro-piloto

## Resultado de generación

| Parámetro | Valor |
|---|---|
| Modelo | `gpt-image-2` |
| Calidad | `medium` |
| Tamaño | `1600x944` |
| Nombres de preview | `Familia Vargas`, `Andrés`, `Renata`, `Bruno`, `Emma` |
| Estilo | libro abierto / catálogo con arquetipo adulto diferenciado, nombre variable y color de título temático |

## Costo real registrado

| Imagen | Costo |
|---|---:|
| 01 — La casa de los mil regresos | `$0.0430` |
| 02 — El laboratorio de nuestras mezclas | `$0.0430` |
| 03 — El atlas de nuestros caminos | `$0.0429` |
| 04 — El jardín de las voces distintas | `$0.0428` |
| **Total** | **`$0.1717`** |

## Archivos generados

| # | Archivo | Estado preliminar |
|---|---|---|
| 1 | `output/Mi Familia Adulto/micro-piloto/ADULTO_MI_FAMILIA_PILOTO_01_La_casa_de_los_mil_regresos.png` | Candidata fuerte; hogar/regreso se lee bien. Revisar mascota agregada. |
| 2 | `output/Mi Familia Adulto/micro-piloto/ADULTO_MI_FAMILIA_PILOTO_02_El_laboratorio_de_nuestras_mezclas.png` | Candidata fuerte; concepto muy diferenciado. Revisar mascota agregada. |
| 3 | `output/Mi Familia Adulto/micro-piloto/ADULTO_MI_FAMILIA_PILOTO_03_El_atlas_de_nuestros_caminos.png` | Candidata fuerte; rutas/mapa funcionan bien. Revisar mascota agregada. |
| 4 | `output/Mi Familia Adulto/micro-piloto/ADULTO_MI_FAMILIA_PILOTO_04_El_jardin_de_las_voces_distintas.png` | Candidata fuerte; jardín/raíces se entiende. Revisar mascota agregada. |

## Contact sheet

`PromptsPixelArtPlantillas/adult-books/mi-familia-micro-pilot/review-assets/contact-sheet.jpg`

## Checklist rápido

- [x] 4 imágenes generadas.
- [x] Dimensión `1600x944`.
- [x] Costo real registrado.
- [x] Arquetipos diferenciados.
- [x] Nombre/apodo variable en poemas.
- [x] Título con color temático por plantilla.
- [ ] Revisión visual del usuario.
- [ ] Decidir si la mascota agregada por el modelo es aceptable o si se regenera con restricción explícita `sin mascotas/animales`.

## Revisión interna

La tanda mantiene el estándar adulto aprobado: las escenas tienen identidad propia, los títulos varían por color y el nombre `Familia Vargas` no aparece siempre al inicio. Sin embargo, el modelo agregó un perro en las cuatro imágenes, aunque `Mi Familia` no lo pedía. Visualmente suma calidez, pero puede contaminar el concepto porque `Aventuras Entre Patas` ya cubre mascota. Si el usuario quiere una versión estricta de familia humana, conviene regenerar con una regla explícita: `no incluir mascotas, perros, gatos ni animales`.

## Corrección de prompt posterior

El usuario confirmó que `Mi Familia` no debe incluir perro ni ninguna mascota. Se corrigió `generation-prompts.md` para prohibir explícitamente mascotas, perros, gatos, aves y animales en futuras regeneraciones.
