-- Poemas originales para el libro adulto (modelo 9867).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

-- 17. Memoria Familiar Madre Porque eres mi Raíz y mi Fuerza
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre17hijap$Trajiste semillas guardadas
desde el pueblo, en bolsas gastadas,
y sembraste en una lata
lo que hoy da sombra a la casa

Tu fuerza no se veía,
{APODO_DESTINATARIO}, se comía:
estaba en el arroz
y en levantarse a las dos

Hoy mi hija come lo mismo
y no sabe el abismo
que costó esa receta,
ni la mano que la aprieta$miangelguardianmadre17hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre17hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$miangelguardianmadre17hijak$ AND is_active;

-- 10. Memoria Familiar Madre Porque eres una Soñadora
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre10hijap${APODO_DESTINATARIO}, querías ser maestra
y te quedaste en la puerta
de la escuela, limpiando
mientras otros iban entrando

Guardabas libros usados
en cajas, bien ordenados,
y leías de madrugada
cuando la casa callaba

Hoy soy yo la que enseña
en un aula pequeña,
y en cada lista que paso
te nombro, bajo y despacio$miangelguardianmadre10hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre10hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$miangelguardianmadre10hijak$ AND is_active;

--  7. Memoria Familiar Madre Porque eres Divertida
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre7hijap${APODO_DESTINATARIO}, encendías la radio
y bailabas con el trapo
en la mano, sin terminar
de limpiar ni de cantar

Te reías de ti primero,
contabas tu propio enredo
como chiste, y la semana
se volvía menos tirana

Hoy pago para distraerme,
con pantallas que me duermen,
y la risa más barata
me la dabas tú, sin plata$miangelguardianmadre7hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre7hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$miangelguardianmadre7hijak$ AND is_active;

-- 14. Memoria Familiar Madre Porque eres una Rebelde
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre14hijap$Te peleaste con el director
por una nota y un error
que no era mío, y ganaste
sin alzar la voz un instante

Decían que eras pesada
y lo eras, {APODO_DESTINATARIO}, y armada
de respuestas afiladas
contra las puertas cerradas

Hoy me dicen lo mismo a mí
y lo tomo como un sí,
como un apellido heredado
que me queda bien usado$miangelguardianmadre14hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre14hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$miangelguardianmadre14hijak$ AND is_active;

-- 16. Memoria Familiar Madre Porque eres mi Guardiana de Historias
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre16hijap${APODO_DESTINATARIO}, guardabas los nombres
de tíos, primos y hombres
que ya nadie recordaba,
y la fecha en que se casaba

Contabas de dónde veníamos
y por qué nos perdíamos
en Puno cada verano,
y quién nos tendió la mano

Hoy pregunto y nadie sabe,
se fue contigo la llave
de todo ese parentesco,
y escribo lo que recuerdo$miangelguardianmadre16hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre16hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$miangelguardianmadre16hijak$ AND is_active;

-- 12. Memoria Familiar Madre Porque eres Generosa
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre12hijap$Servías cinco platos
con comida para cuatro,
y el tuyo salía al final:
el más chico, y daba igual

Dabas lo que te faltaba
diciendo que te sobraba,
y nadie lo notó a tiempo,
ni yo, que estaba dentro

Hoy reparto mejor las porciones
y me sirvo sin razones
de culpa: me enseñó tu ausencia,
{APODO_DESTINATARIO}, lo que no fue prudencia$miangelguardianmadre12hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre12hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$miangelguardianmadre12hijak$ AND is_active;

--  1. Memoria Familiar Madre Porque eres mi Superheroína
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre1hijap${APODO_DESTINATARIO}, no usabas uniforme:
un mandil y un peine enorme,
levantabas cuatro vidas
antes de las seis cumplidas

Nadie te vio descansar
ni te escuchó reclamar,
dormías la última
y amanecías la única

