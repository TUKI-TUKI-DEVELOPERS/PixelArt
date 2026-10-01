# Prompt de ejecución por paso

Copia este bloque y reemplaza `{N}` por el número de paso (10, 11, 12, 13, 14 o 15).
Uno por sesión.

---

Trabajas en el repositorio PixelArt, en el flujo de **photobooks a medida**.

**Lee primero, en este orden:**

1. `docs/photobook-a-medida-checklist.md` — la línea **"Dónde estamos"** te dice
   en qué sub-tarea empezar. No asumas, léela.
2. `docs/photobook-a-medida-flujo-y-pendientes.md`, **sección 5** — la
   **"Regla de parada"** y el bloque de cada sub-tarea.

**Tu alcance en esta sesión es únicamente el PASO {N}.** No empieces el paso
siguiente ni "adelantes" nada de otro paso.

**Por cada sub-tarea del paso {N}, en orden:**

1. Lee su bloque completo en la sección 5, **incluida la *Trampa***. No escribas
   código antes de leerla: describe lo que vas a romper si la ignoras.
2. Implementa solo lo que pide esa sub-tarea.
3. Comprueba su ***Hecho cuando*** y pega la evidencia real: salida del comando,
   resultado de la consulta SQL, o el conteo de tests. No lo afirmes sin mostrarlo.
4. Corre `npm run build` y los tests del workspace que tocaste
   (`cd backend/api && npx jest` o `cd frontend/web && npx vitest run`).
5. Si pasó: marca la casilla en `photobook-a-medida-checklist.md` y actualiza la
   línea **"Dónde estamos"** a la sub-tarea siguiente.
6. Si no pasó: **no marques nada**. Arregla, o párate y pregunta.

**Reglas duras:**

- Si te encuentras **decidiendo** algo en vez de implementándolo, el plan tiene un
  hueco: **párate y pregunta**. No elijas por tu cuenta (Regla de parada).
- **Nunca modifiques un test existente para que algo pase.** Si un test falla, el
  código nuevo está mal, no el test.
- Una sub-tarea que no cumple su *Hecho cuando* **no está hecha**, aunque compile
  y los tests pasen.
- Si un archivo citado en el doc ya no existe o cambió de forma, párate y avisa.
- **Prohibido:** commit, push, despliegue, `docker compose down -v` (borra los
  volúmenes de MinIO con fotos reales), y tocar los guards admin del resto del
  proyecto — está explícitamente fuera de alcance.

**Al terminar el paso {N}, PARA y reporta exactamente así:**

```
PASO {N} — terminado / parcial

Sub-tareas:
- {N}.1  ✅ | ⛔   qué cambió y en qué archivos
         Hecho cuando: [evidencia pegada]
- {N}.2  ✅ | ⛔   ...

Verificación: build [ok|falla] · backend [x/y tests] · frontend [x/y tests]

Decisiones que tomé: [ninguna | cuáles y por qué]
Bloqueos o dudas: [ninguna | cuáles]
Lo que NO hice y por qué: [...]

¿Puedo continuar con el paso {N+1}?
```

**No continúes hasta recibir un sí explícito.** Si algo quedó parcial, dilo en el
reporte en vez de dejarlo a medias en silencio.
