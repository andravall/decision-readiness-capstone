import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: 0 | 1 | 2; // 0: cobalt, 1: emerald, 2: amber
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

/**
 * Interactive background layer combining:
 * 1. Subtle architectural paper grain texture (SVG feTurbulence overlay)
 * 2. Cursor-reactive magnetic coordinate grid (crosshairs & illuminated nodes near pointer)
 * 3. Floating readiness signal particles that gently gravitate & link near the cursor
 * 4. Click/tap confirmation ripple waves
 */
export const InteractiveAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      active: false
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

      const targetCount = width < 720 ? 22 : 46;
      particles.length = 0;
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: 1.6 + Math.random() * 1.4,
          kind: (i % 3) as 0 | 1 | 2,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initCanvas();

    const onPointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
      if (pointer.x < -1000) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      ripples.push({ x: e.clientX, y: e.clientY, radius: 6, alpha: 0.36 });
      if (ripples.length > 5) ripples.shift();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('resize', initCanvas, { passive: true });

    const COLORS = [
      '29, 78, 216', // Cobalt
      '14, 105, 66', // Emerald
      '180, 98, 12' // Warm Amber
    ];

    const GRID_STEP = 36;
    const MAGNET_RADIUS = 185;

    const render = (time: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate pointer position
      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.16;
        pointer.y += (pointer.targetY - pointer.y) * 0.16;
      } else {
        pointer.x += (-9999 - pointer.x) * 0.04;
        pointer.y += (-9999 - pointer.y) * 0.04;
      }

      // 1. Soft radial ambient glow around active pointer
      if (pointer.x > -500) {
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          8,
          pointer.x,
          pointer.y,
          MAGNET_RADIUS * 1.15
        );
        grad.addColorStop(0, 'rgba(29, 78, 216, 0.065)');
        grad.addColorStop(0.55, 'rgba(16, 185, 129, 0.028)');
        grad.addColorStop(1, 'rgba(29, 78, 216, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, MAGNET_RADIUS * 1.15, 0, Math.PI * 2);
        ctx.fill();

        // 2. Illuminate & gently warp architectural grid nodes near cursor
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
              const pull = strength * strength * 5.5;
              const angle = Math.atan2(dy, dx);
              const px = gx + Math.cos(angle) * pull;
              const py = gy + Math.sin(angle) * pull;

              if ((r + c) % 3 === 0 && strength > 0.42) {
                // Crisp architectural micro-crosshair (+)
                const arm = 2.6 + strength * 1.8;
                ctx.strokeStyle = `rgba(29, 78, 216, ${(strength * 0.42).toFixed(3)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(px - arm, py);
                ctx.lineTo(px + arm, py);
                ctx.moveTo(px, py - arm);
                ctx.lineTo(px, py + arm);
                ctx.stroke();
              } else {
                ctx.fillStyle = `rgba(17, 20, 18, ${(strength * 0.28).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, 1.1 + strength * 1.1, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // 3. Update & render floating Readiness Signal Particles
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

        if (dist < MAGNET_RADIUS * 1.15 && dist > 1) {
          boost = 1 - dist / (MAGNET_RADIUS * 1.15);
          // Gentle orbital attraction toward cursor
          p.x += (dx / dist) * boost * 0.65;
          p.y += (dy / dist) * boost * 0.65;
          nearCursor.push(p);
        }

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0022 + p.phase);
        const alpha = 0.14 + pulse * 0.1 + boost * 0.52;
        const rgb = COLORS[p.kind];

        ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Connect signal particles inside cursor's Confirmation Field
      for (let i = 0; i < nearCursor.length; i++) {
        const a = nearCursor[i];
        // Line from particle to cursor center if very close
        const dCursor = Math.hypot(pointer.x - a.x, pointer.y - a.y);
        if (dCursor < 125) {
          const lineAlpha = (1 - dCursor / 125) * 0.18;
          ctx.strokeStyle = `rgba(29, 78, 216, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        // Lines between nearby aligned particles
        for (let j = i + 1; j < nearCursor.length; j++) {
          const b = nearCursor[j];
          const dPair = Math.hypot(a.x - b.x, a.y - b.y);
          if (dPair < 115) {
            const pairAlpha = (1 - dPair / 115) * 0.2;
            ctx.strokeStyle = `rgba(14, 105, 66, ${pairAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 5. Render click/tap Confirmation Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 2.8;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(29, 78, 216, ${rp.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.25;
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
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
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