Hoy sostengo una familia
y se me cae la vigilia,
y pienso cómo lo hacías
sin aplausos ni guías$miangelguardianmadre1hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre1hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$miangelguardianmadre1hijak$ AND is_active;

--  9. Memoria Familiar Madre Porque eres Valiente
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre9hijap$Firmaste sola el papel
que nadie quiso leer,
y volviste a hacer la cena
como si no hubiera pena

Nunca te vi llorar de frente,
lo hacías cuando no había gente,
de espaldas, junto al caño,
con el agua haciendo daño

Hoy lloro cuando me toca
y no me tapo la boca,
porque aprendí, {APODO_DESTINATARIO}, al final,
que guardarlo cuesta igual$miangelguardianmadre9hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre9hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$miangelguardianmadre9hijak$ AND is_active;

--  3. Memoria Familiar Madre Porque eres una Hechicera
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre3hijap$Curabas con hierba y vapor,
con un trapo y buen humor,
y el dolor de barriga
se iba como una hormiga

Decías que era agua de anís
y era tu mano en mi nariz,
tu voz contando bajito
mientras pasaba el ratito

Hoy compro pastillas de marca
y leo todo lo que abarca
el prospecto, y no hay nada,
{APODO_DESTINATARIO}, como tu mirada$miangelguardianmadre3hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre3hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$miangelguardianmadre3hijak$ AND is_active;

-- 18. Memoria Familiar Madre Porque eres mi Estrella Guía
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre18hijap$No miro al cielo a buscarte,
te busco en cualquier parte
donde algo queda bien hecho
y nadie reclama el derecho

Apareces en los detalles:
la ropa doblada en los valles
del cajón, la olla tapada,
la puerta bien cerrada

No necesito mirar arriba
para saber quién me cuida,
{APODO_DESTINATARIO}: la luz que dejaste
está en lo que enseñaste$miangelguardianmadre18hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre18hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$miangelguardianmadre18hijak$ AND is_active;

-- 20. Memoria Familiar Madre Porque eres mi Ángel Guardián
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre20hijap$Ya hiciste todas las guardias
y cumpliste con las jornadas,
descansa de una vez, tranquila,
que esta casa ya camina

Te hablo mientras cocino,
{APODO_DESTINATARIO}, y me sale fino
el guiso, igual que antes,
sin tus manos delante

Si hay algo después de esto
espero que sea un puesto
con silla y con ventana,
y que no limpies nada$miangelguardianmadre20hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre20hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$miangelguardianmadre20hijak$ AND is_active;

--  6. Memoria Familiar Madre Porque eres Aventurera
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre6hijap$Subías al cerro en sandalia
con dos bolsas y una toalla,
decías "hasta esa peña"
y llegábamos sin seña

No teníamos carro ni plata,
nos sobraba la caminata,
volvíamos quemadas y enteras
con tunas en las carteras

Hoy viajo en avión y me quejo
del asiento y del reflejo
del sol, y extraño ese cerro
contigo, {APODO_DESTINATARIO}, y sin dinero$miangelguardianmadre6hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre6hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$miangelguardianmadre6hijak$ AND is_active;

--  5. Memoria Familiar Madre Porque eres Encantadora
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre5hijap$Entrabas al mercado y sabían
tu nombre, y te servían
lo mejor del mostrador
sin que pidieras favor

Conversabas con cualquiera,
{APODO_DESTINATARIO}, con toda la vereda,
y volvías con la bolsa llena
y con una historia ajena

Hoy encargo por pantalla,
sin saludo y sin batalla,
la bolsa llega completa
y la conversación, secreta$miangelguardianmadre5hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre5hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$miangelguardianmadre5hijak$ AND is_active;

-- 11. Memoria Familiar Madre Porque me haces sentir a Salvo
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre11hijap$Te quedabas hasta que el sueño
me ganaba el empeño,
sentada en el borde, quieta,
sin apagar la silueta

