"""Poemas adultos de "Siempre Serás Parte de Mí Adulto" (modelo 9868).

Libro memorial entre hermanos: alguien de treinta y tantos hablándole al hermano o
la hermana que ya no está. Tres estrofas de cuatro versos, rima AABB, imágenes de la
escena de cada plantilla.

Las dos direcciones cambian el género del hermano recordado (M hermano, F hermana).
Los poemas hablan en segunda persona —"tú", "contigo", el apodo—, así que no hay
palabra que declinar y el texto vale igual para las dos. Cuando un poema necesite
género explícito, usar `declinado(masculino, femenino)` en vez de `ambos`.
"""

NICK = "{APODO_DESTINATARIO}"


def ambos(texto: str) -> dict[str, str]:
    """El poema habla en segunda persona: no hay género que declinar."""
    return {"hermano": texto, "hermana": texto}


def declinado(masculino: str, femenino: str) -> dict[str, str]:
    """Dos versiones porque el poema nombra al hermano recordado con género."""
    return {"hermano": masculino, "hermana": femenino}


POEMS: dict[int, dict[str, str]] = {}

# 1. Porque somos el Mejor Equipo — INICIO
POEMS[1] = ambos(f"""{NICK}, jugábamos de a dos
contra el barrio y contra el sol,
tú en el arco, yo adelante,
y ganábamos bastante

Teníamos un código cerrado
que nadie nos ha copiado:
dos dedos era "ya corre"
y un silbido era "se rompe"

Hoy juego solo y más grande,
sin nadie que me mande
al área cuando titubeo,
y pierdo casi todo el juego""")

# 2. Porque somos Cómplices de Travesuras — MEDIO
POEMS[2] = ambos(f"""Rompimos el vidrio del fondo
y juramos, muy redondo,
que había sido la pelota
sola, sin mano ni bota

Nos castigaron juntos
y a {NICK}, en esos puntos,
le daba risa la pared
mientras yo pasaba sed

Hoy pago los vidrios que rompo
y nadie se echa el plomo
por mí; firmo yo el papel
y me falta el cómplice fiel""")

# 3. Porque nuestras Locuras Tienen Sentido — FINAL
POEMS[3] = ambos(f"""Armamos un bote en la acequia
con cartón y una madeja
de pita; nadie creía,
y flotó todo ese día

Siempre defendiste la idea
antes de saber si era buena,
y por eso funcionaba:
porque nadie la dudaba

Hoy pido tres opiniones
antes de mover dos renglones,
y extraño esa manera
tuya, {NICK}, de ir sin espera""")

# 4. Porque resolvemos Todos los Misterios — INICIO
POEMS[4] = ambos(f"""{NICK}, hallamos una llave
oxidada en el desagüe,
y pasamos todo el verano
buscando el cerrojo en vano

Nunca abrimos nada con ella
pero inventamos la novela
completa: un túnel secreto
y un vecino muy inquieto

Hoy resuelvo cosas reales
y ninguna de ellas vale
lo que esa llave inventada
que todavía está guardada""")

# 5. Porque eres mi Compañía de Infinito — MEDIO
POEMS[5] = ambos(f"""Mirábamos el techo a oscuras
y contábamos locuras
de lo que íbamos a ser:
astronautas, o chofer

Nos cabía el infinito,
{NICK}, en ese cuartito
de dos camas y un ropero,
y sobraba el universo

Hoy tengo casa de verdad
y menos capacidad
de soñar; y me hace falta
tu voz desde la otra cama""")

# 6. Porque eres mi Copiloto Eterno — FINAL
POEMS[6] = ambos(f"""Manejábamos sin permiso
el carro por ese piso
inclinado del garaje:
tres metros y un gran viaje

Tú marcabas el trayecto
en un cuaderno imperfecto
y decías sin dudar
qué esquina ya era el mar

Hoy manejo con licencia
y me pesa la ausencia
del asiento de al lado:
hablo igual, {NICK}, de callado""")

# 7. Porque llegamos Hasta el Fin del Mundo — INICIO
POEMS[7] = ambos(f"""{NICK}, llegamos hasta el muro
que llamábamos futuro,
y detrás solo había
un terreno y una vía

No importaba lo que había:
volvíamos al otro día
a hacer el mismo recorrido
diciendo que era distinto

Hoy viajo lejos de verdad
y llego sin novedad
a sitios de nombre famoso,
y ninguno me da ese gozo""")

# 8. Porque viajamos en Nuestro Propio Tiempo — MEDIO
POEMS[8] = ambos(f"""Medíamos el tiempo en tandas
de dibujos y de mandas
del almuerzo, nunca en horas,
y nos sobraban las demoras

Un verano se estiraba
y con {NICK} no acababa:
cabían cuarenta inventos
y aún sobraban momentos

Hoy el año se me pasa
en tres reuniones y una casa
que atender; y pienso cuánto
nos duraba un solo canto""")

# 9. Porque volamos a Nunca Jamás — FINAL
POEMS[9] = ambos(f"""Saltábamos desde la cama
jurando que se volaba
si uno creía bastante,
y creíamos, y era antes

Una vez te rompiste el brazo
y no lloraste ni un rato:
dijiste que habías volado
dos segundos, y era un dato

Hoy no salto de ningún lado
y tengo el seguro pagado,
pero a veces, {NICK}, en sueños,
volamos los dos, pequeños""")

