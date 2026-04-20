# 📘 Guía del Sistema de Diseño PixelArt

## 🎯 Propósito

Este documento explica cómo usar el sistema de diseño de PixelArt para mantener consistencia visual y facilitar el desarrollo de nuevas features.

---

## 🗂️ Estructura del Sistema

```
src/
├── lib/
│   └── design-tokens.ts          # Sistema de tokens central
└── components/
    └── Home/
        ├── SearchInput.tsx        # Componentes reutilizables
        ├── CategoryTabs.tsx
        ├── FeatureCard.tsx
        ├── BookCard.tsx
        └── TrustBadge.tsx
```

---

## 🎨 Uso de Design Tokens

### **Importar Tokens**

```typescript
import { tokens } from '@/lib/design-tokens';
```

### **Colores**

```typescript
// Custom Books (Rojo)
background: tokens.colors.customBooks.primary,    // #B72020
background: tokens.colors.customBooks.accent,     // #d92d34
background: tokens.colors.customBooks.hover,      // #e85858
background: tokens.colors.customBooks.light,      // rgba(183, 32, 32, 0.08)
background: tokens.colors.customBooks.gradient,   // linear-gradient(...)

// Photobooks (Azul)
background: tokens.colors.photobooks.primary,     // #2d8fd5
background: tokens.colors.photobooks.accent,      // #4f97cf
background: tokens.colors.photobooks.hover,       // #6bb3e0
background: tokens.colors.photobooks.light,       // rgba(79, 151, 207, 0.08)
background: tokens.colors.photobooks.gradient,    // linear-gradient(...)

// Neutrales - Texto
color: tokens.colors.neutral.text.primary,        // #111
color: tokens.colors.neutral.text.secondary,      // #444
color: tokens.colors.neutral.text.tertiary,       // #666
color: tokens.colors.neutral.text.muted,          // #888

// Neutrales - Superficies
background: tokens.colors.neutral.surface.base,   // #fff
background: tokens.colors.neutral.surface.subtle, // #f8f9fa
background: tokens.colors.neutral.surface.hover,  // #f5f5f5
border: `1px solid ${tokens.colors.neutral.surface.border}`, // #e0e0e0

// Semánticos
color: tokens.colors.semantic.success,            // #22c55e
color: tokens.colors.semantic.warning,            // #f59e0b
color: tokens.colors.semantic.error,              // #ef4444
color: tokens.colors.semantic.info,               // #3b82f6
```

### **Espaciado**

```typescript
// Micro (4-12px)
padding: tokens.spacing.micro.xs,        // 4px
gap: tokens.spacing.micro.sm,            // 8px
margin: tokens.spacing.micro.md,         // 12px

// Component (16-28px)
padding: tokens.spacing.component.xs,    // 16px
padding: tokens.spacing.component.sm,    // 20px
padding: tokens.spacing.component.md,    // 24px
padding: tokens.spacing.component.lg,    // 28px

// Section (32-96px)
margin: tokens.spacing.section.xs,       // 32px
padding: tokens.spacing.section.sm,      // 48px
padding: tokens.spacing.section.md,      // 64px
padding: tokens.spacing.section.lg,      // 80px
padding: tokens.spacing.section.xl,      // 96px
```

### **Tipografía**

```typescript
// Display (Hero principal)
fontSize: tokens.typography.display.size,              // 56px
fontWeight: tokens.typography.display.weight,          // 900
lineHeight: tokens.typography.display.lineHeight,      // 1.1
letterSpacing: tokens.typography.display.letterSpacing,// -0.01em

// Headings
fontSize: tokens.typography.h1.size,      // 48px
fontSize: tokens.typography.h2.size,      // 36px
fontSize: tokens.typography.h3.size,      // 28px
fontSize: tokens.typography.h4.size,      // 24px

// Body
fontSize: tokens.typography.body.size,          // 16px
lineHeight: tokens.typography.body.lineHeight,  // 1.6

// Small & Caption
fontSize: tokens.typography.small.size,         // 14px
fontSize: tokens.typography.caption.size,       // 12px
```

