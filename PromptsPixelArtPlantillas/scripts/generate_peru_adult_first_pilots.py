#!/usr/bin/env python3
"""Generate the first Peru-rooted replacement template for every adult model.

This is a catalog-review pilot only: it writes 17 sample WebP images and a contact
sheet locally. It never uploads to MinIO, changes PostgreSQL, or edits the manifest.
Five models have two relationship directions, so twelve concepts yield seventeen
renders. Every request uses the established adult-template contract: gpt-image-2,
medium quality, 1600x944, a continuous print-ready spread, one retry maximum, and
real cost tracking from the API response.

Run from PromptsPixelArtPlantillas/:
  .venv/bin/python3 scripts/generate_peru_adult_first_pilots.py
"""

from __future__ import annotations

import base64
import io
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "output" / "_peru-adult-first-template-pilot"
REVIEW = ROOT / "adult-books" / "peru-adult-first-template-pilot"

MODEL = "gpt-image-2"
QUALITY = "medium"
SIZE = "1600x944"
MODERATION = "auto"
MAX_ATTEMPTS = 2
PRICES = {"gpt-image-2": {"text_in": 5.00, "image_out": 30.00}}

IMAGEN_BASE = """Fotografía hiperrealista horizontal, plana y a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la obra final que se imprimirá en las páginas de un libro: nunca mostrar un libro físico, páginas, lomo, pliegues, mesas, marcos, bordes ni ningún fondo exterior a la escena."""

COMPOSICION = """- La imagen se dividirá digitalmente en dos mitades después de generarse. La escena, la luz y el ambiente deben fluir naturalmente de lado a lado.
- En el 10% central del ancho no puede haber rostros, ojos, manos ni texto; solo ambiente, paisaje, luz o textura.
- Los rostros deben mantenerse a más de 8% de los bordes. El título y poema deben quedar dentro de cada mitad, a más de 12% de los bordes laterales y 8% de los bordes superior e inferior.
- Composición asimétrica y cinematográfica: prohibidos sujetos centrados de forma rígida o elementos duplicados en espejo."""

DETALLES_TECNICOS = """Hiperrealismo cinematográfico, profundidad de campo natural, identidad humana coherente y anatomía correcta. Sin logotipos, marcas de agua, emojis, texto de plataforma, cajas de texto, fondos blancos detrás del texto ni marcos. No caricatura, no Pixar, no infantil, no bebés, no niños pequeños, no portada, no mockup exterior."""


def family_ornament() -> str:
    return "una línea fina horizontal con una pequeña casa estilizada en el centro, en el mismo tono del título"


def pet_ornament() -> str:
    return "una línea fina horizontal con una pequeña huella de perro estilizada en el centro, en el mismo tono del título"


def memorial_ornament() -> str:
    return "una línea fina horizontal con una paloma lineal minimalista en el centro, en el mismo tono del título"


