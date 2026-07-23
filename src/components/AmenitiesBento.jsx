import { Anchor, Wine, Sparkles } from 'lucide-react';

export default function AmenitiesBento() {
  return (
    <section id='amenities' className='py-20 md:py-32 bg-[#FAF8F5] text-slate-800 relative'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='flex flex-col items-center text-center mb-16'>
          <span className='text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold mb-2'>Curated Lifestyle</span>
          <h2 className='font-serif text-3xl md:text-5xl text-slate-900 font-normal'>
            Unrivaled Resort <span className='gold-gradient-text italic'>Experiences</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Card 1: Private Yacht Charter (Large 2 cols) */}
          <div className='md:col-span-2 relative group rounded-3xl overflow-hidden glass-panel p-8 min-h-[320px] flex flex-col justify-between border border-stone-200/80 shadow-md hover:shadow-xl transition-all bg-white'>
            <img
              src='https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1000&q=80'
              alt='Private Yacht'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-20'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent' />
            <div className='relative z-10 w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700'>
              <Anchor className='w-5 h-5' />
            </div>
            <div className='relative z-10 mt-16'>
              <span className='text-[10px] tracking-[0.3em] text-amber-700 uppercase font-semibold'>Ocean Excursions</span>
              <h3 className='font-serif text-2xl text-slate-900 mt-1'>Private Catamaran & Yacht Charters</h3>
              <p className='text-slate-600 text-xs mt-2 font-light max-w-md'>
                Explore secluded island coves, private sunset champagne cruises, and deep-sea diving led by private marine guides.
              </p>
            </div>
          </div>

          {/* Card 2: Oceanfront Spa */}
          <div className='relative group rounded-3xl overflow-hidden glass-panel p-8 min-h-[320px] flex flex-col justify-between border border-stone-200/80 shadow-md hover:shadow-xl transition-all bg-white'>
            <img
              src='https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
              alt='Wellness Spa'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-20'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent' />
            <div className='relative z-10 w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700'>
              <Sparkles className='w-5 h-5' />
            </div>
            <div className='relative z-10 mt-12'>
              <span className='text-[10px] tracking-[0.3em] text-amber-700 uppercase font-semibold'>Holistic Wellness</span>
              <h3 className='font-serif text-2xl text-slate-900 mt-1'>Holistic Ocean Spa</h3>
              <p className='text-slate-600 text-xs mt-2 font-light'>
                Open-air cliffside massage pavilions offering signature botanical treatments and sunrise sound baths.
              </p>
            </div>
          </div>

          {/* Card 3: Wine Cellar & Sommelier */}
          <div className='relative group rounded-3xl overflow-hidden glass-panel p-8 min-h-[320px] flex flex-col justify-between border border-stone-200/80 shadow-md hover:shadow-xl transition-all bg-white'>
            <img
              src='https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
              alt='Private Sommelier'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-20'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent' />
            <div className='relative z-10 w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700'>
              <Wine className='w-5 h-5' />
            </div>
            <div className='relative z-10 mt-12'>
              <span className='text-[10px] tracking-[0.3em] text-amber-700 uppercase font-semibold'>Epicurean</span>
              <h3 className='font-serif text-2xl text-slate-900 mt-1'>Vintage Sommelier Reserve</h3>
              <p className='text-slate-600 text-xs mt-2 font-light'>
                Rare vintage pairings curated by master sommeliers for private beachfront dinners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
