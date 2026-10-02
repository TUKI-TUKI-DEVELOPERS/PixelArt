"""Original adult poems for "Te Amo, Abuela Adulto" (model 9863).

Same shape as the infant book so the two read as one family: three stanzas of four
lines, AABB rhyme, imagery taken from that template's own scene. Only the voice grows
up — a grandchild in their thirties looking back.

Lines are kept short on purpose: the poem column is 520px at font 21, and the first
Mamá draft had to be retrofitted because its verses ran long. Nickname rotates
inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20 · final 3,6,9,12,15,18.
"""

NICK = "{APODO_DESTINATARIO}"
POEMS: dict[int, dict[str, str]] = {}

POEMS[1] = {  # Abrazos Que Curan Todo — INICIO
"nieta": f"""Mi {NICK}, tus abrazos no curaban,
pero el dolor se hacía más liviano.
Yo era chica y creía que era magia;
era tu pecho y era tu mano.

Hoy conozco penas de persona grande,
de esas que ningún abrazo quita.
Y aun así te busco, y aun así me calmo,
y aun así tu casa me habilita.

Nada me enseñó mejor que ese refugio:
que estar es más que decir qué hacer.
Por eso, cuando alguien mío se cae,
no hablo. Abrazo. Como vi hacer.""",
"nieto": f"""Mi {NICK}, tus abrazos no curaban,
pero el dolor se hacía más liviano.
Yo era chico y creía que era magia;
era tu pecho y era tu mano.

Hoy conozco penas de persona grande,
de esas que ningún abrazo quita.
Y aun así te busco, y aun así me calmo,
y aun así tu casa me habilita.

Nada me enseñó mejor que ese refugio:
que estar es más que decir qué hacer.
Por eso, cuando alguien mío se cae,
no hablo. Abrazo. Como vi hacer.""",
}

POEMS[2] = {  # Cuentos Antes de Dormir — MEDIO
"nieta": f"""No recuerdo bien ninguno de los cuentos,
pero recuerdo entera tu voz.
El modo en que bajaba al final,
y el sueño llegando sin reloj.

Hoy sé, mi {NICK}, lo que hacías:
no me dormías, me acompañabas.
Me dabas un lugar seguro cada noche
y en ese lugar yo descansaba.

Aún hoy, si no puedo con el día,
me invento una historia y respiro.
Y la cuento despacio, bajando la voz,
tal como la contabas tú, contigo.""",
"nieto": f"""No recuerdo bien ninguno de los cuentos,
pero recuerdo entera tu voz.
El modo en que bajaba al final,
y el sueño llegando sin reloj.

Hoy sé, mi {NICK}, lo que hacías:
no me dormías, me acompañabas.
Me dabas un lugar seguro cada noche
y en ese lugar yo descansaba.

Aún hoy, si no puedo con el día,
me invento una historia y respiro.
Y la cuento despacio, bajando la voz,
tal como la contabas tú, contigo.""",
}

POEMS[3] = {  # Las Galletas Más Ricas del Mundo — FINAL
"nieta": f"""Tus galletas nunca fueron las mejores
por la receta ni por el horno.
Eran las mejores porque las hacías
con tiempo, sin apuro, sin retorno.

Hoy las hago yo y me salen parecidas,
pero les falta algo que no sé.
Será la cocina, será la tarde,
será que no eras tú quien las amasé.

Cada vez que el olor llena mi casa
vuelvo a esa mesa y a esa silla.
Y ahí estás, con harina en el delantal:
mi {NICK}, mi cocina, mi semilla.""",
"nieto": f"""Tus galletas nunca fueron las mejores
por la receta ni por el horno.
Eran las mejores porque las hacías
con tiempo, sin apuro, sin retorno.

Hoy las hago yo y me salen parecidas,
pero les falta algo que no sé.
Será la cocina, será la tarde,
será que no eras tú quien las amasé.

Cada vez que el olor llena mi casa
vuelvo a esa mesa y a esa silla.
Y ahí estás, con harina en el delantal:
mi {NICK}, mi cocina, mi semilla.""",
}