PILOTS = [
    {
        "key": "01_papa_hijo_danzante",
        "book": "Papá, Mi Héroe Adulto",
        "direction": "Hijo adulto → Papá",
        "title": "MI DANZANTE DE TIJERAS",
        "ornament": family_ornament(),
        "scene": "Javier, padre peruano adulto, y Mateo, su hijo adulto, aparecen en una plaza andina contemporánea al atardecer. Javier realiza una pose respetuosa inspirada en la Danza de las Tijeras, con vestuario ceremonial sobrio y tijeras metálicas visibles; Mateo lo acompaña con admiración serena, sin imitarlo. Ambos tienen rostros claros en tres cuartos y se sienten reales, no como personajes turísticos.",
        "background": "Arquitectura de pueblo desenfocada, músicos fuera de foco, cielo de cobre y azul profundo. No mostrar monumentos ni una postal turística.",
        "magic": "Las dos tijeras de Javier dejan trazos finos de luz plateada que se elevan como constelaciones breves y conectan a padre e hijo. Magia elegante y física, nunca caricaturesca.",
        "lighting": "Atardecer dramático en cobre, vino tinto y azul noche; contraste cinematográfico adulto.",
        "poem": "Para Javier,\ncuando el mundo dudaba de mi paso,\ntu pulso sostuvo mi valor.\nNo bailaste para ser gigante:\nme enseñaste a no temer al error.\n\nHoy miro tu fuerza en movimiento,\nprecisa, valiente y verdadera;\nmi padre, mi ritmo de siempre,\nmi danzante de tijeras.",
    },
    {
        "key": "02_papa_hija_danzante",
        "book": "Papá, Mi Héroe Adulto",
        "direction": "Hija adulta → Papá",
        "title": "MI DANZANTE DE TIJERAS",
        "ornament": family_ornament(),
        "scene": "Javier, padre peruano adulto, y Alondra, su hija adulta, aparecen en una plaza andina contemporánea al atardecer. Javier realiza una pose respetuosa inspirada en la Danza de las Tijeras, con vestuario ceremonial sobrio y tijeras metálicas visibles; Alondra lo acompaña con orgullo y ternura, sin imitarlo. Ambos tienen rostros claros en tres cuartos y se sienten reales, no como personajes turísticos.",
        "background": "Arquitectura de pueblo desenfocada, músicos fuera de foco, cielo de cobre y azul profundo. No mostrar monumentos ni una postal turística.",
        "magic": "Las dos tijeras de Javier dejan trazos finos de luz plateada que se elevan como constelaciones breves y conectan a padre e hija. Magia elegante y física, nunca caricaturesca.",
        "lighting": "Atardecer dramático en cobre, vino tinto y azul noche; contraste cinematográfico adulto.",
        "poem": "Javier,\nen tus pasos vi paciencia,\nen tu silencio vi valor.\nNo me pediste ser pequeña:\nme enseñaste a elegir mi voz.\n\nHoy miro tu fuerza en movimiento,\nprecisa, valiente y verdadera;\nmi padre, mi ritmo de siempre,\nmi danzante de tijeras.",
    },
    {
        "key": "03_mama_hijo_festejo",
        "book": "Mamá, Mi Heroína Adulto",
        "direction": "Hijo adulto → Mamá",
        "title": "BAILANDO FESTEJO CON MI VIDA",
        "ornament": family_ornament(),
        "scene": "Marisol, madre peruana adulta, baila festejo con Thiago, su hijo adulto, en un patio nocturno elegante de barrio. Ambos sonríen con naturalidad y energía madura; Marisol sostiene un pañuelo marfil y Thiago acompaña el ritmo con una postura segura. Rostros visibles, frontal o tres cuartos.",
        "background": "Luces cálidas de guirnalda, pared de adobe contemporánea, músicos criollos desenfocados y una mesa lateral fuera del centro. No usar una estética de espectáculo turístico.",
        "magic": "El ritmo del cajón se manifiesta como ondas de luz ámbar, turquesa y cobre que recorren el piso y hacen que pequeñas partículas de luz bailen alrededor de sus pasos.",
        "lighting": "Noche cálida con ámbar, cobre y azul petróleo; energía luminosa, adulta y celebratoria.",
        "poem": "Marisol,\ntu risa ordenó mis días,\ntu pulso me enseñó a avanzar.\nCuando la vida perdió el ritmo,\ntu abrazo me hizo regresar.\n\nHoy bailo lo que sembraste:\nla calma, el valor y la alegría.\nMamá, sigues siendo la música\nque acompaña toda mi vida.",
    },
    {
        "key": "04_mama_hija_festejo",
        "book": "Mamá, Mi Heroína Adulto",
        "direction": "Hija adulta → Mamá",
        "title": "BAILANDO FESTEJO CON MI VIDA",
        "ornament": family_ornament(),
        "scene": "Marisol, madre peruana adulta, baila festejo con Camila, su hija adulta, en un patio nocturno elegante de barrio. Ambas sonríen con naturalidad y energía madura; Marisol sostiene un pañuelo marfil y Camila acompaña el ritmo con una postura segura. Rostros visibles, frontal o tres cuartos.",
        "background": "Luces cálidas de guirnalda, pared de adobe contemporánea, músicos criollos desenfocados y una mesa lateral fuera del centro. No usar una estética de espectáculo turístico.",
        "magic": "El ritmo del cajón se manifiesta como ondas de luz ámbar, turquesa y cobre que recorren el piso y hacen que pequeñas partículas de luz bailen alrededor de sus pasos.",
        "lighting": "Noche cálida con ámbar, cobre y azul petróleo; energía luminosa, adulta y celebratoria.",
        "poem": "Marisol,\ntu risa ordenó mis días,\ntu pulso me enseñó a avanzar.\nCuando la vida perdió el ritmo,\ntu abrazo me hizo regresar.\n\nHoy bailo lo que sembraste:\nla calma, el valor y la alegría.\nMamá, sigues siendo la música\nque acompaña toda mi vida.",
    },
    {
        "key": "05_abuelo_nieto_marinera",
        "book": "Te Amo, Abuelo Adulto",
        "direction": "Nieto adulto → Abuelo",
        "title": "BAILANDO MARINERA CONTIGO",
        "ornament": family_ornament(),
        "scene": "Ricardo, abuelo peruano elegante, baila marinera con Mateo, su nieto adulto, en una terraza abierta al anochecer. Ricardo sostiene un pañuelo blanco y Mateo responde con respeto y alegría; no hay parodia ni competencia, solo complicidad familiar. Rostros visibles y claramente familiares.",
        "background": "Luz de ciudad desenfocada, piso de madera, músicos de cuerda y cajón al fondo suavemente desenfocados, cielo azul violeta. Evitar escenario de concurso o postal turística.",
        "magic": "Los pañuelos dibujan arcos blancos de luz que se entrelazan en el aire y forman por un instante un camino luminoso de generación a generación.",
        "lighting": "Azul noche, blanco marfil y reflejos cálidos de lámparas; emoción adulta y festiva.",
        "poem": "Abuelo Ricardo,\nme enseñaste que el tiempo no se pierde\nsi uno lo comparte de verdad.\nEn tu risa aprendí camino,\nen tu mirada, tranquilidad.\n\nHoy muevo el pañuelo contigo\ny el mundo se vuelve cercano:\nmi raíz, mi mejor recuerdo,\nmi abuelo, mi compañero de baile.",
    },
    {
        "key": "06_abuelo_nieta_marinera",
        "book": "Te Amo, Abuelo Adulto",
        "direction": "Nieta adulta → Abuelo",
        "title": "BAILANDO MARINERA CONTIGO",
        "ornament": family_ornament(),
        "scene": "Ricardo, abuelo peruano elegante, baila marinera con Valentina, su nieta adulta, en una terraza abierta al anochecer. Ricardo sostiene un pañuelo blanco y Valentina responde con respeto y alegría; no hay parodia ni competencia, solo complicidad familiar. Rostros visibles y claramente familiares.",
        "background": "Luz de ciudad desenfocada, piso de madera, músicos de cuerda y cajón al fondo suavemente desenfocados, cielo azul violeta. Evitar escenario de concurso o postal turística.",
        "magic": "Los pañuelos dibujan arcos blancos de luz que se entrelazan en el aire y forman por un instante un camino luminoso de generación a generación.",
        "lighting": "Azul noche, blanco marfil y reflejos cálidos de lámparas; emoción adulta y festiva.",
        "poem": "Abuelo Ricardo,\nme enseñaste que el tiempo no se pierde\nsi uno lo comparte de verdad.\nEn tu risa aprendí camino,\nen tu mirada, tranquilidad.\n\nHoy muevo el pañuelo contigo\ny el mundo se vuelve cercano:\nmi raíz, mi mejor recuerdo,\nmi abuelo, mi compañero de baile.",
    },
    {
        "key": "07_abuela_nieto_tejedor",
        "book": "Te Amo, Abuela Adulto",
        "direction": "Nieto adulto → Abuela",
        "title": "LA TEJEDORA DE HISTORIAS QUE NO SE DESCOSEN",
        "ornament": family_ornament(),
        "scene": "Isabel, abuela peruana adulta, teje en un telar de cintura contemporáneo mientras Mateo, su nieto adulto, sostiene con ella una pieza textil amplia. Ambos tienen rostros visibles y la mirada entre generaciones comunica cuidado, experiencia y humor compartido. No mostrar vestuario folklórico de postal.",
        "background": "Patio luminoso con plantas, banco de madera y ovillos de lana de tonos naturales; ambiente doméstico peruano refinado, no museo ni souvenir.",
        "magic": "Los hilos del telar se vuelven brevemente líneas luminosas que contienen pequeñas escenas abstractas de risas, cartas y caminos familiares, sin ilustraciones infantiles ni personajes fantasma.",
        "lighting": "Crema cálido, terracota, verde salvia y reflejos cobrizos; sensación de memoria viva.",
        "poem": "Abuela Isabel,\nen cada hilo guardas regreso,\nen cada nudo, una verdad.\nTus historias no se deshacen:\nme enseñan a permanecer.\n\nHoy sostengo contigo el tiempo,\ncon gratitud y con ternura;\ntu amor no es solo recuerdo,\nes la trama de mi vida entera.",
    },
    {
        "key": "08_abuela_nieta_tejedor",
        "book": "Te Amo, Abuela Adulto",
        "direction": "Nieta adulta → Abuela",
        "title": "LA TEJEDORA DE HISTORIAS QUE NO SE DESCOSEN",
        "ornament": family_ornament(),
        "scene": "Isabel, abuela peruana adulta, teje en un telar de cintura contemporáneo mientras Valentina, su nieta adulta, sostiene con ella una pieza textil amplia. Ambas tienen rostros visibles y la mirada entre generaciones comunica cuidado, experiencia y humor compartido. No mostrar vestuario folklórico de postal.",
        "background": "Patio luminoso con plantas, banco de madera y ovillos de lana de tonos naturales; ambiente doméstico peruano refinado, no museo ni souvenir.",
        "magic": "Los hilos del telar se vuelven brevemente líneas luminosas que contienen pequeñas escenas abstractas de risas, cartas y caminos familiares, sin ilustraciones infantiles ni personajes fantasma.",
        "lighting": "Crema cálido, terracota, verde salvia y reflejos cobrizos; sensación de memoria viva.",
        "poem": "Abuela Isabel,\nen cada hilo guardas regreso,\nen cada nudo, una verdad.\nTus historias no se deshacen:\nme enseñan a permanecer.\n\nHoy sostengo contigo el tiempo,\ncon gratitud y con ternura;\ntu amor no es solo recuerdo,\nes la trama de mi vida entera.",
    },
    {
        "key": "08_equipo_mundial",
        "book": "El Mejor Equipo Adulto",
        "direction": "Hermanos adultos",
        "title": "GANAMOS EL MUNDIAL CON PERÚ",
        "ornament": family_ornament(),
        "scene": "Valentina, Mateo y Sofía, hermanos adultos peruanos, celebran juntos en una cancha de barrio al anochecer. Visten ropa cotidiana elegante con pequeños acentos rojo y blanco, sin logotipos ni camisetas oficiales. Los tres miran al lector o entre sí, con alegría real y complicidad de hermanos.",
        "background": "Arcos sencillos, vecinos desenfocados al fondo, una bandera peruana pequeña y sobria movida por el viento, luces de barrio encendidas. No mostrar estadio real ni marcas deportivas.",
        "magic": "En el cielo aparece una constelación discreta que forma una copa luminosa, mientras trazos rojos y blancos recorren el césped como la ruta imposible de una victoria compartida.",
        "lighting": "Noche azul profunda, reflejos rojo carmesí y blanco cálido; épico sin parecer publicidad deportiva.",
        "poem": "No ganamos por llegar primero,\nganamos por no soltarnos.\nEntre bromas, caídas y goles,\naprendimos a levantarnos.\n\nSi el mundo pide un equipo,\nmi respuesta siempre será la misma:\nValentina, Mateo y Sofía,\nmi casa cuando todo se complica.",
    },
    {
        "key": "09_familia_festejo",
        "book": "Mi Familia Adulto",
        "direction": "Familia grupal",
        "title": "SI BAILÁRAMOS FESTEJO JUNTOS",
        "ornament": family_ornament(),
        "scene": "Una familia peruana multigeneracional de adultos baila festejo en un patio amplio durante una reunión nocturna. Padres, hijos adultos y abuelos aparecen con rostros visibles y gestos naturales; cada persona aporta un movimiento distinto, sin poses simétricas.",
        "background": "Mesa familiar desenfocada a un lado, luces cálidas, pared de patio con textura real y músicos criollos al fondo. No mascotas ni animales.",
        "magic": "Las vibraciones del cajón se convierten en ondas de luz cobre, turquesa y magenta que unen las pisadas de todas las generaciones, como una coreografía que deja huella en el aire.",
        "lighting": "Luz nocturna cálida, cobre, azul petróleo y pequeñas chispas suaves; energía familiar adulta.",
        "poem": "Si bailáramos juntos la vida,\nningún regreso sería tarde.\nCada paso llevaría un nombre,\ncada risa, una parte de casa.\n\nSomos caminos que se encuentran,\nla mesa, el abrazo y la historia;\nmi familia no cabe en una foto:\nse mueve, celebra y acompaña.",
    },
    {
        "key": "10_aventura_huella_marinera",
        "book": "Aventura Entre Patas Adulto",
        "direction": "Dueños adultos → Perro",
        "title": "LA HUELLA QUE BAILÓ MARINERA",
        "ornament": pet_ornament(),
        "scene": "Rocky, un perro golden retriever adulto, aparece junto a Mateo y Sofía, sus dueños adultos, en un patio de barrio al anochecer. Rocky levanta una pata de forma natural mientras Mateo y Sofía sostienen pañuelos blancos y dan un paso de marinera alrededor de él. Los tres protagonistas tienen presencia clara y los humanos miran al lector o entre sí.",
        "background": "Piso de patio, guirnaldas cálidas, músicos criollos desenfocados y un banco de madera; no usar disfraces animales ni estética infantil.",
        "magic": "Cada paso deja una huella suave de luz marfil en el suelo y los pañuelos trazan curvas luminosas que acompañan el movimiento de Rocky sin humanizarlo.",
        "lighting": "Azul noche, marfil y ámbar cálido; aventura afectiva, adulta y divertida.",
        "poem": "Rocky,\ntu alegría cambia el ritmo\nde cualquier día que parecía igual.\nCon una huella nos recuerdas\nque volver a casa también es celebrar.\n\nNo hablas, pero sabes todo:\ncuándo reír, cuidar y esperar.\nEres la música de la familia\nque nunca deja de bailar.",
    },
    {
        "key": "11_angel_padre_velada",
        "book": "Mi Ángel Guardián Padre Adulto",
        "direction": "Hijo adulto → Padre recordado",
        "title": "EL FAROL DE LA VELADA QUE ME GUÍA",
        "ornament": memorial_ornament(),
        "scene": "Mateo, hijo adulto, permanece de pie en tres cuartos junto a un farol artesanal encendido durante una velada familiar respetuosa. Dentro de la composición, un retrato grande y claramente reconocible de su padre Ricardo aparece integrado en papel fotográfico de archivo, protagonista y tangible; no mostrar a Ricardo como aparición viva.",
        "background": "Patio nocturno sobrio con velas, flores discretas y panes tradicionales sobre una mesa lateral desenfocada. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La luz del farol proyecta una ruta dorada sutil sobre el suelo y hace vibrar delicadamente las letras de una carta cercana; no halos, no alas humanas, no fantasmas.",
        "lighting": "Ámbar de vela, azul noche y cobre apagado; atmósfera serena de recuerdo y protección.",
        "poem": "Papá Ricardo,\nhay noches en que tu consejo\nvuelve a encender mi valor.\nNo estás lejos en la memoria:\ntu ejemplo me muestra dirección.\n\nCamino con lo que dejaste,\ncon tu paciencia y tu bondad;\nen cada luz que encuentro\nsé que me vuelves a cuidar.",
    },
    {
        "key": "12_angel_madre_velas",
        "book": "Mi Ángel Guardián Madre Adulto",
        "direction": "Hija adulta → Madre recordada",
        "title": "LA LUZ DE LAS VELAS QUE ABRAZA MI CAMINO",
        "ornament": memorial_ornament(),
        "scene": "Camila, hija adulta, aparece en tres cuartos frente a una instalación íntima de velas y flores. Un retrato grande y reconocible de su madre Elena se integra en un tejido de papel artesanal iluminado, como pieza memorial tangible y protagonista; Elena no aparece físicamente en la escena.",
        "background": "Patio silencioso, mesa lateral con panes tradicionales y una carta manuscrita, flores en tonos crema y granate. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Las velas dibujan una línea de luz suave que atraviesa la composición y llega a Camila como un abrazo visual, sin halos, alas, fantasmas ni apariciones.",
        "lighting": "Marfil, terracota, ámbar y azul profundo; calidez sobria y protectora.",
        "poem": "Mamá Elena,\ntu amor no dejó silencio:\ndeja luz para continuar.\nCuando la vida se hace fría,\ntu ternura me vuelve a abrigar.\n\nGuardo tu voz en mis gestos,\ntu calma en mi forma de andar;\nmi madre, mi ángel querido,\nme sigues enseñando a amar.",
    },
    {
        "key": "13_corazon_abuelo_album_marinera",
        "book": "Siempre en mi Corazón — Abuelo Adulto",
        "direction": "Nieta adulta → Abuelo recordado",
        "title": "EL ÁLBUM DE LA MARINERA QUE GUARDÓ TU PASO",
        "ornament": memorial_ornament(),
        "scene": "Valentina, nieta adulta, sostiene un álbum de legado luminoso abierto en una terraza nocturna. Una fotografía grande, nítida y reconocible de su abuelo Ricardo bailando marinera ocupa una página protagonista del álbum; Valentina aparece visible en tres cuartos, con emoción tranquila. El abuelo existe solo en la fotografía, no como cuerpo presente.",
        "background": "Terraza sobria con pañuelo blanco cuidadosamente doblado, una radio antigua desenfocada y luz de ciudad muy suave. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Del movimiento congelado del pañuelo en la foto nacen líneas de luz marfil que recorren el álbum y se mezclan con pequeñas marcas de archivo, sin convertir el retrato en fantasma.",
        "lighting": "Azul tinta, plata fotográfica, marfil y ámbar tenue; estética de archivo familiar premium.",
        "poem": "Abuelo Ricardo,\ntu paso sigue guardado\nen cada recuerdo que abrí.\nNo es tristeza lo que queda:\nes la forma en que sigues en mí.\n\nUn pañuelo mueve el tiempo,\nuna foto vuelve a hablar;\ntu historia sigue bailando\nen mi manera de recordar.",
    },
    {
        "key": "14_corazon_abuela_retablo_bordado",
        "book": "Siempre en mi Corazón — Abuela Adulto",
        "direction": "Nieta adulta → Abuela recordada",
        "title": "EL RETABLO BORDADO DE TU MEMORIA",
        "ornament": memorial_ornament(),
        "scene": "Valentina, nieta adulta, observa de frente un retablo ayacuchano contemporáneo y respetuoso, abierto sobre una pared de casa. En el panel central aparece un retrato bordado grande, reconocible y claramente basado en su abuela Isabel; Valentina también debe verse grande, en tres cuartos, sin que el retrato sea un detalle pequeño. Isabel no aparece físicamente fuera de la obra.",
        "background": "Madera cálida, flores discretas, hilos, una carta y textura de papel artesanal. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "Los hilos bordados emiten un resplandor muy tenue y se prolongan por el aire como rutas de memoria; no halos, no alas humanas, no fantasmas.",
        "lighting": "Terracota, rojo granate, crema, azul índigo y reflejos de cobre; arte memorial adulto y tangible.",
        "poem": "Abuela Isabel,\ntu memoria tiene textura,\ncolor, paciencia y verdad.\nNo cabe en una despedida:\nse queda en mi forma de amar.\n\nHoy miro el hilo de tu historia\ny vuelvo a sentir tu calor;\ntu nombre no se ha ido:\nse quedó bordado en mi corazón.",
    },
    {
        "key": "15_siempre_seras_hermano_pichanga",
        "book": "Siempre Serás Parte de Mí Adulto",
        "direction": "Hermano → Hermano recordado",
        "title": "LA PICHANGA QUE SEGUIMOS JUGANDO",
        "ornament": memorial_ornament(),
        "scene": "Emiliano y Gabriel, hermanos jóvenes adultos, comparten una pichanga de barrio al atardecer como una memoria viva y humana. Ambos son visibles de frente o tres cuartos, riendo después de una jugada; la escena debe leer como hermandad, no como pareja. No usar presencia etérea, rostro en el cielo, alas ni fantasmas.",
        "background": "Cancha pequeña de barrio con arcos sencillos, luces encendiéndose y amigos desenfocados al fondo. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La trayectoria del balón deja una línea de luz cálida que forma una paloma minimalista solo cerca del poema, mientras el juego conserva una apariencia real y terrestre.",
        "lighting": "Atardecer naranja, azul profundo y pequeñas luces blancas; memoria alegre, adulta y respetuosa.",
        "poem": "Hermano,\nla cancha guarda tus risas\ny el grito antes de marcar.\nAunque el tiempo cambie todo,\nno aprendimos a soltarnos.\n\nSigo jugando esta historia\ncon tu fuerza junto a mí;\nno eres solo un recuerdo:\nsiempre serás parte de mí.",
    },
    {
        "key": "16_siempre_seras_hermana_pichanga",
        "book": "Siempre Serás Parte de Mí Adulto",
        "direction": "Hermana → Hermana recordada",
        "title": "LA PICHANGA QUE SEGUIMOS JUGANDO",
        "ornament": memorial_ornament(),
        "scene": "Camila y Valentina, hermanas jóvenes adultas, comparten una pichanga de barrio al atardecer como una memoria viva y humana. Ambas son visibles de frente o tres cuartos, riendo después de una jugada; la escena debe leer como hermandad, no como pareja. No usar presencia etérea, rostro en el cielo, alas ni fantasmas.",
        "background": "Cancha pequeña de barrio con arcos sencillos, luces encendiéndose y amistades desenfocadas al fondo. No mascotas, perros, gatos, aves ni animales de ningún tipo.",
        "magic": "La trayectoria del balón deja una línea de luz cálida que forma una paloma minimalista solo cerca del poema, mientras el juego conserva una apariencia real y terrestre.",
        "lighting": "Atardecer naranja, azul profundo y pequeñas luces blancas; memoria alegre, adulta y respetuosa.",
        "poem": "Hermana,\nla cancha guarda tus risas\ny el grito antes de marcar.\nAunque el tiempo cambie todo,\nno aprendimos a soltarnos.\n\nSigo jugando esta historia\ncon tu fuerza junto a mí;\nno eres solo un recuerdo:\nsiempre serás parte de mí.",
    },
]


