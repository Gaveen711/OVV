import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import HashScroll from './components/HashScroll';
import HeroSection from './components/HeroSection';
import VillaScrollJourney from './components/VillaScrollJourney';
import RegisterInterest from './components/RegisterInterest';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='min-h-screen bg-[#FAF8F5] text-slate-800 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900'>
      {/* Site-wide inertial smooth scrolling */}
      <SmoothScroll />

      {/* Lands on #register when arriving from a villa detail page */}
      <HashScroll />

      {/* Top Glass Navbar */}
      <Navbar />

      {/* Minimal floating back-to-top control */}
      <ScrollToTop />

      {/* Hero Section - looping film over the still it falls back to */}
      <HeroSection posterSrc='/images/resort-hero-bg.webp' />

      {/* Experiences section (Master plan map) + Villas Gallery + Private Inquiry */}
      <VillaScrollJourney />

      {/* Register Interest Form Section */}
      <RegisterInterest />

      {/* Site Footer */}
      <Footer />

      <Analytics />
    </div>
  );
}
