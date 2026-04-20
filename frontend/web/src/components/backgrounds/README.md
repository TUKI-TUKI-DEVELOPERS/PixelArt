# Modern CSS Backgrounds

Componentes de fondo CSS modernos que reemplazan las imágenes estáticas de MinIO, manteniendo la identidad visual dual de PixelArt.

## Componentes

### `ModernBackground`

Fondos CSS reutilizables con dos variantes que reflejan los dos tipos de productos principales:

#### Variantes

##### `variant="photobooks"` (Azul Profundo)
- **Color primario**: Azul (#2d8fd5, #58aee8, #4f97cf)
- **Concepto**: Viajes, recuerdos abiertos, expansión
- **Uso**: Secciones relacionadas con photobooks
- **Opacidad**: Alta (0.60-0.92) para soportar texto blanco
- **Características**:
  - Gradiente azul profundo con alta opacidad para soportar texto blanco
  - Formas geométricas sutiles que evocan lentes de cámara y marcos fotográficos
  - Múltiples gradientes radiales superpuestos para crear profundidad

##### `variant="custom-books"` (Rojo Suave)
- **Color primario**: Rojo terracota (#B72020, #d96a6a)
- **Concepto**: Historias personales, calidez, intimidad
- **Uso**: Secciones relacionadas con libros personalizados
- **Opacidad**: Baja (0.02-0.12) para soportar texto oscuro
- **Características**:
  - Gradiente rojo cálido con opacidades bajas
  - Formas orgánicas que evocan esquinas de páginas y libros abiertos
  - Temperatura cálida que contrasta con el azul frío de photobooks

##### `variant="photobooks-hero"` (Azul Medio)
- **Color primario**: Azul (#2d8fd5, #58aee8, #4f97cf)
- **Concepto**: Viajes, recuerdos abiertos, expansión
- **Uso**: Fondo del hero carousel para photobooks
- **Opacidad**: Media (0.12-0.28) para elementos superpuestos
- **Características**:
  - Gradiente azul con opacidades medias para soportar contenido superpuesto
  - Transiciones suaves entre slides del carousel
  - Mantiene la identidad visual pero permite legibilidad del contenido

##### `variant="custom-books-hero"` (Rojo Medio)
- **Color primario**: Rojo terracota (#B72020, #d96a6a)
- **Concepto**: Historias personales, calidez, intimidad
- **Uso**: Fondo del hero carousel para libros personalizados
- **Opacidad**: Media (0.06-0.20) para elementos superpuestos
- **Características**:
  - Gradiente rojo con opacidades medias para soportar contenido superpuesto
  - Transiciones suaves entre slides del carousel
  - Mantiene la calidez sin interferir con el contenido

## Uso

```tsx
import ModernBackground from "@/components/backgrounds/ModernBackground";

// Fondo para sección de libros personalizados (texto oscuro)
<ModernBackground variant="custom-books" style={{ padding: "24px 48px 72px" }}>
  {/* Contenido de la sección */}
</ModernBackground>

// Fondo para sección de photobooks (texto blanco)
<ModernBackground variant="photobooks" style={{ padding: "72px 48px" }}>
  {/* Contenido de la sección */}
</ModernBackground>
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | `"photobooks" \| "custom-books"` | Sí | Variante de fondo según el tipo de producto |
| `children` | `React.ReactNode` | Sí | Contenido de la sección |
| `className` | `string` | No | Clases CSS adicionales |
| `style` | `React.CSSProperties` | No | Estilos inline adicionales |

## Imágenes Reemplazadas

Este componente reemplaza **TODAS** las siguientes imágenes de MinIO:

| ID | Variable Original | Uso Original | Reemplazo |
|----|-------------------|--------------|-----------|
| 8 | `customBookBackgroundUrl` | Fondo del hero para Custom Books | `<ModernBackground variant="custom-books-hero">` |
| 10 | `photobookBackgroundUrl` | Fondo del hero para Photobooks | `<ModernBackground variant="photobooks-hero">` |
| 26 | `booksSectionBackgroundUrl` | Sección "Nuestros Libros" | `<ModernBackground variant="custom-books">` |
| 27 | `photobooksSectionBackgroundUrl` | Sección "PHOTOBOOKS" | `<ModernBackground variant="photobooks">` |

### Ahorro de Recursos

- **4 imágenes** eliminadas de MinIO (estimado ~2MB total)
- **4 requests HTTP** eliminados
- **~2KB** de CSS reemplaza ~2MB de imágenes
- **99.9% reducción** en tamaño de assets de fondo

## Diseño

### Fundamentos de Identidad

La dualidad de productos se expresa a través de:

1. **Temperatura de color**: Azul frío (viajes/expansión) vs Rojo cálido (intimidad/calidez)
2. **Formas geométricas**: Círculos/marcos (cámaras) vs Formas orgánicas (páginas)
3. **Gradientes direccionales**: Los gradientes van desde el color primario hacia tonos más claros, evocando "páginas que se abren"

### Contraste de Texto

- **custom-books**: Opacidades bajas (0.02-0.12) → Soporta texto oscuro (#111, #222, #4e4e4e)
- **photobooks**: Opacidades altas (0.60-0.92) → Soporta texto blanco (#ffffff)

Todos los contrastes cumplen con WCAG AA (≥4.5:1).

### Elementos Decorativos

Patrones SVG sutiles con opacidad muy baja (0.035-0.04):
- **Photobooks**: Círculos y rectángulos redondeados (lentes/marcos)
- **Custom Books**: Formas poligonales y curvas (esquinas de páginas)

## Rendimiento

- **CSS puro**: Sin imágenes externas, sin requests HTTP adicionales
- **Inline SVG**: Patrones decorativos embebidos, sin archivos separados
- **Tamaño**: ~2KB (componente completo)
- **CLS**: 0 (no hay layout shift al cargar)

## Accesibilidad

- ✅ Contraste de texto cumple WCAG AA (4.5:1)
- ✅ No se usa color como único indicador
- ✅ Elementos decorativos con `pointer-events: none`
- ✅ Contenido semántico separado de presentación

## Mantenimiento

Para ajustar los colores o intensidades:

1. **Ajustar opacidades**: Modificar valores rgba en los gradientes
2. **Cambiar colores**: Usar los tokens de color de la identidad (#2d8fd5, #B72020, etc.)
3. **Añadir variantes**: Seguir el patrón de temperatura + formas geométricas específicas
