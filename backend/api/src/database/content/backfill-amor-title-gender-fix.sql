-- Corrige personalized_templates.name para el libro "Mi Amor" (X_arquetipos):
-- 1) Las 20 plantillas "El a Ella" compartían el sustantivo masculino del
--    título con su par "Ella a El" (ej. ambas imprimían "MI SUPERHÉROE
--    PERSONAL" aunque la destinataria fuera mujer) — fileToName() en seed.ts
--    solo hace reemplazo mecánico de texto, nunca tradujo género. Cada
--    título femenino nuevo sale de la propia escena ya escrita
--    ("representada como una superheroína...", ver scene_visual).
-- 2) 4 títulos MASCULINOS quedaron desalineados de su propio contenido:
--    Plantilla 3 imprimía "Mi Thor Dios del Trueno" (nombre de marca
--    registrada) aunque la escena ya se reescribió para no mostrar a Thor;
--    17/19/20 imprimían sin tilde (Samurai/Titan/Fenix). Solo se corrige
--    personalized_templates.name (el título impreso) — template_preview_key
--    (la ruta real del asset en storage) NO se toca.
-- Match por template_preview_key (estable) — igual criterio que el resto
-- de los backfills de contenido. Seguro de re-correr (UPDATE incondicional).

UPDATE personalized_templates SET name = 'Mi Superheroína Personal El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_1_Mi_Superhéroe_Personal_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Princesa Encantadora El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_2_Mi_Príncipe_Encantador_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Guerrera de las Tormentas El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_3_Mi_Thor_Dios_del_Trueno_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Guerrero de las Tormentas Ella a El' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_3_Mi_Thor_Dios_del_Trueno_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Caballera de Armadura Brillante El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Reina El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_5_Mi_Rey_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Ángel Guardián El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_6_Mi_Ángel_Guardián_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Pirata Aventurera El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_7_Mi_Pirata_Aventurero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Maga Hechicera El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_8_Mi_Mago_Hechicero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Guerrera Protectora El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_9_Mi_Guerrero_Protector_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Estrella de Rock El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_10_Mi_Estrella_de_Rock_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Capitana Piloto El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_11_Mi_Capitán_Piloto_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Vikinga Valiente El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_12_Mi_Vikingo_Valiente_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Julieta Amante Eterna El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_13_Mi_Romeo_Amante_Eterno_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Arquitecta de Sueños El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_14_Mi_Arquitecto_de_Sueños_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Gladiadora El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_15_Mi_Gladiador_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Vaquera El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_16_Mi_Cowboy_Vaquero_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Samurái El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_17_Mi_Samurai_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Samurái Ella a El' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_17_Mi_Samurai_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Astronauta Exploradora Espacial El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_18_Mi_Astronauta_Explorador_Espacial_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Titánide El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_19_Mi_Titan_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Titán Ella a El' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_19_Mi_Titan_Ella_a_El.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Fénix Renacimiento Fuerza El a Ella' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_El_a_Ella.png' AND is_active = true;

UPDATE personalized_templates SET name = 'Mi Fénix Renacimiento Fuerza Ella a El' WHERE template_preview_key = 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas/PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_Ella_a_El.png' AND is_active = true;
