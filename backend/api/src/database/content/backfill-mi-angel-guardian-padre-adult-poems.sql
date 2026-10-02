-- Poemas originales para el libro adulto (modelo 9866).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  1. Memoria Familiar Padre Porque eres mi Superhéroe
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre1hijop${APODO_DESTINATARIO}, no tenías antifaz,
tenías un overol y paz,
cargabas la casa al hombro
sin pedir ningún asombro

Yo creía que eras eterno
porque aguantabas el invierno
sin quejarte ni una vez
y sin mostrar la vejez

Hoy cargo yo con la casa
y entiendo lo que pasa:
el traje no se hereda,
se gana cuando uno queda$miangelguardianpadre1hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre1hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$miangelguardianpadre1hijok$ AND is_active;

-- 18. Memoria Familiar Padre Porque eres mi Estrella Guía
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre18hijop$No creo en señales del cielo
pero miro, por consuelo,
hacia donde señalabas
las noches que vigilabas

Decías que era un planeta
y que el nombre no interesa,
que lo importante es que esté
cada vez que uno lo ve

Hoy le muestro a mi hija
ese punto que no fija
nada, y cómo te llamabas,
{APODO_DESTINATARIO}, y por qué lo mirabas$miangelguardianpadre18hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre18hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$miangelguardianpadre18hijok$ AND is_active;

--  8. Memoria Familiar Padre Porque cumples mis Deseos
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre8hijop$Pedía un juguete importado
y llegabas con un armado
de madera y de alambre
que aguantó toda el hambre

No era el antojo ligero:
cumplías, {APODO_DESTINATARIO}, lo primero,
lo que de verdad hacía falta
y nunca lo que más se gasta

Hoy puedo comprar lo que quiera
y casi nada me espera
con esa cara de sorpresa
que ponías sobre la mesa$miangelguardianpadre8hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre8hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$miangelguardianpadre8hijok$ AND is_active;

-- 11. Memoria Familiar Padre Porque me haces sentir a Salvo
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre11hijop$De noche dejaba el cuarto
sin trancar, no por espanto:
por oírte respirar
a dos pasos del umbral

Mientras tú estabas despierto
nada malo era cierto,
{APODO_DESTINATARIO}, y lo que se acercaba
se iba por donde llegaba

Hoy soy yo el que no duerme
y escucho por si alguien teme,
me toca estar de este lado
del pasillo, y lo he aceptado$miangelguardianpadre11hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre11hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$miangelguardianpadre11hijok$ AND is_active;

-- 14. Memoria Familiar Padre Porque eres un Rebelde
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre14hijop$Discutías con el cobrador
y defendías al vendedor
de la esquina, sin razón
aparente, por tesón

Todavía en la bodega
te nombran, {APODO_DESTINATARIO}, y se alega
que paraste un atropello
sin cobrar por el consejo

Hoy pongo quejas por correo
y espero turno, y lo veo
razonable, aunque me falta
tu manera menos cauta$miangelguardianpadre14hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre14hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$miangelguardianpadre14hijok$ AND is_active;

-- 12. Memoria Familiar Padre Porque eres Generoso
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre12hijop$Pagabas rondas enteras
con los bolsillos de a veras
vacíos, y nadie sabía
que el mes no alcanzaría

Dabas antes del pedido
y después, hecho el olvido,
cambiabas de conversación
para evitar la mención

Hoy mido lo que presto
y llevo cuenta del resto,
pero suelto la cartera
si oigo, {APODO_DESTINATARIO}, tu manera$miangelguardianpadre12hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre12hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$miangelguardianpadre12hijok$ AND is_active;

--  9. Memoria Familiar Padre Porque eres Valiente
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre9hijop$No era que no tuvieras miedo:
era que igual dabas el dedo
para que alguien se agarrara
mientras la tormenta pasara

Te vi temblar una vez sola,
de espaldas, junto a la cola
del hospital, y volviste
diciendo que no era triste

