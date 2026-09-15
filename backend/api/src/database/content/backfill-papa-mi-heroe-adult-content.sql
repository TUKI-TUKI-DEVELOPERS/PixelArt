-- backfill-papa-mi-heroe-adult-content.sql — modelo piloto adulto para Papá, Mi Héroe.
-- Fuente local: PromptsPixelArtPlantillas/adult-books/papa-mi-heroe-adult-full/
-- Idempotente: inserta filas faltantes por template_preview_key y actualiza contenido por key.

BEGIN;

CREATE TEMP TABLE tmp_papa_mi_heroe_adult_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender_direction VARCHAR(20) NOT NULL,
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;

INSERT INTO tmp_papa_mi_heroe_adult_templates (template_preview_key, name, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles) VALUES
  ($k1$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_1_El_Heroe_Que_Sostiene_En_Silencio.png$k1$, $n1$El héroe que sostiene en silencio De Hijo a Papá$n1$, $g1$HE_TO_HE$g1$, $s1$Una única fotografía continua, plana y a sangre completa, que transmite admiración adulta hacia un padre cuya fuerza siempre estuvo en los gestos cotidianos. El papá aparece de pie junto a su hijo adulto en una azotea tranquila al atardecer; ambos miran la ciudad con serenidad, no como héroes de fantasía sino como dos hombres unidos por años de ejemplo, cuidado y respeto. El padre tiene postura firme y protectora, ropa sobria y elegante; el hijo adulto lo mira con orgullo contenido, con una mano apoyada suavemente en su hombro.$s1$, $b1$Azotea urbana cálida, barandas discretas, ciudad al fondo con luces encendiéndose, cielo amplio de atardecer y detalles cotidianos apenas visibles: una taza de café, una chaqueta doblada, una vieja caja de herramientas. El fondo debe sentirse real, adulto y emocional, sin elementos infantiles.$b1$, $m1$Pequeñas líneas de luz dorada emergen de los objetos cotidianos y forman, de manera sutil, una silueta abstracta de capa luminosa detrás del papá. La magia debe parecer una metáfora visual de su constancia, no un disfraz literal.$m1$, $l1$Iluminación cinematográfica suave de atardecer, tonos dorados, azul profundo y ámbar. Contraste cálido, elegante y nostálgico.$l1$, $p1$Para {APODO_DESTINATARIO},
tu voz fue refugio, tu calma, señal,
tu forma de amar, mi raíz principal.
Cuando el mundo exigía correr sin mirar,
me enseñaste a elegir, respirar y avanzar.

Hoy sé que tu fuerza no busca brillar:
sostiene mi vida sin hacerla pesar.
Tu amor fue mi casa, mi norte y verdad,
mi héroe sereno en cada ciudad.$p1$, $r1$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r1$::jsonb),
  ($k2$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_2_El_Taller_De_Tus_Consejos.png$k2$, $n2$El taller de tus consejos De Hijo a Papá$n2$, $g2$HE_TO_HE$g2$, $s2$Una fotografía continua, plana y a sangre completa, dentro de un taller cálido y ordenado. El papá y su hijo adulto están junto a una mesa de madera con herramientas antiguas, planos y una lámpara encendida. El padre señala con calma una pieza sobre la mesa mientras el hijo adulto escucha con atención y una sonrisa serena, como quien comprende de adulto el valor de esas lecciones.$s2$, $b2$Taller familiar elegante, paredes con madera oscura, herramientas colgadas con orden, estantes con objetos de años, una ventana lateral dejando entrar luz cálida. Nada debe sentirse caricaturesco ni infantil; el espacio debe parecer vivido, humano y cuidado.$b2$, $m2$De las herramientas y planos salen líneas luminosas muy sutiles que se convierten en constelaciones pequeñas sobre la mesa, como si cada consejo antiguo encontrara su lugar en el presente.$m2$, $l2$Luz cálida de lámpara de taller mezclada con atardecer suave desde la ventana. Paleta de madera, dorado tenue, café y azul grisáceo.$l2$, $p2$Para {APODO_DESTINATARIO},
entre madera, café y metal,
guardaste paciencia en cada señal.
No solo arreglabas lo que iba a fallar:
me diste criterio para continuar.

Hoy vuelvo a tus frases con gratitud,
a tu modo sencillo de dar plenitud.
Si el mundo se rompe, recuerdo tu voz:
primero la calma, después el valor.$p2$, $r2$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r2$::jsonb),
  ($k3$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_3_Tu_Brujula_En_Los_Dias_Dificiles.png$k3$, $n3$Tu brújula en los días difíciles De Hijo a Papá$n3$, $g3$HE_TO_HE$g3$, $s3$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un mirador de montaña al anochecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} revisan juntos un mapa extendido sobre el capó de una camioneta antigua, con una brújula dorada marcando el camino. La escena transmite guía madura, confianza y orientación en momentos difíciles. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s3$, $b3$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b3$, $m3$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m3$, $l3$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l3$, $p3$Para {APODO_DESTINATARIO},
cuando el rumbo parecía cambiar,
tu voz fue brújula para avanzar.
No prometiste un cielo sin tempestad:
me diste criterio, paciencia y verdad.

