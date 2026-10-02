# Revisión v3 — Papá, Mi Héroe adulto micro-piloto

## Cambio aplicado

Feedback del usuario sobre v2:

1. El resultado debe parecer un libro, como `Papá, Mi Héroe/de-hijo-para-papa/PLANTILLA_1_Mi_Superhéroe_Personal.png`.
2. El poema debe ir alineado a la izquierda.
3. El poema debe tener dos párrafos.
4. La letra del poema debe ser más pequeña.
5. Título y texto deben seguir el estilo editorial del catálogo actual.

## Ajuste de prompt

La v3 cambió de `imagen plana` a `doble página interior de libro abierto` para preview de selección.

Elementos agregados:

- lomo/pliegue central visible;
- curvatura sutil del papel;
- textura mate de papel artístico;
- título Montserrat dorado con relieve;
- separador bajo el título con líneas doradas y rombo central;
- poema Montserrat más pequeño;
- poema alineado a la izquierda;
- poema en dos párrafos;
- casa dorada minimalista bajo el poema.

## Resultado de generación v3

| Parámetro | Valor |
|---|---|
| Modelo | `gpt-image-2` |
| Calidad | `medium` |
| Tamaño | `1600x944` |
| Estilo | libro abierto / catálogo |
| Nombres de preview | `Papá Leo`, `Mateo`, `Valeria` |

## Costo real registrado v3

| Imagen | Costo |
|---|---:|
| 01C — El héroe que sostiene en silencio | `$0.0427` |
| 02C — El taller de tus consejos | `$0.0425` |
| 03C — La mano que me levantó | `$0.0424` |
| 04D — Nuestro baile con el tiempo | `$0.0427` |
| **Total v3** | **`$0.1703`** |

## Candidatas v3

| # | Archivo | Estado |
|---|---|---|
| 1C | `output/Papá, Mi Héroe Adulto/micro-piloto-v3/ADULTO_PILOTO_01C_El_Heroe_Que_Sostiene_en_Silencio_Hijo_a_Papa.png` | Candidata |
| 2C | `output/Papá, Mi Héroe Adulto/micro-piloto-v3/ADULTO_PILOTO_02C_El_Taller_de_Tus_Consejos_Hijo_a_Papa.png` | Candidata |
| 3C | `output/Papá, Mi Héroe Adulto/micro-piloto-v3/ADULTO_PILOTO_03C_La_Mano_Que_Me_Levanto_Hija_a_Papa.png` | Candidata |
| 4D | `output/Papá, Mi Héroe Adulto/micro-piloto-v3/ADULTO_PILOTO_04D_Nuestro_Baile_con_el_Tiempo_Hija_a_Papa.png` | Candidata |

## Revisión interna

- La dirección visual ya coincide mejor con las plantillas existentes del catálogo.
- Título, separador y textura de libro se acercan al ejemplo original.
- Poema ya no está centrado; quedó alineado a la izquierda.
- Poema quedó en dos párrafos con letra menor.
- La casa familiar aparece bajo cada poema.
- `04D` se debe revisar con ojo fino por ser una escena de baile padre-hija; en esta versión se lee más familiar que los intentos anteriores.

## Decisión recomendada

Si el usuario aprueba v3, usar esta dirección como estándar para previews estáticas adultas de selección. La generación real con fotos de cliente deberá decidir aparte si mantiene estilo libro abierto para demo/preview o si usa imagen plana para PDF final.
