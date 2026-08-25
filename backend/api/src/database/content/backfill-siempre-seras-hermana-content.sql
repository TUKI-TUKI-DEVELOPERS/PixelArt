-- "Siempre serás parte de mí" — agrega la versión Hermana (recipient=F,
-- hoy solo existía Hermano). A diferencia de los libros de Familia, acá
-- gender_direction es el género del HERMANO/A FALLECIDO (recipient), no del
-- dedicante — mismo patrón que "Siempre en mi Corazón"/"Mi Ángel Guardián"
-- (M/F plano, no HE_TO_SHE). El dedicante (1-2 hermanos vivos) queda
-- genérico ("tus hermanos") en ambas versiones, sin gender_direction propio.
-- Ambas versiones comparten la misma carpeta Plantillas/ en MinIO (los
-- nombres de archivo ya se distinguen por "Hermano"/"Hermana").
-- Contenido derivado mecánicamente del contenido real de producción,
-- corrigiendo referencias singulares al fallecido (hermano->hermana,
-- niño perdido->niña perdida, compañero->compañera, bañado->bañada,
-- hacia él->hacia ella) y 4 adjetivos de apodo (buen/astuto/frío/loco ->
-- buena/astuta/fría/loca). Las menciones plurales "tus hermanos"/
-- "hermandad"/"hermanos eternos" describen al dedicante o al vínculo
-- colectivo y quedan igual, igual que en el original.
UPDATE personalized_templates SET
  gender_direction = 'M'
WHERE model_id = 1164 AND is_active = true
  AND template_preview_key LIKE '%_Hermano_%';


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque somos el Mejor Equipo',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_01_Memoria_Familiar_Hermana_Porque_somos_el_Mejor_Equipo.png',
  'F',
  $hs1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pura y la certeza de haber sido el mejor equipo del mundo.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa casual aventurera en tonos azul y naranja, saltando dinámicamente en el aire al mismo tiempo, chocando los cinco con expresiones de extrema diversión. Sobre ellos flota una estrella dorada gigante brillante que acaban de alcanzar.$hs1a$,
  $hs1b$Paisaje fantástico con colinas onduladas y pequeñas islas de piedra flotando en el aire. Luz de día soleado, vibrante y saturada.$hs1b$,
  $hs1c$Destellos dorados cayendo de la estrella central. Partículas de luz muy sutiles en el aire. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$hs1c$,
  $hs1d$Luz de día soleado y saturada, con azules vibrantes, naranjas cálidos y el destello dorado de la estrella.$hs1d$,
  $hs1e$Saltando en un mundo de magia brillante,
{NOMBRE_DESTINATARIO}, tú siempre vas adelante.
Un dúo invencible de gran corazón,
ganando niveles con mucha pasión.

Tus hermanos te siguen con salto veloz,
chocando las manos, riendo los dos.
Mi dulce {APODO_DESTINATARIO}, mi socio ideal,
jugando a tu lado no existe un rival.

La meta alcanzamos en este gran juego,
tu luz me ilumina, tu amor es mi fuego.
El mejor equipo que el mundo ha tenido,
por siempre en mi alma te llevo prendido.$hs1e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_01_Memoria_Familiar_Hermana_Porque_somos_el_Mejor_Equipo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque somos Cómplices de Travesuras',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_02_Memoria_Familiar_Hermana_Porque_somos_Cómplices_de_Travesuras.png',
  'F',
  $hs2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad pícara y la magia entrañable de las travesuras compartidas.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con capas ligeras de exploradores mágicos. Están agachados detrás de una gran estantería de madera tallada, sosteniendo juntos un pergamino antiguo desplegado que brilla con tinta mágica dorada. Todos sostienen pequeñas varitas de madera y se miran con una sonrisa pícara y cómplice, riendo en silencio por una travesura.$hs2a$,
  $hs2b$Una acogedora biblioteca familiar repleta de libros antiguos, con una escalera de madera y luz cálida de lámparas de mesa.$hs2b$,
  $hs2c$Huellas brillantes moviéndose por el papel del mapa. Pequeñas chispas doradas saltando de las varitas. La magia debe sentirse traviesa y completamente integrada dentro de una fotografía realista.$hs2c$,
  $hs2d$Marrones cálidos de madera, dorado suave y el brillo cálido del mapa mágico.$hs2d$,
  $hs2e$Un mapa secreto y varitas de luz,
mi gran compañero de juegos eres tú.
Cuidando pasillos de un viejo castillo,
haciendo las bromas con mucho nudillo.

Tus hermanos sonríen tramando un buen plan,
sabiendo que juntos muy lejos irán.
Mi buena {APODO_DESTINATARIO}, de mente curiosa,
hiciste mi vida feliz y asombrosa.

