-- Poemas originales para el libro adulto (modelo 9864).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  9. Memoria Familiar Abuelo Porque eres Valiente
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo9nietop$Le hablaste claro al patrón
con el sombrero en el bastón
y sin bajar la mirada,
y te costó la jornada

Volviste a casa sin trabajo
y sin decir nada abajo,
buscaste otro en la mañana
y seguiste con tus ganas

Hoy aguanto cosas peores
por un sueldo y sus honores,
y me pregunto qué dirías,
{APODO_DESTINATARIO}, de estas cobardías$siempreenmicorazonabuelo9nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo9nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$siempreenmicorazonabuelo9nietok$ AND is_active;

--  3. Memoria Familiar Abuelo Porque eres un Hechicero
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo3nietop$Componías con un clavo
lo que el mundo había dañado:
la radio, la bicicleta,
el reloj y la carreta

Decías que no era magia,
que era paciencia y rabia
contra tirar las cosas,
y salían milagrosas

Hoy todo viene sellado
y nada se abre al costado,
tiro lo que se malogra
y te pido perdón, {APODO_DESTINATARIO}, ahora$siempreenmicorazonabuelo3nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo3nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$siempreenmicorazonabuelo3nietok$ AND is_active;

-- 20. Memoria Familiar Abuelo Porque eres mi Ángel Guardián
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo20nietop$No te imagino en el cielo:
te imagino en ese suelo
de la chacra, con la pala
y el sombrero de palma

Cuando riego las macetas
te hablo, {APODO_DESTINATARIO}, y me contestas
con el olor de la tierra
mojada, que no se cierra

No sé si me oyes o no
y hace años que no me importó:
alcanza con que la costumbre
siga, y con que alumbre$siempreenmicorazonabuelo20nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo20nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$siempreenmicorazonabuelo20nietok$ AND is_active;

-- 15. Memoria Familiar Abuelo Porque eres Alegre
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo15nietop$Ponías la radio en el patio
y gritabas cada rato
con el fútbol, aunque el equipo
perdiera por cualquier motivo

Bailabas con mi abuela
una marinera entera
sin música, en la cocina,
solo porque había neblina

Hoy veo partidos callado
y solo, en un cuarto cerrado,
pero a veces grito un gol
y apareces, {APODO_DESTINATARIO}, con el sol$siempreenmicorazonabuelo15nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo15nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$siempreenmicorazonabuelo15nietok$ AND is_active;

-- 13. Memoria Familiar Abuelo Porque eres Atrevido
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo13nietop${APODO_DESTINATARIO}, pediste su mano
cantando, en pleno verano,
delante de todo el pueblo
y sin afinar un pelo

Te metiste a la laguna
vestido, sin más fortuna
que una apuesta de dos soles,
y ganaste a los mayores

Hoy lo pienso tres veces
antes de hacer mis preces,
y a veces me tiro al agua
solo por ver si me aguanta$siempreenmicorazonabuelo13nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo13nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$siempreenmicorazonabuelo13nietok$ AND is_active;

--  8. Memoria Familiar Abuelo Porque cumples mis Deseos
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo8nietop$Pedí una bicicleta
y llegaste con la grieta
de una vieja bien pintada
que corría más que nada

No era la que yo quería:
era, {APODO_DESTINATARIO}, la que servía
veinte años sin fallar,
y hoy la puedo pedalear

Hoy compro cosas que duran
dos años y se apuran
en romperse, y pienso en esa
bicicleta que no cesa$siempreenmicorazonabuelo8nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo8nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$siempreenmicorazonabuelo8nietok$ AND is_active;

--  2. Memoria Familiar Abuelo Porque eres mi Guía
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo2nietop$Me llevabas a la chacra
y no decías palabra:
señalabas la acequia
y esperabas mi respuesta

Miraba cómo medías
el riego, {APODO_DESTINATARIO}, y las vías
del agua entre los surcos,
y aprendí sin discursos

