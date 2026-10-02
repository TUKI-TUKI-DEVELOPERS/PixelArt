# Micro-piloto — Mamá, Mi Heroína adulto

Estas 4 plantillas validan la dirección adulta antes de producir las 40 plantillas del libro completo.

## Nombres de preview para generación de ejemplo

Para imágenes estáticas de selección no se imprimen placeholders. Se usan nombres/apodos de muestra:

| Rol | Nombre/apodo de preview |
|---|---|
| Mamá destinataria | `Mamá Elena` |
| Hijo adulto | `Mateo` |
| Hija adulta | `Valeria` |

Los campos BD conservan `{APODO_DESTINATARIO}`, `{NOMBRE_DESTINATARIO}` y `{NOMBRE_DEDICANTE}` para generación real con datos del cliente.

## Reglas aplicadas

- castellano neutral;
- poemas rimados;
- mamá como destinataria (`recipient`);
- hijo/hija adulto/a como dedicante (`dedicator`);
- magia madura, cálida y no infantil;
- relación familiar clara, sin romanticismo;
- nunca representar al dedicante como niño/a;
- dimensión propuesta: `1600x944`;
- preview estática debe parecer doble página interior de libro abierto, como el catálogo actual.

---

## 1. Hijo adulto → mamá — La luz que me enseñó a volver

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_SHE` |
| Idea Ralph | “Mi mamá siempre prendía una luz para mí.” |
| Intención adulta | Convertir la luz de casa en símbolo de guía, regreso y amor constante. |
| Título impreso | `LA LUZ QUE ME ENSEÑÓ A VOLVER` |

### Poema

```txt
Para {APODO_DESTINATARIO},
tu luz me esperaba sin preguntar,
como una ventana abierta al regresar.
Cuando la vida me hizo dudar,
tu voz fue camino para continuar.

Hoy soy adulto y puedo entender
lo que en silencio supiste sostener.
Si pierdo el rumbo al querer avanzar,
tu amor me recuerda cómo volver al hogar.
```

### Campos de prompt BD

```txt
scene_visual:
Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre al atardecer en la entrada de una casa cálida: {NOMBRE_DESTINATARIO}, la mamá adulta, está junto a {NOMBRE_DEDICANTE}, su hijo adulto, ambos de pie cerca de una puerta iluminada. Él no es niño; es un hombre adulto que vuelve a mirar a su mamá con gratitud serena. La relación debe leerse claramente como madre e hijo, sin romanticismo.

background_details:
Entrada de hogar elegante y real, luz cálida saliendo desde una ventana, plantas cuidadas, una mesa pequeña con llaves y una taza. El ambiente debe sentirse adulto, sobrio y familiar, sin elementos infantiles ni caricaturescos.

magic_effects:
La luz de la ventana forma hilos dorados muy sutiles que rodean la escena como símbolo de guía y regreso. La magia debe ser poética y discreta, no fantástica ni infantil.

lighting_color:
Luz cinematográfica de atardecer, tonos dorados, crema, madera y sombras suaves. Atmósfera nostálgica, cálida y esperanzadora.

poem_template:
Para {APODO_DESTINATARIO},
tu luz me esperaba sin preguntar,
como una ventana abierta al regresar.
Cuando la vida me hizo dudar,
tu voz fue camino para continuar.

Hoy soy adulto y puedo entender
lo que en silencio supiste sostener.
Si pierdo el rumbo al querer avanzar,
tu amor me recuerda cómo volver al hogar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 2. Hijo adulto → mamá — Tus manos hicieron hogar

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_SHE` |
| Idea Ralph | “Mi mamá hacía que todo se sintiera casa.” |
| Intención adulta | Mostrar que el hogar no era un lugar, sino una forma de cuidar. |
| Título impreso | `TUS MANOS HICIERON HOGAR` |

### Poema

```txt
Para {APODO_DESTINATARIO},
tus manos supieron cuidar sin hablar,
volver cada mesa un pequeño altar.
No hicieron ruido para enseñar:
me dieron raíces para caminar.

Hoy miro la vida con otra visión,
y entiendo la fuerza de tu corazón.
Si el mundo se vuelve difícil de amar,
tu ternura me enseña a volver a empezar.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, dentro de una cocina familiar elegante y luminosa. {NOMBRE_DESTINATARIO}, la mamá adulta, prepara o sirve café junto a {NOMBRE_DEDICANTE}, su hijo adulto. Ambos conversan con calma, como dos adultos unidos por años de cuidado. Ella no aparece como sirvienta ni como figura sacrificada: se muestra digna, cálida y fuerte. Él la acompaña con respeto y gratitud.

background_details:
Cocina sobria con madera clara, luz de mañana, vajilla sencilla, recetas antiguas, una planta y detalles de hogar real. Evitar estética infantil, exagerada o de caricatura.

magic_effects:
Pequeñas partículas doradas emergen de la taza, las recetas y la mesa, formando una casa minimalista de luz sobre el espacio compartido. La magia simboliza hogar y cuidado cotidiano.

lighting_color:
Luz de mañana suave, paleta cálida de crema, madera, dorado tenue y verdes naturales. Sensación limpia, íntima y premium.

