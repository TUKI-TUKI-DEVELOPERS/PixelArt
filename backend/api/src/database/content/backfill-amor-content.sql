BEGIN;

UPDATE personalized_templates SET
  scene_visual = $t1a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura, magia y la sensación de que despertar junto a la persona amada convierte cada mañana en un cuento de hadas.

Ligeramente descentrada una pareja despierta abrazada en una cama con pijamas suaves (rostros fotorrealistas basados en fotografías reales). Ella sonríe con dulzura recién despierta mientras él la contempla con adoración y serenidad; ambos transmiten complicidad, paz y felicidad plena.$t1a$,
  background_details = $t1b$El dormitorio se transforma en un bosque encantado: árboles de troncos luminosos y copas brillantes rodean la cama, mezclándose de forma natural con los muebles del cuarto. La luz suave del amanecer se filtra entre las ramas creando haces dorados.$t1b$,
  magic_effects = $t1c$Partículas mágicas doradas y pastel flotan delicadamente en el aire, y pequeños destellos brillan sobre las hojas de los árboles encantados. La magia debe sentirse sutil, elegante y completamente integrada dentro de una fotografía realista.$t1c$,
  lighting_color = $t1d$Iluminación cinematográfica suave de amanecer, cálida y envolvente. Predominan tonos pastel, dorados delicados, rosados suaves y cremas luminosos, creando una atmósfera de cuento de hadas romántica y serena.$t1d$,
  poem_template = $t1e$Despertar a tu lado es como un cuento de hadas,
{NOMBRE_DESTINATARIO}, cada mañana mi alma está encantada.
Tus brazos son mi bosque mágico y seguro,
Donde cada amanecer es un sueño puro.
No necesito castillos ni princesas de cristal,
Solo tu sonrisa al despertar, mi final.
Eres mi cuento de hadas hecho realidad,
Mi {APODO_DESTINATARIO}, mi amor, mi felicidad.$t1e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_1_Despertar_a_Tu_Lado_es_Como_un_Cuento_de_Hadas_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t2a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión, complicidad y la alegría de convertir la rutina más simple en una comedia romántica compartida.

Ligeramente descentrada una pareja en pijama se cepilla los dientes frente al espejo del baño haciendo caras graciosas (rostros fotorrealistas basados en fotografías reales), con espuma de pasta dental y risas contenidas. Ambos se miran a través del espejo con complicidad juguetona y felicidad genuina.$t2a$,
  background_details = $t2b$El baño se transforma en un set de comedia romántica de Hollywood: luces de camerino enmarcan el espejo, pósters de películas románticas clásicas decoran las paredes y detalles cálidos completan el ambiente cinematográfico.$t2b$,
  magic_effects = $t2c$Las bombillas del camerino emiten destellos cálidos y suaves, y un sutil brillo cinematográfico envuelve la escena, como si una cámara invisible estuviera filmando su película. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$t2c$,
  lighting_color = $t2d$Iluminación cálida y alegre de camerino, con tonos ámbar, dorados y cremas luminosos. La atmósfera es divertida, cotidiana y romántica a la vez, con un acabado cinematográfico.$t2d$,
  poem_template = $t2e$Cepillarnos los dientes juntos es nuestra comedia,
{NOMBRE_DESTINATARIO}, haces de lo simple una gran remedia.
Tus caras graciosas en el espejo me hacen reír,
Contigo hasta lo aburrido es un buen vivir.
No necesito Hollywood ni escenas perfectas,
Solo estos momentos, nuestras risas directas.
Eres mi comedia romántica favorita,
Mi {APODO_DESTINATARIO}, mi amor, mi risa infinita.$t2e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_2_Cepillarnos_los_Dientes_Juntos_es_Como_una_Comedia_Romántica_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t3a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite dulzura, ensoñación y la sensación de que un beso puede saber a algodón de azúcar.

una pareja comparte un beso tierno, breve y delicado (rostros fotorrealistas basados en fotografías reales), ambos completamente vestidos con ropa casual de colores suaves, envuelta por nubes de algodón de azúcar en tonos pastel. La escena es romántica e inocente, apta para todo público; sus expresiones transmiten dulzura, delicadeza y felicidad plena.$t3a$,
  background_details = $t3b$Una feria mágica al atardecer se despliega detrás: luces brillantes, una rueda gigante iluminada y puestos de dulces desenfocados crean un escenario soñador y romántico.$t3b$,
  magic_effects = $t3c$Nubes flotantes de algodón de azúcar rosa, azul y lila rodean a la pareja, y pequeñas partículas azucaradas brillan suspendidas en el aire. La magia debe sentirse dulce, delicada y completamente integrada dentro de una fotografía realista.$t3c$,
  lighting_color = $t3d$Iluminación suave y soñadora con predominio de tonos pastel: rosa, azul cielo, lila y destellos dorados cálidos de las luces de la feria. Atmósfera dulce, mágica y romántica.$t3d$,
  poem_template = $t3e$Besarte es como comer algodón de azúcar,
{NOMBRE_DESTINATARIO}, dulce, suave, me haces volar.
Tus labios son mi feria de dulzura,
Donde cada beso es pura ternura.
No necesito postres ni caramelos del cielo,
Solo tus besos, mi dulce anhelo.
Eres mi algodón de azúcar favorito,
Mi {APODO_DESTINATARIO}, mi amor, mi infinito.$t3e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_3_Besarte_es_Como_Comer_Algodón_de_Azúcar_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t4a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión, creatividad y la complicidad de cocinar juntos como si fueran las estrellas de su propio programa.

Ligeramente descentrada, una pareja cocina junta con delantales y sonrisas radiantes (rostros fotorrealistas basados en fotografías reales), compartiendo gestos de show televisivo: prueban salsas, se pasan ingredientes y ríen con complicidad creativa.$t4a$,
  background_details = $t4b$La cocina se transforma en un set profesional de programa de cocina: luces de estudio, mesada impecable de chef estrella y utensilios brillantes componen el escenario televisivo.$t4b$,
  magic_effects = $t4c$Ingredientes frescos flotan artísticamente en el aire — hierbas, especias y verduras suspendidas con elegancia — junto a un sutil vapor dorado que envuelve los platos. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$t4c$,
  lighting_color = $t4d$Iluminación vibrante y cálida de estudio de televisión, con tonos dorados, rojizos apetitosos y blancos cálidos. Atmósfera enérgica, colaborativa y alegre.$t4d$,
  poem_template = $t4e$Cocinar contigo es nuestro show especial,
{NOMBRE_DESTINATARIO}, juntos creamos magia culinaria sin igual.
Tus ocurrencias en la cocina me hacen sonreír,
Contigo hasta quemar el arroz es un buen vivir.
No necesito chefs ni recetas de cinco estrellas,
Solo tus manos y nuestras huellas.
Eres mi compañera de cocina favorita,
Mi {APODO_DESTINATARIO}, mi amor, mi apetito.$t4e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_4_Cocinar_Contigo_es_Como_un_Show_de_Cocina_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t5a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez, nostalgia y la intimidad de un cine privado construido a puro abrazo.

una pareja acurrucada en un sofá bajo mantas suaves (rostros fotorrealistas basados en fotografías reales): ella descansa la cabeza sobre el pecho de él mientras comparten un bol de palomitas, ambos con expresiones de paz y felicidad absorta.$t5a$,
  background_details = $t5b$La sala se transforma en un cine vintage mágico: cortinas de terciopelo rojo enmarcan una gran pantalla brillante, y la luz de la proyección baña suavemente la escena.$t5b$,
  magic_effects = $t5c$Motas de polvo brillan dentro del haz de luz del proyector y un resplandor dorado suave envuelve el sofá como una burbuja de intimidad. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$t5c$,
  lighting_color = $t5d$Iluminación tenue y romántica de sala de cine clásica, con tonos rojizos cálidos, dorados y ámbar. Atmósfera nostálgica, acogedora e íntima.$t5d$,
  poem_template = $t5e$Ver películas juntos es nuestro cine privado,
{NOMBRE_DESTINATARIO}, acurrucados en nuestro sofá amado.
Tu cabeza en mi pecho es mi escena favorita,
Donde cada película es más bonita.
No necesito salas VIP ni estrenos especiales,
Solo tu abrazo y momentos reales.
Eres mi compañera de películas perfecta,
Mi {APODO_DESTINATARIO}, mi amor, mi afecto.$t5e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_5_Ver_Películas_Juntos_es_Como_Estar_en_el_Cine_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t6a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, libertad y el espíritu de una aventura épica compartida alrededor del mundo.

una pareja con mochilas de viaje avanza tomada de la mano (rostros fotorrealistas basados en fotografías reales), con expresiones de asombro y entusiasmo mientras señalan el horizonte.$t6a$,
  background_details = $t6b$Un paisaje épico reúne monumentos icónicos del mundo reinterpretados en versión fantástica — torres, templos y montañas bañados por una luz irreal — bajo un cielo amplio de atardecer vibrante.$t6b$,
  magic_effects = $t6c$Mapas antiguos flotan desplegados en el aire junto a una brújula dorada brillante, y un sendero de destellos marca la ruta de sus próximos destinos. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$t6c$,
  lighting_color = $t6d$Iluminación dorada de atardecer con colores vibrantes de distintas latitudes: ocres, turquesas, naranjas y azules profundos. Atmósfera épica, cálida y llena de energía.$t6d$,
  poem_template = $t6e$Viajar contigo es la mejor aventura,
{NOMBRE_DESTINATARIO}, exploramos el mundo con locura.
Tu mano en la mía es mi mapa seguro,
Donde cada destino es un tesoro puro.
No necesito lugares exóticos ni lujos,
Solo tus ojos y nuestros dibujos.
Eres mi compañera de viaje ideal,
Mi {APODO_DESTINATARIO}, mi amor, mi portal.$t6e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_6_Viajar_Contigo_es_Como_una_Aventura_Épica_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t7a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría, romance y la energía de un gran número musical protagonizado por dos.

Ligeramente descentrada, una pareja baila en pleno movimiento (rostros fotorrealistas basados en fotografías reales): él la guía en un giro elegante mientras ambos ríen con los ojos brillantes, transmitiendo ritmo, complicidad y celebración.$t7a$,
  background_details = $t7b$La sala se transforma en un escenario de musical de Broadway: cortinas rojas elegantes, luces de teatro que dibujan círculos dorados en el piso y una escenografía cálida de espectáculo.$t7b$,
  magic_effects = $t7c$Notas musicales luminosas flotan en el aire siguiendo la coreografía y destellos dorados acompañan cada giro de la pareja. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$t7c$,
  lighting_color = $t7d$Iluminación teatral vibrante con haces dorados, ámbar y toques rojizos del terciopelo. Atmósfera alegre, romántica y espectacular.$t7d$,
  poem_template = $t7e$Bailar contigo es como estar en un musical,
{NOMBRE_DESTINATARIO}, cada paso es algo especial.
Tus movimientos me llevan a otra dimensión,
Donde cada giro es pura emoción.
No necesito Broadway ni escenarios grandes,
Solo tu ritmo y nuestros bailes errantes.
Eres mi pareja de baile perfecta,
Mi {APODO_DESTINATARIO}, mi amor, mi danza directa.$t7e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_7_Bailar_Contigo_es_Como_Estar_en_un_Musical_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t8a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección, calma y la certeza de que un abrazo puede ser el refugio más seguro del mundo.

una pareja se abraza con los ojos cerrados (rostros fotorrealistas basados en fotografías reales), en una postura envolvente que transmite paz absoluta, contención y ternura.$t8a$,
  background_details = $t8b$El entorno se desvanece suavemente en un difuminado etéreo: apenas se insinúan siluetas de un hogar cálido, mostrando que dentro del abrazo existe un mundo propio y seguro.$t8b$,
  magic_effects = $t8c$Una burbuja protectora de luz dorada envuelve a la pareja, con partículas mágicas brillantes que orbitan lentamente a su alrededor. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$t8c$,
  lighting_color = $t8d$Iluminación suave y envolvente con predominio de dorados cálidos, blancos luminosos y cremas. Atmósfera reconfortante, íntima y protectora.$t8d$,
  poem_template = $t8e$Tus abrazos son mi refugio mágico,
{NOMBRE_DESTINATARIO}, donde el mundo es menos trágico.
En tus brazos encuentro mi paz,
Donde cada preocupación se va.
No necesito castillos ni fortalezas,
Solo tu abrazo y sus certezas.
Eres mi refugio seguro y real,
Mi {APODO_DESTINATARIO}, mi amor, mi hogar ideal.$t8e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_8_Tus_Abrazos_Son_Como_un_Refugio_Mágico_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t9a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión, nostalgia y la intimidad de un concierto privado que solo existe para dos.

Ligeramente descentrada, una pareja comparte auriculares recostada entre almohadones (rostros fotorrealistas basados en fotografías reales); cantan a la vez con sonrisas cómplices y los ojos entrecerrados, dejándose llevar por la música.$t9a$,
  background_details = $t9b$La habitación se transforma en una sala de concierto íntima: luces de colores suaves recorren las paredes y una penumbra cálida de escenario envuelve el espacio.$t9b$,
  magic_effects = $t9c$Instrumentos musicales luminosos — guitarra, piano, violín — flotan de forma etérea alrededor, mientras ondas de sonido visibles en colores vibrantes se expanden suavemente al ritmo de la canción. La magia debe sentirse musical y completamente integrada dentro de una fotografía realista.$t9c$,
  lighting_color = $t9d$Iluminación de concierto íntimo con tonos púrpura, azules profundos, rosados y destellos dorados. Atmósfera nostálgica, envolvente y musical.$t9d$,
  poem_template = $t9e$Escuchar música contigo es nuestro concierto,
{NOMBRE_DESTINATARIO}, cada canción cobra sentido cierto.
Tu voz cantando me hace feliz,
Contigo hasta el silencio es un matiz.
No necesito estadios ni artistas famosos,
Solo tus gustos y momentos hermosos.
Eres mi banda sonora favorita,
Mi {APODO_DESTINATARIO}, mi amor, mi melodía infinita.$t9e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_9_Escuchar_Música_Contigo_es_Como_un_Concierto_Privado_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t10a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite esperanza, ilusión y la emoción de diseñar juntos el futuro soñado.

Ligeramente descentrada, una pareja sentada muy junta planifica sobre una mesa con cuadernos y lápices (rostros fotorrealistas basados en fotografías reales), señalando con entusiasmo las imágenes que flotan frente a ellos, con expresiones de ilusión compartida.$t10a$,
  background_details = $t10b$Un espacio cálido de hogar en penumbra suave sirve de lienzo para la proyección de sus planes, con detalles acogedores apenas insinuados detrás.$t10b$,
  magic_effects = $t10c$Imágenes holográficas brillantes de sus sueños flotan en el aire — una casa, viajes, una familia —, junto a mapas del futuro y calendarios mágicos dibujados en luz. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$t10c$,
  lighting_color = $t10d$Iluminación cálida con acentos azules luminosos y dorados de las proyecciones. Atmósfera soñadora, serena y llena de futuro.$t10d$,
  poem_template = $t10e$Hacer planes contigo es diseñar nuestro futuro,
{NOMBRE_DESTINATARIO}, cada sueño contigo es seguro.
Tus ideas me hacen ilusionar,
Donde cada plan es un nuevo hogar.
No necesito certezas ni caminos trazados,
Solo tus sueños y momentos planeados.
Eres mi arquitecta de futuros perfectos,
Mi {APODO_DESTINATARIO}, mi amor, mis proyectos.$t10e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_10_Hacer_Planes_Contigo_es_Como_Diseñar_Nuestro_Futuro_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t11a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite felicidad pura, liberación y el poder sanador de reír juntos hasta el alma.

una pareja ríe a carcajadas (rostros fotorrealistas basados en fotografías reales), inclinándose el uno hacia el otro con los ojos cerrados de risa, en un momento de alegría desbordante y genuina.$t11a$,
  background_details = $t11b$Un ambiente luminoso y despejado, bañado por una claridad radiante que parece nacer de la propia risa de la pareja.$t11b$,
  magic_effects = $t11c$Burbujas de colores brillantes con pequeñas caritas felices estallan suavemente alrededor, mientras rayos de luz dorada emanan de sus risas iluminando toda la escena. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$t11c$,
  lighting_color = $t11d$Iluminación radiante y vibrante con dorados intensos, amarillos cálidos y acentos de colores vivos. Atmósfera de pura felicidad y energía sanadora.$t11d$,
  poem_template = $t11e$Reír contigo es mi terapia del alma,
{NOMBRE_DESTINATARIO}, tu risa me trae calma.
Tus ocurrencias iluminan mi día,
Donde cada carcajada es alegría.
No necesito doctores ni medicinas,
Solo tus bromas y tus rutinas.
Eres mi sanadora de días grises,
Mi {APODO_DESTINATARIO}, mi amor, mis sonrisas.$t11e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_11_Reír_Contigo_es_Como_Terapia_del_Alma_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t12a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz profunda, serenidad y la sensación de dormir flotando entre las nubes.

una pareja duerme abrazada en su cama (rostros fotorrealistas basados en fotografías reales), con expresiones de paz absoluta y una postura tierna de entrega mutua.$t12a$,
  background_details = $t12b$La cama flota literalmente en un cielo nocturno estrellado, entre nubes suaves iluminadas por una luna llena plateada que domina el horizonte onírico.$t12b$,
  magic_effects = $t12c$Polvo de estrellas cae delicadamente alrededor de la cama y las nubes emiten un resplandor perlado que acuna a la pareja. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$t12c$,
  lighting_color = $t12d$Iluminación nocturna suave dominada por azules profundos, plateados lunares y blancos perlados. Atmósfera onírica, celestial y tranquila.$t12d$,
  poem_template = $t12e$Dormir contigo es flotar en las nubes,
{NOMBRE_DESTINATARIO}, donde mis sueños se distribuyen.
Tu respiración es mi canción de cuna,
Donde cada noche es una fortuna.
No necesito colchones de lujo ni sedas,
Solo tu calor y nuestras veredas.
Eres mi almohada favorita del cielo,
Mi {APODO_DESTINATARIO}, mi amor, mi anhelo.$t12e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_12_Dormir_Contigo_es_Como_Flotar_en_las_Nubes_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t13a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza compartida, romance y la sensación de que tomados de la mano pueden conquistar el mundo.

una pareja camina de la mano con paso decidido (rostros fotorrealistas basados en fotografías reales), mirándose con orgullo y complicidad, transmitiendo poder conjunto y amor.$t13a$,
  background_details = $t13b$La calle se transforma en un camino dorado brillante que se extiende hacia paisajes épicos: ciudades luminosas, montañas majestuosas y horizontes abiertos que parecen rendirse a su paso.$t13b$,
  magic_effects = $t13c$El camino resplandece bajo sus pies con un brillo dorado que avanza con ellos, mientras destellos de luz coronan el horizonte. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$t13c$,
  lighting_color = $t13d$Iluminación dorada épica de atardecer con tonos ámbar intensos, ocres y acentos vibrantes. Atmósfera de conquista romántica y poder compartido.$t13d$,
  poem_template = $t13e$Caminar de tu mano es conquistar el mundo,
{NOMBRE_DESTINATARIO}, juntos somos más profundos.
Tu mano en la mía es mi fuerza,
Donde cada paso es una proeza.
No necesito ejércitos ni coronas,
Solo tu mano y nuestras zonas.
Eres mi compañera de conquistas,
Mi {APODO_DESTINATARIO}, mi amor, mis vistas.$t13e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_13_Caminar_de_la_Mano_es_Como_Conquistar_el_Mundo_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t14a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura moderna y la emoción de recibir mensajes que se sienten como cartas de amor de otra época.

Ligeramente descentrado, un hombre sonríe emocionado mientras lee un mensaje en su teléfono; la pantalla brilla mágicamente e ilumina su rostro con un resplandor cálido de felicidad.$t14a$,
  background_details = $t14b$Un rincón acogedor del hogar en penumbra cálida, donde lo cotidiano se mezcla con un aire romántico vintage.$t14b$,
  magic_effects = $t14c$Cartas de amor antiguas con sellos y cintas flotan alrededor del teléfono, mientras pequeños corazones brillantes emergen de la pantalla y se elevan en el aire. La magia debe sentirse romántica y completamente integrada dentro de una fotografía realista.$t14c$,
  lighting_color = $t14d$Iluminación cálida e íntima con tonos rosados, dorados y cremas. Atmósfera nostálgica y moderna a la vez, tierna y luminosa.$t14d$,
  poem_template = $t14e$Tus mensajes son cartas de amor modernas,
{NOMBRE_DESTINATARIO}, cada notificación es tierna.
Tu “buenos días” ilumina mi pantalla,
Donde cada palabra es una batalla ganada.
No necesito poemas escritos a mano,
Solo tus textos cada verano.
Eres mi escritora de mensajes perfectos,
Mi {APODO_DESTINATARIO}, mi amor, mis afectos.$t14e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_14_Tus_Mensajes_Son_Como_Recibir_Cartas_de_Amor_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t15a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite profundidad, conexión absoluta y la sensación de encontrar el universo entero en una mirada.

En primer plano cercano y ligeramente descentrado, una pareja se mira a los ojos a escasos centímetros (rostros fotorrealistas basados en fotografías reales); en sus ojos se reflejan galaxias, estrellas y nebulosas brillantes, mientras sus expresiones transmiten amor profundo y asombro.$t15a$,
  background_details = $t15b$Una penumbra cósmica envuelve la escena, donde el espacio íntimo que los rodea se funde suavemente con un cielo de nebulosas difusas.$t15b$,
  magic_effects = $t15c$Partículas de polvo estelar flotan entre ambos y sutiles destellos cósmicos laten alrededor de sus rostros. La magia debe sentirse profunda y completamente integrada dentro de una fotografía realista.$t15c$,
  lighting_color = $t15d$Iluminación cósmica con azules profundos, púrpuras intensos y acentos dorados y plateados. Atmósfera mágica, íntima y universal.$t15d$,
  poem_template = $t15e$Mirarte a los ojos es ver el universo,
{NOMBRE_DESTINATARIO}, en tu mirada me sumerso.
Tus ojos guardan galaxias infinitas,
Donde cada destello son visitas.
No necesito telescopios ni estrellas lejanas,
Solo tu mirada y nuestras ganas.
Eres mi universo completo y real,
Mi {APODO_DESTINATARIO}, mi amor, mi astral.$t15e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_15_Mirarte_a_los_Ojos_es_Como_Ver_el_Universo_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t16a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite pasión elegante, celebración y la intensidad de un amor que enciende el cielo.

una pareja se abraza íntimamente en una terraza nocturna (rostros fotorrealistas basados en fotografías reales), frente contra frente, en una pose sensual y elegante, sin contenido explícito, transmitiendo amor y celebración.$t16a$,
  background_details = $t16b$Un cielo nocturno profundo estalla en fuegos artificiales de colores que iluminan la ciudad distante y se reflejan suavemente sobre la pareja.$t16b$,
  magic_effects = $t16c$Los fuegos artificiales despliegan cascadas de chispas doradas, rojas y púrpuras, y algunas luces flotan lentamente alrededor de la pareja. La magia debe sentirse celebratoria y completamente integrada dentro de una fotografía realista.$t16c$,
  lighting_color = $t16d$Iluminación nocturna vibrante con rojos intensos, dorados brillantes y púrpuras profundos. Atmósfera festiva, apasionada y romántica.$t16d$,
  poem_template = $t16e$Hacer el amor contigo es como fuegos artificiales,
{NOMBRE_DESTINATARIO}, explosiones de pasión sin iguales.
Tu piel contra la mía enciende el cielo,
Donde cada caricia es mi anhelo.
No necesito celebraciones ni fiestas grandes,
Solo tus besos y nuestros instantes.
Eres mi fuego artificial perfecto,
Mi {APODO_DESTINATARIO}, mi amor, mi afecto.$t16e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_16_Hacer_el_Amor_Contigo_es_Como_Fuegos_Artificiales_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t17a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura, gratitud y la sensación de ser cuidado por un ángel.

Ligeramente descentrado, un hombre descansa en cama arropado con expresión de alivio y gratitud (rostros fotorrealistas basados en fotografías reales), mientras ella lo cuida con ternura acercándole una taza humeante; sobre la espalda de ella se despliegan alas de ángel brillantes y suaves, coronadas por un halo dorado sutil.$t17a$,
  background_details = $t17b$Un dormitorio cálido y sereno con detalles hogareños suaves, envuelto en una claridad reconfortante.$t17b$,
  magic_effects = $t17c$Las alas y el halo emiten un resplandor dorado delicado, con plumas luminosas y partículas de luz blanca flotando alrededor del gesto de cuidado. La magia debe sentirse angelical y completamente integrada dentro de una fotografía realista.$t17c$,
  lighting_color = $t17d$Iluminación suave y reconfortante con blancos luminosos, dorados delicados y tonos pastel. Atmósfera angelical, cálida y protectora.$t17d$,
  poem_template = $t17e$Cuidarme cuando estoy enfermo es tener un ángel,
{NOMBRE_DESTINATARIO}, tu amor es mi mejor ángel.
Tus mimos y cuidados me sanan,
Donde cada gesto son campanas.
No necesito doctores ni hospitales,
Solo tu amor y cuidados especiales.
Eres mi enfermera del cielo,
Mi {APODO_DESTINATARIO}, mi amor, mi consuelo.$t17e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_17_Cuidarme_Cuando_Estoy_Enfermo_es_Como_Tener_un_Ángel_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t18a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, alegría y la magia de los detalles inesperados.

Ligeramente descentrado, un hombre recibe una sorpresa con una sonrisa de asombro genuino (rostros fotorrealistas basados en fotografías reales), mientras ella se la entrega con una sonrisa cómplice y enamorada.$t18a$,
  background_details = $t18b$Un espacio cálido y festivo del hogar, decorado con luces suaves que acompañan el momento de celebración.$t18b$,
  magic_effects = $t18c$Confeti mágico brillante estalla en el aire junto a regalos flotantes envueltos con lazos luminosos, estrellas y destellos que giran alrededor de la pareja. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$t18c$,
  lighting_color = $t18d$Iluminación vibrante y festiva con dorados, rosados y acentos de colores vivos. Atmósfera de celebración, sorpresa y alegría.$t18d$,
  poem_template = $t18e$Tus sorpresas son magia pura y real,
{NOMBRE_DESTINATARIO}, cada detalle es especial.
Tus gestos inesperados me hacen volar,
Donde cada sorpresa es un lugar.
No necesito grandes regalos ni lujos,
Solo tus detalles y dibujos.
Eres mi maga de sorpresas perfectas,
Mi {APODO_DESTINATARIO}, mi amor, mis fiestas.$t18e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_18_Tus_Sorpresas_Son_Como_Magia_Pura_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t19a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite inspiración, libertad y el poder de un apoyo incondicional que da alas.

un hombre despliega unas alas brillantes y majestuosas (rostros fotorrealistas basados en fotografías reales), con expresión de determinación y libertad, mientras ella, detrás, lo sostiene con las manos en sus hombros y una mirada de orgullo y fe absoluta.$t19a$,
  background_details = $t19b$Un cielo abierto y luminoso con nubes suaves se extiende alrededor, como si el mundo entero fuera pista de despegue para sus sueños.$t19b$,
  magic_effects = $t19c$Las alas emiten un resplandor blanco dorado con plumas de luz que se desprenden suavemente, y corrientes de aire luminosas ascienden alrededor. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$t19c$,
  lighting_color = $t19d$Iluminación amplia y luminosa con azules celestes, blancos radiantes y dorados inspiradores. Atmósfera de vuelo, libertad y empoderamiento.$t19d$,
  poem_template = $t19e$Apoyarme en mis sueños es darme alas,
{NOMBRE_DESTINATARIO}, contigo todo se escala.
Tu fe en mí me hace volar alto,
Donde cada sueño es un salto.
No necesito vientos ni corrientes,
Solo tu apoyo y palabras presentes.
Eres mi impulso para volar,
Mi {APODO_DESTINATARIO}, mi amor, mi despertar.$t19e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_19_Apoyarme_en_Mis_Sueños_es_Como_Tener_Alas_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t20a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite renovación, honestidad y la emoción de una segunda oportunidad nacida del perdón.

