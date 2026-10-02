"""Poemas adultos de "Siempre en mi Corazón Abuela Adulto" (modelo 9865).

Libro memorial: una nieta de treinta y tantos hablándole a la abuela que ya no está.
Tres estrofas de cuatro versos, rima AABB, imágenes de la escena de cada plantilla.
Mundo propio de la abuela (telar, hierbas, pollera, mazamorra, patio de tierra) para
que no se cruce con los libros de padre, madre y abuelo, que comparten los 20 temas.
"""

NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

# 1. Porque eres mi Superheroína — INICIO
POEMS[1] = {
    "nieta": f"""{NICK}, tu capa era una manta
y tu escudo, la garganta:
decías dos palabras tuyas
y se acababan las bullas

Criaste nietos y gallinas
en el mismo patio, con espinas
de hierba entre los dedos,
y nunca tuviste miedos

Hoy pido ayuda para todo
y me cansa cualquier modo
de día largo, y tú jamás
te sentabas ni un compás""",
}

# 2. Porque eres mi Guía — MEDIO
POEMS[2] = {
    "nieta": f"""Hablabas poco, y en quechua
cuando el asunto era de deudas
del alma, y yo entendía
sin saber lo que decía

Me guiabas con la mirada
en la mesa, {NICK}, y bastaba
un gesto para entender
si me tocaba ceder

Hoy explico por escrito
y repito lo ya dicho,
y nadie entiende ni la mitad
de lo que tú decías sin hablar""",
}

# 3. Porque eres una Hechicera — FINAL
POEMS[3] = {
    "nieta": f"""Tenías un huerto de hierbas
detrás de las dos puertas:
muña, ruda y manzanilla
para cada pesadilla

Sabías cuál era para el susto
y cuál para el disgusto,
y preparabas la infusión
rezando una oración

Hoy busco en internet
cuál hierba es para qué,
y no encuentro, {NICK}, el rezo
que le ponías de regreso""",
}

# 4. Porque eres una Líder — INICIO
POEMS[4] = {
    "nieta": f"""{NICK}, decidías en la cocina
y la familia lo asumía,
no hacía falta discutir:
tu olla era el porvenir

Repartías las tareas
sin discursos ni peleas:
una mirada bastaba
y la casa funcionaba

Hoy pido las cosas tres veces
y nadie me obedece,
y me falta tu silencio
que valía por un decreto""",
}

# 5. Porque eres Encantadora — MEDIO
POEMS[5] = {
    "nieta": f"""Te llamaban de otras casas
para hablar con las cuñadas
que ya no se saludaban,
y volvían a ser hermanas

Sabías oír sin receta,
{NICK}, y sin dar la respuesta,
dejabas hablar completo
y al final decías lo cierto

Hoy escucho con el celular
en la mano, sin mirar
la cara de quien me habla,
y pierdo lo que faltaba""",
}

# 6. Porque eres Aventurera — FINAL
POEMS[6] = {
    "nieta": f"""Te ibas al mercado a las cuatro
y volvías como un retrato
con la manta bien cargada
de papas y de granada

Caminabas más que un camión
y decías que era pasión
y no falta de pasaje,
aunque faltaba el coraje

Hoy tomo taxi dos cuadras
y me quejo de las cargas,
y extraño, {NICK}, esa manta
y el mercado a la madrugada""",
}

# 7. Porque eres Divertida — INICIO
POEMS[7] = {
    "nieta": f"""{NICK}, te reías con la boca
tapada, como si fuera poca
cosa reírse muy fuerte,
y temblaba todo el mueble

Contabas los mismos cuentos
con remates muy violentos
de risa, y nos moríamos
aunque ya los sabíamos

Hoy me río para afuera,
medida, como quien espera
permiso, y me hace falta
tu risa tapada y alta""",
}

# 8. Porque cumples mis Deseos — MEDIO
POEMS[8] = {
    "nieta": f"""Quería una muñeca de caja
y me tejiste una de lana
con dos botones por ojos
y una pollera de rojos

En una bolsa de tela
la guardo, {NICK}, y me duela
o no, la saco en agosto
y le arreglo el mismo rostro

Hoy compro lo que me gusta
y nada me dura ni ajusta
como esa muñeca torcida
que sigue siendo la mía""",
}

# 9. Porque eres Valiente — FINAL
POEMS[9] = {
    "nieta": f"""Cuando todos se fueron al norte
te quedaste, sin más corte,
cuidando una casa vacía
y una tierra que no daría

No lloraste en la despedida:
cocinaste para la ida,
pusiste todo en bolsitas
y saludaste desde la esquina

Hoy me despido por pantalla
y lloro antes de la falla
de señal, y pienso en tu mano,
{NICK}, saludando temprano""",
}

# 10. Porque eres una Soñadora — INICIO
POEMS[10] = {
    "nieta": f"""{NICK}, querías ver el mar
y lo decías al pasar,
como quien pide permiso
para un sueño muy preciso

Te llevamos a los ochenta,
te quedaste media hora atenta
mirando, sin meter los pies,
y dijiste "ya está bien"

Hoy viajo cuando quiero
y casi nunca lo prefiero,
y entiendo que el mar no importaba:
importaba que alguien te llevara""",
}

