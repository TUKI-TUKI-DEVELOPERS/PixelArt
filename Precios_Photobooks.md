# Precios Photobooks — Documentación Completa

> Última actualización: 2026-05-11

---

## 1. Estructura de Precios por Tramos

El precio de un photobook depende de **dos variables**: el tipo de tapa y la cantidad de hojas.
No existe un precio por hoja fijo — el precio baja por hoja a mayor volumen (descuento implícito).

### Tapa Delgada (cartulina estándar)

| Tramo | Hojas | Caras | Precio fijo |
|-------|-------|-------|-------------|
| 1 — Básico   | 15 – 24 hojas | 30 – 48 caras  | **S/ 90**  |
| 2 — Popular  | 25 – 39 hojas | 50 – 78 caras  | **S/ 120** |
| 3 — Completo | 40 +   hojas  | 80 + caras     | **S/ 170** |

### Tapa Gruesa (tapa dura resistente)

| Tramo | Hojas | Caras | Precio fijo |
|-------|-------|-------|-------------|
| 1 — Básico   | 15 – 24 hojas | 30 – 48 caras  | **S/ 120** |
| 2 — Popular  | 25 – 49 hojas | 50 – 98 caras  | **S/ 160** |
| 3 — Completo | 50 +   hojas  | 100 + caras    | **S/ 240** |

### Mínimo absoluto
- **15 hojas (30 caras)** — no se puede crear un photobook con menos hojas.

---

## 2. Análisis: ¿Por qué no hay precio por hoja fijo?

| Tapa Delgada | Precio/hoja |
|---|---|
| 15h → S/90 | S/6.00 |
| 25h → S/120 | S/4.80 |
| 40h → S/170 | S/4.25 |

| Tapa Gruesa | Precio/hoja |
|---|---|
| 15h → S/120 | S/8.00 |
| 25h → S/160 | S/6.40 |
| 50h → S/240 | S/4.80 |

El precio por hoja **decrece con el volumen** — es un descuento implícito por mayor cantidad.
Por eso se usan tramos fijos en lugar de multiplicación por hoja.

---

## 3. Lógica de cálculo (código)

```ts
type CoverType = "TAPA_DELGADA" | "TAPA_GRUESA";

const PRICE_TIERS: Record<CoverType, { minHojas: number; priceCents: number }[]> = {
  TAPA_DELGADA: [
    { minHojas: 15, priceCents: 9000  },  // S/ 90
    { minHojas: 25, priceCents: 12000 },  // S/ 120
    { minHojas: 40, priceCents: 17000 },  // S/ 170
  ],
  TAPA_GRUESA: [
    { minHojas: 15, priceCents: 12000 },  // S/ 120
    { minHojas: 25, priceCents: 16000 },  // S/ 160
    { minHojas: 50, priceCents: 24000 },  // S/ 240
  ],
};

function getPriceCents(coverType: CoverType, hojas: number): number | null {
  if (hojas < 15) return null; // bajo el mínimo
  const tiers = PRICE_TIERS[coverType];
  // Buscar el tramo más alto que aplica
  let price = tiers[0].priceCents;
  for (const tier of tiers) {
    if (hojas >= tier.minHojas) price = tier.priceCents;
  }
  return price;
}

// Relación editor ↔ hojas:
// El editor trabaja en "caras" (páginas del editor)
// 1 hoja = 2 caras → hojas = Math.ceil(caras / 2)
function carsToHojas(caras: number): number {
  return Math.ceil(caras / 2);
}
```

### Ejemplos
| Caras (editor) | Hojas | Tapa Delgada | Tapa Gruesa |
|---|---|---|---|
| 30 | 15 | S/90 | S/120 |
| 32 | 16 | S/90 | S/120 |
| 50 | 25 | S/120 | S/160 |
| 60 | 30 | S/120 | S/160 |
| 80 | 40 | S/170 | S/160 |
| 100 | 50 | S/170 | S/240 |

---

## 4. Dónde se muestra el precio en el editor

| Ubicación | Descripción |
|-----------|-------------|
| **Paso 2 — sidebar** | Hojas actuales + precio del tramo activo |
| **Paso 3 — preview** | Resumen: hojas, tapa, precio total |
| **Paso 4 — datos** | Selector de tapa + precio actualizado |
| **Paso 5 — confirmar** | Resumen final antes de enviar |

---

## 5. Página pública de Photobooks (`/photobooks`)

### Sección de precios (reemplazó "TAPA PREMIUM")
- Fondo oscuro degradado (igual al hero)
- Dos cards: **Tapa Delgada** (azul) y **Tapa Gruesa** (morado, badge "Recomendada")
- Cada card muestra los 3 tramos con badge "MÁS ELEGIDO" en el tramo de 25 hojas
- Nota al pie: mínimo 15 hojas, envío se calcula al confirmar

### Tarjetas de portadas
- Precio base: **"Desde S/ 90"** — 15 hojas · Tapa Delgada
- Todas las tarjetas muestran el mismo precio base

---

## 6. Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `frontend/web/src/app/(public)/photobooks/PhotobooksClient.tsx` | Página pública — sección de precios + tarjetas |
| `frontend/web/src/app/(public)/photobooks/[temaSlug]/editor/PhotobookEditorClient.tsx` | Editor — lógica de precios por tramos (pendiente) |
| `backend/api/src/database/seed.ts` | Seeds — precios base en DB (referencia) |

---

## 7. Pendiente de implementación

- [ ] Reemplazar modelo `pricePerPageCents × páginas` por lógica de tramos en el editor
- [ ] Agregar selector de tapa (Delgada / Gruesa) en el editor
- [ ] Calcular `hojas = ceil(caras / 2)` y mostrar precio del tramo correspondiente en tiempo real
- [ ] Validar mínimo de 15 hojas antes de avanzar al paso siguiente