def build_prompt(pilot: dict) -> str:
    is_pet_book = pilot["book"] == "Aventura Entre Patas Adulto"
    is_memorial_book = pilot["book"] in {
        "Mi Ángel Guardián Padre Adulto",
        "Mi Ángel Guardián Madre Adulto",
        "Siempre en mi Corazón — Abuelo Adulto",
        "Siempre en mi Corazón — Abuela Adulto",
        "Siempre Serás Parte de Mí Adulto",
    }
    restrictions = (
        "Rocky es explícitamente un perro golden retriever adulto; no incluir otros animales."
        if is_pet_book
        else "No incluir mascotas, perros, gatos, aves ni animales de ningún tipo."
    )
    if is_memorial_book:
        restrictions += " No usar fantasmas, apariciones transparentes, rostros en el cielo, halos ni alas humanas."
    design = f"""Mitad izquierda del lienzo
Título en tipografía Montserrat elegante, integrado físicamente en la imagen y dentro del margen de seguridad.
Título: {pilot['title']}

Mitad derecha del lienzo
Poema impreso en tipografía Montserrat moderna, limpia y perfectamente legible, sobre una zona visual tranquila, sin tocar rostros ni la franja central. Debajo del poema: {pilot['ornament']}.

Poema, impreso literalmente:
\"{pilot['poem']}\""""
    return "\n\n".join([
        f"[IMAGEN BASE]\n{IMAGEN_BASE}",
        f"[ESCENA VISUAL]\n{pilot['scene']}",
        f"[FONDO Y DETALLES]\n{pilot['background']}",
        f"[EFECTOS MÁGICOS]\n{pilot['magic']}",
        f"[ILUMINACIÓN Y COLOR]\n{pilot['lighting']}",
        f"[COMPOSICIÓN — REGLAS OBLIGATORIAS]\n{COMPOSICION}",
        f"[RESTRICCIONES DE CONTENIDO]\n{restrictions}",
        f"[DISEÑO EDITORIAL]\n{design}",
        f"[DETALLES TÉCNICOS]\n{DETALLES_TECNICOS}",
    ])


