-- Poemas originales para "Mamá, Mi Heroína Adulto".
--
-- El libro venía con UN solo esqueleto de poema repetido en sus 40 plantillas,
-- con el título enchufado en una ranura. Estos son 20 poemas nuevos, uno por
-- tema, en las dos direcciones, escritos con la forma del libro infantil: tres
-- estrofas de cuatro versos, rima AABB y las imágenes del propio tema. Lo único
-- que cambia es la voz, que es la de un hijo o una hija ya adultos.
--
-- El apodo rota por posición en vez de abrir siempre el poema:
--   inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20 · final 3,6,9,12,15,18
--
-- Matchea por template_preview_key, nunca por id.

--  1. Mi Superheroína Sin Capa De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh1ap$Mi {APODO_DESTINATARIO}, hoy por fin lo puedo nombrar:
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
fuiste la que siguió, y eso es el valor.$mh1ap$,
  updated_at = now()
WHERE template_preview_key = $mh1ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_mama.webp$mh1ak$ AND is_active;

--  9. Mi Diosa del Amor Eterno De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh9op$No hubo templo más alto que tu querer,
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
mi {APODO_DESTINATARIO}, mi eterna, mi amor sobre la tierra.$mh9op$,
  updated_at = now()
WHERE template_preview_key = $mh9ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_mama.webp$mh9ok$ AND is_active;

-- 16. Mi Valiente Compañera De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh16op$Mi {APODO_DESTINATARIO}, me soltaste la mano en la puerta,
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
el que te suelta en serio para que uno pueda.$mh16op$,
  updated_at = now()
WHERE template_preview_key = $mh16ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_mama.webp$mh16ok$ AND is_active;

-- 12. La Heroína Que No Necesita Capa De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh12op$No hizo falta disfraz ni ocasión especial:
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
en mi {APODO_DESTINATARIO}, mi heroína cotidiana.$mh12op$,
  updated_at = now()
WHERE template_preview_key = $mh12ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_mama.webp$mh12ok$ AND is_active;

-- 12. La Heroína Que No Necesita Capa De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh12ap$No hizo falta disfraz ni ocasión especial:
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
en mi {APODO_DESTINATARIO}, mi heroína cotidiana.$mh12ap$,
  updated_at = now()
WHERE template_preview_key = $mh12ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_mama.webp$mh12ak$ AND is_active;

-- 14. El Ritual Más Sagrado De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh14op$Cada noche, sin falta, tu beso en la frente,
aunque el día estuviera torcido o diferente.
Nunca faltó ese gesto, ni una sola vez,
y yo lo recibía sin saber lo que es.

Hoy lo pienso y me desarma:
que al final del día aún quedara calma.
Que nada, mi {APODO_DESTINATARIO}, de lo que hubo pasado,
pesaba más que el beso que lo dejaba cerrado.

Por eso cuando llego cansado a mi cama
y nadie me despide con una buena palabra,
cierro los ojos fuerte y me traigo tu frente,
y el día se me cierra igual, dulcemente.$mh14op$,
  updated_at = now()
WHERE template_preview_key = $mh14ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_mama.webp$mh14ok$ AND is_active;

--  4. Mi Ángel Protector De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh4op$Mi {APODO_DESTINATARIO}, tus alas nunca se vieron,
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
tu amor sigue llegando, y me sigue alcanzando.$mh4op$,
  updated_at = now()
WHERE template_preview_key = $mh4ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_mama.webp$mh4ok$ AND is_active;

--  8. Mi Amazona Guerrera De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh8op$Te vi plantarte firme donde nadie se plantaba,
defender lo que era justo cuando nadie hablaba.
No bajabas la voz por quedar bien con alguien,
y eso, de niño, me pareció lo más grande.

Lo sigue siendo, mi {APODO_DESTINATARIO}, lo sigue siendo hoy,
que ocupo mi lugar y digo quién soy.
Aprendí de ti que el respeto no se ruega:
se sostiene de pie, aunque cueste, y no se niega.

Si alguna vez me ves discutir sin temblar,
reconoce tu escuela, tu forma de luchar.
No me diste un consejo: me diste un ejemplo,
y me acompaña como acompaña un templo.$mh8op$,
  updated_at = now()
