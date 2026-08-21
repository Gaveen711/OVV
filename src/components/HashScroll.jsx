import { useEffect } from 'react';

/**
 * Honours a `#section` in the URL when the landing page is opened directly -
 * for example `/#register` from a villa detail page.
 *
 * The browser's own hash restore fires before React has mounted the sections,
 * so it lands on nothing. Lenis then owns the scroll position from its first
 * frame onward, which would undo a plain `scrollIntoView` anyway. So the scroll
 * is deferred until the tree is painted and re-applied once late images have
 * settled the layout, and it jumps rather than animates: easing through a very
 * tall page from the top reads as a long stall, not a transition.
 */
export default function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;

    let cancelled = false;

    const jump = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) return;

      if (window.__lenis) {
        window.__lenis.scrollTo(el, { immediate: true, force: true });
      } else {
        el.scrollIntoView({ behavior: 'auto' });
      }
    };

    // First pass once the initial paint has happened.
    const raf = window.requestAnimationFrame(() => window.requestAnimationFrame(jump));

    // Re-apply after the layout stops moving: the scroll journey pulls in large
    // images that change the document height under us.
    const timers = [250, 800, 1600].map((delay) => window.setTimeout(jump, delay));
    window.addEventListener('load', jump);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener('load', jump);
    };
  }, []);

  return null;
}
