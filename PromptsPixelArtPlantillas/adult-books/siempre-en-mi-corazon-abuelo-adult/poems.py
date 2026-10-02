"""Poemas adultos de "Siempre en mi Corazón Abuelo Adulto" (modelo 9864).

Libro memorial: un nieto de treinta y tantos hablándole al abuelo que ya no está.
Tres estrofas de cuatro versos, rima AABB, imágenes de la escena de cada plantilla.
Mundo propio del abuelo (chacra, herramientas, radio, cerro) para que no se cruce
con los libros de padre, madre y abuela, que comparten los mismos 20 temas.
"""

NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

# 1. Porque eres mi Superhéroe — INICIO
POEMS[1] = {
    "nieto": f"""{NICK}, tu fuerza era de pala,
no de músculo ni de bala,
movías la tierra temprano
con el sombrero en la mano

Levantaste cinco hijos
con dos surcos y unos fijos
jornales que no alcanzaban,
y nunca te lo cobraban

Hoy tengo un trabajo blando
y me quejo si ando
de pie más de dos horas,
y pienso en tus auroras""",
}

# 2. Porque eres mi Guía — MEDIO
POEMS[2] = {
    "nieto": f"""Me llevabas a la chacra
y no decías palabra:
señalabas la acequia
y esperabas mi respuesta

Miraba cómo medías
el riego, {NICK}, y las vías
del agua entre los surcos,
y aprendí sin discursos

Hoy enseño hablando mucho
lo que tú dejabas al surco
que hablara, y me pregunto
si no era mejor tu punto""",
}

# 3. Porque eres un Hechicero — FINAL
POEMS[3] = {
    "nieto": f"""Componías con un clavo
lo que el mundo había dañado:
la radio, la bicicleta,
el reloj y la carreta

Decías que no era magia,
que era paciencia y rabia
contra tirar las cosas,
y salían milagrosas

Hoy todo viene sellado
y nada se abre al costado,
tiro lo que se malogra
y te pido perdón, {NICK}, ahora""",
}

# 4. Porque eres un Líder — INICIO
POEMS[4] = {
    "nieto": f"""{NICK}, presidías la mesa
sin pedir ninguna pieza
de respeto: alcanzaba
el modo en que te sentabas

Repartías la palabra
como se reparte el agua:
primero el que tiene sed,
después el que tiene red

Hoy me toca presidir
reuniones y decidir,
y busco tu modo lento
de dejar hablar a ciento""",
}

# 5. Porque eres Encantador — MEDIO
POEMS[5] = {
    "nieto": f"""Te sacabas el sombrero
para hablar con cualquier obrero,
tratabas de usted al chofer
y de señora a la mujer

No dejabas ir a nadie
sin un pan, {NICK}, y un mate,
preguntabas por la familia
y te acordabas de la hija

Hoy saludo con la cabeza
y camino con prisa inglesa,
y esa herencia bien cortés
se me quedó en el ayer""",
}

# 6. Porque eres Aventurero — FINAL
POEMS[6] = {
    "nieto": f"""Cruzamos el río en balsa
porque el puente no alcanzaba,
dijiste "agárrate fuerte"
y nos reímos de la suerte

Subíamos de madrugada
sin linterna y sin nada,
llegábamos con el sol
y un termo de alcohol

Hoy pido permiso en la casa
para salir sin tardanza,
y me falta esa manera
tuya, {NICK}, de ir afuera""",
}

# 7. Porque eres Divertido — INICIO
POEMS[7] = {
    "nieto": f"""{NICK}, contabas el mismo chiste
cada almuerzo, y nadie insiste
en recordarte que ya fue:
nos reíamos otra vez

Imitabas al vecino,
al cura y al sobrino,
y mi abuela te miraba
riéndose, aunque te regañaba

Hoy mis chistes son de oficina
y se mueren en la esquina
del correo, sin vitrina,
y pienso en esa rutina""",
}

# 8. Porque cumples mis Deseos — MEDIO
POEMS[8] = {
    "nieto": f"""Pedí una bicicleta
y llegaste con la grieta
de una vieja bien pintada
que corría más que nada

No era la que yo quería:
era, {NICK}, la que servía
veinte años sin fallar,
y hoy la puedo pedalear

Hoy compro cosas que duran
dos años y se apuran
en romperse, y pienso en esa
bicicleta que no cesa""",
}

# 9. Porque eres Valiente — FINAL
POEMS[9] = {
    "nieto": f"""Le hablaste claro al patrón
con el sombrero en el bastón
y sin bajar la mirada,
y te costó la jornada

Volviste a casa sin trabajo
y sin decir nada abajo,
buscaste otro en la mañana
y seguiste con tus ganas

Hoy aguanto cosas peores
por un sueldo y sus honores,
y me pregunto qué dirías,
{NICK}, de estas cobardías""",
}