una pareja se abraza con emoción contenida (rostros fotorrealistas basados en fotografías reales): los ojos húmedos, el alivio y la ternura del reencuentro se leen en sus rostros.$t20a$,
  background_details = $t20b$El entorno cuenta la transformación: de un lado persisten tonos grises que se disuelven, y alrededor de la pareja el espacio florece en color y luz renovada.$t20b$,
  magic_effects = $t20c$Cadenas oscuras se rompen y se desvanecen en partículas mientras flores brillantes crecen alrededor de la pareja, iluminando la escena con vida nueva. La magia debe sentirse transformadora y completamente integrada dentro de una fotografía realista.$t20c$,
  lighting_color = $t20d$Iluminación en transición del gris a colores vibrantes: verdes frescos, rosados y dorados cálidos. Atmósfera de renovación, esperanza y reconciliación.$t20d$,
  poem_template = $t20e$Perdonarme es darme una segunda oportunidad,
{NOMBRE_DESTINATARIO}, tu amor tiene capacidad.
Tu perdón me libera y me sana,
Donde cada abrazo es ventana.
No necesito jueces ni sentencias,
Solo tu perdón y paciencias.
Eres mi segunda oportunidad real,
Mi {APODO_DESTINATARIO}, mi amor, mi final.$t20e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_20_Perdonarme_es_Como_Recibir_una_Segunda_Oportunidad_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t21a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura, magia y la sensación de que despertar junto a la persona amada convierte cada mañana en un cuento de hadas.

Ligeramente descentrada una pareja despierta abrazada en una cama con pijamas suaves (rostros fotorrealistas basados en fotografías reales). Ella sonríe con dulzura recién despierta mientras él la contempla con adoración y serenidad; ambos transmiten complicidad, paz y felicidad plena.$t21a$,
  background_details = $t21b$El dormitorio se transforma en un bosque encantado: árboles de troncos luminosos y copas brillantes rodean la cama, mezclándose de forma natural con los muebles del cuarto. La luz suave del amanecer se filtra entre las ramas creando haces dorados.$t21b$,
  magic_effects = $t21c$Partículas mágicas doradas y pastel flotan delicadamente en el aire, y pequeños destellos brillan sobre las hojas de los árboles encantados. La magia debe sentirse sutil, elegante y completamente integrada dentro de una fotografía realista.$t21c$,
  lighting_color = $t21d$Iluminación cinematográfica suave de amanecer, cálida y envolvente. Predominan tonos pastel, dorados delicados, rosados suaves y cremas luminosos, creando una atmósfera de cuento de hadas romántica y serena.$t21d$,
  poem_template = $t21e$Despertar a tu lado es como un cuento de hadas,
{NOMBRE_DESTINATARIO}, cada mañana mi alma está encantada.
Tus brazos son mi bosque mágico y seguro,
Donde cada amanecer es un sueño puro.
No necesito castillos ni princesas de cristal,
Solo tu sonrisa al despertar, mi final.
Eres mi cuento de hadas hecho realidad,
Mi {APODO_DESTINATARIO}, mi amor, mi felicidad.$t21e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_1_Despertar_a_Tu_Lado_es_Como_un_Cuento_de_Hadas_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t22a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión, complicidad y la alegría de convertir la rutina más simple en una comedia romántica compartida.

Ligeramente descentrada una pareja en pijama se cepilla los dientes frente al espejo del baño haciendo caras graciosas (rostros fotorrealistas basados en fotografías reales), con espuma de pasta dental y risas contenidas. Ambos se miran a través del espejo con complicidad juguetona y felicidad genuina.$t22a$,
  background_details = $t22b$El baño se transforma en un set de comedia romántica de Hollywood: luces de camerino enmarcan el espejo, pósters de películas románticas clásicas decoran las paredes y detalles cálidos completan el ambiente cinematográfico.$t22b$,
  magic_effects = $t22c$Las bombillas del camerino emiten destellos cálidos y suaves, y un sutil brillo cinematográfico envuelve la escena, como si una cámara invisible estuviera filmando su película. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$t22c$,
  lighting_color = $t22d$Iluminación cálida y alegre de camerino, con tonos ámbar, dorados y cremas luminosos. La atmósfera es divertida, cotidiana y romántica a la vez, con un acabado cinematográfico.$t22d$,
  poem_template = $t22e$Cepillarnos los dientes juntos es nuestra comedia,
{NOMBRE_DESTINATARIO}, haces de lo simple una gran remedia.
Tus caras graciosas en el espejo me hacen reír,
Contigo hasta lo aburrido es un buen vivir.
No necesito Hollywood ni escenas perfectas,
Solo estos momentos, nuestras risas directas.
Eres mi comedia romántica favorita,
Mi {APODO_DESTINATARIO}, mi amor, mi risa infinita.$t22e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_2_Cepillarnos_los_Dientes_Juntos_es_Como_una_Comedia_Romántica_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t23a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite dulzura, ensoñación y la sensación de que un beso puede saber a algodón de azúcar.

una pareja comparte un beso tierno, breve y delicado (rostros fotorrealistas basados en fotografías reales), ambos completamente vestidos con ropa casual de colores suaves, envuelta por nubes de algodón de azúcar en tonos pastel. La escena es romántica e inocente, apta para todo público; sus expresiones transmiten dulzura, delicadeza y felicidad plena.$t23a$,
  background_details = $t23b$Una feria mágica al atardecer se despliega detrás: luces brillantes, una rueda gigante iluminada y puestos de dulces desenfocados crean un escenario soñador y romántico.$t23b$,
  magic_effects = $t23c$Nubes flotantes de algodón de azúcar rosa, azul y lila rodean a la pareja, y pequeñas partículas azucaradas brillan suspendidas en el aire. La magia debe sentirse dulce, delicada y completamente integrada dentro de una fotografía realista.$t23c$,
  lighting_color = $t23d$Iluminación suave y soñadora con predominio de tonos pastel: rosa, azul cielo, lila y destellos dorados cálidos de las luces de la feria. Atmósfera dulce, mágica y romántica.$t23d$,
  poem_template = $t23e$Besarte es como comer algodón de azúcar,
{NOMBRE_DESTINATARIO}, dulce, suave, me haces volar.
Tus labios son mi feria de dulzura,
Donde cada beso es pura ternura.
No necesito postres ni caramelos del cielo,
Solo tus besos, mi dulce anhelo.
Eres mi algodón de azúcar favorito,
Mi {APODO_DESTINATARIO}, mi amor, mi infinito.$t23e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_3_Besarte_es_Como_Comer_Algodón_de_Azúcar_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t24a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite diversión, creatividad y la complicidad de cocinar juntos como si fueran las estrellas de su propio programa.

Ligeramente descentrada, una pareja cocina junta con delantales y sonrisas radiantes (rostros fotorrealistas basados en fotografías reales), compartiendo gestos de show televisivo: prueban salsas, se pasan ingredientes y ríen con complicidad creativa.$t24a$,
  background_details = $t24b$La cocina se transforma en un set profesional de programa de cocina: luces de estudio, mesada impecable de chef estrella y utensilios brillantes componen el escenario televisivo.$t24b$,
  magic_effects = $t24c$Ingredientes frescos flotan artísticamente en el aire — hierbas, especias y verduras suspendidas con elegancia — junto a un sutil vapor dorado que envuelve los platos. La magia debe sentirse divertida y completamente integrada dentro de una fotografía realista.$t24c$,
  lighting_color = $t24d$Iluminación vibrante y cálida de estudio de televisión, con tonos dorados, rojizos apetitosos y blancos cálidos. Atmósfera enérgica, colaborativa y alegre.$t24d$,
  poem_template = $t24e$Cocinar contigo es nuestro show especial,
{NOMBRE_DESTINATARIO}, juntos creamos magia culinaria sin igual.
Tus ocurrencias en la cocina me hacen sonreír,
Contigo hasta quemar el arroz es un buen vivir.
No necesito chefs ni recetas de cinco estrellas,
Solo tus manos y nuestras huellas.
Eres mi compañero de cocina favorito,
Mi {APODO_DESTINATARIO}, mi amor, mi apetito.$t24e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_4_Cocinar_Contigo_es_Como_un_Show_de_Cocina_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t25a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite calidez, nostalgia y la intimidad de un cine privado construido a puro abrazo.

una pareja acurrucada en un sofá bajo mantas suaves (rostros fotorrealistas basados en fotografías reales): ella descansa la cabeza sobre el pecho de él mientras comparten un bol de palomitas, ambos con expresiones de paz y felicidad absorta.$t25a$,
  background_details = $t25b$La sala se transforma en un cine vintage mágico: cortinas de terciopelo rojo enmarcan una gran pantalla brillante, y la luz de la proyección baña suavemente la escena.$t25b$,
  magic_effects = $t25c$Motas de polvo brillan dentro del haz de luz del proyector y un resplandor dorado suave envuelve el sofá como una burbuja de intimidad. La magia debe sentirse acogedora y completamente integrada dentro de una fotografía realista.$t25c$,
  lighting_color = $t25d$Iluminación tenue y romántica de sala de cine clásica, con tonos rojizos cálidos, dorados y ámbar. Atmósfera nostálgica, acogedora e íntima.$t25d$,
  poem_template = $t25e$Ver películas juntos es nuestro cine privado,
{NOMBRE_DESTINATARIO}, acurrucados en nuestro sofá amado.
Tu pecho es mi almohada favorita,
Donde cada película es más bonita.
No necesito salas VIP ni estrenos especiales,
Solo tu abrazo y momentos reales.
Eres mi compañero de películas perfecto,
Mi {APODO_DESTINATARIO}, mi amor, mi afecto.$t25e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_5_Ver_Películas_Juntos_es_Como_Estar_en_el_Cine_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t26a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite emoción, libertad y el espíritu de una aventura épica compartida alrededor del mundo.

una pareja con mochilas de viaje avanza tomada de la mano (rostros fotorrealistas basados en fotografías reales), con expresiones de asombro y entusiasmo mientras señalan el horizonte.$t26a$,
  background_details = $t26b$Un paisaje épico reúne monumentos icónicos del mundo reinterpretados en versión fantástica — torres, templos y montañas bañados por una luz irreal — bajo un cielo amplio de atardecer vibrante.$t26b$,
  magic_effects = $t26c$Mapas antiguos flotan desplegados en el aire junto a una brújula dorada brillante, y un sendero de destellos marca la ruta de sus próximos destinos. La magia debe sentirse aventurera y completamente integrada dentro de una fotografía realista.$t26c$,
  lighting_color = $t26d$Iluminación dorada de atardecer con colores vibrantes de distintas latitudes: ocres, turquesas, naranjas y azules profundos. Atmósfera épica, cálida y llena de energía.$t26d$,
  poem_template = $t26e$Viajar contigo es la mejor aventura,
{NOMBRE_DESTINATARIO}, exploramos el mundo con locura.
Tu mano en la mía es mi mapa seguro,
Donde cada destino es un tesoro puro.
No necesito lugares exóticos ni lujos,
Solo tus ojos y nuestros dibujos.
Eres mi compañero de viaje ideal,
Mi {APODO_DESTINATARIO}, mi amor, mi portal.$t26e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_6_Viajar_Contigo_es_Como_una_Aventura_Épica_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t27a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría, romance y la energía de un gran número musical protagonizado por dos.

Ligeramente descentrada, una pareja baila en pleno movimiento (rostros fotorrealistas basados en fotografías reales): él la guía en un giro elegante mientras ambos ríen con los ojos brillantes, transmitiendo ritmo, complicidad y celebración.$t27a$,
  background_details = $t27b$La sala se transforma en un escenario de musical de Broadway: cortinas rojas elegantes, luces de teatro que dibujan círculos dorados en el piso y una escenografía cálida de espectáculo.$t27b$,
  magic_effects = $t27c$Notas musicales luminosas flotan en el aire siguiendo la coreografía y destellos dorados acompañan cada giro de la pareja. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$t27c$,
  lighting_color = $t27d$Iluminación teatral vibrante con haces dorados, ámbar y toques rojizos del terciopelo. Atmósfera alegre, romántica y espectacular.$t27d$,
  poem_template = $t27e$Bailar contigo es como estar en un musical,
{NOMBRE_DESTINATARIO}, cada paso es algo especial.
Tus brazos me guían en nuestra canción,
Donde cada movimiento es pura emoción.
No necesito Broadway ni escenarios grandes,
Solo tu ritmo y nuestros bailes errantes.
Eres mi pareja de baile perfecta,
Mi {APODO_DESTINATARIO}, mi amor, mi danza directa.$t27e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_7_Bailar_Contigo_es_Como_Estar_en_un_Musical_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t28a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite protección, calma y la certeza de que un abrazo puede ser el refugio más seguro del mundo.

una pareja se abraza con los ojos cerrados (rostros fotorrealistas basados en fotografías reales), en una postura envolvente que transmite paz absoluta, contención y ternura.$t28a$,
  background_details = $t28b$El entorno se desvanece suavemente en un difuminado etéreo: apenas se insinúan siluetas de un hogar cálido, mostrando que dentro del abrazo existe un mundo propio y seguro.$t28b$,
  magic_effects = $t28c$Una burbuja protectora de luz dorada envuelve a la pareja, con partículas mágicas brillantes que orbitan lentamente a su alrededor. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$t28c$,
  lighting_color = $t28d$Iluminación suave y envolvente con predominio de dorados cálidos, blancos luminosos y cremas. Atmósfera reconfortante, íntima y protectora.$t28d$,
  poem_template = $t28e$Tus abrazos son mi refugio mágico,
{NOMBRE_DESTINATARIO}, donde el mundo es menos trágico.
En tus brazos encuentro mi paz,
Donde cada preocupación se va.
No necesito castillos ni fortalezas,
Solo tu abrazo y sus certezas.
Eres mi refugio seguro y real,
Mi {APODO_DESTINATARIO}, mi amor, mi hogar ideal.$t28e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_8_Tus_Abrazos_Son_Como_un_Refugio_Mágico_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t29a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite conexión, nostalgia y la intimidad de un concierto privado que solo existe para dos.

Ligeramente descentrada, una pareja comparte auriculares recostada entre almohadones (rostros fotorrealistas basados en fotografías reales); cantan a la vez con sonrisas cómplices y los ojos entrecerrados, dejándose llevar por la música.$t29a$,
  background_details = $t29b$La habitación se transforma en una sala de concierto íntima: luces de colores suaves recorren las paredes y una penumbra cálida de escenario envuelve el espacio.$t29b$,
  magic_effects = $t29c$Instrumentos musicales luminosos — guitarra, piano, violín — flotan de forma etérea alrededor, mientras ondas de sonido visibles en colores vibrantes se expanden suavemente al ritmo de la canción. La magia debe sentirse musical y completamente integrada dentro de una fotografía realista.$t29c$,
  lighting_color = $t29d$Iluminación de concierto íntimo con tonos púrpura, azules profundos, rosados y destellos dorados. Atmósfera nostálgica, envolvente y musical.$t29d$,
  poem_template = $t29e$Escuchar música contigo es nuestro concierto,
{NOMBRE_DESTINATARIO}, cada canción cobra sentido cierto.
Tu voz cantando desafinado me hace feliz,
Contigo hasta el silencio es un matiz.
No necesito estadios ni artistas famosos,
Solo tus gustos y momentos hermosos.
Eres mi banda sonora favorita,
Mi {APODO_DESTINATARIO}, mi amor, mi melodía infinita.$t29e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_9_Escuchar_Música_Contigo_es_Como_un_Concierto_Privado_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t30a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite esperanza, ilusión y la emoción de diseñar juntos el futuro soñado.

Ligeramente descentrada, una pareja sentada muy junta planifica sobre una mesa con cuadernos y lápices (rostros fotorrealistas basados en fotografías reales), señalando con entusiasmo las imágenes que flotan frente a ellos, con expresiones de ilusión compartida.$t30a$,
  background_details = $t30b$Un espacio cálido de hogar en penumbra suave sirve de lienzo para la proyección de sus planes, con detalles acogedores apenas insinuados detrás.$t30b$,
  magic_effects = $t30c$Imágenes holográficas brillantes de sus sueños flotan en el aire — una casa, viajes, una familia —, junto a mapas del futuro y calendarios mágicos dibujados en luz. La magia debe sentirse esperanzadora y completamente integrada dentro de una fotografía realista.$t30c$,
  lighting_color = $t30d$Iluminación cálida con acentos azules luminosos y dorados de las proyecciones. Atmósfera soñadora, serena y llena de futuro.$t30d$,
  poem_template = $t30e$Hacer planes contigo es diseñar nuestro futuro,
{NOMBRE_DESTINATARIO}, cada sueño contigo es seguro.
Tus ideas locas me hacen ilusionar,
Donde cada plan es un nuevo hogar.
No necesito certezas ni caminos trazados,
Solo tus sueños y momentos planeados.
Eres mi arquitecto de futuros perfectos,
Mi {APODO_DESTINATARIO}, mi amor, mis proyectos.$t30e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_10_Hacer_Planes_Contigo_es_Como_Diseñar_Nuestro_Futuro_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t31a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite felicidad pura, liberación y el poder sanador de reír juntos hasta el alma.

una pareja ríe a carcajadas (rostros fotorrealistas basados en fotografías reales), inclinándose el uno hacia el otro con los ojos cerrados de risa, en un momento de alegría desbordante y genuina.$t31a$,
  background_details = $t31b$Un ambiente luminoso y despejado, bañado por una claridad radiante que parece nacer de la propia risa de la pareja.$t31b$,
  magic_effects = $t31c$Burbujas de colores brillantes con pequeñas caritas felices estallan suavemente alrededor, mientras rayos de luz dorada emanan de sus risas iluminando toda la escena. La magia debe sentirse alegre y completamente integrada dentro de una fotografía realista.$t31c$,
  lighting_color = $t31d$Iluminación radiante y vibrante con dorados intensos, amarillos cálidos y acentos de colores vivos. Atmósfera de pura felicidad y energía sanadora.$t31d$,
  poem_template = $t31e$Reír contigo es mi terapia del alma,
{NOMBRE_DESTINATARIO}, tus chistes me traen calma.
Tu risa contagiosa ilumina mi día,
Donde cada carcajada es alegría.
No necesito doctores ni medicinas,
Solo tus bromas y tus rutinas.
Eres mi sanador de días grises,
Mi {APODO_DESTINATARIO}, mi amor, mis sonrisas.$t31e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_11_Reír_Contigo_es_Como_Terapia_del_Alma_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t32a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite paz profunda, serenidad y la sensación de dormir flotando entre las nubes.

una pareja duerme abrazada en su cama (rostros fotorrealistas basados en fotografías reales), con expresiones de paz absoluta y una postura tierna de entrega mutua.$t32a$,
  background_details = $t32b$La cama flota literalmente en un cielo nocturno estrellado, entre nubes suaves iluminadas por una luna llena plateada que domina el horizonte onírico.$t32b$,
  magic_effects = $t32c$Polvo de estrellas cae delicadamente alrededor de la cama y las nubes emiten un resplandor perlado que acuna a la pareja. La magia debe sentirse serena y completamente integrada dentro de una fotografía realista.$t32c$,
  lighting_color = $t32d$Iluminación nocturna suave dominada por azules profundos, plateados lunares y blancos perlados. Atmósfera onírica, celestial y tranquila.$t32d$,
  poem_template = $t32e$Dormir contigo es flotar en las nubes,
{NOMBRE_DESTINATARIO}, donde mis sueños se distribuyen.
Tu respiración es mi canción de cuna,
Donde cada noche es una fortuna.
No necesito colchones de lujo ni sedas,
Solo tu calor y nuestras veredas.
Eres mi almohada favorita del cielo,
Mi {APODO_DESTINATARIO}, mi amor, mi anhelo.$t32e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_12_Dormir_Contigo_es_Como_Flotar_en_las_Nubes_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t33a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite fuerza compartida, romance y la sensación de que tomados de la mano pueden conquistar el mundo.

una pareja camina de la mano con paso decidido (rostros fotorrealistas basados en fotografías reales), mirándose con orgullo y complicidad, transmitiendo poder conjunto y amor.$t33a$,
  background_details = $t33b$La calle se transforma en un camino dorado brillante que se extiende hacia paisajes épicos: ciudades luminosas, montañas majestuosas y horizontes abiertos que parecen rendirse a su paso.$t33b$,
  magic_effects = $t33c$El camino resplandece bajo sus pies con un brillo dorado que avanza con ellos, mientras destellos de luz coronan el horizonte. La magia debe sentirse épica y completamente integrada dentro de una fotografía realista.$t33c$,
  lighting_color = $t33d$Iluminación dorada épica de atardecer con tonos ámbar intensos, ocres y acentos vibrantes. Atmósfera de conquista romántica y poder compartido.$t33d$,
  poem_template = $t33e$Caminar de tu mano es conquistar el mundo,
{NOMBRE_DESTINATARIO}, juntos somos más profundos.
Tu mano en la mía es mi fuerza,
Donde cada paso es una proeza.
No necesito ejércitos ni coronas,
Solo tu mano y nuestras zonas.
Eres mi compañero de conquistas,
Mi {APODO_DESTINATARIO}, mi amor, mis vistas.$t33e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_13_Caminar_de_la_Mano_es_Como_Conquistar_el_Mundo_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t34a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura moderna y la emoción de recibir mensajes que se sienten como cartas de amor de otra época.

Ligeramente descentrada, una mujer sonríe emocionada mientras lee un mensaje en su teléfono; la pantalla brilla mágicamente e ilumina su rostro con un resplandor cálido de felicidad.$t34a$,
  background_details = $t34b$Un rincón acogedor del hogar en penumbra cálida, donde lo cotidiano se mezcla con un aire romántico vintage.$t34b$,
  magic_effects = $t34c$Cartas de amor antiguas con sellos y cintas flotan alrededor del teléfono, mientras pequeños corazones brillantes emergen de la pantalla y se elevan en el aire. La magia debe sentirse romántica y completamente integrada dentro de una fotografía realista.$t34c$,
  lighting_color = $t34d$Iluminación cálida e íntima con tonos rosados, dorados y cremas. Atmósfera nostálgica y moderna a la vez, tierna y luminosa.$t34d$,
  poem_template = $t34e$Tus mensajes son cartas de amor modernas,
{NOMBRE_DESTINATARIO}, cada notificación es tierna.
Tu “buenos días” ilumina mi pantalla,
Donde cada palabra es una batalla ganada.
No necesito poemas escritos a mano,
Solo tus textos cada verano.
Eres mi escritor de mensajes perfectos,
Mi {APODO_DESTINATARIO}, mi amor, mis afectos.$t34e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_14_Tus_Mensajes_Son_Como_Recibir_Cartas_de_Amor_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t35a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite profundidad, conexión absoluta y la sensación de encontrar el universo entero en una mirada.

En primer plano cercano y ligeramente descentrado, una pareja se mira a los ojos a escasos centímetros (rostros fotorrealistas basados en fotografías reales); en sus ojos se reflejan galaxias, estrellas y nebulosas brillantes, mientras sus expresiones transmiten amor profundo y asombro.$t35a$,
  background_details = $t35b$Una penumbra cósmica envuelve la escena, donde el espacio íntimo que los rodea se funde suavemente con un cielo de nebulosas difusas.$t35b$,
  magic_effects = $t35c$Partículas de polvo estelar flotan entre ambos y sutiles destellos cósmicos laten alrededor de sus rostros. La magia debe sentirse profunda y completamente integrada dentro de una fotografía realista.$t35c$,
  lighting_color = $t35d$Iluminación cósmica con azules profundos, púrpuras intensos y acentos dorados y plateados. Atmósfera mágica, íntima y universal.$t35d$,
  poem_template = $t35e$Mirarte a los ojos es ver el universo,
{NOMBRE_DESTINATARIO}, en tu mirada me sumerso.
Tus ojos guardan galaxias infinitas,
Donde cada destello son visitas.
No necesito telescopios ni estrellas lejanas,
Solo tu mirada y nuestras ganas.
Eres mi universo completo y real,
Mi {APODO_DESTINATARIO}, mi amor, mi astral.$t35e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_15_Mirarte_a_los_Ojos_es_Como_Ver_el_Universo_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t36a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite pasión elegante, celebración y la intensidad de un amor que enciende el cielo.

una pareja se abraza íntimamente en una terraza nocturna (rostros fotorrealistas basados en fotografías reales), frente contra frente, en una pose sensual y elegante, sin contenido explícito, transmitiendo amor y celebración.$t36a$,
  background_details = $t36b$Un cielo nocturno profundo estalla en fuegos artificiales de colores que iluminan la ciudad distante y se reflejan suavemente sobre la pareja.$t36b$,
  magic_effects = $t36c$Los fuegos artificiales despliegan cascadas de chispas doradas, rojas y púrpuras, y algunas luces flotan lentamente alrededor de la pareja. La magia debe sentirse celebratoria y completamente integrada dentro de una fotografía realista.$t36c$,
  lighting_color = $t36d$Iluminación nocturna vibrante con rojos intensos, dorados brillantes y púrpuras profundos. Atmósfera festiva, apasionada y romántica.$t36d$,
  poem_template = $t36e$Hacer el amor contigo es como fuegos artificiales,
{NOMBRE_DESTINATARIO}, explosiones de pasión sin iguales.
Tu piel contra la mía enciende el cielo,
Donde cada caricia es mi anhelo.
No necesito celebraciones ni fiestas grandes,
Solo tus besos y nuestros instantes.
Eres mi fuego artificial perfecto,
Mi {APODO_DESTINATARIO}, mi amor, mi afecto.$t36e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_16_Hacer_el_Amor_Contigo_es_Como_Fuegos_Artificiales_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t37a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite ternura, gratitud y la sensación de ser cuidado por un ángel.

Ligeramente descentrada, una mujer descansa en cama arropada con expresión de alivio y gratitud (rostros fotorrealistas basados en fotografías reales), mientras él la cuida con ternura acercándole una taza humeante; sobre la espalda de él se despliegan alas de ángel brillantes y suaves, coronadas por un halo dorado sutil.$t37a$,
  background_details = $t37b$Un dormitorio cálido y sereno con detalles hogareños suaves, envuelto en una claridad reconfortante.$t37b$,
  magic_effects = $t37c$Las alas y el halo emiten un resplandor dorado delicado, con plumas luminosas y partículas de luz blanca flotando alrededor del gesto de cuidado. La magia debe sentirse angelical y completamente integrada dentro de una fotografía realista.$t37c$,
  lighting_color = $t37d$Iluminación suave y reconfortante con blancos luminosos, dorados delicados y tonos pastel. Atmósfera angelical, cálida y protectora.$t37d$,
  poem_template = $t37e$Cuidarme cuando estoy enferma es tener un ángel,
{NOMBRE_DESTINATARIO}, tu amor es mi mejor ángel.
Tus mimos y cuidados me sanan,
Donde cada gesto son campanas.
No necesito doctores ni hospitales,
Solo tu amor y cuidados especiales.
Eres mi enfermero del cielo,
Mi {APODO_DESTINATARIO}, mi amor, mi consuelo.$t37e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_17_Cuidarme_Cuando_Estoy_Enfermo_es_Como_Tener_un_Ángel_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t38a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite asombro, alegría y la magia de los detalles inesperados.

Ligeramente descentrada, una mujer recibe una sorpresa con las manos en el rostro y una sonrisa de asombro genuino (rostros fotorrealistas basados en fotografías reales), mientras él se la entrega con una sonrisa cómplice y enamorada.$t38a$,
  background_details = $t38b$Un espacio cálido y festivo del hogar, decorado con luces suaves que acompañan el momento de celebración.$t38b$,
  magic_effects = $t38c$Confeti mágico brillante estalla en el aire junto a regalos flotantes envueltos con lazos luminosos, estrellas y destellos que giran alrededor de la pareja. La magia debe sentirse festiva y completamente integrada dentro de una fotografía realista.$t38c$,
  lighting_color = $t38d$Iluminación vibrante y festiva con dorados, rosados y acentos de colores vivos. Atmósfera de celebración, sorpresa y alegría.$t38d$,
  poem_template = $t38e$Tus sorpresas son magia pura y real,
{NOMBRE_DESTINATARIO}, cada detalle es especial.
Tus gestos inesperados me hacen volar,
Donde cada sorpresa es un lugar.
No necesito grandes regalos ni lujos,
Solo tus detalles y dibujos.
Eres mi mago de sorpresas perfectas,
Mi {APODO_DESTINATARIO}, mi amor, mis fiestas.$t38e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_18_Tus_Sorpresas_Son_Como_Magia_Pura_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t39a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite inspiración, libertad y el poder de un apoyo incondicional que da alas.

