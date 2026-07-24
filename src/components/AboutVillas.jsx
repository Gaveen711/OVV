import './AboutVillas.css';

export default function AboutVillas() {
  return (
    <section
      id='about'
      className='about-villas'
      aria-labelledby='about-villas-title'
    >
      <div className='about-villas__layout'>
        <p className='about-villas__label'>About Ocean View Villas</p>

        <h2 id='about-villas-title'>
          Six homes, one uninterrupted horizon.
        </h2>

        <div className='about-villas__copy'>
          <p>
            Ocean View Villas is a private collection of just six beachfront
            residences in Uswetakeiyawa, bringing together the privacy of a
            home and the ease of life beside the Indian Ocean.
          </p>
          <p>
            Across 5,500 square feet, every villa unfolds over three generous
            levels with four en-suite bedrooms, open living spaces, a private
            plunge pool, garden, balcony, and secure parking.
          </p>
        </div>

        <p className='about-villas__location'>
          Uswetakeiyawa
          <span aria-hidden='true' />
          Sri Lanka
        </p>
      </div>
    </section>
  );
}