def load_api_key() -> str:
    env = ROOT / ".env"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("OPENAI_API_KEY=") and "PEGA-TU-KEY" not in line:
                return line.split("=", 1)[1].strip()
    raise SystemExit("Falta OPENAI_API_KEY en PromptsPixelArtPlantillas/.env")


def cost_from_usage(usage: dict | None) -> float | None:
    if not usage:
        return None
    prices = PRICES[MODEL]
    text_tokens = ((usage.get("input_tokens_details") or {}).get("text_tokens") or 0)
    output_tokens = usage.get("output_tokens") or 0
    return round(text_tokens / 1_000_000 * prices["text_in"] + output_tokens / 1_000_000 * prices["image_out"], 4)


def request_image(prompt: str, api_key: str) -> tuple[bytes, float | None]:
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": SIZE,
        "quality": QUALITY,
        "moderation": MODERATION,
        "n": 1,
    }).encode("utf-8")
    request = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        method="POST",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=420) as response:
        data = json.loads(response.read().decode("utf-8"))
    return base64.b64decode(data["data"][0]["b64_json"]), cost_from_usage(data.get("usage"))


def save_webp(raw: bytes, dest: Path) -> None:
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    if image.size != (1600, 944):
        raise RuntimeError(f"Tamaño inesperado: {image.size}; se esperaba 1600x944")
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "WEBP", quality=95, method=6)


