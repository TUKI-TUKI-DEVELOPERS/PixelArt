-- Poemas originales para el libro adulto (modelo 9868).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  7. Memoria Familiar Hermana Porque llegamos Hasta el Fin del Mundo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi7hermanap${APODO_DESTINATARIO}, llegamos hasta el muro
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
y ninguno me da ese gozo$siempreseraspartedemi7hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi7hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_27_la_tarde_donde_todavia_te_escucho_hermana.webp$siempreseraspartedemi7hermanak$ AND is_active;

-- 19. Memoria Familiar Hermana Porque nuestros Caminos Siempre se Cruzan
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi19hermanap${APODO_DESTINATARIO}, nos tocaron rutas distintas:
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
que nos daba la ciudad$siempreseraspartedemi19hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi19hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_39_el_lazo_que_no_aprende_a_irse_hermana.webp$siempreseraspartedemi19hermanak$ AND is_active;

-- 20. Memoria Familiar Hermano Porque nuestro Vínculo es Eterno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi20hermanop$No se deshace lo que fuimos
porque uno se haya ido:
el nudo quedó hecho
y aguanta cualquier trecho

Te nombro poco, {APODO_DESTINATARIO}, y despacio,
pero te hago siempre espacio
en cualquier conversación:
estás en cada versión

Si algo queda de nosotros
no es la foto ni los otros
recuerdos: es el modo
en que digo "nosotros" todo$siempreseraspartedemi20hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi20hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_20_siempre_seras_parte_de_mi_hermano.webp$siempreseraspartedemi20hermanok$ AND is_active;

-- 19. Memoria Familiar Hermano Porque nuestros Caminos Siempre se Cruzan
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi19hermanop${APODO_DESTINATARIO}, nos tocaron rutas distintas:
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
que nos daba la ciudad$siempreseraspartedemi19hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi19hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_19_el_lazo_que_no_aprende_a_irse_hermano.webp$siempreseraspartedemi19hermanok$ AND is_active;

-- 17. Memoria Familiar Hermana Porque eres la Magia de mi Invierno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi17hermanap$En julio hacía mucho frío
y armábamos un lío
de mantas en la sala
para ver la tele mala

Traías pan con mantequilla
y té, {APODO_DESTINATARIO}, en la vajilla
rota, y era suficiente
para aguantar la corriente

Hoy tengo calefacción
y una manta de edición
limitada, y aun así
siento julio desde aquí$siempreseraspartedemi17hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi17hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_37_la_luz_que_dejo_tu_risa_hermana.webp$siempreseraspartedemi17hermanak$ AND is_active;

--  8. Memoria Familiar Hermana Porque viajamos en Nuestro Propio Tiempo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi8hermanap$Medíamos el tiempo en tandas
de dibujos y de mandas
del almuerzo, nunca en horas,
y nos sobraban las demoras

Un verano se estiraba
y con {APODO_DESTINATARIO} no acababa:
cabían cuarenta inventos
y aún sobraban momentos

Hoy el año se me pasa
en tres reuniones y una casa
que atender; y pienso cuánto
nos duraba un solo canto$siempreseraspartedemi8hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi8hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_28_el_puente_de_nuestras_peleas_y_risas_hermana.webp$siempreseraspartedemi8hermanak$ AND is_active;

-- 18. Memoria Familiar Hermana Porque nos reímos del Peligro
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi18hermanap$Bajamos el cerro en cartón
sin casco y sin razón,
nos raspamos las rodillas
y nos dolió de risa

Contábamos la caída
como hazaña repetida
cada almuerzo, aumentando
la altura y el barranco

Hoy mido el riesgo y lo evito,
leo el contrato chiquito,
y a veces, {APODO_DESTINATARIO}, me provoca
tirarme otra vez por la roca$siempreseraspartedemi18hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi18hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_38_la_esquina_donde_empieza_la_memoria_hermana.webp$siempreseraspartedemi18hermanak$ AND is_active;

-- 11. Memoria Familiar Hermana Porque juntos Somos Invencibles
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi11hermanap$Nos atamos dos toallas
al cuello, y las murallas
del barrio se hacían chicas:
nada nos daba fatiga