Hoy tengo miedos de adulto
y ninguno es un insulto:
aprendí, {APODO_DESTINATARIO}, a temblar
de espaldas, y a continuar$miangelguardianpadre9hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre9hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$miangelguardianpadre9hijok$ AND is_active;

--  6. Memoria Familiar Padre Porque eres Aventurero
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre6hijop$Cualquier cosa era expedición:
una ferretería, un camión,
el cerro de la esquina
o una ruta clandestina

Me subías a la camioneta
y el viento abría la veta
de un día que no acababa
hasta que el sol se apagaba

Hoy viajo con reserva,
asiento y hora conserva,
y extraño salir sin saber,
{APODO_DESTINATARIO}, dónde iba a amanecer$miangelguardianpadre6hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre6hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$miangelguardianpadre6hijok$ AND is_active;

-- 15. Memoria Familiar Padre Porque eres Alegre
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre15hijop$Llovía y sacabas las sillas
a la vereda, con cosquillas
en los pies, y nos mojaba
la misma agua que otros tapaban

Cantabas con la radio rota
una canción medio idiota
que ahora pongo en el celular
cuando el día se pone mal

Hoy la lluvia me da pereza
y me escondo con torpeza,
pero a veces salgo quieto,
{APODO_DESTINATARIO}, y me mojo completo$miangelguardianpadre15hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre15hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$miangelguardianpadre15hijok$ AND is_active;

-- 10. Memoria Familiar Padre Porque eres un Soñador
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre10hijop${APODO_DESTINATARIO}, dibujabas en hojas
la casa de tejas rojas,
con el taller a la izquierda
y un árbol que diera cuerda

No la construiste nunca,
el dinero siempre trunca,
pero el plano sigue aquí,
doblado, y lo seguí

Hoy pago una hipoteca
de una casa más hueca,
pero el árbol ya creció
y el taller lo haré yo$miangelguardianpadre10hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre10hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$miangelguardianpadre10hijok$ AND is_active;

--  2. Memoria Familiar Padre Porque eres mi Guía
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre2hijop$Marcabas la senda sin mapa,
con la mano y con la capa
del abrigo señalando
por dónde seguir andando

Me enseñaste a leer la vereda
antes de soltar la rueda,
y a mirar, {APODO_DESTINATARIO}, sin miedo
a quien venga de regreso

Hoy llevo yo la delantera
y alguien pequeño me espera,
le repito tu verdad:
"fíjate bien, y verás"$miangelguardianpadre2hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre2hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$miangelguardianpadre2hijok$ AND is_active;

--  5. Memoria Familiar Padre Porque eres Encantador
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre5hijop$Entrabas y el cuarto cambiaba,
la pelea se desarmaba,
bastaba un chiste a tiempo
y volvía el buen momento

Tenías modales de otro siglo,
{APODO_DESTINATARIO}, de barrio y de abrigo,
abrías la puerta primero
y saludabas al portero

Hoy nadie saluda al entrar
ni se para al saludar,
y yo me levanto igual:
es tu herencia, no el ritual$miangelguardianpadre5hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre5hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$miangelguardianpadre5hijok$ AND is_active;

--  3. Memoria Familiar Padre Porque eres un Hechicero
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre3hijop$Hacías magia con monedas
y con las cosas más quedas:
un clavo, un hilo, un botón
y aparecía la función

Nunca supe el secreto
de ese truco incompleto
que terminaba en risa
y en una mano precisa

Hoy mis trucos son de oficio:
firmar, cobrar, dar servicio,
pero guardo tu moneda,
{APODO_DESTINATARIO}, por si algo queda$miangelguardianpadre3hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre3hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$miangelguardianpadre3hijok$ AND is_active;

-- 20. Memoria Familiar Padre Porque eres mi Ángel Guardián
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre20hijop$No sé si estás en algún sitio
ni me importa el requisito
de creer para sentirte,
alcanza con repetirte

Cuando algo me supera
hablo contigo, {APODO_DESTINATARIO}, afuera,
no espero ya una respuesta:
alcanza con que esté puesta

