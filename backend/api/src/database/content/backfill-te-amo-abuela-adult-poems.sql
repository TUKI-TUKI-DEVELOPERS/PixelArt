-- Poemas originales para el libro adulto (modelo 9863).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

-- 10. Cuando Lloro Tú Entiendes De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela10nietop$Mi {APODO_DESTINATARIO}, tú nunca preguntabas
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
hasta que vuelvo a poder seguir.$teamoabuela10nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela10nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_abuela.webp$teamoabuela10nietok$ AND is_active;

--  2. Cuentos Antes de Dormir De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela2nietop$No recuerdo bien ninguno de los cuentos,
pero recuerdo entera tu voz.
El modo en que bajaba al final,
y el sueño llegando sin reloj.

Hoy sé, mi {APODO_DESTINATARIO}, lo que hacías:
no me dormías, me acompañabas.
Me dabas un lugar seguro cada noche
y en ese lugar yo descansaba.

Aún hoy, si no puedo con el día,
me invento una historia y respiro.
Y la cuento despacio, bajando la voz,
tal como la contabas tú, contigo.$teamoabuela2nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela2nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_abuela.webp$teamoabuela2nietok$ AND is_active;

--  7. Durmiendo en Tu Regazo De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela7nietap$Mi {APODO_DESTINATARIO}, ya no quepo en tu regazo,
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
yo tengo dónde ir a detenerme.$teamoabuela7nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela7nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_abuela.webp$teamoabuela7nietak$ AND is_active;

-- 20. Gracias Por Ser Mi Abuela De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela20nietap$No elegimos la familia que nos toca,
y a mí me tocó bastante bien.
Me tocaste tú, que es mucho decir,
y lo sé cada vez más también.

Gracias, mi {APODO_DESTINATARIO}, por lo evidente:
la comida, la casa, el cuidado.
Pero gracias sobre todo por lo otro,
por lo que nunca te he nombrado.

Por la paciencia que no te pedí,
por el lugar que nunca me quitaste,
por quererme sin pedirme nada:
gracias por todo lo que me diste.$teamoabuela20nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela20nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_abuela.webp$teamoabuela20nietak$ AND is_active;

-- 18. Tu Legado de Amor De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela18nietop$No dejaste dinero ni propiedades,
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
mi {APODO_DESTINATARIO}, tu legado permanece.$teamoabuela18nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela18nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_abuela.webp$teamoabuela18nietok$ AND is_active;

--  5. Cuando Me Consientes De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela5nietop$En tu casa todo estaba permitido:
el postre antes, la tele un rato más.
Y yo sabía que no era desorden,
era tu forma de decirme: quédate.

Lo tuyo, mi {APODO_DESTINATARIO}, no era malcriar.
Era otra cosa, más difícil de nombrar:
era darme un lugar sin condiciones
donde nadie me pidiera demostrar.

Hoy que el mundo me mide todo el tiempo,
pienso en tu mesa y en tu permiso.
Y me acuerdo de que existe un sitio
donde alcanzaba con que yo existiera.$teamoabuela5nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela5nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_abuela.webp$teamoabuela5nietok$ AND is_active;

-- 17. Superheroína Abuela De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela17nietap$Nunca te vi pedir ayuda a nadie,
ni quejarte de lo que cargabas.
Criaste, trabajaste, enterraste gente,
y al otro día igual cocinabas.

Eso, mi {APODO_DESTINATARIO}, es lo heroico:
no volar, sino volver a empezar.
Levantarse cuando nadie mira
y seguir con lo que hay que hacer.

Hoy que me toca a mí sostener cosas,
entiendo el tamaño de lo tuyo.
Y no hay historia de poderes
que me impresione más que el tuyo.$teamoabuela17nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela17nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_abuela.webp$teamoabuela17nietak$ AND is_active;

-- 12. Eres Mi Segunda Mamá De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela12nietop$No viniste a reemplazar a nadie,
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
mi {APODO_DESTINATARIO}, mi madre, mi otra casa.$teamoabuela12nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela12nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_abuela.webp$teamoabuela12nietok$ AND is_active;

-- 14. Viajeros del Tiempo De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela14nietop$Contigo el tiempo nunca fue una línea:
era un lugar al que se podía volver.
Decías "cuando yo era joven" y de pronto
estábamos los dos en otro ayer.