WHERE template_preview_key = $mh8ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_mama.webp$mh8ok$ AND is_active;

-- 18. Secadora de Tristezas De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh18op$Nunca me dijiste que no estaba llorando,
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
mi {APODO_DESTINATARIO}, mi escuela, mi pañuelo primero.$mh18op$,
  updated_at = now()
WHERE template_preview_key = $mh18ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_mama.webp$mh18ok$ AND is_active;

-- 20. Mamá Mi Mejor Amiga De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh20op$Primero fuiste madre, y eso fue lo correcto:
pusiste los límites, cuidaste lo concreto.
No fuiste mi amiga cuando yo lo pedía,
y hoy te lo agradezco más de lo que creía.

Porque ahora, mi {APODO_DESTINATARIO}, ya crecí,
y por fin nos sentamos a hablar de ti y de mí.
Me cuentas tus cosas, te cuento las mías,
y nos reímos juntos como no nos reíamos.

Esta amistad no borra ni reemplaza lo anterior:
es el premio de haberlo hecho bien, y del mejor.
Y es, de todo lo nuestro, lo que menos esperaba,
y lo que más agradezco de esta etapa ganada.$mh20op$,
  updated_at = now()
WHERE template_preview_key = $mh20ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_mama.webp$mh20ok$ AND is_active;

-- 20. Mamá Mi Mejor Amiga De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh20ap$Primero fuiste madre, y eso fue lo correcto:
pusiste los límites, cuidaste lo concreto.
No fuiste mi amiga cuando yo lo pedía,
y hoy te lo agradezco más de lo que creía.

Porque ahora, mi {APODO_DESTINATARIO}, ya crecí,
y por fin nos sentamos a hablar de ti y de mí.
Me cuentas tus cosas, te cuento las mías,
y nos reímos juntas como no nos reíamos.

Esta amistad no borra ni reemplaza lo anterior:
es el premio de haberlo hecho bien, y del mejor.
Y es, de todo lo nuestro, lo que menos esperaba,
y lo que más agradezco de esta etapa ganada.$mh20ap$,
  updated_at = now()
WHERE template_preview_key = $mh20ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_mama.webp$mh20ak$ AND is_active;

--  2. La Guerrera Que Nunca Se Rinde De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh2op$Peleaste batallas que nunca me contaste,
y en todas, sin saberlo, por mí te quedaste.
No vi tu escudo entonces, no vi tu armadura,
solo vi a una mujer sosteniendo la altura.

Ahora soy grande, mi {APODO_DESTINATARIO}, y ya sé
todo lo que callaste para verme crecer.
Las veces que temblaste detrás de la puerta
y volviste a la mesa con la sonrisa puesta.

Si hoy me levanto cuando todo se cae,
es porque tu coraje aprendió a ser mi aire.
No me enseñaste a nunca tener miedo:
me enseñaste a avanzar con él, y puedo.$mh2op$,
  updated_at = now()
WHERE template_preview_key = $mh2ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_mama.webp$mh2ok$ AND is_active;

--  5. La Maga de Mi Vida De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh5ap$Tu varita fue siempre una cuchara de palo,
y con ella encantabas lo difícil y lo malo.
Hacías de un día gris una tarde entera
y de una casa chica, la casa que yo quiera.

Tu magia, mi {APODO_DESTINATARIO}, nunca fue ilusión:
era quedarte en vela, era pura decisión.
Era estirar lo poco hasta volverlo fiesta,
era inventar un juego si no había respuesta.

Hoy sé que los milagros se hacen a mano,
que no hay conjuro suelto ni prodigios lejanos.
Y cuando algo me sale mejor de lo esperado,
sonrío, porque sé de quién lo he heredado.$mh5ap$,
  updated_at = now()
WHERE template_preview_key = $mh5ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_mama.webp$mh5ak$ AND is_active;

--  1. Mi Superheroína Sin Capa De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh1op$Mi {APODO_DESTINATARIO}, hoy por fin lo puedo nombrar:
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
fuiste la que siguió, y eso es el valor.$mh1op$,
  updated_at = now()
WHERE template_preview_key = $mh1ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_mama.webp$mh1ok$ AND is_active;