POEMS[4] = {  # Secretos Entre Nosotros — INICIO
"nieta": f"""Mi {NICK}, guardaste mis secretos
cuando nadie más los escuchaba.
No los contaste nunca, ni de broma,
y por eso yo te confiaba.

Hoy entiendo el valor de ese silencio:
que alguien te escuche sin juzgar,
que no use lo que sabe en tu contra,
que te deje simplemente hablar.

Hay cosas mías que solo tú supiste.
Siguen contigo, siguen a salvo.
Y yo sigo contando, aunque ya sea grande,
porque aprendí contigo lo que valgo.""",
"nieto": f"""Mi {NICK}, guardaste mis secretos
cuando nadie más los escuchaba.
No los contaste nunca, ni de broma,
y por eso yo te confiaba.

Hoy entiendo el valor de ese silencio:
que alguien te escuche sin juzgar,
que no use lo que sabe en tu contra,
que te deje simplemente hablar.

Hay cosas mías que solo tú supiste.
Siguen contigo, siguen a salvo.
Y yo sigo contando, aunque ya sea grande,
porque aprendí contigo lo que valgo.""",
}

POEMS[5] = {  # Cuando Me Consientes — MEDIO
"nieta": f"""En tu casa todo estaba permitido:
el postre antes, la tele un rato más.
Y yo sabía que no era desorden,
era tu forma de decirme: quédate.

Lo tuyo, mi {NICK}, no era malcriar.
Era otra cosa, más difícil de nombrar:
era darme un lugar sin condiciones
donde nadie me pidiera demostrar.

Hoy que el mundo me mide todo el tiempo,
pienso en tu mesa y en tu permiso.
Y me acuerdo de que existe un sitio
donde alcanzaba con que yo existiera.""",
"nieto": f"""En tu casa todo estaba permitido:
el postre antes, la tele un rato más.
Y yo sabía que no era desorden,
era tu forma de decirme: quédate.

Lo tuyo, mi {NICK}, no era malcriar.
Era otra cosa, más difícil de nombrar:
era darme un lugar sin condiciones
donde nadie me pidiera demostrar.

Hoy que el mundo me mide todo el tiempo,
pienso en tu mesa y en tu permiso.
Y me acuerdo de que existe un sitio
donde alcanzaba con que yo existiera.""",
}

POEMS[6] = {  # Tus Manos Mágicas — FINAL
"nieta": f"""Tus manos no eran suaves ni perfectas:
tenían el trabajo de los años.
Pero curaban raspones y tristezas
y arreglaban juguetes y daños.

Hoy miro mis manos y las reconozco:
la misma forma, el mismo gesto.
Hago cosas que te vi hacer mil veces
sin haberlas aprendido por supuesto.

Eso es lo que queda cuando todo pasa:
no las palabras, sino el modo.
Y en el mío sigue estando el tuyo,
mi {NICK}, mis manos, mi todo.""",
"nieto": f"""Tus manos no eran suaves ni perfectas:
tenían el trabajo de los años.
Pero curaban raspones y tristezas
y arreglaban juguetes y daños.

Hoy miro mis manos y las reconozco:
la misma forma, el mismo gesto.
Hago cosas que te vi hacer mil veces
sin haberlas aprendido por supuesto.

Eso es lo que queda cuando todo pasa:
no las palabras, sino el modo.
Y en el mío sigue estando el tuyo,
mi {NICK}, mis manos, mi todo.""",
}

