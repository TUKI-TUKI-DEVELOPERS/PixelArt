"""Poemas adultos de "Mi Ángel Guardián Padre Adulto" (modelo 9866).

Libro memorial: un hijo de treinta y tantos hablándole al padre que ya no está.
Tres estrofas de cuatro versos, rima AABB, imágenes de la escena de cada plantilla.
Escrito aparte del libro de madre a propósito: comparten los 20 temas, pero no
comparten ni un verso.
"""

NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

# 1. Porque eres mi Superhéroe — INICIO
POEMS[1] = {
    "hijo": f"""{NICK}, no tenías antifaz,
tenías un overol y paz,
cargabas la casa al hombro
sin pedir ningún asombro

Yo creía que eras eterno
porque aguantabas el invierno
sin quejarte ni una vez
y sin mostrar la vejez

Hoy cargo yo con la casa
y entiendo lo que pasa:
el traje no se hereda,
se gana cuando uno queda""",
}

# 2. Porque eres mi Guía — MEDIO
POEMS[2] = {
    "hijo": f"""Marcabas la senda sin mapa,
con la mano y con la capa
del abrigo señalando
por dónde seguir andando

Me enseñaste a leer la vereda
antes de soltar la rueda,
y a mirar, {NICK}, sin miedo
a quien venga de regreso

Hoy llevo yo la delantera
y alguien pequeño me espera,
le repito tu verdad:
"fíjate bien, y verás\"""",
}

# 3. Porque eres un Hechicero — FINAL
POEMS[3] = {
    "hijo": f"""Hacías magia con monedas
y con las cosas más quedas:
un clavo, un hilo, un botón
y aparecía la función

Nunca supe el secreto
de ese truco incompleto
que terminaba en risa
y en una mano precisa

Hoy mis trucos son de oficio:
firmar, cobrar, dar servicio,
pero guardo tu moneda,
{NICK}, por si algo queda""",
}

# 4. Porque eres un Rey Líder — INICIO
POEMS[4] = {
    "hijo": f"""{NICK}, tu trono era una silla
de plástico, en la orilla
del patio, y desde ahí
repartías el país

Juzgabas sin levantar la voz,
con una pausa feroz,
y la sentencia era clara:
"se arregla y se repara"

Hoy me toca decidir
y a veces no sé medir,
entonces busco tu calma
y la aplico sin alarma""",
}

# 5. Porque eres Encantador — MEDIO
POEMS[5] = {
    "hijo": f"""Entrabas y el cuarto cambiaba,
la pelea se desarmaba,
bastaba un chiste a tiempo
y volvía el buen momento

Tenías modales de otro siglo,
{NICK}, de barrio y de abrigo,
abrías la puerta primero
y saludabas al portero

Hoy nadie saluda al entrar
ni se para al saludar,
y yo me levanto igual:
es tu herencia, no el ritual""",
}

# 6. Porque eres Aventurero — FINAL
POEMS[6] = {
    "hijo": f"""Cualquier cosa era expedición:
una ferretería, un camión,
el cerro de la esquina
o una ruta clandestina

Me subías a la camioneta
y el viento abría la veta
de un día que no acababa
hasta que el sol se apagaba

Hoy viajo con reserva,
asiento y hora conserva,
y extraño salir sin saber,
{NICK}, dónde iba a amanecer""",
}

# 7. Porque eres Divertido — INICIO
POEMS[7] = {
    "hijo": f"""{NICK}, te disfrazabas de todo
con una sábana y un codo
roto; nos hacías reír
hasta no poder seguir

Bailabas mal y sin vergüenza,
con una gracia muy densa,
y la casa se venía abajo
sin más esfuerzo ni trabajo

Hoy me cuesta hacer el tonto,
me da pudor y me incomodo,
pero cuando lo consigo
sé muy bien de quién lo digo""",
}

# 8. Porque cumples mis Deseos — MEDIO
POEMS[8] = {
    "hijo": f"""Pedía un juguete importado
y llegabas con un armado
de madera y de alambre
que aguantó toda el hambre

No era el antojo ligero:
cumplías, {NICK}, lo primero,
lo que de verdad hacía falta
y nunca lo que más se gasta

Hoy puedo comprar lo que quiera
y casi nada me espera
con esa cara de sorpresa
que ponías sobre la mesa""",
}

# 9. Porque eres Valiente — FINAL
POEMS[9] = {
    "hijo": f"""No era que no tuvieras miedo:
era que igual dabas el dedo
para que alguien se agarrara
mientras la tormenta pasara

Te vi temblar una vez sola,
de espaldas, junto a la cola
del hospital, y volviste
diciendo que no era triste

Hoy tengo miedos de adulto
y ninguno es un insulto:
aprendí, {NICK}, a temblar
de espaldas, y a continuar""",
}

# 10. Porque eres un Soñador — INICIO
POEMS[10] = {
    "hijo": f"""{NICK}, dibujabas en hojas
la casa de tejas rojas,
con el taller a la izquierda
y un árbol que diera cuerda

No la construiste nunca,
el dinero siempre trunca,
pero el plano sigue aquí,
doblado, y lo seguí

Hoy pago una hipoteca
de una casa más hueca,
pero el árbol ya creció
y el taller lo haré yo""",
}

