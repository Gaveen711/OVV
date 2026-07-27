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
          desktop: { webm: '/videos/hero-1080.webm', mp4: '/videos/hero-1080.mp4' },
          mobile: { webm: '/videos/hero-720.webm', mp4: '/videos/hero-720.mp4' },
        }}
        posterSrc='/images/hero-poster.jpg'
        bgImageSrc='/images/resort-hero-bg.jpg'
        title='OCEAN VIEW'
        scrollToExpand=''
        textBlend={true}
      >
        {/* Main Website Sections */}
        <AboutVillas />
        <VillaScrollJourney />
        <RegisterInterest />
        <Footer />
      </ScrollExpandMedia>
    </div>
  );
}