POEMS[7] = {  # Durmiendo en Tu Regazo — INICIO
"nieta": f"""Mi {NICK}, ya no quepo en tu regazo,
pero el descanso sigue estando ahí.
Me siento a tu lado y bajo la guardia
como no la bajo en ningún sitio así.

Afuera soy alguien que resuelve,
que contesta, que sostiene, que va.
Contigo soy la misma de aquel tiempo
y nadie me pide nada más.

Eso no se encuentra en cualquier parte.
Ese permiso de no ser fuerte.
Mientras tu silla siga en esa sala,
yo tengo dónde ir a detenerme.""",
"nieto": f"""Mi {NICK}, ya no quepo en tu regazo,
pero el descanso sigue estando ahí.
Me siento a tu lado y bajo la guardia
como no la bajo en ningún sitio así.

Afuera soy alguien que resuelve,
que contesta, que sostiene, que va.
Contigo soy el mismo de aquel tiempo
y nadie me pide nada más.

Eso no se encuentra en cualquier parte.
Ese permiso de no ser fuerte.
Mientras tu silla siga en esa sala,
yo tengo dónde ir a detenerme.""",
}

POEMS[8] = {  # Me Enseñaste A — MEDIO
"nieta": f"""Me enseñaste cosas que no se enseñan:
a mirar un árbol sin apuro,
a notar cuándo alguien está triste,
a esperar sin reclamar lo futuro.

Nada de eso, mi {NICK}, venía en libros.
Venía de hacerlo a mi costado.
Yo miraba y copiaba sin saberlo,
y me quedó, y no se me ha olvidado.

Hoy la gente me pregunta de dónde saco
la paciencia que a veces tengo.
Y no sé explicarlo en una frase:
digo que de mi abuela, y de ahí vengo.""",
"nieto": f"""Me enseñaste cosas que no se enseñan:
a mirar un árbol sin apuro,
a notar cuándo alguien está triste,
a esperar sin reclamar lo futuro.

Nada de eso, mi {NICK}, venía en libros.
Venía de hacerlo a mi costado.
Yo miraba y copiaba sin saberlo,
y me quedó, y no se me ha olvidado.

Hoy la gente me pregunta de dónde saco
la paciencia que a veces tengo.
Y no sé explicarlo en una frase:
digo que de mi abuela, y de ahí vengo.""",
}

POEMS[9] = {  # Tus Consejos de Oro — FINAL
"nieta": f"""Tus consejos nunca fueron órdenes,
ni venían con el dedo levantado.
Decías una frase y te quedabas,
y la frase se quedaba a mi lado.

Muchas las entendí bastante tarde,
cuando ya me había equivocado.
Pero ahí estaban, esperando el día
en que yo tuviera el oído preparado.

Hoy las repito sin querer, en voz alta,
y me descubro hablando con tu tono.
Me río y pienso que no se fue nada:
mi {NICK}, mi consejo, mi abono.""",
"nieto": f"""Tus consejos nunca fueron órdenes,
ni venían con el dedo levantado.
Decías una frase y te quedabas,
y la frase se quedaba a mi lado.

Muchas las entendí bastante tarde,
cuando ya me había equivocado.
Pero ahí estaban, esperando el día
en que yo tuviera el oído preparado.

Hoy las repito sin querer, en voz alta,
y me descubro hablando con tu tono.
Me río y pienso que no se fue nada:
mi {NICK}, mi consejo, mi abono.""",
}

POEMS[10] = {  # Cuando Lloro Tú Entiendes — INICIO
"nieta": f"""Mi {NICK}, tú nunca preguntabas
qué me pasaba, ni por qué lloraba.
Me dabas tiempo, me dabas tu silencio,
y con eso solo ya alcanzaba.

Cuánta gente quiere arreglar el llanto,
taparlo rápido, cambiar de tema.
Tú esperabas a que yo terminara.
Eso es raro. Eso vale. Eso suma.

Hoy cuando me rompo y estoy lejos,
cierro los ojos y me pongo ahí:
en tu sala, sin preguntas, sin reloj,
hasta que vuelvo a poder seguir.""",
"nieto": f"""Mi {NICK}, tú nunca preguntabas
qué me pasaba, ni por qué lloraba.
Me dabas tiempo, me dabas tu silencio,
y con eso solo ya alcanzaba.

Cuánta gente quiere arreglar el llanto,
taparlo rápido, cambiar de tema.
Tú esperabas a que yo terminara.
Eso es raro. Eso vale. Eso suma.

Hoy cuando me rompo y estoy lejos,
cierro los ojos y me pongo ahí:
en tu sala, sin preguntas, sin reloj,
hasta que vuelvo a poder seguir.""",
}

