import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import HashScroll from './components/HashScroll';
import HeroSection from './components/HeroSection';
import VillaScrollJourney from './components/VillaScrollJourney';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='min-h-screen bg-[#FAF8F5] text-black font-sans antialiased'>
      {/* Site-wide inertial smooth scrolling */}
      <SmoothScroll />

      {/* Lands on a home section when arriving from another page */}
      <HashScroll />

      {/* Top Glass Navbar */}
      <Navbar />

      {/* Minimal floating back-to-top control */}
      <ScrollToTop />

      {/* Hero Section - the looping film, full bleed */}
      <HeroSection />

      {/* Villas gallery and private inquiry */}
      <VillaScrollJourney />

      {/* Site Footer */}
      <Footer />

      <Analytics />
    </div>
  );
}
