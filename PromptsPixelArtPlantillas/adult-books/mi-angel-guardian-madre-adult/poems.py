"""Poemas adultos de "Mi Ángel Guardián Madre Adulto" (modelo 9867).

Libro memorial: una hija de treinta y tantos hablándole a la madre que ya no está.
Tres estrofas de cuatro versos, rima AABB, imágenes de la escena de cada plantilla.
Comparte los 20 temas con el libro de padre y no comparte ni un verso: son dos
libros escritos aparte, no una copia con el género cambiado.
"""

NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

# 1. Porque eres mi Superheroína — INICIO
POEMS[1] = {
    "hija": f"""{NICK}, no usabas uniforme:
un mandil y un peine enorme,
levantabas cuatro vidas
antes de las seis cumplidas

Nadie te vio descansar
ni te escuchó reclamar,
dormías la última
y amanecías la única

Hoy sostengo una familia
y se me cae la vigilia,
y pienso cómo lo hacías
sin aplausos ni guías""",
}

# 2. Porque eres mi Guía — MEDIO
POEMS[2] = {
    "hija": f"""No me dabas la solución,
me devolvías la cuestión,
y esperabas sin apuro
que yo sola diera el turno

Miraba cómo decidías
y copiaba, {NICK}, tus vías:
despacio, sin alboroto,
sin deberle nada a otro

Hoy me preguntan a mí
y contesto como aprendí:
pregunto de vuelta, y aguanto
el silencio, que es tanto""",
}

# 3. Porque eres una Hechicera — FINAL
POEMS[3] = {
    "hija": f"""Curabas con hierba y vapor,
con un trapo y buen humor,
y el dolor de barriga
se iba como una hormiga

Decías que era agua de anís
y era tu mano en mi nariz,
tu voz contando bajito
mientras pasaba el ratito

Hoy compro pastillas de marca
y leo todo lo que abarca
el prospecto, y no hay nada,
{NICK}, como tu mirada""",
}

# 4. Porque eres una Reina Líder — INICIO
POEMS[4] = {
    "hija": f"""{NICK}, reinabas en la cocina
sin corona y sin vitrina,
repartías el pan y la tarea
y nadie quedaba afuera

Las decisiones de la casa
se cocinaban a tu brasa:
escuchabas a los cuatro
y después hablabas un rato

Hoy dirijo a doce personas
y no uso ninguna corona,
escucho a todas primero
y decido al final, severo""",
}

# 5. Porque eres Encantadora — MEDIO
POEMS[5] = {
    "hija": f"""Entrabas al mercado y sabían
tu nombre, y te servían
lo mejor del mostrador
sin que pidieras favor

Conversabas con cualquiera,
{NICK}, con toda la vereda,
y volvías con la bolsa llena
y con una historia ajena

Hoy encargo por pantalla,
sin saludo y sin batalla,
la bolsa llega completa
y la conversación, secreta""",
}

# 6. Porque eres Aventurera — FINAL
POEMS[6] = {
    "hija": f"""Subías al cerro en sandalia
con dos bolsas y una toalla,
decías "hasta esa peña"
y llegábamos sin seña

No teníamos carro ni plata,
nos sobraba la caminata,
volvíamos quemadas y enteras
con tunas en las carteras

Hoy viajo en avión y me quejo
del asiento y del reflejo
del sol, y extraño ese cerro
contigo, {NICK}, y sin dinero""",
}

# 7. Porque eres Divertida — INICIO
POEMS[7] = {
    "hija": f"""{NICK}, encendías la radio
y bailabas con el trapo
en la mano, sin terminar
de limpiar ni de cantar

Te reías de ti primero,
contabas tu propio enredo
como chiste, y la semana
se volvía menos tirana

Hoy pago para distraerme,
con pantallas que me duermen,
y la risa más barata
me la dabas tú, sin plata""",
}

# 8. Porque cumples mis Deseos — MEDIO
POEMS[8] = {
    "hija": f"""Quería un vestido de tienda
y cosiste uno con la prenda
vieja de mi tía Lucila,
y salió una maravilla

Nunca pediste a cambio
nada, {NICK}, ni un abrazo,
guardabas los alfileres
y seguías con tus quehaceres

Hoy compro lo que quiero
y nada me queda entero
como ese vestido cosido
de noche, y sin ruido""",
}

# 9. Porque eres Valiente — FINAL
POEMS[9] = {
    "hija": f"""Firmaste sola el papel
que nadie quiso leer,
y volviste a hacer la cena
como si no hubiera pena

Nunca te vi llorar de frente,
lo hacías cuando no había gente,
de espaldas, junto al caño,
con el agua haciendo daño

Hoy lloro cuando me toca
y no me tapo la boca,
porque aprendí, {NICK}, al final,
que guardarlo cuesta igual""",
}

# 10. Porque eres una Soñadora — INICIO
POEMS[10] = {
    "hija": f"""{NICK}, querías ser maestra
y te quedaste en la puerta
de la escuela, limpiando
mientras otros iban entrando

Guardabas libros usados
en cajas, bien ordenados,
y leías de madrugada
cuando la casa callaba

Hoy soy yo la que enseña
en un aula pequeña,
y en cada lista que paso
te nombro, bajo y despacio""",
}

