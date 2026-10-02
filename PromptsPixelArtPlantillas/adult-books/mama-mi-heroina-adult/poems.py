"""Original adult poems for "Mamá, Mi Heroína Adulto" (model 9861).

The book shipped with ONE poem skeleton repeated across its 40 templates, with the
title plugged into a slot. These are 20 new poems, one per theme, in both directions.

Written to the shape of the infant book so the two feel like one family: three
stanzas of four lines, AABB rhyme (Spanish assonance counts), imagery taken from
that template's own scene — the cape, the crown, the wand, the helm stay, because
the costume IS the theme. The voice is the only thing that grows up: a daughter or
son in their thirties looking back, not a child in the moment.

The nickname rotates by position instead of always opening the poem:
  inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20 · final 3,6,9,12,15,18
"""

NICK = "{APODO_DESTINATARIO}"

# position -> {"hija": poem, "hijo": poem}
POEMS: dict[int, dict[str, str]] = {}

POEMS[1] = {  # Mi Superheroína Sin Capa — apodo INICIO
"hija": f"""Mi {NICK}, hoy por fin lo puedo nombrar:
nunca tuviste capa y me enseñaste a volar.
Tu poder no venía de un don especial,
venía de quedarte, de amar sin igual.

Crecí y comprendí lo que entonces no vi:
que el mundo te pesaba y seguiste por mí.
Que hubo noches enteras de miedo callado
y amanecías firme, sin haber descansado.

Hoy sostengo mi vida con las manos abiertas,
y si no tengo miedo, es que dejaste puertas.
No fuiste invencible: fuiste mucho mejor,
fuiste la que siguió, y eso es el valor.""",
"hijo": f"""Mi {NICK}, hoy por fin lo puedo nombrar:
nunca tuviste capa y me enseñaste a volar.
Tu poder no venía de un don especial,
venía de quedarte, de amar sin igual.

Crecí y comprendí lo que entonces no vi:
que el mundo te pesaba y seguiste por mí.
Que hubo noches enteras de miedo callado
y amanecías firme, sin haber descansado.

Hoy sostengo mi vida con las manos abiertas,
y si no tengo miedo, es que dejaste puertas.
No fuiste invencible: fuiste mucho mejor,
fuiste la que siguió, y eso es el valor.""",
}

POEMS[2] = {  # La Guerrera Que Nunca Se Rinde — apodo MEDIO
"hija": f"""Peleaste batallas que nunca me contaste,
y en todas, sin saberlo, por mí te quedaste.
No vi tu escudo entonces, no vi tu armadura,
solo vi a una mujer sosteniendo la altura.

Ahora soy grande, mi {NICK}, y ya sé
todo lo que callaste para verme crecer.
Las veces que temblaste detrás de la puerta
y volviste a la mesa con la sonrisa puesta.

Si hoy me levanto cuando todo se cae,
es porque tu coraje aprendió a ser mi aire.
No me enseñaste a nunca tener miedo:
me enseñaste a avanzar con él, y puedo.""",
"hijo": f"""Peleaste batallas que nunca me contaste,
y en todas, sin saberlo, por mí te quedaste.
No vi tu escudo entonces, no vi tu armadura,
solo vi a una mujer sosteniendo la altura.

Ahora soy grande, mi {NICK}, y ya sé
todo lo que callaste para verme crecer.
Las veces que temblaste detrás de la puerta
y volviste a la mesa con la sonrisa puesta.

Si hoy me levanto cuando todo se cae,
es porque tu coraje aprendió a ser mi aire.
No me enseñaste a nunca tener miedo:
me enseñaste a avanzar con él, y puedo.""",
}