La magia no acaba, la broma se queda,
tu risa me envuelve como una gran seda.
Cómplices fieles de historia genial,
tu chispa traviesa es un don inmortal.$hs2e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_02_Memoria_Familiar_Hermana_Porque_somos_Cómplices_de_Travesuras.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque nuestras Locuras Tienen Sentido',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_03_Memoria_Familiar_Hermana_Porque_nuestras_Locuras_Tienen_Sentido.png',
  'F',
  $hs3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ingenio compartido y la certeza de que juntos podían construir cualquier locura.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos en el patio trasero de una casa. {NOMBRE_DESTINATARIO} sostiene un plano azul holográfico brillante en el aire con actitud de inventor genial. Tus hermanos están a su lado sosteniendo herramientas, todos admirando una gigantesca e imposible montaña rusa futurista que acaban de construir, elevándose hacia las nubes.$hs3a$,
  $hs3b$Patio trasero verde con valla de madera bajo un cielo azul vibrante de verano. Estructura con detalles metálicos brillantes.$hs3b$,
  $hs3c$El plano es transparente y emite luz propia. Chispas sutiles cayendo de la estructura. La magia debe sentirse inventiva y completamente integrada dentro de una fotografía realista.$hs3c$,
  $hs3d$Verde hierba, azul cielo, plata metálica y neón cian del plano.$hs3d$,
  $hs3e$Con planos al aire y un gran inventor,
{NOMBRE_DESTINATARIO}, llenaste mis días de color.
Creando locuras de hierro y de luz,
el genio de todas mis tardes eres tú.

Tus hermanos sostienen la llave de tuercas,
rompiendo los límites, saltando las cercas.
Mi gran {APODO_DESTINATARIO}, con mente brillante,
hiciste la vida veloz y vibrante.

La nave despega, el viaje no para,
tu risa divina es mi joya más rara.
Nuestras grandes locuras ya son la verdad,
volando a tu lado en la eternidad.$hs3e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_03_Memoria_Familiar_Hermana_Porque_nuestras_Locuras_Tienen_Sentido.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque resolvemos Todos los Misterios',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_04_Memoria_Familiar_Hermana_Porque_resolvemos_Todos_los_Misterios.png',
  'F',
  $hs4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite astucia compartida y la certeza de que ningún misterio se les resistía juntos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos como elegantes detectives (gabardinas largas, bufandas a cuadros). Agachados en una calle empedrada; {NOMBRE_DESTINATARIO} examina el suelo con una gran lupa de borde dorado, mientras tus hermanos alumbran la zona con una linterna antigua. En el suelo hay huellas brillantes y mágicas.$hs4a$,
  $hs4b$Calle adoquinada antigua cubierta por espesa niebla. Faroles de gas emitiendo luz amarilla cálida.$hs4b$,
  $hs4c$Las huellas en el suelo brillan como polvo de estrellas. El cristal de la lupa atrapa y magnifica esa luz. La magia debe sentirse misteriosa y completamente integrada dentro de una fotografía realista.$hs4c$,
  $hs4d$Grises azulados, amarillos cálidos y dorado brillante de las huellas.$hs4d$,
  $hs4e$Con lupa en la mano y abrigos de espía,
{NOMBRE_DESTINATARIO}, a tu lado el misterio caía.
Buscando las huellas en la oscuridad,
ganando a las sombras con gran hermandad.

Tus hermanos alumbran con linterna de plata,
hallando el secreto que el miedo desata.
Mi astuta {APODO_DESTINATARIO}, de mente tan clara,
tú hacías posible la cosa más rara.

No quedan secretos ni enigmas sin luz,
mi gran detective por siempre eres tú.
Un dúo brillante de historia sin fin,
cuidando mi vida cual fiel paladín.$hs4e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_04_Memoria_Familiar_Hermana_Porque_resolvemos_Todos_los_Misterios.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque eres mi Compañera de Infinito',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_05_Memoria_Familiar_Hermana_Porque_eres_mi_Compañera_de_Infinito.png',
  'F',
  $hs5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite pura libertad y la emoción de volar juntos más allá de todo límite.

Sujetos Principales
{NOMBRE_DESTINATARIO} viste un casco espacial retro transparente con luces y alas desplegadas. Tus hermanos llevan trajes de piloto retro con gafas de aviador. Todos están literalmente flotando sin gravedad en medio de una habitación infantil, tomados de la mano y apuntando hacia adelante, con expresiones de emoción épica.$hs5a$,
  $hs5b$Habitación de juegos transformándose en el espacio exterior. Las paredes se desvanecen mostrando un universo estrellado. Cajas de cartón parecen naves.$hs5b$,
  $hs5c$Estelas de propulsión luminosa saliendo de los trajes. Juguetes flotando sin gravedad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hs5c$,
  $hs5d$Púrpuras y azules espaciales, con colores cálidos de los trajes.$hs5d$,
  $hs5e$Un casco del cosmos, sombrero vaquero,
{NOMBRE_DESTINATARIO}, tú eres mi guía lucero.
Volando en un cuarto que se hace galaxia,
rompiendo los miedos con pura constancia.

