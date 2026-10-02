# Micro-piloto — Papá, Mi Héroe adulto

Estas 4 plantillas validan la dirección adulta antes de producir las 40 plantillas del libro completo.

## Nombres de preview para generación de ejemplo

Para las imágenes estáticas que el cliente verá al seleccionar plantillas, no se imprimen placeholders. Se usan nombres/apodos de muestra:

| Rol | Nombre/apodo de preview |
|---|---|
| Papá destinatario | `Papá Leo` |
| Hijo adulto | `Mateo` |
| Hija adulta | `Valeria` |

Los campos BD siguen usando `{APODO_DESTINATARIO}` para que, en generación real con fotos del cliente, el backend lo reemplace por el apodo real.

Reglas aplicadas:

- castellano neutral;
- poemas rimados;
- uso de `{APODO_DESTINATARIO}`;
- papá como destinatario (`recipient`);
- hijo/hija adulto/a como dedicante (`dedicator`);
- magia madura, cálida y no infantil;
- prompts pensados para imagen plana, no libro abierto con lomo pintado;
- dimensión de generación definida: `1600x944`;
- la vista previa de selección debe parecer un libro abierto, siguiendo `Papá, Mi Héroe/de-hijo-para-papa/PLANTILLA_1_Mi_Superhéroe_Personal.png`;
- debajo de cada poema debe aparecer un pequeño ornamento editorial familiar: casa dorada minimalista, centrada, sin parecer marca externa.

## 1. Hijo adulto → papá — El héroe que sostiene en silencio

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_HE` |
| Idea Ralph | “Mi papá arregla todo.” |
| Intención adulta | Reconocer que el heroísmo de papá no fue espectacular, sino constante, silencioso y cotidiano. |
| Título impreso | `EL HÉROE QUE SOSTIENE EN SILENCIO` |

### Poema

```txt
Para {APODO_DESTINATARIO},
tu voz fue refugio, tu calma, señal,
tu forma de amar, mi raíz principal.
Cuando el mundo exigía correr sin mirar,
me enseñaste a elegir, respirar y avanzar.

Hoy sé que tu fuerza no busca brillar:
sostiene mi vida sin hacerla pesar.
Tu amor fue mi casa, mi norte y verdad,
mi héroe sereno en cada ciudad.
```

### Campos de prompt BD

```txt
scene_visual:
Una única fotografía continua, plana y a sangre completa, que transmite admiración adulta hacia un padre cuya fuerza siempre estuvo en los gestos cotidianos. El papá aparece de pie junto a su hijo adulto en una azotea tranquila al atardecer; ambos miran la ciudad con serenidad, no como héroes de fantasía sino como dos hombres unidos por años de ejemplo, cuidado y respeto. El padre tiene postura firme y protectora, ropa sobria y elegante; el hijo adulto lo mira con orgullo contenido, con una mano apoyada suavemente en su hombro.

background_details:
Azotea urbana cálida, barandas discretas, ciudad al fondo con luces encendiéndose, cielo amplio de atardecer y detalles cotidianos apenas visibles: una taza de café, una chaqueta doblada, una vieja caja de herramientas. El fondo debe sentirse real, adulto y emocional, sin elementos infantiles.

magic_effects:
Pequeñas líneas de luz dorada emergen de los objetos cotidianos y forman, de manera sutil, una silueta abstracta de capa luminosa detrás del papá. La magia debe parecer una metáfora visual de su constancia, no un disfraz literal.

lighting_color:
Iluminación cinematográfica suave de atardecer, tonos dorados, azul profundo y ámbar. Contraste cálido, elegante y nostálgico.

poem_template:
Para {APODO_DESTINATARIO},
tu voz fue refugio, tu calma, señal,
tu forma de amar, mi raíz principal.
Cuando el mundo exigía correr sin mirar,
me enseñaste a elegir, respirar y avanzar.

Hoy sé que tu fuerza no busca brillar:
sostiene mi vida sin hacerla pesar.
Tu amor fue mi casa, mi norte y verdad,
mi héroe sereno en cada ciudad.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

## 2. Hijo adulto → papá — El taller de tus consejos

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_HE` |
| Idea Ralph | “Mi papá me enseñaba cosas mientras arreglaba algo.” |
| Intención adulta | Convertir el taller en símbolo de consejos, paciencia y aprendizaje de vida. |
| Título impreso | `EL TALLER DE TUS CONSEJOS` |

### Poema

```txt
Para {APODO_DESTINATARIO},
entre madera, café y metal,
guardaste paciencia en cada señal.
No solo arreglabas lo que iba a fallar:
me diste criterio para continuar.

Hoy vuelvo a tus frases con gratitud,
a tu modo sencillo de dar plenitud.
Si el mundo se rompe, recuerdo tu voz:
primero la calma, después el valor.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, dentro de un taller cálido y ordenado. El papá y su hijo adulto están junto a una mesa de madera con herramientas antiguas, planos y una lámpara encendida. El padre señala con calma una pieza sobre la mesa mientras el hijo adulto escucha con atención y una sonrisa serena, como quien comprende de adulto el valor de esas lecciones.

background_details:
Taller familiar elegante, paredes con madera oscura, herramientas colgadas con orden, estantes con objetos de años, una ventana lateral dejando entrar luz cálida. Nada debe sentirse caricaturesco ni infantil; el espacio debe parecer vivido, humano y cuidado.