POEMS[3] = {  # Mi Reina Mi Todo — apodo FINAL
"hija": f"""Tu corona nunca estuvo hecha de oro,
sino de todo aquello que diste sin desdoro.
Reinaste una casa con muy poco en la mano
y aun así nada nos faltó, ni el verano.

Hoy que tengo mi mesa, mi techo, mi lugar,
entiendo lo que cuesta no dejar de dar.
Lo que pesaba el cetro que llevabas sonriendo,
lo que callaba el trono que seguías teniendo.

Si algo de realeza tengo, lo heredé de ti:
la frente levantada, el no rendirse aquí.
Y aunque me nombren de mil maneras,
mi {NICK}, mi reina, mi casa primera.""",
"hijo": f"""Tu corona nunca estuvo hecha de oro,
sino de todo aquello que diste sin desdoro.
Reinaste una casa con muy poco en la mano
y aun así nada nos faltó, ni el verano.

Hoy que tengo mi mesa, mi techo, mi lugar,
entiendo lo que cuesta no dejar de dar.
Lo que pesaba el cetro que llevabas sonriendo,
lo que callaba el trono que seguías teniendo.

Si algo de realeza tengo, lo heredé de ti:
la frente levantada, el no rendirse aquí.
Y aunque me nombren de mil maneras,
mi {NICK}, mi reina, mi casa primera.""",
}

POEMS[4] = {  # Mi Ángel Protector — apodo INICIO
"hija": f"""Mi {NICK}, tus alas nunca se vieron,
pero cada vez que caí, por algo me detuvieron.
No supe entonces cuánto me cubrías,
cuánto del frío de afuera tú me resolvías.

Hoy vivo lejos y hay noches de tormenta
en que la vida pesa y nadie se da cuenta.
Y algo me sostiene, algo que no veo,
y sé perfectamente de dónde es que viene.

No necesito verte para saber que estás.
Lo aprendí de niña y no lo olvido más.
Dondequiera que vaya, por donde yo ande,
tu amor sigue llegando, y me sigue alcanzando.""",
"hijo": f"""Mi {NICK}, tus alas nunca se vieron,
pero cada vez que caí, por algo me detuvieron.
No supe entonces cuánto me cubrías,
cuánto del frío de afuera tú me resolvías.

Hoy vivo lejos y hay noches de tormenta
en que la vida pesa y nadie se da cuenta.
Y algo me sostiene, algo que no veo,
y sé perfectamente de dónde es que viene.

No necesito verte para saber que estás.
Lo aprendí de niño y no lo olvido más.
Dondequiera que vaya, por donde yo ande,
tu amor sigue llegando, y me sigue alcanzando.""",
}

POEMS[5] = {  # La Maga de Mi Vida — apodo MEDIO
"hija": f"""Tu varita fue siempre una cuchara de palo,
y con ella encantabas lo difícil y lo malo.
Hacías de un día gris una tarde entera
y de una casa chica, la casa que yo quiera.

Tu magia, mi {NICK}, nunca fue ilusión:
era quedarte en vela, era pura decisión.
Era estirar lo poco hasta volverlo fiesta,
era inventar un juego si no había respuesta.

Hoy sé que los milagros se hacen a mano,
que no hay conjuro suelto ni prodigios lejanos.
Y cuando algo me sale mejor de lo esperado,
sonrío, porque sé de quién lo he heredado.""",
"hijo": f"""Tu varita fue siempre una cuchara de palo,
y con ella encantabas lo difícil y lo malo.
Hacías de un día gris una tarde entera
y de una casa chica, la casa que yo quiera.

Tu magia, mi {NICK}, nunca fue ilusión:
era quedarte en vela, era pura decisión.
Era estirar lo poco hasta volverlo fiesta,
era inventar un juego si no había respuesta.

Hoy sé que los milagros se hacen a mano,
que no hay conjuro suelto ni prodigios lejanos.
Y cuando algo me sale mejor de lo esperado,
sonrío, porque sé de quién lo he heredado.""",
}