### **Border Radius**

```typescript
borderRadius: tokens.borderRadius.sm,      // 8px
borderRadius: tokens.borderRadius.md,      // 12px
borderRadius: tokens.borderRadius.lg,      // 16px
borderRadius: tokens.borderRadius.xl,      // 20px
borderRadius: tokens.borderRadius['2xl'], // 24px
borderRadius: tokens.borderRadius.full,    // 9999px (círculo)
```

### **Sombras**

```typescript
boxShadow: tokens.shadows.sm,    // 0 2px 8px rgba(0, 0, 0, 0.08)
boxShadow: tokens.shadows.md,    // 0 4px 16px rgba(0, 0, 0, 0.10)
boxShadow: tokens.shadows.lg,    // 0 8px 24px rgba(0, 0, 0, 0.12)
boxShadow: tokens.shadows.xl,    // 0 12px 40px rgba(0, 0, 0, 0.15)
boxShadow: tokens.shadows['2xl'], // 0 20px 60px rgba(0, 0, 0, 0.18)
```

### **Transiciones**

```typescript
transition: `all ${tokens.transitions.fast}`,  // 150ms ease
transition: `color ${tokens.transitions.base}`, // 200ms ease
transition: `opacity ${tokens.transitions.slow}`, // 300ms ease
```

### **Breakpoints**

```typescript
// Usar en media queries
const breakpoints = {
  mobile: 640,   // @media (min-width: 640px)
  tablet: 768,   // @media (min-width: 768px)
  laptop: 1024,  // @media (min-width: 1024px)
  desktop: 1280, // @media (min-width: 1280px)
  wide: 1536,    // @media (min-width: 1536px)
};
```

---

## 🧩 Componentes Reutilizables

### **SearchInput**

```typescript
import SearchInput from '@/components/Home/SearchInput';

<SearchInput 
  placeholder="Busca tu libro ideal..."
  onSearch={(query) => console.log(query)}
/>
```

**Props:**
- `placeholder?: string` - Texto del placeholder
- `onSearch?: (query: string) => void` - Callback cuando cambia el query

**Features:**
- ✅ Estados focus/blur animados
- ✅ Botón clear integrado
- ✅ Icono Lucide Search
- ✅ Accesibilidad (aria-label)

---

### **CategoryTabs**

```typescript
import CategoryTabs from '@/components/Home/CategoryTabs';

const categories = [
  { label: "Todos", value: "all" },
  { label: "Amor", value: "love" },
  { label: "Mascotas", value: "pets" },
];

<CategoryTabs 
  categories={categories}
  activeValue="all"
  onChange={(value) => console.log(value)}
/>
```

**Props:**
- `categories: Array<{ label: string; value: string }>` - Lista de categorías
- `activeValue: string` - Categoría actualmente activa
- `onChange?: (value: string) => void` - Callback al cambiar categoría

**Features:**
- ✅ Estados hover/focus/active
- ✅ Scroll horizontal en mobile
- ✅ Keyboard navigation
- ✅ Role="tablist" para accesibilidad

---

### **FeatureCard**

```typescript
import FeatureCard from '@/components/Home/FeatureCard';
import { Award } from 'lucide-react';
import { tokens } from '@/lib/design-tokens';

<FeatureCard
  icon={Award}
  title="Calidad Premium"
  description="Impresión profesional en papel de alta gramaje..."
  color={tokens.colors.customBooks.primary}
  alignment="left"
/>
```

**Props:**
- `icon: LucideIcon` - Icono de Lucide React
- `title: string` - Título del feature
- `description: string` - Descripción
- `color?: string` - Color del icono (default: rojo)
- `alignment?: 'left' | 'right'` - Alineación del layout

**Features:**
- ✅ Icono en contenedor con background suave
- ✅ Tipografía con tokens
- ✅ Layout flexible left/right

---

### **BookCard**