# 10. Porque eres un Soñador — INICIO
POEMS[10] = {
    "nieto": f"""{NICK}, querías una casa
con corredor y terraza
mirando al valle entero,
y la dibujabas primero

Juntabas ladrillo a ladrillo
cada cosecha, sin brillo,
y el techo llegó al final,
cuando ya te daba igual

Hoy vivo en un departamento
sin corredor y sin viento,
pero puse una banca afuera
mirando lo que se vea""",
}

# 11. Porque me haces sentir Seguro — MEDIO
POEMS[11] = {
    "nieto": f"""Dormía en el cuarto de atrás
con la ventana de par en par,
el perro afuera, y bastaba
oírte toser en la sala

Ningún trueno de febrero
pasaba, {NICK}, el alero
de esa casa mientras tú
roncabas en el bambú

Hoy tengo cámara y reja
y una alarma que se queja,
y duermo peor que en tu casa,
donde no cerraba nada""",
}

# 12. Porque eres Generoso — FINAL
POEMS[12] = {
    "nieto": f"""Dabas propina de más
al que cargaba el costal,
preguntabas por su nombre
y pagabas como un hombre

Repartías la cosecha
antes de guardar la fecha
de lo tuyo, y siempre faltaba
algo que igual alcanzaba

Hoy calculo lo que doy
y lo anoto donde estoy,
pero al ver una carretilla
suelto, {NICK}, la semilla""",
}

# 13. Porque eres Atrevido — INICIO
POEMS[13] = {
    "nieto": f"""{NICK}, pediste su mano
cantando, en pleno verano,
delante de todo el pueblo
y sin afinar un pelo

Te metiste a la laguna
vestido, sin más fortuna
que una apuesta de dos soles,
y ganaste a los mayores

Hoy lo pienso tres veces
antes de hacer mis preces,
y a veces me tiro al agua
solo por ver si me aguanta""",
}

# 14. Porque eres un Rebelde — MEDIO
POEMS[14] = {
    "nieto": f"""No firmaste ese documento
que firmaron todos a tiempo,
dijiste que no era justo
y aguantaste el disgusto

Te dieron la razón más tarde,
{NICK}, cuando ya era alarde
inútil, y nadie se acuerda
de quién aguantó la cuerda

Hoy firmo casi todo
y me acomodo de modo
que nadie se moleste,
y pienso en lo que cueste""",
}

# 15. Porque eres Alegre — FINAL
POEMS[15] = {
    "nieto": f"""Ponías la radio en el patio
y gritabas cada rato
con el fútbol, aunque el equipo
perdiera por cualquier motivo

Bailabas con mi abuela
una marinera entera
sin música, en la cocina,
solo porque había neblina

Hoy veo partidos callado
y solo, en un cuarto cerrado,
pero a veces grito un gol
y apareces, {NICK}, con el sol""",
}

# 16. Porque eres mi Guardián de Historias — INICIO
POEMS[16] = {
    "nieto": f"""{NICK}, sabías qué había
donde hoy hay una avenida:
un molino, un eucalipto
y el taller de don Benito

Contabas de la sequía
del cincuenta, y la alegría
del agua cuando volvió,
y nadie te interrumpió

Hoy busco esas esquinas
y el mapa no las adivina,
y lo único que me queda
es tu voz sobre la vereda""",
}

# 17. Porque eres mi Raíz y mi Fuerza — MEDIO
POEMS[17] = {
    "nieto": f"""Plantaste árboles jóvenes
en la ladera sin órdenes,
solo porque el cerro cedía
y nadie más lo veía

Ese cerro todavía aguanta
y la ladera, {NICK}, no espanta
a nadie cuando llueve fuerte,
porque tu raíz la sostiene

Hoy firmo informes de riesgo
y hablo de suelos y de sesgo,
y tú lo arreglaste antes
con una pala y dos guantes""",
}

# 18. Porque eres mi Estrella Guía — FINAL
POEMS[18] = {
    "nieto": f"""Me mostraste las tres marías
y el nombre que les decían
en quechua, y la hora exacta
para sembrar la alfalfa

Decías que el cielo es un reloj
que nunca falla ni hoy,
y que el que aprende a mirarlo
no necesita calendario

Hoy uso una aplicación
para saber la estación,
y salgo igual a mirar
el cielo, {NICK}, a esperar""",
}

# 19. Porque eres mi Viajero del Tiempo — INICIO
POEMS[19] = {
    "nieto": f"""{NICK}, no mirabas la hora:
mirabas cómo se demora
la sombra del molle en el piso,
y con eso tenías aviso

Un día tuyo tenía
tres cosechas y una tía
de visita, y aún sobraba
tarde para la baraja

Hoy tengo alarmas por hora
y el tiempo se me evapora,
corro de pantalla en pantalla
sin terminar ni una batalla""",
}

# 20. Porque eres mi Ángel Guardián — MEDIO
POEMS[20] = {
    "nieto": f"""No te imagino en el cielo:
te imagino en ese suelo
de la chacra, con la pala
y el sombrero de palma

Cuando riego las macetas
te hablo, {NICK}, y me contestas
con el olor de la tierra
mojada, que no se cierra

No sé si me oyes o no
y hace años que no me importó:
alcanza con que la costumbre
siga, y con que alumbre""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