POEMS[6] = {  # Mi Capitana del Corazón — apodo FINAL
"hija": f"""Llevaste este timón con el mar en contra,
sin mapa, sin relevo, sin que nadie responda.
Y aunque el agua subía por encima del casco,
jamás te vi soltar, jamás te vi de paso.

Hoy navego la mía y conozco el oficio:
lo que cuesta un rumbo, lo que pesa el servicio.
Las noches de guardia que nadie te agradece,
el puerto que se aleja justo cuando aparece.

Si sé hacia dónde ir cuando todo se nubla,
es porque te miré sostener en la bruma.
Gracias por el rumbo, por el norte, por el puerto,
mi {NICK}, mi capitana, mi mar abierto.""",
"hijo": f"""Llevaste este timón con el mar en contra,
sin mapa, sin relevo, sin que nadie responda.
Y aunque el agua subía por encima del casco,
jamás te vi soltar, jamás te vi de paso.

Hoy navego la mía y conozco el oficio:
lo que cuesta un rumbo, lo que pesa el servicio.
Las noches de guardia que nadie te agradece,
el puerto que se aleja justo cuando aparece.

Si sé hacia dónde ir cuando todo se nubla,
es porque te miré sostener en la bruma.
Gracias por el rumbo, por el norte, por el puerto,
mi {NICK}, mi capitana, mi mar abierto.""",
}

POEMS[7] = {  # Mi Ninja Silenciosa — apodo INICIO
"hija": f"""Mi {NICK}, cuántas cosas resolviste en silencio,
sin que yo lo supiera, sin pedir a cambio.
Llegaban los problemas y se iban sin ruido,
y yo dormía en paz, sin haberlos sentido.

Hoy pago mis cuentas y entiendo la maniobra:
lo que cuesta ese orden que de la nada se obra.
Las llamadas difíciles, lo que no cierran,
y la cara serena con que todo se encierra.

Tu arte fue ese: que yo nunca supiera.
Que mi infancia saliera entera, entera.
Hoy que sé lo que hiciste, lo digo sin medida:
no hay guerrera mayor que la escondida.""",
"hijo": f"""Mi {NICK}, cuántas cosas resolviste en silencio,
sin que yo lo supiera, sin pedir a cambio.
Llegaban los problemas y se iban sin ruido,
y yo dormía en paz, sin haberlos sentido.

Hoy pago mis cuentas y entiendo la maniobra:
lo que cuesta ese orden que de la nada se obra.
Las llamadas difíciles, lo que no cierran,
y la cara serena con que todo se encierra.

Tu arte fue ese: que yo nunca supiera.
Que mi infancia saliera entera, entera.
Hoy que sé lo que hiciste, lo digo sin medida:
no hay guerrera mayor que la escondida.""",
}

POEMS[8] = {  # Mi Amazona Guerrera — apodo MEDIO
"hija": f"""Te vi plantarte firme donde nadie se plantaba,
defender lo que era justo cuando nadie hablaba.
No bajabas la voz por quedar bien con alguien,
y eso, de niña, me pareció lo más grande.

Lo sigue siendo, mi {NICK}, lo sigue siendo hoy,
que ocupo mi lugar y digo quién soy.
Aprendí de ti que el respeto no se ruega:
se sostiene de pie, aunque cueste, y no se niega.

Si alguna vez me ves discutir sin temblar,
reconoce tu escuela, tu forma de luchar.
No me diste un consejo: me diste un ejemplo,
y me acompaña como acompaña un templo.""",
"hijo": f"""Te vi plantarte firme donde nadie se plantaba,
defender lo que era justo cuando nadie hablaba.
No bajabas la voz por quedar bien con alguien,
y eso, de niño, me pareció lo más grande.

Lo sigue siendo, mi {NICK}, lo sigue siendo hoy,
que ocupo mi lugar y digo quién soy.
Aprendí de ti que el respeto no se ruega:
se sostiene de pie, aunque cueste, y no se niega.

Si alguna vez me ves discutir sin temblar,
reconoce tu escuela, tu forma de luchar.
No me diste un consejo: me diste un ejemplo,
y me acompaña como acompaña un templo.""",
}

