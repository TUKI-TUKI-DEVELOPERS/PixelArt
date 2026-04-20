'use client';

import { useEffect, useRef } from 'react';

/**
 * Port fiel del efecto "pixie" original — 100 círculos radiales flotantes
 * con centro blanco y resplandor azul, sobre fondo oscuro navy→blue.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const con = canvas.getContext('2d');
    if (!con) return;

    const rint = 60;

    let WIDTH  = canvas.parentElement?.offsetWidth  ?? window.innerWidth;
    let HEIGHT = canvas.parentElement?.offsetHeight ?? window.innerHeight;

    canvas.width  = WIDTH;
    canvas.height = HEIGHT;

    // ── Partícula (traducción 1:1 del Circle() original) ─────────────────
    interface P {
      x: number; y: number; r: number;
      dx: number; dy: number;
      hl: number; rt: number;
      s_rt: number;   // this.s.rt en el original
      stop: number;
      reset(): void; fade(): void; move(): void; draw(): void;
    }

    function makeParticle(): P {
      const p: P = {
        x: 0, y: 0, r: 0, dx: 0, dy: 0,
        hl: 0, rt: 0, s_rt: 0, stop: 0,

        reset() {
          WIDTH  = canvas!.parentElement?.offsetWidth  ?? window.innerWidth;
          HEIGHT = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
          this.x    = WIDTH  * Math.random();
          this.y    = HEIGHT * Math.random();
          this.r    = 13 * Math.random() + 2;                    // rmax=15
          this.dx   = Math.random() * 5 * (Math.random() < .5 ? -1 : 1);  // xmax=5
          this.dy   = Math.random() * 2 * (Math.random() < .5 ? -1 : 1);  // ymax=2
          this.hl   = (8e3 / rint) * (this.r / 10);
          this.rt   = Math.random() * this.hl;
          this.s_rt = Math.random() + 1;
          this.stop = Math.random() * .2 + .4;
        },

        fade() { this.rt += this.s_rt; },

        draw() {
          // blink: oscila en vez de morir
          if (this.rt <= 0 || this.rt >= this.hl) this.s_rt *= -1;

          const e = 1 - this.rt / this.hl;          // alpha 0→1→0

          con!.beginPath();
          con!.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
          con!.closePath();

          // Radio fijo = this.r, solo varía la opacidad → el glow no desaparece
          const g = con!.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.r,
          );
          g.addColorStop(0,         `rgba(255,255,255,${e})`);
          g.addColorStop(this.stop, `rgba(77,101,181,${e * .7})`);
          g.addColorStop(1,          'rgba(77,101,181,0)');

          // screen: los brillos se suman → mucho más visible sobre fondo oscuro
          con!.globalCompositeOperation = 'screen';
          con!.fillStyle = g;
          con!.fill();
          con!.globalCompositeOperation = 'source-over';
        },

        move() {
          WIDTH  = canvas!.parentElement?.offsetWidth  ?? window.innerWidth;
          HEIGHT = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
          this.x += this.rt / this.hl * this.dx;
          this.y += this.rt / this.hl * this.dy;
          if (this.x > WIDTH  || this.x < 0) this.dx *= -1;
          if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
        },
      };
      p.reset();
      return p;
    }

    // ── 130 partículas ────────────────────────────────────────────────────
    const pxs: P[] = Array.from({ length: 130 }, makeParticle);

    function draw() {
      // Redimensionar si el contenedor cambió
      const pw = canvas!.parentElement?.offsetWidth  ?? window.innerWidth;
      const ph = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
      if (canvas!.width !== pw || canvas!.height !== ph) {
        canvas!.width = pw; canvas!.height = ph;
        WIDTH = pw; HEIGHT = ph;
      }

      con!.clearRect(0, 0, WIDTH, HEIGHT);
      for (const p of pxs) { p.fade(); p.move(); p.draw(); }
    }

    const timer = setInterval(draw, rint);

    const ro = new ResizeObserver(() => {
      const pw = canvas!.parentElement?.offsetWidth  ?? window.innerWidth;
      const ph = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
      canvas!.width = pw; canvas!.height = ph;
      WIDTH = pw; HEIGHT = ph;
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => { clearInterval(timer); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
