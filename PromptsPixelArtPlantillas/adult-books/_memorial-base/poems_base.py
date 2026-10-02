"""Base poems for the four memorial books that share the same 20 themes.

Mi Ángel Guardián (infant 1063) and Siempre en mi Corazón (infant 1112) carry the
IDENTICAL 20 themes; each splits into two adult books by relative:

    1063 -> Mi Ángel Guardián Padre (9866, M) · Madre (9867, F)
    1112 -> Siempre en mi Corazón Abuelo (9864, M) · Abuela (9865, F)

One poem per theme and gender covers all four books. These are memorial books — the
person has died — so the register is gratitude and continued presence, never cheerful
nostalgia. Adult voice, three stanzas of four lines, strict AABB (each couplet rhymes
and the two couplets of a stanza rhyme differently), lines under 45 characters.
"""

NICK = "{APODO_DESTINATARIO}"
BASE: dict[int, dict[str, str]] = {}

BASE[1] = {  # Porque eres mi Superhéroe — INICIO
"M": f"""Mi {NICK}, no usaste armadura,
pero algo en ti me daba la altura.
Nadie supo tus noches en vela,
ni el peso que cargabas sin que duela.

Te fuiste y vi la cuenta verdadera
de todo lo que hacías sin que viera.
Los silencios, la espalda bien plantada,
la calma que montabas de madrugada.

Hoy soy quien sostiene, y sé el oficio:
no hay capa, no hay aplauso, no hay servicio.
Solo alguien que se queda y no lo dice,
igual que te quedabas, sin aviso.""",
"F": f"""Mi {NICK}, no usaste armadura,
pero algo en ti me daba la altura.
Nadie supo tus noches en vela,
ni el peso que cargabas sin que duela.

Te fuiste y vi la cuenta verdadera
de todo lo que hacías sin que viera.
Los silencios, la espalda bien plantada,
la calma que montabas de madrugada.

Hoy soy quien sostiene, y sé el oficio:
no hay capa, no hay aplauso, no hay servicio.
Solo alguien que se queda y no lo dice,
igual que te quedabas, sin aviso.""",
}

BASE[2] = {  # Porque eres mi Guía — MEDIO
"M": f"""Nunca dijiste por dónde avanzar.
Ibas delante y bastaba mirar.
Yo seguía tus pasos en la tierra
y así aprendí a leer cada sierra.

Hoy que no estás, mi {NICK},
el camino quedó sin tu perfil.
Y descubrí que llevo tu manera
aunque nadie me marque la frontera.

Ya no te necesito para andar.
Eso me diste, y cuesta de explicar:
irte sabiendo que podía seguir,
y dejar el rumbo escrito en mi vivir.""",
"F": f"""Nunca dijiste por dónde avanzar.
Ibas delante y bastaba mirar.
Yo seguía tus pasos en la tierra
y así aprendí a leer cada sierra.

Hoy que no estás, mi {NICK},
el camino quedó sin tu perfil.
Y descubrí que llevo tu manera
aunque nadie me marque la frontera.

Ya no te necesito para andar.
Eso me diste, y cuesta de explicar:
irte sabiendo que podía seguir,
y dejar el rumbo escrito en mi vivir.""",
}

BASE[3] = {  # Porque eres un Hechicero — FINAL
"M": f"""Tu magia era una cosa muy sencilla:
que lo feo durara una orilla.
Un chiste cuando el día se torcía,
una moneda que aparecía.

No había truco. Había decisión.
Elegías el asombro sin razón,
y donde todos veían un problema
abrías una puerta y otro tema.

Hoy saco yo conejos del sombrero
delante de unos ojos que no espero.
Y si me sale limpio el embeleso,
es tuyo, {NICK}, y vuelves con eso.""",
"F": f"""Tu magia era una cosa muy sencilla:
que lo feo durara una orilla.
Un chiste cuando el día se torcía,
una moneda que aparecía.

No había truco. Había decisión.
Elegías el asombro sin razón,
y donde todos veían un problema
abrías una puerta y otro tema.

Hoy saco yo conejos del sombrero
delante de unos ojos que no espero.
Y si me sale limpio el embeleso,
es tuyo, {NICK}, y vuelves con eso.""",
}