Así viajamos, mi {APODO_DESTINATARIO}, sin movernos,
entre la guerra, el barrio y el salón.
Yo escuchaba y veía todo aquello
como si fuera mío, y lo es, y son.

Hoy soy yo el que cuenta esas historias
y alguien más joven las escucha.
Y en esa cadena que no se corta
sigues viajando, y eso es mucha.$teamoabuela14nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela14nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_abuela.webp$teamoabuela14nietok$ AND is_active;

-- 12. Eres Mi Segunda Mamá De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela12nietap$No viniste a reemplazar a nadie,
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
mi {APODO_DESTINATARIO}, mi madre, mi otra casa.$teamoabuela12nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela12nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_abuela.webp$teamoabuela12nietak$ AND is_active;

--  5. Cuando Me Consientes De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela5nietap$En tu casa todo estaba permitido:
el postre antes, la tele un rato más.
Y yo sabía que no era desorden,
era tu forma de decirme: quédate.

Lo tuyo, mi {APODO_DESTINATARIO}, no era malcriar.
Era otra cosa, más difícil de nombrar:
era darme un lugar sin condiciones
donde nadie me pidiera demostrar.

Hoy que el mundo me mide todo el tiempo,
pienso en tu mesa y en tu permiso.
Y me acuerdo de que existe un sitio
donde alcanzaba con que yo existiera.$teamoabuela5nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela5nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_abuela.webp$teamoabuela5nietak$ AND is_active;

--  2. Cuentos Antes de Dormir De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela2nietap$No recuerdo bien ninguno de los cuentos,
pero recuerdo entera tu voz.
El modo en que bajaba al final,
y el sueño llegando sin reloj.

Hoy sé, mi {APODO_DESTINATARIO}, lo que hacías:
no me dormías, me acompañabas.
Me dabas un lugar seguro cada noche
y en ese lugar yo descansaba.

Aún hoy, si no puedo con el día,
me invento una historia y respiro.
Y la cuento despacio, bajando la voz,
tal como la contabas tú, contigo.$teamoabuela2nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela2nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_abuela.webp$teamoabuela2nietak$ AND is_active;

--  4. Secretos Entre Nosotros De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela4nietop$Mi {APODO_DESTINATARIO}, guardaste mis secretos
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
porque aprendí contigo lo que valgo.$teamoabuela4nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela4nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_abuela.webp$teamoabuela4nietok$ AND is_active;

--  3. Las Galletas Más Ricas del Mundo De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela3nietop$Tus galletas nunca fueron las mejores
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
mi {APODO_DESTINATARIO}, mi cocina, mi semilla.$teamoabuela3nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela3nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_abuela.webp$teamoabuela3nietok$ AND is_active;

--  1. Abrazos Que Curan Todo De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela1nietop$Mi {APODO_DESTINATARIO}, tus abrazos no curaban,
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
no hablo. Abrazo. Como vi hacer.$teamoabuela1nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela1nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_abuela.webp$teamoabuela1nietok$ AND is_active;

-- 14. Viajeros del Tiempo De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela14nietap$Contigo el tiempo nunca fue una línea:
era un lugar al que se podía volver.
Decías "cuando yo era joven" y de pronto
estábamos las dos en otro ayer.

Así viajamos, mi {APODO_DESTINATARIO}, sin movernos,
entre la guerra, el barrio y el salón.
Yo escuchaba y veía todo aquello
como si fuera mío, y lo es, y son.

Hoy soy yo la que cuenta esas historias
y alguien más joven las escucha.
Y en esa cadena que no se corta
sigues viajando, y eso es mucha.$teamoabuela14nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela14nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_abuela.webp$teamoabuela14nietak$ AND is_active;

--  8. Me Enseñaste A De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela8nietop$Me enseñaste cosas que no se enseñan:
a mirar un árbol sin apuro,
a notar cuándo alguien está triste,
a esperar sin reclamar lo futuro.

Nada de eso, mi {APODO_DESTINATARIO}, venía en libros.
Venía de hacerlo a mi costado.
Yo miraba y copiaba sin saberlo,
y me quedó, y no se me ha olvidado.

Hoy la gente me pregunta de dónde saco
la paciencia que a veces tengo.
Y no sé explicarlo en una frase:
digo que de mi abuela, y de ahí vengo.$teamoabuela8nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela8nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_abuela.webp$teamoabuela8nietok$ AND is_active;

