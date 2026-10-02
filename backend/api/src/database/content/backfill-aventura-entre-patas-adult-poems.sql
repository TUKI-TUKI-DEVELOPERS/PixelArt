-- Poemas originales para el libro adulto (modelo 9857).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

--  1. Piratas del Tesoro Escondido
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas1humanop${APODO_DESTINATARIO}, el mapa es una toalla
y el patio entero, la playa,
cavamos donde no hay nada
y encontramos la jornada

Tú ladras a la gaviota,
yo marco la ruta en la bota,
el tesoro no era de plata:
era esta tarde barata

Tengo treinta y dos años
y entierro cofres extraños,
nadie en la oficina lo sabe
y en tu hocico está la llave$aventuraentrepatas1humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas1humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_01_el_explorador_de_senderos_secretos.webp$aventuraentrepatas1humanok$ AND is_active;

--  2. Superhéroes al Rescate
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas2humanop$La capa es una franela
y el sillón, nuestra escuela
de saltos sin consecuencia
y con mucha insistencia

Salvamos la cuadra sin prisa
de un peligro que es brisa,
{APODO_DESTINATARIO} muerde al villano
y yo lo vuelvo humano

Hoy mi trabajo es de escritorio,
sin capa y sin oratorio,
pero a las siete, en la puerta,
la misión sigue despierta$aventuraentrepatas2humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas2humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_02_el_capitan_de_las_tardes_de_playa.webp$aventuraentrepatas2humanok$ AND is_active;

--  3. Astronautas en el Espacio
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas3humanop$Flotamos sin gravedad
con toda naturalidad,
el universo es cartón
y la luna, un colchón

Tú llevas casco de plástico
y un gesto medio elástico,
yo apunto a una estrella
y tú le ladras a ella

Mañana vuelvo al horario,
al tráfico y al diario,
pero esta noche el cosmos
es tuyo, {APODO_DESTINATARIO}, y nosotros$aventuraentrepatas3humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas3humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_03_el_detective_de_huellas_felices.webp$aventuraentrepatas3humanok$ AND is_active;

--  4. Caballeros del Reino Mágico
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas4humanop${APODO_DESTINATARIO}, la escoba es mi lanza
y tu collar, la alianza,
defendemos el pasillo
de un dragón amarillo

Tú gruñes como armadura
y yo juro con voz dura,
el reino mide dos cuartos
y sobran los sobresaltos

Hoy firmo actas, no decretos,
y cumplo plazos concretos,
pero el juramento aquel
sigue siendo el más fiel$aventuraentrepatas4humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas4humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_04_el_guardian_del_campamento.webp$aventuraentrepatas4humanok$ AND is_active;

--  5. Detectives del Misterio
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas5humanop$Falta una media en la casa
y seguimos esa traza,
la lupa es de juguete
y el caso, un sainete

El caso se cierra a la vista:
{APODO_DESTINATARIO} ya tiene la pista,
el culpable era el sofá
y nadie lo negará

Hoy reviso mis facturas
con lupa y con premuras,
y ningún caso resuelto
me dio tanto consuelo$aventuraentrepatas5humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas5humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_05_la_ruta_que_elegimos_juntos.webp$aventuraentrepatas5humanok$ AND is_active;

--  6. Científicos Locos
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas6humanop$La mesa tiembla de frascos
y el bicarbonato hace chascos,
la espuma sube al techo
y el experimento, maltrecho

Tú lames la probeta
y arruinas la receta,
yo mido mal el polvo
y el volcán se hace un bollo

Hoy trabajo con planillas
y celdas amarillas,
y el único hallazgo mío
fuiste tú, {APODO_DESTINATARIO}, y tu brío$aventuraentrepatas6humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas6humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_06_tres_huellas_en_la_ciudad.webp$aventuraentrepatas6humanok$ AND is_active;

--  7. Ninjas Secretos
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas7humanop${APODO_DESTINATARIO}, cruzamos el parqué
sin que cruja ni un pie,
tú con capucha de trapo
y yo descalzo y guapo

La misión es la alacena
y el botín, una cadena
de galletas mal cerradas
que caen desparramadas