POEMS[11] = {  # Fotos del Pasado — MEDIO
"nieta": f"""Las fotos que me mostrabas de chica
eran caras que yo no conocía.
Hoy las miro y entiendo quién es quién,
y entiendo también la lejanía.

Ahí estás tú, mi {NICK}, de joven,
con una vida entera por delante.
Y me cuesta pensarte sin mis años,
sin mi nombre, sin este instante.

Por eso te pregunto más que antes.
Por eso anoto lo que me contaste.
Porque todo eso se pierde si no queda,
y yo quiero guardar lo que me diste.""",
"nieto": f"""Las fotos que me mostrabas de chico
eran caras que yo no conocía.
Hoy las miro y entiendo quién es quién,
y entiendo también la lejanía.

Ahí estás tú, mi {NICK}, de joven,
con una vida entera por delante.
Y me cuesta pensarte sin mis años,
sin mi nombre, sin este instante.

Por eso te pregunto más que antes.
Por eso anoto lo que me contaste.
Porque todo eso se pierde si no queda,
y yo quiero guardar lo que me diste.""",
}

POEMS[12] = {  # Eres Mi Segunda Mamá — FINAL
"nieta": f"""No viniste a reemplazar a nadie,
ni a competir por mi cariño.
Viniste a sumar, que es más difícil,
y lo hiciste desde que era niña.

Fuiste la casa cuando hacía falta,
el plato extra, la cama de más.
Nunca pediste el lugar principal
y aun así siempre estuviste detrás.

Hoy que sé lo que cuesta sostener a otros
sin que nadie te lo reconozca,
te lo digo claro y por escrito:
mi {NICK}, mi madre, mi otra casa.""",
"nieto": f"""No viniste a reemplazar a nadie,
ni a competir por mi cariño.
Viniste a sumar, que es más difícil,
y lo hiciste desde que era niño.

Fuiste la casa cuando hacía falta,
el plato extra, la cama de más.
Nunca pediste el lugar principal
y aun así siempre estuviste detrás.

Hoy que sé lo que cuesta sostener a otros
sin que nadie te lo reconozca,
te lo digo claro y por escrito:
mi {NICK}, mi madre, mi otra casa.""",
}

POEMS[13] = {  # El Jardín Encantado de la Abuela — INICIO
"nieta": f"""Mi {NICK}, tu jardín era pequeño,
pero a mí me parecía enorme.
Cada planta tenía su nombre y su historia
y el tiempo adentro era distinto, informe.

Me enseñaste a esperar que algo creciera,
que no todo se logra con pedir.
Que hay cosas que tardan lo que tardan
y que uno solo puede estar y seguir.

Hoy tengo macetas en mi balcón
y las cuido con tu misma calma.
No sé si crecen por el agua o por lo otro,
pero crecen, y en eso está tu alma.""",
"nieto": f"""Mi {NICK}, tu jardín era pequeño,
pero a mí me parecía enorme.
Cada planta tenía su nombre y su historia
y el tiempo adentro era distinto, informe.

Me enseñaste a esperar que algo creciera,
que no todo se logra con pedir.
Que hay cosas que tardan lo que tardan
y que uno solo puede estar y seguir.

Hoy tengo macetas en mi balcón
y las cuido con tu misma calma.
No sé si crecen por el agua o por lo otro,
pero crecen, y en eso está tu alma.""",
}