Hoy sigo tus pasos con calma interior,
sin miedo al silencio ni al propio error.
Si la vida me pide volver a empezar,
tu ejemplo me enseña por dónde mirar.$p3$, $r3$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r3$::jsonb),
  ($k4$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_4_El_Mapa_De_Tu_Ejemplo.png$k4$, $n4$El mapa de tu ejemplo De Hijo a Papá$n4$, $g4$HE_TO_HE$g4$, $s4$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una biblioteca hogareña con una mesa grande cubierta por mapas antiguos, fotografías familiares y notas manuscritas. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} observan juntos un mapa iluminado, como si revisaran no solo lugares sino recuerdos y decisiones de vida. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s4$, $b4$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b4$, $m4$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m4$, $l4$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l4$, $p4$Para {APODO_DESTINATARIO},
tu vida trazó un mapa sin hablar,
con rutas honestas para caminar.
En cada decisión que aprendí de ti,
hay una respuesta que vuelve hacia mí.

Hoy llevo tus huellas con serenidad,
tu modo sencillo de amar la verdad.
Si pierdo el camino o cambia el lugar,
tu ejemplo me ayuda a regresar.$p4$, $r4$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r4$::jsonb),
  ($k5$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_5_La_Fuerza_Que_No_Hace_Ruido.png$k5$, $n5$La fuerza que no hace ruido De Hijo a Papá$n5$, $g5$HE_TO_HE$g5$, $s5$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una estación de tren al amanecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} esperan juntos en un andén casi vacío; {NOMBRE_DESTINATARIO} ajusta con naturalidad el cuello del abrigo de {NOMBRE_DEDICANTE}, gesto mínimo pero cargado de cuidado adulto. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s5$, $b5$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b5$, $m5$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m5$, $l5$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l5$, $p5$Para {APODO_DESTINATARIO},
tu fuerza no tuvo que presumir,
se vio en tu manera de estar y seguir.
Cuando todo pesaba, te vi respirar,
y hacer de la calma una forma de amar.

Hoy entiendo el valor de tu discreción,
tu fe silenciosa, tu firme canción.
No hizo falta ruido para demostrar
que un padre sostiene sin dejar de cuidar.$p5$, $r5$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r5$::jsonb),
  ($k6$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_6_Mi_Guardian_De_Todos_Los_Dias.png$k6$, $n6$Mi guardián de todos los días De Hijo a Papá$n6$, $g6$HE_TO_HE$g6$, $s6$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre cerca de un faro moderno al borde del mar, al atardecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} caminan por una pasarela de madera; el faro encendido simboliza protección constante sin invadir la libertad. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s6$, $b6$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b6$, $m6$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m6$, $l6$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l6$, $p6$Para {APODO_DESTINATARIO},
no fuiste guardián de cuento ni metal,
fuiste luz encendida en lo habitual.
En cada regreso, cansancio o temor,
tu presencia firme me dio dirección.

Hoy sé que cuidarme también fue enseñar,
dejarme ser libre, dejarme intentar.
Tu amor vigilante, sin encadenar,
me dio un horizonte para caminar.$p6$, $r6$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r6$::jsonb),
  ($k7$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_7_La_Primera_Voz_Que_Me_Guio.png$k7$, $n7$La primera voz que me guió De Hijo a Papá$n7$, $g7$HE_TO_HE$g7$, $s7$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una sala de estar sobria con un viejo equipo de audio o radio familiar sobre una repisa. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} escuchan juntos una grabación antigua o música suave, como símbolo de la voz que permanece. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s7$, $b7$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b7$, $m7$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m7$, $l7$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l7$, $p7$Para {APODO_DESTINATARIO},
tu voz fue principio, consejo y raíz,
la frase sencilla que vuelve hacia mí.
No siempre entendía tu forma de hablar,
pero hoy tus palabras me saben cuidar.

Si llegan los días de duda o presión,
te escucho en silencio dentro del corazón.
Tu voz no envejece, me vuelve a ordenar,
y en medio del ruido me ayuda a pensar.$p7$, $r7$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r7$::jsonb),
  ($k8$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_8_Donde_Aprendi_A_Levantarme.png$k8$, $n8$Donde aprendí a levantarme De Hijo a Papá$n8$, $g8$HE_TO_HE$g8$, $s8$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una cancha deportiva vacía al atardecer, no infantil, con gradas silenciosas. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan por la pista después de entrenar, compartiendo una conversación sobre esfuerzo y resiliencia. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s8$, $b8$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b8$, $m8$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m8$, $l8$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l8$, $p8$Para {APODO_DESTINATARIO},
me viste caer sin perder la fe,
me diste la mano y aprendí a estar de pie.
No hiciste del golpe una gran lección,
lo hiciste camino, coraje y razón.

Hoy, cuando tropiezo, no vuelvo al temor,
recuerdo tu calma, tu fuerza y tu amor.
Tu modo de verme volver a intentar
me enseñó que nadie se rompe por fallar.$p8$, $r8$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r8$::jsonb),
  ($k9$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_9_El_Arquitecto_De_Mis_Suenos.png$k9$, $n9$El arquitecto de mis sueños De Hijo a Papá$n9$, $g9$HE_TO_HE$g9$, $s9$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un estudio de arquitectura cálido. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos observan una maqueta de ciudad o casa familiar sobre una mesa, iluminada con luz dorada. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s9$, $b9$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b9$, $m9$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m9$, $l9$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l9$, $p9$Para {APODO_DESTINATARIO},
no dibujaste mi vida por mí,
pero abriste ventanas dentro de mí.
Me hablaste de metas con calma y razón,
y diste estructura a mi imaginación.

Hoy construyo mis días con tu claridad,
con planes, errores y voluntad.
Si un sueño parece difícil de alzar,
tu fe en mis manos me ayuda a empezar.$p9$, $r9$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r9$::jsonb),
  ($k10$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_10_El_Escudo_Que_Me_Dio_Valor.png$k10$, $n10$El escudo que me dio valor De Hijo a Papá$n10$, $g10$HE_TO_HE$g10$, $s10$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre bajo una lluvia suave en una avenida tranquila. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} comparten un paraguas grande mientras conversan; el paraguas funciona como símbolo de escudo, no como dependencia. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s10$, $b10$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b10$, $m10$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m10$, $l10$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l10$, $p10$Para {APODO_DESTINATARIO},
