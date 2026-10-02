# Auditoría — Mamá, Mi Heroína adulto

## Dirección adulta

La versión adulta debe convertir la idea infantil de “mamá heroína” en gratitud madura: cuidado sostenido, amor cotidiano, consejo, refugio, dignidad y fuerza silenciosa.

No debe verse como:

- madre con hijo/a niño/a;
- escena caricaturesca;
- fantasía de superhéroe literal;
- composición romántica;
- tono oscuro, fúnebre o dramático.

Sí debe verse como:

- mamá adulta como destinataria;
- hijo/hija adulto/a como dedicante;
- relación familiar clara, sana y sobria;
- magia cálida, sutil y simbólica;
- escena editorial premium compatible con PixelArt.

## Direcciones del micro-piloto

| Dirección | Cantidad | Rol |
|---|---:|---|
| `HE_TO_SHE` | 2 | hijo adulto → mamá |
| `SHE_TO_SHE` | 2 | hija adulta → mamá |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Que la IA represente al dedicante como niño/a | Cada `scene_visual` dice explícitamente hijo/hija adulto/a y “nunca representar como niño/a”. |
| Que la escena madre-hijo se lea romántica | Incluir “relación familiar”, “sin romanticismo”, “gestos maternales sobrios”. |
| Que se vuelva infantil/superheroína literal | Magia como metáfora visual, no traje, capa ni poderes explícitos. |
| Que el poema pierda rima | Poemas de dos párrafos, rimados y con `{APODO_DESTINATARIO}`. |
| Que todos los poemas suenen iguales | Variar la ubicación del apodo: algunos al inicio, otros al medio y otros al final. |
| Que todos los títulos se vean iguales | Usar color editorial temático por plantilla; no dorado fijo para todas. |

## Criterios de aceptación

- [ ] 4 plantillas aprobadas por el usuario antes de generar.
- [ ] 2 hijo adulto → mamá y 2 hija adulta → mamá.
- [ ] Poemas rimados.
- [ ] Ubicación del apodo variada entre plantillas; no todos empiezan con `Para {APODO_DESTINATARIO}`.
- [ ] Color del título acorde al tema de la plantilla; no usar dorado fijo en todas.
- [ ] Castellano neutral.
- [ ] Sin placeholders en preview estática; placeholders conservados para BD/generación real.
- [ ] Dimensión aprobada: `1600x944`.
- [ ] Máximo 2 intentos por imagen.
- [ ] Registrar costo real en review posterior.
