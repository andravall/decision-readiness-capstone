import React, { useEffect, useState } from 'react';

/**
 * Tracks page vertical scroll progress (0..1) using passive listeners + rAF.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const next = docHeight > 20 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
}

/**
 * Updates CSS custom properties (--mx, --my) on pointer-enabled devices
 * to render a subtle cursor-tracking radial spotlight on cards.
 */
export function handleSpotlightMove(e: React.PointerEvent<HTMLElement>): void {
  if (e.pointerType === 'touch') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${Math.round(e.clientX - rect.left)}px`);
  el.style.setProperty('--my', `${Math.round(e.clientY - rect.top)}px`);
}