```typescript
import BookCard from '@/components/Home/BookCard';

<BookCard
  title="10 Razones por las que Te Amo"
  subtitle="Libro de historia entre tú y esa persona especial"
  description="Celebra el amor a través de escenarios cotidianos..."
  image="/path/to/image.jpg"
  badge="NEW"
  href="/libros-personalizados/amor/10-razones"
/>
```

**Props:**
- `title: string` - Título del libro
- `subtitle: string` - Subtítulo
- `description: string` - Descripción corta
- `image: string` - URL de la imagen
- `badge?: string` - Badge opcional (ej: "NEW")
- `href?: string` - Link del CTA

**Features:**
- ✅ Hover effect con elevación
- ✅ Badge con gradiente
- ✅ Next.js Image optimizado
- ✅ CTA con estados hover/active
- ✅ Layout flex responsive

---

### **TrustBadge**

```typescript
import TrustBadge from '@/components/Home/TrustBadge';
import { Star, Truck } from 'lucide-react';

<TrustBadge icon={Star} text="4.8/5 ★ 1500+ reseñas" />
<TrustBadge icon={Truck} text="Envío en 5-7 días" />
```

**Props:**
- `icon: LucideIcon` - Icono de Lucide React
- `text: string` - Texto del badge

**Features:**
- ✅ Glassmorphism (backdrop-filter blur)
- ✅ Icono + texto en inline-flex
- ✅ Sombra sutil
- ✅ Border suave

---

## 📐 Patrones de Diseño

### **Glassmorphism Effect**

```typescript
<div style={{
  background: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(12px)',
  borderRadius: tokens.borderRadius['2xl'],
  border: '1px solid rgba(255, 255, 255, 0.6)',
  boxShadow: tokens.shadows['2xl'],
}}>
  {/* Contenido */}
</div>
```

### **Card con Hover Effect**

```typescript
<div
  style={{
    background: tokens.colors.neutral.surface.base,
    borderRadius: tokens.borderRadius['2xl'],
    border: `1px solid ${tokens.colors.neutral.surface.border}`,
    padding: tokens.spacing.component.md,
    transition: `all ${tokens.transitions.base}`,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = tokens.shadows.lg;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  {/* Contenido */}
</div>
```

### **Button con Estados**

```typescript
<button
  style={{
    padding: `${tokens.spacing.component.xs} ${tokens.spacing.component.md}`,
    borderRadius: tokens.borderRadius.md,
    border: 'none',
    background: tokens.colors.customBooks.gradient,
    color: '#fff',
    fontSize: tokens.typography.bodyLarge.size,
    fontWeight: 800,
    cursor: 'pointer',
    transition: `all ${tokens.transitions.fast}`,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = tokens.shadows.md;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  Click Me
</button>
```

### **Grid Responsive**

```typescript
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
  gap: tokens.spacing.section.xs,
}}>
  {/* Items */}
</div>
```

---

## 🎨 Uso de Lucide React Icons

### **Instalación**

```bash
npm install lucide-react
```

### **Importar Iconos**

```typescript
import { 
  Award, 
  Shield, 
  Truck, 
  CheckCircle2, 
  Star,
  Search,
  X,
  // ... más iconos
} from 'lucide-react';
```

### **Uso Básico**

```typescript
<Award size={24} color={tokens.colors.customBooks.primary} strokeWidth={1.8} />
```

**Props comunes:**
- `size?: number` - Tamaño en px (default: 24)
- `color?: string` - Color del stroke
- `strokeWidth?: number` - Grosor del stroke (default: 2)
- `fill?: string` - Fill del icono (para iconos sólidos)
- `className?: string` - Clases CSS
- `style?: React.CSSProperties` - Estilos inline

### **Iconos Recomendados por Categoría**

**Navigation:**
- `Home`, `Menu`, `X`, `ChevronLeft`, `ChevronRight`, `ChevronDown`

**Actions:**
- `Plus`, `Minus`, `Edit`, `Trash2`, `Save`, `Download`, `Upload`

