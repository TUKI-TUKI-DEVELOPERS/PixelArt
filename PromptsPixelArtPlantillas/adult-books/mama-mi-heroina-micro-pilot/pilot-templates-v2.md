# Micro-piloto v2 — Mamá, Mi Heroína adulto

Motivo del ajuste: el primer micro-piloto se sentía adulto, pero demasiado serio y homogéneo. La versión infantil funciona porque cada plantilla tiene una fantasía visual reconocible — ninja, heroína, capitana, maga, etc. La versión adulta debe conservar madurez, pero recuperar esa diferenciación conceptual.

## Regla nueva de diferenciación adulta

Cada plantilla adulta debe tener:

1. **Arquetipo adulto claro** — arquitecta, capitana, alquimista, jardinera, guardiana, estratega, etc.
2. **Escenario único** — no repetir cocina/ventana/abrazo/café como solución genérica.
3. **Objeto símbolo** — brújula, plano, faro, semilla, mapa, llave, telar, etc.
4. **Magia propia** — no solo partículas doradas; cada magia debe expresar la idea de esa plantilla.
5. **Paleta diferenciada** — madera/dorado, azul marino/faro, verde invernadero, cobre/alquimia, etc.
6. **Color editorial del título acorde al tema** — no usar dorado fijo en todas; el título y sus ornamentos deben tomar el color del arquetipo/escena.
7. **Ubicación variable del apodo** — no todos los poemas deben empezar con `Para {APODO_DESTINATARIO}`; algunos lo llevan al inicio, otros al medio y otros al cierre.

Adulto no significa plano o solemne: significa emocional, elegante y sano, pero visualmente memorable.

## Nombres de preview

| Rol | Nombre/apodo |
|---|---|
| Mamá destinataria | `Mamá Elena` |
| Hijo adulto | `Mateo` |
| Hija adulta | `Valeria` |

---

## 1. Hijo adulto → mamá — La arquitecta de mi calma

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_SHE` |
| Arquetipo adulto | Arquitecta emocional |
| Diferenciador visual | Estudio con planos, maqueta luminosa de hogar y líneas doradas de construcción emocional. |
| Título impreso | `LA ARQUITECTA DE MI CALMA` |
| Color del título | Bronce arquitectónico / champán cálido, con sombra café suave y separador cobre-marfil. |

### Poema

```txt
Para {APODO_DESTINATARIO},
con manos de luz supiste trazar
un techo de calma para descansar.
Cuando mi mundo quería caer,
tu amor fue estructura para sostener.

Hoy miro mi vida con otra razón,
y encuentro tus planos en mi corazón.
Si todo se mueve y vuelve a temblar,
tu voz me construye un lugar para estar.
```

### Campos de prompt BD

```txt
scene_visual:
Una única fotografía continua, plana y a sangre completa, con tono adulto, cálido y editorial. La escena ocurre en un estudio de arquitectura hogareño: {NOMBRE_DESTINATARIO}, la mamá adulta, observa junto a {NOMBRE_DEDICANTE}, su hijo adulto, una maqueta luminosa de una casa familiar sobre una mesa grande. No es arquitectura literal fría; es una metáfora visual de cómo ella construyó calma, criterio y hogar emocional. Él es adulto, autónomo, y la mira con gratitud madura. La relación debe leerse claramente como madre e hijo, sin romanticismo.

background_details:
Mesa de madera con planos, regla metálica, lápices, fotografías familiares pequeñas, lámpara cálida y una maqueta de casa minimalista. Estética premium, sobria y distinta a una cocina o sala común.

magic_effects:
Líneas doradas finas salen de los planos y levantan sobre la maqueta una estructura luminosa de hogar, como si el amor de mamá hubiera diseñado un refugio invisible. La magia debe parecer arquitectura emocional, no fantasía infantil.

lighting_color:
Luz cálida de lámpara de estudio, dorado tenue, madera oscura, crema y sombras suaves. Sensación de precisión, calma y memoria familiar.