-- 15. Recetas de Amor De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh15op$Nunca me diste una receta por escrito,
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
mi {APODO_DESTINATARIO}, mi receta, mi mano en la olla.$mh15op$,
  updated_at = now()
WHERE template_preview_key = $mh15ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_mama.webp$mh15ok$ AND is_active;

--  2. La Guerrera Que Nunca Se Rinde De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh2ap$Peleaste batallas que nunca me contaste,
y en todas, sin saberlo, por mí te quedaste.
No vi tu escudo entonces, no vi tu armadura,
solo vi a una mujer sosteniendo la altura.

Ahora soy grande, mi {APODO_DESTINATARIO}, y ya sé
todo lo que callaste para verme crecer.
Las veces que temblaste detrás de la puerta
y volviste a la mesa con la sonrisa puesta.

Si hoy me levanto cuando todo se cae,
es porque tu coraje aprendió a ser mi aire.
No me enseñaste a nunca tener miedo:
me enseñaste a avanzar con él, y puedo.$mh2ap$,
  updated_at = now()
WHERE template_preview_key = $mh2ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_mama.webp$mh2ak$ AND is_active;

--  3. Mi Reina Mi Todo De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh3op$Tu corona nunca estuvo hecha de oro,
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
mi {APODO_DESTINATARIO}, mi reina, mi casa primera.$mh3op$,
  updated_at = now()
WHERE template_preview_key = $mh3ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_mama.webp$mh3ok$ AND is_active;

-- 11. Mi Samurái de Honor De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh11op$Me enseñaste el honor sin decir la palabra:
cumpliendo lo prometido, sin una queja ni nada.
Nunca vi una promesa tuya quedar en el aire,
ni una deuda pequeña que dejaras al desgaire.

Esa disciplina, mi {APODO_DESTINATARIO}, me quedó,
y hoy la llevo en el modo en que trabajo yo.
Llegar cuando se dice. Decir lo que se piensa.
Sostener la palabra aunque salga a mi expensa.

No hizo falta espada para enseñar el camino.
Bastó verte cumplir, en lo grande y lo mínimo.
Y si alguna vez dudo de cómo proceder,
me pregunto qué harías, y vuelvo a saber.$mh11op$,
  updated_at = now()
WHERE template_preview_key = $mh11ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_mama.webp$mh11ok$ AND is_active;

-- 10. Mi Titán Inquebrantable De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh10ap$Mi {APODO_DESTINATARIO}, cargaste mucho más que mi peso:
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
es elegir cada día, con el cuerpo y el aliento.$mh10ap$,
  updated_at = now()
WHERE template_preview_key = $mh10ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_mama.webp$mh10ak$ AND is_active;

--  7. Mi Ninja Silenciosa De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh7op$Mi {APODO_DESTINATARIO}, cuántas cosas resolviste en silencio,
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
no hay guerrera mayor que la escondida.$mh7op$,
  updated_at = now()
WHERE template_preview_key = $mh7ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_mama.webp$mh7ok$ AND is_active;

--  6. Mi Capitana del Corazón De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh6ap$Llevaste este timón con el mar en contra,
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
mi {APODO_DESTINATARIO}, mi capitana, mi mar abierto.$mh6ap$,
  updated_at = now()
WHERE template_preview_key = $mh6ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_mama.webp$mh6ak$ AND is_active;

-- 15. Recetas de Amor De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh15ap$Nunca me diste una receta por escrito,
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
mi {APODO_DESTINATARIO}, mi receta, mi mano en la olla.$mh15ap$,
  updated_at = now()
WHERE template_preview_key = $mh15ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_mama.webp$mh15ak$ AND is_active;

-- 19. Lecciones de Fortaleza De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh19op$Mi {APODO_DESTINATARIO}, te acuerdas de aquella vez que caí
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
es la mejor herencia que tu amor me dejó.$mh19op$,
  updated_at = now()
WHERE template_preview_key = $mh19ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_mama.webp$mh19ok$ AND is_active;

--  3. Mi Reina Mi Todo De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh3ap$Tu corona nunca estuvo hecha de oro,
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
mi {APODO_DESTINATARIO}, mi reina, mi casa primera.$mh3ap$,
  updated_at = now()
WHERE template_preview_key = $mh3ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_mama.webp$mh3ak$ AND is_active;