POEMS[14] = {  # Viajeros del Tiempo — MEDIO
"nieta": f"""Contigo el tiempo nunca fue una línea:
era un lugar al que se podía volver.
Decías "cuando yo era joven" y de pronto
estábamos las dos en otro ayer.

Así viajamos, mi {NICK}, sin movernos,
entre la guerra, el barrio y el salón.
Yo escuchaba y veía todo aquello
como si fuera mío, y lo es, y son.

Hoy soy yo la que cuenta esas historias
y alguien más joven las escucha.
Y en esa cadena que no se corta
sigues viajando, y eso es mucha.""",
"nieto": f"""Contigo el tiempo nunca fue una línea:
era un lugar al que se podía volver.
Decías "cuando yo era joven" y de pronto
estábamos los dos en otro ayer.

Así viajamos, mi {NICK}, sin movernos,
entre la guerra, el barrio y el salón.
Yo escuchaba y veía todo aquello
como si fuera mío, y lo es, y son.

Hoy soy yo el que cuenta esas historias
y alguien más joven las escucha.
Y en esa cadena que no se corta
sigues viajando, y eso es mucha.""",
}

POEMS[15] = {  # Princesa de la Abuela — FINAL
"nieta": f"""Para ti siempre fui la más bonita,
aunque el espejo dijera otra cosa.
No era mentira ni era exageración:
era tu modo de mirar, sin glosa.

Crecí y el mundo me midió distinto,
con reglas que no eran las tuyas.
Y hubo épocas de no gustarme nada,
de no encontrar en mí nada que suya.

En esas épocas me acordé de ti,
de cómo me mirabas, sin reserva.
Y algo de eso me quedó por dentro:
mi {NICK}, mi espejo, mi reserva.""",
"nieto": f"""Para ti siempre fui lo más valioso,
aunque el espejo dijera otra cosa.
No era mentira ni era exageración:
era tu modo de mirar, sin glosa.

Crecí y el mundo me midió distinto,
con reglas que no eran las tuyas.
Y hubo épocas de no gustarme nada,
de no encontrar en mí nada que suya.

En esas épocas me acordé de ti,
de cómo me mirabas, sin reserva.
Y algo de eso me quedó por dentro:
mi {NICK}, mi espejo, mi reserva.""",
}

POEMS[16] = {  # Aventureros en la Biblioteca — INICIO
"nieta": f"""Mi {NICK}, me llevaste a los libros
cuando yo todavía no leía.
Señalabas dibujos y decías nombres
y el cuarto entero se abría.

De ahí me viene esta costumbre rara
de buscar en las páginas salida.
Cuando algo no lo entiendo, leo.
Cuando algo duele mucho, leo.

Nunca supiste cuánto te debía
por ese gesto tan pequeño.
Me diste un mundo entero portátil,
que me acompaña y que no tiene dueño.""",
"nieto": f"""Mi {NICK}, me llevaste a los libros
cuando yo todavía no leía.
Señalabas dibujos y decías nombres
y el cuarto entero se abría.

De ahí me viene esta costumbre rara
de buscar en las páginas salida.
Cuando algo no lo entiendo, leo.
Cuando algo duele mucho, leo.

Nunca supiste cuánto te debía
por ese gesto tan pequeño.
Me diste un mundo entero portátil,
que me acompaña y que no tiene dueño.""",
}

POEMS[17] = {  # Superheroína Abuela — MEDIO
"nieta": f"""Nunca te vi pedir ayuda a nadie,
ni quejarte de lo que cargabas.
Criaste, trabajaste, enterraste gente,
y al otro día igual cocinabas.

Eso, mi {NICK}, es lo heroico:
no volar, sino volver a empezar.
Levantarse cuando nadie mira
y seguir con lo que hay que hacer.

Hoy que me toca a mí sostener cosas,
entiendo el tamaño de lo tuyo.
Y no hay historia de poderes
que me impresione más que el tuyo.""",
"nieto": f"""Nunca te vi pedir ayuda a nadie,
ni quejarte de lo que cargabas.
Criaste, trabajaste, enterraste gente,
y al otro día igual cocinabas.

Eso, mi {NICK}, es lo heroico:
no volar, sino volver a empezar.
Levantarse cuando nadie mira
y seguir con lo que hay que hacer.

Hoy que me toca a mí sostener cosas,
entiendo el tamaño de lo tuyo.
Y no hay historia de poderes
que me impresione más que el tuyo.""",
}