BASE[4] = {  # Porque eres un Rey Líder — INICIO
"M": f"""Mi {NICK}, reinaste sin corona
y sin que te votara una persona.
Mandabas poco y te seguían mucho:
eso no se ordena, se hace a pulso.

Lo tuyo era llegar primero al frío,
servir al final y cerrar el bullicio.
Un trono de madrugadas enteras
y una justicia que nadie supera.

Hoy me toca decidir por otra gente
y pienso en ti antes de ser valiente.
Mandar no es levantar más la voz:
es cargar lo que nadie quiere, y veloz.""",
"F": f"""Mi {NICK}, reinaste sin corona
y sin que te votara una persona.
Mandabas poco y te seguían mucho:
eso no se ordena, se hace a pulso.

Lo tuyo era llegar primero al frío,
servir al final y cerrar el bullicio.
Un trono de madrugadas enteras
y una justicia que nadie supera.

Hoy me toca decidir por otra gente
y pienso en ti antes de ser valiente.
Mandar no es levantar más la voz:
es cargar lo que nadie quiere, y veloz.""",
}

BASE[5] = {  # Porque eres Encantador — MEDIO
"M": f"""Entrabas a un lugar y se encendía.
No por ruido: por tu cortesía.
Preguntabas el nombre a cualquiera
y al rato ya tenías compañera.

Eso, mi {NICK}, no era simpatía.
Era creer que el otro valía.
La gente lo notaba sin saber
explicar por qué daba gusto volver.

Hoy cuando entro a un sitio y nadie
me conoce, y el silencio me invade,
hago lo que te vi hacer tantas veces:
pregunto un nombre y el muro se mece.""",
"F": f"""Entrabas a un lugar y se encendía.
No por ruido: por tu cortesía.
Preguntabas el nombre a cualquiera
y al rato ya tenías compañera.

Eso, mi {NICK}, no era simpatía.
Era creer que el otro valía.
La gente lo notaba sin saber
explicar por qué daba gusto volver.

Hoy cuando entro a un sitio y nadie
me conoce, y el silencio me invade,
hago lo que te vi hacer tantas veces:
pregunto un nombre y el muro se mece.""",
}

BASE[6] = {  # Porque eres Aventurero — FINAL
"M": f"""Para ti un día libre era un país.
Salíamos sin plan y sin matiz,
y el cerro de atrás se nos volvía
expedición con nombre y travesía.

Nunca hizo falta un viaje de verdad.
Bastaba la quebrada y la ciudad,
una linterna, un termo, dos galletas
y tu certeza de cosas secretas.

Hoy que pago aviones y hoteles
descubro lo que entonces me vendiste:
que el viaje no vivía en la distancia.
Vivía en ti, {NICK}, en cómo exististe.""",
"F": f"""Para ti un día libre era un país.
Salíamos sin plan y sin matiz,
y el cerro de atrás se nos volvía
expedición con nombre y travesía.

Nunca hizo falta un viaje de verdad.
Bastaba la quebrada y la ciudad,
una linterna, un termo, dos galletas
y tu certeza de cosas secretas.

Hoy que pago aviones y hoteles
descubro lo que entonces me vendiste:
que el viaje no vivía en la distancia.
Vivía en ti, {NICK}, en cómo exististe.""",
}