-- 13. Tus Abrazos Mágicos De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh13ap$Mi {APODO_DESTINATARIO}, tus abrazos no curaban la herida,
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
no digo nada: abrazo. Y pienso en lo heredado.$mh13ap$,
  updated_at = now()
WHERE template_preview_key = $mh13ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_mama.webp$mh13ak$ AND is_active;

-- 14. El Ritual Más Sagrado De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh14ap$Cada noche, sin falta, tu beso en la frente,
aunque el día estuviera torcido o diferente.
Nunca faltó ese gesto, ni una sola vez,
y yo lo recibía sin saber lo que es.

Hoy lo pienso y me desarma:
que al final del día aún quedara calma.
Que nada, mi {APODO_DESTINATARIO}, de lo que hubo pasado,
pesaba más que el beso que lo dejaba cerrado.

Por eso cuando llego cansada a mi cama
y nadie me despide con una buena palabra,
cierro los ojos fuerte y me traigo tu frente,
y el día se me cierra igual, dulcemente.$mh14ap$,
  updated_at = now()
WHERE template_preview_key = $mh14ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_mama.webp$mh14ak$ AND is_active;

--  4. Mi Ángel Protector De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh4ap$Mi {APODO_DESTINATARIO}, tus alas nunca se vieron,
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
tu amor sigue llegando, y me sigue alcanzando.$mh4ap$,
  updated_at = now()
WHERE template_preview_key = $mh4ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_mama.webp$mh4ak$ AND is_active;

-- 19. Lecciones de Fortaleza De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh19ap$Mi {APODO_DESTINATARIO}, te acuerdas de aquella vez que caí
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
es la mejor herencia que tu amor me dejó.$mh19ap$,
  updated_at = now()
WHERE template_preview_key = $mh19ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_mama.webp$mh19ak$ AND is_active;

--  5. La Maga de Mi Vida De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh5op$Tu varita fue siempre una cuchara de palo,
y con ella encantabas lo difícil y lo malo.
Hacías de un día gris una tarde entera
y de una casa chica, la casa que yo quiera.

Tu magia, mi {APODO_DESTINATARIO}, nunca fue ilusión:
era quedarte en vela, era pura decisión.
Era estirar lo poco hasta volverlo fiesta,
era inventar un juego si no había respuesta.

Hoy sé que los milagros se hacen a mano,
que no hay conjuro suelto ni prodigios lejanos.
Y cuando algo me sale mejor de lo esperado,
sonrío, porque sé de quién lo he heredado.$mh5op$,
  updated_at = now()
WHERE template_preview_key = $mh5ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_mama.webp$mh5ok$ AND is_active;

-- 10. Mi Titán Inquebrantable De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh10op$Mi {APODO_DESTINATARIO}, cargaste mucho más que mi peso:
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
es elegir cada día, con el cuerpo y el aliento.$mh10op$,
  updated_at = now()
WHERE template_preview_key = $mh10ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_mama.webp$mh10ok$ AND is_active;

-- 13. Tus Abrazos Mágicos De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh13op$Mi {APODO_DESTINATARIO}, tus abrazos no curaban la herida,
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
no digo nada: abrazo. Y pienso en lo heredado.$mh13op$,
  updated_at = now()
WHERE template_preview_key = $mh13ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_mama.webp$mh13ok$ AND is_active;

-- 17. Mi Enfermera del Alma De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh17ap$No era el té ni el jarabe lo que me curaba,
era saber que alguien en la casa velaba.
Que podía cerrar los ojos y soltar el cuerpo
porque había otra persona cuidando el tiempo.

Hoy que me enfermo sola, mi {APODO_DESTINATARIO}, lo sé:
lo difícil no es la fiebre, es no tener a quién.
Es levantarse igual, es seguir funcionando,
es que nadie te toque la frente preguntando.

Por eso cuando alguien de los míos se cae,
dejo todo y me quedo, aunque no haga falta.
Porque aprendí de ti que cuidar no es curar:
es estar en la silla, al lado, sin hablar.$mh17ap$,
  updated_at = now()
WHERE template_preview_key = $mh17ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_mama.webp$mh17ak$ AND is_active;

--  8. Mi Amazona Guerrera De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh8ap$Te vi plantarte firme donde nadie se plantaba,
defender lo que era justo cuando nadie hablaba.
No bajabas la voz por quedar bien con alguien,
y eso, de niña, me pareció lo más grande.