# 10. Porque nos Protegemos la Espalda — INICIO
POEMS[10] = ambos(f"""{NICK}, te pusiste delante
de los tres, en un instante,
y nadie tocó la puerta
del colegio: estabas alerta

Nunca me contaste nada
de eso, ni en la vuelta a casa,
y tampoco se lo dijiste
a mamá, que lo intuiste

Hoy me cuido solo, y bien,
y aun así miro el andén
buscando a alguien que llegue
a ponerse donde debe""")

# 11. Porque juntos Somos Invencibles — MEDIO
POEMS[11] = ambos(f"""Nos atamos dos toallas
al cuello, y las murallas
del barrio se hacían chicas:
nada nos daba fatiga

Contigo, {NICK}, no había
problema que durara un día:
se partía por la mitad
y perdía la gravedad

Hoy divido los problemas
con terapia y con esquemas,
y funciona, pero no igual:
falta el otro en el total""")

# 12. Porque somos Cazafantasmas de Miedos — FINAL
POEMS[12] = ambos(f"""Revisábamos el armario
con linterna y sin horario,
y decíamos "no hay nada"
aunque la sombra quedaba

El monstruo nunca salía
porque éramos dos, y sabía
que a dos no se les gana:
el miedo se reparte y sana

Hoy reviso solo la casa
y no hablo en voz alta,
pero cuando cruje algo
te nombro, {NICK}, y me calmo""")

# 13. Porque somos el Yin de mi Yang — INICIO
POEMS[13] = ambos(f"""{NICK}, tú ordenabas, yo rompía;
tú guardabas, yo perdía;
tú pensabas en la vuelta
y yo salía sin alerta

Nos decían que éramos distintos
como el agua y los ladrillos,
y era cierto, y funcionaba:
uno frenaba, otro arrancaba

Hoy me falta quien me frene
y hago cosas que conviene
no contar; te necesito
de freno, y no de mito""")

# 14. Porque eres mi Refugio Constante — MEDIO
POEMS[14] = ambos(f"""Cuando en casa había gritos
me iba a tu cuarto, y los pitos
de la discusión quedaban
detrás de una puerta blanca

No preguntabas nada, {NICK}:
corrías la silla y bastaba,
me dejabas la mitad
y seguías con tu verdad

Hoy pago un alquiler propio
con puerta y doble cerrojo,
y a veces busco de noche
una silla que se corre""")

# 15. Porque somos Rivales y Mejores Amigos — FINAL
POEMS[15] = ambos(f"""Nos peleábamos a diario
por el control y el horario
de la tele; a los diez
minutos ya estábamos bien

Me ganabas en el ajedrez
y yo escondía la nuez
de tu torre favorita,
y empatábamos la cita

Hoy nadie me discute nada
y gano cada jornada
sin esfuerzo; qué aburrido,
{NICK}, ganar sin tu partido""")

# 16. Porque cantamos la Misma Canción — INICIO
POEMS[16] = ambos(f"""{NICK}, sabíamos la cumbia
de memoria, letra y bulla,
y la cantábamos mal
en el carro familiar

Cuando entraba el estribillo
subías el tono un hilo
más de lo que se aguantaba,
y mamá nos apagaba

Hoy la escucho en el metro
y me salto ese trecho
que era tuyo, y no canto,
y el silencio queda largo""")

# 17. Porque eres la Magia de mi Invierno — MEDIO
POEMS[17] = ambos(f"""En julio hacía mucho frío
y armábamos un lío
de mantas en la sala
para ver la tele mala

Traías pan con mantequilla
y té, {NICK}, en la vajilla
rota, y era suficiente
para aguantar la corriente

Hoy tengo calefacción
y una manta de edición
limitada, y aun así
siento julio desde aquí""")

# 18. Porque nos reímos del Peligro — FINAL
POEMS[18] = ambos(f"""Bajamos el cerro en cartón
sin casco y sin razón,
nos raspamos las rodillas
y nos dolió de risa

Contábamos la caída
como hazaña repetida
cada almuerzo, aumentando
la altura y el barranco

Hoy mido el riesgo y lo evito,
leo el contrato chiquito,
y a veces, {NICK}, me provoca
tirarme otra vez por la roca""")

# 19. Porque nuestros Caminos Siempre se Cruzan — INICIO
POEMS[19] = ambos(f"""{NICK}, nos tocaron rutas distintas:
tú al sur, yo a las oficinas,
y aun así, cada tanto,
coincidíamos en el canto

Aparecías sin avisar
en el peor lugar
y en el mejor momento,
y todo quedaba en su asiento

Hoy ya nadie se me cruza
y las calles están desnudas
de esa casualidad
que nos daba la ciudad""")

# 20. Porque nuestro Vínculo es Eterno — MEDIO
POEMS[20] = ambos(f"""No se deshace lo que fuimos
porque uno se haya ido:
el nudo quedó hecho
y aguanta cualquier trecho

Te nombro poco, {NICK}, y despacio,
pero te hago siempre espacio
en cualquier conversación:
estás en cada versión

Si algo queda de nosotros
no es la foto ni los otros
recuerdos: es el modo
en que digo "nosotros" todo""")

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