no levantaste muros para esconder,
me diste valor para permanecer.
Cuando tuve miedo de hablar con verdad,
tu ejemplo fue escudo y fue dignidad.

Hoy miro de frente sin querer huir,
aprendo a ser justo, aprendo a seguir.
Tu amor no me evita la dificultad:
me enseña a cruzarla con honestidad.$p10$, $r10$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r10$::jsonb),
  ($k11$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_11_El_Maestro_De_La_Calma.png$k11$, $n11$El maestro de la calma De Hijo a Papá$n11$, $g11$HE_TO_HE$g11$, $s11$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un muelle tranquilo al amanecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos están sentados pescando o mirando el agua, compartiendo silencio cómodo y consejo sin prisa. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s11$, $b11$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b11$, $m11$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m11$, $l11$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l11$, $p11$Para {APODO_DESTINATARIO},
tu calma no fue silencio al azar,
fue una manera profunda de amar.
Cuando la prisa quería ganar,
tu voz me enseñaba a respirar.

Hoy guardo ese ritmo para decidir,
para no romperme, para resistir.
Si el mundo acelera mi forma de andar,
tu paz me devuelve mi propio lugar.$p11$, $r11$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r11$::jsonb),
  ($k12$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_12_El_Hombre_Que_Me_Enseno_A_Ser_Mejor.png$k12$, $n12$El hombre que me enseñó a ser mejor De Hijo a Papá$n12$, $g12$HE_TO_HE$g12$, $s12$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una calle antigua de barrio al atardecer, frente a una puerta o fachada familiar. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan juntos después de una conversación importante. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s12$, $b12$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b12$, $m12$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m12$, $l12$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l12$, $p12$Para {APODO_DESTINATARIO},
no me pediste perfecta dirección,
me hablaste de esfuerzo, respeto y razón.
Tu vida mostró sin necesidad
de grandes discursos qué es dignidad.

Hoy quiero ser hombre de bien al andar,
mirar a los ojos, saber escuchar.
Si logro ser justo, valiente y leal,
es porque tu ejemplo me dio lo esencial.$p12$, $r12$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r12$::jsonb),
  ($k13$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_13_Tus_Pasos_Mi_Camino.png$k13$, $n13$Tus pasos, mi camino De Hijo a Papá$n13$, $g13$HE_TO_HE$g13$, $s13$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un sendero de montaña amplio. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan uno al lado del otro, no adelante y atrás, mostrando que el hijo ya creció pero reconoce el camino recibido. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s13$, $b13$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b13$, $m13$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m13$, $l13$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l13$, $p13$Para {APODO_DESTINATARIO},
tus pasos no fueron mandato ni ley,
fueron horizonte, montaña y fe.
Me diste distancia para descubrir,
y un punto seguro al cual regresar.

Hoy piso la vida con más claridad,
con toda tu fuerza y mi libertad.
Si miro hacia atrás para continuar,
tus huellas me enseñan a no claudicar.$p13$, $r13$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r13$::jsonb),
  ($k14$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_14_Nuestro_Cafe_De_Hombres_Grandes.png$k14$, $n14$Nuestro café de hombres grandes De Hijo a Papá$n14$, $g14$HE_TO_HE$g14$, $s14$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una cafetería tranquila y elegante. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos conversan frente a dos cafés, con una mesa pequeña y ambiente íntimo. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s14$, $b14$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b14$, $m14$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m14$, $l14$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l14$, $p14$Para {APODO_DESTINATARIO},
ya no hablamos solo de juego y deber,
hoy compartimos lo que cuesta entender.
Entre dos cafés y una conversación,
tu historia me ofrece nueva dirección.

Hoy puedo escucharte también descansar,
y verte más humano, más cerca, más real.
Ser hijo de adulto me enseña a mirar
al hombre que fuiste para sostener mi hogar.$p14$, $r14$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r14$::jsonb),
  ($k15$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_15_La_Paciencia_Que_Me_Formo.png$k15$, $n15$La paciencia que me formó De Hijo a Papá$n15$, $g15$HE_TO_HE$g15$, $s15$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un pequeño jardín o invernadero familiar. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos cuidan una planta grande o un árbol joven, símbolo de crecimiento paciente. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s15$, $b15$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b15$, $m15$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m15$, $l15$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l15$, $p15$Para {APODO_DESTINATARIO},
tu paciencia fue taller y jardín,
me dejó crecer sin cortar mi raíz.
No apuraste el fruto ni exigiste flor,
supiste esperar con fe y con amor.

Hoy miro mis logros con más humildad,
con tiempo, cuidado y serenidad.
Si algo en mí aprende a permanecer,
es por tu paciencia ayudándome a crecer.$p15$, $r15$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r15$::jsonb),
  ($k16$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_16_Las_Conversaciones_Que_Guardo.png$k16$, $n16$Las conversaciones que guardo De Hijo a Papá$n16$, $g16$HE_TO_HE$g16$, $s16$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre dentro de un auto detenido en un mirador nocturno o estacionamiento tranquilo, como esas conversaciones largas padre-hijo después de manejar. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s16$, $b16$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b16$, $m16$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m16$, $l16$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l16$, $p16$Para {APODO_DESTINATARIO},
hay frases tuyas que vuelven a mí,
como una ventana que sabe abrir.
No fueron sermones ni obligación:
fueron semillas en mi corazón.

Hoy guardo esas charlas como un lugar,
un banco tranquilo donde descansar.
Si el ruido del mundo me quiere vencer,
tu voz me recuerda quién debo ser.$p16$, $r16$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r16$::jsonb),
  ($k17$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_17_Cuando_Me_Ensenaste_A_No_Rendirme.png$k17$, $n17$Cuando me enseñaste a no rendirme De Hijo a Papá$n17$, $g17$HE_TO_HE$g17$, $s17$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una pista o escalera urbana al amanecer, después de ejercicio. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos suben juntos los últimos escalones con esfuerzo tranquilo. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s17$, $b17$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b17$, $m17$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m17$, $l17$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l17$, $p17$Para {APODO_DESTINATARIO},
cuando el cansancio me quiso doblar,
tu fe silenciosa me hizo avanzar.
No me quitaste la cuesta al subir,
me diste motivos para resistir.

Hoy sé que rendirse no es siempre caer,
pero levantarse también es crecer.
Si vuelvo a intentarlo con dignidad,
es porque tu ejemplo me dio voluntad.$p17$, $r17$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r17$::jsonb),
  ($k18$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_18_El_Valor_De_Hacer_Lo_Correcto.png$k18$, $n18$El valor de hacer lo correcto De Hijo a Papá$n18$, $g18$HE_TO_HE$g18$, $s18$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una oficina o estudio sobrio con una mesa limpia, documentos, una pluma y luz de ventana. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos conversan sobre una decisión importante. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s18$, $b18$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b18$, $m18$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m18$, $l18$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l18$, $p18$Para {APODO_DESTINATARIO},
me hablaste de honrar la verdad,
aunque costara perder comodidad.
Tu vida me dijo con simple claridad
que ser buena persona también es luchar.

Hoy llevo esa regla sin presumir,
hacer lo correcto, cuidar y cumplir.
Si el camino fácil me quiere tentar,
tu ejemplo me enseña a no negociar.$p18$, $r18$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r18$::jsonb),
  ($k19$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_19_La_Casa_Que_Siempre_Vuelve.png$k19$, $n19$La casa que siempre vuelve De Hijo a Papá$n19$, $g19$HE_TO_HE$g19$, $s19$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en el porche o entrada de una casa familiar al atardecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos se encuentran frente a la puerta, con una luz cálida saliendo desde adentro. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s19$, $b19$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b19$, $m19$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m19$, $l19$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l19$, $p19$Para {APODO_DESTINATARIO},
la vida me llevó por más de un lugar,
pero tu cariño me supo esperar.
No fue una cadena ni una condición:
fue casa encendida dentro del corazón.

Hoy vuelvo a tu risa, tu mesa y tu voz,
a ese refugio que hiciste por dos.
Si el mundo me cansa de tanto girar,
tu amor sigue siendo mi forma de hogar.$p19$, $r19$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r19$::jsonb),
  ($k20$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_20_Siempre_Sere_Tu_Hijo.png$k20$, $n20$Siempre seré tu hijo De Hijo a Papá$n20$, $g20$HE_TO_HE$g20$, $s20$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una playa tranquila al atardecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan junto al mar, con una conversación serena y una emoción contenida.

## Hijo adulto → papá El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y el dedicante es su hijo adulto ({NOMBRE_DEDICANTE}); nunca representar al dedicante como niño.$s20$, $b20$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b20$, $m20$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m20$, $l20$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l20$, $p20$Para {APODO_DESTINATARIO},
crecí, tuve sueños, caminos y voz,
pero hay una parte que vuelve a los dos.
No importa la edad ni cuánto cambié:
en tu abrazo encuentro lo que siempre fui.

Hoy soy hombre adulto, con vida y razón,
y aun así te guardo en mi corazón.
Si el tiempo me lleva más lejos de aquí,
siempre seré tu hijo, cerquita de ti.$p20$, $r20$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r20$::jsonb),
  ($k21$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_21_La_Mano_Que_Me_Levanto.png$k21$, $n21$La mano que me levantó De Hija a Papá$n21$, $g21$SHE_TO_HE$g21$, $s21$Una fotografía continua, plana y a sangre completa, en un puente peatonal tranquilo después de la lluvia. El papá camina al lado de su hija adulta, ambos vestidos de manera elegante y sencilla. Él no la carga ni la trata como niña; simplemente le ofrece una mano cercana y protectora mientras ella avanza con seguridad, mirando hacia adelante con gratitud.$s21$, $b21$Puente urbano con piso húmedo reflejando luces cálidas, árboles al fondo, cielo despejándose después de la lluvia. El ambiente debe sentirse esperanzador, maduro y limpio, sin dramatismo oscuro.$b21$, $m21$Pequeños reflejos dorados aparecen en los charcos y forman un camino luminoso delante de ambos, como símbolo de apoyo y confianza heredada.$m21$, $l21$Luz suave posterior a la lluvia, reflejos dorados y tonos azul grisáceo. Atmósfera íntima, serena y esperanzadora.$l21$, $p21$Para {APODO_DESTINATARIO},
cuando dudé del camino y de mí,
tu mano tranquila me trajo hasta aquí.
No hiciste promesas de fácil brillar:
me diste confianza para caminar.

Hoy llevo tu fuerza, tu abrazo y tu abrigo,
como una luz firme que camina conmigo.
Si tiembla la tarde o cambia el destino,
tu amor me recuerda cuál es mi camino.$p21$, $r21$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r21$::jsonb),
  ($k22$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_22_Nuestro_Baile_Con_El_Tiempo.png$k22$, $n22$Nuestro baile con el tiempo De Hija a Papá$n22$, $g22$SHE_TO_HE$g22$, $s22$Una fotografía continua, plana y a sangre completa, en una sala cálida de hogar familiar. El papá y su hija adulta bailan suavemente, con una emoción tranquila y madura. No es una escena infantil: ella es adulta, se mueve con autonomía y abraza a su papá con gratitud. La composición debe transmitir memoria, ternura y paso del tiempo.$s22$, $b22$Sala elegante y acogedora con luz cálida, un tocadiscos o parlante antiguo, fotografías familiares desenfocadas en una repisa, cortinas suaves y una alfombra sobria. El espacio debe sentirse adulto, familiar y real.$b22$, $m22$De las fotografías del fondo salen destellos dorados muy suaves que flotan alrededor de ambos como pequeños recuerdos iluminados. Algunos destellos sugieren pasos de baile en el aire sin volverse caricaturescos.$m22$, $l22$Iluminación cálida de interior, tonos dorados, crema y madera. Atmósfera íntima, nostálgica y luminosa.$l22$, $p22$Para {APODO_DESTINATARIO},
ya no soy la niña sobre tus pies,
pero aquel recuerdo florece otra vez.
La vida dio vueltas, cambió la canción,
y aún tu abrazo sostiene mi corazón.

Hoy bailo mis días con gratitud,
con tu cariño, tu paz y tu luz.
Si el tiempo me mueve sin preguntar,
tu ternura me vuelve a mi hogar.$p22$, $r22$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r22$::jsonb),
  ($k23$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_23_Mi_Primer_Refugio.png$k23$, $n23$Mi primer refugio De Hija a Papá$n23$, $g23$SHE_TO_HE$g23$, $s23$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una sala junto a una ventana con lluvia suave. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos comparten una taza de té o café, sentados cerca pero con postura familiar. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s23$, $b23$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b23$, $m23$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m23$, $l23$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l23$, $p23$Para {APODO_DESTINATARIO},
fuiste refugio sin hacerme menor,
un techo sereno, paciencia y amor.
Cuando la vida pesaba de más,
tu voz me enseñaba que todo iba a pasar.

Hoy llevo esa calma dentro de mí,
como una casa que vuelve hacia ti.
Si el mundo me exige dejar de sentir,
tu abrazo me ayuda a volver a vivir.$p23$, $r23$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r23$::jsonb),
  ($k24$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_24_El_Abrazo_Que_Me_Dio_Alas.png$k24$, $n24$El abrazo que me dio alas De Hija a Papá$n24$, $g24$SHE_TO_HE$g24$, $s24$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un aeropuerto o terminal luminosa, con {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos compartiendo un abrazo sobrio de despedida o bienvenida. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s24$, $b24$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b24$, $m24$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m24$, $l24$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l24$, $p24$Para {APODO_DESTINATARIO},
tu abrazo no quiso mi vuelo cortar,
me dio la confianza para despegar.
No me retuviste por miedo a perder:
me viste partir y me ayudaste a creer.

Hoy cada distancia me acerca también,
porque tu cariño me sostuvo de pie.
Si cruzo otro cielo buscando mi voz,
tu amor va conmigo, callado y feroz.$p24$, $r24$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r24$::jsonb),
  ($k25$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_25_Tu_Forma_De_Cuidarme.png$k25$, $n25$Tu forma de cuidarme De Hija a Papá$n25$, $g25$SHE_TO_HE$g25$, $s25$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una cocina familiar elegante y cálida. {NOMBRE_DESTINATARIO} prepara o sirve una taza de té/café a {NOMBRE_DEDICANTE} adulta mientras conversan con calma. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s25$, $b25$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b25$, $m25$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m25$, $l25$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l25$, $p25$Para {APODO_DESTINATARIO},
tu forma de amar no hizo ruido jamás,
fue plato servido, fue abrigo y fue paz.
En cosas pequeñas supiste guardar
la inmensa ternura de saber cuidar.

Hoy miro esos gestos con nueva emoción,
y entiendo el idioma de tu corazón.
Si aprendí a querer sin pedir atención,
fue viendo tu amor convertirse en acción.$p25$, $r25$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r25$::jsonb),
  ($k26$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_26_El_Hombre_Que_Me_Enseno_Mi_Valor.png$k26$, $n26$El hombre que me enseñó mi valor De Hija a Papá$n26$, $g26$SHE_TO_HE$g26$, $s26$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una galería o pasillo elegante con un espejo grande. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos miran el reflejo, como símbolo de reconocimiento y autoestima. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s26$, $b26$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b26$, $m26$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m26$, $l26$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l26$, $p26$Para {APODO_DESTINATARIO},
tu amor no me pidió cambiar mi verdad,
me diste respeto, confianza y dignidad.
Me viste completa antes de volar,
y así me enseñaste a no mendigar.

Hoy sé lo que valgo, lo puedo nombrar,
sin miedo a mi fuerza, sin dejar de amar.
Si camino firme, con luz y honor,
es porque en tus ojos aprendí mi valor.$p26$, $r26$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r26$::jsonb),
  ($k27$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_27_La_Promesa_De_Volver_A_Casa.png$k27$, $n27$La promesa de volver a casa De Hija a Papá$n27$, $g27$SHE_TO_HE$g27$, $s27$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en la puerta de una casa familiar al atardecer. {NOMBRE_DESTINATARIO} recibe a {NOMBRE_DEDICANTE} adulta que vuelve de viaje, con una maleta pequeña. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s27$, $b27$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b27$, $m27$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m27$, $l27$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l27$, $p27$Para {APODO_DESTINATARIO},
me abriste la puerta sin preguntar,
con esa manera de saber esperar.
No hubo reproches, no hubo condición,
solo tu abrazo diciendo: aquí estoy.

Hoy sé que la casa también es amor,
un sitio seguro, un mismo calor.
Si la vida me lleva lejos del sol,
tu puerta me guarda su antigua canción.$p27$, $r27$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r27$::jsonb),
  ($k28$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_28_Mi_Guardian_De_Luz.png$k28$, $n28$Mi guardián de luz De Hija a Papá$n28$, $g28$SHE_TO_HE$g28$, $s28$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un sendero nocturno de jardín o parque, con {NOMBRE_DESTINATARIO} sosteniendo una linterna cálida mientras {NOMBRE_DEDICANTE} adulta camina a su lado segura. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s28$, $b28$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b28$, $m28$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m28$, $l28$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l28$, $p28$Para {APODO_DESTINATARIO},
cuando la noche me quiso cubrir,
tu luz fue una forma de hacerme seguir.
No fue vigilancia, no fue condición:
fue amor alumbrando mi propia decisión.

Hoy llevo esa lámpara dentro de mí,
para no perderme lejos de aquí.
Si todo oscurece, recuerdo tu voz,
y encuentro mi paso siguiendo tu luz.$p28$, $r28$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r28$::jsonb),
  ($k29$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_29_El_Consejo_Que_Me_Acompana.png$k29$, $n29$El consejo que me acompaña De Hija a Papá$n29$, $g29$SHE_TO_HE$g29$, $s29$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un escritorio elegante donde {NOMBRE_DEDICANTE} adulta revisa una carta o libreta, con {NOMBRE_DESTINATARIO} sentado cerca en actitud de conversación y apoyo. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s29$, $b29$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b29$, $m29$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m29$, $l29$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l29$, $p29$Para {APODO_DESTINATARIO},
tu consejo no quiso mandar mi razón,
fue llave discreta, fue conversación.
Llegó sin imponer, se quedó sin pesar,
y aprendió conmigo la forma de estar.

Hoy, cuando decido con miedo o valor,
tu frase aparece con suave calor.
No elige por mí, no me quita la voz:
me ayuda a escucharme, cerquita de vos.$p29$, $r29$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r29$::jsonb),
  ($k30$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_30_La_Calma_Detras_De_Mis_Pasos.png$k30$, $n30$La calma detrás de mis pasos De Hija a Papá$n30$, $g30$SHE_TO_HE$g30$, $s30$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un jardín amplio o paseo arbolado al atardecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan lentamente, conversando con serenidad. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s30$, $b30$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b30$, $m30$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m30$, $l30$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l30$, $p30$Para {APODO_DESTINATARIO},
detrás de mis pasos estuvo tu paz,
tu modo sereno de amar sin hablar.
No hiciste del miedo una gran prisión,
me diste confianza con cada ocasión.

Hoy cruzo la vida con más claridad,
con menos ruido, con más verdad.
Si tiembla el camino o cambia la voz,
tu calma camina delante de los dos.$p30$, $r30$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r30$::jsonb),
  ($k31$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_31_La_Fuerza_Que_Me_Hizo_Libre.png$k31$, $n31$La fuerza que me hizo libre De Hija a Papá$n31$, $g31$SHE_TO_HE$g31$, $s31$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una carretera panorámica o puente amplio con viento suave. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos observan el horizonte, como símbolo de libertad y raíces. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s31$, $b31$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b31$, $m31$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m31$, $l31$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l31$, $p31$Para {APODO_DESTINATARIO},
tu fuerza no quiso elegir por mí,
me abrió la ventana para descubrir.
Me diste raíces, me diste valor,
y alas firmes para escuchar mi voz.

Hoy soy más libre porque supe volver,
porque tu cariño no quiso poseer.
Si vuelo alto sin olvidar mi hogar,
es porque tu amor me enseñó a confiar.$p31$, $r31$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r31$::jsonb),
  ($k32$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_32_El_Amor_Que_No_Exige_Nada.png$k32$, $n32$El amor que no exige nada De Hija a Papá$n32$, $g32$SHE_TO_HE$g32$, $s32$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un comedor familiar elegante con mesa puesta para una comida tranquila. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos conversan con calidez. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s32$, $b32$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b32$, $m32$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m32$, $l32$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l32$, $p32$Para {APODO_DESTINATARIO},
tu amor no pidió que dejara de ser,
me dio un lugar propio donde florecer.
No hizo preguntas para merecer,
solo estuvo cerca para sostener.

Hoy entiendo esa forma tan limpia de amar,
sin cuentas pendientes, sin nada que cobrar.
Si puedo querer con respeto y verdad,
es porque aprendí de tu generosidad.$p32$, $r32$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r32$::jsonb),
  ($k33$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_33_Las_Historias_Que_Aun_Me_Guian.png$k33$, $n33$Las historias que aún me guían De Hija a Papá$n33$, $g33$SHE_TO_HE$g33$, $s33$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una biblioteca o sala con álbumes familiares. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos revisan un álbum abierto con fotos antiguas. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s33$, $b33$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b33$, $m33$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m33$, $l33$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l33$, $p33$Para {APODO_DESTINATARIO},
tus historias me hicieron mirar
que cada caída se puede contar.
No fueron leyendas para presumir,
fueron caminos para resistir.

Hoy vuelven de pronto con nueva verdad,
me hablan de esfuerzo, amor y humildad.
Si pierdo memoria de lo esencial,
tu historia regresa como un faro real.$p33$, $r33$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r33$::jsonb),
  ($k34$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_34_Cuando_Me_Miraste_Con_Orgullo.png$k34$, $n34$Cuando me miraste con orgullo De Hija a Papá$n34$, $g34$SHE_TO_HE$g34$, $s34$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un momento de logro adulto: {NOMBRE_DEDICANTE} sostiene una carpeta, diploma o proyecto profesional, mientras {NOMBRE_DESTINATARIO} la mira con orgullo sereno. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s34$, $b34$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b34$, $m34$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m34$, $l34$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l34$, $p34$Para {APODO_DESTINATARIO},
tu orgullo no hizo ruido al llegar,
fue una mirada difícil de olvidar.
En ella encontré mi propio valor,
tu fe silenciosa, tu inmenso amor.

Hoy guardo ese brillo para continuar,
cuando mis fuerzas quieren descansar.
Si logro pararme con seguridad,
es porque tu orgullo me dio dignidad.$p34$, $r34$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r34$::jsonb),
  ($k35$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_35_La_Casa_De_Tus_Brazos.png$k35$, $n35$La casa de tus brazos De Hija a Papá$n35$, $g35$SHE_TO_HE$g35$, $s35$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una sala familiar donde {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos comparten un abrazo paternal sobrio y cálido, sin romanticismo. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s35$, $b35$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b35$, $m35$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m35$, $l35$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l35$, $p35$Para {APODO_DESTINATARIO},
tus brazos no fueron pared ni prisión,
fueron una casa para el corazón.
En ellos aprendí que volver a empezar
puede ser sencillo si existe un hogar.

Hoy, aunque la vida me cambie el lugar,
tu abrazo me enseña dónde descansar.
Si pierdo mi centro en medio del día,
tu amor me devuelve calma y alegría.$p35$, $r35$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r35$::jsonb),
  ($k36$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_36_Tu_Voz_En_Mis_Decisiones.png$k36$, $n36$Tu voz en mis decisiones De Hija a Papá$n36$, $g36$SHE_TO_HE$g36$, $s36$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una esquina urbana elegante con señales de calles o caminos, {NOMBRE_DEDICANTE} adulta mirando distintas direcciones junto a {NOMBRE_DESTINATARIO}. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s36$, $b36$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b36$, $m36$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m36$, $l36$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l36$, $p36$Para {APODO_DESTINATARIO},
hay días que debo elegir sin saber,
y tu voz me ayuda a permanecer.
No decide por mí ni apaga mi voz,
me presta memoria, cuidado y valor.

Hoy tomo caminos con más claridad,
con toda mi historia y mi libertad.
Si dudo un instante, te vuelvo a escuchar,
y encuentro mi forma sincera de andar.$p36$, $r36$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r36$::jsonb),
  ($k37$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_37_Mi_Heroe_Sin_Armadura.png$k37$, $n37$Mi héroe sin armadura De Hija a Papá$n37$, $g37$SHE_TO_HE$g37$, $s37$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un balcón o terraza al amanecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos miran la ciudad mientras comparten café. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s37$, $b37$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b37$, $m37$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m37$, $l37$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l37$, $p37$Para {APODO_DESTINATARIO},
no hizo falta espada, corona ni metal,
tu amor cotidiano fue lo principal.
Con manos cansadas y corazón fiel,
hiciste milagros sin quererlos vender.

Hoy sé que un héroe también puede ser
quien llega temprano y cumple otra vez.
Si admiro tu vida con tanta emoción,
es por tu grandeza sin exhibición.$p37$, $r37$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r37$::jsonb),
  ($k38$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_38_El_Respeto_Que_Aprendi_De_Ti.png$k38$, $n38$El respeto que aprendí de ti De Hija a Papá$n38$, $g38$SHE_TO_HE$g38$, $s38$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una sala elegante donde {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos conversan frente a frente con respeto, quizá en una mesa con té o café. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s38$, $b38$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b38$, $m38$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m38$, $l38$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l38$, $p38$Para {APODO_DESTINATARIO},
de ti aprendí que amar es cuidar,
mirar a los ojos, saber escuchar.
Tu forma de hablarme con dignidad
me dio una medida de la verdad.

Hoy no acepto menos de lo que soy,
camino más firme por donde voy.
Si sé que respeto también es amor,
es porque tu vida me dio ese valor.$p38$, $r38$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r38$::jsonb),
  ($k39$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_39_La_Ternura_Que_Me_Sostuvo.png$k39$, $n39$La ternura que me sostuvo De Hija a Papá$n39$, $g39$SHE_TO_HE$g39$, $s39$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en una cocina o comedor temprano por la mañana. {NOMBRE_DESTINATARIO} pone una manta o abrigo sobre los hombros de {NOMBRE_DEDICANTE} adulta mientras comparten un momento de cuidado. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s39$, $b39$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b39$, $m39$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m39$, $l39$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l39$, $p39$Para {APODO_DESTINATARIO},
tu ternura no quiso llamar la atención,
fue manta en invierno, fue suave canción.
En gestos pequeños supiste dejar
un modo profundo de hacerme sanar.

Hoy llevo ese abrigo dentro de mí,
para los días que pesan aquí.
Si el mundo se enfría, recuerdo tu amor,
y vuelve despacio mi propio calor.$p39$, $r39$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r39$::jsonb),
  ($k40$IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/Plantillas/Plantilla_40_Siempre_Sere_Tu_Hija.png$k40$, $n40$Siempre seré tu hija De Hija a Papá$n40$, $g40$SHE_TO_HE$g40$, $s40$Una única fotografía continua, plana y a sangre completa, con tono maduro, familiar y emocional. La escena ocurre en un malecón o paseo junto al mar al atardecer. {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} adultos caminan conversando con serenidad. El destinatario es el papá adulto ({NOMBRE_DESTINATARIO}) y la dedicante es su hija adulta ({NOMBRE_DEDICANTE}); nunca representar a la dedicante como niña ni como pareja romántica.$s40$, $b40$Entorno realista, adulto y sobrio, coherente con la escena principal. Detalles cálidos de memoria familiar, objetos cotidianos significativos, profundidad fotográfica suave, sin elementos infantiles ni caricaturescos.$b40$, $m40$Hilos de luz dorada muy sutiles y partículas cálidas aparecen como metáfora de memoria, guía y amor familiar. La magia debe sentirse integrada a una fotografía real, nunca como fantasía infantil ni efecto exagerado.$m40$, $l40$Iluminación cinematográfica suave, paleta de dorados, azul profundo, madera, crema y sombras cálidas. Atmósfera elegante, nostálgica, serena y luminosa.$l40$, $p40$Para {APODO_DESTINATARIO},
crecí, hice vida, aprendí a volar,
pero hay un lazo que sabe quedar.
No importa la edad ni el lugar donde esté:
tu amor me recuerda de dónde partí.

Hoy soy mujer fuerte, con rumbo y raíz,
y aún tu mirada me vuelve feliz.
Si el tiempo me lleva más lejos de aquí,
siempre seré tu hija, cerquita de ti.$p40$, $r40$[{"key":"recipient","count":1},{"key":"dedicator","count":1}]$r40$::jsonb);

INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles)
SELECT (SELECT id FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto'), name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles
FROM tmp_papa_mi_heroe_adult_templates s
WHERE EXISTS (SELECT 1 FROM personalized_models WHERE name = 'Papá, Mi Héroe Adulto')
  AND NOT EXISTS (SELECT 1 FROM personalized_templates t WHERE t.template_preview_key = s.template_preview_key);

UPDATE personalized_templates t
SET name = s.name,
    gender_direction = s.gender_direction,
    scene_visual = s.scene_visual,
    background_details = s.background_details,
    magic_effects = s.magic_effects,
    lighting_color = s.lighting_color,
    poem_template = s.poem_template,
    character_roles = s.character_roles
FROM tmp_papa_mi_heroe_adult_templates s
WHERE t.template_preview_key = s.template_preview_key;

UPDATE personalized_models
SET cover_scene_visual = $coveradult${NOMBRE_DESTINATARIO} aparece junto a {NOMBRE_DEDICANTE} en una azotea urbana al atardecer, ambos adultos, vestidos con elegancia sobria. La escena transmite gratitud madura entre padre e hijo/a, no fantasía infantil: el papá mira hacia el horizonte con serenidad y el dedicante lo acompaña con una mano cercana en el hombro.

Fondo y Detalles
Ciudad cálida al atardecer, baranda discreta, luces urbanas encendiéndose, objetos familiares sutiles como una taza de café, una chaqueta doblada o una pequeña caja de herramientas.

Efectos Mágicos
Hilos de luz dorada muy finos rodean a ambos como símbolo de memoria, guía y amor constante.

[ILUMINACIÓN Y COLOR]
Luz cinematográfica de atardecer, tonos dorados, azul profundo y sombras suaves. Atmósfera elegante, adulta y emotiva.$coveradult$,
    back_cover_tagline = 'Para el papá que sostuvo mi camino.',
    back_cover_scene = $backadult$Azotea urbana al atardecer sin personajes, con vista amplia de ciudad, baranda discreta, banco de madera, una chaqueta doblada, una taza de café y una caja de herramientas antigua. Hilos de luz dorada muy sutiles cruzan el encuadre como memoria familiar, cubriendo generosamente el fondo de borde a borde.$backadult$
WHERE name = 'Papá, Mi Héroe Adulto';

COMMIT;
