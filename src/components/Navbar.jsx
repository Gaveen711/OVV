import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CtaButton from './CtaButton';
import { EASE_UI } from './motionTokens';
import BrandLogo from './BrandLogo';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollUpVisibility from '../hooks/useScrollUpVisibility';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollVisible = useScrollUpVisibility();

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.querySelector('.contact-hero, #root section');
      setOverHero(Boolean(hero && hero.getBoundingClientRect().bottom > 88));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openContact = () => {
    setMobileMenuOpen(false);
    if (pathname === '/contact') {
      const form = document.getElementById('register');
      if (form) {
        if (window.__lenis) window.__lenis.scrollTo(form);
        else form.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    navigate('/contact');
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      navigate('/');
      return;
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      aria-hidden={!scrollVisible && !mobileMenuOpen}
      inert={!scrollVisible && !mobileMenuOpen}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        !scrollVisible && !mobileMenuOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        scrolled ? 'py-4' : 'py-6'
      } ${
        overHero
          ? 'bg-transparent backdrop-blur-none border-transparent'
          : 'bg-[#FAF8F5]/65 backdrop-blur-lg border-stone-200/40'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between'>
        {/* Official Brand Logo */}
        <a
          href='#'
          onClick={scrollToTop}
          className='group flex items-center transition-transform duration-300 hover:scale-[1.02]'
          aria-label='Ocean View Villas'
        >
          <BrandLogo
            theme={overHero ? 'dark' : 'light'}
            variant='full'
            markClassName='h-7 md:h-8 w-auto'
            textClassName={overHero ? 'text-white drop-shadow-md' : 'text-black'}
          />
        </a>

        {/* Desktop Nav Links — compact refined sizing */}
        <nav className='hidden md:flex items-center gap-7 lg:gap-9'>
          <CtaButton
            label='Overview'
            onClick={() => scrollToSection('amenities')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              !overHero ? 'text-black hover:text-[#023E8A]' : 'text-white hover:text-[#DFC184] drop-shadow-md'
            }`}
          />
          <CtaButton
            label='Villas'
            onClick={() => scrollToSection('villa-collection')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              !overHero ? 'text-black hover:text-[#023E8A]' : 'text-white hover:text-[#DFC184] drop-shadow-md'
            }`}
          />
          <CtaButton
            label='Gallery'
            onClick={() => scrollToSection('villas')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              !overHero ? 'text-black hover:text-[#023E8A]' : 'text-white hover:text-[#DFC184] drop-shadow-md'
            }`}
          />
          <CtaButton
            label='Experiences'
            onClick={() => scrollToSection('experiences')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              !overHero ? 'text-black hover:text-[#023E8A]' : 'text-white hover:text-[#DFC184] drop-shadow-md'
            }`}
          />
          {/* Contact page CTA */}
          <button
            onClick={openContact}
            className={`group px-5 py-2 rounded-full border text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
              !overHero
                ? 'border-[#023E8A] text-[#023E8A] hover:bg-[#023E8A] hover:text-[#CAF0F8]'
                : 'border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-[#023E8A] hover:border-[#023E8A] hover:text-[#DFC184] shadow-lg shadow-black/10'
            }`}
          >
            <span>Contact Us</span>
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
            !overHero ? 'text-black hover:text-[#023E8A]' : 'text-white hover:text-[#DFC184]'
          }`}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
        </button>
      </div>

      {/* Reading progress appears once the hero has scrolled past. */}
      <motion.div
        aria-hidden='true'
        className='absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-[#023E8A] via-[#0096C7] to-[#DFC184]'
        style={{ scaleX: progress, opacity: overHero ? 0 : 1 }}
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
              className='text-base font-semibold text-black hover:text-[#023E8A] py-1.5'
            />
            <CtaButton
              label='Villas'
              onClick={() => scrollToSection('villa-collection')}
              showArrow={false}
              className='text-base font-semibold text-black hover:text-[#023E8A] py-1.5'
            />
            <CtaButton
              label='Gallery'
              onClick={() => scrollToSection('villas')}
              showArrow={false}
              className='text-base font-semibold text-black hover:text-[#023E8A] py-1.5'
            />
            <CtaButton
              label='Experiences'
              onClick={() => scrollToSection('experiences')}
              showArrow={false}
              className='text-base font-semibold text-black hover:text-[#023E8A] py-1.5'
            />
            <button
              onClick={openContact}
              className='w-full py-3 px-6 rounded-full border border-[#023E8A] text-[#023E8A] font-semibold text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 mt-2 transition-all duration-300 hover:bg-[#023E8A] hover:text-[#CAF0F8] active:scale-[0.98]'
            >
              <span>Contact Us</span>
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