BASE[7] = {  # Porque eres Divertido — INICIO
"M": f"""Mi {NICK}, reías con el cuerpo.
De esas risas que no caben adentro,
que arrancan en los hombros sin permiso
y acaban con alguien pidiendo juicio.

No es que todo te pareciera gracia.
Es que elegías esa residencia.
Habiendo tanto motivo de amargura,
te quedabas siempre con la locura.

Hoy hay silencios donde iba tu risa
y se notan en la mesa, de prisa.
Pero también me salen tus chistes malos,
y entonces vuelves, y volvemos a estarlo.""",
"F": f"""Mi {NICK}, reías con el cuerpo.
De esas risas que no caben adentro,
que arrancan en los hombros sin permiso
y acaban con alguien pidiendo juicio.

No es que todo te pareciera gracia.
Es que elegías esa residencia.
Habiendo tanto motivo de amargura,
te quedabas siempre con la locura.

Hoy hay silencios donde iba tu risa
y se notan en la mesa, de prisa.
Pero también me salen tus chistes malos,
y entonces vuelves, y volvemos a estarlo.""",
}

BASE[8] = {  # Porque cumples mis Deseos — MEDIO
"M": f"""No me diste todo lo que pedí,
y hoy lo agradezco más que lo que vi.
Me diste aquello que yo no sabía
nombrar, ni pedir, ni veía.

Tiempo, mi {NICK}. Eso fue el regalo.
Las horas que no vuelven, y lo valgo.
Sentarte a escuchar una tontería
como si el mundo se detendría.

Ahora que el tiempo es lo que menos tengo
entiendo la medida de aquel ruego.
Y lo reparto igual que tú lo hacías:
despacio, con los míos, y sin prisa.""",
"F": f"""No me diste todo lo que pedí,
y hoy lo agradezco más que lo que vi.
Me diste aquello que yo no sabía
nombrar, ni pedir, ni veía.

Tiempo, mi {NICK}. Eso fue el regalo.
Las horas que no vuelven, y lo valgo.
Sentarte a escuchar una tontería
como si el mundo se detendría.

Ahora que el tiempo es lo que menos tengo
entiendo la medida de aquel ruego.
Y lo reparto igual que tú lo hacías:
despacio, con los míos, y sin prisa.""",
}

BASE[9] = {  # Porque eres Valiente — FINAL
"M": f"""Te vi tener miedo más de una vez.
Esa es la parte que nadie ve después.
La mandíbula apretada en la cocina
y al rato en la mesa, como si nada.

Por eso sé que el valor no es no temblar.
Es temblar y poner igual el hombro.
Es volver al trabajo al otro día
cuando adentro se cayó todo el escombro.

Aprendí eso mirándote de lado,
sin que supieras que te había mirado.
Y hoy lo uso cuando algo me destroza:
{NICK}, tu temblor, y sigo en la cosa.""",
"F": f"""Te vi tener miedo más de una vez.
Esa es la parte que nadie ve después.
La mandíbula apretada en la cocina
y al rato en la mesa, como si nada.

Por eso sé que el valor no es no temblar.
Es temblar y poner igual el hombro.
Es volver al trabajo al otro día
cuando adentro se cayó todo el escombro.

Aprendí eso mirándote de lado,
sin que supieras que te había mirado.
Y hoy lo uso cuando algo me destroza:
{NICK}, tu temblor, y sigo en la cosa.""",
}

BASE[10] = {  # Porque eres un Soñador — INICIO
"M": f"""Mi {NICK}, creíste en unas cosas
que no llegaste a ver hechas y hermosas.
Y aun así las seguiste nombrando
como si ya estuvieran esperando.

Muchos te dijeron que era tarde.
Tú seguías midiendo aquel alarde:
el taller que montabas algún día,
el viaje que empezaba todavía.

Algunos de esos sueños heredé.
Los tengo acá, en mi lista, y los sostendré.
Y si alguno se cumple, va firmado
con tu letra, aunque esté disimulado.""",
"F": f"""Mi {NICK}, creíste en unas cosas
que no llegaste a ver hechas y hermosas.
Y aun así las seguiste nombrando
como si ya estuvieran esperando.

Muchos te dijeron que era tarde.
Tú seguías midiendo aquel alarde:
el taller que montabas algún día,
el viaje que empezaba todavía.

Algunos de esos sueños heredé.
Los tengo acá, en mi lista, y los sostendré.
Y si alguno se cumple, va firmado
con tu letra, aunque esté disimulado.""",
}

