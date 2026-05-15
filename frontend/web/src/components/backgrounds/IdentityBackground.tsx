'use client';

import { useEffect, useRef } from 'react';

export default function IdentityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    class Bubble {
      x = 0;
      y = 0;
      size = 0;
      speedY = 0;
      opacity = 0;
      driftX = 0;
      driftPhase = 0;
      driftSpeed = 0;

      constructor() {
        this.init(true);
      }

      init(scatter = false) {
        this.x = Math.random() * canvas.width;
        this.y = scatter
          ? Math.random() * canvas.height
          : canvas.height + 20;

        const isLarge = Math.random() < 0.3;
        this.size = isLarge
          ? Math.random() * 25 + 30
          : Math.random() * 7 + 2;

        this.speedY = this.size > 20
          ? Math.random() * 0.3 + 0.1
          : Math.random() * 0.6 + 0.2;

        this.opacity = this.size > 20
          ? Math.random() * 0.25 + 0.1
          : Math.random() * 0.4 + 0.2;

        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.01 + 0.005;
        this.driftX = this.size > 20
          ? Math.random() * 0.6 + 0.3
          : Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.driftPhase) * this.driftX;
        this.driftPhase += this.driftSpeed;

        if (this.y < -this.size) {
          this.init();
        }
      }

      draw() {
        // Fill interior — degradado #FBDB6E (centro) → #FAFB8C (borde)
        const fillGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        fillGradient.addColorStop(0,   `rgba(247, 255, 0, ${this.opacity * 0.8})`);
        fillGradient.addColorStop(0.5, `rgba(251, 231, 122, ${this.opacity * 0.6})`);
        fillGradient.addColorStop(1,   `rgba(251, 255, 141, ${this.opacity * 0.35})`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = fillGradient;
        ctx.fill();


        // Shine — punto de luz offset arriba-izquierda
        const shineRadius = this.size * 0.35;
        const shineX = this.x - this.size * 0.28;
        const shineY = this.y - this.size * 0.28;
        const shineGradient = ctx.createRadialGradient(
          shineX, shineY, 0,
          shineX, shineY, shineRadius
        );
        shineGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.5})`);
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(shineX, shineY, shineRadius, 0, Math.PI * 2);
        ctx.fillStyle = shineGradient;
        ctx.fill();
      }
    }

    const bubbles: Bubble[] = Array.from({ length: 60 }, () => new Bubble());

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.update();
        b.draw();
      });
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