Hoy enseño hablando mucho
lo que tú dejabas al surco
que hablara, y me pregunto
si no era mejor tu punto$siempreenmicorazonabuelo2nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo2nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$siempreenmicorazonabuelo2nietok$ AND is_active;

-- 17. Memoria Familiar Abuelo Porque eres mi Raíz y mi Fuerza
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo17nietop$Plantaste árboles jóvenes
en la ladera sin órdenes,
solo porque el cerro cedía
y nadie más lo veía

Ese cerro todavía aguanta
y la ladera, {APODO_DESTINATARIO}, no espanta
a nadie cuando llueve fuerte,
porque tu raíz la sostiene

Hoy firmo informes de riesgo
y hablo de suelos y de sesgo,
y tú lo arreglaste antes
con una pala y dos guantes$siempreenmicorazonabuelo17nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo17nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$siempreenmicorazonabuelo17nietok$ AND is_active;

-- 14. Memoria Familiar Abuelo Porque eres un Rebelde
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo14nietop$No firmaste ese documento
que firmaron todos a tiempo,
dijiste que no era justo
y aguantaste el disgusto

Te dieron la razón más tarde,
{APODO_DESTINATARIO}, cuando ya era alarde
inútil, y nadie se acuerda
de quién aguantó la cuerda

Hoy firmo casi todo
y me acomodo de modo
que nadie se moleste,
y pienso en lo que cueste$siempreenmicorazonabuelo14nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo14nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$siempreenmicorazonabuelo14nietok$ AND is_active;

--  1. Memoria Familiar Abuelo Porque eres mi Superhéroe
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo1nietop${APODO_DESTINATARIO}, tu fuerza era de pala,
no de músculo ni de bala,
movías la tierra temprano
con el sombrero en la mano

Levantaste cinco hijos
con dos surcos y unos fijos
jornales que no alcanzaban,
y nunca te lo cobraban

Hoy tengo un trabajo blando
y me quejo si ando
de pie más de dos horas,
y pienso en tus auroras$siempreenmicorazonabuelo1nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo1nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$siempreenmicorazonabuelo1nietok$ AND is_active;

--  5. Memoria Familiar Abuelo Porque eres Encantador
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo5nietop$Te sacabas el sombrero
para hablar con cualquier obrero,
tratabas de usted al chofer
y de señora a la mujer

No dejabas ir a nadie
sin un pan, {APODO_DESTINATARIO}, y un mate,
preguntabas por la familia
y te acordabas de la hija

Hoy saludo con la cabeza
y camino con prisa inglesa,
y esa herencia bien cortés
se me quedó en el ayer$siempreenmicorazonabuelo5nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo5nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$siempreenmicorazonabuelo5nietok$ AND is_active;

--  4. Memoria Familiar Abuelo Porque eres un Líder
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo4nietop${APODO_DESTINATARIO}, presidías la mesa
sin pedir ninguna pieza
de respeto: alcanzaba
el modo en que te sentabas

Repartías la palabra
como se reparte el agua:
primero el que tiene sed,
después el que tiene red

Hoy me toca presidir
reuniones y decidir,
y busco tu modo lento
de dejar hablar a ciento$siempreenmicorazonabuelo4nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo4nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$siempreenmicorazonabuelo4nietok$ AND is_active;

-- 18. Memoria Familiar Abuelo Porque eres mi Estrella Guía
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo18nietop$Me mostraste las tres marías
y el nombre que les decían
en quechua, y la hora exacta
para sembrar la alfalfa

Decías que el cielo es un reloj
que nunca falla ni hoy,
y que el que aprende a mirarlo
no necesita calendario

Hoy uso una aplicación
para saber la estación,
y salgo igual a mirar
el cielo, {APODO_DESTINATARIO}, a esperar$siempreenmicorazonabuelo18nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo18nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$siempreenmicorazonabuelo18nietok$ AND is_active;

--  7. Memoria Familiar Abuelo Porque eres Divertido
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo7nietop${APODO_DESTINATARIO}, contabas el mismo chiste
cada almuerzo, y nadie insiste
en recordarte que ya fue:
nos reíamos otra vez