Hace años que no te escucho
y te sigo oyendo mucho
en todo lo que hago bien
y en lo que dejo también$miangelguardianpadre20hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre20hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$miangelguardianpadre20hijok$ AND is_active;

--  7. Memoria Familiar Padre Porque eres Divertido
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre7hijop${APODO_DESTINATARIO}, te disfrazabas de todo
con una sábana y un codo
roto; nos hacías reír
hasta no poder seguir

Bailabas mal y sin vergüenza,
con una gracia muy densa,
y la casa se venía abajo
sin más esfuerzo ni trabajo

Hoy me cuesta hacer el tonto,
me da pudor y me incomodo,
pero cuando lo consigo
sé muy bien de quién lo digo$miangelguardianpadre7hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre7hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$miangelguardianpadre7hijok$ AND is_active;

-- 16. Memoria Familiar Padre Porque eres mi Guardián de Historias
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre16hijop${APODO_DESTINATARIO}, guardabas cada cosa:
una entrada, una baldosa,
el recibo de la cuna,
un botón sin fortuna

Repetías la misma historia
con distinta trayectoria,
nadie te corregía el cuento
porque crecía con el tiempo

Hoy abrí esa caja de lata
y encontré tu letra exacta
en un papel doblado:
"para cuando no esté al lado"$miangelguardianpadre16hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre16hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$miangelguardianpadre16hijok$ AND is_active;

--  4. Memoria Familiar Padre Porque eres un Rey Líder
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre4hijop${APODO_DESTINATARIO}, tu trono era una silla
de plástico, en la orilla
del patio, y desde ahí
repartías el país

Juzgabas sin levantar la voz,
con una pausa feroz,
y la sentencia era clara:
"se arregla y se repara"

Hoy me toca decidir
y a veces no sé medir,
entonces busco tu calma
y la aplico sin alarma$miangelguardianpadre4hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre4hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$miangelguardianpadre4hijok$ AND is_active;

-- 17. Memoria Familiar Padre Porque eres mi Raíz y mi Fuerza
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre17hijop$Plantaste un árbol flaco
en el terreno más opaco
y hoy da sombra a la manzana
sin pedirle nada a mañana

Tu raíz no se alcanza a ver,
pero, {APODO_DESTINATARIO}, sostiene en pie
lo que creíamos nuestro
y era tuyo por adentro

Hoy soy yo el tronco grueso
y me duele todo el hueso
de aguantar, y entiendo tarde
lo que costaba ese alarde$miangelguardianpadre17hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre17hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$miangelguardianpadre17hijok$ AND is_active;

-- 19. Memoria Familiar Padre Porque eres mi Viajero del Tiempo
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre19hijop${APODO_DESTINATARIO}, tu reloj atrasaba
y a nadie le molestaba,
llegábamos tarde a todo
y entrábamos de cualquier modo

El tiempo contigo era ancho:
una tarde entera era un año
y un domingo cualquiera
duraba una vida entera

Hoy mi reloj va adelante
y el día es un instante,
corro para ganar minutos
que después quedan mudos$miangelguardianpadre19hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre19hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$miangelguardianpadre19hijok$ AND is_active;

-- 13. Memoria Familiar Padre Porque eres Atrevido
UPDATE personalized_templates SET
  poem_template = $miangelguardianpadre13hijop${APODO_DESTINATARIO}, usabas camisa floreada
sin pedir permiso a nada,
y entrabas al sitio más fino
con tu mismo paso campesino

Sacaste a bailar a mi madre
en plena plaza, sin padre
ni testigo que valiera,
y la gente hizo rueda

Hoy me visto de gris oscuro
y evito el papel de apuro,
pero tengo tu camisa
y algún día me da risa$miangelguardianpadre13hijop$,
  updated_at = now()
WHERE template_preview_key = $miangelguardianpadre13hijok$IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$miangelguardianpadre13hijok$ AND is_active;