una mujer despliega unas alas brillantes y majestuosas (rostros fotorrealistas basados en fotografías reales), con expresión de determinación y libertad, mientras él, detrás, la sostiene con las manos en sus hombros y una mirada de orgullo y fe absoluta.$t39a$,
  background_details = $t39b$Un cielo abierto y luminoso con nubes suaves se extiende alrededor, como si el mundo entero fuera pista de despegue para sus sueños.$t39b$,
  magic_effects = $t39c$Las alas emiten un resplandor blanco dorado con plumas de luz que se desprenden suavemente, y corrientes de aire luminosas ascienden alrededor. La magia debe sentirse inspiradora y completamente integrada dentro de una fotografía realista.$t39c$,
  lighting_color = $t39d$Iluminación amplia y luminosa con azules celestes, blancos radiantes y dorados inspiradores. Atmósfera de vuelo, libertad y empoderamiento.$t39d$,
  poem_template = $t39e$Apoyarme en mis sueños es darme alas,
{NOMBRE_DESTINATARIO}, contigo todo se escala.
Tu fe en mí me hace volar alto,
Donde cada sueño es un salto.
No necesito vientos ni corrientes,
Solo tu apoyo y palabras presentes.
Eres mi impulso para volar,
Mi {APODO_DESTINATARIO}, mi amor, mi despertar.$t39e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_19_Apoyarme_en_Mis_Sueños_es_Como_Tener_Alas_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t40a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite renovación, honestidad y la emoción de una segunda oportunidad nacida del perdón.

una pareja se abraza con emoción contenida (rostros fotorrealistas basados en fotografías reales): los ojos húmedos, el alivio y la ternura del reencuentro se leen en sus rostros.$t40a$,
  background_details = $t40b$El entorno cuenta la transformación: de un lado persisten tonos grises que se disuelven, y alrededor de la pareja el espacio florece en color y luz renovada.$t40b$,
  magic_effects = $t40c$Cadenas oscuras se rompen y se desvanecen en partículas mientras flores brillantes crecen alrededor de la pareja, iluminando la escena con vida nueva. La magia debe sentirse transformadora y completamente integrada dentro de una fotografía realista.$t40c$,
  lighting_color = $t40d$Iluminación en transición del gris a colores vibrantes: verdes frescos, rosados y dorados cálidos. Atmósfera de renovación, esperanza y reconciliación.$t40d$,
  poem_template = $t40e$Perdonarme es darme una segunda oportunidad,
{NOMBRE_DESTINATARIO}, tu amor tiene capacidad.
Tu perdón me libera y me sana,
Donde cada abrazo es ventana.
No necesito jueces ni sentencias,
Solo tu perdón y paciencias.
Eres mi segunda oportunidad real,
Mi {APODO_DESTINATARIO}, mi amor, mi final.$t40e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas/PLANTILLA_20_Perdonarme_es_Como_Recibir_una_Segunda_Oportunidad_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t41a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un profundo sentimiento de amor, hogar, paz y renovación, representando cómo una persona puede convertirse en la luz que ilumina toda una vida.

En el centro de la composición aparece una pareja dentro de una acogedora sala de estar. {NOMBRE_DESTINATARIO} representa metafóricamente el sol. Su cuerpo irradia una luz dorada suave y natural que ilumina toda la habitación sin perder realismo. Su expresión transmite amor, serenidad y felicidad. Su pareja la observa con una expresión de profunda admiración, paz y gratitud. Ambos mantienen contacto visual y una postura relajada que comunica complicidad, afecto y estabilidad emocional. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t41a$,
  background_details = $t41b$La habitación posee una decoración cálida y elegante con muebles de madera, textiles suaves y plantas naturales distribuidas alrededor del ambiente. Grandes ventanas permiten el ingreso de abundantes rayos de sol dorados que llenan completamente el espacio de luz cálida. Toda la habitación refleja armonía, comodidad y la sensación de sentirse verdaderamente en casa.$t41b$,
  magic_effects = $t41c$La luz que emana de {NOMBRE_DESTINATARIO} se integra perfectamente con la luz natural del sol. Pequeñas partículas luminosas flotan delicadamente en el aire. Las plantas cercanas reflejan suavemente esa energía luminosa, mostrando un brillo cálido que simboliza vida, esperanza y crecimiento. La magia debe sentirse sutil, elegante y completamente integrada dentro de una fotografía realista.$t41c$,
  lighting_color = $t41d$Iluminación cinematográfica cálida, envolvente y altamente natural. La escena está dominada por rayos de sol intensos que ingresan desde las ventanas e iluminan toda la habitación. Predominan tonos: dorado intenso, amarillo cálido, crema luminoso, reflejos ámbar ligeros, tonos miel. La iluminación genera una atmósfera reconfortante, romántica y llena de energía positiva.$t41d$,
  poem_template = $t41e$100 días amándote como si fueras el sol, {NOMBRE_DESTINATARIO}, iluminas mi vida desde el rol.
Tu presencia calienta cada rincón, Donde la oscuridad ya no tiene razón.
Cada día contigo es un amanecer, Donde tu luz me hace renacer.
Eres mi sol personal y real, Mi amor, mi amor, mi luz vital.$t41e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_1_Amarte_es_Como_Tener_el_Sol_en_Casa_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t42a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un sentimiento onírico, mágico y profundamente romántico, como si el amor entre ambos los hubiera transportado a un sueño compartido.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) flotan suavemente abrazados en un espacio onírico e ingrávido, rodeados de nubes suaves y luminosas. Ambos mantienen los ojos cerrados con una expresión de paz y felicidad plena, como si soñaran juntos el mismo sueño. Sus cuerpos parecen ingrávidos, sostenidos delicadamente por la magia del momento, en una postura tierna y cercana que transmite confianza y entrega mutua. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t42a$,
  background_details = $t42b$Alrededor de la pareja flotan estrellas y lunas brillantes de distintos tamaños, en un cielo nocturno onírico y surrealista. Los colores del ambiente se mezclan suavemente como acuarela en el aire, creando un espacio sin límites definidos, propio de un sueño lúcido.$t42b$,
  magic_effects = $t42c$Burbujas transparentes y brillantes flotan alrededor de la pareja, cada una conteniendo pequeñas siluetas luminosas de recuerdos vividos juntos. Partículas de polvo estelar se desplazan lentamente por el aire. La magia debe sentirse serena, delicada y completamente integrada dentro de una fotografía realista.$t42c$,
  lighting_color = $t42d$Iluminación suave y difusa, similar a la luz de luna llena filtrada entre nubes. Predominan tonos pasteles: azul cielo, rosa pálido, lila suave y destellos plateados. La atmósfera es etérea, tranquila y profundamente romántica.$t42d$,
  poem_template = $t42e$100 días viviendo este sueño contigo,
{NOMBRE_DESTINATARIO}, cada momento es mi abrigo.
Tu amor es tan perfecto que parece irreal,
Donde cada día es algo especial.
No quiero despertar de esta fantasía,
Donde tú eres mi mejor melodía.
Eres mi sueño hecho realidad,
Mi {APODO_DESTINATARIO}, mi amor, mi eternidad.$t42e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_2_Estar_Contigo_es_Como_Vivir_en_un_Sueño_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t43a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, complicidad y la sensación de que la risa de una persona puede ser la melodía favorita de quien la ama.

En el centro de la composición aparece una pareja dentro de un ambiente cálido y luminoso. {NOMBRE_DESTINATARIO} ríe a carcajadas con expresión genuina y radiante; de su boca surgen delicadamente notas musicales brillantes y coloridas que se elevan en el aire. Diego la observa a su lado con una sonrisa enamorada, disfrutando plenamente el sonido de su risa. Ambos comparten una postura cercana y relajada que transmite complicidad y felicidad compartida. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t43a$,
  background_details = $t43b$Alrededor de la pareja flotan instrumentos musicales luminosos (guitarra, piano, violín) de forma etérea y decorativa, junto con ondas de sonido visibles en colores vibrantes que se expanden suavemente por el ambiente. El entorno evoca un escenario de concierto íntimo y mágico, cálido y acogedor.$t43b$,
  magic_effects = $t43c$Las notas musicales que emergen de la risa de {NOMBRE_DESTINATARIO} brillan con tonos dorados y pastel, flotando en espiral hacia el techo. Pequeños destellos de luz laten al ritmo de la música invisible. La magia debe sentirse alegre, luminosa y perfectamente integrada dentro de una fotografía realista.$t43c$,
  lighting_color = $t43d$Iluminación cálida y vibrante, tipo escenario de concierto íntimo. Predominan tonos alegres y luminosos: amarillo brillante, naranja suave, rosa vibrante y toques dorados. La atmósfera transmite pura felicidad y energía positiva.$t43d$,
  poem_template = $t43e$100 días escuchando tu risa perfecta,
{NOMBRE_DESTINATARIO}, es la melodía más directa.
Tu carcajada alegra mi existir,
Donde cada sonido me hace vivir.
No necesito canciones ni sinfonías,
Solo tu risa y sus alegrías.
Eres mi música favorita y real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t43e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_3_Tu_Risa_es_Como_Música_para_Mis_Oídos_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t44a$Una única fotografía continua que fluye de lado a lado del lienzo. A diferencia de las plantillas anteriores, esta escena abandona el plano general y apuesta por un primer plano extremo (macro) que convierte la mirada en el centro absoluto de la composición, transmitiendo que el verdadero paraíso no se encuentra en un lugar lejano, sino en los ojos de la persona amada.

La imagen es un macro fotográfico extremo del rostro de {NOMBRE_DESTINATARIO}, encuadrado desde la frente hasta los labios, con foco absoluto en sus ojos. Dentro de sus pupilas, como si fueran ventanas dimensionales, se revela un paraíso tropical en miniatura: una playa de arena blanca, agua turquesa cristalina y palmeras inclinadas recortadas contra un atardecer dorado. En el borde inferior del encuadre, apenas visible y desenfocada, aparece la mano de Diego rozando suavemente la mejilla de {NOMBRE_DESTINATARIO}, ancla emocional de la escena que confirma que este instante de contemplación es compartido. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t44a$,
  background_details = $t44b$Fuera del área de los ojos, el resto del encuadre se difumina intencionalmente en un bokeh oscuro y neutro, casi nocturno, de manera que no compita visualmente con el "portal" luminoso de la mirada. Esta oscuridad envolvente resalta aún más el contraste con los colores vívidos del paraíso reflejado.$t44b$,
  magic_effects = $t44c$En el borde del iris se percibe una leve distorsión óptica tipo lente, como si el paraíso realmente existiera al otro lado de un cristal curvo. Diminutas partículas de luz dorada escapan sutilmente del contorno de la pupila y se disuelven en el aire oscuro que rodea el rostro, sugiriendo que ese mundo interior se filtra hacia la realidad. Dentro del reflejo del paraíso, una silueta lejana y borrosa —apenas insinuada entre las palmeras— recuerda la figura de Diego caminando por la orilla, integrando a la pareja incluso dentro del "mundo" contenido en la mirada.$t44c$,
  lighting_color = $t44d$Iluminación dividida: el rostro se mantiene en penumbra suave y cálida, mientras que el interior de los ojos irradia luz propia. Predominan tonos turquesa intenso, dorado de atardecer, verde palmera y destellos ámbar, en fuerte contraste con la oscuridad neutra del entorno.$t44d$,
  poem_template = $t44e$100 días mirando tus ojos de paraíso,
{NOMBRE_DESTINATARIO}, en tu mirada encuentro mi piso.
Tus ojos guardan mundos de belleza,
Donde cada destello es certeza.
No necesito viajes ni destinos lejanos,
Solo tus ojos y nuestros planos.
Eres mi paraíso personal,
Mi {APODO_DESTINATARIO}, mi amor, mi ideal.$t44e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_4_Tus_Ojos_Son_Como_Ventanas_al_Paraíso_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t45a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: un plano medio-cerrado de perfil, íntimo y cálido, ambientado en un rincón rústico tipo cabaña de apicultor al atardecer, muy distinto del salón, el sueño flotante, el escenario musical y el macro de ojos ya usados. La escena transmite calma absoluta, como si la voz de una persona tuviera el poder de calmar cualquier tormenta interior.

De perfil, {NOMBRE_DESTINATARIO} habla suavemente con los labios entreabiertos; de ellos fluye una cinta espesa y luminosa de miel dorada líquida que se suspende en el aire en espirales lentas, como si el tiempo se hubiera ralentizado. Diego está sentado muy cerca, de frente a ella, con los ojos cerrados y la cabeza ligeramente inclinada hacia adelante, como si se dejara envolver físicamente por el sonido de su voz. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t45a$,
  background_details = $t45b$El entorno es una acogedora cabaña de madera oscura con vigas a la vista, ramilletes de flores secas colgando del techo y un estante con tarros de miel artesanal iluminados por la luz del atardecer que entra por una ventana lateral. Fragmentos de panal translúcido flotan suspendidos en el aire como pequeñas esculturas de luz ámbar.$t45b$,
  magic_effects = $t45c$Dentro de la cinta de miel líquida que fluye de los labios de {NOMBRE_DESTINATARIO} se insinúan, por un instante, formas delicadas —una paloma, un corazón— antes de disolverse en un fino polvo dorado. Pequeñas abejas mágicas de luz bioluminiscente dorada orbitan lentamente alrededor de la cinta de miel sin nunca tocarla, dejando estelas luminosas breves a su paso. La magia debe sentirse artesanal, cálida y perfectamente integrada dentro de una fotografía realista.$t45c$,
  lighting_color = $t45d$Luz de atardecer entrando en ángulo bajo por la ventana lateral, cálida y dorada, con la cinta de miel como fuente de luz secundaria. Predominan tonos miel dorado, ámbar profundo, marrón madera y destellos crema. Atmósfera reconfortante, artesanal y serena.$t45d$,
  poem_template = $t45e$100 días escuchando tu voz de miel,
{NOMBRE_DESTINATARIO}, cada palabra es mi laurel.
Tu voz calma mis tormentas internas,
Donde cada sonido son luces eternas.
No necesito dulces ni manjares,
Solo tu voz y sus cantares.
Eres mi miel del alma real,
Mi {APODO_DESTINATARIO}, mi amor, mi manantial.$t45e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_5_Tu_Voz_es_Como_Miel_para_Mi_Alma_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t46a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en exteriores, al borde de un acantilado o mirador, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos y la cabaña de miel ya usados. La escena transmite protección absoluta frente a la adversidad, contrastando calma interior con caos exterior.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) se abrazan de pie, de frente a la cámara, con los ojos cerrados y las expresiones completamente serenas. Alrededor de ambos se forma una burbuja protectora esférica, transparente y brillante, con un tenue resplandor dorado en su interior. Dentro de la burbuja el aire está en calma, cálido y dorado; justo en el límite de la esfera se aprecia la frontera nítida entre ese refugio y el exterior. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t46a$,
  background_details = $t46b$Fuera de la burbuja se desata una tormenta intensa: lluvia oblicua, nubes grises y densas, ráfagas de viento que agitan la vegetación cercana al acantilado. El paisaje exterior está desaturado, en tonos grises y azulados fríos, mientras que el interior de la burbuja conserva colores cálidos y vívidos, creando un contraste dramático entre ambos mundos.$t46b$,
  magic_effects = $t46c$La superficie de la burbuja protectora tiene un leve brillo dorado tipo escudo mágico, con ondulaciones sutiles al ritmo del viento exterior, como si repeliera activamente la tormenta sin romperse. Gotas de lluvia que impactan la burbuja se deslizan y se transforman en pequeñas chispas doradas antes de caer. La magia debe sentirse sólida, protectora y perfectamente integrada dentro de una fotografía realista.$t46c$,
  lighting_color = $t46d$Contraste lumínico marcado: luz cálida y dorada dentro de la burbuja frente a luz fría, grisácea y tormentosa en el exterior. Predominan tonos dorado suave y ámbar cálido dentro; gris plomo, azul tormenta y blanco lluvia afuera.$t46d$,
  poem_template = $t46e$100 días refugiándome en tus brazos,
{NOMBRE_DESTINATARIO}, eres mis mejores lazos.
Tu abrazo me protege del mundo exterior,
Donde cada apretón es mi mejor.
No necesito muros ni fortalezas,
Solo tus brazos y sus certezas.
Eres mi refugio personal y real,
Mi {APODO_DESTINATARIO}, mi amor, mi hogar ideal.$t46e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_6_Tu_Abrazo_es_Como_Mi_Refugio_Seguro_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t47a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio en una terraza o balcón justo después de que amainó la lluvia, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel y la burbuja en la tormenta ya usados. La escena transmite esperanza renovada, ese instante exacto en que el cielo se abre después de la tormenta.

En el centro de la composición, {NOMBRE_DESTINATARIO} está de pie en el balcón, recién girándose hacia la cámara con una sonrisa amplia y genuina que ilumina su rostro. Diego está a su lado, apoyado en la baranda, mirándola a ella en lugar de al paisaje, con una expresión de ternura absoluta. Justo detrás de ambos, un arcoíris nítido y luminoso cruza el cielo despejándose entre las últimas nubes grises de la tormenta. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t47a$,
  background_details = $t47b$El piso de madera del balcón está mojado y refleja tenuemente los colores del arcoíris como un espejo difuso. Gotas de lluvia residuales caen lentamente desde el borde del techo. A lo lejos, la ciudad o el paisaje se ve parcialmente iluminado por rayos de sol que atraviesan las nubes rotas.$t47b$,
  magic_effects = $t47c$Cada gota de lluvia, al tocar el suelo del balcón, se transforma instantáneamente en una pequeña chispa de luz de color (siguiendo la paleta del arcoíris) que se eleva brevemente antes de desvanecerse, como si la tristeza se convirtiera en luz al contacto con la sonrisa de {NOMBRE_DESTINATARIO}. El arcoíris tiene un brillo ligeramente sobrenatural, más intenso que uno real, pero manteniendo el fotorrealismo.$t47c$,
  lighting_color = $t47d$Luz de sol filtrada y difusa entre nubes rotas, con rayos visibles atravesando el ambiente húmedo. Predominan los siete colores del arcoíris (rojo, naranja, amarillo, verde, azul, índigo, violeta) contra un cielo que transiciona de gris tormenta a celeste despejado. Atmósfera fresca, luminosa y esperanzadora.$t47d$,
  poem_template = $t47e$100 días viendo tu sonrisa brillar,
{NOMBRE_DESTINATARIO}, como arcoíris sin cesar.
Tu sonrisa ilumina mis días grises,
Donde cada gesto son matices.
No necesito promesas ni señales,
Solo tu sonrisa y sus ideales.
Eres mi arcoíris después de llorar,
Mi {APODO_DESTINATARIO}, mi amor, mi despertar.$t47e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_7_Tu_Sonrisa_es_Como_el_Arcoíris_Después_de_la_Lluvia_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t48a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano nocturno en una azotea con vista al skyline de una ciudad, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta y el balcón del arcoíris ya usados. La escena transmite un romance atemporal: la pareja quieta y serena en medio de un cielo lleno de movimiento y luz.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) se besan de pie en la azotea, con el skyline nocturno de la ciudad iluminado detrás de ellos. Fuegos artificiales reales explotan en el cielo en distintos puntos, en tonos dorados y cálidos, bañando suavemente la piel de ambos con su resplandor. Su quietud contrasta con el movimiento constante de luces alrededor. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t48a$,
  background_details = $t48b$Una lluvia de estrellas fugaces cruza el cielo detrás de ellos, sus estelas curvándose sutilmente hasta insinuar, sin ser literal ni geométrica, la forma de un corazón en el firmamento. Las luces de los edificios de la ciudad titilan suavemente en la distancia, difuminadas por la altura.$t48b$,
  magic_effects = $t48c$Alrededor de la pareja ascienden lentamente farolillos de papel dorados, con una luz cálida propia en su interior; al mirar de cerca, dentro de cada uno se insinúa tenuemente, como una ventana translúcida, la silueta dorada de ese mismo beso, sin literalidad de "repetición en bucle", solo una sugerencia suave y elegante. La magia se siente cálida, festiva y perfectamente integrada dentro de una fotografía realista.$t48c$,
  lighting_color = $t48d$Iluminación nocturna cálida, con los fuegos artificiales y los farolillos como fuentes principales de luz dorada y ámbar, contra un cielo azul oscuro profundo y el brillo lejano del skyline. Predominan tonos dorado brillante, ámbar cálido, azul noche profundo y toques rosados de los fuegos artificiales.$t48d$,
  poem_template = $t48e$100 días desde aquel primer beso mágico,
{NOMBRE_DESTINATARIO}, momento tan categórico.
Tus labios tocaron los míos con pasión,
Donde el tiempo paró sin razón.
Ese beso cambió mi destino entero,
Donde encontré mi amor verdadero.
Eres mi primer beso eterno,
Mi {APODO_DESTINATARIO}, mi amor, mi invierno y verano.$t48e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_8_Nuestro_Primer_Beso_Fue_Magia_Pura_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t49a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general abierto en un campo de trigo dorado al atardecer, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris y la azotea del beso ya usados. La escena transmite la solemnidad y el peso emocional de un momento que cambió todo, como si el mundo se hubiera detenido a escuchar esas dos palabras.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) están de pie, frente a frente, tomados de las manos en medio de un campo de trigo dorado que se mece suavemente con el viento. Se miran a los ojos con una expresión de emoción contenida, como en el instante exacto en que una de esas palabras acaba de ser pronunciada. Entre ambos, suspendidas en el aire a la altura del pecho, flotan las palabras "TE AMO" en letras doradas caligráficas y luminosas, como si el aliento mismo se hubiera convertido en luz. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t49a$,
  background_details = $t49b$El campo de trigo se extiende hasta el horizonte, dorado y en movimiento constante por el viento, bajo un cielo de atardecer en tonos naranja profundo y rosado. A lo lejos, el sol se oculta justo detrás de la pareja, generando un contraluz cálido que perfila sus siluetas.$t49b$,
  magic_effects = $t49c$Pequeños corazones de luz dorada, del tamaño de luciérnagas, flotan y parpadean suavemente alrededor de las palabras suspendidas, como si emanaran de ellas. Las letras doradas de "TE AMO" tienen un brillo interno pulsante, suave, sin sentirse artificial. Diminutas partículas de polvo dorado se desprenden lentamente de las letras y se mezclan con las espigas de trigo cercanas.$t49c$,
  lighting_color = $t49d$Luz de atardecer intensa y cálida a contraluz, con destellos dorados atravesando el campo de trigo. Predominan tonos dorado profundo, naranja atardecer, ámbar y toques rosados suaves en el cielo.$t49d$,
  poem_template = $t49e$100 días desde que dijiste "te amo",
{NOMBRE_DESTINATARIO}, palabras que siempre reclamo.
Esas dos palabras cambiaron mi vida,
Donde cada letra fue bienvenida.
Ese momento quedó grabado en mi alma,
Donde encontré mi eterna calma.
Eres mi "te amo" más sincero,
Mi {APODO_DESTINATARIO}, mi amor, mi compañera.$t49e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_9_Cuando_Dijiste_Te_Amo_Por_Primera_Vez_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t50a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio íntimo dentro de un fuerte de mantas construido en la sala, de noche, muy distinto del salón iluminado por el sol, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso y el campo de trigo ya usados. La escena transmite comodidad absoluta y complicidad silenciosa, el ritual favorito de la pareja.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) están acurrucados dentro de un fuerte de mantas suaves y esponjosas, envueltos juntos en una manta grande y afelpada, mirando hacia el frente con expresiones relajadas y sonrientes. Entre ellos y frente a la cámara, un bol de palomitas de maíz brillantes flota suavemente en el aire. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t50a$,
  background_details = $t50b$Las "paredes" del fuerte están hechas de mantas colgantes suaves sostenidas por cojines, iluminadas por delicadas luces tipo guirnalda cálida entrelazadas en la estructura. Frente a la pareja, suspendidas en el aire como si fueran proyecciones holográficas, flotan pequeñas escenas translúcidas y luminosas de películas clásicas románticas, brillando con luz propia como pantallas mágicas en miniatura.$t50b$,
  magic_effects = $t50c$Las palomitas que flotan alrededor del bol brillan tenuemente como si estuvieran hechas de luz dorada suave. Las proyecciones holográficas de películas parpadean con un resplandor azulado y cálido alternado, como fotogramas vivos, sin llegar a ser nítidas ni legibles, solo sugerentes. La magia se siente hogareña, suave y perfectamente integrada dentro de una fotografía realista.$t50c$,
  lighting_color = $t50d$Iluminación nocturna íntima, dominada por la luz cálida de las guirnaldas y el resplandor azulado de las proyecciones holográficas. Predominan tonos ámbar suave, dorado tenue, azul proyector y blanco cálido de las luces.$t50d$,
  poem_template = $t50e$100 días de películas a tu lado,
{NOMBRE_DESTINATARIO}, mi momento más amado.
Tu compañía hace cada escena especial,
Donde cada abrazo es celestial.
No importa la película que veamos,
Solo que juntos estemos y seamos.
Eres mi película favorita real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t50e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_10_Nuestras_Nochoes_de_Películas_Son_Mi_Momento_Favorito_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t51a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano bajo tomado desde los pies de la cama mirando hacia las almohadas, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo y el fuerte de mantas ya usados. La escena transmite la sensación de que cada mañana junto a la persona amada es, literalmente, despertar en el paraíso.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) despiertan juntos recostados en la cama, con las sábanas blancas suaves alrededor, mirándose con sonrisas somnolientas y tiernas al abrir los ojos. La luz dorada del amanecer entra en rayos diagonales a través de cortinas de gasa translúcida, bañando la escena de calidez. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t51a$,
  background_details = $t51b$Alrededor del marco de la cama y sobre las mesas de noche, flores mágicas crecen y florecen en tiempo acelerado, como si el amanecer las hiciera brotar en ese instante: enredaderas floridas trepan suavemente por los postes de la cama, pétalos abriéndose delicadamente. En el alféizar de la ventana, pequeños pájaros de plumaje brillante y bioluminiscente cantan, con diminutas espirales de luz dorada elevándose de sus picos al ritmo del canto.$t51b$,
  magic_effects = $t51c$Motas de polen dorado y luminoso flotan suavemente en el aire iluminado por los rayos de sol, como polvo de hadas natural. Las flores que florecen alrededor de la cama dejan un rastro tenue de brillo dorado en el aire al abrirse. La magia se siente fresca, viva y perfectamente integrada dentro de una fotografía realista.$t51c$,
  lighting_color = $t51d$Luz de amanecer dorada y suave entrando en ángulo bajo por la ventana, con motas de polvo doradas suspendidas en los rayos de luz. Predominan tonos dorado pastel, rosa amanecer suave, blanco cálido de las sábanas y verde tierno de las flores nuevas.$t51d$,
  poem_template = $t51e$100 días despertando junto a ti,
{NOMBRE_DESTINATARIO}, cada mañana es para mí.
Tu rostro es lo primero que veo al despertar,
Donde cada día vuelve a empezar.
No necesito alarmas ni despertadores,
Solo tu presencia y sus colores.
Eres mi amanecer perfecto y real,
Mi {APODO_DESTINATARIO}, mi amor, mi luz matinal.$t51e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_11_Despertar_Contigo_es_Como_Comenzar_en_el_Paraíso_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t52a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en la cima de una montaña al atardecer, con vista panorámica abierta, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas y la habitación del amanecer ya usados. La escena transmite espíritu explorador y la certeza de que cada aventura vivida juntos vale la pena.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) están de pie en la cima de una montaña, con mochilas de viaje ligeras, sosteniendo juntos un mapa antiguo que brilla con líneas doradas luminosas. Entre ambos flota una brújula dorada suspendida en el aire, girando lentamente con su aguja iluminada, como si señalara el siguiente destino. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t52a$,
  background_details = $t52b$Alrededor de la pareja, flotando a distintas alturas como esferas de recuerdo translúcidas, aparecen viñetas circulares de aventuras pasadas: una playa de arena blanca y mar turquesa, una ciudad iluminada de noche, un bosque frondoso al amanecer. Cada esfera tiene un halo dorado suave en su borde. Debajo de ellos, la vista panorámica de valles y cordilleras se extiende hasta el horizonte, bañada por la luz del atardecer.$t52b$,
  magic_effects = $t52c$Del mapa que sostienen juntos emergen delicadas líneas doradas luminosas que se elevan y conectan brevemente con cada una de las esferas de recuerdo flotantes, como constelaciones trazando su historia compartida. La brújula desprende un tenue resplandor dorado pulsante. La magia se siente épica, cálida y perfectamente integrada dentro de una fotografía realista.$t52c$,
  lighting_color = $t52d$Luz de atardecer dorada e intensa, con la silueta de las montañas recortada contra el cielo. Predominan tonos dorado vibrante, naranja aventurero, azul montaña profundo y toques turquesa de las esferas de playa.$t52d$,
  poem_template = $t52e$100 días de aventuras a tu lado,
{NOMBRE_DESTINATARIO}, cada viaje es sagrado.
Contigo cada lugar se vuelve especial,
Donde cada paso es monumental.
No importa el destino que elijamos,
Solo que juntos siempre vayamos.
Eres mi compañera de aventuras ideal,
Mi {APODO_DESTINATARIO}, mi amor, mi mapa astral.$t52e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_12_Nuestras_Aventuras_Juntos_Son_Inolvidables_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t53a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general dinámico de un giro de baile en pleno movimiento, sobre un "salón" de nubes nocturnas, muy distinto del salón, el sueño flotante (estático y con ojos cerrados), el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer y la cima de la montaña ya usados. A diferencia del sueño flotante de la Plantilla 2 (pareja abrazada, quieta, ojos cerrados), aquí el movimiento y la energía del baile son el centro absoluto de la escena.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) bailan en pleno giro, capturados en pleno movimiento sobre una superficie de nubes suaves y luminosas que actúa como pista de baile, flotando muy por encima de la tierra bajo un cielo nocturno estrellado. Sus ropas y cabello tienen movimiento visible, congelados en el instante justo del giro. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t53a$,
  background_details = $t53b$Sobre ellos, las estrellas forman una especie de bóveda celeste densa, como un candelabro natural. La luna llena brilla detrás de la pareja como un reflector natural, iluminándolos desde atrás con un halo plateado.$t53b$,
  magic_effects = $t53c$Ondas doradas de música visible se propagan en círculos concéntricos desde los pies de la pareja hacia afuera, como si el propio cielo tocara la melodía de su baile. Pequeñas partículas brillantes se desprenden de las nubes bajo sus pies cada vez que giran, dejando una estela luminosa breve. La magia se siente ligera, alegre y perfectamente integrada dentro de una fotografía realista.$t53c$,
  lighting_color = $t53d$Iluminación nocturna celestial, con contraluz plateado de la luna llena y el brillo dorado cálido de las ondas de sonido. Predominan tonos blanco nube, azul noche profundo, plateado lunar y dorado suave.$t53d$,
  poem_template = $t53e$100 días bailando entre tus brazos,
{NOMBRE_DESTINATARIO}, flotando en tus abrazos.
Tus pasos me llevan a las nubes,
Donde cada giro son querubes.
No necesito pistas ni salones,
Solo tus brazos y sus canciones.
Eres mi pareja de baile perfecta,
Mi {APODO_DESTINATARIO}, mi amor, mi danza directa.$t53e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_13_Bailar_Contigo_es_Como_Flotar_en_las_Nubes_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t54a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio lateral de la pareja sentada frente a frente en la cama de madrugada, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña y el baile en las nubes ya usados. A diferencia de la habitación dorada y matutina de la Plantilla 11, esta escena ocurre de madrugada, en tonos azulados y plateados de luna, transmitiendo introspección y conexión profunda en vez de energía.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) están sentados con las piernas cruzadas, frente a frente sobre la cama, envueltos juntos en una manta compartida, conversando con expresiones íntimas y atentas, muy cerca el uno del otro. La luz plateada de una luna llena entra por la ventana detrás de ellos. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t54a$,
  background_details = $t54b$Entre ambos, a la altura del pecho, flotan pequeñas nubes luminosas de pensamiento, suaves y translúcidas, en tonos plateados y dorados tenues, que se forman y disuelven lentamente mientras hablan, sin llegar a formar letras ni palabras legibles, solo la sugerencia visual de ideas compartidas. La habitación está en penumbra, iluminada principalmente por la luna y el tenue resplandor de las nubes de pensamiento.$t54b$,
  magic_effects = $t54c$Cada nube de pensamiento tiene un brillo interior pulsante suave, como una respiración lenta, y ocasionalmente dos nubes de cada uno se entrelazan brevemente antes de disolverse, simbolizando la conexión de sus ideas. Diminutas motas de luz plateada flotan en el aire alrededor de la cama, como polvo de luna. La magia se siente serena, íntima y perfectamente integrada dentro de una fotografía realista.$t54c$,
  lighting_color = $t54d$Iluminación nocturna fría y suave, dominada por la luz plateada de la luna llena a través de la ventana, contrastada con el resplandor dorado tenue de las nubes de pensamiento. Predominan tonos azul noche profundo, plateado lunar y dorado suave apagado.$t54d$,
  poem_template = $t54e$100 días de charlas hasta el amanecer,
{NOMBRE_DESTINATARIO}, contigo puedo ser.
Nuestras conversaciones tocan mi alma,
Donde cada palabra trae calma.
No necesito terapias ni consejos,
Solo tus palabras y sus reflejos.
Eres mi confidente perfecta y real,
Mi {APODO_DESTINATARIO}, mi amor, mi conexión mental.$t54e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_14_Nuestras_Conversaciones_Profundas_de_Madrugada_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t55a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en un salón elegante tipo palacio íntimo, con un pequeño pedestal dorado circular, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes y la conversación de madrugada ya usados. La escena transmite un momento de "coronación emocional", donde el amor de la pareja hace sentir a alguien como la persona más valiosa del mundo.

