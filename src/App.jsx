import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import ScrollExpandMedia from './components/ScrollExpandMedia';
import AboutVillas from './components/AboutVillas';
import VillaScrollJourney from './components/VillaScrollJourney';
import RegisterInterest from './components/RegisterInterest';
import Footer from './components/Footer';
import './components/VillaScrollStickyFix.css';

export default function App() {
  return (
    <div className='min-h-screen bg-[#FAF8F5] text-slate-800 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900'>
      {/* Site-wide inertial smooth scrolling */}
      <SmoothScroll />

      {/* Top Glass Navbar */}
      <Navbar />

      {/* Minimal floating back-to-top control */}
      <ScrollToTop />

      {/* Hero Section with ScrollExpandMedia component */}
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc={{
          desktop: { mp4: 'https://aer7yec0yxw9wovu.public.blob.vercel-storage.com/OVV%20final%20cut.mp4' },
          mobile:  { mp4: 'https://aer7yec0yxw9wovu.public.blob.vercel-storage.com/OVV%20final%20cut.mp4' },
        }}
        bgImageSrc='/images/resort-hero-bg.webp'
        title='OCEAN VIEW'
        titleAccent='VILLAS'
        scrollToExpand=''
        textBlend={true}
      >
        {/* Main Website Sections */}
        <AboutVillas />
        <VillaScrollJourney />
        <RegisterInterest />
        <Footer />
      </ScrollExpandMedia>
      <Analytics />
    </div>
  );
}
