-- Poemas originales para el libro adulto (modelo 9865).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  1. Memoria Familiar Abuela Porque eres mi Superheroína
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela1nietap${APODO_DESTINATARIO}, tu capa era una manta
y tu escudo, la garganta:
decías dos palabras tuyas
y se acababan las bullas

Criaste nietos y gallinas
en el mismo patio, con espinas
de hierba entre los dedos,
y nunca tuviste miedos

Hoy pido ayuda para todo
y me cansa cualquier modo
de día largo, y tú jamás
te sentabas ni un compás$siempreenmicorazonabuela1nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela1nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp$siempreenmicorazonabuela1nietak$ AND is_active;

--  3. Memoria Familiar Abuela Porque eres una Hechicera
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela3nietap$Tenías un huerto de hierbas
detrás de las dos puertas:
muña, ruda y manzanilla
para cada pesadilla

Sabías cuál era para el susto
y cuál para el disgusto,
y preparabas la infusión
rezando una oración

Hoy busco en internet
cuál hierba es para qué,
y no encuentro, {APODO_DESTINATARIO}, el rezo
que le ponías de regreso$siempreenmicorazonabuela3nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela3nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp$siempreenmicorazonabuela3nietak$ AND is_active;

--  8. Memoria Familiar Abuela Porque cumples mis Deseos
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela8nietap$Quería una muñeca de caja
y me tejiste una de lana
con dos botones por ojos
y una pollera de rojos

En una bolsa de tela
la guardo, {APODO_DESTINATARIO}, y me duela
o no, la saco en agosto
y le arreglo el mismo rostro

Hoy compro lo que me gusta
y nada me dura ni ajusta
como esa muñeca torcida
que sigue siendo la mía$siempreenmicorazonabuela8nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela8nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp$siempreenmicorazonabuela8nietak$ AND is_active;

--  7. Memoria Familiar Abuela Porque eres Divertida
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela7nietap${APODO_DESTINATARIO}, te reías con la boca
tapada, como si fuera poca
cosa reírse muy fuerte,
y temblaba todo el mueble

Contabas los mismos cuentos
con remates muy violentos
de risa, y nos moríamos
aunque ya los sabíamos

Hoy me río para afuera,
medida, como quien espera
permiso, y me hace falta
tu risa tapada y alta$siempreenmicorazonabuela7nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela7nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp$siempreenmicorazonabuela7nietak$ AND is_active;

--  6. Memoria Familiar Abuela Porque eres Aventurera
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela6nietap$Te ibas al mercado a las cuatro
y volvías como un retrato
con la manta bien cargada
de papas y de granada

Caminabas más que un camión
y decías que era pasión
y no falta de pasaje,
aunque faltaba el coraje

Hoy tomo taxi dos cuadras
y me quejo de las cargas,
y extraño, {APODO_DESTINATARIO}, esa manta
y el mercado a la madrugada$siempreenmicorazonabuela6nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela6nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp$siempreenmicorazonabuela6nietak$ AND is_active;

-- 14. Memoria Familiar Abuela Porque eres una Rebelde
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela14nietap$Dejaste de ir a la misa
cuando el cura, con sonrisa,
habló mal de las que crían
sin marido y sin porfía

Rezabas igual en la casa,
{APODO_DESTINATARIO}, con tu propia traza,
sin permiso de nadie
y con un solo santo al aire

Hoy discuto en los grupos
y me bloquean algunos,
y entiendo que lo tuyo
era irse sin barullo$siempreenmicorazonabuela14nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela14nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp$siempreenmicorazonabuela14nietak$ AND is_active;

-- 12. Memoria Familiar Abuela Porque eres Generosa
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela12nietap$Cocinabas para diez
cuando éramos seis,
y el resto se repartía
entre quien pasaba ese día

Nunca dijiste que faltaba:
estirabas lo que quedaba
con más agua y más papa,
y salía igual de guapa

Hoy cocino medido y exacto
y me sobra casi un plato
que termino tirando; perdón,
{APODO_DESTINATARIO}, por ese renglón$siempreenmicorazonabuela12nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela12nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp$siempreenmicorazonabuela12nietak$ AND is_active;

