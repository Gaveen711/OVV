import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Site-wide inertial smooth scrolling via Lenis.
 *
 * The hero (ScrollExpandMedia) owns the wheel until the video is fully
 * expanded, so Lenis stays stopped until the hero broadcasts `hero-state`
 * with { expanded: true }, and stops again if the hero collapses.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.stop();
    const onHeroState = (e) => {
      if (e.detail?.expanded) {
        lenis.start();
      } else {
        lenis.stop();
      }
    };
    window.addEventListener('hero-state', onHeroState);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('hero-state', onHeroState);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
