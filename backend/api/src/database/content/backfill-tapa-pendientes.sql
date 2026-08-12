-- backfill-tapa-pendientes.sql — cierre de Fase D: cover_scene_visual de los
-- 6 libros que backfill-tapa-contratapa-resto.sql dejó afuera a propósito
-- (tratamiento de identidad especial sin resolver en ese momento). Decisión
-- tomada libro por libro con el usuario:
--
-- - Los 4 de Memorias Familiares + Nuestro Angel de 4 patas: se mantiene el
--   concepto de "presencia etérea/translúcida" para la persona/mascota
--   fallecida (recipient), agregando una aclaración explícita de que el
--   rostro/forma debe seguir siendo fiel a la foto de referencia aunque se
--   vea translúcido — no validado aún con generación real, a probar.
-- - Nuestro Angel de 4 patas reusa el fondo celestial YA APROBADO (mismo
--   texto que back_cover_scene) y el motivo de "puente de luz" ya usado en
--   sus propias plantillas interiores (Plantilla 20).
-- - Mi Amor: no era un problema nuevo — el libro ya es de "arquetipos"
--   (cada plantilla interior viste al destinatario con un disfraz distinto
--   sobre su foto real). El vestuario renacentista es la misma técnica ya
--   probada, un disfraz más.
--
-- Idempotente (UPDATE incondicional, mismo patrón que backfill-tapa-contratapa-resto.sql).

BEGIN;

UPDATE personalized_models SET cover_scene_visual = $covp1${NOMBRE_DEDICANTE} camina hacia el árbol con la mirada esperanzada; {NOMBRE_DESTINATARIO} aparece como una presencia translúcida de luz dorada cálida, integrada entre las ramas, como si lo abrazara suavemente desde la luz — su rostro se mantiene reconocible y fiel a la fotografía de referencia, aunque su cuerpo se vea etéreo y luminoso.

Fondo y Detalles
Un árbol ancestral enorme con ramas que se extienden de borde a borde del encuadre, un cielo nocturno estrellado con destellos suaves detrás, raíces brillantes visibles en la base.

Efectos Mágicos
Hojas doradas cayendo suavemente y formando un puente luminoso entre las ramas.

[ILUMINACIÓN Y COLOR]
Luz estelar plateada y dorada tenue. Atmósfera mágica, nostálgica y esperanzadora.$covp1$
WHERE name = 'Gracias por tu amor';

UPDATE personalized_models SET cover_scene_visual = $covp2${NOMBRE_DEDICANTE} mira hacia el cielo con expresión esperanzada; {NOMBRE_DESTINATARIO} aparece como una presencia translúcida de luz estelar entre las estrellas, extendiendo la mano hacia abajo, como conectándose con {NOMBRE_DEDICANTE} desde el cielo — su rostro se mantiene reconocible y fiel a la fotografía de referencia, aunque su figura se vea etérea y luminosa.

Fondo y Detalles
Un cielo nocturno profundo con una vía láctea visible, estrellas fugaces y constelaciones dispersas de borde a borde, una silueta de montañas oscuras en el horizonte inferior.

Efectos Mágicos
Luz plateada y dorada tenue irradiando suavemente entre las estrellas.

[ILUMINACIÓN Y COLOR]
Luz estelar plateada y dorada tenue. Atmósfera celestial, esperanzadora y protectora.$covp2$
WHERE name = 'Mi angel guardian';

UPDATE personalized_models SET cover_scene_visual = $covp3${NOMBRE_DEDICANTE} está sentado en una banca de jardín con mirada nostálgica; {NOMBRE_DESTINATARIO} aparece como una presencia translúcida de luz dorada suave junto a la banca, con una mano apoyada sobre la de {NOMBRE_DEDICANTE} — su rostro se mantiene reconocible y fiel a la fotografía de referencia, aunque su figura se vea etérea y luminosa.

Fondo y Detalles
Un jardín florido al atardecer con rosales y flores durazno/rosadas a ambos lados del encuadre, un cielo cálido degradado de dorado a rosa pálido, luz de sol filtrándose entre árboles lejanos.

Efectos Mágicos
Mariposas doradas revoloteando suavemente.

[ILUMINACIÓN Y COLOR]
Luz dorada de atardecer. Atmósfera serena, nostálgica y cálida.$covp3$
WHERE name = 'Siempre en mi corazon';

UPDATE personalized_models SET cover_scene_visual = $covp4$Tus hermanos caminan alegres por el sendero; {NOMBRE_DESTINATARIO} aparece como una presencia translúcida de luz cálida, caminando justo a su lado — su rostro se mantiene reconocible y fiel a la fotografía de referencia, aunque su figura se vea etérea y luminosa.

Fondo y Detalles
Un sendero tropical al atardecer con palmeras y follaje denso a ambos lados del encuadre, el mar y un horizonte dorado visibles entre la vegetación, una luna tenue asomando en el cielo cálido degradado.

Efectos Mágicos
Notas musicales doradas translúcidas y partículas de luz flotan suavemente.

[ILUMINACIÓN Y COLOR]
Luz cálida de atardecer tropical. Atmósfera nostálgica, alegre y luminosa.$covp4$
WHERE name = 'Siempre seras parte de mi';

UPDATE personalized_models SET cover_scene_visual = $covp5${NOMBRE_DEDICANTE} está de pie al inicio de un puente de luz dorada, con la mano extendida hacia adelante, mirando con amor y esperanza; al otro extremo del puente, {NOMBRE_DESTINATARIO} aparece como una presencia translúcida y luminosa, bañada en luz dorada cálida, como si estuviera cruzando de regreso hacia el reencuentro — su forma se mantiene reconocible y fiel a la fotografía de referencia, aunque se vea etérea y brillante.

Fondo y Detalles
Un cielo de nubes doradas y rosadas mullidas que se extienden de borde a borde, un halo dorado tenue y difuso flotando en el aire, destellos de luz tipo estrellas dispersos entre las nubes.

Efectos Mágicos
Mariposas doradas translúcidas revoloteando suavemente.

[ILUMINACIÓN Y COLOR]
Luz dorada y rosada celestial. Atmósfera de reencuentro, calidez y amor eterno.$covp5$
WHERE name = 'Nuestro Angel de 4 patas';

UPDATE personalized_models SET cover_scene_visual = $covp6${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} visten atuendo renacentista (ella con vestido de gala bordado, él con jubón y capa), abrazados intensamente en una pose de balcón: él con un brazo en la cintura de ella y la mano en su mejilla, ella con la mano apoyada en el pecho de él, mejilla con mejilla, a punto de besarse.

Fondo y Detalles
Un balcón romántico de noche con barandal de piedra tallada que se extiende de punta a punta del encuadre, rosas rojas trepando y cayendo por ambos bordes, vista a un skyline de ciudad iluminado y desenfocado en la distancia, una luna llena grande y luminosa en el cielo nocturno degradado de azul profundo a violeta.

Efectos Mágicos
Pequeñas luces cálidas tipo guirnalda de hadas flotan difuminadas.

[ILUMINACIÓN Y COLOR]
Luz de luna azulada y cálidos destellos dorados. Atmósfera romántica, íntima y de cuento.$covp6$
WHERE name = 'Mi Amor';

COMMIT;
