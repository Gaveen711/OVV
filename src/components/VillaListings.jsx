import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { villas } from '../data/villas';
import './VillaListings.css';

const numberFormat = new Intl.NumberFormat('en-US');

export default function VillaListings() {
  return (
    <section
      id='villa-collection'
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
          {villas.map((villa, index) => (
            <Reveal
              key={villa.slug}
              as='article'
              className='villa-listing-card'
              y={24}
              delay={0.08 + index * 0.07}
              duration={0.7}
            >
              <Link className='villa-listing-card__link' to={`/villas/${villa.slug}`}>
                <div className='villa-listing-card__media'>
                  <img
                    src={villa.gallery[0].src}
                    alt={villa.gallery[0].alt}
                    width='1600'
                    height='900'
                    loading='lazy'
                    decoding='async'
                  />
                  <img
                    className='villa-listing-card__detail'
                    src={villa.gallery[1].src}
                    alt={villa.gallery[1].alt}
                    width='800'
                    height='800'
                    loading='lazy'
                    decoding='async'
                  />
                </div>

                <div className='villa-listing-card__body'>
                  <p className='villa-listing-card__label'>Villa</p>
                  <h3>{villa.name}</h3>
                  <p className='villa-listing-card__price'>
                    USD {numberFormat.format(villa.priceUsd)}
                  </p>
                  <p className='villa-listing-card__meta'>
                    {villa.bedrooms} Bed &middot; {villa.bathrooms} Bath &middot;{' '}
                    {numberFormat.format(villa.sizeSqft)} sq. ft.
                  </p>
                  <p className='villa-listing-card__location'>
                    <MapPin aria-hidden='true' />
                    {villa.location}
                  </p>
                  <span className='villa-listing-card__action'>
                    View this villa
                    <ArrowUpRight aria-hidden='true' />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