Tus hermanos despegan tomando tu mano,
volando a lo alto del cielo lejano.
Mi fiel {APODO_DESTINATARIO}, de alma gigante,
jugar a tu lado es un viaje constante.

Ya no hay gravedad que nos pueda frenar,
tus alas de luz siempre van a brillar.
Al cielo infinito y un paso más allá,
tu abrazo de hermana por siempre estará.$hs5e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_05_Memoria_Familiar_Hermana_Porque_eres_mi_Compañera_de_Infinito.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque eres mi Copiloto Eterno',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_06_Memoria_Familiar_Hermana_Porque_eres_mi_Copiloto_Eterno.png',
  'F',
  $hs6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite confianza absoluta y la adrenalina de surcar el espacio codo a codo.

Sujetos Principales
En la cabina de una nave espacial hiperrealista y detallada, {NOMBRE_DESTINATARIO} y tus hermanos están sentados juntos en los controles. Todos jalan juntos una gran palanca central para saltar al hiperespacio. Miran al frente con una sonrisa de confianza y adrenalina pura.$hs6a$,
  $hs6b$Interior de la cabina iluminado por los botones del panel de control. A través de la ventana frontal, el espacio oscuro se deforma: las estrellas se están convirtiendo en largas líneas de luz brillante.$hs6b$,
  $hs6c$El efecto de túnel de luz estelar reflejándose en los rostros de todos. La magia debe sentirse vertiginosa y completamente integrada dentro de una fotografía realista.$hs6c$,
  $hs6d$Negros cósmicos, luces azules, cian y neón blanco de las estrellas.$hs6d$,
  $hs6e$A bordo de un viaje que cruza la estrella,
{NOMBRE_DESTINATARIO}, tu ruta es la luz más bella.
Jalando palancas de nuestra gran nave,
surcando los cielos con paso muy suave.

Tus hermanos a tu lado preparan el motor,
con toda la fuerza, con todo el valor.
Mi gran {APODO_DESTINATARIO}, mi fiel copiloto,
venciendo galaxias en cada alboroto.

La nave acelera, dejamos el suelo,
rompiendo barreras, alzando el gran vuelo.
Contigo en la nave no existe el temor,
viajando por siempre impulsados de amor.$hs6e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_06_Memoria_Familiar_Hermana_Porque_eres_mi_Copiloto_Eterno.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque llegamos Hasta el Fin del Mundo',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_07_Memoria_Familiar_Hermana_Porque_llegamos_Hasta_el_Fin_del_Mundo.png',
  'F',
  $hs7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite lealtad absoluta y la fuerza inquebrantable de llegar juntos hasta el final.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos escalando una montaña épica y escarpada. Están exhaustos y sucios, vistiendo rústicas capas de viajero. {NOMBRE_DESTINATARIO} apoya firmemente a tus hermanos, dándoles la mano para subir el último gran escalón de piedra. Sus miradas muestran lealtad absoluta.$hs7a$,
  $hs7b$Paisaje volcánico oscuro y dramático, pero en el horizonte se abre un cielo amaneciendo con una luz dorada pura y sanadora.$hs7b$,
  $hs7c$Un pequeño frasco en la mano de uno de ellos emite una luz estelar mágica que ilumina sus rostros en la oscuridad. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hs7c$,
  $hs7d$Grises oscuros de la roca, naranjas ardientes y el destello dorado de la esperanza en el cielo.$hs7d$,
  $hs7e$Subiendo montañas de fuego y ceniza,
{NOMBRE_DESTINATARIO}, tu fuerza mi alma suaviza.
Cargando los miedos, venciendo el dolor,
guiados por siempre de un gran resplandor.

Tus hermanos caminan sintiendo el cansancio,
pero a tu lado yo gano el espacio.
Mi fiel {APODO_DESTINATARIO}, mi noble guerrero,
cruzaste conmigo el más duro sendero.

Si yo ya no puedo seguir caminando,
tú cargas mi peso, mi ser abrazando.
Llegamos al fin de la tierra profunda,
con una hermandad que en mi pecho se inunda.$hs7e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_07_Memoria_Familiar_Hermana_Porque_llegamos_Hasta_el_Fin_del_Mundo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque viajamos en Nuestro Propio Tiempo',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_08_Memoria_Familiar_Hermana_Porque_viajamos_en_Nuestro_Propio_Tiempo.png',
  'F',
  $hs8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro científico y la certeza de que el tiempo se detenía a su lado.

