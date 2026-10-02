-- Poemas originales para el libro adulto (modelo 9862).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  4. El Ángel Guardián de la Familia De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo4nietop${APODO_DESTINATARIO}, tus alas de guardián
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo4nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo4nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_nieto_a_abuelo.webp$teamoabuelo4nietok$ AND is_active;

--  4. El Ángel Guardián de la Familia De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo4nietap${APODO_DESTINATARIO}, tus alas de guardián
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo4nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo4nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_nieta_a_abuelo.webp$teamoabuelo4nietak$ AND is_active;

-- 15. Las Lecciones Que Solo Tú Me Das De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo15nietop$Regreso despacio a tus lecciones claras
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo15nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo15nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_nieto_a_abuelo.webp$teamoabuelo15nietok$ AND is_active;

--  2. El Rey de Mi Corazón De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo2nietop$Hoy contemplo tu corona serena
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo2nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo2nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_nieto_a_abuelo.webp$teamoabuelo2nietok$ AND is_active;

--  8. El Arquitecto de Mis Recuerdos De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo8nietop$Hoy contemplo tus planos de memoria
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo8nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo8nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_nieto_a_abuelo.webp$teamoabuelo8nietok$ AND is_active;

-- 20. Siempre Seré Tu Pequeño De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo20nietop$Hoy contemplo tu historia y mi raíz
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo20nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo20nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_nieto_a_abuelo.webp$teamoabuelo20nietok$ AND is_active;

-- 10. El Guardián del Tiempo De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo10nietop${APODO_DESTINATARIO}, tu reloj del tiempo
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo10nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo10nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_nieto_a_abuelo.webp$teamoabuelo10nietok$ AND is_active;

--  5. Capitán de Mil Aventuras De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo5nietap$Hoy contemplo tu timón de aventuras
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo5nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo5nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_nieta_a_abuelo.webp$teamoabuelo5nietak$ AND is_active;

-- 18. Tu Abrazo Que Todo lo Arregla De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo18nietop$Regreso despacio a tu abrazo que cura
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo18nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo18nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_nieto_a_abuelo.webp$teamoabuelo18nietok$ AND is_active;

-- 16. Nuestros Secretos Compartidos De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo16nietop${APODO_DESTINATARIO}, nuestros secretos
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo16nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo16nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_nieto_a_abuelo.webp$teamoabuelo16nietok$ AND is_active;

-- 10. El Guardián del Tiempo De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo10nietap${APODO_DESTINATARIO}, tu reloj del tiempo
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo10nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo10nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_nieta_a_abuelo.webp$teamoabuelo10nietak$ AND is_active;

--  6. El Sabio de Todas las Historias De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo6nietap$Regreso despacio a tu libro de historias
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo6nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo6nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_nieta_a_abuelo.webp$teamoabuelo6nietak$ AND is_active;

-- 11. Mi Faro en la Tormenta De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo11nietop$Hoy contemplo tu faro en la lluvia
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo11nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo11nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_nieto_a_abuelo.webp$teamoabuelo11nietok$ AND is_active;

--  3. Mi Caballero de Armadura Dorada De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo3nietop$Regreso despacio a tu armadura dorada
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo3nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo3nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_nieto_a_abuelo.webp$teamoabuelo3nietok$ AND is_active;

--  7. Mi Guerrero Invencible De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo7nietap${APODO_DESTINATARIO}, tu escudo invencible
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo7nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo7nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_nieta_a_abuelo.webp$teamoabuelo7nietak$ AND is_active;

--  8. El Arquitecto de Mis Recuerdos De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo8nietap$Hoy contemplo tus planos de memoria
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo8nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo8nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_nieta_a_abuelo.webp$teamoabuelo8nietak$ AND is_active;

--  9. Mi Titán de Amor De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo9nietap$Regreso despacio a tu fuerza de titán
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo9nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo9nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_nieta_a_abuelo.webp$teamoabuelo9nietak$ AND is_active;

--  5. Capitán de Mil Aventuras De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo5nietop$Hoy contemplo tu timón de aventuras
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo5nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo5nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_nieto_a_abuelo.webp$teamoabuelo5nietok$ AND is_active;

-- 11. Mi Faro en la Tormenta De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo11nietap$Hoy contemplo tu faro en la lluvia
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo11nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo11nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_nieta_a_abuelo.webp$teamoabuelo11nietak$ AND is_active;

-- 13. Tus Historias Mágicas De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo13nietop${APODO_DESTINATARIO}, tus cuentos mágicos
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo13nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo13nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_nieto_a_abuelo.webp$teamoabuelo13nietok$ AND is_active;

-- 12. El Gigante de Corazón Tierno De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo12nietop$Regreso despacio a tu gigante tierno
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo12nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo12nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_nieto_a_abuelo.webp$teamoabuelo12nietok$ AND is_active;

