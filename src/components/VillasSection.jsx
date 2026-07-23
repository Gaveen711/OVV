import { useState } from 'react';
import { Bed, Bath, Maximize2, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VillasSection({ onSelectVilla }) {
  const [activeTab, setActiveTab] = useState(0);

  const villas = [
    {
      id: 'presidential-ocean-villa',
      name: 'Presidential Ocean Villa',
      tagline: 'The Ultimate Beachfront Masterpiece',
      price: '$1,850',
      period: 'per night',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      specs: { bedrooms: 4, bathrooms: 5, sqft: '6,400 sq ft', guests: 'Up to 8 Guests' },
      features: [
        'Private 20m Heated Infinity Pool',
        'Direct Oceanfront Beach Access',
        'Dedicated 24/7 Private Butler & Chef',
        'Outdoor Sunset Pavilion & Jacuzzi',
        'Sonos High-Fidelity Ocean Sound System',
      ],
      description:
        'Designed as the crown jewel of Ocean View Villa, this sprawling 4-bedroom estate commands breathtaking panoramic ocean views. Complete with a private infinity edge pool spilling directly into the horizon.',
    },
    {
      id: 'sunset-penthouse-suite',
      name: 'Sunset Penthouse Suite',
      tagline: 'Elevated Coastal Sanctuary',
      price: '$1,200',
      period: 'per night',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      specs: { bedrooms: 2, bathrooms: 3, sqft: '3,200 sq ft', guests: 'Up to 4 Guests' },
      features: [
        'Rooftop Lounge & Infinity Plunge Pool',
        '360-Degree Coastal Panorama',
        'In-Suite Wine Cellar & Bar',
        'Rainforest Outdoor Showers',
        'Daily Sunset Champagne Service',
      ],
      description:
        'Perched atop the highest point of the resort grounds, the Sunset Penthouse offers unmatched privacy, open-concept luxury interiors, and dramatic golden hour views over the ocean waves.',
    },
    {
      id: 'royal-beachfront-pavilion',
      name: 'Royal Beachfront Pavilion',
      tagline: 'Private Sand Dune Escape',
      price: '$950',
      period: 'per night',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      specs: { bedrooms: 1, bathrooms: 2, sqft: '2,100 sq ft', guests: 'Ideal for 2 Couples' },
      features: [
        'Private Tropical Courtyard Pool',
        'Steps Away From Coral Reef',
        'Private Spa Treatment Sala',
        'Espresso & Cocktail Bar',
        'Complimentary Yacht Charter Credit',
      ],
      description:
        'A romantic, open-air haven wrapped in lush tropical gardens and fine white coastal sands. Designed for guests seeking intimate tranquil luxury with world-class amenities.',
    },
  ];

  const activeVilla = villas[activeTab];

  return (
    <section id='villas' className='py-20 md:py-32 bg-[#FAF8F5] text-slate-800 relative'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-16'>
          <div>
            <span className='text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold'>Accommodations</span>
            <h2 className='font-serif text-3xl md:text-5xl text-slate-900 mt-2 font-normal'>
              Exclusive Villas & <span className='gold-gradient-text italic'>Suites</span>
            </h2>
          </div>
          <p className='text-slate-600 text-sm max-w-md mt-4 md:mt-0 font-light'>
            Each luxury residence is uniquely crafted with natural hardwood, local stone, and panoramic floor-to-ceiling glass doors opening onto private ocean vistas.
          </p>
        </div>

        {/* Villa Tabs */}
        <div className='flex flex-wrap gap-3 mb-12 border-b border-stone-200 pb-4'>
          {villas.map((villa, idx) => (
            <button
              key={villa.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white text-slate-600 border border-stone-200 hover:text-slate-900 hover:bg-stone-50'
              }`}
            >
              {villa.name}
            </button>
          ))}
        </div>

        {/* Active Villa Detail Showcase */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center glass-panel rounded-3xl p-6 md:p-10 border border-amber-900/10 shadow-lg bg-white/90'>
          {/* Villa Image */}
          <div className='lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-xl'>
            <img
              src={activeVilla.image}
              alt={activeVilla.name}
              className='w-full h-[350px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700'
            />
            <div className='absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold tracking-wider shadow-lg'>
              <span className='text-amber-300 text-sm font-bold'>{activeVilla.price}</span> / {activeVilla.period}
            </div>
          </div>

          {/* Villa Info */}
          <div className='lg:col-span-5 flex flex-col justify-between h-full'>
            <div>
              <span className='text-xs uppercase tracking-widest text-amber-700 font-semibold'>{activeVilla.tagline}</span>
              <h3 className='font-serif text-3xl md:text-4xl text-slate-900 mt-1 mb-4'>{activeVilla.name}</h3>
              <p className='text-slate-600 text-sm leading-relaxed font-light mb-6'>{activeVilla.description}</p>

              {/* Specs Grid */}
              <div className='grid grid-cols-2 gap-4 mb-6 py-4 border-y border-stone-200'>
                <div className='flex items-center gap-3 text-xs text-slate-700 font-medium'>
                  <Bed className='w-4 h-4 text-amber-700' />
                  <span>{activeVilla.specs.bedrooms} Bedrooms</span>
                </div>
                <div className='flex items-center gap-3 text-xs text-slate-700 font-medium'>
                  <Bath className='w-4 h-4 text-amber-700' />
                  <span>{activeVilla.specs.bathrooms} Bathrooms</span>
                </div>
                <div className='flex items-center gap-3 text-xs text-slate-700 font-medium'>
                  <Maximize2 className='w-4 h-4 text-amber-700' />
                  <span>{activeVilla.specs.sqft}</span>
                </div>
                <div className='flex items-center gap-3 text-xs text-slate-700 font-medium'>
                  <Users className='w-4 h-4 text-amber-700' />
                  <span>{activeVilla.specs.guests}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className='flex flex-col gap-2.5 mb-8'>
                {activeVilla.features.map((feature, fIdx) => (
                  <li key={fIdx} className='flex items-center gap-2.5 text-xs text-slate-700'>
                    <CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0' />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectVilla(activeVilla.name)}
              className='w-full py-4 rounded-2xl bg-slate-900 text-amber-300 font-semibold text-xs tracking-widest uppercase hover:bg-slate-800 shadow-lg flex items-center justify-center gap-3 transition-all cursor-pointer'
            >
              <span>Inquire For Booking</span>
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