Contigo, {APODO_DESTINATARIO}, no había
problema que durara un día:
se partía por la mitad
y perdía la gravedad

Hoy divido los problemas
con terapia y con esquemas,
y funciona, pero no igual:
falta el otro en el total$siempreseraspartedemi11hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi11hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_31_la_mesa_de_nuestras_conspiraciones_hermana.webp$siempreseraspartedemi11hermanak$ AND is_active;

-- 13. Memoria Familiar Hermano Porque somos el Yin de mi Yang
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi13hermanop${APODO_DESTINATARIO}, tú ordenabas, yo rompía;
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
de freno, y no de mito$siempreseraspartedemi13hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi13hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_13_la_carrera_hasta_el_fin_del_mundo_hermano.webp$siempreseraspartedemi13hermanok$ AND is_active;

--  6. Memoria Familiar Hermana Porque eres mi Copiloto Eterno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi6hermanap$Manejábamos sin permiso
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
hablo igual, {APODO_DESTINATARIO}, de callado$siempreseraspartedemi6hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi6hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_26_el_mapa_de_nuestros_secretos_hermana.webp$siempreseraspartedemi6hermanak$ AND is_active;

-- 11. Memoria Familiar Hermano Porque juntos Somos Invencibles
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi11hermanop$Nos atamos dos toallas
al cuello, y las murallas
del barrio se hacían chicas:
nada nos daba fatiga

Contigo, {APODO_DESTINATARIO}, no había
problema que durara un día:
se partía por la mitad
y perdía la gravedad

Hoy divido los problemas
con terapia y con esquemas,
y funciona, pero no igual:
falta el otro en el total$siempreseraspartedemi11hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi11hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_11_la_mesa_de_nuestras_conspiraciones_hermano.webp$siempreseraspartedemi11hermanok$ AND is_active;

--  4. Memoria Familiar Hermana Porque resolvemos Todos los Misterios
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi4hermanap${APODO_DESTINATARIO}, hallamos una llave
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
que todavía está guardada$siempreseraspartedemi4hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi4hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_24_la_promesa_de_seguir_jugando_hermana.webp$siempreseraspartedemi4hermanak$ AND is_active;

--  1. Memoria Familiar Hermana Porque somos el Mejor Equipo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi1hermanap${APODO_DESTINATARIO}, jugábamos de a dos
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
y pierdo casi todo el juego$siempreseraspartedemi1hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi1hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_21_el_equipo_que_sigue_conmigo_hermana.webp$siempreseraspartedemi1hermanak$ AND is_active;

-- 20. Memoria Familiar Hermana Porque nuestro Vínculo es Eterno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi20hermanap$No se deshace lo que fuimos
porque uno se haya ido:
el nudo quedó hecho
y aguanta cualquier trecho

Te nombro poco, {APODO_DESTINATARIO}, y despacio,
pero te hago siempre espacio
en cualquier conversación:
estás en cada versión

Si algo queda de nosotros
no es la foto ni los otros
recuerdos: es el modo
en que digo "nosotros" todo$siempreseraspartedemi20hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi20hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_40_siempre_seras_parte_de_mi_hermana.webp$siempreseraspartedemi20hermanak$ AND is_active;

--  9. Memoria Familiar Hermano Porque volamos a Nunca Jamás
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi9hermanop$Saltábamos desde la cama
jurando que se volaba
si uno creía bastante,
y creíamos, y era antes

Una vez te rompiste el brazo
y no lloraste ni un rato:
dijiste que habías volado
dos segundos, y era un dato

Hoy no salto de ningún lado
y tengo el seguro pagado,
pero a veces, {APODO_DESTINATARIO}, en sueños,
volamos los dos, pequeños$siempreseraspartedemi9hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi9hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_09_la_cancion_que_era_de_los_dos_hermano.webp$siempreseraspartedemi9hermanok$ AND is_active;