-- 17. Cuando Me Haces Reír De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo17nietop$Hoy contemplo tu risa encendida
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo17nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo17nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_nieto_a_abuelo.webp$teamoabuelo17nietok$ AND is_active;

-- 14. Aventuras en Tu Jardín De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo14nietop$Hoy contemplo tu jardín de aventuras
con mis años ya en camino
Soy tu nieto, ya adulto
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo14nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo14nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_nieto_a_abuelo.webp$teamoabuelo14nietok$ AND is_active;

-- 19. Enseñándome el Mundo De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo19nietop${APODO_DESTINATARIO}, tu mapa del mundo
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo19nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo19nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_nieto_a_abuelo.webp$teamoabuelo19nietok$ AND is_active;

-- 16. Nuestros Secretos Compartidos De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo16nietap${APODO_DESTINATARIO}, nuestros secretos
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo16nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo16nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_nieta_a_abuelo.webp$teamoabuelo16nietak$ AND is_active;

-- 12. El Gigante de Corazón Tierno De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo12nietap$Regreso despacio a tu gigante tierno
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo12nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo12nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_nieta_a_abuelo.webp$teamoabuelo12nietak$ AND is_active;

-- 14. Aventuras en Tu Jardín De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo14nietap$Hoy contemplo tu jardín de aventuras
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo14nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo14nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_nieta_a_abuelo.webp$teamoabuelo14nietak$ AND is_active;

--  2. El Rey de Mi Corazón De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo2nietap$Hoy contemplo tu corona serena
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo2nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo2nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_nieta_a_abuelo.webp$teamoabuelo2nietak$ AND is_active;

--  1. Mi Superhéroe de Canas Plateadas De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo1nietap${APODO_DESTINATARIO}, tu capa plateada
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo1nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo1nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_nieta_a_abuelo.webp$teamoabuelo1nietak$ AND is_active;

--  6. El Sabio de Todas las Historias De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo6nietop$Regreso despacio a tu libro de historias
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo6nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo6nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_nieto_a_abuelo.webp$teamoabuelo6nietok$ AND is_active;

--  3. Mi Caballero de Armadura Dorada De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo3nietap$Regreso despacio a tu armadura dorada
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo3nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo3nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_nieta_a_abuelo.webp$teamoabuelo3nietak$ AND is_active;

-- 13. Tus Historias Mágicas De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo13nietap${APODO_DESTINATARIO}, tus cuentos mágicos
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo13nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo13nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_nieta_a_abuelo.webp$teamoabuelo13nietak$ AND is_active;

-- 20. Siempre Seré Tu Pequeño De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo20nietap$Hoy contemplo tu historia y mi raíz
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo20nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo20nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_nieta_a_abuelo.webp$teamoabuelo20nietak$ AND is_active;

-- 18. Tu Abrazo Que Todo lo Arregla De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo18nietap$Regreso despacio a tu abrazo que cura
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo18nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo18nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_nieta_a_abuelo.webp$teamoabuelo18nietak$ AND is_active;

-- 17. Cuando Me Haces Reír De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo17nietap$Hoy contemplo tu risa encendida
con mis años ya en camino
Soy tu nieta, ya adulta
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$teamoabuelo17nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo17nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_nieta_a_abuelo.webp$teamoabuelo17nietak$ AND is_active;

--  9. Mi Titán de Amor De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo9nietop$Regreso despacio a tu fuerza de titán
sin apurar ningún camino
Soy tu nieto, ya adulto
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo9nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo9nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_nieto_a_abuelo.webp$teamoabuelo9nietok$ AND is_active;

--  1. Mi Superhéroe de Canas Plateadas De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo1nietop${APODO_DESTINATARIO}, tu capa plateada
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo1nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo1nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_nieto_a_abuelo.webp$teamoabuelo1nietok$ AND is_active;

--  7. Mi Guerrero Invencible De Nieto a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo7nietop${APODO_DESTINATARIO}, tu escudo invencible
y tu luz abre camino
Soy tu nieto, ya adulto
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo7nietop$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo7nietok$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_nieto_a_abuelo.webp$teamoabuelo7nietok$ AND is_active;

-- 19. Enseñándome el Mundo De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo19nietap${APODO_DESTINATARIO}, tu mapa del mundo
y tu luz abre camino
Soy tu nieta, ya adulta
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$teamoabuelo19nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo19nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_nieta_a_abuelo.webp$teamoabuelo19nietak$ AND is_active;

-- 15. Las Lecciones Que Solo Tú Me Das De Nieta a Abuelo
UPDATE personalized_templates SET
  poem_template = $teamoabuelo15nietap$Regreso despacio a tus lecciones claras
sin apurar ningún camino
Soy tu nieta, ya adulta
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$teamoabuelo15nietap$,
  updated_at = now()
WHERE template_preview_key = $teamoabuelo15nietak$IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_nieta_a_abuelo.webp$teamoabuelo15nietak$ AND is_active;
