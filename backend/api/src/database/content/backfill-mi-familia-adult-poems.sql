-- Poemas originales para el libro adulto (modelo 9860).
--
-- El libro venía con UN solo esqueleto de poema repetido en todas sus plantillas.
-- Estos son 20 poemas nuevos, uno por tema, en las dos direcciones, con la forma
-- del libro infantil: tres estrofas de cuatro versos, rima AABB e imágenes del
-- propio tema. Lo único que cambia es la voz, que es la de un adulto.
--
-- El apodo rota por posición: inicio 1,4,7,10,13,16,19 · medio 2,5,8,11,14,17,20
-- · final 3,6,9,12,15,18. Matchea por template_preview_key, nunca por id.

-- 19. Si El Salón Fuera Una Pista
UPDATE personalized_templates SET
  poem_template = $mifamilia19yop${APODO_DESTINATARIO}, corrimos el sofá
y el piso aguantó ya
los pasos de cumbia vieja
que nadie en casa deja

Alguien llevaba el ritmo con el pie,
otro giraba sin saber por qué,
y se bajaba la luz
y se creía andaluz

Hoy bailo poco y con miedo,
en bodas, y muy quedo,
pero si suena ese tema
se me va el sistema$mifamilia19yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia19yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_19_el_album_de_lo_que_somos.webp$mifamilia19yok$ AND is_active;

--  7. Si La Sala Fuera Una Jungla
UPDATE personalized_templates SET
  poem_template = $mifamilia7yop${APODO_DESTINATARIO}, la alfombra era pantano
y el sofá, un monte lejano,
las cortinas hacían lianas
y las sillas, caravanas

Un cojín rugía de tigre,
la lámpara era un calibre,
cruzábamos la selva a gatas
buscando huellas exactas

Hoy mi living está ordenado,
ningún mueble desplazado,
y a veces corro el sillón
solo por la expedición$mifamilia7yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia7yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_07_la_cocina_donde_empieza_la_historia.webp$mifamilia7yok$ AND is_active;

--  6. Si Fuéramos Piratas
UPDATE personalized_templates SET
  poem_template = $mifamilia6yop$El sillón se volvió galeón
y la escoba, nuestro timón,
en casa izamos la bandera
y el pasillo fue ribera

Buscábamos un cofre viejo
lleno de risa y espejo,
tú hacías de capitán
y yo, de grumete holgazán

Hoy firmo papeles en tierra,
cumplo horarios de guerra,
y el tesoro, ya lo sé,
eras tú, {APODO_DESTINATARIO}, y la fe$mifamilia6yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia6yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_06_la_coreografia_de_los_dias_comunes.webp$mifamilia6yok$ AND is_active;

-- 12. Si El Jardín Fuera Un Circo Mágico
UPDATE personalized_templates SET
  poem_template = $mifamilia12yop$La manguera fue trapecio
y el perro, público necio,
en casa domaban el rosal
y otro era el mariscal

Yo caminaba en la cuerda
de ropa, sin que se pierda
el equilibrio ni el grito
de un público tan chiquito

Hoy aplaudo en teatros caros,
con asientos bien claros,
pero ninguna función
fue la tuya, {APODO_DESTINATARIO}, en acción$mifamilia12yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia12yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_12_el_puente_de_los_apellidos.webp$mifamilia12yok$ AND is_active;

--  5. Si El Supermercado Fuera Un Castillo Encantado
UPDATE personalized_templates SET
  poem_template = $mifamilia5yop$El carrito era un corcel
y el pasillo, un cuartel,
la lista venía en pergamino
y el cajero era el padrino

Con {APODO_DESTINATARIO} cruzábamos el puente
de latas y de gente,
el queso pagaba el peaje
y el pan hacía de paje

Hoy empujo mi carro sin juego,
reviso los precios luego,
pero aún oigo la trompeta
de esa feria secreta$mifamilia5yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia5yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_05_el_archivo_de_las_sobremesas.webp$mifamilia5yok$ AND is_active;

-- 14. Si La Noche Fuera Un Cuento
UPDATE personalized_templates SET
  poem_template = $mifamilia14yop$La luz bajaba despacito
y el cuarto se hacía bonito,
se leía en voz pausada
y alguien roncaba en la almohada

Con {APODO_DESTINATARIO} elegíamos el final
cuando el libro iba mal,
pedíamos otro capítulo
y nos daban un título

Hoy me duermo con pantalla
y el silencio no me calla,
y busco esa voz tranquila
que ordenaba la fila$mifamilia14yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia14yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_14_la_biblioteca_de_fotos_familiares.webp$mifamilia14yok$ AND is_active;