--  6. Memoria Familiar Hermano Porque eres mi Copiloto Eterno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi6hermanop$Manejábamos sin permiso
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
hablo igual, {APODO_DESTINATARIO}, de callado$siempreseraspartedemi6hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi6hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_06_el_mapa_de_nuestros_secretos_hermano.webp$siempreseraspartedemi6hermanok$ AND is_active;

-- 12. Memoria Familiar Hermano Porque somos Cazafantasmas de Miedos
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi12hermanop$Revisábamos el armario
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
te nombro, {APODO_DESTINATARIO}, y me calmo$siempreseraspartedemi12hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi12hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_12_el_album_donde_seguimos_juntos_hermano.webp$siempreseraspartedemi12hermanok$ AND is_active;

-- 15. Memoria Familiar Hermana Porque somos Rivales y Mejores Amigos
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi15hermanap$Nos peleábamos a diario
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
{APODO_DESTINATARIO}, ganar sin tu partido$siempreseraspartedemi15hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi15hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_35_la_noche_de_nuestras_historias_hermana.webp$siempreseraspartedemi15hermanak$ AND is_active;

--  9. Memoria Familiar Hermana Porque volamos a Nunca Jamás
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi9hermanap$Saltábamos desde la cama
jurando que se volaba
si uno creía bastante,
y creíamos, y era antes

Una vez te rompiste el brazo
y no lloraste ni un rato:
dijiste que habías volado
dos segundos, y era un dato

Hoy no salto de ningún lado
y tengo el seguro pagado,
pero a veces, {APODO_DESTINATARIO}, en sueños,
volamos los dos, pequeños$siempreseraspartedemi9hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi9hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_29_la_cancion_que_era_de_los_dos_hermana.webp$siempreseraspartedemi9hermanak$ AND is_active;

--  7. Memoria Familiar Hermano Porque llegamos Hasta el Fin del Mundo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi7hermanop${APODO_DESTINATARIO}, llegamos hasta el muro
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
y ninguno me da ese gozo$siempreseraspartedemi7hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi7hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_07_la_tarde_donde_todavia_te_escucho_hermano.webp$siempreseraspartedemi7hermanok$ AND is_active;

--  5. Memoria Familiar Hermano Porque eres mi Compañero de Infinito
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi5hermanop$Mirábamos el techo a oscuras
y contábamos locuras
de lo que íbamos a ser:
astronautas, o chofer

Nos cabía el infinito,
{APODO_DESTINATARIO}, en ese cuartito
de dos camas y un ropero,
y sobraba el universo

Hoy tengo casa de verdad
y menos capacidad
de soñar; y me hace falta
tu voz desde la otra cama$siempreseraspartedemi5hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi5hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_05_la_complicidad_que_no_se_rompe_hermano.webp$siempreseraspartedemi5hermanok$ AND is_active;

-- 14. Memoria Familiar Hermano Porque eres mi Refugio Constante
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi14hermanop$Cuando en casa había gritos
me iba a tu cuarto, y los pitos
de la discusión quedaban
detrás de una puerta blanca

No preguntabas nada, {APODO_DESTINATARIO}:
corrías la silla y bastaba,
me dejabas la mitad
y seguías con tu verdad

Hoy pago un alquiler propio
con puerta y doble cerrojo,
y a veces busco de noche
una silla que se corre$siempreseraspartedemi14hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi14hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_14_el_codigo_de_hermanos_hermano.webp$siempreseraspartedemi14hermanok$ AND is_active;

--  5. Memoria Familiar Hermana Porque eres mi Compañera de Infinito
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi5hermanap$Mirábamos el techo a oscuras
y contábamos locuras
de lo que íbamos a ser:
astronautas, o chofer

Nos cabía el infinito,
{APODO_DESTINATARIO}, en ese cuartito
de dos camas y un ropero,
y sobraba el universo

Hoy tengo casa de verdad
y menos capacidad
de soñar; y me hace falta
tu voz desde la otra cama$siempreseraspartedemi5hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi5hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_25_la_complicidad_que_no_se_rompe_hermana.webp$siempreseraspartedemi5hermanak$ AND is_active;

