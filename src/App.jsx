import { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollExpandMedia from './components/ScrollExpandMedia';
import OverviewSection from './components/OverviewSection';
import VillasSection from './components/VillasSection';
import AmenitiesBento from './components/AmenitiesBento';
import HubSpotInquiryForm from './components/HubSpotInquiryForm';
import Footer from './components/Footer';

export default function App() {
  const [selectedVilla, setSelectedVilla] = useState('Presidential Ocean Villa');

  const handleSelectVilla = (villaName) => {
    setSelectedVilla(villaName);
    window.dispatchEvent(
      new CustomEvent('expand-and-scroll', { detail: { id: 'inquiry' } })
    );
  };

  return (
    <div className='min-h-screen bg-[#060b13] text-slate-100 font-sans antialiased selection:bg-amber-400/30 selection:text-amber-200'>
      {/* Top Glass Navbar */}
      <Navbar />

      {/* Hero Section with ScrollExpandMedia component */}
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='https://player.vimeo.com/external/535823482.hd.mp4?s=8be972960ed9307e5e485ce43b8a0c670c7473c9&profile_id=175'
        posterSrc='https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80'
        bgImageSrc='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
        title='OCEAN VIEW'
        date='EST. 2026 • LUXURY RESORT'
        scrollToExpand='SCROLL DOWN TO EXPAND VILLA'
        textBlend={true}
      >
        {/* Main Website Sections */}
        <OverviewSection />
        <VillasSection onSelectVilla={handleSelectVilla} />
        <AmenitiesBento />
        <HubSpotInquiryForm selectedVilla={selectedVilla} />
      </ScrollExpandMedia>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