BASE[11] = {  # Porque me haces sentir a Salvo — MEDIO
"M": f"""De chico dormía con la puerta abierta
porque del pasillo venía tu alerta.
Pasos, un vaso, la radio bajita:
el sonido exacto de la casa escrita.

Hoy, mi {NICK}, duermo en otro lado
y el pasillo no suena a tu pasado.
Me acostumbré, que no es lo mismo
que dejar de esperar ese abismo.

Pero hay noches en que el mundo me aprieta
y me descubro oyendo la receta.
No hay nadie. Y aun así me da consuelo
haber tenido eso, y tenerlo en el suelo.""",
"F": f"""De chica dormía con la puerta abierta
porque del pasillo venía tu alerta.
Pasos, un vaso, la radio bajita:
el sonido exacto de la casa escrita.

Hoy, mi {NICK}, duermo en otro lado
y el pasillo no suena a tu pasado.
Me acostumbré, que no es lo mismo
que dejar de esperar ese abismo.

Pero hay noches en que el mundo me aprieta
y me descubro oyendo la receta.
No hay nadie. Y aun así me da consuelo
haber tenido eso, y tenerlo en el suelo.""",
}

BASE[12] = {  # Porque eres Generoso — FINAL
"M": f"""Dabas cosas que no te sobraban.
Ahí está lo que a otros les faltaba:
no el que reparte lo que no hace falta,
sino el que parte en dos lo que le basta.

Vi tu plato achicarse muchas veces
para que el de otro no se despereza.
Y nunca lo nombraste, ni un segundo,
ni esperaste que lo viera el mundo.

Hoy lo intento y me sale a la mitad:
me acuerdo de que di, y pierdo bondad.
Pero sigo, porque sé de quién lo aprendí:
de ti, {NICK}, y de tu mesa aquí.""",
"F": f"""Dabas cosas que no te sobraban.
Ahí está lo que a otros les faltaba:
no el que reparte lo que no hace falta,
sino el que parte en dos lo que le basta.

Vi tu plato achicarse muchas veces
para que el de otro no se despereza.
Y nunca lo nombraste, ni un segundo,
ni esperaste que lo viera el mundo.

Hoy lo intento y me sale a la mitad:
me acuerdo de que di, y pierdo bondad.
Pero sigo, porque sé de quién lo aprendí:
de ti, {NICK}, y de tu mesa aquí.""",
}

BASE[13] = {  # Porque eres Atrevido — INICIO
"M": f"""Mi {NICK}, tuviste un estilo
que no copiaste de ningún sigilo.
La camisa que nadie se ponía,
el sombrero fuera de su día.

Te daba igual lo que dijera el barrio.
Entrabas con lo tuyo y era diario.
Y uno de chico se avergüenza un rato
hasta que entiende el valor del acto.

Hoy me pongo cosas que no pegan
y me acuerdo de ti y no me ciegan.
Resulta que el ridículo se pasa
y lo que queda es ser uno en la casa.""",
"F": f"""Mi {NICK}, tuviste un estilo
que no copiaste de ningún sigilo.
La blusa que nadie se ponía,
el sombrero fuera de su día.

Te daba igual lo que dijera el barrio.
Entrabas con lo tuyo y era diario.
Y uno de chica se avergüenza un rato
hasta que entiende el valor del acto.

Hoy me pongo cosas que no pegan
y me acuerdo de ti y no me ciegan.
Resulta que el ridículo se pasa
y lo que queda es ser una en la casa.""",
}