-- 10. Memoria Familiar Hermana Porque nos Protegemos la Espalda
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi10hermanap${APODO_DESTINATARIO}, te pusiste delante
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
a ponerse donde debe$siempreseraspartedemi10hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi10hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_30_la_patrulla_de_infancia_eterna_hermana.webp$siempreseraspartedemi10hermanak$ AND is_active;

-- 14. Memoria Familiar Hermana Porque eres mi Refugio Constante
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi14hermanap$Cuando en casa había gritos
me iba a tu cuarto, y los pitos
de la discusión quedaban
detrás de una puerta blanca

No preguntabas nada, {APODO_DESTINATARIO}:
corrías la silla y bastaba,
me dejabas la mitad
y seguías con tu verdad

Hoy pago un alquiler propio
con puerta y doble cerrojo,
y a veces busco de noche
una silla que se corre$siempreseraspartedemi14hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi14hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_34_el_codigo_de_hermanos_hermana.webp$siempreseraspartedemi14hermanak$ AND is_active;

-- 10. Memoria Familiar Hermano Porque nos Protegemos la Espalda
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi10hermanop${APODO_DESTINATARIO}, te pusiste delante
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
a ponerse donde debe$siempreseraspartedemi10hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi10hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_10_la_patrulla_de_infancia_eterna_hermano.webp$siempreseraspartedemi10hermanok$ AND is_active;

--  8. Memoria Familiar Hermano Porque viajamos en Nuestro Propio Tiempo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi8hermanop$Medíamos el tiempo en tandas
de dibujos y de mandas
del almuerzo, nunca en horas,
y nos sobraban las demoras

Un verano se estiraba
y con {APODO_DESTINATARIO} no acababa:
cabían cuarenta inventos
y aún sobraban momentos

Hoy el año se me pasa
en tres reuniones y una casa
que atender; y pienso cuánto
nos duraba un solo canto$siempreseraspartedemi8hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi8hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_peleas_y_risas_hermano.webp$siempreseraspartedemi8hermanok$ AND is_active;

-- 16. Memoria Familiar Hermana Porque cantamos la Misma Canción
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi16hermanap${APODO_DESTINATARIO}, sabíamos la cumbia
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
y el silencio queda largo$siempreseraspartedemi16hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi16hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_36_el_jardin_de_los_recuerdos_vivos_hermana.webp$siempreseraspartedemi16hermanak$ AND is_active;

--  4. Memoria Familiar Hermano Porque resolvemos Todos los Misterios
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi4hermanop${APODO_DESTINATARIO}, hallamos una llave
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
que todavía está guardada$siempreseraspartedemi4hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi4hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_04_la_promesa_de_seguir_jugando_hermano.webp$siempreseraspartedemi4hermanok$ AND is_active;

-- 16. Memoria Familiar Hermano Porque cantamos la Misma Canción
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi16hermanop${APODO_DESTINATARIO}, sabíamos la cumbia
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
y el silencio queda largo$siempreseraspartedemi16hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi16hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_16_el_jardin_de_los_recuerdos_vivos_hermano.webp$siempreseraspartedemi16hermanok$ AND is_active;

--  2. Memoria Familiar Hermana Porque somos Cómplices de Travesuras
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi2hermanap$Rompimos el vidrio del fondo
y juramos, muy redondo,
que había sido la pelota
sola, sin mano ni bota

Nos castigaron juntos
y a {APODO_DESTINATARIO}, en esos puntos,
le daba risa la pared
mientras yo pasaba sed

Hoy pago los vidrios que rompo
y nadie se echa el plomo
por mí; firmo yo el papel
y me falta el cómplice fiel$siempreseraspartedemi2hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi2hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_22_la_ruta_de_nuestras_bromas_hermana.webp$siempreseraspartedemi2hermanak$ AND is_active;

--  3. Memoria Familiar Hermano Porque nuestras Locuras Tienen Sentido
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi3hermanop$Armamos un bote en la acequia
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
tuya, {APODO_DESTINATARIO}, de ir sin espera$siempreseraspartedemi3hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi3hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_03_el_refugio_de_nuestras_locuras_hermano.webp$siempreseraspartedemi3hermanok$ AND is_active;

