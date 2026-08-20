import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Site-wide inertial smooth scrolling via Lenis.
 *
 * Lenis owns the page scroll with one dedicated animation frame loop. Keeping
 * this driver independent from component animation schedulers prevents the
 * sticky gallery and the rest of the page from competing for frame timing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      // `lerp` rather than duration+easing: a duration-based tween restarts on
      // every wheel tick, so continuous scrolling keeps re-easing from zero and
      // feels stepped. A constant lerp gives the single weighted glide that
      // carries momentum through an uninterrupted gesture. A lower lerp adds a
      // touch more inertia so the page glides to rest instead of snapping - the
      // weighted, unhurried deceleration that reads as "Apple-smooth".
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      // Touch is left entirely to the browser. iOS momentum scrolling is
      // tuned against the hardware and beats any JS approximation of it -
      // `syncTouch` would replace it with a rAF-driven imitation that drifts
      // under fast flicks. `useScroll` reads native scroll either way, so the
      // scroll-driven animations still track correctly on mobile.
      syncTouch: false,
      anchors: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoRaf: false,
    });
    window.__lenis = lenis;

    let rafId = 0;
    const update = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(update);
    };
    rafId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