# 11. Porque me haces sentir Segura — MEDIO
POEMS[11] = {
    "nieta": f"""Dormíamos las tres juntas
en un colchón sin preguntas,
tú al borde, por si acaso,
y yo pegada a tu brazo

Cuando tronaba rezabas
en voz baja, {NICK}, y pasaba:
el trueno seguía igual
pero ya no me hacía mal

Hoy duermo sola y con ruido
de la calle, y he aprendido
que ninguna cerradura
suena como esa dulzura""",
}

# 12. Porque eres Generosa — FINAL
POEMS[12] = {
    "nieta": f"""Cocinabas para diez
cuando éramos seis,
y el resto se repartía
entre quien pasaba ese día

Nunca dijiste que faltaba:
estirabas lo que quedaba
con más agua y más papa,
y salía igual de guapa

Hoy cocino medido y exacto
y me sobra casi un plato
que termino tirando; perdón,
{NICK}, por ese renglón""",
}

# 13. Porque eres Atrevida — INICIO
POEMS[13] = {
    "nieta": f"""{NICK}, te subiste a un caballo
a los setenta, sin fallo,
porque alguien dijo que no podías,
y diste dos vueltas ese día

Usabas pollera roja
cuando el luto era la moda,
y decías que de negro
nadie vuelve, ni el abuelo

Hoy me visto de prudente
para no incomodar a la gente,
y guardo esa pollera
donde se vea, la primera""",
}

# 14. Porque eres una Rebelde — MEDIO
POEMS[14] = {
    "nieta": f"""Dejaste de ir a la misa
cuando el cura, con sonrisa,
habló mal de las que crían
sin marido y sin porfía

Rezabas igual en la casa,
{NICK}, con tu propia traza,
sin permiso de nadie
y con un solo santo al aire

Hoy discuto en los grupos
y me bloquean algunos,
y entiendo que lo tuyo
era irse sin barullo""",
}

# 15. Porque eres Alegre — FINAL
POEMS[15] = {
    "nieta": f"""Cantabas huaynos lavando
y el patio iba contestando
con las gallinas y el viento,
y era fiesta en cualquier momento

Hacías mazamorra morada
sin que fuera fecha marcada,
y el olor llegaba a la esquina
y venía toda la vecina

Hoy compro postres de vitrina
y ninguno me ilumina
la tarde como aquella olla,
{NICK}, ni esa bulla criolla""",
}

# 16. Porque eres mi Guardiana de Historias — INICIO
POEMS[16] = {
    "nieta": f"""{NICK}, sabías los apodos
de los muertos y de todos
los vivos del caserío,
y por qué se fue el tío

Contabas de cuando el río
se llevó medio sembrío
y nadie se murió de hambre
porque todos dieron parte

Hoy nadie cuenta esas cosas
y las fechas quedan sosas,
yo pregunto y nadie acierta,
y escribo lo que recuerda""",
}

# 17. Porque eres mi Raíz y mi Fuerza — MEDIO
POEMS[17] = {
    "nieta": f"""Tejías de noche en el telar
lo que vendías al pasar
el camión de los domingos,
y de ahí salieron los ladrillos

Tu fuerza estaba en la paciencia
de la lana, {NICK}, y la ausencia
de apuro: deshacer lo torcido
y empezar otra vez, sin ruido

Hoy compro ropa barata
y ninguna me abraza
como esa chompa marrón
que sigue entera en el cajón""",
}

# 18. Porque eres mi Estrella Guía — FINAL
POEMS[18] = {
    "nieta": f"""No me enseñaste a rezar
de memoria, sino a mirar
la vela antes de dormir
y agradecer sin pedir

Decías que el que agradece
tiene la casa que merece,
y que pedir sin dar nada
deja la puerta cerrada

Hoy no rezo, pero cuento
en voz baja, antes del sueño,
tres cosas que salieron bien,
y en las tres, {NICK}, estás también""",
}

# 19. Porque eres mi Viajera del Tiempo — INICIO
POEMS[19] = {
    "nieta": f"""{NICK}, el tiempo en tu cocina
iba al ritmo de la harina:
ni muy rápido ni lento,
al punto y a su tiempo

Nunca te vi mirar la hora,
mirabas si ya estaba la mora
en el árbol, o si el pan
había subido o no más

Hoy mido en minutos todo
y llego tarde de igual modo,
y pienso que tu reloj
era mejor que el de hoy""",
}

# 20. Porque eres mi Ángel Guardián — MEDIO
POEMS[20] = {
    "nieta": f"""No te pienso con alas blancas:
te pienso con esas mangas
subidas, la masa en la mesa
y la radio con su novela

Cuando amaso en la mañana
te hablo, {NICK}, y no me extraña
que me salga igual que a ti:
las manos aprendieron de aquí

Si hay algo al otro lado
que no sea un patio arreglado
con gallinas y con sol,
devuélvelo, no es tu rol""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio"  for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final"  for p in (3, 6, 9, 12, 15, 18)},
}