En el centro de la composición, {NOMBRE_DESTINATARIO} está de pie sobre un sutil pedestal dorado circular, con los brazos ligeramente abiertos y una expresión de asombro sereno, mientras un resplandor dorado cálido emana de su piel y su vestimenta. Sobre su cabeza se forma delicadamente una corona de luz dorada, hecha de finos filamentos luminosos entrelazados, no una corona física de metal. Diego está de pie justo frente al pedestal, mirándola hacia arriba con una expresión de admiración profunda y genuina, con una mano apoyada suavemente sobre el borde del pedestal. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t55a$,
  background_details = $t55b$El salón tiene una estética íntima de palacio moderno: cortinas largas de terciopelo cayendo en pliegues suaves, un piso de mármol pulido que refleja tenuemente el resplandor dorado de {NOMBRE_DESTINATARIO}, e iluminación ambiental cálida similar a la de candelabros distribuidos fuera de foco en el fondo.$t55b$,
  magic_effects = $t55c$El resplandor dorado que emana de {NOMBRE_DESTINATARIO} se refleja suavemente en el mármol bajo sus pies, creando un halo circular de luz alrededor de la base del pedestal. Pequeñas partículas doradas ascienden lentamente desde sus hombros hacia la corona de luz, alimentándola. La magia se siente solemne, cálida y perfectamente integrada dentro de una fotografía realista.$t55c$,
  lighting_color = $t55d$Iluminación cálida tipo salón de gala, con el resplandor dorado de {NOMBRE_DESTINATARIO} como fuente de luz principal. Predominan tonos dorado intenso, ámbar cálido, blanco marfil del mármol y toques bronce en las sombras.$t55d$,
  poem_template = $t55e$100 días sintiéndome única contigo,
{NOMBRE_DESTINATARIO}, eres mi mejor abrigo.
Tu amor me hace sentir especial,
Donde cada gesto es monumental.
No necesito aplausos ni reconocimientos,
Solo tu amor y sus sentimientos.
Eres quien me hace brillar real,
Mi {APODO_DESTINATARIO}, mi amor, mi pedestal.$t55e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_15_Me_Haces_Sentir_la_Persona_Más_Especial_del_Mundo_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t56a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en un patio en ruinas de una antigua biblioteca, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada y el salón del pedestal ya usados. La escena transmite una revelación: el paso de no saber qué es el amor verdadero a descubrirlo por completo.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) se abrazan de pie en el centro de un patio en ruinas, rodeado de columnas de piedra agrietadas. Justo en el instante del abrazo, gruesas cadenas oscuras y oxidadas se rompen y caen alrededor de ellos, sus eslabones deshaciéndose en el aire. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t56a$,
  background_details = $t56b$La mitad exterior del patio, más alejada de la pareja, se ve en tonos grises apagados y desaturados, con piedra agrietada y vegetación marchita. A medida que el ojo se acerca al centro donde están abrazados, el entorno se transforma gradualmente: la piedra bajo sus pies florece con corazones dorados brillantes que crecen como flores entre las grietas, y el gris cede paso a tonos cálidos dorados.$t56b$,
  magic_effects = $t56c$Alrededor de la pareja flotan varios libros antiguos abiertos, suspendidos en el aire, con páginas que brillan suavemente y muestran líneas de texto doradas caligráficas e ilegibles, sugiriendo definiciones descubiertas del amor verdadero. Los eslabones de las cadenas rotas se disuelven en motas de luz dorada al tocar el suelo florecido. La magia se siente reveladora, cálida y perfectamente integrada dentro de una fotografía realista.$t56c$,
  lighting_color = $t56d$Iluminación que transiciona de fría y gris en los bordes del encuadre a cálida y dorada en el centro, donde está la pareja. Predominan tonos gris piedra apagado en los extremos, dorado brillante y verde dorado cálido cerca del centro.$t56d$,
  poem_template = $t56e$100 días aprendiendo a amar de verdad,
{NOMBRE_DESTINATARIO}, tú me enseñaste esta verdad.
Antes no sabía lo que era amar así,
Donde cada día es un sí.
Contigo descubrí el amor real,
Donde cada momento es especial.
Eres mi maestra del amor eterno,
Mi {APODO_DESTINATARIO}, mi amor, mi cuaderno.$t56e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_16_Contigo_Aprendí_Qué_es_el_Amor_Verdadero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t57a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano diagonal dinámico en una escalera exterior azotada por la tormenta, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja protectora de la Plantilla 6 (estática, ambos calmos dentro de una esfera), el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal y el patio en ruinas ya usados. A diferencia de la Plantilla 6, aquí hay movimiento y urgencia: un rescate en el instante mismo de la caída, no una calma ya establecida.

Nota importante de roles: en esta plantilla, quien cae y necesita apoyo es la persona que habla en el poema (la voz narradora), y quien sostiene y protege con las alas de luz es la persona nombrada en el poema (la destinataria). Es decir, Diego es quien resbala y cae, y {NOMBRE_DESTINATARIO} es quien lo sostiene con fuerza y despliega las alas protectoras.

En el centro de la composición, Diego resbala y cae en un tramo de escalera exterior mojada, con el cuerpo inclinado hacia atrás en pleno desequilibrio. {NOMBRE_DESTINATARIO} lo sujeta con fuerza del brazo y la cintura, deteniendo su caída en seco, con expresión de determinación protectora. En el instante del rescate, de la espalda de {NOMBRE_DESTINATARIO} se despliegan grandes alas de luz dorada, envolviendo a ambos como un capullo protector. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t57a$,
  background_details = $t57b$Alrededor de la pareja, la tormenta arrecia: lluvia intensa oblicua, rayos distantes iluminando el cielo, viento agitando ropa y cabello. Dentro del radio de las alas de luz, sin embargo, ni una gota de lluvia los toca; el aire ahí es cálido y dorado.$t57b$,
  magic_effects = $t57c$Las alas de luz dorada tienen una textura suave y plumosa, semitransparente en los bordes, brillando con más intensidad donde envuelven directamente a la pareja. Las gotas de lluvia que se acercan demasiado al borde de las alas se desvían suavemente, como repelidas por un campo invisible. La magia se siente urgente, protectora y perfectamente integrada dentro de una fotografía realista.$t57c$,
  lighting_color = $t57d$Contraste dramático: tormenta oscura en tonos grises azulados y plateados fríos alrededor, contra el resplandor cálido dorado de las alas de luz que envuelven a la pareja.$t57d$,
  poem_template = $t57e$100 días de apoyo incondicional,
{NOMBRE_DESTINATARIO}, eres mi pilar principal.
En mis peores momentos estás ahí,
Donde tu fuerza me hace seguir.
No necesito salvadores ni héroes,
Solo tu apoyo y sus deseos.
Eres mi sostén en la tormenta,
Mi {APODO_DESTINATARIO}, mi amor, mi cuenta.$t57e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_17_Me_Apoyas_en_Mis_Peores_Momentos_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t58a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general tumbados en el pasto de un jardín soleado, en medio de un picnic volcado por accidente, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas y el rescate en la escalera ya usados. La escena transmite felicidad pura y contagiosa, el tipo de risa que duele de tan genuina.

En el centro de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) están recostados de espaldas sobre el pasto, uno junto al otro, riendo a carcajadas sin control, con los ojos entrecerrados por la risa y una mano cada uno sobre su propio estómago. Junto a ellos, una canasta de picnic volcada con frutas rodando por el pasto sugiere el origen cómico del momento. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t58a$,
  background_details = $t58b$El jardín está bañado en luz de sol brillante y cálida, con pasto verde vibrante y flores silvestres de colores alrededor. De los ojos de ambos caen pequeñas lágrimas de risa que, al desprenderse, se transforman en diminutos diamantes brillantes que ruedan sobre el pasto.$t58b$,
  magic_effects = $t58c$Alrededor de la pareja flotan y estallan suavemente burbujas transparentes que contienen ondas visibles de sonido de sus carcajadas, cada una liberando al reventar un breve estallido de confeti de colores vibrantes. La magia se siente ligera, juguetona y perfectamente integrada dentro de una fotografía realista.$t58c$,
  lighting_color = $t58d$Luz de sol de mediodía brillante y alegre, cálida y uniforme. Predominan tonos verde césped vibrante, amarillo sol, y el brillo cristalino de las lágrimas de risa convertidas en diamantes, junto con el confeti multicolor de las burbujas.$t58d$,
  poem_template = $t58e$100 días de risas sin parar,
{NOMBRE_DESTINATARIO}, me haces tanto reír.
Tu humor alegra mis días grises,
Donde cada chiste son matices.
No necesito comediantes ni shows,
Solo tu humor y sus flows.
Eres mi comedia favorita real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t58e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_18_Me_Haces_Reír_Hasta_Que_Me_Duele_el_Estómago_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t59a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general ascendente por una escalinata dorada monumental, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas, el rescate en la escalera y el picnic de risas ya usados.

Nota importante de roles: en esta plantilla, quien se transforma y asciende hacia una mejor versión de sí mismo es la persona que habla en el poema (la voz narradora), inspirada por el ejemplo de la persona nombrada (el destinatario), quien aparece detrás como figura luminosa e inspiradora. Es decir, Diego es quien asciende transformándose, y {NOMBRE_DESTINATARIO} es la figura inspiradora que resplandece detrás de él.

En el centro de la composición, Diego sube una escalinata monumental de peldaños dorados luminosos. A su lado, ligeramente adelantado y semitransparente, camina una versión más luminosa y erguida de sí mismo, como un reflejo aspiracional que se funde gradualmente con su cuerpo real a cada paso. Detrás de él, unos peldaños más abajo, {NOMBRE_DESTINATARIO} se yergue como una figura serena y radiante, envuelta en un resplandor blanco-dorado suave, observándolo con orgullo y sirviendo de origen de la luz que ilumina toda la escalinata. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t59a$,
  background_details = $t59b$La escalinata asciende hacia un cielo despejado de tonos azul brillante con nubes doradas iluminadas por el amanecer. A ambos lados, columnas bajas de piedra clara flanquean los peldaños.$t59b$,
  magic_effects = $t59c$Cada peldaño que Diego pisa se ilumina brevemente con un destello dorado antes de atenuarse detrás de él. La silueta luminosa aspiracional que camina junto a él proyecta pequeñas partículas de luz blanca que ascienden como chispas hacia el cielo. La magia se siente motivadora, luminosa y perfectamente integrada dentro de una fotografía realista.$t59c$,
  lighting_color = $t59d$Iluminación de amanecer brillante y ascendente, con la luz de {NOMBRE_DESTINATARIO} como fuente cálida desde abajo y el cielo azul luminoso arriba. Predominan tonos dorado brillante, blanco luminoso y azul cielo intenso.$t59d$,
  poem_template = $t59e$100 días inspirándome a crecer,
{NOMBRE_DESTINATARIO}, contigo quiero ser.
Tu ejemplo me impulsa a mejorar,
Donde cada día puedo avanzar.
No necesito gurús ni mentores,
Solo tu ejemplo y sus valores.
Eres mi inspiración diaria real,
Mi {APODO_DESTINATARIO}, mi amor, mi ideal.$t59e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_19_Me_Inspiras_a_Ser_Mejor_Persona_Cada_Día_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t60a$Una única fotografía continua que fluye de lado a lado del lienzo. Última plantilla del libro: un plano general que funciona como cierre y síntesis de toda la historia, con la pareja abrazada en el centro y ecos translúcidos de sí mismos en distintos momentos del tiempo a su alrededor, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas, el rescate en la escalera, el picnic de risas y la escalinata ascendente ya usados. La escena transmite eternidad: un amor que no deja de crecer con el paso del tiempo.

En el centro exacto de la composición, {NOMBRE_DESTINATARIO} y Diego (rostros fotorrealistas basados en fotografías reales) se abrazan de pie, mirándose a los ojos con una sonrisa serena y profunda. Alrededor de ellos, dispuestos en un arco suave, flotan tres ecos translúcidos y dorados de la misma pareja en distintos momentos: una versión más joven riendo despreocupadamente (pasado), un reflejo casi idéntico al presente (ahora) y una versión de cabello canoso tomados de la mano con calma serena (futuro). Los tres ecos son sutiles, semitransparentes, sin competir con la pareja central. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t60a$,
  background_details = $t60b$Finos hilos de luz dorada conectan a la pareja central con cada uno de los ecos translúcidos que la rodean, formando una suave constelación circular. Páginas de calendario doradas y traslúcidas, con números y meses ilegibles, flotan lentamente en el fondo desenfocado, como el paso silencioso del tiempo.$t60b$,
  magic_effects = $t60c$Los hilos dorados que conectan a la pareja con sus ecos temporales laten suavemente, como un pulso constante. Pequeñas partículas doradas se desprenden de cada eco y flotan hacia el abrazo central, alimentándolo con más luz. La magia se siente atemporal, profunda y perfectamente integrada dentro de una fotografía realista.$t60c$,
  lighting_color = $t60d$Iluminación cálida y atemporal, sin indicar una hora del día específica, con la pareja central como fuente de luz dorada suave. Predominan tonos dorado profundo, ámbar cálido y destellos blancos suaves en los ecos translúcidos.$t60d$,
  poem_template = $t60e$100 días y mi amor sigue creciendo,
{NOMBRE_DESTINATARIO}, cada día te sigo queriendo.
Mi amor por ti no tiene límite ni fin,
Donde cada momento es un festín.
Pensé que no podía amarte más,
Pero cada día me sorprendo más.
Eres mi amor infinito y real,
Mi {APODO_DESTINATARIO}, mi amor, mi eternal.$t60e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_20_Cada_Día_Me_Enamoro_Más_de_Ti_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t61a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un profundo sentimiento de amor, hogar, paz y renovación, representando cómo una persona puede convertirse en la luz que ilumina toda una vida.

En el centro de la composición aparece una pareja dentro de una acogedora sala de estar. {NOMBRE_DESTINATARIO} representa metafóricamente el sol. Su cuerpo irradia una luz dorada suave y natural que ilumina toda la habitación sin perder realismo. Su expresión transmite amor, serenidad y felicidad. María lo observa con una expresión de profunda admiración, paz y gratitud. Ambos mantienen contacto visual y una postura relajada que comunica complicidad, afecto y estabilidad emocional. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t61a$,
  background_details = $t61b$La habitación posee una decoración cálida y elegante con muebles de madera, textiles suaves y plantas naturales distribuidas alrededor del ambiente. Grandes ventanas permiten el ingreso de abundantes rayos de sol dorados que llenan completamente el espacio de luz cálida. Toda la habitación refleja armonía, comodidad y la sensación de sentirse verdaderamente en casa.$t61b$,
  magic_effects = $t61c$La luz que emana de {NOMBRE_DESTINATARIO} se integra perfectamente con la luz natural del sol. Pequeñas partículas luminosas flotan delicadamente en el aire. Las plantas cercanas reflejan suavemente esa energía luminosa, mostrando un brillo cálido que simboliza vida, esperanza y crecimiento. La magia debe sentirse sutil, elegante y completamente integrada dentro de una fotografía realista.$t61c$,
  lighting_color = $t61d$Iluminación cinematográfica cálida, envolvente y altamente natural. La escena está dominada por rayos de sol intensos que ingresan desde las ventanas e iluminan toda la habitación. Predominan tonos: dorado intenso, amarillo cálido, crema luminoso, reflejos ámbar ligeros, tonos miel. La iluminación genera una atmósfera reconfortante, romántica y llena de energía positiva.$t61d$,
  poem_template = $t61e$100 días amándote como si fueras el sol, {NOMBRE_DESTINATARIO}, iluminas mi vida desde el rol.
Tu presencia calienta cada rincón, Donde la oscuridad ya no tiene razón.
Cada día contigo es un amanecer, Donde tu luz me hace renacer.
Eres mi sol personal y real, Mi amor, mi amor, mi luz vital.$t61e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_1_Amarte_es_Como_Tener_el_Sol_en_Casa_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t62a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite un sentimiento onírico, mágico y profundamente romántico, como si el amor entre ambos los hubiera transportado a un sueño compartido.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) flotan suavemente abrazados en un espacio onírico e ingrávido, rodeados de nubes suaves y luminosas. Ambos mantienen los ojos cerrados con una expresión de paz y felicidad plena, como si soñaran juntos el mismo sueño. Sus cuerpos parecen ingrávidos, sostenidos delicadamente por la magia del momento, en una postura tierna y cercana que transmite confianza y entrega mutua. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t62a$,
  background_details = $t62b$Alrededor de la pareja flotan estrellas y lunas brillantes de distintos tamaños, en un cielo nocturno onírico y surrealista. Los colores del ambiente se mezclan suavemente como acuarela en el aire, creando un espacio sin límites definidos, propio de un sueño lúcido.$t62b$,
  magic_effects = $t62c$Burbujas transparentes y brillantes flotan alrededor de la pareja, cada una conteniendo pequeñas siluetas luminosas de recuerdos vividos juntos. Partículas de polvo estelar se desplazan lentamente por el aire. La magia debe sentirse serena, delicada y completamente integrada dentro de una fotografía realista.$t62c$,
  lighting_color = $t62d$Iluminación suave y difusa, similar a la luz de luna llena filtrada entre nubes. Predominan tonos pasteles: azul cielo, rosa pálido, lila suave y destellos plateados. La atmósfera es etérea, tranquila y profundamente romántica.$t62d$,
  poem_template = $t62e$100 días viviendo este sueño contigo,
{NOMBRE_DESTINATARIO}, cada momento es mi abrigo.
Tu amor es tan perfecto que parece irreal,
Donde cada día es algo especial.
No quiero despertar de esta fantasía,
Donde tú eres mi mejor melodía.
Eres mi sueño hecho realidad,
Mi {APODO_DESTINATARIO}, mi amor, mi eternidad.$t62e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_2_Estar_Contigo_es_Como_Vivir_en_un_Sueño_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t63a$Una única fotografía continua que fluye de lado a lado del lienzo. La escena transmite alegría pura, complicidad y la sensación de que la risa de una persona puede ser la melodía favorita de quien la ama.

En el centro de la composición aparece una pareja dentro de un ambiente cálido y luminoso. {NOMBRE_DESTINATARIO} ríe a carcajadas con expresión genuina y radiante; de su boca surgen delicadamente notas musicales brillantes y coloridas que se elevan en el aire. María lo observa a su lado con una sonrisa enamorada, disfrutando plenamente el sonido de su risa. Ambos comparten una postura cercana y relajada que transmite complicidad y felicidad compartida. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t63a$,
  background_details = $t63b$Alrededor de la pareja flotan instrumentos musicales luminosos (guitarra, piano, violín) de forma etérea y decorativa, junto con ondas de sonido visibles en colores vibrantes que se expanden suavemente por el ambiente. El entorno evoca un escenario de concierto íntimo y mágico, cálido y acogedor.$t63b$,
  magic_effects = $t63c$Las notas musicales que emergen de la risa de {NOMBRE_DESTINATARIO} brillan con tonos dorados y pastel, flotando en espiral hacia el techo. Pequeños destellos de luz laten al ritmo de la música invisible. La magia debe sentirse alegre, luminosa y perfectamente integrada dentro de una fotografía realista.$t63c$,
  lighting_color = $t63d$Iluminación cálida y vibrante, tipo escenario de concierto íntimo. Predominan tonos alegres y luminosos: amarillo brillante, naranja suave, rosa vibrante y toques dorados. La atmósfera transmite pura felicidad y energía positiva.$t63d$,
  poem_template = $t63e$100 días escuchando tu risa perfecta,
{NOMBRE_DESTINATARIO}, es la melodía más directa.
Tu carcajada alegra mi existir,
Donde cada sonido me hace vivir.
No necesito canciones ni sinfonías,
Solo tu risa y sus alegrías.
Eres mi música favorita y real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t63e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_3_Tu_Risa_es_Como_Música_para_Mis_Oídos_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t64a$Una única fotografía continua que fluye de lado a lado del lienzo. A diferencia de las plantillas anteriores, esta escena abandona el plano general y apuesta por un primer plano extremo (macro) que convierte la mirada en el centro absoluto de la composición, transmitiendo que el verdadero paraíso no se encuentra en un lugar lejano, sino en los ojos de la persona amada.

La imagen es un macro fotográfico extremo del rostro de {NOMBRE_DESTINATARIO}, encuadrado desde la frente hasta los labios, con foco absoluto en sus ojos. Dentro de sus pupilas, como si fueran ventanas dimensionales, se revela un paraíso tropical en miniatura: una playa de arena blanca, agua turquesa cristalina y palmeras inclinadas recortadas contra un atardecer dorado. En el borde inferior del encuadre, apenas visible y desenfocada, aparece la mano de María rozando suavemente la mejilla de {NOMBRE_DESTINATARIO}, ancla emocional de la escena que confirma que este instante de contemplación es compartido. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t64a$,
  background_details = $t64b$Fuera del área de los ojos, el resto del encuadre se difumina intencionalmente en un bokeh oscuro y neutro, casi nocturno, de manera que no compita visualmente con el "portal" luminoso de la mirada. Esta oscuridad envolvente resalta aún más el contraste con los colores vívidos del paraíso reflejado.$t64b$,
  magic_effects = $t64c$En el borde del iris se percibe una leve distorsión óptica tipo lente, como si el paraíso realmente existiera al otro lado de un cristal curvo. Diminutas partículas de luz dorada escapan sutilmente del contorno de la pupila y se disuelven en el aire oscuro que rodea el rostro, sugiriendo que ese mundo interior se filtra hacia la realidad. Dentro del reflejo del paraíso, una silueta lejana y borrosa —apenas insinuada entre las palmeras— recuerda la figura de María caminando por la orilla, integrando a la pareja incluso dentro del "mundo" contenido en la mirada.$t64c$,
  lighting_color = $t64d$Iluminación dividida: el rostro se mantiene en penumbra suave y cálida, mientras que el interior de los ojos irradia luz propia. Predominan tonos turquesa intenso, dorado de atardecer, verde palmera y destellos ámbar, en fuerte contraste con la oscuridad neutra del entorno.$t64d$,
  poem_template = $t64e$100 días mirando tus ojos de paraíso,
{NOMBRE_DESTINATARIO}, en tu mirada encuentro mi piso.
Tus ojos guardan mundos de belleza,
Donde cada destello es certeza.
No necesito viajes ni destinos lejanos,
Solo tus ojos y nuestros planos.
Eres mi paraíso personal,
Mi {APODO_DESTINATARIO}, mi amor, mi ideal.$t64e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_4_Tus_Ojos_Son_Como_Ventanas_al_Paraíso_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t65a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: un plano medio-cerrado de perfil, íntimo y cálido, ambientado en un rincón rústico tipo cabaña de apicultor al atardecer, muy distinto del salón, el sueño flotante, el escenario musical y el macro de ojos ya usados. La escena transmite calma absoluta, como si la voz de una persona tuviera el poder de calmar cualquier tormenta interior.

