# Corrección v2 — miniaturas Papá, mi héroe adulto

## Problema detectado

- `IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png` salió en `1440x1600`, pero las miniaturas Home existentes de libros personalizados usan `1190x1322` como salida final visible.
- El prompt anterior pidió `Papá Leo + Mateo + Valeria`; para miniaturas debe mostrarse un solo protagonista junto a papá.
- OpenAI devuelve fondo blanco amplio; después de generar hay que recortar margen blanco y reencuadrar en el canvas final.

## Decisión de salida

- Miniatura Home final: `1190x1322`.
- Miniatura catálogo final: mantener `1600x1200`.
- Mockup: libro completo, tapa dura, fondo blanco limpio, sombra suave.
- Protagonistas visibles: `Papá Leo + Mateo` únicamente.
- La tarjeta del producto debe informar que también puede generarse en versión hija → papá; no se generarán dos miniaturas.

## Costos estimados

- 1 intento Home (`1440x1600` fuente): aprox. `$0.0688`.
- 1 intento Catálogo (`1600x1200` fuente): aprox. `$0.0532`.
- Total por intento de ambos: aprox. `$0.1220`.
- Máximo 2 intentos por asset: aprox. `$0.2440`.

## Postproceso obligatorio

Después de generar:

1. Detectar bbox de pixeles no blancos.
2. Recortar margen blanco sobrante.
3. Reencuadrar en canvas final:
   - Home: `1190x1322`.
   - Catálogo: `1600x1200`.
4. Mantener libro completo, sin cortar esquinas, lomo ni sombra.
5. Sobrescribir los nombres finales solo cuando el resultado esté aprobado.

## Prompt corregido — Miniatura Home

Archivo final:
`IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`

Generar fuente en `1440x1600`; postprocesar a `1190x1322`.

```text
Genera una imagen retrato casi cuadrada para miniatura Home de ecommerce premium. Debe ser un mockup de libro personalizado, fotorrealista, sobrio y limpio.

[OBJETIVO]
Crear la miniatura Home de "Papá, mi héroe" versión adultos, siguiendo la misma familia visual de las miniaturas Home existentes de PixelArt: libro de tapa dura apaisado 29x21, inclinado en diagonal, completo dentro del lienzo, fondo blanco limpio y sombra suave. No debe verse como una foto suelta; debe verse claramente como producto/libro.

[PROTAGONISTAS EN LA PORTADA]
Solo dos personas en la portada del libro:
- Papá Leo: hombre latino de 58 años, cabello canoso oscuro, barba corta prolija, presencia serena, protectora y elegante.
- Mateo: hijo adulto latino de 32 años, apariencia madura, sobria y agradecida.
La relación debe leerse inequívocamente como padre e hijo adulto, nunca pareja, nunca niño. No incluir hija, no incluir tercera persona.

[ESTRUCTURA DEL MOCKUP]
Render 3D hiperrealista de un libro de tapa dura cerrado, proporción física apaisada 29x21. El libro aparece inclinado en diagonal con leve rotación antihoraria y reclinado hacia atrás en 3D, como mockup premium. Fondo blanco puro. Sombra de contacto suave. Libro completo dentro del lienzo, con aire visual mínimo para poder recortar después sin perder esquinas.

[PORTADA DEL LIBRO]
La tapa muestra a Papá Leo y Mateo en una azotea elegante al atardecer, ciudad cálida desenfocada, tono editorial adulto. Papá Leo y Mateo deben verse cercanos, familiares y agradecidos, sin gesto romántico. Hilos de luz dorada muy sutiles como memoria familiar, sin fantasía infantil.

[TEXTO EN LA PORTADA]
Título superior: "Papá, mi héroe" en dorado elegante con relieve, legible, impreso sobre la tapa.
Texto inferior pequeño: "Papá Leo".
Usar capitalización española correcta: solo "Papá" con mayúscula inicial, "mi héroe" en minúsculas.

[ESTILO]
Hiperrealismo fotográfico/editorial, tapa dura mate, iluminación de estudio de producto, tonos azul noche, dorado cálido y madera. Premium, sobrio, emocional.

[RESTRICCIONES]
No pixel art, no ilustración, no dibujo, no caricatura. No mesa, no manos sosteniendo, no logos externos, no marcas de agua. No cortar el libro. No incluir fondo escénico fuera del libro; solo fondo blanco de estudio.
```

## Prompt corregido — Miniatura Catálogo

Archivo final:
`IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png`

Generar fuente en `1600x1200`; postprocesar manteniendo `1600x1200`.

```text
Genera una imagen horizontal 1600x1200 para miniatura/card de catálogo web. Debe ser un mockup de libro personalizado, fotorrealista, sobrio y limpio.

[OBJETIVO]
Crear la miniatura de catálogo de "Papá, mi héroe" versión adultos. El resultado debe parecer un producto editorial premium de PixelArt: libro de tapa dura cerrado, proporción física apaisada 29x21, casi de frente, completo, con fondo blanco limpio y sombra suave.

[PROTAGONISTAS EN LA PORTADA]
Solo dos personas en la portada del libro:
- Papá Leo: hombre latino de 58 años, cabello canoso oscuro, barba corta prolija, presencia serena, protectora y elegante.
- Mateo: hijo adulto latino de 32 años, apariencia madura, sobria y agradecida.
La relación debe leerse inequívocamente como padre e hijo adulto, nunca pareja, nunca niño. No incluir hija, no incluir tercera persona.

[ESTRUCTURA DEL MOCKUP]
Render 3D hiperrealista de un libro de tapa dura cerrado, proporción física apaisada 29x21, casi de frente, sobre fondo blanco puro. El libro ocupa 88-92% del ancho, con esquinas completas visibles, canto inferior claro, sombra de contacto suave y lomo delgado visible a la izquierda.

[PORTADA DEL LIBRO]
La portada muestra a Papá Leo y Mateo en una azotea elegante al atardecer, ciudad cálida desenfocada, tono editorial adulto. Ambos miran hacia la ciudad o comparten un gesto familiar de gratitud. La escena comunica legado, admiración y agradecimiento. Hilos de luz dorada muy sutiles detrás de Papá Leo, sin superhéroe literal.

[TEXTO EN LA PORTADA]
Título superior: "Papá, mi héroe" en dorado elegante con relieve, legible, impreso sobre la tapa.
Texto inferior pequeño: "Papá Leo".
Usar capitalización española correcta: solo "Papá" con mayúscula inicial, "mi héroe" en minúsculas.

[ESTILO]
Hiperrealismo premium, producto editorial, tapa dura mate, iluminación de estudio. Familiar adulto, emotivo y limpio.

[RESTRICCIONES]
No pixel art, no ilustración, no dibujo, no caricatura. No marcas de agua, no logos externos. No cortar el libro. No mostrar mesa ni manos sosteniendo. No incluir hija ni tercera persona.
```