**Status:**
- `CheckCircle2`, `XCircle`, `AlertCircle`, `Info`, `AlertTriangle`

**Commerce:**
- `ShoppingCart`, `CreditCard`, `Truck`, `Package`, `DollarSign`

**Social:**
- `Heart`, `Star`, `ThumbsUp`, `Share2`, `MessageCircle`

**Media:**
- `Image`, `Video`, `Camera`, `Film`, `Music`

**Search & Filter:**
- `Search`, `Filter`, `SlidersHorizontal`, `ArrowUpDown`

---

## 🔧 Helpers Tipados

### **getColor**

```typescript
import { getColor } from '@/lib/design-tokens';

const primaryColor = getColor('customBooks.primary'); // #B72020
const textColor = getColor('neutral.text.secondary'); // #444
```

### **getTypography**

```typescript
import { getTypography } from '@/lib/design-tokens';

const displayStyle = getTypography('display');
// { size: '56px', weight: 900, lineHeight: 1.1, letterSpacing: '-0.01em' }

const bodyStyle = getTypography('body');
// { size: '16px', weight: 400, lineHeight: 1.6, letterSpacing: '0.005em' }
```

### **getSpacing**

```typescript
import { getSpacing } from '@/lib/design-tokens';

const microPadding = getSpacing('micro', 'sm'); // 8px
const sectionGap = getSpacing('section', 'md'); // 64px
```

---

## ✅ Checklist de Consistencia

Antes de agregar un nuevo componente, verifica:

- [ ] ¿Usa tokens de color en lugar de valores hardcoded?
- [ ] ¿Usa el sistema de espaciado (4/8dp)?
- [ ] ¿Usa la escala tipográfica definida?
- [ ] ¿Usa border radius del sistema?
- [ ] ¿Usa sombras del sistema?
- [ ] ¿Tiene estados hover/focus/active definidos?
- [ ] ¿Usa Next.js Image con width/height?
- [ ] ¿Usa iconos SVG (Lucide) en lugar de emojis?
- [ ] ¿Tiene aria-labels para accesibilidad?
- [ ] ¿Es responsive (mobile-first)?

---

## 🚫 Anti-Patrones a Evitar

### ❌ **NO hacer:**

```typescript
// Colores hardcoded
background: '#B72020',
color: '#444',

// Espaciado arbitrario
padding: '17px',
margin: '23px',

// Tipografía inconsistente
fontSize: '19px',
fontWeight: 550,

// Emojis como iconos
<span>🏅</span>

// Imágenes sin dimensiones
<img src="..." alt="..." />

// Border radius random
borderRadius: '13px',
```

### ✅ **SÍ hacer:**

```typescript
// Usar tokens
background: tokens.colors.customBooks.primary,
color: tokens.colors.neutral.text.secondary,

// Espaciado del sistema
padding: tokens.spacing.component.xs,
margin: tokens.spacing.section.md,

// Tipografía del sistema
fontSize: tokens.typography.body.size,
fontWeight: tokens.typography.body.weight,

// Iconos SVG
<Award size={24} color={tokens.colors.customBooks.primary} />

// Next.js Image optimizado
<Image src="..." alt="..." width={280} height={200} />

// Border radius del sistema
borderRadius: tokens.borderRadius.md,
```

---

## 📚 Recursos Adicionales

- **Lucide Icons:** https://lucide.dev/icons
- **Next.js Image:** https://nextjs.org/docs/app/api-reference/components/image
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Framer Motion:** https://www.framer.com/motion/

---

## 🤝 Contribuir

Al agregar nuevos componentes o features:

1. **Consulta los tokens** antes de definir valores
2. **Reutiliza componentes** existentes cuando sea posible
3. **Sigue los patrones** de diseño establecidos
4. **Documenta** nuevos componentes si son reutilizables
5. **Testa accesibilidad** con keyboard y screen reader

---

**Mantenido por:** Equipo PixelArt  
**Última actualización:** 2025-03-18
