import { Sun, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function OverviewSection() {
  const stats = [
    { label: 'Private Ocean Frontage', value: '350M' },
    { label: 'Luxury Suites & Villas', value: '18' },
    { label: 'Infinity Horizon Pool', value: '50M' },
    { label: 'Bespoke Butler Service', value: '24/7' },
  ];

  return (
    <section id='overview' className='py-20 md:py-32 relative text-slate-200'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header Badge */}
        <div className='flex flex-col items-center text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-amber-300 text-xs tracking-[0.3em] font-medium uppercase mb-4'>
            <Sparkles className='w-3.5 h-3.5' />
            <span>The Coastal Haven</span>
          </div>
          <h2 className='font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal max-w-3xl leading-tight'>
            Where Endless Ocean Meets <span className='gold-gradient-text italic font-light'>Unrivaled Elegance</span>
          </h2>
          <p className='mt-6 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed font-light'>
            Nestled along pristine turquoise coastlines, Ocean View Villa (OVV) presents an architecturally renowned sanctuary. Designed for seamless indoor-outdoor living with private infinity pools, secluded coral reefs, and tailored luxury hospitality.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24'>
          <div className='lg:col-span-7 relative group rounded-3xl overflow-hidden glass-panel p-2'>
            <img
              src='https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80'
              alt='Ocean View Villa Aerial'
              className='w-full h-[400px] md:h-[500px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#060b13] via-transparent to-transparent opacity-80' />
            <div className='absolute bottom-8 left-8 right-8 flex justify-between items-end'>
              <div>
                <span className='text-xs uppercase tracking-widest text-amber-300 font-semibold'>Exclusive Property</span>
                <h3 className='font-serif text-2xl md:text-3xl text-white mt-1'>The Horizon Pavilion</h3>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 flex flex-col gap-6'>
            <div className='glass-card p-8 rounded-3xl border border-amber-400/20 hover:border-amber-400/40 transition-all'>
              <div className='w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6'>
                <Sun className='w-6 h-6' />
              </div>
              <h4 className='font-serif text-2xl text-white mb-2'>Unobstructed Sunset Panoramas</h4>
              <p className='text-slate-400 text-xs md:text-sm leading-relaxed font-light'>
                Each suite is sculpted to capture uninterrupted 180-degree sunset ocean views, complete with expansive floor-to-ceiling glass doors and personal plunge pools.
              </p>
            </div>

            <div className='glass-card p-8 rounded-3xl border border-amber-400/20 hover:border-amber-400/40 transition-all'>
              <div className='w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6'>
                <UtensilsCrossed className='w-6 h-6' />
              </div>
              <h4 className='font-serif text-2xl text-white mb-2'>Private Culinary Artistry</h4>
              <p className='text-slate-400 text-xs md:text-sm leading-relaxed font-light'>
                Michelin-standard private chefs prepare bespoke multi-course seafood tasting menus right in your villa dining gallery or under the stars by the beach.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 glass-panel rounded-3xl p-8 border border-amber-400/20'>
          {stats.map((item, idx) => (
            <div key={idx} className='flex flex-col items-center text-center p-4 border-r last:border-r-0 border-slate-800/80'>
              <span className='font-serif text-4xl md:text-5xl font-bold gold-gradient-text mb-2'>
                {item.value}
              </span>
              <span className='text-xs md:text-sm text-slate-400 uppercase tracking-wider font-light'>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