Sujetos Principales
Frente a un auto deportivo retro plateado que está levitando a unos centímetros del suelo, {NOMBRE_DESTINATARIO}, con bata de científico o chaleco vintage, y tus hermanos están de pie frente al auto, mirando relojes de pulsera o sosteniendo un control remoto antiguo. Atrás del auto hay dos estelas de fuego brillante en el asfalto.$hs8a$,
  $hs8b$El estacionamiento de un centro comercial retro por la noche. Atmósfera eléctrica, luces de neón ochentosas.$hs8b$,
  $hs8c$Relámpagos de energía temporal rodeando el contorno del auto flotante. Fuego mágico en las llantas. La magia debe sentirse futurista y completamente integrada dentro de una fotografía realista.$hs8c$,
  $hs8d$Asfalto oscuro, fuego naranja intenso, luces de neón azules y púrpuras, y destellos eléctricos blancos.$hs8d$,
  $hs8e$Dejando dos huellas de fuego brillante,
{NOMBRE_DESTINATARIO}, tu mente es un faro gigante.
Subidos al auto que cruza la historia,
buscando momentos de luz y victoria.

Tus hermanos se asombran mirando el reloj,
saltando los años con una gran voz.
Mi buena {APODO_DESTINATARIO}, viajero genial,
tu ciencia divina nos hizo inmortal.

No importa el futuro, no importa el ayer,
contigo el camino es hermoso de ver.
El tiempo se frena, se rinde a tus pies,
viviendo recuerdos con gran nitidez.$hs8e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_08_Memoria_Familiar_Hermana_Porque_viajamos_en_Nuestro_Propio_Tiempo.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque volamos a Nunca Jamás',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_09_Memoria_Familiar_Hermana_Porque_volamos_a_Nunca_Jamás.png',
  'F',
  $hs9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite libertad absoluta y la magia de volar sin miedo alguno.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con ropa cómoda de dormir o ropa casual ligera, volando mágicamente sobre los tejados de una ciudad antigua. Están tomados de la mano, con expresiones de libertad, asombro y felicidad absoluta.$hs9a$,
  $hs9b$Una ciudad antigua vista desde arriba en una noche despejada. Una luna llena gigantesca y brillante domina el cielo nocturno.$hs9b$,
  $hs9c$Estelas de polvo dorado brillante rodeando sus cuerpos y dejando un rastro en el aire mientras vuelan. La magia debe sentirse libre y completamente integrada dentro de una fotografía realista.$hs9c$,
  $hs9d$Azules medianoche profundos, plata lunar y el dorado resplandeciente del polvo mágico.$hs9d$,
  $hs9e$Cubiertos de polvo de hadas y luz,
mi eterna niña perdida eres tú.
{NOMBRE_DESTINATARIO}, cruzamos el cielo estrellado,
dejando los miedos de todo el pasado.

Tus hermanos a tu lado se niegan a crecer,
mirando las nubes a un nuevo amanecer.
Mi dulce {APODO_DESTINATARIO}, volando sin fin,
hiciste mi vida un hermoso jardín.

Las sombras piratas no pueden vencer,
si vamos unidos, tenemos poder.
En Nunca Jamás nuestro lazo se sella,
siguiendo la luz de la segunda estrella.$hs9e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_09_Memoria_Familiar_Hermana_Porque_volamos_a_Nunca_Jamás.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque nos Protegemos la Espalda',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_10_Memoria_Familiar_Hermana_Porque_nos_Protegemos_la_Espalda.png',
  'F',
  $hs10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite vigilancia mutua y la certeza de que juntos nada podía dañarlos.