-- 11. Si Fuéramos Exploradores
UPDATE personalized_templates SET
  poem_template = $mifamilia11yop$Cargábamos mapa y linterna
y una brújula muy terca,
el jardín era continente
y el muro, un monte pendiente

Con {APODO_DESTINATARIO} marcamos la ruta
con tiza, rama y disputa,
el tesoro no era de oro:
era volver con el coro

Hoy viajo con pasaporte
y hoteles del norte,
pero el hallazgo mayor
sigue siendo ese fervor$mifamilia11yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia11yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_11_la_noche_de_las_historias_repetidas.webp$mifamilia11yok$ AND is_active;

--  3. Si Fuéramos Astronautas
UPDATE personalized_templates SET
  poem_template = $mifamilia3yop$La masa flotaba en la nave
y el queso subía suave,
sin gravedad no hay caída:
la cena quedó suspendida

Servíamos pizza de luna
a un marciano sin fortuna,
y cobrábamos en estrellas
y yo barría centellas

Hoy almuerzo de pie, apurado,
sin mantel y sin recado,
y pienso en esa cocina
sin suelo, {APODO_DESTINATARIO}, ni rutina$mifamilia3yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia3yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_03_la_mesa_donde_todos_cabemos.webp$mifamilia3yok$ AND is_active;

--  1. Si Fuéramos Cavernícolas
UPDATE personalized_templates SET
  poem_template = $mifamilia1yop${APODO_DESTINATARIO}, tronco por tambor,
piedra hueca por clamor,
la cueva nos dio salón
y la hoguera, reflexión

Rugíamos todos el estribillo,
y alguno marcaba el martillo,
yo entraba fuera de tono
y nadie me dejó solo

Hoy pago luz y alquiler
y vuelvo a ese taller:
la tribu que me dio compás
no se me ha ido jamás$mifamilia1yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia1yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_01_la_casa_de_los_mil_regresos.webp$mifamilia1yok$ AND is_active;

-- 10. Si Tuviéramos Superpoderes
UPDATE personalized_templates SET
  poem_template = $mifamilia10yop${APODO_DESTINATARIO}, en casa frenaban la hora
con una mano y sin demora,
y alguien cargaba el ropero
usando un solo dedo fiero

Alguien veía a través
de la puerta, y de mi estrés,
yo solo sabía esconderme
y nadie dejó de quererme

Hoy resuelvo cosas de adulto,
pago impuestos, hago bulto,
y el único poder que tengo
es el que de ustedes vengo$mifamilia10yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia10yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_10_el_jardin_de_las_generaciones.webp$mifamilia10yok$ AND is_active;

-- 18. Si La Cocina Fuera Una Pastelería Mágica
UPDATE personalized_templates SET
  poem_template = $mifamilia18yop$El horno soplaba su aliento
y la harina, un firmamento,
se glaseaban las tortas
y alguien robaba las cortas

Yo lamía la cuchara
y nadie me miraba rara,
vendíamos a los vecinos
pasteles de sueños finos

Hoy compro postre en bandeja,
bien envuelto, sin queja,
pero ninguno me sabe
como el tuyo, {APODO_DESTINATARIO}, suave$mifamilia18yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia18yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_18_la_luz_que_prende_cada_regreso.webp$mifamilia18yok$ AND is_active;

--  4. Si Estuviéramos Atascados En El Tráfico
UPDATE personalized_templates SET
  poem_template = $mifamilia4yop${APODO_DESTINATARIO}, la bocina sonaba
y el semáforo no cambiaba,
inventamos un pregón
y el atasco fue invención

Contábamos autos azules,
repartíamos gajos dulces,
el claxon llevaba el son
y el calor, la bendición

Hoy conduzco solo, sin ruido,
con el aire encendido,
y tarareo esa canción
que acortaba el callejón$mifamilia4yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia4yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_04_la_ruta_de_las_voces_mezcladas.webp$mifamilia4yok$ AND is_active;

--  9. Si Viajáramos En Globo Por El Cielo
UPDATE personalized_templates SET
  poem_template = $mifamilia9yop$El cesto de mimbre crujía
y el aire a lluvia olía,
subimos sin equipaje
con el arcoíris de paisaje

Las nubes pasaban despacio,
el pueblo cupo en un espacio,
señalábamos el río
y se soltaba el hastío

Hoy vuelo en clase apretada,
con la ventana cerrada,
y pienso en aquel viaje,
{APODO_DESTINATARIO}, y en tu lenguaje$mifamilia9yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia9yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_09_la_sala_de_los_planes_pendientes.webp$mifamilia9yok$ AND is_active;

