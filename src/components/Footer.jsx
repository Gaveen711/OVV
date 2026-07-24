import { Waves, Phone, Mail, MapPin, Globe, Share2, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-[#F0ECE4] text-slate-700 border-t border-stone-300/60 pt-20 pb-12 relative'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
        {/* Brand Col */}
        <div className='md:col-span-2 flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-full border border-amber-700/40 flex items-center justify-center bg-amber-600/10'>
              <Waves className='w-4 h-4 text-amber-700' />
            </div>
            <span className='font-serif text-2xl tracking-[0.25em] font-bold text-slate-900 uppercase'>
              OCEAN VIEW VILLA
            </span>
          </div>
          <p className='text-xs leading-relaxed text-slate-600 max-w-sm font-light mt-2'>
            A timeless beachfront estate offering hyper-personalized sanctuary residences, private coral reef access, and luxury butler services.
          </p>
          <div className='flex items-center gap-4 mt-2'>
            <a href='#' aria-label='Global Website' className='w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center text-slate-700 hover:text-amber-700 hover:border-amber-600 transition-colors shadow-sm'>
              <Globe className='w-4 h-4' />
            </a>
            <a href='#' aria-label='Social Share' className='w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center text-slate-700 hover:text-amber-700 hover:border-amber-600 transition-colors shadow-sm'>
              <Share2 className='w-4 h-4' />
            </a>
            <a href='#' aria-label='Resort Location' className='w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center text-slate-700 hover:text-amber-700 hover:border-amber-600 transition-colors shadow-sm'>
              <Compass className='w-4 h-4' />
            </a>
          </div>
        </div>

        {/* Links Col */}
        <div>
          <h4 className='text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-4'>Explore</h4>
          <ul className='flex flex-col gap-2.5 text-xs font-light'>
            <li><a href='#villas' className='hover:text-amber-700 transition-colors'>Presidential Villa</a></li>
            <li><a href='#villas' className='hover:text-amber-700 transition-colors'>Sunset Penthouse</a></li>
            <li><a href='#amenities' className='hover:text-amber-700 transition-colors'>Private Yacht Charters</a></li>
            <li><a href='#inquiry' className='hover:text-amber-700 transition-colors'>HubSpot Reservations</a></li>
          </ul>
        </div>

        {/* Contact Col */}
        <div>
          <h4 className='text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-4'>Concierge</h4>
          <ul className='flex flex-col gap-3 text-xs font-light'>
            <li className='flex items-center gap-2.5'>
              <MapPin className='w-4 h-4 text-amber-700 shrink-0' />
              <span>100 Ocean Drive, Coastal Sanctuary</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <Phone className='w-4 h-4 text-amber-700 shrink-0' />
              <span>+1 (800) 928-3488</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <Mail className='w-4 h-4 text-amber-700 shrink-0' />
              <span>concierge@oceanviewvilla.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 border-t border-stone-300/80 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 font-light gap-4'>
        <p>© 2026 Ocean View Villa (OVV). All Rights Reserved.</p>
      </div>
    </footer>
  );
}