def create_contact_sheet(successes: list[dict]) -> Path:
    thumb_width, thumb_height, label_height = 480, 283, 54
    columns = 3
    rows = (len(successes) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb_width, rows * (thumb_height + label_height)), "#f4f0e9")
    draw = ImageDraw.Draw(sheet)
    for index, result in enumerate(successes):
        image = Image.open(result["path"]).convert("RGB")
        image.thumbnail((thumb_width, thumb_height))
        x = (index % columns) * thumb_width
        y = (index // columns) * (thumb_height + label_height)
        sheet.paste(image, (x, y))
        label = f"{index + 1:02d}. {result['title']}\n{result['direction']}"
        draw.multiline_text((x + 10, y + thumb_height + 7), label, fill="#25211d", spacing=3)
    REVIEW.mkdir(parents=True, exist_ok=True)
    out = REVIEW / "contact-sheet-peru-first-templates-v1.jpg"
    sheet.save(out, "JPEG", quality=92)
    return out


def write_report(results: list[dict], contact_sheet: Path | None) -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    total = round(sum(row["cost_usd"] or 0 for row in results), 4)
    (REVIEW / "run-report.json").write_text(json.dumps({
        "model": MODEL,
        "quality": QUALITY,
        "size": SIZE,
        "attempt_limit": MAX_ATTEMPTS,
        "total_cost_usd": total,
        "results": results,
        "contact_sheet": str(contact_sheet) if contact_sheet else None,
    }, ensure_ascii=False, indent=2) + "\n")
    lines = [
        "# Peru-rooted adult template pilot — v1",
        "",
        "Catalog-review only. No MinIO, PostgreSQL, manifest, or production code was changed.",
        "",
        f"- Model: `{MODEL}`",
        f"- Quality / size: `{QUALITY}` / `{SIZE}`",
        f"- Renders requested: `{len(PILOTS)}`",
        f"- Successful renders: `{sum(row['status'] == 'ok' for row in results)}`",
        f"- Actual tracked cost: `${total:.4f}`",
        "",
        "## Results",
        "",
    ]
    for row in results:
        cost = "n/a" if row["cost_usd"] is None else f"${row['cost_usd']:.4f}"
        lines.append(f"- **{row['title']}** — {row['book']} ({row['direction']}): `{row['status']}`, {cost}")
        if row.get("error"):
            lines.append(f"  - Error: `{row['error']}`")
    if contact_sheet:
        lines.extend(["", f"Contact sheet: `{contact_sheet.relative_to(ROOT)}`"])
    (REVIEW / "review.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    api_key = load_api_key()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    results: list[dict] = []
    for index, pilot in enumerate(PILOTS, start=1):
        dest = OUTPUT / f"{pilot['key']}.webp"
        prompt = build_prompt(pilot)
        print(f"[{index:02d}/{len(PILOTS)}] {pilot['book']} — {pilot['direction']} — {pilot['title']}", flush=True)
        error = None
        cost = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                raw, cost = request_image(prompt, api_key)
                save_webp(raw, dest)
                print(f"  OK (attempt {attempt}) -> {dest.relative_to(ROOT)} | ${cost if cost is not None else '?'}", flush=True)
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError) as exc:
                error = str(exc)
                print(f"  FAILED attempt {attempt}: {error}", flush=True)
                if attempt < MAX_ATTEMPTS:
                    time.sleep(2)
        else:
            print("  Marked failed after retry limit.", flush=True)
        results.append({
            "key": pilot["key"],
            "book": pilot["book"],
            "direction": pilot["direction"],
            "title": pilot["title"],
            "status": "ok" if dest.exists() else "failed",
            "path": str(dest) if dest.exists() else None,
            "cost_usd": cost if dest.exists() else None,
            "error": error if not dest.exists() else None,
        })

    successes = [row for row in results if row["status"] == "ok"]
    contact_sheet = create_contact_sheet(successes) if successes else None
    write_report(results, contact_sheet)
    total = sum(row["cost_usd"] or 0 for row in results)
    print(f"\nCompleted {len(successes)}/{len(PILOTS)} renders. Actual tracked cost: ${total:.4f}")
    if contact_sheet:
        print(f"Contact sheet: {contact_sheet.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
