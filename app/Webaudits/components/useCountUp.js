'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Returns [ref, displayValue]. Attach `ref` to the element showing the number.
 * Skips the animation entirely when the visitor prefers reduced motion.
 */
export default function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf;
    let start;

    const run = () => {
      const tick = (t) => {
        if (start === undefined) start = t;
        const progress = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: '-50px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  const display = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return [ref, display];
}