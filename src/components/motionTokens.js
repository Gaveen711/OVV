/**
 * Shared motion vocabulary. Kept out of Reveal.jsx so that file only exports
 * components and stays eligible for React Fast Refresh.
 */

/* Entrance curve used across the whole site. A long tail with almost no
   overshoot - things arrive and settle rather than bouncing. */
export const EASE_OUT = [0.16, 1, 0.3, 1];

/* Curve for interaction feedback (hover, press). Shorter and flatter than the
   entrance curve so it reads as responsive rather than animated. */
export const EASE_UI = [0.32, 0.72, 0, 1];

/* Trigger once a quarter of the element is on screen.
   Deliberately NOT a negative bottom root-margin. That shrinks the detection
   box up from the bottom of the viewport, which permanently strands anything
   that only ever occupies that band - the last element on the page cannot be
   scrolled any higher, so it never intersects and stays at opacity 0 forever.
   The footer copyright line hit exactly that. An `amount` threshold has no
   such dead zone: anything fully visible satisfies it. */
export const VIEWPORT = { once: true, amount: 0.25 };

/* Child variant for RevealGroup members. */
export const revealChild = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};