De perfil, {NOMBRE_DESTINATARIO} habla suavemente con los labios entreabiertos; de ellos fluye una cinta espesa y luminosa de miel dorada líquida que se suspende en el aire en espirales lentas, como si el tiempo se hubiera ralentizado. María está sentada muy cerca, de frente a él, con los ojos cerrados y la cabeza ligeramente inclinada hacia adelante, como si se dejara envolver físicamente por el sonido de su voz. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t65a$,
  background_details = $t65b$El entorno es una acogedora cabaña de madera oscura con vigas a la vista, ramilletes de flores secas colgando del techo y un estante con tarros de miel artesanal iluminados por la luz del atardecer que entra por una ventana lateral. Fragmentos de panal translúcido flotan suspendidos en el aire como pequeñas esculturas de luz ámbar.$t65b$,
  magic_effects = $t65c$Dentro de la cinta de miel líquida que fluye de los labios de {NOMBRE_DESTINATARIO} se insinúan, por un instante, formas delicadas —una paloma, un corazón— antes de disolverse en un fino polvo dorado. Pequeñas abejas mágicas de luz bioluminiscente dorada orbitan lentamente alrededor de la cinta de miel sin nunca tocarla, dejando estelas luminosas breves a su paso. La magia debe sentirse artesanal, cálida y perfectamente integrada dentro de una fotografía realista.$t65c$,
  lighting_color = $t65d$Luz de atardecer entrando en ángulo bajo por la ventana lateral, cálida y dorada, con la cinta de miel como fuente de luz secundaria. Predominan tonos miel dorado, ámbar profundo, marrón madera y destellos crema. Atmósfera reconfortante, artesanal y serena.$t65d$,
  poem_template = $t65e$100 días escuchando tu voz de miel,
{NOMBRE_DESTINATARIO}, cada palabra es mi laurel.
Tu voz calma mis tormentas internas,
Donde cada sonido son luces eternas.
No necesito dulces ni manjares,
Solo tu voz y sus cantares.
Eres mi miel del alma real,
Mi {APODO_DESTINATARIO}, mi amor, mi manantial.$t65e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_5_Tu_Voz_es_Como_Miel_para_Mi_Alma_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t66a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en exteriores, al borde de un acantilado o mirador, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos y la cabaña de miel ya usados. La escena transmite protección absoluta frente a la adversidad, contrastando calma interior con caos exterior.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) se abrazan de pie, de frente a la cámara, con los ojos cerrados y las expresiones completamente serenas. Alrededor de ambos se forma una burbuja protectora esférica, transparente y brillante, con un tenue resplandor dorado en su interior. Dentro de la burbuja el aire está en calma, cálido y dorado; justo en el límite de la esfera se aprecia la frontera nítida entre ese refugio y el exterior. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t66a$,
  background_details = $t66b$Fuera de la burbuja se desata una tormenta intensa: lluvia oblicua, nubes grises y densas, ráfagas de viento que agitan la vegetación cercana al acantilado. El paisaje exterior está desaturado, en tonos grises y azulados fríos, mientras que el interior de la burbuja conserva colores cálidos y vívidos, creando un contraste dramático entre ambos mundos.$t66b$,
  magic_effects = $t66c$La superficie de la burbuja protectora tiene un leve brillo dorado tipo escudo mágico, con ondulaciones sutiles al ritmo del viento exterior, como si repeliera activamente la tormenta sin romperse. Gotas de lluvia que impactan la burbuja se deslizan y se transforman en pequeñas chispas doradas antes de caer. La magia debe sentirse sólida, protectora y perfectamente integrada dentro de una fotografía realista.$t66c$,
  lighting_color = $t66d$Contraste lumínico marcado: luz cálida y dorada dentro de la burbuja frente a luz fría, grisácea y tormentosa en el exterior. Predominan tonos dorado suave y ámbar cálido dentro; gris plomo, azul tormenta y blanco lluvia afuera.$t66d$,
  poem_template = $t66e$100 días refugiándome en tus brazos,
{NOMBRE_DESTINATARIO}, eres mis mejores lazos.
Tu abrazo me protege del mundo exterior,
Donde cada apretón es mi mejor.
No necesito muros ni fortalezas,
Solo tus brazos y sus certezas.
Eres mi refugio personal y real,
Mi {APODO_DESTINATARIO}, mi amor, mi hogar ideal.$t66e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_6_Tu_Abrazo_es_Como_Mi_Refugio_Seguro_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t67a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio en una terraza o balcón justo después de que amainó la lluvia, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel y la burbuja en la tormenta ya usados. La escena transmite esperanza renovada, ese instante exacto en que el cielo se abre después de la tormenta.

En el centro de la composición, {NOMBRE_DESTINATARIO} está de pie en el balcón, recién girándose hacia la cámara con una sonrisa amplia y genuina que ilumina su rostro. María está a su lado, apoyada en la baranda, mirándolo a él en lugar de al paisaje, con una expresión de ternura absoluta. Justo detrás de ambos, un arcoíris nítido y luminoso cruza el cielo despejándose entre las últimas nubes grises de la tormenta. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t67a$,
  background_details = $t67b$El piso de madera del balcón está mojado y refleja tenuemente los colores del arcoíris como un espejo difuso. Gotas de lluvia residuales caen lentamente desde el borde del techo. A lo lejos, la ciudad o el paisaje se ve parcialmente iluminado por rayos de sol que atraviesan las nubes rotas.$t67b$,
  magic_effects = $t67c$Cada gota de lluvia, al tocar el suelo del balcón, se transforma instantáneamente en una pequeña chispa de luz de color (siguiendo la paleta del arcoíris) que se eleva brevemente antes de desvanecerse, como si la tristeza se convirtiera en luz al contacto con la sonrisa de {NOMBRE_DESTINATARIO}. El arcoíris tiene un brillo ligeramente sobrenatural, más intenso que uno real, pero manteniendo el fotorrealismo.$t67c$,
  lighting_color = $t67d$Luz de sol filtrada y difusa entre nubes rotas, con rayos visibles atravesando el ambiente húmedo. Predominan los siete colores del arcoíris (rojo, naranja, amarillo, verde, azul, índigo, violeta) contra un cielo que transiciona de gris tormenta a celeste despejado. Atmósfera fresca, luminosa y esperanzadora.$t67d$,
  poem_template = $t67e$100 días viendo tu sonrisa brillar,
{NOMBRE_DESTINATARIO}, como arcoíris sin cesar.
Tu sonrisa ilumina mis días grises,
Donde cada gesto son matices.
No necesito promesas ni señales,
Solo tu sonrisa y sus ideales.
Eres mi arcoíris después de llorar,
Mi {APODO_DESTINATARIO}, mi amor, mi despertar.$t67e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_7_Tu_Sonrisa_es_Como_el_Arcoíris_Después_de_la_Lluvia_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t68a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano nocturno en una azotea con vista al skyline de una ciudad, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta y el balcón del arcoíris ya usados. La escena transmite un romance atemporal: la pareja quieta y serena en medio de un cielo lleno de movimiento y luz.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) se besan de pie en la azotea, con el skyline nocturno de la ciudad iluminado detrás de ellos. Fuegos artificiales reales explotan en el cielo en distintos puntos, en tonos dorados y cálidos, bañando suavemente la piel de ambos con su resplandor. Su quietud contrasta con el movimiento constante de luces alrededor. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t68a$,
  background_details = $t68b$Una lluvia de estrellas fugaces cruza el cielo detrás de ellos, sus estelas curvándose sutilmente hasta insinuar, sin ser literal ni geométrica, la forma de un corazón en el firmamento. Las luces de los edificios de la ciudad titilan suavemente en la distancia, difuminadas por la altura.$t68b$,
  magic_effects = $t68c$Alrededor de la pareja ascienden lentamente farolillos de papel dorados, con una luz cálida propia en su interior; al mirar de cerca, dentro de cada uno se insinúa tenuemente, como una ventana translúcida, la silueta dorada de ese mismo beso, sin literalidad de "repetición en bucle", solo una sugerencia suave y elegante. La magia se siente cálida, festiva y perfectamente integrada dentro de una fotografía realista.$t68c$,
  lighting_color = $t68d$Iluminación nocturna cálida, con los fuegos artificiales y los farolillos como fuentes principales de luz dorada y ámbar, contra un cielo azul oscuro profundo y el brillo lejano del skyline. Predominan tonos dorado brillante, ámbar cálido, azul noche profundo y toques rosados de los fuegos artificiales.$t68d$,
  poem_template = $t68e$100 días desde aquel primer beso mágico,
{NOMBRE_DESTINATARIO}, momento tan categórico.
Tus labios tocaron los míos con pasión,
Donde el tiempo paró sin razón.
Ese beso cambió mi destino entero,
Donde encontré mi amor verdadero.
Eres mi primer beso eterno,
Mi {APODO_DESTINATARIO}, mi amor, mi invierno y verano.$t68e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_8_Nuestro_Primer_Beso_Fue_Magia_Pura_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t69a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general abierto en un campo de trigo dorado al atardecer, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris y la azotea del beso ya usados. La escena transmite la solemnidad y el peso emocional de un momento que cambió todo, como si el mundo se hubiera detenido a escuchar esas dos palabras.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) están de pie, frente a frente, tomados de las manos en medio de un campo de trigo dorado que se mece suavemente con el viento. Se miran a los ojos con una expresión de emoción contenida, como en el instante exacto en que una de esas palabras acaba de ser pronunciada. Entre ambos, suspendidas en el aire a la altura del pecho, flotan las palabras "TE AMO" en letras doradas caligráficas y luminosas, como si el aliento mismo se hubiera convertido en luz. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t69a$,
  background_details = $t69b$El campo de trigo se extiende hasta el horizonte, dorado y en movimiento constante por el viento, bajo un cielo de atardecer en tonos naranja profundo y rosado. A lo lejos, el sol se oculta justo detrás de la pareja, generando un contraluz cálido que perfila sus siluetas.$t69b$,
  magic_effects = $t69c$Pequeños corazones de luz dorada, del tamaño de luciérnagas, flotan y parpadean suavemente alrededor de las palabras suspendidas, como si emanaran de ellas. Las letras doradas de "TE AMO" tienen un brillo interno pulsante, suave, sin sentirse artificial. Diminutas partículas de polvo dorado se desprenden lentamente de las letras y se mezclan con las espigas de trigo cercanas.$t69c$,
  lighting_color = $t69d$Luz de atardecer intensa y cálida a contraluz, con destellos dorados atravesando el campo de trigo. Predominan tonos dorado profundo, naranja atardecer, ámbar y toques rosados suaves en el cielo.$t69d$,
  poem_template = $t69e$100 días desde que dijiste "te amo",
{NOMBRE_DESTINATARIO}, palabras que siempre reclamo.
Esas dos palabras cambiaron mi vida,
Donde cada letra fue bienvenida.
Ese momento quedó grabado en mi alma,
Donde encontré mi eterna calma.
Eres mi "te amo" más sincero,
Mi {APODO_DESTINATARIO}, mi amor, mi compañero.$t69e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_9_Cuando_Dijiste_Te_Amo_Por_Primera_Vez_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t70a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio íntimo dentro de un fuerte de mantas construido en la sala, de noche, muy distinto del salón iluminado por el sol, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso y el campo de trigo ya usados. La escena transmite comodidad absoluta y complicidad silenciosa, el ritual favorito de la pareja.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) están acurrucados dentro de un fuerte de mantas suaves y esponjosas, envueltos juntos en una manta grande y afelpada, mirando hacia el frente con expresiones relajadas y sonrientes. Entre ellos y frente a la cámara, un bol de palomitas de maíz brillantes flota suavemente en el aire. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t70a$,
  background_details = $t70b$Las "paredes" del fuerte están hechas de mantas colgantes suaves sostenidas por cojines, iluminadas por delicadas luces tipo guirnalda cálida entrelazadas en la estructura. Frente a la pareja, suspendidas en el aire como si fueran proyecciones holográficas, flotan pequeñas escenas translúcidas y luminosas de películas clásicas románticas, brillando con luz propia como pantallas mágicas en miniatura.$t70b$,
  magic_effects = $t70c$Las palomitas que flotan alrededor del bol brillan tenuemente como si estuvieran hechas de luz dorada suave. Las proyecciones holográficas de películas parpadean con un resplandor azulado y cálido alternado, como fotogramas vivos, sin llegar a ser nítidas ni legibles, solo sugerentes. La magia se siente hogareña, suave y perfectamente integrada dentro de una fotografía realista.$t70c$,
  lighting_color = $t70d$Iluminación nocturna íntima, dominada por la luz cálida de las guirnaldas y el resplandor azulado de las proyecciones holográficas. Predominan tonos ámbar suave, dorado tenue, azul proyector y blanco cálido de las luces.$t70d$,
  poem_template = $t70e$100 días de películas a tu lado,
{NOMBRE_DESTINATARIO}, mi momento más amado.
Tu compañía hace cada escena especial,
Donde cada abrazo es celestial.
No importa la película que veamos,
Solo que juntos estemos y seamos.
Eres mi película favorita real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t70e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_10_Nuestras_Nochoes_de_Películas_Son_Mi_Momento_Favorito_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t71a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano bajo tomado desde los pies de la cama mirando hacia las almohadas, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo y el fuerte de mantas ya usados. La escena transmite la sensación de que cada mañana junto a la persona amada es, literalmente, despertar en el paraíso.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) despiertan juntos recostados en la cama, con las sábanas blancas suaves alrededor, mirándose con sonrisas somnolientas y tiernas al abrir los ojos. La luz dorada del amanecer entra en rayos diagonales a través de cortinas de gasa translúcida, bañando la escena de calidez. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t71a$,
  background_details = $t71b$Alrededor del marco de la cama y sobre las mesas de noche, flores mágicas crecen y florecen en tiempo acelerado, como si el amanecer las hiciera brotar en ese instante: enredaderas floridas trepan suavemente por los postes de la cama, pétalos abriéndose delicadamente. En el alféizar de la ventana, pequeños pájaros de plumaje brillante y bioluminiscente cantan, con diminutas espirales de luz dorada elevándose de sus picos al ritmo del canto.$t71b$,
  magic_effects = $t71c$Motas de polen dorado y luminoso flotan suavemente en el aire iluminado por los rayos de sol, como polvo de hadas natural. Las flores que florecen alrededor de la cama dejan un rastro tenue de brillo dorado en el aire al abrirse. La magia se siente fresca, viva y perfectamente integrada dentro de una fotografía realista.$t71c$,
  lighting_color = $t71d$Luz de amanecer dorada y suave entrando en ángulo bajo por la ventana, con motas de polvo doradas suspendidas en los rayos de luz. Predominan tonos dorado pastel, rosa amanecer suave, blanco cálido de las sábanas y verde tierno de las flores nuevas.$t71d$,
  poem_template = $t71e$100 días despertando junto a ti,
{NOMBRE_DESTINATARIO}, cada mañana es para mí.
Tu rostro es lo primero que veo al despertar,
Donde cada día vuelve a empezar.
No necesito alarmas ni despertadores,
Solo tu presencia y sus colores.
Eres mi amanecer perfecto y real,
Mi {APODO_DESTINATARIO}, mi amor, mi luz matinal.$t71e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_11_Despertar_Contigo_es_Como_Comenzar_en_el_Paraíso_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t72a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en la cima de una montaña al atardecer, con vista panorámica abierta, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas y la habitación del amanecer ya usados. La escena transmite espíritu explorador y la certeza de que cada aventura vivida juntos vale la pena.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) están de pie en la cima de una montaña, con mochilas de viaje ligeras, sosteniendo juntos un mapa antiguo que brilla con líneas doradas luminosas. Entre ambos flota una brújula dorada suspendida en el aire, girando lentamente con su aguja iluminada, como si señalara el siguiente destino. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t72a$,
  background_details = $t72b$Alrededor de la pareja, flotando a distintas alturas como esferas de recuerdo translúcidas, aparecen viñetas circulares de aventuras pasadas: una playa de arena blanca y mar turquesa, una ciudad iluminada de noche, un bosque frondoso al amanecer. Cada esfera tiene un halo dorado suave en su borde. Debajo de ellos, la vista panorámica de valles y cordilleras se extiende hasta el horizonte, bañada por la luz del atardecer.$t72b$,
  magic_effects = $t72c$Del mapa que sostienen juntos emergen delicadas líneas doradas luminosas que se elevan y conectan brevemente con cada una de las esferas de recuerdo flotantes, como constelaciones trazando su historia compartida. La brújula desprende un tenue resplandor dorado pulsante. La magia se siente épica, cálida y perfectamente integrada dentro de una fotografía realista.$t72c$,
  lighting_color = $t72d$Luz de atardecer dorada e intensa, con la silueta de las montañas recortada contra el cielo. Predominan tonos dorado vibrante, naranja aventurero, azul montaña profundo y toques turquesa de las esferas de playa.$t72d$,
  poem_template = $t72e$100 días de aventuras a tu lado,
{NOMBRE_DESTINATARIO}, cada viaje es sagrado.
Contigo cada lugar se vuelve especial,
Donde cada paso es monumental.
No importa el destino que elijamos,
Solo que juntos siempre vayamos.
Eres mi compañero de aventuras ideal,
Mi {APODO_DESTINATARIO}, mi amor, mi mapa astral.$t72e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_12_Nuestras_Aventuras_Juntos_Son_Inolvidables_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t73a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general dinámico de un giro de baile en pleno movimiento, sobre un "salón" de nubes nocturnas, muy distinto del salón, el sueño flotante (estático y con ojos cerrados), el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer y la cima de la montaña ya usados. A diferencia del sueño flotante de la Plantilla 2 (pareja abrazada, quieta, ojos cerrados), aquí el movimiento y la energía del baile son el centro absoluto de la escena.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) bailan en pleno giro, capturados en pleno movimiento sobre una superficie de nubes suaves y luminosas que actúa como pista de baile, flotando muy por encima de la tierra bajo un cielo nocturno estrellado. Sus ropas y cabello tienen movimiento visible, congelados en el instante justo del giro. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t73a$,
  background_details = $t73b$Sobre ellos, las estrellas forman una especie de bóveda celeste densa, como un candelabro natural. La luna llena brilla detrás de la pareja como un reflector natural, iluminándolos desde atrás con un halo plateado.$t73b$,
  magic_effects = $t73c$Ondas doradas de música visible se propagan en círculos concéntricos desde los pies de la pareja hacia afuera, como si el propio cielo tocara la melodía de su baile. Pequeñas partículas brillantes se desprenden de las nubes bajo sus pies cada vez que giran, dejando una estela luminosa breve. La magia se siente ligera, alegre y perfectamente integrada dentro de una fotografía realista.$t73c$,
  lighting_color = $t73d$Iluminación nocturna celestial, con contraluz plateado de la luna llena y el brillo dorado cálido de las ondas de sonido. Predominan tonos blanco nube, azul noche profundo, plateado lunar y dorado suave.$t73d$,
  poem_template = $t73e$100 días bailando entre tus brazos,
{NOMBRE_DESTINATARIO}, flotando en tus abrazos.
Tus pasos me llevan a las nubes,
Donde cada giro son querubes.
No necesito pistas ni salones,
Solo tus brazos y sus canciones.
Eres mi pareja de baile perfecta,
Mi {APODO_DESTINATARIO}, mi amor, mi danza directa.$t73e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_13_Bailar_Contigo_es_Como_Flotar_en_las_Nubes_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t74a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano medio lateral de la pareja sentada frente a frente en la cama de madrugada, muy distinto del salón, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña y el baile en las nubes ya usados. A diferencia de la habitación dorada y matutina de la Plantilla 11, esta escena ocurre de madrugada, en tonos azulados y plateados de luna, transmitiendo introspección y conexión profunda en vez de energía.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) están sentados con las piernas cruzadas, frente a frente sobre la cama, envueltos juntos en una manta compartida, conversando con expresiones íntimas y atentas, muy cerca el uno del otro. La luz plateada de una luna llena entra por la ventana detrás de ellos. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t74a$,
  background_details = $t74b$Entre ambos, a la altura del pecho, flotan pequeñas nubes luminosas de pensamiento, suaves y translúcidas, en tonos plateados y dorados tenues, que se forman y disuelven lentamente mientras hablan, sin llegar a formar letras ni palabras legibles, solo la sugerencia visual de ideas compartidas. La habitación está en penumbra, iluminada principalmente por la luna y el tenue resplandor de las nubes de pensamiento.$t74b$,
  magic_effects = $t74c$Cada nube de pensamiento tiene un brillo interior pulsante suave, como una respiración lenta, y ocasionalmente dos nubes de cada uno se entrelazan brevemente antes de disolverse, simbolizando la conexión de sus ideas. Diminutas motas de luz plateada flotan en el aire alrededor de la cama, como polvo de luna. La magia se siente serena, íntima y perfectamente integrada dentro de una fotografía realista.$t74c$,
  lighting_color = $t74d$Iluminación nocturna fría y suave, dominada por la luz plateada de la luna llena a través de la ventana, contrastada con el resplandor dorado tenue de las nubes de pensamiento. Predominan tonos azul noche profundo, plateado lunar y dorado suave apagado.$t74d$,
  poem_template = $t74e$100 días de charlas hasta el amanecer,
{NOMBRE_DESTINATARIO}, contigo puedo ser.
Nuestras conversaciones tocan mi alma,
Donde cada palabra trae calma.
No necesito terapias ni consejos,
Solo tus palabras y sus reflejos.
Eres mi confidente perfecto y real,
Mi {APODO_DESTINATARIO}, mi amor, mi conexión mental.$t74e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_14_Nuestras_Conversaciones_Profundas_de_Madrugada_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t75a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en un salón elegante tipo palacio íntimo, con un pequeño pedestal dorado circular, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes y la conversación de madrugada ya usados. La escena transmite un momento de "coronación emocional", donde el amor de la pareja hace sentir a alguien como la persona más valiosa del mundo.

En el centro de la composición, {NOMBRE_DESTINATARIO} está de pie sobre un sutil pedestal dorado circular, con los brazos ligeramente abiertos y una expresión de asombro sereno, mientras un resplandor dorado cálido emana de su piel y su vestimenta. Sobre su cabeza se forma delicadamente una corona de luz dorada, hecha de finos filamentos luminosos entrelazados, no una corona física de metal. María está de pie justo frente al pedestal, mirándolo hacia arriba con una expresión de admiración profunda y genuina, con una mano apoyada suavemente sobre el borde del pedestal. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t75a$,
  background_details = $t75b$El salón tiene una estética íntima de palacio moderno: cortinas largas de terciopelo cayendo en pliegues suaves, un piso de mármol pulido que refleja tenuemente el resplandor dorado de {NOMBRE_DESTINATARIO}, e iluminación ambiental cálida similar a la de candelabros distribuidos fuera de foco en el fondo.$t75b$,
  magic_effects = $t75c$El resplandor dorado que emana de {NOMBRE_DESTINATARIO} se refleja suavemente en el mármol bajo sus pies, creando un halo circular de luz alrededor de la base del pedestal. Pequeñas partículas doradas ascienden lentamente desde sus hombros hacia la corona de luz, alimentándola. La magia se siente solemne, cálida y perfectamente integrada dentro de una fotografía realista.$t75c$,
  lighting_color = $t75d$Iluminación cálida tipo salón de gala, con el resplandor dorado de {NOMBRE_DESTINATARIO} como fuente de luz principal. Predominan tonos dorado intenso, ámbar cálido, blanco marfil del mármol y toques bronce en las sombras.$t75d$,
  poem_template = $t75e$100 días sintiéndome único contigo,
{NOMBRE_DESTINATARIO}, eres mi mejor abrigo.
Tu amor me hace sentir especial,
Donde cada gesto es monumental.
No necesito aplausos ni reconocimientos,
Solo tu amor y sus sentimientos.
Eres quien me hace brillar real,
Mi {APODO_DESTINATARIO}, mi amor, mi pedestal.$t75e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_15_Me_Haces_Sentir_la_Persona_Más_Especial_del_Mundo_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t76a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general en un patio en ruinas de una antigua biblioteca, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada y el salón del pedestal ya usados. La escena transmite una revelación: el paso de no saber qué es el amor verdadero a descubrirlo por completo.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) se abrazan de pie en el centro de un patio en ruinas, rodeado de columnas de piedra agrietadas. Justo en el instante del abrazo, gruesas cadenas oscuras y oxidadas se rompen y caen alrededor de ellos, sus eslabones deshaciéndose en el aire. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t76a$,
  background_details = $t76b$La mitad exterior del patio, más alejada de la pareja, se ve en tonos grises apagados y desaturados, con piedra agrietada y vegetación marchita. A medida que el ojo se acerca al centro donde están abrazados, el entorno se transforma gradualmente: la piedra bajo sus pies florece con corazones dorados brillantes que crecen como flores entre las grietas, y el gris cede paso a tonos cálidos dorados.$t76b$,
  magic_effects = $t76c$Alrededor de la pareja flotan varios libros antiguos abiertos, suspendidos en el aire, con páginas que brillan suavemente y muestran líneas de texto doradas caligráficas e ilegibles, sugiriendo definiciones descubiertas del amor verdadero. Los eslabones de las cadenas rotas se disuelven en motas de luz dorada al tocar el suelo florecido. La magia se siente reveladora, cálida y perfectamente integrada dentro de una fotografía realista.$t76c$,
  lighting_color = $t76d$Iluminación que transiciona de fría y gris en los bordes del encuadre a cálida y dorada en el centro, donde está la pareja. Predominan tonos gris piedra apagado en los extremos, dorado brillante y verde dorado cálido cerca del centro.$t76d$,
  poem_template = $t76e$100 días aprendiendo a amar de verdad,
{NOMBRE_DESTINATARIO}, tú me enseñaste esta verdad.
Antes no sabía lo que era amar así,
Donde cada día es un sí.
Contigo descubrí el amor real,
Donde cada momento es especial.
Eres mi maestro del amor eterno,
Mi {APODO_DESTINATARIO}, mi amor, mi cuaderno.$t76e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_16_Contigo_Aprendí_Qué_es_el_Amor_Verdadero_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t77a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano diagonal dinámico en una escalera exterior azotada por la tormenta, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja protectora de la Plantilla 6 (estática, ambos calmos dentro de una esfera), el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal y el patio en ruinas ya usados. A diferencia de la Plantilla 6, aquí hay movimiento y urgencia: un rescate en el instante mismo de la caída, no una calma ya establecida.

Nota importante de roles: en esta plantilla, quien cae y necesita apoyo es la persona que habla en el poema (la voz narradora), y quien sostiene y protege con las alas de luz es la persona nombrada en el poema (el destinatario). Es decir, María es quien resbala y cae, y {NOMBRE_DESTINATARIO} es quien la sostiene con fuerza y despliega las alas protectoras.

En el centro de la composición, María resbala y cae en un tramo de escalera exterior mojada, con el cuerpo inclinado hacia atrás en pleno desequilibrio. {NOMBRE_DESTINATARIO} la sujeta con fuerza del brazo y la cintura, deteniendo su caída en seco, con expresión de determinación protectora. En el instante del rescate, de la espalda de {NOMBRE_DESTINATARIO} se despliegan grandes alas de luz dorada, envolviendo a ambos como un capullo protector. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t77a$,
  background_details = $t77b$Alrededor de la pareja, la tormenta arrecia: lluvia intensa oblicua, rayos distantes iluminando el cielo, viento agitando ropa y cabello. Dentro del radio de las alas de luz, sin embargo, ni una gota de lluvia los toca; el aire ahí es cálido y dorado.$t77b$,
  magic_effects = $t77c$Las alas de luz dorada tienen una textura suave y plumosa, semitransparente en los bordes, brillando con más intensidad donde envuelven directamente a la pareja. Las gotas de lluvia que se acercan demasiado al borde de las alas se desvían suavemente, como repelidas por un campo invisible. La magia se siente urgente, protectora y perfectamente integrada dentro de una fotografía realista.$t77c$,
  lighting_color = $t77d$Contraste dramático: tormenta oscura en tonos grises azulados y plateados fríos alrededor, contra el resplandor cálido dorado de las alas de luz que envuelven a la pareja.$t77d$,
  poem_template = $t77e$100 días de apoyo incondicional,
{NOMBRE_DESTINATARIO}, eres mi pilar principal.
En mis peores momentos estás ahí,
Donde tu fuerza me hace seguir.
No necesito salvadores ni héroes,
Solo tu apoyo y sus deseos.
Eres mi sostén en la tormenta,
Mi {APODO_DESTINATARIO}, mi amor, mi cuenta.$t77e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_17_Me_Apoyas_en_Mis_Peores_Momentos_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t78a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general tumbados en el pasto de un jardín soleado, en medio de un picnic volcado por accidente, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas y el rescate en la escalera ya usados. La escena transmite felicidad pura y contagiosa, el tipo de risa que duele de tan genuina.

En el centro de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) están recostados de espaldas sobre el pasto, uno junto al otro, riendo a carcajadas sin control, con los ojos entrecerrados por la risa y una mano cada uno sobre su propio estómago. Junto a ellos, una canasta de picnic volcada con frutas rodando por el pasto sugiere el origen cómico del momento. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t78a$,
  background_details = $t78b$El jardín está bañado en luz de sol brillante y cálida, con pasto verde vibrante y flores silvestres de colores alrededor. De los ojos de ambos caen pequeñas lágrimas de risa que, al desprenderse, se transforman en diminutos diamantes brillantes que ruedan sobre el pasto.$t78b$,
  magic_effects = $t78c$Alrededor de la pareja flotan y estallan suavemente burbujas transparentes que contienen ondas visibles de sonido de sus carcajadas, cada una liberando al reventar un breve estallido de confeti de colores vibrantes. La magia se siente ligera, juguetona y perfectamente integrada dentro de una fotografía realista.$t78c$,
  lighting_color = $t78d$Luz de sol de mediodía brillante y alegre, cálida y uniforme. Predominan tonos verde césped vibrante, amarillo sol, y el brillo cristalino de las lágrimas de risa convertidas en diamantes, junto con el confeti multicolor de las burbujas.$t78d$,
  poem_template = $t78e$100 días de risas sin parar,
{NOMBRE_DESTINATARIO}, me haces tanto reír.
Tu humor alegra mis días grises,
Donde cada chiste son matices.
No necesito comediantes ni shows,
Solo tu humor y sus flows.
Eres mi comedia favorita real,
Mi {APODO_DESTINATARIO}, mi amor, mi festival.$t78e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_18_Me_Haces_Reír_Hasta_Que_Me_Duele_el_Estómago_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t79a$Una única fotografía continua que fluye de lado a lado del lienzo. Nueva variación de encuadre: plano general ascendente por una escalinata dorada monumental, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas, el rescate en la escalera y el picnic de risas ya usados.