BASE[14] = {  # Porque eres un Rebelde — MEDIO
"M": f"""Rompiste reglas que nadie tocaba
y lo hiciste sin alzar una traba.
Simplemente no te acomodabas
a lo que injusto te parecía.

Eso, mi {NICK}, tuvo su precio:
puertas cerradas, más de un desprecio.
Lo sé de grande, y hoy lo valoro
más que una vida fácil y sin coro.

Me enseñaste que portarse bien
no es lo mismo que obrar con desdén.
Y cada vez que callaría por cómodo
oigo tu voz y rompo mi acomodo.""",
"F": f"""Rompiste reglas que nadie tocaba
y lo hiciste sin alzar una traba.
Simplemente no te acomodabas
a lo que injusto te parecía.

Eso, mi {NICK}, tuvo su precio:
puertas cerradas, más de un desprecio.
Lo sé de grande, y hoy lo valoro
más que una vida fácil y sin coro.

Me enseñaste que portarse bien
no es lo mismo que obrar con desdén.
Y cada vez que callaría por cómodo
oigo tu voz y rompo mi acomodo.""",
}

BASE[15] = {  # Porque eres Alegre — FINAL
"M": f"""Volvías la lluvia una celebración.
Se iba la luz y era una expedición.
Se quemaba el almuerzo y era cuento.
Nada malo te duraba el momento.

No es que no te doliera lo que pasa.
Es que no le dejabas la casa.
Decidías el ánimo del día
como quien decide la comida.

Hoy, cuando algo se tuerce y me hundo,
pienso qué harías tú en ese segundo.
Y casi siempre me arranca una risa:
{NICK}, la lluvia, y la mesa sin prisa.""",
"F": f"""Volvías la lluvia una celebración.
Se iba la luz y era una expedición.
Se quemaba el almuerzo y era cuento.
Nada malo te duraba el momento.

No es que no te doliera lo que pasa.
Es que no le dejabas la casa.
Decidías el ánimo del día
como quien decide la comida.

Hoy, cuando algo se tuerce y me hundo,
pienso qué harías tú en ese segundo.
Y casi siempre me arranca una risa:
{NICK}, la lluvia, y la mesa sin prisa.""",
}

BASE[16] = {  # Porque eres mi Guardián de Historias — INICIO
"M": f"""Mi {NICK}, sabías nuestro origen:
quién era quién en cada imagen,
qué año fue el de la mudanza larga,
por qué cierto nombre nadie encarga.

Todo eso se fue contigo en una tarde.
Quedamos con las caras sin alarde,
con el dato a medias y la duda,
y las ganas tardías de tu ayuda.

Por eso ahora grabo a los que quedan.
Anoto, pregunto, guardo lo que heredan.
Alguien tiene que hacer lo que tú hacías,
y me tocó a mí, y son mis días.""",
"F": f"""Mi {NICK}, sabías nuestro origen:
quién era quién en cada imagen,
qué año fue el de la mudanza larga,
por qué cierto nombre nadie encarga.

Todo eso se fue contigo en una tarde.
Quedamos con las caras sin alarde,
con el dato a medias y la duda,
y las ganas tardías de tu ayuda.

Por eso ahora grabo a los que quedan.
Anoto, pregunto, guardo lo que heredan.
Alguien tiene que hacer lo que tú hacías,
y me tocó a mí, y son mis días.""",
}

BASE[17] = {  # Porque eres mi Raíz y mi Fuerza — MEDIO
"M": f"""Hay un árbol que plantaste de joven
y que sigue dando sombra sin que estorben.
Nadie lo riega y ahí sigue, terco,
más viejo que yo y bastante más cerco.

Así te quedaste, mi {NICK}:
debajo de todo, sin un ruido.
No se ve la raíz, pero sostiene,
y por eso lo de arriba se mantiene.

Cuando el viento me zarandea entero
y creo que esta vez sí me derrumbo,
algo bien hondo me sujeta y frena.
Eres tú. Sigues ahí. Y me rumbo.""",
"F": f"""Hay un árbol que plantaste de joven
y que sigue dando sombra sin que estorben.
Nadie lo riega y ahí sigue, terco,
más viejo que yo y bastante más cerco.

Así te quedaste, mi {NICK}:
debajo de todo, sin un ruido.
No se ve la raíz, pero sostiene,
y por eso lo de arriba se mantiene.

Cuando el viento me zarandea entero
y creo que esta vez sí me derrumbo,
algo bien hondo me sujeta y frena.
Eres tú. Sigues ahí. Y me rumbo.""",
}