Con tu mano sobre mi frente
no existía el accidente,
{APODO_DESTINATARIO}, ni la fiebre alta,
ni la noche que no acaba

Hoy duermo con alarma puesta
y reviso dos veces la puerta,
pero el único seguro
era tu mano, te lo juro$miangelguardianmadre11hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre11hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$miangelguardianmadre11hijak$ AND is_active;

-- 13. Memoria Familiar Madre Porque eres Atrevida
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre13hijap${APODO_DESTINATARIO}, te cortaste el pelo
un martes, sin más anhelo
que verte distinta un rato,
y salió bastante exacto

Fuiste al banco a reclamar
con la voz sin temblar
y la fila entera aplaudió
cuando el gerente cedió

Hoy mando correos formales
para pedir lo que vale,
y a veces cierro el teclado
y reclamo a tu estilo, al lado$miangelguardianmadre13hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre13hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$miangelguardianmadre13hijak$ AND is_active;

-- 15. Memoria Familiar Madre Porque eres Alegre
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre15hijap$Cantabas mal y a todo pulmón
mientras fregabas el fogón,
y la casa entera sabía
que ese día había alegría

Poníamos la mesa afuera
cuando el sol daba en la acera,
y cenábamos sin apuro
con medio barrio seguro

Hoy mi casa está callada
y queda bien ordenada,
pero pongo esa canción
y vuelves, {APODO_DESTINATARIO}, de un tirón$miangelguardianmadre15hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre15hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$miangelguardianmadre15hijak$ AND is_active;

--  8. Memoria Familiar Madre Porque cumples mis Deseos
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre8hijap$Quería un vestido de tienda
y cosiste uno con la prenda
vieja de mi tía Lucila,
y salió una maravilla

Nunca pediste a cambio
nada, {APODO_DESTINATARIO}, ni un abrazo,
guardabas los alfileres
y seguías con tus quehaceres

Hoy compro lo que quiero
y nada me queda entero
como ese vestido cosido
de noche, y sin ruido$miangelguardianmadre8hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre8hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$miangelguardianmadre8hijak$ AND is_active;

-- 19. Memoria Familiar Madre Porque eres mi Viajera del Tiempo
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre19hijap${APODO_DESTINATARIO}, medías en tareas,
no en horas ni en ideas:
"cuando termine esta ropa",
"cuando se enfríe la sopa"

Tu día tenía más horas
que el mío, y sin demoras
te alcanzaba para todo,
hasta para el que llegó solo

Hoy tengo una agenda llena
y el día no vale la pena
de tan corto; mido el reloj
y no me alcanza ni hoy$miangelguardianmadre19hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre19hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$miangelguardianmadre19hijak$ AND is_active;

--  4. Memoria Familiar Madre Porque eres una Reina Líder
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre4hijap${APODO_DESTINATARIO}, reinabas en la cocina
sin corona y sin vitrina,
repartías el pan y la tarea
y nadie quedaba afuera

Las decisiones de la casa
se cocinaban a tu brasa:
escuchabas a los cuatro
y después hablabas un rato

Hoy dirijo a doce personas
y no uso ninguna corona,
escucho a todas primero
y decido al final, severo$miangelguardianmadre4hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre4hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$miangelguardianmadre4hijak$ AND is_active;

--  2. Memoria Familiar Madre Porque eres mi Guía
UPDATE personalized_templates SET
  poem_template = $miangelguardianmadre2hijap$No me dabas la solución,
me devolvías la cuestión,
y esperabas sin apuro
que yo sola diera el turno

Miraba cómo decidías
y copiaba, {APODO_DESTINATARIO}, tus vías:
despacio, sin alboroto,
sin deberle nada a otro

Hoy me preguntan a mí
y contesto como aprendí:
pregunto de vuelta, y aguanto
el silencio, que es tanto$miangelguardianmadre2hijap$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianmadre2hijak$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$miangelguardianmadre2hijak$ AND is_active;