poem_template:
Para {APODO_DESTINATARIO},
con manos de luz supiste trazar
un techo de calma para descansar.
Cuando mi mundo quería caer,
tu amor fue estructura para sostener.

Hoy miro mi vida con otra razón,
y encuentro tus planos en mi corazón.
Si todo se mueve y vuelve a temblar,
tu voz me construye un lugar para estar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 2. Hijo adulto → mamá — La capitana de mis tormentas

| Campo | Valor |
|---|---|
| Dirección | `HE_TO_SHE` |
| Arquetipo adulto | Capitana / guía de tormentas |
| Diferenciador visual | Muelle, faro, mapa náutico, cielo despejándose. |
| Título impreso | `LA CAPITANA DE MIS TORMENTAS` |
| Color del título | Marfil de faro con sombra azul petróleo y reflejos turquesa apagados. |

### Poema

```txt
Cuando hubo tormenta y miedo al andar,
tu pulso fue faro sobre mi mar.
No diste órdenes para vencer:
me diste confianza para no ceder.

Hoy, {APODO_DESTINATARIO}, cruzo con firme timón,
llevando tu calma dentro del corazón.
Si vuelve la lluvia queriendo mandar,
tu luz me recuerda cómo navegar.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en un muelle elegante al final de una tormenta suave. {NOMBRE_DESTINATARIO}, la mamá adulta, está junto a {NOMBRE_DEDICANTE}, su hijo adulto, frente a un mapa náutico extendido sobre una mesa de madera. Al fondo hay un faro moderno encendido y el cielo empieza a abrirse. Ella no parece capitana literal con disfraz; su presencia comunica dirección, temple y calma. Él es adulto y la acompaña con respeto, entendiendo de grande lo que ella sostuvo durante años.

background_details:
Muelle sobrio, faro blanco, cuerdas náuticas, brújula, mapa marino, chaquetas elegantes de lluvia y mar tranquilo con reflejos dorados. Evitar estética infantil o aventurera caricaturesca.

magic_effects:
La luz del faro se convierte en una ruta dorada sobre el mapa y luego sobre el agua, como una guía serena entre tormentas. La magia debe ser cinematográfica, elegante y simbólica.

lighting_color:
Azul marino, gris de lluvia suave, dorado del faro y luz cálida de cielo despejándose. Atmósfera de fuerza tranquila y esperanza.

poem_template:
Cuando hubo tormenta y miedo al andar,
tu pulso fue faro sobre mi mar.
No diste órdenes para vencer:
me diste confianza para no ceder.

Hoy, {APODO_DESTINATARIO}, cruzo con firme timón,
llevando tu calma dentro del corazón.
Si vuelve la lluvia queriendo mandar,
tu luz me recuerda cómo navegar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 3. Hija adulta → mamá — La alquimista de lo cotidiano

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_SHE` |
| Arquetipo adulto | Alquimista cotidiana |
| Diferenciador visual | Cocina-botánica elegante, frascos, especias, vapor dorado, objetos comunes transformados en magia. |
| Título impreso | `LA ALQUIMISTA DE LO COTIDIANO` |
| Color del título | Ámbar alquímico con cobre y verde salvia, no dorado genérico. |

### Poema

