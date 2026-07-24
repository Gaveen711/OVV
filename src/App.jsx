import Navbar from './components/Navbar';
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

      {/* Hero Section with ScrollExpandMedia component */}
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='https://player.vimeo.com/external/535823482.hd.mp4?s=8be972960ed9307e5e485ce43b8a0c670c7473c9&profile_id=175'
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
