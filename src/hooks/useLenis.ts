import { useEffect, useState, useRef } from 'react';
import Lenis, { type LenisOptions } from 'lenis';

/**
 * Initializes Lenis smooth scrolling engine for desktop environments with lerp: 0.1.
 * Automatically skips initialization on touch/mobile devices to preserve native gesture scrolling.
 * Cleans up requestAnimationFrame loop and Lenis instance on unmount.
 */
export function useLenis(options?: Partial<LenisOptions>): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    // Guard against non-browser / SSR environments
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Touch and mobile detection: preserve native touch scrolling on coarse pointer devices
    const isTouch = Boolean(
      window.matchMedia?.('(pointer: coarse)').matches ||
      (!window.matchMedia && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
    );

    if (isTouch) {
      return;
    }

    let lenisInstance: Lenis | null = null;
    let rafId: number | null = null;

    try {
      lenisInstance = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        ...optionsRef.current,
      });

      setLenis(lenisInstance);

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Lenis smooth scroll failed to initialize:', err);
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      setLenis(null);
    };
  }, []);

  return lenis;
}