-- 19. Memoria Familiar Abuela Porque eres mi Viajera del Tiempo
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela19nietap${APODO_DESTINATARIO}, el tiempo en tu cocina
iba al ritmo de la harina:
ni muy rápido ni lento,
al punto y a su tiempo

Nunca te vi mirar la hora,
mirabas si ya estaba la mora
en el árbol, o si el pan
había subido o no más

Hoy mido en minutos todo
y llego tarde de igual modo,
y pienso que tu reloj
era mejor que el de hoy$siempreenmicorazonabuela19nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela19nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp$siempreenmicorazonabuela19nietak$ AND is_active;

--  5. Memoria Familiar Abuela Porque eres Encantadora
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela5nietap$Te llamaban de otras casas
para hablar con las cuñadas
que ya no se saludaban,
y volvían a ser hermanas

Sabías oír sin receta,
{APODO_DESTINATARIO}, y sin dar la respuesta,
dejabas hablar completo
y al final decías lo cierto

Hoy escucho con el celular
en la mano, sin mirar
la cara de quien me habla,
y pierdo lo que faltaba$siempreenmicorazonabuela5nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela5nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp$siempreenmicorazonabuela5nietak$ AND is_active;

-- 20. Memoria Familiar Abuela Porque eres mi Ángel Guardián
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela20nietap$No te pienso con alas blancas:
te pienso con esas mangas
subidas, la masa en la mesa
y la radio con su novela

Cuando amaso en la mañana
te hablo, {APODO_DESTINATARIO}, y no me extraña
que me salga igual que a ti:
las manos aprendieron de aquí

Si hay algo al otro lado
que no sea un patio arreglado
con gallinas y con sol,
devuélvelo, no es tu rol$siempreenmicorazonabuela20nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela20nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp$siempreenmicorazonabuela20nietak$ AND is_active;

--  2. Memoria Familiar Abuela Porque eres mi Guía
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela2nietap$Hablabas poco, y en quechua
cuando el asunto era de deudas
del alma, y yo entendía
sin saber lo que decía

Me guiabas con la mirada
en la mesa, {APODO_DESTINATARIO}, y bastaba
un gesto para entender
si me tocaba ceder

Hoy explico por escrito
y repito lo ya dicho,
y nadie entiende ni la mitad
de lo que tú decías sin hablar$siempreenmicorazonabuela2nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela2nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp$siempreenmicorazonabuela2nietak$ AND is_active;

-- 16. Memoria Familiar Abuela Porque eres mi Guardiana de Historias
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela16nietap${APODO_DESTINATARIO}, sabías los apodos
de los muertos y de todos
los vivos del caserío,
y por qué se fue el tío

Contabas de cuando el río
se llevó medio sembrío
y nadie se murió de hambre
porque todos dieron parte

Hoy nadie cuenta esas cosas
y las fechas quedan sosas,
yo pregunto y nadie acierta,
y escribo lo que recuerda$siempreenmicorazonabuela16nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela16nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp$siempreenmicorazonabuela16nietak$ AND is_active;

--  4. Memoria Familiar Abuela Porque eres una Líder
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela4nietap${APODO_DESTINATARIO}, decidías en la cocina
y la familia lo asumía,
no hacía falta discutir:
tu olla era el porvenir

Repartías las tareas
sin discursos ni peleas:
una mirada bastaba
y la casa funcionaba

Hoy pido las cosas tres veces
y nadie me obedece,
y me falta tu silencio
que valía por un decreto$siempreenmicorazonabuela4nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela4nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp$siempreenmicorazonabuela4nietak$ AND is_active;

-- 17. Memoria Familiar Abuela Porque eres mi Raíz y mi Fuerza
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela17nietap$Tejías de noche en el telar
lo que vendías al pasar
el camión de los domingos,
y de ahí salieron los ladrillos

Tu fuerza estaba en la paciencia
de la lana, {APODO_DESTINATARIO}, y la ausencia
de apuro: deshacer lo torcido
y empezar otra vez, sin ruido