Nota importante de roles: en esta plantilla, quien se transforma y asciende hacia una mejor versión de sí mismo es la persona que habla en el poema (la voz narradora), inspirada por el ejemplo de la persona nombrada (el destinatario), quien aparece detrás como figura luminosa e inspiradora. Es decir, María es quien asciende transformándose, y {NOMBRE_DESTINATARIO} es la figura inspiradora que resplandece detrás de ella.

En el centro de la composición, María sube una escalinata monumental de peldaños dorados luminosos. A su lado, ligeramente adelantada y semitransparente, camina una versión más luminosa y erguida de sí misma, como un reflejo aspiracional que se funde gradualmente con su cuerpo real a cada paso. Detrás de ella, unos peldaños más abajo, {NOMBRE_DESTINATARIO} se yergue como una figura serena y radiante, envuelto en un resplandor blanco-dorado suave, observándola con orgullo y sirviendo de origen de la luz que ilumina toda la escalinata. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t79a$,
  background_details = $t79b$La escalinata asciende hacia un cielo despejado de tonos azul brillante con nubes doradas iluminadas por el amanecer. A ambos lados, columnas bajas de piedra clara flanquean los peldaños.$t79b$,
  magic_effects = $t79c$Cada peldaño que María pisa se ilumina brevemente con un destello dorado antes de atenuarse detrás de ella. La silueta luminosa aspiracional que camina junto a ella proyecta pequeñas partículas de luz blanca que ascienden como chispas hacia el cielo. La magia se siente motivadora, luminosa y perfectamente integrada dentro de una fotografía realista.$t79c$,
  lighting_color = $t79d$Iluminación de amanecer brillante y ascendente, con la luz de {NOMBRE_DESTINATARIO} como fuente cálida desde abajo y el cielo azul luminoso arriba. Predominan tonos dorado brillante, blanco luminoso y azul cielo intenso.$t79d$,
  poem_template = $t79e$100 días inspirándome a crecer,
{NOMBRE_DESTINATARIO}, contigo quiero ser.
Tu ejemplo me impulsa a mejorar,
Donde cada día puedo avanzar.
No necesito gurús ni mentores,
Solo tu ejemplo y sus valores.
Eres mi inspiración diaria real,
Mi {APODO_DESTINATARIO}, mi amor, mi ideal.$t79e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_19_Me_Inspiras_a_Ser_Mejor_Persona_Cada_Día_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t80a$Una única fotografía continua que fluye de lado a lado del lienzo. Última plantilla del libro: un plano general que funciona como cierre y síntesis de toda la historia, con la pareja abrazada en el centro y ecos translúcidos de sí mismos en distintos momentos del tiempo a su alrededor, muy distinto del salón inicial, el sueño flotante, el escenario musical, el macro de ojos, la cabaña de miel, la burbuja en la tormenta, el balcón del arcoíris, la azotea del beso, el campo de trigo, el fuerte de mantas, la habitación del amanecer dorado, la cima de la montaña, el baile en las nubes, la conversación de madrugada, el salón del pedestal, el patio en ruinas, el rescate en la escalera, el picnic de risas y la escalinata ascendente ya usados. La escena transmite eternidad: un amor que no deja de crecer con el paso del tiempo.

En el centro exacto de la composición, María y {NOMBRE_DESTINATARIO} (rostros fotorrealistas basados en fotografías reales) se abrazan de pie, mirándose a los ojos con una sonrisa serena y profunda. Alrededor de ellos, dispuestos en un arco suave, flotan tres ecos translúcidos y dorados de la misma pareja en distintos momentos: una versión más joven riendo despreocupadamente (pasado), un reflejo casi idéntico al presente (ahora) y una versión de cabello canoso tomados de la mano con calma serena (futuro). Los tres ecos son sutiles, semitransparentes, sin competir con la pareja central. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central.$t80a$,
  background_details = $t80b$Finos hilos de luz dorada conectan a la pareja central con cada uno de los ecos translúcidos que la rodean, formando una suave constelación circular. Páginas de calendario doradas y traslúcidas, con números y meses ilegibles, flotan lentamente en el fondo desenfocado, como el paso silencioso del tiempo.$t80b$,
  magic_effects = $t80c$Los hilos dorados que conectan a la pareja con sus ecos temporales laten suavemente, como un pulso constante. Pequeñas partículas doradas se desprenden de cada eco y flotan hacia el abrazo central, alimentándolo con más luz. La magia se siente atemporal, profunda y perfectamente integrada dentro de una fotografía realista.$t80c$,
  lighting_color = $t80d$Iluminación cálida y atemporal, sin indicar una hora del día específica, con la pareja central como fuente de luz dorada suave. Predominan tonos dorado profundo, ámbar cálido y destellos blancos suaves en los ecos translúcidos.$t80d$,
  poem_template = $t80e$100 días y mi amor sigue creciendo,
{NOMBRE_DESTINATARIO}, cada día te sigo queriendo.
Mi amor por ti no tiene límite ni fin,
Donde cada momento es un festín.
Pensé que no podía amarte más,
Pero cada día me sorprendo más.
Eres mi amor infinito y real,
Mi {APODO_DESTINATARIO}, mi amor, mi eternal.$t80e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas/PLANTILLA_20_Cada_Día_Me_Enamoro_Más_de_Ti_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t81a$Una única fotografía continua que fluye de lado a lado del lienzo. Primera plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una superheroína épica y elegante, en pleno vuelo sobre una ciudad al atardecer, en composición paralela a la Plantilla 1 de la versión masculina ("Mi Superhéroe Personal").

{NOMBRE_DESTINATARIO} viste un traje de superheroína elegante y moderno en tonos azul profundo y dorado, con detalles metálicos sutiles y silueta femenina estilizada. Su capa ondea dramáticamente al viento mientras vuela en una pose dinámica y poderosa sobre el perfil de una ciudad. De su pecho emana luz dorada, como si su propio corazón fuera la fuente de su poder. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t81a$,
  background_details = $t81b$La ciudad se extiende debajo, con rascacielos iluminados por la luz cálida del atardecer, el cielo en tonos naranja, púrpura y dorado. Nubes dispersas reflejan los colores del ocaso.$t81b$,
  magic_effects = $t81c$Los rayos de luz dorada del pecho de {NOMBRE_DESTINATARIO} se extienden brevemente hacia el cielo antes de disiparse en partículas brillantes. El borde de su capa deja una estela luminosa sutil al moverse con el viento. La magia se siente épica, poderosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico, con acabado moderno de cómic.$t81c$,
  lighting_color = $t81d$Iluminación de atardecer dramática y cinematográfica, con el resplandor dorado del pecho de {NOMBRE_DESTINATARIO} como acento de luz adicional. Predominan tonos azul profundo, dorado brillante, naranja atardecer y púrpura crepuscular.$t81d$,
  poem_template = $t81e${NOMBRE_DESTINATARIO}, eres mi superheroína real,
Con poderes que no son de manual.
No necesitas capa ni disfraz,
Tu amor es tu superpoder más.
Me salvas cada día sin saber,
Con tu fuerza me haces renacer.
Eres mi protectora y mi verdad,
Mi {APODO_DESTINATARIO}, mi heroína de verdad.$t81e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t82a$Una única fotografía continua que fluye de lado a lado del lienzo. Segunda plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una princesa elegante en el balcón de un castillo mágico bajo la luna llena, en composición paralela a la Plantilla 2 masculina ("Mi Príncipe Encantador").

{NOMBRE_DESTINATARIO} viste un vestido real elegante con detalles dorados bordados y una corona brillante y delicada sobre su cabeza. Está de pie en el balcón de un castillo de cuento de hadas, con una mano apoyada suavemente sobre la baranda de piedra tallada, mirando hacia el horizonte con expresión serena y soñadora. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t82a$,
  background_details = $t82b$Rosas brillantes y luminosas trepan por la baranda y las columnas del balcón. Detrás de ella, una luna llena enorme ilumina el cielo nocturno, con el castillo extendiéndose en torres suaves hacia los lados.$t82b$,
  magic_effects = $t82c$Pequeñas partículas doradas, como polvo de hadas, flotan suavemente alrededor de las rosas y de la corona de {NOMBRE_DESTINATARIO}, brillando tenuemente bajo la luz de la luna. La magia se siente romántica, sutil y perfectamente integrada dentro de una fotografía realista.$t82c$,
  lighting_color = $t82d$Iluminación nocturna suave, dominada por la luz plateada de la luna llena y toques cálidos dorados de las rosas brillantes. Predominan tonos pastel: azul noche suave, dorado tenue, rosa pálido de las rosas y plateado lunar.$t82d$,
  poem_template = $t82e${NOMBRE_DESTINATARIO}, eres mi princesa soñada,
La que siempre había imaginada.
No llegué en caballo blanco,
Pero mi amor vale tanto.
Convertiste mi vida en cuento real,
Donde cada día es especial.
Eres mi final feliz y verdad,
Mi {APODO_DESTINATARIO}, mi princesa de verdad.$t82e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_2_Mi_Príncipe_Encantador_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t83a$Una única fotografía continua que fluye de lado a lado del lienzo. Tercera plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una guerrera ancestral de una tribu nórdica de las montañas, con dominio sobre las tormentas, en composición paralela a la Plantilla 3 masculina ("Mi Guerrero de las Tormentas"), muy distinta del vuelo urbano de la Plantilla 1 y el balcón romántico de la Plantilla 2. La escena transmite poder crudo y una conexión ancestral con la naturaleza, sin ninguna referencia a personajes de cómic o cine existentes.

{NOMBRE_DESTINATARIO} aparece de pie sobre una cima rocosa, vistiendo ropajes de cuero curtido y pieles gruesas, con brazaletes de bronce grabados con runas antiguas y pintura ritual tenue en los brazos. Sostiene con ambas manos un hacha ceremonial de doble filo con el mango de madera tallada y runas grabadas en la hoja. A su alrededor, nubes de tormenta densas y oscuras giran lentamente, iluminadas por relámpagos internos. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t83a$,
  background_details = $t83b$El cielo está dominado por nubes tormentosas oscuras que se abren parcialmente detrás de ella, dejando pasar haces de luz azulada. Rayos ocasionales cruzan el fondo, iluminando brevemente todo el encuadre. Piedras cubiertas de musgo y runas talladas asoman entre la niebla a sus pies.$t83b$,
  magic_effects = $t83c$Las runas grabadas en el hacha brillan con un tenue resplandor azul cuando un rayo cruza el cielo, como si respondieran al trueno. El viento agita con fuerza su cabello y las pieles de su vestimenta. La magia se siente ancestral, telúrica y perfectamente integrada dentro de una fotografía realista de estilo épico cinematográfico.$t83c$,
  lighting_color = $t83d$Iluminación dramática de tormenta, con destellos de rayos como fuente de luz intermitente y el resplandor azul tenue de las runas como acento ocasional. Predominan tonos azul eléctrico, plateado tormenta, gris piedra y marrón cuero.$t83d$,
  poem_template = $t83e${NOMBRE_DESTINATARIO}, eres mi guerrera del trueno,
Poderosa, fuerte y tan serena.
Tu presencia hace temblar mi ser,
Con tu fuerza me haces crecer.
No necesitas hacha ni rayo,
Tu amor es mi mejor ensayo.
Eres mi fuerza y mi realidad,
Mi {APODO_DESTINATARIO}, mi tempestad.$t83e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_3_Mi_Thor_Dios_del_Trueno_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t84a$Una única fotografía continua que fluye de lado a lado del lienzo. Cuarta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una caballera medieval victoriosa, en composición paralela a la Plantilla 4 masculina ("Mi Caballero de Armadura Brillante"), muy distinta del vuelo urbano, el balcón de castillo y la cima tormentosa ya usados. La escena transmite honor, valentía y devoción caballeresca.

{NOMBRE_DESTINATARIO} viste una armadura medieval brillante y pulida, de corte femenino, con reflejos plateados y dorados, sosteniendo en una mano una espada resplandeciente en alto y con la otra sujetando las riendas de un caballo blanco majestuoso a su lado. Detrás de ella ondea una bandera con un símbolo de corazón bordado. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t84a$,
  background_details = $t84b$Al fondo se extiende un campo tras una batalla ya ganada, con la luz dorada del atardecer iluminando la escena y transmitiendo una sensación de victoria serena, sin elementos violentos o gráficos explícitos.$t84b$,
  magic_effects = $t84c$La espada de {NOMBRE_DESTINATARIO} desprende un tenue resplandor plateado en el filo, y pequeñas partículas doradas flotan suavemente alrededor de la bandera del corazón, como si el honor mismo brillara. La magia se siente noble, cálida y perfectamente integrada dentro de una fotografía realista de estilo épico medieval.$t84c$,
  lighting_color = $t84d$Iluminación de atardecer dorada y cálida, con reflejos plateados brillantes en la armadura y la espada. Predominan tonos plateado brillante, dorado atardecer y blanco del caballo.$t84d$,
  poem_template = $t84e${NOMBRE_DESTINATARIO}, eres mi caballera leal,