POEMS[9] = {  # Mi Diosa del Amor Eterno — apodo FINAL
"hija": f"""No hubo templo más alto que tu querer,
ni devoción más limpia que la de amanecer
una y otra vez por alguien más que tú,
sin pedir nunca el turno, sin pedir la luz.

Hoy que amo a otros y conozco lo que cuesta
sostener a alguien cuando el mundo no presta,
entiendo lo imposible de lo que hiciste,
y que lo hacías siempre, aun estando triste.

Si hay algo que me dure cuando ya no esté,
es la manera tuya de cuidar y de creer.
Eso no se termina, eso no se destierra:
mi {NICK}, mi eterna, mi amor sobre la tierra.""",
"hijo": f"""No hubo templo más alto que tu querer,
ni devoción más limpia que la de amanecer
una y otra vez por alguien más que tú,
sin pedir nunca el turno, sin pedir la luz.

Hoy que amo a otros y conozco lo que cuesta
sostener a alguien cuando el mundo no presta,
entiendo lo imposible de lo que hiciste,
y que lo hacías siempre, aun estando triste.

Si hay algo que me dure cuando ya no esté,
es la manera tuya de cuidar y de creer.
Eso no se termina, eso no se destierra:
mi {NICK}, mi eterna, mi amor sobre la tierra.""",
}

POEMS[10] = {  # Mi Titán Inquebrantable — apodo INICIO
"hija": f"""Mi {NICK}, cargaste mucho más que mi peso:
cargaste con la casa, con la deuda, con el rezo.
Y nunca te quebraste donde yo pudiera verte,
que esa fue tu manera callada de quererme.

Hoy cargo lo que puedo y no me alcanza,
y pienso en ti y respiro y recupero la confianza.
Porque si tú pudiste con todo aquel montón,
algo de esa materia me quedó en el corazón.

No eras de bronce, mamá, ya lo entendí.
Eras una mujer que decidió seguir.
Y eso es más grande que un monumento:
es elegir cada día, con el cuerpo y el aliento.""",
"hijo": f"""Mi {NICK}, cargaste mucho más que mi peso:
cargaste con la casa, con la deuda, con el rezo.
Y nunca te quebraste donde yo pudiera verte,
que esa fue tu manera callada de quererme.

Hoy cargo lo que puedo y no me alcanza,
y pienso en ti y respiro y recupero la confianza.
Porque si tú pudiste con todo aquel montón,
algo de esa materia me quedó en el corazón.

No eras de bronce, mamá, ya lo entendí.
Eras una mujer que decidió seguir.
Y eso es más grande que un monumento:
es elegir cada día, con el cuerpo y el aliento.""",
}

POEMS[11] = {  # Mi Samurái de Honor — apodo MEDIO
"hija": f"""Me enseñaste el honor sin decir la palabra:
cumpliendo lo prometido, sin una queja ni nada.
Nunca vi una promesa tuya quedar en el aire,
ni una deuda pequeña que dejaras al desgaire.

Esa disciplina, mi {NICK}, me quedó,
y hoy la llevo en el modo en que trabajo yo.
Llegar cuando se dice. Decir lo que se piensa.
Sostener la palabra aunque salga a mi expensa.

No hizo falta espada para enseñar el camino.
Bastó verte cumplir, en lo grande y lo mínimo.
Y si alguna vez dudo de cómo proceder,
me pregunto qué harías, y vuelvo a saber.""",
"hijo": f"""Me enseñaste el honor sin decir la palabra:
cumpliendo lo prometido, sin una queja ni nada.
Nunca vi una promesa tuya quedar en el aire,
ni una deuda pequeña que dejaras al desgaire.

Esa disciplina, mi {NICK}, me quedó,
y hoy la llevo en el modo en que trabajo yo.
Llegar cuando se dice. Decir lo que se piensa.
Sostener la palabra aunque salga a mi expensa.

No hizo falta espada para enseñar el camino.
Bastó verte cumplir, en lo grande y lo mínimo.
Y si alguna vez dudo de cómo proceder,
me pregunto qué harías, y vuelvo a saber.""",
}

