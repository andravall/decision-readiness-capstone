import React, { useEffect, useRef } from 'react';
import { useTheme } from '../i18n/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: 0 | 1 | 2;
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

/**
 * Dual-theme kinetic ambient background:
 * - Atmospheric breathing radial aurora orbs
 * - Cursor & touch-reactive magnetic coordinate crosshairs (+)
 * - Floating readiness signal particles that link inside the confirmation field
 * - Click / tap confirmation ripple waves (desktop & mobile)
 */
export const InteractiveAmbientBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    const pointer = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
      lastTouchAt: 0
    };

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = width < 720 ? 28 : 54;
      particles.length = 0;
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.36,
          vy: (Math.random() - 0.5) * 0.36,
          r: 1.5 + Math.random() * 1.5,
          kind: (i % 3) as 0 | 1 | 2,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initCanvas();

    const activateAt = (cx: number, cy: number, spawnRipple = false) => {
      pointer.targetX = cx;
      pointer.targetY = cy;
      pointer.active = true;
      if (pointer.x < -1000) {
        pointer.x = cx;
        pointer.y = cy;
      }
      if (spawnRipple) {
        ripples.push({ x: cx, y: cy, radius: 6, alpha: 0.45 });
        if (ripples.length > 6) ripples.shift();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      activateAt(e.clientX, e.clientY, false);
    };

    const onPointerDown = (e: PointerEvent) => {
      pointer.lastTouchAt = performance.now();
      activateAt(e.clientX, e.clientY, true);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      pointer.lastTouchAt = performance.now();
      activateAt(touch.clientX, touch.clientY, false);
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('resize', initCanvas, { passive: true });

    const DARK_COLORS = ['96, 165, 250', '52, 211, 153', '251, 191, 36'];
    const LIGHT_COLORS = ['37, 99, 235', '5, 150, 105', '217, 119, 6'];

    const GRID_STEP = 38;
    const MAGNET_RADIUS = 195;

    const render = (time: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const isDark = themeRef.current === 'dark';
      ctx.clearRect(0, 0, width, height);

      // Fade out touch magnet gently 2.2s after finger lifts on mobile
      if (pointer.lastTouchAt > 0 && time - pointer.lastTouchAt > 2200 && width < 900) {
        pointer.active = false;
      }

      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.16;
        pointer.y += (pointer.targetY - pointer.y) * 0.16;
      } else {
        pointer.x += (-9999 - pointer.x) * 0.04;
        pointer.y += (-9999 - pointer.y) * 0.04;
      }

      // 1. Slow breathing atmospheric aurora beams at top corners
      const driftX = Math.sin(time * 0.0004) * 55;
      const driftY = Math.cos(time * 0.00035) * 35;

      const orb1 = ctx.createRadialGradient(
        width * 0.18 + driftX,
        height * 0.14 + driftY,
        10,
        width * 0.18 + driftX,
        height * 0.14 + driftY,
        Math.max(width * 0.42, 340)
      );
      orb1.addColorStop(0, isDark ? 'rgba(37, 99, 235, 0.13)' : 'rgba(37, 99, 235, 0.065)');
      orb1.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, width, height);

      const orb2 = ctx.createRadialGradient(
        width * 0.84 - driftX,
        height * 0.24 - driftY,
        10,
        width * 0.84 - driftX,
        height * 0.24 - driftY,
        Math.max(width * 0.36, 300)
      );
      orb2.addColorStop(0, isDark ? 'rgba(16, 185, 129, 0.09)' : 'rgba(16, 185, 129, 0.05)');
      orb2.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, width, height);

      // 2. Magnetic grid crosshairs near pointer (no cursor light/glow halo)
      if (pointer.x > -500) {
        const minCol = Math.max(0, Math.floor((pointer.x - MAGNET_RADIUS) / GRID_STEP));
        const maxCol = Math.min(
          Math.ceil(width / GRID_STEP),
          Math.ceil((pointer.x + MAGNET_RADIUS) / GRID_STEP)
        );
        const minRow = Math.max(0, Math.floor((pointer.y - MAGNET_RADIUS) / GRID_STEP));
        const maxRow = Math.min(
          Math.ceil(height / GRID_STEP),
          Math.ceil((pointer.y + MAGNET_RADIUS) / GRID_STEP)
        );

        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            const gx = c * GRID_STEP;
            const gy = r * GRID_STEP;
            const dx = pointer.x - gx;
            const dy = pointer.y - gy;
            const dist = Math.hypot(dx, dy);
            if (dist < MAGNET_RADIUS) {
              const strength = 1 - dist / MAGNET_RADIUS;
              const pull = strength * strength * 6;
              const angle = Math.atan2(dy, dx);
              const px = gx + Math.cos(angle) * pull;
              const py = gy + Math.sin(angle) * pull;

              if ((r + c) % 3 === 0 && strength > 0.38) {
                const arm = 2.8 + strength * 2;
                ctx.strokeStyle = isDark
                  ? `rgba(96, 165, 250, ${(strength * 0.55).toFixed(3)})`
                  : `rgba(37, 99, 235, ${(strength * 0.45).toFixed(3)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(px - arm, py);
                ctx.lineTo(px + arm, py);
                ctx.moveTo(px, py - arm);
                ctx.lineTo(px, py + arm);
                ctx.stroke();
              } else {
                ctx.fillStyle = isDark
                  ? `rgba(226, 232, 240, ${(strength * 0.34).toFixed(3)})`
                  : `rgba(15, 23, 42, ${(strength * 0.28).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, 1 + strength * 1.1, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // 3. Floating Readiness Signal Particles
      const palette = isDark ? DARK_COLORS : LIGHT_COLORS;
      const nearCursor: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);
        let boost = 0;

        if (dist < MAGNET_RADIUS * 1.18 && dist > 1) {
          boost = 1 - dist / (MAGNET_RADIUS * 1.18);
          p.x += (dx / dist) * boost * 0.68;
          p.y += (dy / dist) * boost * 0.68;
          nearCursor.push(p);
        }

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0024 + p.phase);
        const baseAlpha = isDark ? 0.22 : 0.16;
        const alpha = baseAlpha + pulse * 0.12 + boost * 0.54;

        ctx.fillStyle = `rgba(${palette[p.kind]}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 1.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Constellation Links near Pointer/Touch
      for (let i = 0; i < nearCursor.length; i++) {
        const a = nearCursor[i];
        const dCursor = Math.hypot(pointer.x - a.x, pointer.y - a.y);
        if (dCursor < 130) {
          const lineAlpha = (1 - dCursor / 130) * (isDark ? 0.28 : 0.2);
          ctx.strokeStyle = isDark
            ? `rgba(96, 165, 250, ${lineAlpha.toFixed(3)})`
            : `rgba(37, 99, 235, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < nearCursor.length; j++) {
          const b = nearCursor[j];
          const dPair = Math.hypot(a.x - b.x, a.y - b.y);
          if (dPair < 118) {
            const pairAlpha = (1 - dPair / 118) * (isDark ? 0.25 : 0.18);
            ctx.strokeStyle = isDark
              ? `rgba(52, 211, 153, ${pairAlpha.toFixed(3)})`
              : `rgba(5, 150, 105, ${pairAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 5. Confirmation Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 3;
        rp.alpha *= 0.93;
        if (rp.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = isDark
          ? `rgba(96, 165, 250, ${rp.alpha.toFixed(3)})`
          : `rgba(37, 99, 235, ${rp.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return (
    <div className="ambient-bg-root" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-canvas" />
      <div className="ambient-grain" />
    </div>
  );
};
