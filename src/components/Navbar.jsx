import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CtaButton from './CtaButton';
import { EASE_UI } from './motionTokens';
import BrandWordmark from './BrandWordmark';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reading progress hairline. Spring-smoothed so it trails the scroll
  // fractionally instead of snapping frame to frame.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Passive: a non-passive scroll listener forces the browser to wait on JS
    // before it can commit the scroll, which shows up as stutter under Lenis.
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-none ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-4 shadow-sm border-b border-stone-200/50'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between'>
        {/* Brand wordmark - plain type, no mark. Natural casing rather than
            uppercase so the O/V/V initials read as the OVV monogram. */}
        <a
          href='#'
          onClick={scrollToTop}
          className={`group font-serif text-xl md:text-2xl tracking-[0.12em] transition-colors duration-300 ${
            scrolled ? 'text-slate-900' : 'text-white drop-shadow-md'
          }`}
        >
          <BrandWordmark
            accentClassName={`transition-colors duration-300 ${
              scrolled
                ? 'text-amber-700 group-hover:text-amber-600'
                : 'text-amber-300 group-hover:text-amber-200'
            }`}
          />
        </a>

        {/* Desktop Nav Links — compact refined sizing */}
        <nav className='hidden md:flex items-center gap-7 lg:gap-9'>
          <CtaButton
            label='Overview'
            onClick={() => scrollToSection('amenities')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              scrolled ? 'text-slate-800 hover:text-amber-700' : 'text-white hover:text-amber-300 drop-shadow-md'
            }`}
          />
          <CtaButton
            label='Villas'
            onClick={() => scrollToSection('villas')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              scrolled ? 'text-slate-800 hover:text-amber-700' : 'text-white hover:text-amber-300 drop-shadow-md'
            }`}
          />
          {/* Refined outline CTA Pill for Register Interest */}
          <button
            onClick={() => scrollToSection('inquiry')}
            className={`group px-5 py-2 rounded-full border text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
              scrolled
                ? 'border-slate-900/60 text-slate-900 hover:bg-slate-900 hover:border-slate-900 hover:text-amber-300'
                : 'border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-amber-600 hover:border-amber-600 shadow-lg shadow-black/10'
            }`}
          >
            <span>Register Interest</span>
            <svg
              className='w-3.5 h-2.5 fill-current transition-transform duration-300 group-hover:translate-x-1'
              viewBox='0 0 46 16'
            >
              <path d='M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z' transform='translate(30)' />
            </svg>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl focus:outline-none transition-colors ${
            scrolled ? 'text-slate-900 hover:text-amber-700' : 'text-white hover:text-amber-300'
          }`}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
        </button>
      </div>

      {/* Reading progress. Only once the nav has its solid background, so it
          never floats over the hero as a stray line. */}
      <motion.div
        aria-hidden='true'
        className='absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-amber-600/70 via-amber-500 to-amber-300/70'
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className='md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5]/98 backdrop-blur-2xl py-8 px-8 flex flex-col gap-5 shadow-2xl border-t border-stone-200/80 origin-top overflow-hidden'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: EASE_UI }}
          >
            <CtaButton
              label='Overview'
              onClick={() => scrollToSection('amenities')}
              showArrow={false}
              className='text-base font-semibold text-slate-800 hover:text-amber-700 py-1.5'
            />
            <CtaButton
              label='Villas'
              onClick={() => scrollToSection('villas')}
              showArrow={false}
              className='text-base font-semibold text-slate-800 hover:text-amber-700 py-1.5'
            />
            <button
              onClick={() => scrollToSection('inquiry')}
              className='w-full py-3 px-6 rounded-full border border-slate-900/70 text-slate-900 font-semibold text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 mt-2 transition-all duration-300 hover:bg-slate-900 hover:text-amber-300 active:scale-[0.98]'
            >
              <span>Register Interest</span>
              <svg className='w-3.5 h-2.5 fill-current' viewBox='0 0 46 16'>
                <path d='M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z' transform='translate(30)' />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
