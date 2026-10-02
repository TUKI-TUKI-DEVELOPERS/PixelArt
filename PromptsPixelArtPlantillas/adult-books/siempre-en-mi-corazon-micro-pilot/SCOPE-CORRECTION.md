# Corrección de alcance — Siempre en mi corazón

## Qué pasó

Se generó un micro-piloto mixto para `Siempre en mi corazón` con abuelo y abuela en el mismo paquete.

Eso comprime demasiado el producto: el libro puede cubrir cuatro direcciones reales:

1. Hijo adulto → abuelo.
2. Hija adulta → abuelo.
3. Hijo adulto → abuela.
4. Hija adulta → abuela.

Si se mantiene como un solo libro, el resultado natural serían 80 plantillas internas. Eso vuelve pesada la selección y mezcla destinatarios fuertes.

## Decisión corregida

Dividir el producto en dos libros, igual que la lógica de familia ya usada en `Te amo, abuelo` y `Te amo, abuela`:

| Libro adulto | Plantillas esperadas |
|---|---:|
| `Siempre en mi corazón — Abuelo` | 20 hijo adulto → abuelo + 20 hija adulta → abuelo |
| `Siempre en mi corazón — Abuela` | 20 hijo adulto → abuela + 20 hija adulta → abuela |

## Estado de la tanda generada

La tanda ubicada en este paquete queda como **referencia visual solamente**, no como micro-piloto final aprobado.

Se puede reutilizar la dirección visual de:

- faro/costa,
- estación/regreso,
- jardín vivo,
- constelación/camino,

pero debe rehacerse por libro y dirección correcta.

## Próximo paso

Preparar micro-pilotos separados:

1. `siempre-en-mi-corazon-abuelo-micro-pilot`
2. `siempre-en-mi-corazon-abuela-micro-pilot`