```txt
Con poco lograste la vida encender,
volviste lo simple motivo de creer.
Donde otros veían rutina y deber,
tu amor hacía oro sin nada esconder.

Hoy guardo en mis manos tu forma de amar,
la magia pequeña de cada lugar.
Si el día parece perder su color,
tu ejemplo me lleva a ti, {APODO_DESTINATARIO}.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en una cocina-botánica adulta y elegante, como un pequeño laboratorio cálido de hogar. {NOMBRE_DESTINATARIO}, la mamá adulta, mezcla hierbas, especias o té junto a {NOMBRE_DEDICANTE}, su hija adulta. La escena debe sentirse como alquimia emocional: mamá transformando lo cotidiano en cuidado, alegría y fuerza. No debe parecer bruja infantil ni fantasía de cuento; es una metáfora sofisticada y luminosa.

background_details:
Mesa de piedra o madera clara, frascos de vidrio con especias, hierbas frescas, tetera, mortero, flores secas, cuaderno de recetas y luz de ventana. Ambiente adulto, sensorial y premium.

magic_effects:
Del vapor de la taza y de los frascos salen filamentos dorados, verdes y ámbar que forman pequeñas constelaciones domésticas sobre la mesa, como si cada gesto cotidiano revelara una magia secreta.

lighting_color:
Luz suave de mañana, dorado, ámbar, verde salvia y cobre. Texturas cálidas, orgánicas y elegantes.

poem_template:
Con poco lograste la vida encender,
volviste lo simple motivo de creer.
Donde otros veían rutina y deber,
tu amor hacía oro sin nada esconder.

Hoy guardo en mis manos tu forma de amar,
la magia pequeña de cada lugar.
Si el día parece perder su color,
tu ejemplo me lleva a ti, {APODO_DESTINATARIO}.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## 4. Hija adulta → mamá — La jardinera de mi valor

| Campo | Valor |
|---|---|
| Dirección | `SHE_TO_SHE` |
| Arquetipo adulto | Jardinera interior |
| Diferenciador visual | Invernadero, planta luminosa, raíces doradas, crecimiento emocional. |
| Título impreso | `LA JARDINERA DE MI VALOR` |
| Color del título | Verde salvia luminoso con borde crema cálido y acentos dorado musgo. |

### Poema

```txt
Me diste paciencia para florecer,
sin forzar mis ramas ni mi forma de ser.
Cuando dudé de mi propia raíz,
tu amor, {APODO_DESTINATARIO}, habló por mí.

Hoy crezco distinta, con luz y verdad,
y llevo en mis hojas tu serenidad.
Si cambia la estación y cuesta avanzar,
tu fe me recuerda que puedo brotar.
```

### Campos de prompt BD

```txt
scene_visual:
Una fotografía continua, plana y a sangre completa, en un invernadero elegante al atardecer. {NOMBRE_DESTINATARIO}, la mamá adulta, cuida junto a {NOMBRE_DEDICANTE}, su hija adulta, una planta grande y luminosa en el centro de una mesa. La escena no trata de jardinería literal solamente: simboliza cómo la mamá permitió crecer sin controlar, con paciencia y confianza. La hija es adulta, segura y agradecida, no una niña.

background_details:
Invernadero de vidrio con plantas maduras, herramientas finas de jardinería, macetas de cerámica, luz dorada entrando por los cristales y pequeñas fotos familiares entre hojas. Ambiente adulto, botánico y emocional.

magic_effects:
Raíces doradas visibles bajo la maceta se extienden sutilmente como líneas de luz hacia ambas, y algunas hojas brillan con pequeños destellos, símbolo de crecimiento interior y valor heredado.

lighting_color:
Verde profundo, dorado de atardecer, tierra cálida y reflejos suaves de vidrio. Atmósfera viva, esperanzadora y elegante.

poem_template:
Me diste paciencia para florecer,
sin forzar mis ramas ni mi forma de ser.
Cuando dudé de mi propia raíz,
tu amor, {APODO_DESTINATARIO}, habló por mí.

Hoy crezco distinta, con luz y verdad,
y llevo en mis hojas tu serenidad.
Si cambia la estación y cuesta avanzar,
tu fe me recuerda que puedo brotar.

character_roles:
[{"key":"recipient","count":1},{"key":"dedicator","count":1}]
```

---

## Costos para v2

| Escenario | Estimación |
|---|---:|
| 4 imágenes, 1 intento | `$0.16–$0.18` |
| Máximo 2 intentos | `$0.33–$0.36` |

## Revisión requerida antes de generar

- [ ] ¿Esta diferenciación adulta resuelve que las plantillas no parezcan todas iguales?
- [ ] ¿Se aprueban los 4 arquetipos?
- [ ] ¿Se genera v2 completo o solo reemplazos parciales?