Hoy llego tarde y sin ruido,
con el abrigo torcido,
sigo entrenando el sigilo
y tú rompiendo el hilo$aventuraentrepatas7humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas7humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_07_el_mapa_de_los_domingos.webp$aventuraentrepatas7humanok$ AND is_active;

--  8. Magos y Hechiceros
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas8humanop$La sábana es una túnica
y la cuchara, mi única
varita con poder
para hacerte aparecer

Conoce el conjuro, {APODO_DESTINATARIO}:
se sienta y mira al muro,
aparece una galleta
y el truco se completa

Hoy la magia es pagar cuentas
y que no salgan lentas,
pero aún digo tu nombre
y el día entero se asombre$aventuraentrepatas8humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas8humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_08_el_copiloto_de_las_montanas.webp$aventuraentrepatas8humanok$ AND is_active;

--  9. Mi Guardián Peludo
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas9humanop$Te echas al pie del sofá
y vigilas lo que vendrá,
no ladras por costumbre:
ladras por incertidumbre

Si alguien toca el portón
te paras como un cañón
sin preguntar el motivo,
solo por instinto vivo

Duermo con la puerta abierta
porque hay alguien que alerta,
y ese alguien, {APODO_DESTINATARIO}, no cobra:
cobra caricias de sobra$aventuraentrepatas9humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas9humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_09_el_cafe_donde_siempre_volvemos.webp$aventuraentrepatas9humanok$ AND is_active;

-- 10. Abrazos Que Curan Todo
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas10humanop${APODO_DESTINATARIO}, me arrodillo en el piso
y tú vienes sin aviso,
pones la frente en mi pecho
y el día queda deshecho

No sé qué parte sanaste
ni con qué me curaste,
pero el nudo de la garganta
se deshizo en tu manta

Tengo seguro y psicólogo,
agenda y monólogo,
y el abrazo que más vale
no se pide: se sale$aventuraentrepatas10humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas10humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_10_la_patrulla_de_las_luces.webp$aventuraentrepatas10humanok$ AND is_active;

-- 11. Secretos Entre Mejores Amigos
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas11humanop$Te cuento lo que no digo
en la mesa ni al amigo,
tú escuchas con una oreja
y la otra se despereza

No da consejos, {APODO_DESTINATARIO},
ni me manda a los espejos,
solo apoya la cabeza
y el secreto ya no pesa

Hoy pago terapia por hablar
y aprendo a no callar,
pero el primer confesor
tenía cola y olor$aventuraentrepatas11humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas11humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_11_el_buscador_de_tesoros_simples.webp$aventuraentrepatas11humanok$ AND is_active;

-- 12. Lágrimas Secadas Con Lamidas
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas12humanop$Lloré en ese sofá marrón
sin dar ninguna explicación,
no viniste a consolar:
viniste a acompañar

Me lamiste la mejilla
sin preguntar por la astilla
que llevaba en el costado,
y quedó todo lavado

Hoy lloro poco y a escondidas,
con las luces encendidas,
pero si vuelve el vacío
te nombro, {APODO_DESTINATARIO}, y es mío$aventuraentrepatas12humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas12humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_12_la_carrera_contra_el_viento.webp$aventuraentrepatas12humanok$ AND is_active;

-- 13. Cama Compartida
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas13humanop${APODO_DESTINATARIO}, ocupas medio colchón
y me dejas un rincón,
roncas mucho antes que yo
y nadie te lo prohibió

La manta se reparte mal,
tu calor es desigual,
pero duermo de un tirón
desde que estás, campeón

Me dijeron que era un error,
que el pelo sería lo peor,
pero pagué esta cama
y la mitad es tu drama$aventuraentrepatas13humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas13humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_13_el_picnic_de_las_grandes_historias.webp$aventuraentrepatas13humanok$ AND is_active;

-- 14. Protector de Pesadillas
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas14humanop$A las tres me despertaba
un sueño que no acababa,
la casa estaba callada
y la noche, muy larga

Subía a la cama {APODO_DESTINATARIO}
sin que yo dijera nada,
se echaba contra mi espalda
y la pesadilla se calla