magic_effects:
De las herramientas y planos salen líneas luminosas muy sutiles que se convierten en constelaciones pequeñas sobre la mesa, como si cada consejo antiguo encontrara su lugar en el presente.

lighting_color:
Luz cálida de lámpara de taller mezclada con atardecer suave desde la ventana. Paleta de madera, dorado tenue, café y azul grisáceo.

poem_template:
Para {APODO_DESTINATARIO},
entre madera, café y metal,
guardaste paciencia en cada señal.
No solo arreglabas lo que iba a fallar:
me diste criterio para continuar.

Hoy vuelvo a tus frases con gratitud,
a tu modo sencillo de dar plenitud.
Si el mundo se rompe, recuerdo tu voz:
primero la calma, después el valor.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

## 3. Hija adulta → papá — La mano que me levantó

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_HE` |
| Idea Ralph | “Mi papá siempre me daba la mano.” |
| Intención adulta | Mostrar que la protección de papá se convirtió en seguridad interior para la hija adulta. |
| Título impreso | `LA MANO QUE ME LEVANTÓ` |

### Poema

```txt
Para {APODO_DESTINATARIO},
cuando dudé del camino y de mí,
tu mano tranquila me trajo hasta aquí.
No hiciste promesas de fácil brillar:
me diste confianza para caminar.

Hoy llevo tu fuerza, tu abrazo y tu abrigo,
como una luz firme que camina conmigo.
Si tiembla la tarde o cambia el destino,
tu amor me recuerda cuál es mi camino.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en un puente peatonal tranquilo después de la lluvia. El papá camina al lado de su hija adulta, ambos vestidos de manera elegante y sencilla. Él no la carga ni la trata como niña; simplemente le ofrece una mano cercana y protectora mientras ella avanza con seguridad, mirando hacia adelante con gratitud.

background_details:
Puente urbano con piso húmedo reflejando luces cálidas, árboles al fondo, cielo despejándose después de la lluvia. El ambiente debe sentirse esperanzador, maduro y limpio, sin dramatismo oscuro.

magic_effects:
Pequeños reflejos dorados aparecen en los charcos y forman un camino luminoso delante de ambos, como símbolo de apoyo y confianza heredada.

lighting_color:
Luz suave posterior a la lluvia, reflejos dorados y tonos azul grisáceo. Atmósfera íntima, serena y esperanzadora.

poem_template:
Para {APODO_DESTINATARIO},
cuando dudé del camino y de mí,
tu mano tranquila me trajo hasta aquí.
No hiciste promesas de fácil brillar:
me diste confianza para caminar.

Hoy llevo tu fuerza, tu abrazo y tu abrigo,
como una luz firme que camina conmigo.
Si tiembla la tarde o cambia el destino,
tu amor me recuerda cuál es mi camino.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

## 4. Hija adulta → papá — Nuestro baile con el tiempo

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_HE` |
| Idea Ralph | “Bailaba parada sobre los pies de papá.” |
| Intención adulta | Transformar un recuerdo infantil en una escena adulta de gratitud, ternura y continuidad. |
| Título impreso | `NUESTRO BAILE CON EL TIEMPO` |

### Poema

```txt
Para {APODO_DESTINATARIO},
ya no soy la niña sobre tus pies,
pero aquel recuerdo florece otra vez.
La vida dio vueltas, cambió la canción,
y aún tu abrazo sostiene mi corazón.

Hoy bailo mis días con gratitud,
con tu cariño, tu paz y tu luz.
Si el tiempo me mueve sin preguntar,
tu ternura me vuelve a mi hogar.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en una sala cálida de hogar familiar. El papá y su hija adulta bailan suavemente, con una emoción tranquila y madura. No es una escena infantil: ella es adulta, se mueve con autonomía y abraza a su papá con gratitud. La composición debe transmitir memoria, ternura y paso del tiempo.

background_details:
Sala elegante y acogedora con luz cálida, un tocadiscos o parlante antiguo, fotografías familiares desenfocadas en una repisa, cortinas suaves y una alfombra sobria. El espacio debe sentirse adulto, familiar y real.

magic_effects:
De las fotografías del fondo salen destellos dorados muy suaves que flotan alrededor de ambos como pequeños recuerdos iluminados. Algunos destellos sugieren pasos de baile en el aire sin volverse caricaturescos.

lighting_color:
Iluminación cálida de interior, tonos dorados, crema y madera. Atmósfera íntima, nostálgica y luminosa.

poem_template:
Para {APODO_DESTINATARIO},
ya no soy la niña sobre tus pies,
pero aquel recuerdo florece otra vez.
La vida dio vueltas, cambió la canción,
y aún tu abrazo sostiene mi corazón.

Hoy bailo mis días con gratitud,
con tu cariño, tu paz y tu luz.
Si el tiempo me mueve sin preguntar,
tu ternura me vuelve a mi hogar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

## Revisión requerida antes de generar

- [ ] ¿El tono se siente adulto y no infantil?
- [ ] ¿Los poemas riman y emocionan sin sonar exagerados?
- [ ] ¿La magia se siente madura?
- [ ] ¿Las escenas sirven como dirección visual para PixelArt?
- [ ] ¿Se aprueba el presupuesto del micro-piloto?
- [x] Dimensión final confirmada: `1600x944`.