Con armadura de amor celestial.
Luchas por mí sin descansar,
Tu honor me hace suspirar.
No necesitas espada ni escudo,
Tu corazón es mi refugio agudo.
Eres mi guerrera y mi verdad,
Mi {APODO_DESTINATARIO}, mi caballera de verdad.$t84e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t85a$Una única fotografía continua que fluye de lado a lado del lienzo. Quinta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una reina majestuosa en su salón del trono, en composición paralela a la Plantilla 5 masculina ("Mi Rey"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa y el campo de batalla ya usados. La escena transmite poder sereno y nobleza absoluta.

{NOMBRE_DESTINATARIO} está sentada en un trono dorado majestuoso, vistiendo un vestido real con detalles bordados en dorado y una corona brillante sobre su cabeza. Sostiene un cetro dorado en una mano, con postura erguida y expresión serena de autoridad. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t85a$,
  background_details = $t85b$El salón del trono tiene columnas doradas altas a ambos lados, con cortinas de terciopelo púrpura cayendo entre ellas. Un haz de luz cálida y divina desciende desde una abertura alta del techo, iluminando directamente a {NOMBRE_DESTINATARIO} en el trono.$t85b$,
  magic_effects = $t85c$La luz que cae sobre {NOMBRE_DESTINATARIO} tiene un tono dorado ligeramente sobrenatural, más intenso que la luz ambiental del salón. Pequeñas partículas doradas flotan suavemente dentro del haz de luz. La magia se siente solemne, majestuosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de realeza.$t85c$,
  lighting_color = $t85d$Iluminación de haz de luz divina cayendo desde arriba, contrastada con la penumbra cálida del salón. Predominan tonos dorado intenso, púrpura real y marrón oscuro de las columnas en sombra.$t85d$,
  poem_template = $t85e${NOMBRE_DESTINATARIO}, eres mi reina absoluta,
Quien gobierna mi corazón en bruto.
Tu reino es mi corazón entero,
Donde tú eres la heredera.
No necesitas trono ni corona,
Tu amor es quien me emociona.
Eres mi monarca y mi verdad,
Mi {APODO_DESTINATARIO}, mi reina de verdad.$t85e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_5_Mi_Rey_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t86a$Una única fotografía continua que fluye de lado a lado del lienzo. Sexta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como un ángel guardián flotando entre nubes, en composición paralela a la Plantilla 6 masculina ("Mi Ángel Guardián"), muy distinta del vuelo urbano de la Plantilla 1, el balcón de castillo, la cima tormentosa, el campo de batalla y el salón del trono ya usados.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada de forma asimétrica dentro del encuadre, ligeramente hacia uno de los dos lados del lienzo, no exactamente centrada en el centro, con sus alas desplegadas de forma orgánica y desigual (una más adelantada que la otra, ninguna simétricamente espejada). Las nubes y los rayos de luz divina deben fluir de forma irregular y natural de un lado al otro del encuadre, nunca como dos mitades idénticas o en espejo. Debe leerse inequívocamente como una única fotografía continua, no como dos paneles separados.

{NOMBRE_DESTINATARIO} flota suavemente entre nubes suaves y luminosas, con un par de alas de ángel blancas y brillantes desplegadas detrás de ella de forma orgánica y asimétrica. Viste ropa blanca elegante y sencilla. Una aureola dorada sutil, casi translúcida, flota levemente sobre su cabeza. Su expresión es serena y protectora, con la mirada dirigida ligeramente hacia abajo, como si vigilara algo fuera del encuadre. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t86a$,
  background_details = $t86b$Las nubes que la rodean son suaves y difuminadas, distribuidas de forma irregular por todo el encuadre, más densas hacia un lado y más dispersas hacia el otro, evitando cualquier simetría. Rayos de luz divina descienden en ángulo, no verticalmente centrados, atravesando las nubes de forma diagonal.$t86b$,
  magic_effects = $t86c$Pequeñas plumas luminosas se desprenden ocasionalmente de las alas de {NOMBRE_DESTINATARIO}, disolviéndose en motas de luz dorada antes de tocar las nubes. La aureola sobre su cabeza emite un resplandor dorado tenue y constante. La magia se siente serena, protectora y perfectamente integrada dentro de una fotografía realista.$t86c$,
  lighting_color = $t86d$Iluminación celestial suave, con los rayos de luz divina como fuente principal desde un ángulo diagonal. Predominan tonos blanco nube, dorado suave, azul cielo pastel y destellos plateados en las alas.$t86d$,
  poem_template = $t86e${NOMBRE_DESTINATARIO}, eres mi ángel guardián,
Quien cuida de mí sin afán.
Tus alas me protegen del mal,
Tu luz es mi guía celestial.
No necesitas cielo ni altar,
Tu amor me hace volar.
Eres mi protectora divina y real,
Mi {APODO_DESTINATARIO}, mi ángel celestial.$t86e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_6_Mi_Ángel_Guardián_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t87a$Una única fotografía continua que fluye de lado a lado del lienzo. Séptima plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una pirata moderna y elegante en la cubierta de su barco, en composición paralela a la Plantilla 7 masculina ("Mi Pirata Aventurero"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla, el salón del trono y el ángel guardián ya usados. La escena transmite libertad, aventura y espíritu rebelde.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con el barco y el mar extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} está de pie en la cubierta de un barco pirata majestuoso, vistiendo un abrigo elegante de corte aventurero, con un sombrero de ala ancha adornado con una pluma. En una mano sostiene una brújula dorada abierta, mirándola con determinación mientras el viento agita su abrigo y cabello. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t87a$,
  background_details = $t87b$Detrás de ella, el mar está agitado pero luminoso, con olas que reflejan destellos dorados del atardecer. A un costado de la cubierta, un cofre entreabierto deja ver un tesoro brillante de monedas y joyas doradas. El velamen del barco ondea con fuerza en el viento.$t87b$,
  magic_effects = $t87c$La aguja de la brújula dorada brilla con un tenue resplandor propio, señalando siempre hacia adelante sin importar el movimiento del barco. Pequeños destellos dorados se elevan brevemente del tesoro del cofre. La magia se siente aventurera, libre y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t87c$,
  lighting_color = $t87d$Iluminación de atardecer marino, con reflejos dorados intensos sobre el agua agitada. Predominan tonos azul marino profundo, dorado brillante del tesoro y la brújula, y gris tormenta suave en las nubes lejanas.$t87d$,
  poem_template = $t87e${NOMBRE_DESTINATARIO}, eres mi pirata valiente,
Quien navega mi corazón de frente.
Tu aventura es mi emoción,
Tu brújula marca mi dirección.
No necesitas barco ni tesoro,
Tu amor es mi mayor decoro.
Eres mi aventurera y mi verdad,
Mi {APODO_DESTINATARIO}, mi pirata de verdad.$t87e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_7_Mi_Pirata_Aventurero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t88a$Una única fotografía continua que fluye de lado a lado del lienzo. Octava plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una maga poderosa en su estudio arcano, en composición paralela a la Plantilla 8 masculina ("Mi Mago/Hechicero"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla, el salón del trono, el ángel guardián y la cubierta pirata ya usados. La escena transmite misterio, sabiduría y poder mágico genuino, sin evocar ningún personaje de franquicia existente.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con los libros flotantes y las ondas de hechizo distribuidos de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una túnica elegante de maga, oscura con símbolos arcanos bordados que brillan tenuemente en dorado. Sostiene una varita de madera tallada de la que emana una luz intensa y cálida en su punta, con ondas de energía doradas expandiéndose suavemente desde ella. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t88a$,
  background_details = $t88b$Alrededor de ella, varios libros antiguos flotan abiertos en el aire a distintas alturas, con sus páginas ondeando levemente aunque no hay viento. El entorno es un estudio arcano en penumbra, con estanterías repletas de libros y frascos apenas visibles en las sombras del fondo.$t88b$,
  magic_effects = $t88c$Las ondas de energía que salen de la varita se curvan y flotan lentamente antes de disolverse en motas de luz. Símbolos arcanos brillantes aparecen y desaparecen sutilmente en el aire cerca de los libros flotantes. La magia se siente profunda, misteriosa y perfectamente integrada dentro de una fotografía realista.$t88c$,
  lighting_color = $t88d$Iluminación tenue de estudio arcano, con la luz de la varita y las ondas doradas como fuentes principales contra un fondo en penumbra. Predominan tonos púrpura profundo, azul medianoche y dorado brillante de la magia.$t88d$,
  poem_template = $t88e${NOMBRE_DESTINATARIO}, eres mi maga especial,
Con hechizos de amor celestial.
Tu magia transforma mi ser,
Con tu poder me haces crecer.
No necesitas varita ni conjuro,
Tu amor es mi hechizo puro.
Eres mi hechicera y mi verdad,
Mi {APODO_DESTINATARIO}, mi maga de verdad.$t88e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_8_Mi_Mago_Hechicero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t89a$Una única fotografía continua que fluye de lado a lado del lienzo. Novena plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una guerrera espartana en un campo de batalla épico, en composición paralela a la Plantilla 9 masculina ("Mi Guerrero Protector"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata y el estudio arcano ya usados. La escena transmite fuerza, valentía y determinación, sin evocar ningún personaje o franquicia específica — una guerrera histórica genérica, no una película o cómic.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con el campo de batalla y el polvo extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece atlética y erguida, vistiendo una armadura de batalla de bronce con detalles de cuero, de corte femenino. Sostiene un escudo redondo con un símbolo de corazón grabado en el centro, y en la otra mano una espada corta en alto, en una pose de determinación victoriosa, sin violencia explícita. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t89a$,
  background_details = $t89b$El campo de batalla se extiende detrás de ella, ya en calma tras el combate, con polvo dorado suspendido en el aire iluminado por el sol bajo del atardecer. Estandartes de tela ondean lentamente a la distancia.$t89b$,
  magic_effects = $t89c$El símbolo de corazón grabado en el escudo desprende un tenue resplandor dorado, apenas perceptible, como si el verdadero motivo de su fuerza fuera el amor y no la guerra. Motas de polvo dorado flotan suspendidas en los rayos de sol. La magia se siente sutil, honorable y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t89c$,
  lighting_color = $t89d$Iluminación de atardecer intensa y cálida, con el sol bajo generando largas sombras y reflejos en la armadura de bronce. Predominan tonos bronce metálico, rojo tierra, dorado polvoriento y marrón cuero.$t89d$,
  poem_template = $t89e${NOMBRE_DESTINATARIO}, eres mi guerrera fiel,
Quien lucha por mí hasta el nivel.
Tu fuerza es mi protección,
Tu valor mi inspiración.
No necesitas batalla ni escudo,
Tu corazón es mi refugio agudo.
Eres mi protectora y mi verdad,
Mi {APODO_DESTINATARIO}, mi guerrera de verdad.$t89e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_9_Mi_Guerrero_Protector_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t90a$Una única fotografía continua que fluye de lado a lado del lienzo. Décima plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una estrella de rock en pleno concierto, en composición paralela a la Plantilla 10 masculina ("Mi Estrella de Rock"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano y el campo de batalla espartano ya usados. La escena transmite energía pura, carisma y pasión desbordante.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con la multitud y las luces del escenario distribuidas de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} está de pie en el borde de un escenario de concierto, con una guitarra eléctrica brillante en las manos, en plena pose de interpretación, con el cabello y la ropa en movimiento. Su expresión transmite pasión y carisma absoluto. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t90a$,
  background_details = $t90b$Detrás de ella, luces de escenario en tonos rojos y dorados cruzan el aire en haces definidos. Una multitud de siluetas emocionadas con los brazos en alto se extiende hacia el fondo, iluminada intermitentemente por fuegos artificiales que explotan en el cielo nocturno sobre el estadio.$t90b$,
  magic_effects = $t90c$Las cuerdas de la guitarra vibran con un tenue resplandor dorado al ser tocadas, dejando una estela luminosa breve en el aire con cada acorde. Pequeñas chispas doradas caen suavemente desde el mástil del instrumento. La magia se siente vibrante, contagiosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de concierto.$t90c$,
  lighting_color = $t90d$Iluminación de escenario dramática, con haces de luz roja y dorada cruzando el humo escénico, contrastados con destellos blancos de los fuegos artificiales. Predominan tonos rojo intenso, dorado brillante y negro profundo del fondo nocturno.$t90d$,
  poem_template = $t90e${NOMBRE_DESTINATARIO}, eres mi estrella brillante,
Quien hace mi vida emocionante.
Tu música llena mi corazón,
Tu ritmo es mi canción.
No necesitas escenario ni fama,
Tu amor es quien me llama.
Eres mi rockstar y mi verdad,
Mi {APODO_DESTINATARIO}, mi estrella de verdad.$t90e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_10_Mi_Estrella_de_Rock_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t91a$Una única fotografía continua que fluye de lado a lado del lienzo. Undécima plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una capitana de avión elegante en plena cabina, en composición paralela a la Plantilla 11 masculina ("Mi Capitán/Piloto"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano y el escenario de concierto ya usados. La escena transmite liderazgo sereno, dirección y aventura.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con la cabina y el cielo de nubes extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un uniforme de piloto impecable, con insignias doradas en los hombros y la gorra bajo el brazo. Está de pie junto a los controles de una cabina de avión moderna, con una mano apoyada en el marco de la ventanilla, mirando hacia el horizonte con expresión serena y segura. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t91a$,
  background_details = $t91b$A través de la ventanilla de la cabina se ve un mar de nubes doradas al atardecer, con el sol bajo tiñendo todo de tonos cálidos. Sobre el panel de mandos, un mapa antiguo y una brújula brillan sutilmente junto a los instrumentos modernos.$t91b$,
  magic_effects = $t91c$La aguja de la brújula sobre el panel gira lentamente por sí sola antes de estabilizarse, señalando siempre hacia adelante. Un tenue resplandor dorado recorre las líneas del mapa antiguo, como caminos que se iluminan brevemente. La magia se siente segura, orientadora y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de aviación.$t91c$,
  lighting_color = $t91d$Iluminación de atardecer cálida entrando por la ventanilla de la cabina, contrastada con las luces tenues y azuladas del panel de instrumentos. Predominan tonos azul cielo, dorado atardecer y blanco de las nubes.$t91d$,
  poem_template = $t91e${NOMBRE_DESTINATARIO}, eres mi capitana segura,
Quien guía mi rumbo más puro.
Tu dirección es mi destino,
Tu mapa mi camino.
No necesitas avión ni cielo,
Tu amor es mi mayor anhelo.
Eres mi piloto y mi verdad,
Mi {APODO_DESTINATARIO}, mi capitana de verdad.$t91e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_11_Mi_Capitán_Piloto_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t92a$Una única fotografía continua que fluye de lado a lado del lienzo. Duodécima plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una vikinga poderosa junto a su barco, en la orilla de un mar tormentoso, en composición paralela a la Plantilla 12 masculina ("Mi Vikingo Valiente"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa de la Plantilla 3 (montaña, hacha rúnica, tribu de montaña), el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto y la cabina de avión ya usados. A diferencia de la Plantilla 3, aquí el escenario es marítimo (costa y barco), no de montaña, y el arma es un hacha vikinga distinta con incrustaciones de plata.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con el barco vikingo y el mar tormentoso extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece atlética, vistiendo una armadura vikinga de cuero grueso y pieles sobre los hombros, de corte femenino, con tatuajes nórdicos que recorren sus brazos y brillan tenuemente con un tono azul plateado. Sostiene en una mano un hacha de guerra de doble filo con incrustaciones de plata en el mango, apoyada sobre su hombro. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t92a$,
  background_details = $t92b$Detrás de ella, un barco vikingo de proa tallada descansa varado en la orilla rocosa, con su vela recogida agitándose por el viento. El mar está agitado, con olas grises rompiendo contra las rocas bajo un cielo nublado y plateado.$t92b$,
  magic_effects = $t92c$Los tatuajes nórdicos en los brazos de {NOMBRE_DESTINATARIO} pulsan con un tenue resplandor azul plateado al ritmo de su respiración. Pequeñas gotas de espuma de mar que la salpican brillan brevemente como cristales antes de caer. La magia se siente ancestral, feroz y perfectamente integrada dentro de una fotografía realista de estilo épico nórdico.$t92c$,
  lighting_color = $t92d$Iluminación fría y dramática de un día nublado junto al mar, con reflejos plateados en el agua agitada. Predominan tonos gris tormenta, azul acero, plateado y marrón cuero.$t92d$,
  poem_template = $t92e${NOMBRE_DESTINATARIO}, eres mi vikinga feroz,
Valiente y fuerte como una voz.
Tu fuerza conquista mi corazón,
Tu valor mi admiración.
No necesitas hacha ni barco,
Tu amor es mi mejor marco.
Eres mi guerrera nórdica real,
Mi {APODO_DESTINATARIO}, mi vikinga celestial.$t92e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_12_Mi_Vikingo_Valiente_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t93a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimotercera plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una Julieta clásica con toque moderno, en un balcón renacentista nocturno, en composición paralela a la Plantilla 13 masculina ("Mi Romeo"), muy distinta del vuelo urbano, el balcón de castillo con luz pastel de la Plantilla 2, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión y la costa vikinga ya usados. A diferencia del balcón pastel y sereno de la Plantilla 2, esta escena es más pasionalmente dramática, con tonos rojos intensos y un gesto de anhelo activo (mano extendida) en vez de contemplación serena.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con las rosas rojas trepando de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un vestido elegante de inspiración renacentista con corte moderno, escote sencillo y una capa ligera sobre un hombro. Está de pie en un balcón de piedra tallada, con un brazo extendido hacia arriba y hacia un lado, como alcanzando hacia alguien fuera del encuadre, con expresión de anhelo apasionado. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t93a$,
  background_details = $t93b$Rosas rojas intensas y brillantes trepan por la baranda de piedra del balcón y las columnas cercanas. Detrás de ella, una luna llena de tono rojizo-dorado domina el cielo nocturno, con ventanas iluminadas de velas cálidas visibles más abajo, en un patio renacentista.$t93b$,
  magic_effects = $t93c$Pétalos sueltos de las rosas rojas flotan lentamente en el aire alrededor de {NOMBRE_DESTINATARIO}, atrapando la luz de la luna con un brillo casi rubí. Un tenue resplandor dorado rodea su mano extendida, como si el gesto mismo emanara pasión. La magia se siente intensa, romántica y perfectamente integrada dentro de una fotografía realista.$t93c$,
  lighting_color = $t93d$Iluminación nocturna cálida y dramática, con la luna rojiza-dorada y las velas del patio como fuentes de luz. Predominan tonos rojo intenso, dorado profundo y plateado en los reflejos de piedra.$t93d$,
  poem_template = $t93e${NOMBRE_DESTINATARIO}, eres mi Julieta eterna,
Mi amor más tierno e interno.
Tu pasión enciende mi ser,
Con tu amor puedo renacer.
No necesitas balcón ni rosa,
Tu amor es mi única cosa.
Eres mi amante y mi verdad,
Mi {APODO_DESTINATARIO}, mi Julieta de verdad.$t93e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_13_Mi_Romeo_Amante_Eterno_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t94a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimocuarta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una arquitecta creativa rodeada de planos flotantes, en composición paralela a la Plantilla 14 masculina ("Mi Arquitecto de Sueños"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga y el balcón renacentista ya usados. La escena transmite creatividad, visión de futuro y construcción de algo hermoso desde cero.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con los planos flotantes y los edificios en construcción distribuidos de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una camisa elegante con las mangas remangadas, sosteniendo un lápiz de diseño dorado con el que traza líneas en el aire frente a ella, como si dibujara directamente sobre la realidad. Su expresión es de concentración creativa y asombro ante lo que está creando. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t94a$,
  background_details = $t94b$Alrededor de ella flotan varios planos arquitectónicos brillantes y translúcidos, cuyas líneas azules se elevan y se transforman gradualmente en pequeños edificios y castillos tridimensionales hechos de luz, suspendidos en el aire como maquetas mágicas. El entorno de fondo es un cielo despejado al atardecer, sugiriendo un horizonte de posibilidades.$t94b$,
  magic_effects = $t94c$Las líneas de los planos brillan en azul eléctrico antes de solidificarse en estructuras doradas y blancas de luz. Pequeñas partículas doradas se desprenden del lápiz de {NOMBRE_DESTINATARIO} cada vez que traza una nueva línea. La magia se siente inspiradora, constructiva y perfectamente integrada dentro de una fotografía realista.$t94c$,
  lighting_color = $t94d$Iluminación cálida de atardecer combinada con el brillo azul eléctrico de los planos y el resplandor dorado de las estructuras completadas. Predominan tonos azul eléctrico, blanco luminoso y dorado cálido.$t94d$,
  poem_template = $t94e${NOMBRE_DESTINATARIO}, eres mi arquitecta ideal,
Quien construye mi vida especial.
Tus planos son mi futuro,
Tu diseño mi camino seguro.
No necesitas planos ni herramientas,
Tu amor construye mis cuentas.
Eres mi constructora y mi verdad,
Mi {APODO_DESTINATARIO}, mi arquitecta de verdad.$t94e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_14_Mi_Arquitecto_de_Sueños_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t95a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoquinta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una gladiadora romana en pleno instante de triunfo dentro del Coliseo, en composición paralela a la Plantilla 15 masculina ("Mi Gladiador"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano en calma (Plantilla 9), el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista y el estudio de arquitecto ya usados. A diferencia de la calma solitaria de la Plantilla 9, aquí la escena es un espectáculo público triunfal, con multitud aclamando.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con las gradas del Coliseo y la multitud extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece atlética, vistiendo una armadura de gladiadora romana bruñida con detalles dorados, de corte femenino, sosteniendo un escudo con un símbolo de victoria grabado y una espada corta en alto, en pose triunfal, sin violencia explícita. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t95a$,
  background_details = $t95b$Detrás de ella se alza la arena del Coliseo romano, con las gradas repletas de siluetas de una multitud aclamando con los brazos en alto. El cielo sobre el Coliseo tiene tonos cálidos de atardecer, con polvo dorado de la arena flotando en el aire.$t95b$,
  magic_effects = $t95c$El símbolo de victoria grabado en el escudo desprende un tenue resplandor dorado pulsante, como si la propia gloria del momento tomara forma de luz. Motas de polvo dorado de la arena flotan suspendidas, iluminadas por el sol. La magia se siente triunfal, gloriosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico romano.$t95c$,
  lighting_color = $t95d$Iluminación de atardecer intensa sobre la arena, con reflejos dorados y rojizos en la armadura bruñida. Predominan tonos dorado brillante, rojo intenso, bronce metálico y arena polvorienta.$t95d$,
  poem_template = $t95e${NOMBRE_DESTINATARIO}, eres mi gladiadora triunfante,
Fuerte, valiente y constante.
Tu victoria es mi orgullo,
Tu fuerza mi mejor arrullo.
No necesitas arena ni espada,
Tu amor es mi mejor jornada.
Eres mi campeona y mi verdad,
Mi {APODO_DESTINATARIO}, mi gladiadora de verdad.$t95e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_15_Mi_Gladiador_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t96a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimosexta plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una cowgirl elegante en el desierto del oeste americano al atardecer, en composición paralela a la Plantilla 16 masculina ("Mi Cowboy/Vaquero"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto y el Coliseo ya usados. La escena transmite libertad absoluta y espíritu aventurero.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con el paisaje desértico y el horizonte extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un atuendo de cowgirl elegante y moderno, con sombrero vaquero de ala ancha y un lazo enrollado colgado del hombro, de pie junto a un caballo majestuoso de pelaje brillante. Su expresión transmite calma y libertad, con la mirada puesta en el horizonte. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t96a$,
  background_details = $t96b$El paisaje del oeste americano se extiende detrás de ellas, con formaciones rocosas rojizas y arbustos secos recortados contra un cielo de atardecer en tonos naranja y dorado intensos. Polvo fino se levanta suavemente del suelo con la brisa.$t96b$,
  magic_effects = $t96c$El lazo que lleva {NOMBRE_DESTINATARIO} desprende un tenue brillo dorado en sus fibras, como si estuviera hecho de luz trenzada. Pequeñas partículas doradas de polvo del desierto flotan suspendidas en el aire, iluminadas por el sol bajo. La magia se siente libre, cálida y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico western.$t96c$,
  lighting_color = $t96d$Iluminación de atardecer intensa y cálida, con el sol bajo generando un contraluz dorado sobre las formaciones rocosas. Predominan tonos naranja del desierto, dorado intenso y marrón tierra.$t96d$,
  poem_template = $t96e${NOMBRE_DESTINATARIO}, eres mi vaquera valiente,
Libre, salvaje y consciente.
Tu espíritu es mi libertad,
Tu camino mi realidad.
No necesitas caballo ni desierto,
Tu amor es mi puerto.
Eres mi cowgirl y mi verdad,
Mi {APODO_DESTINATARIO}, mi vaquera de verdad.$t96e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_16_Mi_Cowboy_Vaquero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t97a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoséptima plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una guerrera samurái en un jardín zen con cerezos en flor, en composición paralela a la Plantilla 17 masculina ("Mi Samurái"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo y el desierto vaquero ya usados. La escena transmite honor, disciplina y serenidad marcial.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con los cerezos en flor y el jardín zen distribuidos de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una armadura tradicional de samurái elegante en tonos negros y rojos con detalles dorados, sosteniendo una katana envainada con ambas manos frente a ella, en una postura serena y respetuosa, con los ojos cerrados en un momento de calma antes o después del combate. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t97a$,
  background_details = $t97b$Un jardín zen japonés se extiende detrás de ella, con cerezos en plena floración cuyos pétalos rosados caen lentamente en el aire. Piedras lisas dispuestas cuidadosamente y un rastrillo de arena zen se distinguen parcialmente entre la vegetación cercana.$t97b$,
  magic_effects = $t97c$El filo de la katana, apenas visible en el borde de la vaina, desprende un tenue resplandor plateado. Los pétalos de cerezo que caen cerca de {NOMBRE_DESTINATARIO} brillan brevemente con un tono dorado rosado antes de posarse en el suelo. La magia se siente serena, honorable y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico japonés.$t97c$,
  lighting_color = $t97d$Iluminación suave y difusa de jardín, con luz natural filtrada entre los cerezos. Predominan tonos rojo intenso, negro profundo, dorado sutil y rosa pétalo.$t97d$,
  poem_template = $t97e${NOMBRE_DESTINATARIO}, eres mi samurái leal,
Con honor y disciplina celestial.
Tu espada protege mi corazón,
Tu código mi admiración.
No necesitas katana ni armadura,
Tu amor es mi mejoradura.
Eres mi guerrera honorable y real,
Mi {APODO_DESTINATARIO}, mi samurái celestial.$t97e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_17_Mi_Samurai_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t98a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoctava plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una astronauta exploradora flotando en el espacio profundo, en composición paralela a la Plantilla 18 masculina ("Mi Astronauta/Explorador Espacial"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero y el jardín zen ya usados. La escena transmite exploración infinita y asombro visionario.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con las galaxias, planetas y la nave espacial distribuidos de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un traje espacial elegante y moderno, con el casco bajo el brazo o con visor transparente que deja ver su rostro con claridad, flotando suavemente en gravedad cero con una postura relajada y contemplativa. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t98a$,
  background_details = $t98b$A su alrededor se extiende el espacio profundo, con galaxias espirales brillantes en tonos púrpura y azul, planetas coloridos de distintos tamaños visibles a la distancia, y una nave espacial elegante y moderna flotando más atrás, parcialmente iluminada por la luz de una estrella cercana.$t98b$,
  magic_effects = $t98c$Pequeñas partículas de polvo estelar brillante flotan alrededor de {NOMBRE_DESTINATARIO}, algunas formando brevemente constelaciones reconocibles antes de dispersarse. El visor de su casco refleja tenuemente los colores de las galaxias cercanas. La magia se siente vasta, serena y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico espacial.$t98c$,
  lighting_color = $t98d$Iluminación cósmica, con el brillo de las galaxias y estrellas lejanas como fuentes de luz principales contra el negro profundo del espacio. Predominan tonos azul profundo, púrpura cósmico y destellos plateados de estrellas.$t98d$,
  poem_template = $t98e${NOMBRE_DESTINATARIO}, eres mi astronauta soñadora,
Quien explora mi amor interior.
Tu universo es mi infinito,
Tu viaje mi mejor mito.
No necesitas nave ni galaxia,
Tu amor es mi mejor gracia.
Eres mi exploradora y mi verdad,
Mi {APODO_DESTINATARIO}, mi astronauta de verdad.$t98e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_18_Mi_Astronauta_Explorador_Espacial_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t99a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimonovena plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como una titánide mitológica de escala monumental, de pie entre montañas, en composición paralela a la Plantilla 19 masculina ("Mi Titán"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero, el jardín zen y el espacio profundo ya usados. La escena transmite poder ancestral y una escala monumental, sobrehumana.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con la cordillera de montañas y el cielo cósmico extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} (rostro fotorrealista basado en fotografía real, a escala titánica) aparece de pie, de tamaño colosal, con energía cósmica dorada y azul brillando bajo su piel y emanando en suaves volutas desde sus hombros y brazos. Su postura es serena pero imponente, con una mano apoyada sobre la cresta de una montaña como si fuera del tamaño de una roca cualquiera para ella. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t99a$,
  background_details = $t99b$A sus pies se extiende una cordillera completa de picos nevados, diminuta en comparación con su figura. El cielo detrás de ella mezcla un atardecer dorado en el horizonte con un fondo cósmico estrellado en las alturas, sugiriendo que su presencia trasciende lo terrenal.$t99b$,
  magic_effects = $t99c$La energía cósmica que recorre su piel pulsa lentamente entre tonos dorados y azules, iluminando tenuemente las nubes cercanas a su cuerpo. Pequeños relámpagos de energía saltan ocasionalmente entre sus dedos sin causar daño alguno. La magia se siente monumental, ancestral y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico mitológico.$t99c$,
  lighting_color = $t99d$Iluminación mixta entre el cálido atardecer terrenal y el frío resplandor cósmico de fondo. Predominan tonos dorado intenso, azul profundo cósmico y blanco de las cumbres nevadas.$t99d$,
  poem_template = $t99e${NOMBRE_DESTINATARIO}, eres mi titánide poderosa,
Fuerte, grande y majestuosa.
Tu fuerza mueve mi mundo entero,
Tu poder es mi compañero.
No necesitas montañas ni cielo,
Tu amor es mi mayor anhelo.
Eres mi gigante y mi verdad,
Mi {APODO_DESTINATARIO}, mi titánide de verdad.$t99e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_19_Mi_Titan_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t100a$Una única fotografía continua que fluye de lado a lado del lienzo. Última plantilla del libro Mi Amor, versión de arquetipos femeninos: {NOMBRE_DESTINATARIO} representada como un fénix renaciendo de las llamas, en composición paralela a la Plantilla 20 masculina ("Mi Fénix"), muy distinta del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero, el jardín zen, el espacio profundo y la escala titánica ya usados. Como cierre del libro, la escena transmite transformación y resiliencia: la certeza de que el amor puede renacer de cualquier caída.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionada hacia uno de los lados del encuadre, no exactamente centrada sobre el centro del lienzo, con las llamas y las alas de fuego extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} emerge de un remolino de llamas doradas y anaranjadas brillantes, con un par de alas hechas de fuego mágico desplegándose orgánicamente detrás de ella, de forma asimétrica. Su expresión transmite fuerza serena y determinación renovada, con los brazos parcialmente envueltos en el resplandor cálido de las llamas sin quemarse. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t100a$,
  background_details = $t100b$Alrededor de ella, cenizas oscuras se elevan lentamente desde el suelo y, al ascender, se transforman gradualmente en pequeñas motas de luz dorada brillante antes de disolverse en el aire. El fondo es oscuro y desenfocado, permitiendo que el resplandor de las llamas y las alas de fuego sean el centro absoluto de la composición.$t100b$,
  magic_effects = $t100c$Las alas de fuego ondulan como tela líquida, con destellos rojos, naranjas y dorados entremezclándose en sus bordes. Pequeñas chispas se desprenden de las plumas de fuego y flotan brevemente antes de apagarse. La magia se siente transformadora, poderosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t100c$,
  lighting_color = $t100d$Iluminación cálida e intensa proveniente de las llamas y las alas de fuego, contrastada con la oscuridad del fondo. Predominan tonos naranja intenso, dorado brillante y rojo profundo.$t100d$,
  poem_template = $t100e${NOMBRE_DESTINATARIO}, eres mi fénix eterna,
Quien renace en mi invierno.
Tu fuerza me transforma cada día,
Tu fuego es mi guía.
No necesitas llamas ni cenizas,
Tu amor son mis divisas.
Eres mi renacer y mi verdad,
Mi {APODO_DESTINATARIO}, mi fénix de verdad.$t100e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t101a$Una única fotografía continua que fluye de lado a lado del lienzo. Primera plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un superhéroe épico y elegante, en pleno vuelo sobre una ciudad al atardecer.

{NOMBRE_DESTINATARIO} viste un traje de superhéroe elegante y moderno en tonos azul profundo y dorado, con detalles metálicos sutiles. Su capa ondea dramáticamente al viento mientras vuela en una pose dinámica y poderosa sobre el perfil de una ciudad. De su pecho emanan rayos de luz dorada, como si su propio corazón fuera la fuente de su poder. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t101a$,
  background_details = $t101b$La ciudad se extiende debajo, con rascacielos iluminados por la luz cálida del atardecer, el cielo en tonos naranja, púrpura y dorado. Nubes dispersas reflejan los colores del ocaso.$t101b$,
  magic_effects = $t101c$Los rayos de luz dorada del pecho de {NOMBRE_DESTINATARIO} se extienden brevemente hacia el cielo antes de disiparse en partículas brillantes. El borde de su capa deja una estela luminosa sutil al moverse con el viento. La magia se siente épica, poderosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico, con acabado moderno de cómic.$t101c$,
  lighting_color = $t101d$Iluminación de atardecer dramática y cinematográfica, con el resplandor dorado del pecho de {NOMBRE_DESTINATARIO} como acento de luz adicional. Predominan tonos azul profundo, dorado brillante, naranja atardecer y púrpura crepuscular.$t101d$,
  poem_template = $t101e${NOMBRE_DESTINATARIO}, eres mi superhéroe real,
Con poderes que no son de manual.
No necesitas capa ni disfraz,
Tu amor es tu superpoder más.
Me salvas cada día sin saber,
Con tu fuerza me haces renacer.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi héroe de verdad.$t101e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t102a$Una única fotografía continua que fluye de lado a lado del lienzo. Segunda plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un príncipe elegante en el balcón de un castillo mágico bajo la luna llena, muy distinto del vuelo urbano al atardecer de la Plantilla 1.

{NOMBRE_DESTINATARIO} viste un traje real elegante con detalles dorados bordados, una corona brillante y sencilla sobre su cabeza. Está de pie en el balcón de un castillo de cuento de hadas, con una mano apoyada suavemente sobre la baranda de piedra tallada, mirando hacia el horizonte con expresión serena y romántica. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t102a$,
  background_details = $t102b$Rosas brillantes y luminosas trepan por la baranda y las columnas del balcón. Detrás de él, una luna llena enorme ilumina el cielo nocturno, con el castillo extendiéndose en torres suaves hacia los lados.$t102b$,
  magic_effects = $t102c$Pequeñas partículas doradas, como polvo de hadas, flotan suavemente alrededor de las rosas y de la corona de {NOMBRE_DESTINATARIO}, brillando tenuemente bajo la luz de la luna. La magia se siente romántica, sutil y perfectamente integrada dentro de una fotografía realista.$t102c$,
  lighting_color = $t102d$Iluminación nocturna suave, dominada por la luz plateada de la luna llena y toques cálidos dorados de las rosas brillantes. Predominan tonos pastel: azul noche suave, dorado tenue, rosa pálido de las rosas y plateado lunar.$t102d$,
  poem_template = $t102e${NOMBRE_DESTINATARIO}, eres mi príncipe soñado,
El que siempre había imaginado.
No llegaste en caballo blanco,
Pero tu amor vale tanto.
Convertiste mi vida en cuento real,
Donde cada día es especial.
Eres mi final feliz y verdad,
Mi {APODO_DESTINATARIO}, mi príncipe de verdad.$t102e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_2_Mi_Príncipe_Encantador_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t103a$Una única fotografía continua que fluye de lado a lado del lienzo. Tercera plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un guerrero ancestral de una tribu nórdica de las montañas, con dominio sobre las tormentas, muy distinto del vuelo urbano de la Plantilla 1 y el balcón romántico de la Plantilla 2. La escena transmite poder crudo y una conexión ancestral con la naturaleza, sin ninguna referencia a personajes de cómic o cine existentes.

{NOMBRE_DESTINATARIO} aparece de pie sobre una cima rocosa, vistiendo ropajes de cuero curtido y pieles gruesas, con brazaletes de bronce grabados con runas antiguas y pintura ritual tenue en los brazos. Sostiene con ambas manos un hacha ceremonial de doble filo con el mango de madera tallada y runas grabadas en la hoja. A su alrededor, nubes de tormenta densas y oscuras giran lentamente, iluminadas por relámpagos internos. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t103a$,
  background_details = $t103b$El cielo está dominado por nubes tormentosas oscuras que se abren parcialmente detrás de él, dejando pasar haces de luz azulada. Rayos ocasionales cruzan el fondo, iluminando brevemente todo el encuadre. Piedras cubiertas de musgo y runas talladas asoman entre la niebla a sus pies.$t103b$,
  magic_effects = $t103c$Las runas grabadas en el hacha brillan con un tenue resplandor azul cuando un rayo cruza el cielo, como si respondieran al trueno. El viento agita con fuerza su cabello y las pieles de su vestimenta. La magia se siente ancestral, telúrica y perfectamente integrada dentro de una fotografía realista de estilo épico cinematográfico.$t103c$,
  lighting_color = $t103d$Iluminación dramática de tormenta, con destellos de rayos como fuente de luz intermitente y el resplandor azul tenue de las runas como acento ocasional. Predominan tonos azul eléctrico, plateado tormenta, gris piedra y marrón cuero.$t103d$,
  poem_template = $t103e${NOMBRE_DESTINATARIO}, eres mi guerrero del trueno,
Poderoso, fuerte y tan sereno.
Tu presencia hace temblar mi ser,
Con tu fuerza me haces crecer.
No necesitas hacha ni rayo,
Tu amor es mi mejor ensayo.
Eres mi fuerza y mi realidad,
Mi {APODO_DESTINATARIO}, mi tempestad.$t103e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_3_Mi_Thor_Dios_del_Trueno_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t104a$Una única fotografía continua que fluye de lado a lado del lienzo. Cuarta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un caballero medieval victorioso, muy distinto del vuelo urbano, el balcón de castillo y la cima tormentosa ya usados. La escena transmite honor, valentía y devoción caballeresca.

{NOMBRE_DESTINATARIO} viste una armadura medieval brillante y pulida, con reflejos plateados y dorados, sosteniendo en una mano una espada resplandeciente en alto y con la otra sujetando las riendas de un caballo blanco majestuoso a su lado. Detrás de él ondea una bandera con un símbolo de corazón bordado. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t104a$,
  background_details = $t104b$Al fondo se extiende un campo tras una batalla ya ganada, con la luz dorada del atardecer iluminando la escena y transmitiendo una sensación de victoria serena, sin elementos violentos o gráficos explícitos.$t104b$,
  magic_effects = $t104c$La espada de {NOMBRE_DESTINATARIO} desprende un tenue resplandor plateado en el filo, y pequeñas partículas doradas flotan suavemente alrededor de la bandera del corazón, como si el honor mismo brillara. La magia se siente noble, cálida y perfectamente integrada dentro de una fotografía realista de estilo épico medieval.$t104c$,
  lighting_color = $t104d$Iluminación de atardecer dorada y cálida, con reflejos plateados brillantes en la armadura y la espada. Predominan tonos plateado brillante, dorado atardecer y blanco del caballo.$t104d$,
  poem_template = $t104e${NOMBRE_DESTINATARIO}, eres mi caballero leal,
Con armadura de amor celestial.
Luchas por mí sin descansar,
Tu honor me hace suspirar.
No necesitas espada ni escudo,
Tu corazón es mi refugio agudo.
Eres mi guerrero y mi verdad,
Mi {APODO_DESTINATARIO}, mi caballero de verdad.$t104e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t105a$Una única fotografía continua que fluye de lado a lado del lienzo. Quinta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un rey majestuoso en su salón del trono, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa y el campo de batalla ya usados. La escena transmite poder sereno y nobleza absoluta.

{NOMBRE_DESTINATARIO} está sentado en un trono dorado majestuoso, vistiendo una túnica real con detalles bordados en dorado y una corona brillante sobre su cabeza. Sostiene un cetro dorado en una mano, con postura erguida y expresión serena de autoridad. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t105a$,
  background_details = $t105b$El salón del trono tiene columnas doradas altas a ambos lados, con cortinas de terciopelo púrpura cayendo entre ellas. Un haz de luz cálida y divina desciende desde una abertura alta del techo, iluminando directamente a {NOMBRE_DESTINATARIO} en el trono.$t105b$,
  magic_effects = $t105c$La luz que cae sobre {NOMBRE_DESTINATARIO} tiene un tono dorado ligeramente sobrenatural, más intenso que la luz ambiental del salón. Pequeñas partículas doradas flotan suavemente dentro del haz de luz. La magia se siente solemne, majestuosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de realeza.$t105c$,
  lighting_color = $t105d$Iluminación de haz de luz divina cayendo desde arriba, contrastada con la penumbra cálida del salón. Predominan tonos dorado intenso, púrpura real y marrón oscuro de las columnas en sombra.$t105d$,
  poem_template = $t105e${NOMBRE_DESTINATARIO}, eres mi rey absoluto,
Quien gobierna mi corazón en bruto.
Tu reino es mi corazón entero,
Donde tú eres el heredero.
No necesitas trono ni corona,
Tu amor es quien me emociona.
Eres mi monarca y mi verdad,
Mi {APODO_DESTINATARIO}, mi rey de verdad.$t105e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_5_Mi_Rey_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t106a$Una única fotografía continua que fluye de lado a lado del lienzo. Sexta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un ángel guardián flotando entre nubes, muy distinto del vuelo urbano de la Plantilla 1, el balcón de castillo, la cima tormentosa, el campo de batalla y el salón del trono ya usados.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado de forma asimétrica dentro del encuadre, ligeramente hacia uno de los dos lados del lienzo, no exactamente centrado en el centro, con sus alas desplegadas de forma orgánica y desigual (una más adelantada que la otra, ninguna simétricamente espejada). Las nubes y los rayos de luz divina deben fluir de forma irregular y natural de un lado al otro del encuadre, nunca como dos mitades idénticas o en espejo. Debe leerse inequívocamente como una única fotografía continua, no como dos paneles separados.

{NOMBRE_DESTINATARIO} flota suavemente entre nubes suaves y luminosas, con un par de alas de ángel blancas y brillantes desplegadas detrás de él de forma orgánica y asimétrica. Viste ropa blanca elegante y sencilla. Una aureola dorada sutil, casi translúcida, flota levemente sobre su cabeza. Su expresión es serena y protectora, con la mirada dirigida ligeramente hacia abajo, como si vigilara algo fuera del encuadre. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t106a$,
  background_details = $t106b$Las nubes que lo rodean son suaves y difuminadas, distribuidas de forma irregular por todo el encuadre, más densas hacia un lado y más dispersas hacia el otro, evitando cualquier simetría. Rayos de luz divina descienden en ángulo, no verticalmente centrados, atravesando las nubes de forma diagonal.$t106b$,
  magic_effects = $t106c$Pequeñas plumas luminosas se desprenden ocasionalmente de las alas de {NOMBRE_DESTINATARIO}, disolviéndose en motas de luz dorada antes de tocar las nubes. La aureola sobre su cabeza emite un resplandor dorado tenue y constante. La magia se siente serena, protectora y perfectamente integrada dentro de una fotografía realista.$t106c$,
  lighting_color = $t106d$Iluminación celestial suave, con los rayos de luz divina como fuente principal desde un ángulo diagonal. Predominan tonos blanco nube, dorado suave, azul cielo pastel y destellos plateados en las alas.$t106d$,
  poem_template = $t106e${NOMBRE_DESTINATARIO}, eres mi ángel guardián,
Quien cuida de mí sin afán.
Tus alas me protegen del mal,
Tu luz es mi guía celestial.
No necesitas cielo ni altar,
Tu amor me hace volar.
Eres mi protector divino y real,
Mi {APODO_DESTINATARIO}, mi ángel celestial.$t106e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_6_Mi_Ángel_Guardián_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t107a$Una única fotografía continua que fluye de lado a lado del lienzo. Séptima plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un pirata moderno y elegante en la cubierta de su barco, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla, el salón del trono y el ángel guardián ya usados. La escena transmite libertad, aventura y espíritu rebelde.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con el barco y el mar extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} está de pie en la cubierta de un barco pirata majestuoso, vistiendo un abrigo elegante de corte aventurero, con un sombrero de ala ancha adornado con una pluma. En una mano sostiene una brújula dorada abierta, mirándola con determinación mientras el viento agita su abrigo y cabello. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t107a$,
  background_details = $t107b$Detrás de él, el mar está agitado pero luminoso, con olas que reflejan destellos dorados del atardecer. A un costado de la cubierta, un cofre entreabierto deja ver un tesoro brillante de monedas y joyas doradas. El velamen del barco ondea con fuerza en el viento.$t107b$,
  magic_effects = $t107c$La aguja de la brújula dorada brilla con un tenue resplandor propio, señalando siempre hacia adelante sin importar el movimiento del barco. Pequeños destellos dorados se elevan brevemente del tesoro del cofre. La magia se siente aventurera, libre y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t107c$,
  lighting_color = $t107d$Iluminación de atardecer marino, con reflejos dorados intensos sobre el agua agitada. Predominan tonos azul marino profundo, dorado brillante del tesoro y la brújula, y gris tormenta suave en las nubes lejanas.$t107d$,
  poem_template = $t107e${NOMBRE_DESTINATARIO}, eres mi pirata valiente,
Quien navega mi corazón de frente.
Tu aventura es mi emoción,
Tu brújula marca mi dirección.
No necesitas barco ni tesoro,
Tu amor es mi mayor decoro.
Eres mi aventurero y mi verdad,
Mi {APODO_DESTINATARIO}, mi pirata de verdad.$t107e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_7_Mi_Pirata_Aventurero_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t108a$Una única fotografía continua que fluye de lado a lado del lienzo. Octava plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un mago poderoso en su estudio arcano, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla, el salón del trono, el ángel guardián y la cubierta pirata ya usados. La escena transmite misterio, sabiduría y poder mágico genuino, sin evocar ningún personaje de franquicia existente.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con los libros flotantes y las ondas de hechizo distribuidos de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una túnica elegante de mago, oscura con símbolos arcanos bordados que brillan tenuemente en dorado. Sostiene una varita de madera tallada de la que emana una luz intensa y cálida en su punta, con ondas de energía doradas expandiéndose suavemente desde ella. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t108a$,
  background_details = $t108b$Alrededor de él, varios libros antiguos flotan abiertos en el aire a distintas alturas, con sus páginas ondeando levemente aunque no hay viento. El entorno es un estudio arcano en penumbra, con estanterías repletas de libros y frascos apenas visibles en las sombras del fondo.$t108b$,
  magic_effects = $t108c$Las ondas de energía que salen de la varita se curvan y flotan lentamente antes de disolverse en motas de luz. Símbolos arcanos brillantes aparecen y desaparecen sutilmente en el aire cerca de los libros flotantes. La magia se siente profunda, misteriosa y perfectamente integrada dentro de una fotografía realista.$t108c$,
  lighting_color = $t108d$Iluminación tenue de estudio arcano, con la luz de la varita y las ondas doradas como fuentes principales contra un fondo en penumbra. Predominan tonos púrpura profundo, azul medianoche y dorado brillante de la magia.$t108d$,
  poem_template = $t108e${NOMBRE_DESTINATARIO}, eres mi mago especial,
Con hechizos de amor celestial.
Tu magia transforma mi ser,
Con tu poder me haces crecer.
No necesitas varita ni conjuro,
Tu amor es mi hechizo puro.
Eres mi hechicero y mi verdad,
Mi {APODO_DESTINATARIO}, mi mago de verdad.$t108e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_8_Mi_Mago_Hechicero_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t109a$Una única fotografía continua que fluye de lado a lado del lienzo. Novena plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un guerrero espartano en un campo de batalla épico, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata y el estudio arcano ya usados. La escena transmite fuerza bruta, valentía y determinación, sin evocar ningún personaje o franquicia específica — un guerrero histórico genérico, no una película o cómic.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con el campo de batalla y el polvo extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece con el torso musculoso y definido, vistiendo una armadura de batalla de bronce con detalles de cuero, un casco simple bajo el brazo o sobre la cabeza. Sostiene un escudo redondo con un símbolo de corazón grabado en el centro, y en la otra mano una espada corta en alto, en una pose de determinación victoriosa, sin violencia explícita. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t109a$,
  background_details = $t109b$El campo de batalla se extiende detrás de él, ya en calma tras el combate, con polvo dorado suspendido en el aire iluminado por el sol bajo del atardecer. Estandartes de tela ondean lentamente a la distancia.$t109b$,
  magic_effects = $t109c$El símbolo de corazón grabado en el escudo desprende un tenue resplandor dorado, apenas perceptible, como si el verdadero motivo de su fuerza fuera el amor y no la guerra. Motas de polvo dorado flotan suspendidas en los rayos de sol. La magia se siente sutil, honorable y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t109c$,
  lighting_color = $t109d$Iluminación de atardecer intensa y cálida, con el sol bajo generando largas sombras y reflejos en la armadura de bronce. Predominan tonos bronce metálico, rojo tierra, dorado polvoriento y marrón cuero.$t109d$,
  poem_template = $t109e${NOMBRE_DESTINATARIO}, eres mi guerrero fiel,
Quien lucha por mí hasta el nivel.
Tu fuerza es mi protección,
Tu valor mi inspiración.
No necesitas batalla ni escudo,
Tu corazón es mi refugio agudo.
Eres mi protector y mi verdad,
Mi {APODO_DESTINATARIO}, mi guerrero de verdad.$t109e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_9_Mi_Guerrero_Protector_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t110a$Una única fotografía continua que fluye de lado a lado del lienzo. Décima plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como una estrella de rock en pleno concierto, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano y el campo de batalla espartano ya usados. La escena transmite energía pura, carisma y pasión desbordante.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con la multitud y las luces del escenario distribuidas de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} está de pie en el borde de un escenario de concierto, con una guitarra eléctrica brillante en las manos, en plena pose de interpretación, con el cabello y la ropa en movimiento. Su expresión transmite pasión y carisma absoluto. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t110a$,
  background_details = $t110b$Detrás de él, luces de escenario en tonos rojos y dorados cruzan el aire en haces definidos. Una multitud de siluetas emocionadas con los brazos en alto se extiende hacia el fondo, iluminada intermitentemente por fuegos artificiales que explotan en el cielo nocturno sobre el estadio.$t110b$,
  magic_effects = $t110c$Las cuerdas de la guitarra vibran con un tenue resplandor dorado al ser tocadas, dejando una estela luminosa breve en el aire con cada acorde. Pequeñas chispas doradas caen suavemente desde el mástil del instrumento. La magia se siente vibrante, contagiosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de concierto.$t110c$,
  lighting_color = $t110d$Iluminación de escenario dramática, con haces de luz roja y dorada cruzando el humo escénico, contrastados con destellos blancos de los fuegos artificiales. Predominan tonos rojo intenso, dorado brillante y negro profundo del fondo nocturno.$t110d$,
  poem_template = $t110e${NOMBRE_DESTINATARIO}, eres mi estrella brillante,
Quien hace mi vida emocionante.
Tu música llena mi corazón,
Tu ritmo es mi canción.
No necesitas escenario ni fama,
Tu amor es quien me llama.
Eres mi rockstar y mi verdad,
Mi {APODO_DESTINATARIO}, mi estrella de verdad.$t110e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_10_Mi_Estrella_de_Rock_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t111a$Una única fotografía continua que fluye de lado a lado del lienzo. Undécima plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un capitán de avión elegante en plena cabina, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano y el escenario de concierto ya usados. La escena transmite liderazgo sereno, dirección y aventura.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con la cabina y el cielo de nubes extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un uniforme de piloto impecable, con insignias doradas en los hombros y la gorra bajo el brazo. Está de pie junto a los controles de una cabina de avión moderna, con una mano apoyada en el marco de la ventanilla, mirando hacia el horizonte con expresión serena y segura. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t111a$,
  background_details = $t111b$A través de la ventanilla de la cabina se ve un mar de nubes doradas al atardecer, con el sol bajo tiñendo todo de tonos cálidos. Sobre el panel de mandos, un mapa antiguo y una brújula brillan sutilmente junto a los instrumentos modernos.$t111b$,
  magic_effects = $t111c$La aguja de la brújula sobre el panel gira lentamente por sí sola antes de estabilizarse, señalando siempre hacia adelante. Un tenue resplandor dorado recorre las líneas del mapa antiguo, como caminos que se iluminan brevemente. La magia se siente segura, orientadora y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico de aviación.$t111c$,
  lighting_color = $t111d$Iluminación de atardecer cálida entrando por la ventanilla de la cabina, contrastada con las luces tenues y azuladas del panel de instrumentos. Predominan tonos azul cielo, dorado atardecer y blanco de las nubes.$t111d$,
  poem_template = $t111e${NOMBRE_DESTINATARIO}, eres mi capitán seguro,
Quien guía mi rumbo más puro.
Tu dirección es mi destino,
Tu mapa mi camino.
No necesitas avión ni cielo,
Tu amor es mi mayor anhelo.
Eres mi piloto y mi verdad,
Mi {APODO_DESTINATARIO}, mi capitán de verdad.$t111e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_11_Mi_Capitán_Piloto_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t112a$Una única fotografía continua que fluye de lado a lado del lienzo. Duodécima plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un vikingo poderoso junto a su barco, en la orilla de un mar tormentoso, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa de la Plantilla 3 (montaña, hacha rúnica, tribu de montaña), el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto y la cabina de avión ya usados. A diferencia de la Plantilla 3, aquí el escenario es marítimo (costa y barco), no de montaña, y el arma es un hacha vikinga distinta con incrustaciones de plata.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con el barco vikingo y el mar tormentoso extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece musculoso, vistiendo una armadura vikinga de cuero grueso y pieles sobre los hombros, con tatuajes nórdicos que recorren sus brazos y brillan tenuemente con un tono azul plateado. Sostiene en una mano un hacha de guerra de doble filo con incrustaciones de plata en el mango, apoyada sobre su hombro. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t112a$,
  background_details = $t112b$Detrás de él, un barco vikingo de proa tallada descansa varado en la orilla rocosa, con su vela recogida agitándose por el viento. El mar está agitado, con olas grises rompiendo contra las rocas bajo un cielo nublado y plateado.$t112b$,
  magic_effects = $t112c$Los tatuajes nórdicos en los brazos de {NOMBRE_DESTINATARIO} pulsan con un tenue resplandor azul plateado al ritmo de su respiración. Pequeñas gotas de espuma de mar que lo salpican brillan brevemente como cristales antes de caer. La magia se siente ancestral, feroz y perfectamente integrada dentro de una fotografía realista de estilo épico nórdico.$t112c$,
  lighting_color = $t112d$Iluminación fría y dramática de un día nublado junto al mar, con reflejos plateados en el agua agitada. Predominan tonos gris tormenta, azul acero, plateado y marrón cuero.$t112d$,
  poem_template = $t112e${NOMBRE_DESTINATARIO}, eres mi vikingo feroz,
Valiente y fuerte como una voz.
Tu fuerza conquista mi corazón,
Tu valor mi admiración.
No necesitas hacha ni barco,
Tu amor es mi mejor marco.
Eres mi guerrero nórdico real,
Mi {APODO_DESTINATARIO}, mi vikingo celestial.$t112e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_12_Mi_Vikingo_Valiente_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t113a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimotercera plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un Romeo clásico con toque moderno, en un balcón renacentista nocturno, muy distinto del vuelo urbano, el balcón de castillo con luz pastel de la Plantilla 2, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión y la costa vikinga ya usados. A diferencia del balcón pastel y sereno de la Plantilla 2, esta escena es más pasionalmente dramática, con tonos rojos intensos y un gesto de anhelo activo (mano extendida) en vez de contemplación serena.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con las rosas rojas trepando de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un traje elegante de inspiración renacentista con corte moderno, camisa entreabierta y capa corta sobre un hombro. Está de pie en un balcón de piedra tallada, con un brazo extendido hacia arriba y hacia un lado, como alcanzando hacia alguien fuera del encuadre, con expresión de anhelo apasionado. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t113a$,
  background_details = $t113b$Rosas rojas intensas y brillantes trepan por la baranda de piedra del balcón y las columnas cercanas. Detrás de él, una luna llena de tono rojizo-dorado domina el cielo nocturno, con ventanas iluminadas de velas cálidas visibles más abajo, en un patio renacentista.$t113b$,
  magic_effects = $t113c$Pétalos sueltos de las rosas rojas flotan lentamente en el aire alrededor de {NOMBRE_DESTINATARIO}, atrapando la luz de la luna con un brillo casi rubí. Un tenue resplandor dorado rodea su mano extendida, como si el gesto mismo emanara pasión. La magia se siente intensa, romántica y perfectamente integrada dentro de una fotografía realista.$t113c$,
  lighting_color = $t113d$Iluminación nocturna cálida y dramática, con la luna rojiza-dorada y las velas del patio como fuentes de luz. Predominan tonos rojo intenso, dorado profundo y plateado en los reflejos de piedra.$t113d$,
  poem_template = $t113e${NOMBRE_DESTINATARIO}, eres mi Romeo eterno,
Mi amor más tierno e interno.
Tu pasión enciende mi ser,
Con tu amor puedo renacer.
No necesitas balcón ni rosa,
Tu amor es mi única cosa.
Eres mi amante y mi verdad,
Mi {APODO_DESTINATARIO}, mi Romeo de verdad.$t113e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_13_Mi_Romeo_Amante_Eterno_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t114a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimocuarta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un arquitecto creativo rodeado de planos flotantes, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga y el balcón renacentista ya usados. La escena transmite creatividad, visión de futuro y construcción de algo hermoso desde cero.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con los planos flotantes y los edificios en construcción distribuidos de forma irregular y asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una camisa elegante con las mangas remangadas, sosteniendo un lápiz de diseño dorado con el que traza líneas en el aire frente a él, como si dibujara directamente sobre la realidad. Su expresión es de concentración creativa y asombro ante lo que está creando. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t114a$,
  background_details = $t114b$Alrededor de él flotan varios planos arquitectónicos brillantes y translúcidos, cuyas líneas azules se elevan y se transforman gradualmente en pequeños edificios y castillos tridimensionales hechos de luz, suspendidos en el aire como maquetas mágicas. El entorno de fondo es un cielo despejado al atardecer, sugiriendo un horizonte de posibilidades.$t114b$,
  magic_effects = $t114c$Las líneas de los planos brillan en azul eléctrico antes de solidificarse en estructuras doradas y blancas de luz. Pequeñas partículas doradas se desprenden del lápiz de {NOMBRE_DESTINATARIO} cada vez que traza una nueva línea. La magia se siente inspiradora, constructiva y perfectamente integrada dentro de una fotografía realista.$t114c$,
  lighting_color = $t114d$Iluminación cálida de atardecer combinada con el brillo azul eléctrico de los planos y el resplandor dorado de las estructuras completadas. Predominan tonos azul eléctrico, blanco luminoso y dorado cálido.$t114d$,
  poem_template = $t114e${NOMBRE_DESTINATARIO}, eres mi arquitecto ideal,
Quien construye mi vida especial.
Tus planos son mi futuro,
Tu diseño mi camino seguro.
No necesitas planos ni herramientas,
Tu amor construye mis cuentas.
Eres mi constructor y mi verdad,
Mi {APODO_DESTINATARIO}, mi arquitecto de verdad.$t114e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_14_Mi_Arquitecto_de_Sueños_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t115a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoquinta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un gladiador romano en pleno instante de triunfo dentro del Coliseo, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano en calma (Plantilla 9), el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista y el estudio de arquitecto ya usados. A diferencia de la calma solitaria de la Plantilla 9, aquí la escena es un espectáculo público triunfal, con multitud aclamando.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con las gradas del Coliseo y la multitud extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} aparece musculoso, vistiendo una armadura de gladiador romano bruñida con detalles dorados, sosteniendo un escudo con un símbolo de victoria grabado y una espada corta en alto, en pose triunfal, sin violencia explícita. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t115a$,
  background_details = $t115b$Detrás de él se alza la arena del Coliseo romano, con las gradas repletas de siluetas de una multitud aclamando con los brazos en alto. El cielo sobre el Coliseo tiene tonos cálidos de atardecer, con polvo dorado de la arena flotando en el aire.$t115b$,
  magic_effects = $t115c$El símbolo de victoria grabado en el escudo desprende un tenue resplandor dorado pulsante, como si la propia gloria del momento tomara forma de luz. Motas de polvo dorado de la arena flotan suspendidas, iluminadas por el sol. La magia se siente triunfal, gloriosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico romano.$t115c$,
  lighting_color = $t115d$Iluminación de atardecer intensa sobre la arena, con reflejos dorados y rojizos en la armadura bruñida. Predominan tonos dorado brillante, rojo intenso, bronce metálico y arena polvorienta.$t115d$,
  poem_template = $t115e${NOMBRE_DESTINATARIO}, eres mi gladiador triunfante,
Fuerte, valiente y constante.
Tu victoria es mi orgullo,
Tu fuerza mi mejor arrullo.
No necesitas arena ni espada,
Tu amor es mi mejor jornada.
Eres mi campeón y mi verdad,
Mi {APODO_DESTINATARIO}, mi gladiador de verdad.$t115e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_15_Mi_Gladiador_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t116a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimosexta plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un cowboy elegante en el desierto del oeste americano al atardecer, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto y el Coliseo ya usados. La escena transmite libertad absoluta y espíritu aventurero.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con el paisaje desértico y el horizonte extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un atuendo de cowboy elegante y moderno, con sombrero vaquero de ala ancha y un lazo enrollado colgado del hombro, de pie junto a un caballo majestuoso de pelaje brillante. Su expresión transmite calma y libertad, con la mirada puesta en el horizonte. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t116a$,
  background_details = $t116b$El paisaje del oeste americano se extiende detrás de ellos, con formaciones rocosas rojizas y arbustos secos recortados contra un cielo de atardecer en tonos naranja y dorado intensos. Polvo fino se levanta suavemente del suelo con la brisa.$t116b$,
  magic_effects = $t116c$El lazo que lleva {NOMBRE_DESTINATARIO} desprende un tenue brillo dorado en sus fibras, como si estuviera hecho de luz trenzada. Pequeñas partículas doradas de polvo del desierto flotan suspendidas en el aire, iluminadas por el sol bajo. La magia se siente libre, cálida y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico western.$t116c$,
  lighting_color = $t116d$Iluminación de atardecer intensa y cálida, con el sol bajo generando un contraluz dorado sobre las formaciones rocosas. Predominan tonos naranja del desierto, dorado intenso y marrón tierra.$t116d$,
  poem_template = $t116e${NOMBRE_DESTINATARIO}, eres mi vaquero valiente,
Libre, salvaje y consciente.
Tu espíritu es mi libertad,
Tu camino mi realidad.
No necesitas caballo ni desierto,
Tu amor es mi puerto.
Eres mi cowboy y mi verdad,
Mi {APODO_DESTINATARIO}, mi vaquero de verdad.$t116e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_16_Mi_Cowboy_Vaquero_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t117a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoséptima plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un samurái japonés en un jardín zen con cerezos en flor, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo y el desierto vaquero ya usados. La escena transmite honor, disciplina y serenidad marcial.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con los cerezos en flor y el jardín zen distribuidos de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste una armadura tradicional de samurái elegante en tonos negros y rojos con detalles dorados, sosteniendo una katana envainada con ambas manos frente a él, en una postura serena y respetuosa, con los ojos cerrados en un momento de calma antes o después del combate. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t117a$,
  background_details = $t117b$Un jardín zen japonés se extiende detrás de él, con cerezos en plena floración cuyos pétalos rosados caen lentamente en el aire. Piedras lisas dispuestas cuidadosamente y un rastrillo de arena zen se distinguen parcialmente entre la vegetación cercana.$t117b$,
  magic_effects = $t117c$El filo de la katana, apenas visible en el borde de la vaina, desprende un tenue resplandor plateado. Los pétalos de cerezo que caen cerca de {NOMBRE_DESTINATARIO} brillan brevemente con un tono dorado rosado antes de posarse en el suelo. La magia se siente serena, honorable y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico japonés.$t117c$,
  lighting_color = $t117d$Iluminación suave y difusa de jardín, con luz natural filtrada entre los cerezos. Predominan tonos rojo intenso, negro profundo, dorado sutil y rosa pétalo.$t117d$,
  poem_template = $t117e${NOMBRE_DESTINATARIO}, eres mi samurái leal,
Con honor y disciplina celestial.
Tu espada protege mi corazón,
Tu código mi admiración.
No necesitas katana ni armadura,
Tu amor es mi mejoradura.
Eres mi guerrero honorable y real,
Mi {APODO_DESTINATARIO}, mi samurái celestial.$t117e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_17_Mi_Samurai_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t118a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimoctava plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un astronauta explorador flotando en el espacio profundo, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero y el jardín zen ya usados. La escena transmite exploración infinita y asombro visionario.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con las galaxias, planetas y la nave espacial distribuidos de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} viste un traje espacial elegante y moderno, con el casco bajo el brazo o con visor transparente que deja ver su rostro con claridad, flotando suavemente en gravedad cero con una postura relajada y contemplativa. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t118a$,
  background_details = $t118b$A su alrededor se extiende el espacio profundo, con galaxias espirales brillantes en tonos púrpura y azul, planetas coloridos de distintos tamaños visibles a la distancia, y una nave espacial elegante y moderna flotando más atrás, parcialmente iluminada por la luz de una estrella cercana.$t118b$,
  magic_effects = $t118c$Pequeñas partículas de polvo estelar brillante flotan alrededor de {NOMBRE_DESTINATARIO}, algunas formando brevemente constelaciones reconocibles antes de dispersarse. El visor de su casco refleja tenuemente los colores de las galaxias cercanas. La magia se siente vasta, serena y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico espacial.$t118c$,
  lighting_color = $t118d$Iluminación cósmica, con el brillo de las galaxias y estrellas lejanas como fuentes de luz principales contra el negro profundo del espacio. Predominan tonos azul profundo, púrpura cósmico y destellos plateados de estrellas.$t118d$,
  poem_template = $t118e${NOMBRE_DESTINATARIO}, eres mi astronauta soñador,
Quien explora mi amor interior.
Tu universo es mi infinito,
Tu viaje mi mejor mito.
No necesitas nave ni galaxia,
Tu amor es mi mejor gracia.
Eres mi explorador y mi verdad,
Mi {APODO_DESTINATARIO}, mi astronauta de verdad.$t118e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_18_Mi_Astronauta_Explorador_Espacial_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t119a$Una única fotografía continua que fluye de lado a lado del lienzo. Decimonovena plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un titán mitológico de escala monumental, de pie entre montañas, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero, el jardín zen y el espacio profundo ya usados. La escena transmite poder ancestral y una escala monumental, sobrehumana.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con la cordillera de montañas y el cielo cósmico extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} (rostro fotorrealista basado en fotografía real, a escala titánica) aparece de pie con el torso desnudo y musculoso, de tamaño colosal, con energía cósmica dorada y azul brillando bajo su piel y emanando en suaves volutas desde sus hombros y brazos. Su postura es serena pero imponente, con una mano apoyada sobre la cresta de una montaña como si fuera del tamaño de una roca cualquiera para él. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t119a$,
  background_details = $t119b$A sus pies se extiende una cordillera completa de picos nevados, diminuta en comparación con su figura. El cielo detrás de él mezcla un atardecer dorado en el horizonte con un fondo cósmico estrellado en las alturas, sugiriendo que su presencia trasciende lo terrenal.$t119b$,
  magic_effects = $t119c$La energía cósmica que recorre su piel pulsa lentamente entre tonos dorados y azules, iluminando tenuemente las nubes cercanas a su cuerpo. Pequeños relámpagos de energía saltan ocasionalmente entre sus dedos sin causar daño alguno. La magia se siente monumental, ancestral y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico mitológico.$t119c$,
  lighting_color = $t119d$Iluminación mixta entre el cálido atardecer terrenal y el frío resplandor cósmico de fondo. Predominan tonos dorado intenso, azul profundo cósmico y blanco de las cumbres nevadas.$t119d$,
  poem_template = $t119e${NOMBRE_DESTINATARIO}, eres mi titán poderoso,
Fuerte, grande y majestuoso.
Tu fuerza mueve mi mundo entero,
Tu poder es mi compañero.
No necesitas montañas ni cielo,
Tu amor es mi mayor anhelo.
Eres mi gigante y mi verdad,
Mi {APODO_DESTINATARIO}, mi titán de verdad.$t119e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_19_Mi_Titan_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET
  scene_visual = $t120a$Una única fotografía continua que fluye de lado a lado del lienzo. Última plantilla del libro Mi Amor, versión de arquetipos masculinos: {NOMBRE_DESTINATARIO} representado como un fénix renaciendo de las llamas, muy distinto del vuelo urbano, el balcón de castillo, la cima tormentosa, el campo de batalla medieval, el salón del trono, el ángel guardián, la cubierta pirata, el estudio arcano, el campo de batalla espartano, el escenario de concierto, la cabina de avión, la costa vikinga, el balcón renacentista, el estudio de arquitecto, el Coliseo, el desierto vaquero, el jardín zen, el espacio profundo y la escala titánica ya usados. Como cierre del libro, la escena transmite transformación y resiliencia: la certeza de que el amor puede renacer de cualquier caída.

IMPORTANTE — composición anti-simetría: {NOMBRE_DESTINATARIO} debe estar posicionado hacia uno de los lados del encuadre, no exactamente centrado sobre el centro del lienzo, con las llamas y las alas de fuego extendiéndose de forma asimétrica hacia el otro lado. Evitar cualquier composición especular o perfectamente equilibrada entre ambas páginas.

{NOMBRE_DESTINATARIO} emerge de un remolino de llamas doradas y anaranjadas brillantes, con un par de alas hechas de fuego mágico desplegándose orgánicamente detrás de él, de forma asimétrica. Su expresión transmite fuerza serena y determinación renovada, con el torso y los brazos parcialmente envueltos en el resplandor cálido de las llamas sin quemarse. El sujeto principal debe estar ligeramente descentrado, con el rostro claramente fuera de la franja central del lienzo.$t120a$,
  background_details = $t120b$Alrededor de él, cenizas oscuras se elevan lentamente desde el suelo y, al ascender, se transforman gradualmente en pequeñas motas de luz dorada brillante antes de disolverse en el aire. El fondo es oscuro y desenfocado, permitiendo que el resplandor de las llamas y las alas de fuego sean el centro absoluto de la composición.$t120b$,
  magic_effects = $t120c$Las alas de fuego ondulan como tela líquida, con destellos rojos, naranjas y dorados entremezclándose en sus bordes. Pequeñas chispas se desprenden de las plumas de fuego y flotan brevemente antes de apagarse. La magia se siente transformadora, poderosa y perfectamente integrada dentro de una fotografía realista de estilo cinematográfico épico.$t120c$,
  lighting_color = $t120d$Iluminación cálida e intensa proveniente de las llamas y las alas de fuego, contrastada con la oscuridad del fondo. Predominan tonos naranja intenso, dorado brillante y rojo profundo.$t120d$,
  poem_template = $t120e${NOMBRE_DESTINATARIO}, eres mi fénix eterno,
Quien renace en mi invierno.
Tu fuerza me transforma cada día,
Tu fuego es mi guía.
No necesitas llamas ni cenizas,
Tu amor son mis divisas.
Eres mi renacer y mi verdad,
Mi {APODO_DESTINATARIO}, mi fénix de verdad.$t120e$,
  character_roles = '[{"key":"dedicator","count":1},{"key":"recipient","count":1}]'::jsonb
WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_Ella_a_El.png' AND is_active = true;

COMMIT;