Hoy duermo con pastilla
a veces, y con rodilla
doblada, pero recuerdo
quién hacía ese acuerdo$aventuraentrepatas14humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas14humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_14_el_faro_de_los_dias_largos.webp$aventuraentrepatas14humanok$ AND is_active;

-- 15. El Primer Encuentro
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas15humanop$Cabías en una mano
y temblabas, hermano,
la caja decía "regalo"
y mordiste mi dedo malo

Dijeron que era pequeño
y que crecería un sueño,
yo no le hacía caso a nadie:
ya eras parte del aire

Han pasado tantos años
y quedan los mismos daños:
un sillón, {APODO_DESTINATARIO}, mordido
y un corazón más crecido$aventuraentrepatas15humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas15humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_15_el_guardian_de_la_biblioteca.webp$aventuraentrepatas15humanok$ AND is_active;

-- 16. Escondidas Imposibles
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas16humanop${APODO_DESTINATARIO}, te tapas los ojos
y asumes que estoy flojo,
pero la cola te delata
golpeando contra la lata

Cuento hasta diez muy lento
para darte más momento,
igual te encuentro al toque
detrás del mismo roble

Hoy esconder es mi oficio:
cansancio bajo el inicio
de cada día, y aun así
tú me descubres a mí$aventuraentrepatas16humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas16humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_16_la_brujula_de_los_dias_nuevos.webp$aventuraentrepatas16humanok$ AND is_active;

-- 17. Persecución en el Jardín
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas17humanop$Salimos los dos disparados
y el pasto quedó arrasado,
yo doy tres vueltas al palto
y tú me ganas de un salto

Frena en seco {APODO_DESTINATARIO}
y vuelve a buscar el hueco
donde dejé la pelota
y la trae, medio rota

Hoy corro en cinta, mirando
una pantalla contando
calorías y distancia,
sin pasto y sin tu constancia$aventuraentrepatas17humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas17humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_17_el_taller_de_trucos_imposibles.webp$aventuraentrepatas17humanok$ AND is_active;

-- 18. Clase de Trucos Fallidos
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas18humanop$Te enseñé a dar la pata
y aprendiste a dar la lata,
"siéntate" fue "acostado"
y el premio igual fue dado

El "rueda" nunca cuajó
y el "quieto" se desarmó,
durabas menos de un rato
y yo igual te di el plato

Hoy doy charlas en la empresa
y nadie escucha con destreza,
pero el alumno más torpe
me enseñó, {APODO_DESTINATARIO}, el porte$aventuraentrepatas18humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas18humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_18_la_noche_de_cine_bajo_estrellas.webp$aventuraentrepatas18humanok$ AND is_active;

-- 19. Aventureros de Dinosaurios
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas19humanop${APODO_DESTINATARIO}, cavamos en el patio
buscando un lagarto sabio,
salió una raíz torcida
y una cuchara perdida

Yo narraba como experto
cada hallazgo incierto,
tú masticabas el fósil
y lo volvías dócil

Hoy explico informes largos
a gente de gestos amargos,
y extraño cavar contigo
sin informe y sin castigo$aventuraentrepatas19humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas19humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_19_el_jardin_de_las_huellas_brillantes.webp$aventuraentrepatas19humanok$ AND is_active;

-- 20. Día de Playa Perfecto
UPDATE personalized_templates SET
  poem_template = $aventuraentrepatas20humanop$La orilla borra las huellas
y el mar sube hasta ellas,
tú ladras a cada ola
como si fuera sola

Cavamos un hoyo redondo
que el agua llenó hasta el fondo,
{APODO_DESTINATARIO} vigila el balde
y la tarde no hace alarde

Tengo fotos de ese día
en un disco que no abría
hace años, y hoy las vi:
estábamos los dos ahí$aventuraentrepatas20humanop$,
  updated_at = now()
WHERE template_preview_key = $aventuraentrepatas20humanok$IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/Plantilla_20_aventuras_que_siempre_vuelven.webp$aventuraentrepatas20humanok$ AND is_active;