# 11. Porque me haces sentir a Salvo — MEDIO
POEMS[11] = {
    "hija": f"""Te quedabas hasta que el sueño
me ganaba el empeño,
sentada en el borde, quieta,
sin apagar la silueta

Con tu mano sobre mi frente
no existía el accidente,
{NICK}, ni la fiebre alta,
ni la noche que no acaba

Hoy duermo con alarma puesta
y reviso dos veces la puerta,
pero el único seguro
era tu mano, te lo juro""",
}

# 12. Porque eres Generosa — FINAL
POEMS[12] = {
    "hija": f"""Servías cinco platos
con comida para cuatro,
y el tuyo salía al final:
el más chico, y daba igual

Dabas lo que te faltaba
diciendo que te sobraba,
y nadie lo notó a tiempo,
ni yo, que estaba dentro

Hoy reparto mejor las porciones
y me sirvo sin razones
de culpa: me enseñó tu ausencia,
{NICK}, lo que no fue prudencia""",
}

# 13. Porque eres Atrevida — INICIO
POEMS[13] = {
    "hija": f"""{NICK}, te cortaste el pelo
un martes, sin más anhelo
que verte distinta un rato,
y salió bastante exacto

Fuiste al banco a reclamar
con la voz sin temblar
y la fila entera aplaudió
cuando el gerente cedió

Hoy mando correos formales
para pedir lo que vale,
y a veces cierro el teclado
y reclamo a tu estilo, al lado""",
}

# 14. Porque eres una Rebelde — MEDIO
POEMS[14] = {
    "hija": f"""Te peleaste con el director
por una nota y un error
que no era mío, y ganaste
sin alzar la voz un instante

Decían que eras pesada
y lo eras, {NICK}, y armada
de respuestas afiladas
contra las puertas cerradas

Hoy me dicen lo mismo a mí
y lo tomo como un sí,
como un apellido heredado
que me queda bien usado""",
}

# 15. Porque eres Alegre — FINAL
POEMS[15] = {
    "hija": f"""Cantabas mal y a todo pulmón
mientras fregabas el fogón,
y la casa entera sabía
que ese día había alegría

Poníamos la mesa afuera
cuando el sol daba en la acera,
y cenábamos sin apuro
con medio barrio seguro

Hoy mi casa está callada
y queda bien ordenada,
pero pongo esa canción
y vuelves, {NICK}, de un tirón""",
}

# 16. Porque eres mi Guardiana de Historias — INICIO
POEMS[16] = {
    "hija": f"""{NICK}, guardabas los nombres
de tíos, primos y hombres
que ya nadie recordaba,
y la fecha en que se casaba

Contabas de dónde veníamos
y por qué nos perdíamos
en Puno cada verano,
y quién nos tendió la mano

Hoy pregunto y nadie sabe,
se fue contigo la llave
de todo ese parentesco,
y escribo lo que recuerdo""",
}

# 17. Porque eres mi Raíz y mi Fuerza — MEDIO
POEMS[17] = {
    "hija": f"""Trajiste semillas guardadas
desde el pueblo, en bolsas gastadas,
y sembraste en una lata
lo que hoy da sombra a la casa

Tu fuerza no se veía,
{NICK}, se comía:
estaba en el arroz
y en levantarse a las dos

Hoy mi hija come lo mismo
y no sabe el abismo
que costó esa receta,
ni la mano que la aprieta""",
}

# 18. Porque eres mi Estrella Guía — FINAL
POEMS[18] = {
    "hija": f"""No miro al cielo a buscarte,
te busco en cualquier parte
donde algo queda bien hecho
y nadie reclama el derecho

Apareces en los detalles:
la ropa doblada en los valles
del cajón, la olla tapada,
la puerta bien cerrada

No necesito mirar arriba
para saber quién me cuida,
{NICK}: la luz que dejaste
está en lo que enseñaste""",
}

# 19. Porque eres mi Viajera del Tiempo — INICIO
POEMS[19] = {
    "hija": f"""{NICK}, medías en tareas,
no en horas ni en ideas:
"cuando termine esta ropa",
"cuando se enfríe la sopa"

Tu día tenía más horas
que el mío, y sin demoras
te alcanzaba para todo,
hasta para el que llegó solo

Hoy tengo una agenda llena
y el día no vale la pena
de tan corto; mido el reloj
y no me alcanza ni hoy""",
}

# 20. Porque eres mi Ángel Guardián — MEDIO
POEMS[20] = {
    "hija": f"""Ya hiciste todas las guardias
y cumpliste con las jornadas,
descansa de una vez, tranquila,
que esta casa ya camina

Te hablo mientras cocino,
{NICK}, y me sale fino
el guiso, igual que antes,
sin tus manos delante

Si hay algo después de esto
espero que sea un puesto
con silla y con ventana,
y que no limpies nada""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