--  8. Si La Cocina Fuera Un Laboratorio Loco
UPDATE personalized_templates SET
  poem_template = $mifamilia8yop$La harina se volvió neblina
y el tazón, una turbina,
medíamos sin medida
y salió la cena servida

Anotábamos el invento
con {APODO_DESTINATARIO} y mucho aliento,
y lo probamos primero
y aprobó el experimento

Hoy mido el café al gramo,
leo etiquetas y reclamo,
y extraño aquella cocina
donde nada se arruina$mifamilia8yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia8yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_08_el_mapa_de_nuestras_mudanzas.webp$mifamilia8yok$ AND is_active;

--  2. Si Pudiéramos Hablar Con Los Animales
UPDATE personalized_templates SET
  poem_template = $mifamilia2yop$Un zorro afinaba la flauta,
la lechuza marcaba la pauta,
el bosque entero aplaudía
y el río llevaba la guía

Con {APODO_DESTINATARIO} entendí al venado
que hablaba bajito a mi lado,
el erizo contó su secreto
y lo guardamos completo

Hoy discuto en una oficina
con gente que no me afina,
y extraño aquel idioma
donde todo era broma$mifamilia2yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia2yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_02_el_laboratorio_de_nuestras_mezclas.webp$mifamilia2yok$ AND is_active;

-- 15. Si El Parque Fuera Un Reino Fantástico
UPDATE personalized_templates SET
  poem_template = $mifamilia15yop$El tobogán fue muralla
y el arenero, batalla,
reinábamos en la banca
y otro cuidaba la tranca

Repartíamos títulos falsos:
duque del columpio, descalzos,
yo fui heraldo y bufón
y nadie pidió razón

Hoy cruzo ese parque de paso,
con el café en el vaso,
y el reino no se cayó:
lo guardas tú, {APODO_DESTINATARIO}, y yo$mifamilia15yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia15yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_15_el_taller_de_arreglarlo_juntos.webp$mifamilia15yok$ AND is_active;

-- 20. Si La Familia Fuera Un Cuento Sin Final
UPDATE personalized_templates SET
  poem_template = $mifamilia20yop$El libro no tenía última hoja
y cada noche se aloja
un capítulo distinto
en el mismo recinto

Escribimos juntos el tomo
con {APODO_DESTINATARIO}, sin saber el cómo,
cada risa fue un renglón
y cada pelea, un borrón

Hoy tengo mi estantería
y la abro cada día:
el cuento sigue abierto
y ningún final es cierto$mifamilia20yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia20yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_20_la_familia_que_siempre_encuentra_camino.webp$mifamilia20yok$ AND is_active;

-- 17. Si La Casa Fuera Una Nave Espacial
UPDATE personalized_templates SET
  poem_template = $mifamilia17yop$El pasillo fue compuerta
y la cocina, cubierta,
tú piloteabas el sillón
y otro leía el tablón

En las manchas más concretas
contábamos, {APODO_DESTINATARIO}, planetas
del techo recién pintado,
y el viaje quedó firmado

Hoy mi casa no despega,
paga cuentas y se entrega,
pero el techo sigue entero
con sus mundos y su cero$mifamilia17yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia17yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_17_el_viaje_donde_cabemos_todos.webp$mifamilia17yok$ AND is_active;

-- 16. Si El Baño Fuera Un Spa
UPDATE personalized_templates SET
  poem_template = $mifamilia16yop${APODO_DESTINATARIO}, la tina echaba vapor
y el jabón hacía rumor,
y había una sirena
y yo, un pulpo sin pena

Las burbujas subían al techo
con un arcoíris estrecho,
el patito marcaba el rumbo
y el agua, un leve retumbo

Hoy me ducho en cinco minutos,
cuento plazos y tributos,
pero al abrir bien el grifo
regresa el mismo motivo$mifamilia16yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia16yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_16_la_terraza_de_los_domingos.webp$mifamilia16yok$ AND is_active;

-- 13. Si Fuéramos Inventores Locos
UPDATE personalized_templates SET
  poem_template = $mifamilia13yop${APODO_DESTINATARIO}, el taller olía a cola
y el banco tenía una sola
pata firme; lo demás
aguantaba por detrás

Hicimos una máquina inútil
con un resorte y un fútil
tornillo que nunca entraba,
pero el motor arrancaba

Hoy firmo planos que sirven,
con sellos que los confirmen,
y añoro aquel aparato
que fallaba, y era grato$mifamilia13yop$,
  updated_at = now()
WHERE template_preview_key = $mifamilia13yok$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_13_la_estacion_de_los_abrazos_largos.webp$mifamilia13yok$ AND is_active;