POEMS[12] = {  # La Heroína Que No Necesita Capa — apodo FINAL
"hija": f"""No hizo falta disfraz ni ocasión especial:
tu heroísmo cabía en un martes normal.
En la ropa doblada, en la sopa servida,
en estar donde había que estar, toda la vida.

Hoy que llevo mi casa entiendo el tamaño
de eso que parecía tan pequeño y tan huraño.
Que lo extraordinario casi nunca se ve,
que ocurre en la cocina, de espaldas, sin saber.

Por eso, cuando pienso en quién fue grande,
no pienso en quien brilla ni en quien aplaude.
Pienso en ropa tendida, en la luz de la cocina,
en mi {NICK}, mi heroína cotidiana.""",
"hijo": f"""No hizo falta disfraz ni ocasión especial:
tu heroísmo cabía en un martes normal.
En la ropa doblada, en la sopa servida,
en estar donde había que estar, toda la vida.

Hoy que llevo mi casa entiendo el tamaño
de eso que parecía tan pequeño y tan huraño.
Que lo extraordinario casi nunca se ve,
que ocurre en la cocina, de espaldas, sin saber.

Por eso, cuando pienso en quién fue grande,
no pienso en quien brilla ni en quien aplaude.
Pienso en ropa tendida, en la luz de la cocina,
en mi {NICK}, mi heroína cotidiana.""",
}

POEMS[13] = {  # Tus Abrazos Mágicos — apodo INICIO
"hija": f"""Mi {NICK}, tus abrazos no curaban la herida,
pero hacían que doliera mucho menos la caída.
Y eso, que de niña me parecía magia,
hoy sé que es la presencia la medicina sabia.

Porque ya tengo años y he aprendido de dolor,
y sé que no se arregla ni se quita ni va a mejor.
Que lo que ayuda es que alguien se quede
mientras pasa la cosa, mientras el pecho cede.

Y eso tú lo sabías sin haberlo estudiado.
Lo sabías con el cuerpo, de tanto haber amado.
Por eso cuando alguien se me rompe al lado,
no digo nada: abrazo. Y pienso en lo heredado.""",
"hijo": f"""Mi {NICK}, tus abrazos no curaban la herida,
pero hacían que doliera mucho menos la caída.
Y eso, que de niño me parecía magia,
hoy sé que es la presencia la medicina sabia.

Porque ya tengo años y he aprendido de dolor,
y sé que no se arregla ni se quita ni va a mejor.
Que lo que ayuda es que alguien se quede
mientras pasa la cosa, mientras el pecho cede.

Y eso tú lo sabías sin haberlo estudiado.
Lo sabías con el cuerpo, de tanto haber amado.
Por eso cuando alguien se me rompe al lado,
no digo nada: abrazo. Y pienso en lo heredado.""",
}

POEMS[14] = {  # El Ritual Más Sagrado — apodo MEDIO
"hija": f"""Cada noche, sin falta, tu beso en la frente,
aunque el día estuviera torcido o diferente.
Nunca faltó ese gesto, ni una sola vez,
y yo lo recibía sin saber lo que es.

Hoy lo pienso y me desarma:
que al final del día aún quedara calma.
Que nada, mi {NICK}, de lo que hubo pasado,
pesaba más que el beso que lo dejaba cerrado.

Por eso cuando llego cansada a mi cama
y nadie me despide con una buena palabra,
cierro los ojos fuerte y me traigo tu frente,
y el día se me cierra igual, dulcemente.""",
"hijo": f"""Cada noche, sin falta, tu beso en la frente,
aunque el día estuviera torcido o diferente.
Nunca faltó ese gesto, ni una sola vez,
y yo lo recibía sin saber lo que es.

Hoy lo pienso y me desarma:
que al final del día aún quedara calma.
Que nada, mi {NICK}, de lo que hubo pasado,
pesaba más que el beso que lo dejaba cerrado.

Por eso cuando llego cansado a mi cama
y nadie me despide con una buena palabra,
cierro los ojos fuerte y me traigo tu frente,
y el día se me cierra igual, dulcemente.""",
}

