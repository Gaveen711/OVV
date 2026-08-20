import { ArrowUpRight, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import './VillaListings.css';

// Replace these temporary image pairs with the matching villa-type folders
// once their final structure is available.
const villaListings = [
  {
    type: 'Type 01',
    image: '/images/ovv/ocean-suite.webp',
    detailImage: '/images/ovv/suite-vaulted.webp',
    alt: 'Ocean-facing suite inside an Ocean View Villa',
    detailAlt: 'Vaulted bedroom detail inside an Ocean View Villa',
  },
  {
    type: 'Type 02',
    image: '/images/ovv/open-living.webp',
    detailImage: '/images/ovv/kitchen.webp',
    alt: 'Open-plan living room inside an Ocean View Villa',
    detailAlt: 'Kitchen and dining detail inside an Ocean View Villa',
  },
  {
    type: 'Type 03',
    image: '/images/ovv/plunge-pool.webp',
    detailImage: '/images/ovv/family-room.webp',
    alt: 'Private plunge pool opening into an Ocean View Villa',
    detailAlt: 'Poolside dining detail at an Ocean View Villa',
  },
  {
    type: 'Type 04',
    image: '/images/ovv/sea-kitchen.webp',
    detailImage: '/images/ovv/bath-stone.webp',
    alt: 'Kitchen looking through an Ocean View Villa to the sea',
    detailAlt: 'Stone-clad bathroom detail inside an Ocean View Villa',
  },
];

export default function VillaListings() {
  return (
    <section
      className='villa-listings'
      aria-labelledby='villa-listings-title'
    >
      <div className='villa-listings__shell'>
        <div className='villa-listings__intro'>
          <Reveal as='p' className='villa-listings__eyebrow' y={14} duration={0.6}>
            Available residences
          </Reveal>
          <Reveal as='h2' id='villa-listings-title' y={18} delay={0.06} duration={0.7}>
            Explore the villa collection.
          </Reveal>
          <Reveal as='p' className='villa-listings__copy' y={14} delay={0.12} duration={0.6}>
            Four considered layouts. One beachfront address. Every residence is offered at the same price.
          </Reveal>
        </div>

        <div className='villa-listings__grid'>
          {villaListings.map((villa, index) => (
            <Reveal
              key={villa.type}
              as='article'
              className='villa-listing-card'
              y={24}
              delay={0.08 + index * 0.07}
              duration={0.7}
            >
              <div className='villa-listing-card__media'>
                <img
                  src={villa.image}
                  alt={villa.alt}
                  width='1600'
                  height='900'
                  loading='lazy'
                  decoding='async'
                />
                <img
                  className='villa-listing-card__detail'
                  src={villa.detailImage}
                  alt={villa.detailAlt}
                  width='800'
                  height='800'
                  loading='lazy'
                  decoding='async'
                />
              </div>

              <div className='villa-listing-card__body'>
                <p className='villa-listing-card__label'>Villa</p>
                <h3>{villa.type}</h3>
                <p className='villa-listing-card__price'>USD 2,200,000</p>
                <p className='villa-listing-card__location'>
                  <MapPin aria-hidden='true' />
                  Uswetakeiyawa, Sri Lanka
                </p>
                <a href='#register'>
                  Enquire about this villa
                  <ArrowUpRight aria-hidden='true' />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