BASE[18] = {  # Porque eres mi Estrella Guía — FINAL
"M": f"""Me dijeron de chico que mirara
la estrella más brillante y más clara.
Que eras tú. Y yo me lo creí
con esa fe que se tiene y vi.

Después crecí y supe que no era:
que la física no deja esa manera.
Y aun así la busco cada enero
como quien cumple con un agujero.

Da igual que la ciencia lo desmienta.
Levanto la cabeza y se me aumenta.
Y mientras siga haciéndolo en invierno,
{NICK}, sigues ahí, y yo en lo interno.""",
"F": f"""Me dijeron de chica que mirara
la estrella más brillante y más clara.
Que eras tú. Y yo me lo creí
con esa fe que se tiene y vi.

Después crecí y supe que no era:
que la física no deja esa manera.
Y aun así la busco cada enero
como quien cumple con un agujero.

Da igual que la ciencia lo desmienta.
Levanto la cabeza y se me aumenta.
Y mientras siga haciéndolo en invierno,
{NICK}, sigues ahí, y yo en lo interno.""",
}

BASE[19] = {  # Porque eres mi Viajero del Tiempo — INICIO
"M": f"""Mi {NICK}, contigo el tiempo era elástico.
Una tarde tuya duraba lo fantástico.
Empezabas a contar y de repente
andábamos los dos en otro ambiente.

Ahora el tiempo me pasa de otro modo:
rápido, apretado, y sin recodo.
Los días se parecen demasiado
y ninguno se queda en lo guardado.

Por eso cuando puedo me detengo
y cuento algo largo a quien entretengo.
Es lo único que sé para frenarlo,
y lo aprendí de ti, y vale usarlo.""",
"F": f"""Mi {NICK}, contigo el tiempo era elástico.
Una tarde tuya duraba lo fantástico.
Empezabas a contar y de repente
andábamos los dos en otro ambiente.

Ahora el tiempo me pasa de otro modo:
rápido, apretado, y sin recodo.
Los días se parecen demasiado
y ninguno se queda en lo guardado.

Por eso cuando puedo me detengo
y cuento algo largo a quien entretengo.
Es lo único que sé para frenarlo,
y lo aprendí de ti, y vale usarlo.""",
}

BASE[20] = {  # Porque eres mi Ángel Guardián — MEDIO
"M": f"""No creo en muchas cosas, y aun así
hay días en que juraría que estás aquí.
No con alas ni con nada de eso:
estás en cómo elijo cada peso.

Te hablo a veces, mi {NICK}, en voz alta,
manejando solo, cuando el ruido falta.
No espero respuesta. No hace falta.
Me alcanza con decirlo, y no me falta.

Si eso es tener un ángel, pues lo tengo.
Y si no lo es, igual con eso vengo.
Lo que quedó de ti me sigue cuidando,
y eso no se lo lleva ningún bando.""",
"F": f"""No creo en muchas cosas, y aun así
hay días en que juraría que estás aquí.
No con alas ni con nada de eso:
estás en cómo elijo cada peso.

Te hablo a veces, mi {NICK}, en voz alta,
manejando sola, cuando el ruido falta.
No espero respuesta. No hace falta.
Me alcanza con decirlo, y no me falta.

Si eso es tener un ángel, pues lo tengo.
Y si no lo es, igual con eso vengo.
Lo que quedó de ti me sigue cuidando,
y eso no se lo lleva ningún bando.""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio" for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final" for p in (3, 6, 9, 12, 15, 18)},
}