Lo sigue siendo, mi {APODO_DESTINATARIO}, lo sigue siendo hoy,
que ocupo mi lugar y digo quién soy.
Aprendí de ti que el respeto no se ruega:
se sostiene de pie, aunque cueste, y no se niega.

Si alguna vez me ves discutir sin temblar,
reconoce tu escuela, tu forma de luchar.
No me diste un consejo: me diste un ejemplo,
y me acompaña como acompaña un templo.$mh8ap$,
  updated_at = now()
WHERE template_preview_key = $mh8ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_mama.webp$mh8ak$ AND is_active;

-- 18. Secadora de Tristezas De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh18ap$Nunca me dijiste que no estaba llorando,
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
mi {APODO_DESTINATARIO}, mi escuela, mi pañuelo primero.$mh18ap$,
  updated_at = now()
WHERE template_preview_key = $mh18ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_mama.webp$mh18ak$ AND is_active;

-- 16. Mi Valiente Compañera De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh16ap$Mi {APODO_DESTINATARIO}, me soltaste la mano en la puerta,
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
el que te suelta en serio para que uno pueda.$mh16ap$,
  updated_at = now()
WHERE template_preview_key = $mh16ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_mama.webp$mh16ak$ AND is_active;

-- 11. Mi Samurái de Honor De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh11ap$Me enseñaste el honor sin decir la palabra:
cumpliendo lo prometido, sin una queja ni nada.
Nunca vi una promesa tuya quedar en el aire,
ni una deuda pequeña que dejaras al desgaire.

Esa disciplina, mi {APODO_DESTINATARIO}, me quedó,
y hoy la llevo en el modo en que trabajo yo.
Llegar cuando se dice. Decir lo que se piensa.
Sostener la palabra aunque salga a mi expensa.

No hizo falta espada para enseñar el camino.
Bastó verte cumplir, en lo grande y lo mínimo.
Y si alguna vez dudo de cómo proceder,
me pregunto qué harías, y vuelvo a saber.$mh11ap$,
  updated_at = now()
WHERE template_preview_key = $mh11ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_mama.webp$mh11ak$ AND is_active;

--  9. Mi Diosa del Amor Eterno De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh9ap$No hubo templo más alto que tu querer,
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
mi {APODO_DESTINATARIO}, mi eterna, mi amor sobre la tierra.$mh9ap$,
  updated_at = now()
WHERE template_preview_key = $mh9ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_mama.webp$mh9ak$ AND is_active;

-- 17. Mi Enfermera del Alma De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh17op$No era el té ni el jarabe lo que me curaba,
era saber que alguien en la casa velaba.
Que podía cerrar los ojos y soltar el cuerpo
porque había otra persona cuidando el tiempo.

Hoy que me enfermo solo, mi {APODO_DESTINATARIO}, lo sé:
lo difícil no es la fiebre, es no tener a quién.
Es levantarse igual, es seguir funcionando,
es que nadie te toque la frente preguntando.

Por eso cuando alguien de los míos se cae,
dejo todo y me quedo, aunque no haga falta.
Porque aprendí de ti que cuidar no es curar:
es estar en la silla, al lado, sin hablar.$mh17op$,
  updated_at = now()
WHERE template_preview_key = $mh17ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_mama.webp$mh17ok$ AND is_active;

--  6. Mi Capitana del Corazón De Hijo a Mamá
UPDATE personalized_templates SET
  poem_template = $mh6op$Llevaste este timón con el mar en contra,
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
mi {APODO_DESTINATARIO}, mi capitana, mi mar abierto.$mh6op$,
  updated_at = now()
WHERE template_preview_key = $mh6ok$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_mama.webp$mh6ok$ AND is_active;

--  7. Mi Ninja Silenciosa De Hija a Mamá
UPDATE personalized_templates SET
  poem_template = $mh7ap$Mi {APODO_DESTINATARIO}, cuántas cosas resolviste en silencio,
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
no hay guerrera mayor que la escondida.$mh7ap$,
  updated_at = now()
WHERE template_preview_key = $mh7ak$IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_mama.webp$mh7ak$ AND is_active;
