import { useState, useEffect } from 'react';
import { Waves, Menu, X } from 'lucide-react';
import CtaButton from './CtaButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent('expand-and-scroll', { detail: { id } })
    );
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent('expand-and-scroll', { detail: { scrollToTop: true } })
    );
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
        {/* Brand Logo */}
        <a
          href='#'
          onClick={scrollToTop}
          className='flex items-center gap-3.5 group'
        >
          <div className='w-11 h-11 rounded-full border border-amber-600/40 flex items-center justify-center bg-amber-500/10 group-hover:bg-amber-500/20 transition-all shadow-sm'>
            <Waves className={`w-5 h-5 transition-colors ${scrolled ? 'text-amber-700' : 'text-amber-300'}`} />
          </div>
          <div className='flex flex-col justify-center'>
            <span
              className={`font-serif text-2xl md:text-3xl tracking-[0.2em] font-bold uppercase transition-colors leading-tight ${
                scrolled ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-200 drop-shadow-md'
              }`}
            >
              OCEAN VIEW
            </span>
            <span
              className={`text-[11px] tracking-[0.35em] uppercase font-semibold transition-colors ${
                scrolled ? 'text-amber-700' : 'text-amber-300 drop-shadow'
              }`}
            >
              VILLA & RESORT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links — compact refined sizing */}
        <nav className='hidden md:flex items-center gap-7 lg:gap-9'>
          <CtaButton
            label='Villas & Suites'
            onClick={() => scrollToSection('villas')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              scrolled ? 'text-slate-800 hover:text-amber-700' : 'text-white hover:text-amber-300 drop-shadow-md'
            }`}
          />
          <CtaButton
            label='Experiences'
            onClick={() => scrollToSection('amenities')}
            showArrow={false}
            className={`cta-compact font-medium transition-colors ${
              scrolled ? 'text-slate-800 hover:text-amber-700' : 'text-white hover:text-amber-300 drop-shadow-md'
            }`}
          />
          {/* Refined outline CTA Pill for Register Interest */}
          <button
            onClick={() => scrollToSection('inquiry')}
            className={`group px-5 py-2 rounded-full border text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5]/98 backdrop-blur-2xl py-8 px-8 flex flex-col gap-5 shadow-2xl border-t border-stone-200/80 animate-in fade-in slide-in-from-top-4 duration-300'>
          <CtaButton
            label='Villas & Suites'
            onClick={() => scrollToSection('villas')}
            showArrow={false}
            className='text-base font-semibold text-slate-800 hover:text-amber-700 py-1.5'
          />
          <CtaButton
            label='Experiences'
            onClick={() => scrollToSection('amenities')}
            showArrow={false}
            className='text-base font-semibold text-slate-800 hover:text-amber-700 py-1.5'
          />
          <button
            onClick={() => scrollToSection('inquiry')}
            className='w-full py-3 px-6 rounded-full border border-slate-900/70 text-slate-900 font-semibold text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 mt-2 transition-colors hover:bg-slate-900 hover:text-amber-300'
          >
            <span>Register Interest</span>
            <svg className='w-3.5 h-2.5 fill-current' viewBox='0 0 46 16'>
              <path d='M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z' transform='translate(30)' />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