Hoy compro ropa barata
y ninguna me abraza
como esa chompa marrón
que sigue entera en el cajón$siempreenmicorazonabuela17nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela17nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp$siempreenmicorazonabuela17nietak$ AND is_active;

-- 10. Memoria Familiar Abuela Porque eres una Soñadora
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela10nietap${APODO_DESTINATARIO}, querías ver el mar
y lo decías al pasar,
como quien pide permiso
para un sueño muy preciso

Te llevamos a los ochenta,
te quedaste media hora atenta
mirando, sin meter los pies,
y dijiste "ya está bien"

Hoy viajo cuando quiero
y casi nunca lo prefiero,
y entiendo que el mar no importaba:
importaba que alguien te llevara$siempreenmicorazonabuela10nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela10nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp$siempreenmicorazonabuela10nietak$ AND is_active;

-- 11. Memoria Familiar Abuela Porque me haces sentir Seguro
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela11nietap$Dormíamos las tres juntas
en un colchón sin preguntas,
tú al borde, por si acaso,
y yo pegada a tu brazo

Cuando tronaba rezabas
en voz baja, {APODO_DESTINATARIO}, y pasaba:
el trueno seguía igual
pero ya no me hacía mal

Hoy duermo sola y con ruido
de la calle, y he aprendido
que ninguna cerradura
suena como esa dulzura$siempreenmicorazonabuela11nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela11nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp$siempreenmicorazonabuela11nietak$ AND is_active;

-- 13. Memoria Familiar Abuela Porque eres Atrevida
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela13nietap${APODO_DESTINATARIO}, te subiste a un caballo
a los setenta, sin fallo,
porque alguien dijo que no podías,
y diste dos vueltas ese día

Usabas pollera roja
cuando el luto era la moda,
y decías que de negro
nadie vuelve, ni el abuelo

Hoy me visto de prudente
para no incomodar a la gente,
y guardo esa pollera
donde se vea, la primera$siempreenmicorazonabuela13nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela13nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp$siempreenmicorazonabuela13nietak$ AND is_active;

-- 15. Memoria Familiar Abuela Porque eres Alegre
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela15nietap$Cantabas huaynos lavando
y el patio iba contestando
con las gallinas y el viento,
y era fiesta en cualquier momento

Hacías mazamorra morada
sin que fuera fecha marcada,
y el olor llegaba a la esquina
y venía toda la vecina

Hoy compro postres de vitrina
y ninguno me ilumina
la tarde como aquella olla,
{APODO_DESTINATARIO}, ni esa bulla criolla$siempreenmicorazonabuela15nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela15nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp$siempreenmicorazonabuela15nietak$ AND is_active;

-- 18. Memoria Familiar Abuela Porque eres mi Estrella Guía
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela18nietap$No me enseñaste a rezar
de memoria, sino a mirar
la vela antes de dormir
y agradecer sin pedir

Decías que el que agradece
tiene la casa que merece,
y que pedir sin dar nada
deja la puerta cerrada

Hoy no rezo, pero cuento
en voz baja, antes del sueño,
tres cosas que salieron bien,
y en las tres, {APODO_DESTINATARIO}, estás también$siempreenmicorazonabuela18nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela18nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp$siempreenmicorazonabuela18nietak$ AND is_active;

--  9. Memoria Familiar Abuela Porque eres Valiente
UPDATE personalized_templates SET
  poem_template = $siempreenmicorazonabuela9nietap$Cuando todos se fueron al norte
te quedaste, sin más corte,
cuidando una casa vacía
y una tierra que no daría

No lloraste en la despedida:
cocinaste para la ida,
pusiste todo en bolsitas
y saludaste desde la esquina

Hoy me despido por pantalla
y lloro antes de la falla
de señal, y pienso en tu mano,
{APODO_DESTINATARIO}, saludando temprano$siempreenmicorazonabuela9nietap$,
  updated_at = now()
WHERE template_preview_key = $siempreenmicorazonabuela9nietak$IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp$siempreenmicorazonabuela9nietak$ AND is_active;
