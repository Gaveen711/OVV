import { useState, useEffect } from 'react';
import { Waves, Menu, X } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-900/10 py-3.5 shadow-sm'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        {/* Brand Logo */}
        <a
          href='#'
          onClick={scrollToTop}
          className='flex items-center gap-3 group'
        >
          <div className='w-10 h-10 rounded-full border border-amber-600/40 flex items-center justify-center bg-amber-500/10 group-hover:bg-amber-500/20 transition-all'>
            <Waves className={`w-5 h-5 ${scrolled ? 'text-amber-700' : 'text-amber-300'}`} />
          </div>
          <div className='flex flex-col'>
            <span
              className={`font-serif text-xl tracking-[0.25em] font-bold uppercase transition-colors ${
                scrolled ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-200'
              }`}
            >
              OCEAN VIEW
            </span>
            <span
              className={`text-[10px] tracking-[0.4em] uppercase -mt-1 font-semibold ${
                scrolled ? 'text-amber-700' : 'text-amber-300'
              }`}
            >
              VILLA & RESORT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className={`hidden md:flex items-center gap-10 text-xs tracking-[0.2em] font-medium uppercase ${
            scrolled ? 'text-slate-700' : 'text-slate-200'
          }`}
        >
          <button
            onClick={() => scrollToSection('villas')}
            className='hover:text-amber-700 transition-colors cursor-pointer py-1'
          >
            Villas & Suites
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            className='hover:text-amber-700 transition-colors cursor-pointer py-1'
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='hover:text-amber-700 transition-colors cursor-pointer py-1'
          >
            Inquire
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden focus:outline-none ${
            scrolled ? 'text-slate-900 hover:text-amber-700' : 'text-slate-100 hover:text-amber-300'
          }`}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X className='w-7 h-7' /> : <Menu className='w-7 h-7' />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-stone-200 py-6 px-8 flex flex-col gap-5 shadow-xl'>
          <button
            onClick={() => scrollToSection('villas')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-800 hover:text-amber-700 py-2 border-b border-stone-200'
          >
            Villas & Suites
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-800 hover:text-amber-700 py-2 border-b border-stone-200'
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-800 hover:text-amber-700 py-2 border-b border-stone-200'
          >
            Inquire
          </button>
        </div>
      )}
    </header>
  );
}