POEMS[15] = {  # Recetas de Amor — apodo FINAL
"hija": f"""Nunca me diste una receta por escrito,
me diste algo más terco: el pulso y el ritmo.
La mano que calcula sin medir la sal,
el punto de la masa que se sabe y ya está.

Hoy cocino tus platos en mi propia cocina
y me salen distintos, con mi propia harina.
Pero el olor que sube cuando todo va bien
es exactamente el mismo de tu cocina de ayer.

Y ahí estás, de repente, sin haberte llamado,
en el vapor que empaña el vidrio del costado.
Por eso cuando cocino no cocino sola:
mi {NICK}, mi receta, mi mano en la olla.""",
"hijo": f"""Nunca me diste una receta por escrito,
me diste algo más terco: el pulso y el ritmo.
La mano que calcula sin medir la sal,
el punto de la masa que se sabe y ya está.

Hoy cocino tus platos en mi propia cocina
y me salen distintos, con mi propia harina.
Pero el olor que sube cuando todo va bien
es exactamente el mismo de tu cocina de ayer.

Y ahí estás, de repente, sin haberte llamado,
en el vapor que empaña el vidrio del costado.
Por eso cuando cocino no cocino solo:
mi {NICK}, mi receta, mi mano en la olla.""",
}

POEMS[16] = {  # Mi Valiente Compañera — apodo INICIO
"hija": f"""Mi {NICK}, me soltaste la mano en la puerta,
y yo no lo sabía, pero tú estabas alerta.
Me viste entrar sin verte, me viste no llorar,
y recién ahí, supongo, te pudiste quebrar.

Toda mi vida ha sido una serie de puertas
y en todas me soltaste con las tuyas abiertas.
El colegio, el trabajo, la casa, la ciudad:
cada vez más distancia, cada vez más verdad.

Hoy sé lo que te cuesta cada paso que doy,
y sé que igual me empujas hacia donde voy.
Eso es amor del bueno, del que no se queda:
el que te suelta en serio para que uno pueda.""",
"hijo": f"""Mi {NICK}, me soltaste la mano en la puerta,
y yo no lo sabía, pero tú estabas alerta.
Me viste entrar sin verte, me viste no llorar,
y recién ahí, supongo, te pudiste quebrar.

Toda mi vida ha sido una serie de puertas
y en todas me soltaste con las tuyas abiertas.
El colegio, el trabajo, la casa, la ciudad:
cada vez más distancia, cada vez más verdad.

Hoy sé lo que te cuesta cada paso que doy,
y sé que igual me empujas hacia donde voy.
Eso es amor del bueno, del que no se queda:
el que te suelta en serio para que uno pueda.""",
}

POEMS[17] = {  # Mi Enfermera del Alma — apodo MEDIO
"hija": f"""No era el té ni el jarabe lo que me curaba,
era saber que alguien en la casa velaba.
Que podía cerrar los ojos y soltar el cuerpo
porque había otra persona cuidando el tiempo.

Hoy que me enfermo sola, mi {NICK}, lo sé:
lo difícil no es la fiebre, es no tener a quién.
Es levantarse igual, es seguir funcionando,
es que nadie te toque la frente preguntando.

Por eso cuando alguien de los míos se cae,
dejo todo y me quedo, aunque no haga falta.
Porque aprendí de ti que cuidar no es curar:
es estar en la silla, al lado, sin hablar.""",
"hijo": f"""No era el té ni el jarabe lo que me curaba,
era saber que alguien en la casa velaba.
Que podía cerrar los ojos y soltar el cuerpo
porque había otra persona cuidando el tiempo.

Hoy que me enfermo solo, mi {NICK}, lo sé:
lo difícil no es la fiebre, es no tener a quién.
Es levantarse igual, es seguir funcionando,
es que nadie te toque la frente preguntando.

Por eso cuando alguien de los míos se cae,
dejo todo y me quedo, aunque no haga falta.
Porque aprendí de ti que cuidar no es curar:
es estar en la silla, al lado, sin hablar.""",
}