POEMS[18] = {  # Tu Legado de Amor — FINAL
"nieta": f"""No dejaste dinero ni propiedades,
y nunca te importó demasiado.
Dejaste otra cosa, más difícil:
una manera de tratar al otro.

Está en cómo recibo a quien llega,
en el plato de más que sirvo igual,
en no soltar a nadie en lo difícil,
en preguntar antes de juzgar.

Eso lo tengo porque tú lo hiciste
delante de mí, miles de veces.
Y mientras yo lo siga haciendo así,
mi {NICK}, tu legado permanece.""",
"nieto": f"""No dejaste dinero ni propiedades,
y nunca te importó demasiado.
Dejaste otra cosa, más difícil:
una manera de tratar al otro.

Está en cómo recibo a quien llega,
en el plato de más que sirvo igual,
en no soltar a nadie en lo difícil,
en preguntar antes de juzgar.

Eso lo tengo porque tú lo hiciste
delante de mí, miles de veces.
Y mientras yo lo siga haciendo así,
mi {NICK}, tu legado permanece.""",
}

POEMS[19] = {  # Cuando Crezca Seré Como Tú — INICIO
"nieta": f"""Mi {NICK}, de chica yo decía
que de grande quería ser como tú.
Ya soy grande. Ya pasó aquel tiempo.
Y sigo queriendo lo mismo, aún.

No me salió igual, eso está claro:
tengo menos calma y más apuro.
Pero en lo esencial voy en tu dirección,
aunque el camino sea más oscuro.

Si algún día alguien dice de mí
lo que yo digo de ti, habré llegado.
Esa es la meta que me puse de chica
y sigue siendo la que no he soltado.""",
"nieto": f"""Mi {NICK}, de chico yo decía
que de grande quería ser como tú.
Ya soy grande. Ya pasó aquel tiempo.
Y sigo queriendo lo mismo, aún.

No me salió igual, eso está claro:
tengo menos calma y más apuro.
Pero en lo esencial voy en tu dirección,
aunque el camino sea más oscuro.

Si algún día alguien dice de mí
lo que yo digo de ti, habré llegado.
Esa es la meta que me puse de chico
y sigue siendo la que no he soltado.""",
}

POEMS[20] = {  # Gracias Por Ser Mi Abuela — MEDIO
"nieta": f"""No elegimos la familia que nos toca,
y a mí me tocó bastante bien.
Me tocaste tú, que es mucho decir,
y lo sé cada vez más también.

Gracias, mi {NICK}, por lo evidente:
la comida, la casa, el cuidado.
Pero gracias sobre todo por lo otro,
por lo que nunca te he nombrado.

Por la paciencia que no te pedí,
por el lugar que nunca me quitaste,
por quererme sin pedirme nada:
gracias por todo lo que me diste.""",
"nieto": f"""No elegimos la familia que nos toca,
y a mí me tocó bastante bien.
Me tocaste tú, que es mucho decir,
y lo sé cada vez más también.

Gracias, mi {NICK}, por lo evidente:
la comida, la casa, el cuidado.
Pero gracias sobre todo por lo otro,
por lo que nunca te he nombrado.

Por la paciencia que no te pedí,
por el lugar que nunca me quitaste,
por quererme sin pedirme nada:
gracias por todo lo que me diste.""",
}

EXPECTED = {
    **{p: "inicio" for p in (1, 4, 7, 10, 13, 16, 19)},
    **{p: "medio" for p in (2, 5, 8, 11, 14, 17, 20)},
    **{p: "final" for p in (3, 6, 9, 12, 15, 18)},
}
