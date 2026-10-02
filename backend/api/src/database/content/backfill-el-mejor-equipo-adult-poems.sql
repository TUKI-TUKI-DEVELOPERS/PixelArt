-- Poemas originales para el libro adulto (modelo 9859).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

-- 14. Templo Kung Fu
UPDATE personalized_templates SET
  poem_template = $elmejorequipo14yop$Hoy contemplo el templo kung fu
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo14yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo14yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_14_el_puente_despues_de_cada_pelea.webp$elmejorequipo14yok$ AND is_active;

--  1. Parque Triásico
UPDATE personalized_templates SET
  poem_template = $elmejorequipo1yop${APODO_DESTINATARIO}, el parque de dinosaurios
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo1yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo1yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_01_la_estrategia_de_nuestras_locuras.webp$elmejorequipo1yok$ AND is_active;

-- 18. Bosque de los Enigmas
UPDATE personalized_templates SET
  poem_template = $elmejorequipo18yop$Regreso despacio a el bosque de enigmas
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo18yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo18yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_18_el_laboratorio_de_la_complicidad.webp$elmejorequipo18yok$ AND is_active;

--  8. Galería de los Genios
UPDATE personalized_templates SET
  poem_template = $elmejorequipo8yop$Hoy contemplo la galería brillante
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo8yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo8yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_08_el_codigo_secreto_de_la_confianza.webp$elmejorequipo8yok$ AND is_active;

--  9. Agencia Secreta de Detectives
UPDATE personalized_templates SET
  poem_template = $elmejorequipo9yop$Regreso despacio a la agencia secreta
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo9yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo9yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_09_la_noche_en_que_supimos_cubrirnos.webp$elmejorequipo9yok$ AND is_active;

-- 16. Jardín de las Maravillas
UPDATE personalized_templates SET
  poem_template = $elmejorequipo16yop${APODO_DESTINATARIO}, el jardín de maravillas
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo16yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo16yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_16_el_mapa_de_nuestras_diferencias.webp$elmejorequipo16yok$ AND is_active;

--  7. Batalla de Almohadas
UPDATE personalized_templates SET
  poem_template = $elmejorequipo7yop${APODO_DESTINATARIO}, la batalla de almohadas
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo7yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo7yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_07_la_mesa_de_los_planes_imposibles.webp$elmejorequipo7yok$ AND is_active;

-- 19. Pista de Obstáculos Fantásticos
UPDATE personalized_templates SET
  poem_template = $elmejorequipo19yop${APODO_DESTINATARIO}, la pista fantástica
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo19yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo19yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_19_la_promesa_de_estar_cerca.webp$elmejorequipo19yok$ AND is_active;

--  4. Mansión Encantada
UPDATE personalized_templates SET
  poem_template = $elmejorequipo4yop${APODO_DESTINATARIO}, la mansión encantada
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo4yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo4yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_04_el_idioma_privado_de_las_bromas.webp$elmejorequipo4yok$ AND is_active;

-- 10. Máquina del Tiempo
UPDATE personalized_templates SET
  poem_template = $elmejorequipo10yop${APODO_DESTINATARIO}, la máquina del tiempo
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo10yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo10yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_10_el_taller_de_las_soluciones_raras.webp$elmejorequipo10yok$ AND is_active;

--  2. Nave de las Nubes
UPDATE personalized_templates SET
  poem_template = $elmejorequipo2yop$Hoy contemplo la nave entre nubes
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo2yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo2yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_02_el_pacto_de_llegar_juntos.webp$elmejorequipo2yok$ AND is_active;

-- 15. Taller de Magia Creativa
UPDATE personalized_templates SET
  poem_template = $elmejorequipo15yop$Regreso despacio a el taller de magia
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo15yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo15yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_15_la_celebracion_de_seguir_siendo_equipo.webp$elmejorequipo15yok$ AND is_active;

-- 13. Torre de los Códigos
UPDATE personalized_templates SET
  poem_template = $elmejorequipo13yop${APODO_DESTINATARIO}, la torre de códigos
y tu luz abre camino
Somos grandes, mismo equipo
y aún aprendo tu destino

Crecí con cuentas y prisa
pero tu recuerdo me avisa
que el amor no pierde razón
si se guarda en el corazón

Hoy camino con calma
llevo tu risa en el alma
cada paso vuelve al hogar
donde me enseñaste a amar$elmejorequipo13yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo13yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_13_la_brujula_de_los_hermanos.webp$elmejorequipo13yok$ AND is_active;

--  5. Castillo de Cojines
UPDATE personalized_templates SET
  poem_template = $elmejorequipo5yop$Hoy contemplo el castillo de cojines
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo5yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo5yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_05_la_ruta_que_inventamos_sin_mapa.webp$elmejorequipo5yok$ AND is_active;

-- 17. Laboratorio de Bromas
UPDATE personalized_templates SET
  poem_template = $elmejorequipo17yop$Hoy contemplo el laboratorio de bromas
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo17yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo17yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_17_la_carrera_donde_nadie_queda_atras.webp$elmejorequipo17yok$ AND is_active;

-- 20. País de las Maravillas Nocturnas
UPDATE personalized_templates SET
  poem_template = $elmejorequipo20yop$Hoy contemplo la noche de maravillas
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo20yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo20yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_20_el_mejor_equipo_todavia_en_marcha.webp$elmejorequipo20yok$ AND is_active;

--  3. Laboratorio de Juegos
UPDATE personalized_templates SET
  poem_template = $elmejorequipo3yop$Regreso despacio a el laboratorio de juegos
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo3yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo3yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_03_la_banda_sonora_de_nuestras_batallas.webp$elmejorequipo3yok$ AND is_active;

-- 11. Isla Calavera
UPDATE personalized_templates SET
  poem_template = $elmejorequipo11yop$Hoy contemplo la isla calavera
con mis años ya en camino
Somos grandes, mismo equipo
y sostengo tu destino

Cuando la vida pesa fuerte
{APODO_DESTINATARIO} me devuelve suerte
tu enseñanza vuelve a brillar
y me ayuda a continuar

No quedó atrás lo vivido
sigue latiendo conmigo
cada memoria da señal
de un amor que sigue igual$elmejorequipo11yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo11yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_11_la_patrulla_de_los_dias_dificiles.webp$elmejorequipo11yok$ AND is_active;

-- 12. Valle de los Dragones
UPDATE personalized_templates SET
  poem_template = $elmejorequipo12yop$Regreso despacio a el valle de dragones
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo12yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo12yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_12_el_refugio_donde_nadie_actua_solo.webp$elmejorequipo12yok$ AND is_active;

--  6. Cueva del Tesoro Escondido
UPDATE personalized_templates SET
  poem_template = $elmejorequipo6yop$Regreso despacio a la cueva del tesoro
sin apurar ningún camino
Somos grandes, mismo equipo
y agradezco tu destino

Lo que aprendí se queda
como pan sobre la mesa
si la noche quiere pesar
tu recuerdo vuelve a alumbrar

Guardo tu voz en mi pecho
como refugio perfecto
y al nombrarte siento amor
mi siempre querido {APODO_DESTINATARIO}$elmejorequipo6yop$,
  updated_at = now()
WHERE template_preview_key = $elmejorequipo6yok$IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_06_el_archivo_de_nuestras_victorias_pequenas.webp$elmejorequipo6yok$ AND is_active;
