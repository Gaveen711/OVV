import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Minimal floating back-to-top control. Scrolls home through Lenis so the
 * hero stays expanded — scrolling up once more from the top collapses it as
 * usual. Hidden state uses `invisible` so the button leaves the tab order.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='Back to top'
      className={`fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:right-[calc(2rem+env(safe-area-inset-right))] z-40 w-10 h-10 rounded-full border border-white/25 bg-slate-950/40 text-stone-100 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-amber-400/70 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-400 ${
        visible
          ? 'visible opacity-100 translate-y-0'
          : 'invisible opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className='w-4 h-4' aria-hidden='true' />
    </button>
  );
}
