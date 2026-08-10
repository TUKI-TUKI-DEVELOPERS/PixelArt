-- backfill-cover-content.sql — contenido de tapa/contratapa para el libro
-- piloto de la Fase B/C ("10 Razones por las que Te Amo"), portado verbatim
-- de PromptsPixelArtPlantillas/TAPA_CONTRATAPA_PROMOCION.md (escena real
-- validada: corazones en bokeh dorado/rosado — el .md de esa carpeta
-- describía un balcón que nunca se usó, ver nota en el doc). Matchea por
-- nombre de modelo. Idempotente (UPDATE incondicional). El resto de los
-- libros queda sin este contenido hasta la Fase D (backfill del resto del
-- catálogo).

BEGIN;

UPDATE personalized_models SET
  cover_scene_visual = $cov1${NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} muy cerca el uno del otro, mejilla con mejilla o frente con frente, ambos sonriendo con calidez genuina, de la cintura o los hombros hacia arriba, en ropa casual cómoda de tonos cálidos (blusa/camisa clara y oscura, nada formal ni de gala), ligeramente descentrados respecto del centro del lienzo.

Fondo y Detalles
Fondo de estudio cálido en degradado de tonos marrón dorado a rosa/coral profundo, sin arquitectura ni elementos exteriores — puro ambiente de luz y color.

Efectos Mágicos
El fondo está lleno de corazones suaves en bokeh, de distintos tamaños y profundidades, en tonos dorado cálido y rosa pastel, brillando con un resplandor difuso tipo luz de vela — algunos nítidos y cercanos, la mayoría difuminados y lejanos, cubriendo generosamente todo el encuadre detrás de la pareja.

[ILUMINACIÓN Y COLOR]
Iluminación cálida de estudio, tonos marrón dorado, rosa y coral profundo. Atmósfera romántica, íntima y editorial.$cov1$,
  back_cover_tagline = '10 razones hoy. Miles más por vivir.'
WHERE name = '10 Razones por las que Te Amo';

COMMIT;