poem_template:
Para {APODO_DESTINATARIO},
tus manos supieron cuidar sin hablar,
volver cada mesa un pequeño altar.
No hicieron ruido para enseñar:
me dieron raíces para caminar.

Hoy miro la vida con otra visión,
y entiendo la fuerza de tu corazón.
Si el mundo se vuelve difícil de amar,
tu ternura me enseña a volver a empezar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 3. Hija adulta → mamá — El espejo donde aprendí valor

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_SHE` |
| Idea Ralph | “Mi mamá me decía que yo podía.” |
| Intención adulta | Transformar la mirada de mamá en autoestima adulta para la hija. |
| Título impreso | `EL ESPEJO DONDE APRENDÍ VALOR` |

### Poema

```txt
Para {APODO_DESTINATARIO},
en tus ojos aprendí a confiar,
a verme completa, sin miedo a brillar.
Cuando mi voz no quería salir,
tu amor me enseñó que podía seguir.

Hoy camino firme, con luz y verdad,
y llevo tu ejemplo como claridad.
Si dudo de mí al volver a empezar,
tu mirada me enseña de nuevo a avanzar.
```

### Campos de prompt BD

```txt
scene_visual:
Una única fotografía continua, plana y a sangre completa, en una habitación elegante con un espejo grande y luz suave. {NOMBRE_DESTINATARIO}, la mamá adulta, está junto a {NOMBRE_DEDICANTE}, su hija adulta. Ambas miran el reflejo con serenidad y orgullo, no como una escena de vanidad, sino como símbolo de autoestima heredada. La hija es adulta, autónoma y segura; la mamá acompaña con una presencia cálida y respetuosa.

background_details:
Habitación sobria con espejo de marco fino, cortinas claras, flores discretas, una silla elegante y fotos familiares desenfocadas. Ambiente adulto, femenino sin clichés, real y emocional.

magic_effects:
El reflejo del espejo emite líneas doradas muy suaves que rodean a ambas como un halo de confianza. Debe sentirse simbólico y editorial, sin fantasía infantil.

lighting_color:
Iluminación suave de ventana, tonos crema, dorado pálido, rosa viejo y sombras delicadas. Atmósfera íntima, limpia y luminosa.

poem_template:
Para {APODO_DESTINATARIO},
en tus ojos aprendí a confiar,
a verme completa, sin miedo a brillar.
Cuando mi voz no quería salir,
tu amor me enseñó que podía seguir.

Hoy camino firme, con luz y verdad,
y llevo tu ejemplo como claridad.
Si dudo de mí al volver a empezar,
tu mirada me enseña de nuevo a avanzar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 4. Hija adulta → mamá — La fuerza dulce de tus brazos

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_SHE` |
| Idea Ralph | “El abrazo de mamá arregla todo.” |
| Intención adulta | Mostrar el abrazo como refugio emocional maduro, no dependencia infantil. |
| Título impreso | `LA FUERZA DULCE DE TUS BRAZOS` |

### Poema

```txt
Para {APODO_DESTINATARIO},
tus brazos supieron mi miedo calmar,
sin atarme nunca, sin hacerme dudar.
Fueron casa abierta, fueron claridad,
un refugio firme lleno de bondad.

Hoy llevo ese abrazo en mi forma de ser,
cuando toca perder, cuidar o crecer.
Si el mundo me exige dejar de sentir,
tu amor me recuerda que puedo seguir.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en un jardín o terraza familiar al atardecer. {NOMBRE_DESTINATARIO}, la mamá adulta, abraza a {NOMBRE_DEDICANTE}, su hija adulta, con ternura serena. La hija no debe verse como niña ni dependiente; es una mujer adulta que recibe un abrazo familiar desde la gratitud. La escena debe comunicar refugio, fuerza y amor maternal, sin romanticismo.

background_details:
Jardín o terraza con plantas maduras, mesa de té, manta ligera, luz dorada y detalles familiares sutiles. El ambiente debe sentirse real, adulto, cálido y elegante.

magic_effects:
Pequeñas hojas doradas y partículas de luz giran suavemente alrededor del abrazo, como símbolo de protección emocional y crecimiento. La magia debe ser mínima y poética.

lighting_color:
Atardecer dorado, tonos verdes suaves, crema y ámbar. Contraste delicado, piel natural, sensación de calma y cierre emocional.

poem_template:
Para {APODO_DESTINATARIO},
tus brazos supieron mi miedo calmar,
sin atarme nunca, sin hacerme dudar.
Fueron casa abierta, fueron claridad,
un refugio firme lleno de bondad.

Hoy llevo ese abrazo en mi forma de ser,
cuando toca perder, cuidar o crecer.
Si el mundo me exige dejar de sentir,
tu amor me recuerda que puedo seguir.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## Revisión requerida antes de generar

- [ ] ¿El tono se siente adulto y no infantil?
- [ ] ¿Las escenas se leen claramente como mamá + hijo/hija adulto/a?
- [ ] ¿Los poemas riman y emocionan sin sonar exagerados?
- [ ] ¿La magia se siente madura y no decorativa?
- [ ] ¿Se aprueba el presupuesto del micro-piloto?
- [ ] ¿Se aprueba dimensión `1600x944`?
