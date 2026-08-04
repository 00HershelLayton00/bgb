"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Impulse = {
  x: number;
  y: number;
  born: number;
};

type TrailPoint = {
  x: number;
  y: number;
  born: number;
};

const POINTER_RADIUS = 160;
const CLICK_RADIUS = 220;
const IMPULSE_DURATION = 600;
const TRAIL_DURATION = 600;
const MAX_SPEED = 2.2;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let impulses: Impulse[] = [];
    let trail: TrailPoint[] = [];
    let particles: Particle[] = [];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      const count = Math.max(30, Math.min(90, Math.floor((width * height) / 24000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.8 + Math.random() * 1.4
      }));
    };

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      trail.push({ x: pointerX, y: pointerY, born: performance.now() });
      if (trail.length > 80) trail.shift();
    };

    const onLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        pointerX = touch.clientX;
        pointerY = touch.clientY;
        trail.push({ x: pointerX, y: pointerY, born: performance.now() });
        if (trail.length > 80) trail.shift();
      }
    };

    const onTouchEnd = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    const onPointerDown = (event: PointerEvent | TouchEvent) => {
      if (event instanceof PointerEvent) {
        impulses.push({ x: event.clientX, y: event.clientY, born: performance.now() });
      } else {
        const touch = event.touches[0];
        if (touch) {
          impulses.push({ x: touch.clientX, y: touch.clientY, born: performance.now() });
        }
      }
      if (impulses.length > 8) impulses.shift();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(4, 6, 12, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const now = performance.now();
      impulses = impulses.filter((impulse) => now - impulse.born < IMPULSE_DURATION);
      trail = trail.filter((point) => now - point.born < TRAIL_DURATION);

      for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        const age = (now - point.born) / TRAIL_DURATION;
        const radius = 3 + 12 * (1 - age);
        const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
        glow.addColorStop(0, `rgba(120, 180, 255, ${0.28 * (1 - age)})`);
        glow.addColorStop(1, "rgba(120, 180, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (!prefersReducedMotion) {
          const dxp = particle.x - pointerX;
          const dyp = particle.y - pointerY;
          const pointerDistance = Math.sqrt(dxp * dxp + dyp * dyp);

          if (pointerDistance > 0.001 && pointerDistance < POINTER_RADIUS) {
            const force = (1 - pointerDistance / POINTER_RADIUS) * 0.5;
            particle.vx += (dxp / pointerDistance) * force;
            particle.vy += (dyp / pointerDistance) * force;
          } else if (pointerDistance < POINTER_RADIUS * 2.2) {
            const ring = (pointerDistance - POINTER_RADIUS) / (POINTER_RADIUS * 1.2);
            const force = Math.max(0, 1 - ring) * 0.12;
            particle.vx -= (dxp / pointerDistance) * force;
            particle.vy -= (dyp / pointerDistance) * force;
          }

          for (let j = 0; j < impulses.length; j++) {
            const impulse = impulses[j];
            const dx = particle.x - impulse.x;
            const dy = particle.y - impulse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0.001 && dist < CLICK_RADIUS) {
              const decay = 1 - (now - impulse.born) / IMPULSE_DURATION;
              const force = (1 - dist / CLICK_RADIUS) * 0.9 * decay;
              particle.vx += (dx / dist) * force;
              particle.vy += (dy / dist) * force;
            }
          }

          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > MAX_SPEED) {
            particle.vx = (particle.vx / speed) * MAX_SPEED;
            particle.vy = (particle.vy / speed) * MAX_SPEED;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const pointerDistance = Math.sqrt(dx * dx + dy * dy);
        const pointerGlow = pointerDistance < POINTER_RADIUS ? 1 - pointerDistance / POINTER_RADIUS : 0;

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const ox = particle.x - other.x;
          const oy = particle.y - other.y;
          const dist = Math.sqrt(ox * ox + oy * oy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 130, 255, ${0.13 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        if (pointerGlow > 0) {
          ctx.strokeStyle = `rgba(0, 140, 255, ${0.3 * pointerGlow})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(pointerX, pointerY);
          ctx.stroke();
        }

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 12);
        gradient.addColorStop(0, `rgba(95, 160, 255, ${0.6 + pointerGlow * 0.1})`);
        gradient.addColorStop(1, "rgba(120, 180, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8 + pointerGlow * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(220, 235, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-45" />;
}