POEMS[18] = {  # Secadora de Tristezas — apodo FINAL
"hija": f"""Nunca me dijiste que no estaba llorando,
ni que lo que me dolía no era para tanto.
Me dejabas llorar todo lo que hiciera falta,
y recién al final venía la palabra.

Eso, que parecía lo más natural,
hoy sé que cuesta mucho y no es nada habitual.
Que la gente se apura por tapar el llanto
porque el llanto ajeno incomoda un tanto.

Tú no. Tú esperabas. Tú te quedabas quieta.
Y cuando yo acababa, la vida estaba completa.
Por eso hoy, si alguien llora cerca de mí, espero:
mi {NICK}, mi escuela, mi pañuelo primero.""",
"hijo": f"""Nunca me dijiste que no estaba llorando,
ni que lo que me dolía no era para tanto.
Me dejabas llorar todo lo que hiciera falta,
y recién al final venía la palabra.

Eso, que parecía lo más natural,
hoy sé que cuesta mucho y no es nada habitual.
Que la gente se apura por tapar el llanto
porque el llanto ajeno incomoda un tanto.

Tú no. Tú esperabas. Tú te quedabas quieta.
Y cuando yo acababa, la vida estaba completa.
Por eso hoy, si alguien llora cerca de mí, espero:
mi {NICK}, mi escuela, mi pañuelo primero.""",
}

POEMS[19] = {  # Lecciones de Fortaleza — apodo INICIO
"hija": f"""Mi {NICK}, te acuerdas de aquella vez que caí
y estiraste la mano pero no tiraste de mí.
Me quedé en el suelo, con la rabia en la cara,
sin entender por qué no me ayudabas en nada.

Hoy lo agradezco más que por cien abrazos.
Porque aprendí ese día a sostener mis brazos.
Porque supe en el cuerpo, y no en una lección,
que levantarse sola también es protección.

Estuviste ahí siempre, con la mano tendida.
No me dejaste nunca: me dejaste la subida.
Y esa diferencia, que de niña me dolió,
es la mejor herencia que tu amor me dejó.""",
"hijo": f"""Mi {NICK}, te acuerdas de aquella vez que caí
y estiraste la mano pero no tiraste de mí.
Me quedé en el suelo, con la rabia en la cara,
sin entender por qué no me ayudabas en nada.

Hoy lo agradezco más que por cien abrazos.
Porque aprendí ese día a sostener mis brazos.
Porque supe en el cuerpo, y no en una lección,
que levantarse solo también es protección.

Estuviste ahí siempre, con la mano tendida.
No me dejaste nunca: me dejaste la subida.
Y esa diferencia, que de niño me dolió,
es la mejor herencia que tu amor me dejó.""",
}

POEMS[20] = {  # Mamá Mi Mejor Amiga — apodo MEDIO
"hija": f"""Primero fuiste madre, y eso fue lo correcto:
pusiste los límites, cuidaste lo concreto.
No fuiste mi amiga cuando yo lo pedía,
y hoy te lo agradezco más de lo que creía.

Porque ahora, mi {NICK}, ya crecí,
y por fin nos sentamos a hablar de ti y de mí.
Me cuentas tus cosas, te cuento las mías,
y nos reímos juntas como no nos reíamos.

Esta amistad no borra ni reemplaza lo anterior:
es el premio de haberlo hecho bien, y del mejor.
Y es, de todo lo nuestro, lo que menos esperaba,
y lo que más agradezco de esta etapa ganada.""",
"hijo": f"""Primero fuiste madre, y eso fue lo correcto:
pusiste los límites, cuidaste lo concreto.
No fuiste mi amiga cuando yo lo pedía,
y hoy te lo agradezco más de lo que creía.

Porque ahora, mi {NICK}, ya crecí,
y por fin nos sentamos a hablar de ti y de mí.
Me cuentas tus cosas, te cuento las mías,
y nos reímos juntos como no nos reíamos.

Esta amistad no borra ni reemplaza lo anterior:
es el premio de haberlo hecho bien, y del mejor.
Y es, de todo lo nuestro, lo que menos esperaba,
y lo que más agradezco de esta etapa ganada.""",
}

# Where the nickname should fall, for the verification pass.
EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio" for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final" for p in (3, 6, 9, 12, 15, 18)},
}