--  6. Tus Manos Mágicas De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela6nietop$Tus manos no eran suaves ni perfectas:
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
mi {APODO_DESTINATARIO}, mis manos, mi todo.$teamoabuela6nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela6nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_abuela.webp$teamoabuela6nietok$ AND is_active;

-- 15. Princesa de la Abuela De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela15nietap$Para ti siempre fui la más bonita,
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
mi {APODO_DESTINATARIO}, mi espejo, mi reserva.$teamoabuela15nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela15nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_abuela.webp$teamoabuela15nietak$ AND is_active;

-- 20. Gracias Por Ser Mi Abuela De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela20nietop$No elegimos la familia que nos toca,
y a mí me tocó bastante bien.
Me tocaste tú, que es mucho decir,
y lo sé cada vez más también.

Gracias, mi {APODO_DESTINATARIO}, por lo evidente:
la comida, la casa, el cuidado.
Pero gracias sobre todo por lo otro,
por lo que nunca te he nombrado.

Por la paciencia que no te pedí,
por el lugar que nunca me quitaste,
por quererme sin pedirme nada:
gracias por todo lo que me diste.$teamoabuela20nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela20nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_abuela.webp$teamoabuela20nietok$ AND is_active;

--  3. Las Galletas Más Ricas del Mundo De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela3nietap$Tus galletas nunca fueron las mejores
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
mi {APODO_DESTINATARIO}, mi cocina, mi semilla.$teamoabuela3nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela3nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_abuela.webp$teamoabuela3nietak$ AND is_active;

--  4. Secretos Entre Nosotros De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela4nietap$Mi {APODO_DESTINATARIO}, guardaste mis secretos
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
porque aprendí contigo lo que valgo.$teamoabuela4nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela4nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_abuela.webp$teamoabuela4nietak$ AND is_active;

-- 15. Príncipe de la Abuela De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela15nietop$Para ti siempre fui lo más valioso,
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
mi {APODO_DESTINATARIO}, mi espejo, mi reserva.$teamoabuela15nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela15nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_abuela.webp$teamoabuela15nietok$ AND is_active;

--  8. Me Enseñaste A De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela8nietap$Me enseñaste cosas que no se enseñan:
a mirar un árbol sin apuro,
a notar cuándo alguien está triste,
a esperar sin reclamar lo futuro.

Nada de eso, mi {APODO_DESTINATARIO}, venía en libros.
Venía de hacerlo a mi costado.
Yo miraba y copiaba sin saberlo,
y me quedó, y no se me ha olvidado.

Hoy la gente me pregunta de dónde saco
la paciencia que a veces tengo.
Y no sé explicarlo en una frase:
digo que de mi abuela, y de ahí vengo.$teamoabuela8nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela8nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_abuela.webp$teamoabuela8nietak$ AND is_active;

-- 11. Fotos del Pasado De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela11nietap$Las fotos que me mostrabas de chica
eran caras que yo no conocía.
Hoy las miro y entiendo quién es quién,
y entiendo también la lejanía.

Ahí estás tú, mi {APODO_DESTINATARIO}, de joven,
con una vida entera por delante.
Y me cuesta pensarte sin mis años,
sin mi nombre, sin este instante.

Por eso te pregunto más que antes.
Por eso anoto lo que me contaste.
Porque todo eso se pierde si no queda,
y yo quiero guardar lo que me diste.$teamoabuela11nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela11nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_abuela.webp$teamoabuela11nietak$ AND is_active;

--  1. Abrazos Que Curan Todo De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela1nietap$Mi {APODO_DESTINATARIO}, tus abrazos no curaban,
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
no hablo. Abrazo. Como vi hacer.$teamoabuela1nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela1nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_abuela.webp$teamoabuela1nietak$ AND is_active;

--  9. Tus Consejos de Oro De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela9nietap$Tus consejos nunca fueron órdenes,
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
mi {APODO_DESTINATARIO}, mi consejo, mi abono.$teamoabuela9nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela9nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_abuela.webp$teamoabuela9nietak$ AND is_active;

--  9. Tus Consejos de Oro De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela9nietop$Tus consejos nunca fueron órdenes,
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
mi {APODO_DESTINATARIO}, mi consejo, mi abono.$teamoabuela9nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela9nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_abuela.webp$teamoabuela9nietok$ AND is_active;

