import { useEffect } from 'react';
import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Site-wide inertial smooth scrolling via Lenis.
 *
 * The hero (ScrollExpandMedia) owns the wheel until the video is fully
 * expanded, so Lenis stays stopped until the hero broadcasts `hero-state`
 * with { expanded: true }, and stops again if the hero collapses.
 *
 * Lenis is driven from Framer Motion's frame loop rather than its own
 * requestAnimationFrame. Two independent rAF loops means the scroll position
 * lands in one frame and every `useScroll`-driven transform reacts in the
 * next - a one-frame lag that reads as the parallax lagging behind the page.
 * Sharing a loop puts both on the same tick.
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
      // carries momentum through an uninterrupted gesture.
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Touch is left entirely to the browser. iOS momentum scrolling is
      // tuned against the hardware and beats any JS approximation of it -
      // `syncTouch` would replace it with a rAF-driven imitation that drifts
      // under fast flicks. `useScroll` reads native scroll either way, so the
      // scroll-driven animations still track correctly on mobile.
      syncTouch: false,
      anchors: true,
    });
    window.__lenis = lenis;

    const update = (data) => lenis.raf(data.timestamp);
    frame.update(update, true);

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
      cancelFrame(update);
      window.removeEventListener('hero-state', onHeroState);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
