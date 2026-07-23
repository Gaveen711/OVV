import { useState, useEffect } from 'react';
import { Anchor, Waves, Calendar, Menu, X, PhoneCall } from 'lucide-react';

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08111e]/85 backdrop-blur-md border-b border-amber-400/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/70 to-transparent py-5'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        {/* Brand Logo */}
        <a
          href='#'
          className='flex items-center gap-3 group'
        >
          <div className='w-10 h-10 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-400/10 group-hover:bg-amber-400/20 transition-all'>
            <Waves className='w-5 h-5 text-amber-300' />
          </div>
          <div className='flex flex-col'>
            <span className='font-serif text-xl tracking-[0.25em] font-bold text-white uppercase group-hover:text-amber-200 transition-colors'>
              OCEAN VIEW
            </span>
            <span className='text-[10px] tracking-[0.4em] text-amber-400 uppercase -mt-1 font-light'>
              VILLA & RESORT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className='hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-medium uppercase text-slate-300'>
          <button
            onClick={() => scrollToSection('overview')}
            className='hover:text-amber-300 transition-colors cursor-pointer'
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('villas')}
            className='hover:text-amber-300 transition-colors cursor-pointer'
          >
            Villas & Suites
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            className='hover:text-amber-300 transition-colors cursor-pointer'
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='hover:text-amber-300 transition-colors cursor-pointer'
          >
            Inquire
          </button>
        </nav>

        {/* CTA Button */}
        <div className='hidden md:flex items-center gap-4'>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer'
          >
            <Calendar className='w-4 h-4' />
            <span>Book Inquiry</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden text-slate-200 hover:text-amber-300 focus:outline-none'
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X className='w-7 h-7' /> : <Menu className='w-7 h-7' />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-[#08111e]/95 backdrop-blur-xl border-b border-amber-400/20 py-6 px-8 flex flex-col gap-5 shadow-2xl'>
          <button
            onClick={() => scrollToSection('overview')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-200 hover:text-amber-300 py-2 border-b border-slate-800'
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('villas')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-200 hover:text-amber-300 py-2 border-b border-slate-800'
          >
            Villas & Suites
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-200 hover:text-amber-300 py-2 border-b border-slate-800'
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='text-left text-sm tracking-[0.2em] font-medium uppercase text-slate-200 hover:text-amber-300 py-2 border-b border-slate-800'
          >
            Inquire
          </button>
          <button
            onClick={() => scrollToSection('inquiry')}
            className='mt-2 w-full py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase text-center'
          >
            Reserve Your Sanctuary
          </button>
        </div>
      )}
    </header>
  );
}