# 11. Porque me haces sentir a Salvo — MEDIO
POEMS[11] = {
    "hijo": f"""De noche dejaba el cuarto
sin trancar, no por espanto:
por oírte respirar
a dos pasos del umbral

Mientras tú estabas despierto
nada malo era cierto,
{NICK}, y lo que se acercaba
se iba por donde llegaba

Hoy soy yo el que no duerme
y escucho por si alguien teme,
me toca estar de este lado
del pasillo, y lo he aceptado""",
}

# 12. Porque eres Generoso — FINAL
POEMS[12] = {
    "hijo": f"""Pagabas rondas enteras
con los bolsillos de a veras
vacíos, y nadie sabía
que el mes no alcanzaría

Dabas antes del pedido
y después, hecho el olvido,
cambiabas de conversación
para evitar la mención

Hoy mido lo que presto
y llevo cuenta del resto,
pero suelto la cartera
si oigo, {NICK}, tu manera""",
}

# 13. Porque eres Atrevido — INICIO
POEMS[13] = {
    "hijo": f"""{NICK}, usabas camisa floreada
sin pedir permiso a nada,
y entrabas al sitio más fino
con tu mismo paso campesino

Sacaste a bailar a mi madre
en plena plaza, sin padre
ni testigo que valiera,
y la gente hizo rueda

Hoy me visto de gris oscuro
y evito el papel de apuro,
pero tengo tu camisa
y algún día me da risa""",
}

# 14. Porque eres un Rebelde — MEDIO
POEMS[14] = {
    "hijo": f"""Discutías con el cobrador
y defendías al vendedor
de la esquina, sin razón
aparente, por tesón

Todavía en la bodega
te nombran, {NICK}, y se alega
que paraste un atropello
sin cobrar por el consejo

Hoy pongo quejas por correo
y espero turno, y lo veo
razonable, aunque me falta
tu manera menos cauta""",
}

# 15. Porque eres Alegre — FINAL
POEMS[15] = {
    "hijo": f"""Llovía y sacabas las sillas
a la vereda, con cosquillas
en los pies, y nos mojaba
la misma agua que otros tapaban

Cantabas con la radio rota
una canción medio idiota
que ahora pongo en el celular
cuando el día se pone mal

Hoy la lluvia me da pereza
y me escondo con torpeza,
pero a veces salgo quieto,
{NICK}, y me mojo completo""",
}

# 16. Porque eres mi Guardián de Historias — INICIO
POEMS[16] = {
    "hijo": f"""{NICK}, guardabas cada cosa:
una entrada, una baldosa,
el recibo de la cuna,
un botón sin fortuna

Repetías la misma historia
con distinta trayectoria,
nadie te corregía el cuento
porque crecía con el tiempo

Hoy abrí esa caja de lata
y encontré tu letra exacta
en un papel doblado:
"para cuando no esté al lado\"""",
}

# 17. Porque eres mi Raíz y mi Fuerza — MEDIO
POEMS[17] = {
    "hijo": f"""Plantaste un árbol flaco
en el terreno más opaco
y hoy da sombra a la manzana
sin pedirle nada a mañana

Tu raíz no se alcanza a ver,
pero, {NICK}, sostiene en pie
lo que creíamos nuestro
y era tuyo por adentro

Hoy soy yo el tronco grueso
y me duele todo el hueso
de aguantar, y entiendo tarde
lo que costaba ese alarde""",
}

# 18. Porque eres mi Estrella Guía — FINAL
POEMS[18] = {
    "hijo": f"""No creo en señales del cielo
pero miro, por consuelo,
hacia donde señalabas
las noches que vigilabas

Decías que era un planeta
y que el nombre no interesa,
que lo importante es que esté
cada vez que uno lo ve

Hoy le muestro a mi hija
ese punto que no fija
nada, y cómo te llamabas,
{NICK}, y por qué lo mirabas""",
}

# 19. Porque eres mi Viajero del Tiempo — INICIO
POEMS[19] = {
    "hijo": f"""{NICK}, tu reloj atrasaba
y a nadie le molestaba,
llegábamos tarde a todo
y entrábamos de cualquier modo

El tiempo contigo era ancho:
una tarde entera era un año
y un domingo cualquiera
duraba una vida entera

Hoy mi reloj va adelante
y el día es un instante,
corro para ganar minutos
que después quedan mudos""",
}

# 20. Porque eres mi Ángel Guardián — MEDIO
POEMS[20] = {
    "hijo": f"""No sé si estás en algún sitio
ni me importa el requisito
de creer para sentirte,
alcanza con repetirte

Cuando algo me supera
hablo contigo, {NICK}, afuera,
no espero ya una respuesta:
alcanza con que esté puesta

Hace años que no te escucho
y te sigo oyendo mucho
en todo lo que hago bien
y en lo que dejo también""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