--  7. Durmiendo en Tu Regazo De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela7nietop$Mi {APODO_DESTINATARIO}, ya no quepo en tu regazo,
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
yo tengo dónde ir a detenerme.$teamoabuela7nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela7nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_abuela.webp$teamoabuela7nietok$ AND is_active;

-- 18. Tu Legado de Amor De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela18nietap$No dejaste dinero ni propiedades,
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
mi {APODO_DESTINATARIO}, tu legado permanece.$teamoabuela18nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela18nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_abuela.webp$teamoabuela18nietak$ AND is_active;

-- 13. El Jardín Encantado de la Abuela De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela13nietop$Mi {APODO_DESTINATARIO}, tu jardín era pequeño,
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
pero crecen, y en eso está tu alma.$teamoabuela13nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela13nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_abuela.webp$teamoabuela13nietok$ AND is_active;

-- 17. Superheroína Abuela De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela17nietop$Nunca te vi pedir ayuda a nadie,
ni quejarte de lo que cargabas.
Criaste, trabajaste, enterraste gente,
y al otro día igual cocinabas.

Eso, mi {APODO_DESTINATARIO}, es lo heroico:
no volar, sino volver a empezar.
Levantarse cuando nadie mira
y seguir con lo que hay que hacer.

Hoy que me toca a mí sostener cosas,
entiendo el tamaño de lo tuyo.
Y no hay historia de poderes
que me impresione más que el tuyo.$teamoabuela17nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela17nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_abuela.webp$teamoabuela17nietok$ AND is_active;

-- 11. Fotos del Pasado De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela11nietop$Las fotos que me mostrabas de chico
eran caras que yo no conocía.
Hoy las miro y entiendo quién es quién,
y entiendo también la lejanía.

Ahí estás tú, mi {APODO_DESTINATARIO}, de joven,
con una vida entera por delante.
Y me cuesta pensarte sin mis años,
sin mi nombre, sin este instante.

Por eso te pregunto más que antes.
Por eso anoto lo que me contaste.
Porque todo eso se pierde si no queda,
y yo quiero guardar lo que me diste.$teamoabuela11nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela11nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_abuela.webp$teamoabuela11nietok$ AND is_active;

-- 10. Cuando Lloro Tú Entiendes De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela10nietap$Mi {APODO_DESTINATARIO}, tú nunca preguntabas
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
hasta que vuelvo a poder seguir.$teamoabuela10nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela10nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_abuela.webp$teamoabuela10nietak$ AND is_active;

--  6. Tus Manos Mágicas De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela6nietap$Tus manos no eran suaves ni perfectas:
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
mi {APODO_DESTINATARIO}, mis manos, mi todo.$teamoabuela6nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela6nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_abuela.webp$teamoabuela6nietak$ AND is_active;

-- 13. El Jardín Encantado de la Abuela De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela13nietap$Mi {APODO_DESTINATARIO}, tu jardín era pequeño,
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
pero crecen, y en eso está tu alma.$teamoabuela13nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela13nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_abuela.webp$teamoabuela13nietak$ AND is_active;

-- 16. Aventureros en la Biblioteca De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela16nietop$Mi {APODO_DESTINATARIO}, me llevaste a los libros
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
que me acompaña y que no tiene dueño.$teamoabuela16nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela16nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_abuela.webp$teamoabuela16nietok$ AND is_active;

-- 19. Cuando Crezca Seré Como Tú De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela19nietap$Mi {APODO_DESTINATARIO}, de chica yo decía
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
y sigue siendo la que no he soltado.$teamoabuela19nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela19nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_abuela.webp$teamoabuela19nietak$ AND is_active;

-- 19. Cuando Crezca Seré Como Tú De Hijo a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela19nietop$Mi {APODO_DESTINATARIO}, de chico yo decía
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
y sigue siendo la que no he soltado.$teamoabuela19nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela19nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_abuela.webp$teamoabuela19nietok$ AND is_active;

-- 16. Aventureros en la Biblioteca De Hija a Abuela
UPDATE personalized_templates SET
  poem_template = $teamoabuela16nietap$Mi {APODO_DESTINATARIO}, me llevaste a los libros
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
que me acompaña y que no tiene dueño.$teamoabuela16nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuela16nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_abuela.webp$teamoabuela16nietak$ AND is_active;
