import { Reveal, RevealText } from './Reveal';
import './AboutVillas.css';

export default function AboutVillas() {
  return (
    <section
      id='about'
      className='about-villas'
      aria-labelledby='about-villas-title'
    >
      <div className='about-villas__layout'>
        <Reveal as='p' className='about-villas__label' y={16} duration={0.7}>
          About Ocean View Villas
        </Reveal>

        <RevealText
          id='about-villas-title'
          className='about-villas__heading'
          delay={0.08}
        >
          Six homes, one uninterrupted horizon.
        </RevealText>

        <div className='about-villas__copy'>
          <Reveal as='p' delay={0.16}>
            Ocean View Villas is a private collection of just six beachfront
            residences in Uswetakeiyawa, bringing together the privacy of a
            home and the ease of life beside the Indian Ocean.
          </Reveal>
          <Reveal as='p' delay={0.26}>
            Across 5,500 square feet, every villa unfolds over three generous
            levels with four en-suite bedrooms, open living spaces, a private
            plunge pool, garden, balcony, and secure parking.
          </Reveal>
        </div>

        <Reveal
          as='p'
          className='about-villas__location'
          delay={0.12}
          y={14}
          duration={0.7}
        >
          Uswetakeiyawa
          <span aria-hidden='true' />
          Sri Lanka
        </Reveal>
      </div>
    </section>
  );
}