-- 15. Memoria Familiar Hermano Porque somos Rivales y Mejores Amigos
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi15hermanop$Nos peleábamos a diario
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
{APODO_DESTINATARIO}, ganar sin tu partido$siempreseraspartedemi15hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi15hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_15_la_noche_de_nuestras_historias_hermano.webp$siempreseraspartedemi15hermanok$ AND is_active;

--  2. Memoria Familiar Hermano Porque somos Cómplices de Travesuras
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi2hermanop$Rompimos el vidrio del fondo
y juramos, muy redondo,
que había sido la pelota
sola, sin mano ni bota

Nos castigaron juntos
y a {APODO_DESTINATARIO}, en esos puntos,
le daba risa la pared
mientras yo pasaba sed

Hoy pago los vidrios que rompo
y nadie se echa el plomo
por mí; firmo yo el papel
y me falta el cómplice fiel$siempreseraspartedemi2hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi2hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_02_la_ruta_de_nuestras_bromas_hermano.webp$siempreseraspartedemi2hermanok$ AND is_active;

-- 12. Memoria Familiar Hermana Porque somos Cazafantasmas de Miedos
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi12hermanap$Revisábamos el armario
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
te nombro, {APODO_DESTINATARIO}, y me calmo$siempreseraspartedemi12hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi12hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_32_el_album_donde_seguimos_juntos_hermana.webp$siempreseraspartedemi12hermanak$ AND is_active;

-- 13. Memoria Familiar Hermana Porque somos el Yin de mi Yang
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi13hermanap${APODO_DESTINATARIO}, tú ordenabas, yo rompía;
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
de freno, y no de mito$siempreseraspartedemi13hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi13hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_33_la_carrera_hasta_el_fin_del_mundo_hermana.webp$siempreseraspartedemi13hermanak$ AND is_active;

-- 18. Memoria Familiar Hermano Porque nos reímos del Peligro
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi18hermanop$Bajamos el cerro en cartón
sin casco y sin razón,
nos raspamos las rodillas
y nos dolió de risa

Contábamos la caída
como hazaña repetida
cada almuerzo, aumentando
la altura y el barranco

Hoy mido el riesgo y lo evito,
leo el contrato chiquito,
y a veces, {APODO_DESTINATARIO}, me provoca
tirarme otra vez por la roca$siempreseraspartedemi18hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi18hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_18_la_esquina_donde_empieza_la_memoria_hermano.webp$siempreseraspartedemi18hermanok$ AND is_active;

--  1. Memoria Familiar Hermano Porque somos el Mejor Equipo
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi1hermanop${APODO_DESTINATARIO}, jugábamos de a dos
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
y pierdo casi todo el juego$siempreseraspartedemi1hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi1hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_01_el_equipo_que_sigue_conmigo_hermano.webp$siempreseraspartedemi1hermanok$ AND is_active;

-- 17. Memoria Familiar Hermano Porque eres la Magia de mi Invierno
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi17hermanop$En julio hacía mucho frío
y armábamos un lío
de mantas en la sala
para ver la tele mala

Traías pan con mantequilla
y té, {APODO_DESTINATARIO}, en la vajilla
rota, y era suficiente
para aguantar la corriente

Hoy tengo calefacción
y una manta de edición
limitada, y aun así
siento julio desde aquí$siempreseraspartedemi17hermanop$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi17hermanok$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_17_la_luz_que_dejo_tu_risa_hermano.webp$siempreseraspartedemi17hermanok$ AND is_active;

--  3. Memoria Familiar Hermana Porque nuestras Locuras Tienen Sentido
UPDATE personalized_templates SET
  poem_template = $siempreseraspartedemi3hermanap$Armamos un bote en la acequia
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
tuya, {APODO_DESTINATARIO}, de ir sin espera$siempreseraspartedemi3hermanap$,
  updated_at = now()
WHERE template_preview_key = $siempreseraspartedemi3hermanak$IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_23_el_refugio_de_nuestras_locuras_hermana.webp$siempreseraspartedemi3hermanak$ AND is_active;