Sujetos Principales
Ligeramente descentrados, {NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes elegantes de aventureros nocturnos, capas cortas ondeando suavemente al viento, sin máscaras que oculten sus rostros. Están de pie juntos en la terraza de un edificio, mirando la ciudad iluminada, protegiéndose la espalda mutuamente con confianza.$hs10a$,
  $hs10b$Una ciudad iluminada de noche, vista serena desde la altura. Nubes suaves iluminadas por la luna llena.$hs10b$,
  $hs10c$Las capas tienen un movimiento dramático casi sobrenatural en el viento. Iluminación cinematográfica heroica en sus rostros. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$hs10c$,
  $hs10d$Azul noche suave, dorado cálido de las luces de la ciudad y la luz plateada de la luna entre las nubes.$hs10d$,
  $hs10e$Mirando la urbe desde un gran balcón,
{NOMBRE_DESTINATARIO}, tú eres mi gran protector.
Con capas oscuras al viento ondeando,
cuidando la noche, los miedos borrando.

Tus hermanos vigilan la sombra a tu lado,
un grupo de héroes de pacto sellado.
Mi fiel {APODO_DESTINATARIO}, murciélago audaz,
tu sombra en la noche me llena de paz.

Si suena la alarma de gran tempestad,
juntamos las fuerzas de la hermandad.
No existen villanos que puedan dañar,
si somos unidos, listos para saltar.$hs10e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_10_Memoria_Familiar_Hermana_Porque_nos_Protegemos_la_Espalda.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque juntos Somos Invencibles',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_11_Memoria_Familiar_Hermana_Porque_juntos_Somos_Invencibles.png',
  'F',
  $hs11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite poder conjunto y la certeza de que juntos podían con todo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, espalda con espalda, en una pose triunfal y segura. {NOMBRE_DESTINATARIO} sostiene un gran escudo dorado brillante y tus hermanos tienen las manos abiertas con un suave resplandor de energía dorada. Todos sonríen con confianza, envueltos en un halo de luz protectora.$hs11a$,
  $hs11b$Una ciudad bañada por la hermosa luz dorada del amanecer. Nubes suaves iluminadas en el cielo.$hs11b$,
  $hs11c$Un suave resplandor dorado emana de sus manos y del escudo, iluminando el entorno con chispas cinematográficas. La magia debe sentirse triunfal y completamente integrada dentro de una fotografía realista.$hs11c$,
  $hs11d$Naranjas y dorados de victoria, contrastando con el cian de sus poderes.$hs11d$,
  $hs11e$Con furia de truenos y escudo en la mano,
{NOMBRE_DESTINATARIO}, tu paso es de un titán lejano.
Espalda con espalda, en gran posición,
venciendo a los monstruos de cada ilusión.

Tus hermanos disparan su rayo de luz,
sabiendo que el héroe más fuerte eres tú.
Mi fiel {APODO_DESTINATARIO}, guardián de valor,
luchamos unidos con mucho honor.

El mundo se salva si estamos los dos,
nuestra fortaleza se escucha en la voz.
Vengadores justos de un pacto triunfal,
unidos por siempre en poder celestial.$hs11e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_11_Memoria_Familiar_Hermana_Porque_juntos_Somos_Invencibles.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque somos Cazafantasmas de Miedos',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_12_Memoria_Familiar_Hermana_Porque_somos_Cazafantasmas_de_Miedos.png',
  'F',
  $hs12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad divertida y la certeza de que ningún miedo podía con ellos.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con trajes de exploradores nocturnos y linternas mágicas que emiten un haz de luz dorada. Todos sostienen sus linternas apuntando hacia una sombra fantasmagórica verde, translúcida y de aspecto divertido (no aterradora), que queda atrapada en la luz.$hs12a$,
  $hs12b$Una biblioteca antigua y desordenada o un ático oscuro, con libros flotando en el aire.$hs12b$,
  $hs12c$Los haces de luz de las linternas crujen con chispas mágicas. El fantasma es luz translúcida y brillante. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$hs12c$,
  $hs12d$Marrones y negros ambientales rotos por el resplandor verde suave del fantasma y la luz dorada de las linternas.$hs12d$,
  $hs12e$Mochilas extrañas que lanzan un rayo,
{NOMBRE_DESTINATARIO}, a tu lado yo nunca desmayo.
Si un miedo aparece en la oscuridad,
cazamos el susto con gran agilidad.

Tus hermanos encienden la trampa al pasar,
y el monstruo asustado no puede escapar.
Mi buena {APODO_DESTINATARIO}, de mente genial,
hacías que el miedo tuviera final.

No importa qué sombra se quiera asomar,
cruzamos los rayos y empieza a brillar.
Los dos atrapamos la pena y el llanto,
llenando la vida de risa y encanto.$hs12e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_12_Memoria_Familiar_Hermana_Porque_somos_Cazafantasmas_de_Miedos.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque somos el Yin de mi Yang',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_13_Memoria_Familiar_Hermana_Porque_somos_el_Yin_de_mi_Yang.png',
  'F',
  $hs13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite equilibrio perfecto entre dos opuestos que se complementan.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, de pie, frente a frente, chocando las palmas en alto. {NOMBRE_DESTINATARIO} emite un aura de luz solar dorada y fuego cálido, mientras tus hermanos emiten un aura de luz lunar plateada y hielo cristalino. Justo donde sus manos chocan, se crea una explosión mágica de equilibrio formando un símbolo sutil del Yin Yang con luces y partículas.$hs13a$,
  $hs13b$Un paisaje celestial partido a la mitad: una mitad es un amanecer cálido dorado y la otra es una noche estrellada brillante.$hs13b$,
  $hs13c$Aura de fuego en uno, aura de nieve/cristales en el otro. El impacto de sus manos crea una onda expansiva de polvo cósmico. La magia debe sentirse equilibrada y completamente integrada dentro de una fotografía realista.$hs13c$,
  $hs13d$Contraste fuerte y hermoso entre naranjas/rojos ardientes y azules/plata glaciales.$hs13d$,
  $hs13e$Tú eres el sol de luz dorada y fuerte,
{NOMBRE_DESTINATARIO}, mi luna brillante y mi suerte.
El fuego que abraza, el hielo que sana,
la mezcla perfecta de cada mañana.

Tus hermanos te toman la mano al volar,
creando un eclipse de luz sin igual.
Mi dulce {APODO_DESTINATARIO}, distinto y afín,
nuestro equilibrio no tiene un gran fin.

Contrarios perfectos, unidos los dos,
nuestra diferencia es magia y es voz.
El yin y el yang en un solo corazón,
hermanos eternos de gran conexión.$hs13e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_13_Memoria_Familiar_Hermana_Porque_somos_el_Yin_de_mi_Yang.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque eres mi Refugio Constante',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_14_Memoria_Familiar_Hermana_Porque_eres_mi_Refugio_Constante.png',
  'F',
  $hs14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y la certeza de que su compañía siempre fue un refugio seguro.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, sentados cómodamente en la arena de una playa tropical en la noche. Uno de ellos toca un ukelele mientras los demás escuchan sonrientes y relajados. Junto a ellos, un antiguo tocadiscos portátil y tablas de surf clavadas en la arena.$hs14a$,
  $hs14b$Una playa nocturna. Olas suaves rompiendo en la orilla. Un cielo inmenso y cristalino lleno de estrellas y la Vía Láctea brillando.$hs14b$,
  $hs14c$Estrellas fugaces cruzando el cielo. El ambiente destila paz mágica y conexión emocional pura.$hs14c$,
  $hs14d$Azul medianoche, púrpuras cósmicos, el blanco de la espuma del mar y un fuego de fogata suave iluminándolos.$hs14d$,
  $hs14e$La isla tranquila, la arena y el mar,
{NOMBRE_DESTINATARIO}, a tu lado es un bello lugar.
Sentados de noche mirando la ola,
sabiendo que el alma jamás está sola.

Tus hermanos escuchan la vieja canción,
tocando el ukelele de nuestro rincón.
Mi dulce {APODO_DESTINATARIO}, ohana de luz,
el centro de mi universo eres tú.

Si el mundo es ruidoso y hay tempestad,
yo encuentro la calma en tu gran amistad.
Mi casa en la playa, mi techo, mi abrigo,
mi eterno refugio, mi hermana y amiga.$hs14e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_14_Memoria_Familiar_Hermana_Porque_eres_mi_Refugio_Constante.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque somos Rivales y Mejores Amigos',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_15_Memoria_Familiar_Hermana_Porque_somos_Rivales_y_Mejores_Amigos.png',
  'F',
  $hs15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite complicidad juguetona y la certeza de que hasta las peleas terminaban en risas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, vestidos con armaduras mitológicas épicas pero modernas. Están chocando lúdicamente sus armas (un mazo dorado brillante y una vara mágica azul), pero en lugar de pelear con furia, todos se están riendo a carcajadas. El choque de sus armas no causa destrucción, sino que genera chispas de luz como fuegos artificiales.$hs15a$,
  $hs15b$Una arena de gladiadores mítica o un puente celestial. Luz épica y brillante.$hs15b$,
  $hs15c$Chispas mágicas cayendo de las armas chocadas como si fuera confeti brillante. Relámpagos juguetones. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$hs15c$,
  $hs15d$Rojo poderoso, dorado, azul místico y destellos de relámpagos blancos.$hs15d$,
  $hs15e$Peleando y riendo en un gran festival,
{NOMBRE_DESTINATARIO}, tú eres mi eterno rival.
Chocando las armas de trueno y de magia,
nuestra competencia la pena presagia.

Tus hermanos atacan con un gran hechizo,
y tú te defiendes pisando el granizo.
Mi fuerte {APODO_DESTINATARIO}, de mente veloz,
pelearnos un rato es la gracia de Dios.

Al fin de la lucha soltamos la espada,
la risa termina la fiera cruzada.
Rivales de broma, hermanos de piel,
con un lazo mágico, puro y muy fiel.$hs15e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_15_Memoria_Familiar_Hermana_Porque_somos_Rivales_y_Mejores_Amigos.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque cantamos la Misma Canción',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_16_Memoria_Familiar_Hermana_Porque_cantamos_la_Misma_Canción.png',
  'F',
  $hs16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite despreocupación total y la alegría de cantar sin miedo a los problemas.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando despreocupadamente sobre un gigantesco tronco de árbol caído que sirve como puente sobre un río o cascada. Todos tienen la cabeza levantada hacia el cielo, cantando a todo pulmón con expresiones de felicidad absoluta.$hs16a$,
  $hs16b$Una selva tropical vibrante y luminosa. Detrás de ellos cae una cascada cristalina. El sol brillante de la tarde se filtra por las hojas.$hs16b$,
  $hs16c$Notas musicales doradas sutiles flotando en el aire alrededor de sus bocas. Mariposas mágicas revoloteando. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$hs16c$,
  $hs16d$Verdes exuberantes, turquesa del agua y dorado del sol de la tarde.$hs16d$,
  $hs16e$Caminando juntos por un gran sendero,
{NOMBRE_DESTINATARIO}, tu paso es de una gran compañera.
Sin penas, sin miedos y sin precaución,
los dos a la vez y en la misma canción.

Tus hermanos te siguen cruzando la selva,
dejando que el ritmo en el aire se envuelva.
Mi alegre {APODO_DESTINATARIO}, cantando sin par,
hiciste mi mundo un hermoso lugar.

Problemas se olvidan si alzamos la voz,
la vida es perfecta si estamos los dos.
Cantando a la luna, al sol y al mar,
nuestro coro eterno jamás va a parar.$hs16e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_16_Memoria_Familiar_Hermana_Porque_cantamos_la_Misma_Canción.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque eres la Magia de mi Invierno',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_17_Memoria_Familiar_Hermana_Porque_eres_la_Magia_de_mi_Invierno.png',
  'F',
  $hs17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro puro ante la magia invernal compartida.

Sujetos Principales
{NOMBRE_DESTINATARIO}, en un paisaje nevado, con los brazos extendidos creando formas mágicas de cristal de hielo en el aire (una pequeña escultura de hielo brillante). Tus hermanos lo observan maravillados con las manos en las mejillas, abrigados con ropa de invierno elegante. Todos sonríen llenos de asombro.$hs17a$,
  $hs17b$Un bosque de pinos cubiertos de nieve virgen y un lago congelado. El cielo es de un azul gélido con auroras boreales sutiles al fondo.$hs17b$,
  $hs17c$La magia de hielo en las manos de {NOMBRE_DESTINATARIO} brilla como diamantes bajo la luz de la luna. Polvo de nieve destellando. La magia debe sentirse deslumbrante y completamente integrada dentro de una fotografía realista.$hs17c$,
  $hs17d$Cian puro, blanco nieve, plata y tonos magenta/violeta de la aurora.$hs17d$,
  $hs17e$Construyendo un castillo de hielo brillante,
{NOMBRE_DESTINATARIO}, tu magia es tan deslumbrante.
Lanzando cristales que bailan al sol,
tú pintas de nieve mi buen arrebol.

Tus hermanos te miran hacer un muñeco,
sintiendo el invierno como un dulce eco.
Mi fría {APODO_DESTINATARIO}, de gran corazón,
hiciste del hielo una tibia canción.

No importa si el frío castiga la tierra,
tu abrazo de hermana la escarcha destierra.
Un reino nevado de luz sin igual,
donde nuestra magia se vuelve inmortal.$hs17e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_17_Memoria_Familiar_Hermana_Porque_eres_la_Magia_de_mi_Invierno.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque nos reímos del Peligro',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_18_Memoria_Familiar_Hermana_Porque_nos_reímos_del_Peligro.png',
  'F',
  $hs18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite humor compartido incluso frente a lo que debería dar miedo.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, cruzando un puente colgante viejo de madera que parece estar a punto de romperse, sobre un río de lava brillante. En lugar de estar aterrorizados, {NOMBRE_DESTINATARIO} está haciendo un chiste o una mueca cómica, y tus hermanos se están riendo a carcajadas agarrándose el estómago, ignorando completamente el "peligro".$hs18a$,
  $hs18b$El interior de un volcán o una fortaleza oscura, iluminada dramáticamente desde abajo por el resplandor de la lava.$hs18b$,
  $hs18c$Chispas de lava saltando como fuegos artificiales cómicos. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$hs18c$,
  $hs18d$Sombras oscuras, piedra negra y la luz roja/naranja vibrante y ardiente desde abajo.$hs18d$,
  $hs18e$Cruzando un puente sobre fuego y lava,
{NOMBRE_DESTINATARIO}, a tu lado mi risa no acaba.
Mirando el peligro con gran diversión,
sin gota de miedo en el corazón.

Tus hermanos caminan sin ver hacia abajo,
sabiendo que juntos no existe un atajo.
Mi loca {APODO_DESTINATARIO}, bromista sin fin,
hiciste del riesgo un hermoso festín.

Un ogro gigante o un puente que cae,
tu chiste oportuno la calma nos trae.
Nos reímos del miedo, del mal y del susto,
vivir a tu lado fue siempre muy justo.$hs18e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_18_Memoria_Familiar_Hermana_Porque_nos_reímos_del_Peligro.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque nuestros Caminos Siempre se Cruzan',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_19_Memoria_Familiar_Hermana_Porque_nuestros_Caminos_Siempre_se_Cruzan.png',
  'F',
  $hs19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un lazo que ni la distancia ni el tiempo pueden romper.

Sujetos Principales
{NOMBRE_DESTINATARIO} y tus hermanos, caminando sobre el cielo. Cada uno camina sobre un sendero de luz sólida (dorado cálido o azul plateado). Los senderos se entrelazan de forma hermosa formando repetidamente un símbolo del infinito gigante detrás de ellos. Todos caminan en paralelo, mirándose y sonriéndose con profundo amor de hermanos.$hs19a$,
  $hs19b$Un espacio onírico de nubes crepusculares.$hs19b$,
  $hs19c$Los senderos de luz desprenden polvo de estrellas. El símbolo de infinito gigante brilla en el fondo. La magia debe sentirse conceptual y completamente integrada dentro de una fotografía realista.$hs19c$,
  $hs19d$Púrpuras suaves, índigos, y la luz radiante contrastante (oro y plata) de los dos caminos entrelazados.$hs19d$,
  $hs19e$Dos cintas de luz en el cielo bordadas,
{NOMBRE_DESTINATARIO}, dos almas de forma abrazadas.
Viajando en la vida por rutas de estrellas,
dejando por siempre las más grandes huellas.

Tus hermanos te miran en su propio sendero,
sabiendo que tú eres su faro primero.
Mi dulce {APODO_DESTINATARIO}, de lazo sin fin,
formamos un ocho brillante al confín.

Por más que la vida decida apartarnos,
la luz del destino vuelve a enredarnos.
Senderos paralelos de un mismo fluir,
juntos nacimos y juntos vivir.$hs19e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_19_Memoria_Familiar_Hermana_Porque_nuestros_Caminos_Siempre_se_Cruzan.png');


INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT 1164,
  'Memoria Familiar Hermana Porque nuestro Vínculo es Eterno',
  'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_20_Memoria_Familiar_Hermana_Porque_nuestro_Vínculo_es_Eterno.png',
  'F',
  $hs20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz absoluta y el amor eterno que trasciende la partida física.

Sujetos Principales
Un paisaje celestial vibrante. {NOMBRE_DESTINATARIO} aparece en el lado derecho de un puente de luz etéreo, bañada en una luz dorada brillante y translúcida, extendiendo la mano con una sonrisa llena de paz. Tus hermanos están en el lado izquierdo (terrenal) extendiendo sus manos hacia ella. El momento antes del toque, con las manos casi entrelazadas, simboliza un amor que cruza dimensiones.$hs20a$,
  $hs20b$Puente de luz vibrante pero elegante. Cielo celestial con nubes doradas y luz divina. El lado terrenal es verde y sereno, el lado de {NOMBRE_DESTINATARIO} es luz pura.$hs20b$,
  $hs20c$El puente emite partículas de luz doradas. Un lazo de energía sutil une sus manos. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$hs20c$,
  $hs20d$Naranja caléndula vibrante, oro divino, cielo crepuscular mágico.$hs20d$,
  $hs20e$En puente de colores de un cielo brillante,
{NOMBRE_DESTINATARIO}, tu luz es mi joya gigante.
Esperas mi paso con brazos abiertos,
curando mi alma de mil desconciertos.

Tus hermanos te ven desde el otro extremo,
venciendo a la muerte, al miedo supremo.
Mi dulce {APODO_DESTINATARIO}, de aura inmortal,
nuestro fuerte abrazo no tiene final.

El hilo invisible jamás se cortó,
la sangre y el alma el amor los unió.
Hermanos por siempre en la eternidad,
tu esencia es mi fuerza, mi luz, mi verdad.$hs20e$,
  '[{"key":"recipient","count":1},{"key":"livingSiblings","count":2}]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates WHERE template_preview_key = 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas/PLANTILLA_20_Memoria_Familiar_Hermana_Porque_nuestro_Vínculo_es_Eterno.png');