Imitabas al vecino,
al cura y al sobrino,
y mi abuela te miraba
riéndose, aunque te regañaba

Hoy mis chistes son de oficina
y se mueren en la esquina
del correo, sin vitrina,
y pienso en esa rutina$siempreenmicorazonabuelo7nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo7nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$siempreenmicorazonabuelo7nietok$ AND is_active;

--  6. Memoria Familiar Abuelo Porque eres Aventurero
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo6nietop$Cruzamos el río en balsa
porque el puente no alcanzaba,
dijiste "agárrate fuerte"
y nos reímos de la suerte

Subíamos de madrugada
sin linterna y sin nada,
llegábamos con el sol
y un termo de alcohol

Hoy pido permiso en la casa
para salir sin tardanza,
y me falta esa manera
tuya, {APODO_DESTINATARIO}, de ir afuera$siempreenmicorazonabuelo6nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo6nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$siempreenmicorazonabuelo6nietok$ AND is_active;

-- 12. Memoria Familiar Abuelo Porque eres Generoso
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo12nietop$Dabas propina de más
al que cargaba el costal,
preguntabas por su nombre
y pagabas como un hombre

Repartías la cosecha
antes de guardar la fecha
de lo tuyo, y siempre faltaba
algo que igual alcanzaba

Hoy calculo lo que doy
y lo anoto donde estoy,
pero al ver una carretilla
suelto, {APODO_DESTINATARIO}, la semilla$siempreenmicorazonabuelo12nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo12nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$siempreenmicorazonabuelo12nietok$ AND is_active;

-- 10. Memoria Familiar Abuelo Porque eres un Soñador
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo10nietop${APODO_DESTINATARIO}, querías una casa
con corredor y terraza
mirando al valle entero,
y la dibujabas primero

Juntabas ladrillo a ladrillo
cada cosecha, sin brillo,
y el techo llegó al final,
cuando ya te daba igual

Hoy vivo en un departamento
sin corredor y sin viento,
pero puse una banca afuera
mirando lo que se vea$siempreenmicorazonabuelo10nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo10nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$siempreenmicorazonabuelo10nietok$ AND is_active;

-- 16. Memoria Familiar Abuelo Porque eres mi Guardián de Historias
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo16nietop${APODO_DESTINATARIO}, sabías qué había
donde hoy hay una avenida:
un molino, un eucalipto
y el taller de don Benito

Contabas de la sequía
del cincuenta, y la alegría
del agua cuando volvió,
y nadie te interrumpió

Hoy busco esas esquinas
y el mapa no las adivina,
y lo único que me queda
es tu voz sobre la vereda$siempreenmicorazonabuelo16nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo16nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$siempreenmicorazonabuelo16nietok$ AND is_active;

-- 19. Memoria Familiar Abuelo Porque eres mi Viajero del Tiempo
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo19nietop${APODO_DESTINATARIO}, no mirabas la hora:
mirabas cómo se demora
la sombra del molle en el piso,
y con eso tenías aviso

Un día tuyo tenía
tres cosechas y una tía
de visita, y aún sobraba
tarde para la baraja

Hoy tengo alarmas por hora
y el tiempo se me evapora,
corro de pantalla en pantalla
sin terminar ni una batalla$siempreenmicorazonabuelo19nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo19nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$siempreenmicorazonabuelo19nietok$ AND is_active;

-- 11. Memoria Familiar Abuelo Porque me haces sentir Seguro
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuelo11nietop$Dormía en el cuarto de atrás
con la ventana de par en par,
el perro afuera, y bastaba
oírte toser en la sala

Ningún trueno de febrero
pasaba, {APODO_DESTINATARIO}, el alero
de esa casa mientras tú
roncabas en el bambú

Hoy tengo cámara y reja
y una alarma que se queja,
y duermo peor que en tu casa,
donde no cerraba nada$siempreenmicorazonabuelo11nietop$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuelo11nietok$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$siempreenmicorazonabuelo11nietok$ AND is_active;
