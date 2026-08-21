import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  Car,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Maximize2,
  Ruler,
  X,
} from 'lucide-react';
import BrandWordmark from '../components/BrandWordmark';
import Footer from '../components/Footer';
import { getVilla, villas } from '../data/villas';
import './VillaDetail.css';

const numberFormat = new Intl.NumberFormat('en-US');

export default function VillaDetail() {
  const { slug } = useParams();
  const villa = getVilla(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setActiveImage(0);
    setActivePlan(0);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    if (villa) document.title = `${villa.name} | Ocean View Villas`;
  }, [villa]);

  if (!villa) {
    return (
      <div className='villa-detail villa-detail--missing'>
        <h1>Residence not found</h1>
        <p>We could not find a villa at this address.</p>
        <Link to='/'>Back to Ocean View Villas</Link>
      </div>
    );
  }

  const gallery = villa.gallery;
  const step = (delta) =>
    setActiveImage((current) => (current + delta + gallery.length) % gallery.length);

  const plan = villa.plans[activePlan];

  return (
    <div className='villa-detail'>
      <header className='villa-detail__bar'>
        <Link to='/' className='villa-detail__brand'>
          <BrandWordmark accentClassName='villa-detail__brand-accent' />
        </Link>
        <a href='/#villa-collection' className='villa-detail__back'>
          <ArrowLeft aria-hidden='true' />
          All residences
        </a>
      </header>

      <main className='villa-detail__shell'>
        <nav className='villa-detail__crumbs' aria-label='Breadcrumb'>
          <a href='/#villa-collection'>Ocean View Villas</a>
          <span aria-hidden='true'>/</span>
          <span>{villa.category}</span>
          <span aria-hidden='true'>/</span>
          <span aria-current='page'>{villa.name}</span>
        </nav>

        <div className='villa-detail__heading'>
          <div>
            <h1>{villa.name}</h1>
            <p className='villa-detail__location'>
              <MapPin aria-hidden='true' />
              {villa.location}
            </p>
          </div>
          <p className='villa-detail__tagline'>{villa.tagline}</p>
        </div>

        <section className='villa-detail__gallery' aria-label={`${villa.name} photographs`}>
          <div className='villa-detail__hero'>
            <img
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
              width='1600'
              height='1000'
              decoding='async'
            />
            <button
              type='button'
              className='villa-detail__nav villa-detail__nav--prev'
              onClick={() => step(-1)}
              aria-label='Previous image'
            >
              <ChevronLeft aria-hidden='true' />
            </button>
            <button
              type='button'
              className='villa-detail__nav villa-detail__nav--next'
              onClick={() => step(1)}
              aria-label='Next image'
            >
              <ChevronRight aria-hidden='true' />
            </button>
            <button
              type='button'
              className='villa-detail__expand'
              onClick={() => setLightbox(gallery[activeImage])}
            >
              <Maximize2 aria-hidden='true' />
              View full size
            </button>
            <p className='villa-detail__counter'>
              {activeImage + 1} / {gallery.length}
            </p>
          </div>

          <div className='villa-detail__mosaic'>
            {gallery.slice(1, 5).map((image, index) => (
              <button
                type='button'
                key={image.src + index}
                className='villa-detail__tile'
                onClick={() => setActiveImage(index + 1)}
                aria-label={`Show image ${index + 2}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width='800'
                  height='600'
                  loading='lazy'
                  decoding='async'
                />
              </button>
            ))}
          </div>
        </section>

        <div className='villa-detail__thumbs'>
          {gallery.map((image, index) => (
            <button
              type='button'
              key={image.src + index}
              className={`villa-detail__thumb${index === activeImage ? ' is-active' : ''}`}
              onClick={() => setActiveImage(index)}
              aria-label={image.alt}
              aria-current={index === activeImage}
            >
              <img src={image.src} alt='' width='160' height='120' loading='lazy' decoding='async' />
            </button>
          ))}
        </div>

        <div className='villa-detail__columns'>
          <div className='villa-detail__main'>
            <ul className='villa-detail__specs'>
              <li>
                <BedDouble aria-hidden='true' />
                <strong>{villa.bedrooms}</strong> Bedrooms
              </li>
              <li>
                <Bath aria-hidden='true' />
                <strong>{villa.bathrooms}</strong> Bathrooms
              </li>
              <li>
                <Ruler aria-hidden='true' />
                <strong>{numberFormat.format(villa.sizeSqft)}</strong> Sq. ft.
              </li>
              <li>
                <Layers aria-hidden='true' />
                <strong>{villa.floors}</strong> Floors
              </li>
              <li>
                <Car aria-hidden='true' />
                <strong>{villa.parking}</strong> Parking
              </li>
            </ul>

            <section className='villa-detail__block'>
              <h2>About this property</h2>
              <p>{villa.summary}</p>
              <p>
                Ocean View Villas is a boutique beachfront development of just six private
                residences on a one-acre plot in the Colombo–Negombo corridor. Each villa spans
                three levels with four bedrooms, an expansive hall and dedicated staff quarters,
                served by private garage parking, an on-site security cabin and 24/7 CCTV across the
                estate.
              </p>
            </section>

            <section className='villa-detail__block'>
              <h2>What this place offers</h2>
              <ul className='villa-detail__chips'>
                {villa.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </section>

            <section className='villa-detail__block'>
              <h2>Floor plans</h2>
              <p className='villa-detail__block-note'>
                {villa.name} is built on the brochure Type {villa.planType} layout.
              </p>

              <div className='villa-detail__plan-tabs' role='tablist' aria-label='Floor plans'>
                {villa.plans.map((item, index) => (
                  <button
                    type='button'
                    role='tab'
                    key={item.name}
                    id={`plan-tab-${index}`}
                    aria-selected={index === activePlan}
                    aria-controls={`plan-panel-${index}`}
                    className={`villa-detail__plan-tab${index === activePlan ? ' is-active' : ''}`}
                    onClick={() => setActivePlan(index)}
                  >
                    <span>{item.name}</span>
                    <small>{numberFormat.format(item.sqft)} sq. ft.</small>
                  </button>
                ))}
              </div>

              <div
                className='villa-detail__plan'
                role='tabpanel'
                id={`plan-panel-${activePlan}`}
                aria-labelledby={`plan-tab-${activePlan}`}
              >
                <button
                  type='button'
                  className='villa-detail__plan-image'
                  onClick={() =>
                    setLightbox({
                      src: plan.image,
                      alt: `${villa.name} ${plan.name} floor plan`,
                    })
                  }
                  aria-label={`Enlarge ${plan.name} floor plan`}
                >
                  <img
                    src={plan.image}
                    alt={`${villa.name} ${plan.name} floor plan`}
                    width='2339'
                    height='1654'
                    loading='lazy'
                    decoding='async'
                  />
                  <span className='villa-detail__plan-zoom'>
                    <Maximize2 aria-hidden='true' />
                    Enlarge
                  </span>
                </button>

                <ul className='villa-detail__plan-features'>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className='villa-detail__block'>
              <h2>Details</h2>
              <dl className='villa-detail__table'>
                <div>
                  <dt>Category</dt>
                  <dd>{villa.category}</dd>
                </div>
                <div>
                  <dt>Listed by</dt>
                  <dd>{villa.listedBy}</dd>
                </div>
                <div>
                  <dt>USD price</dt>
                  <dd>USD {numberFormat.format(villa.priceUsd)}</dd>
                </div>
                <div>
                  <dt>LKR price</dt>
                  <dd>LKR {numberFormat.format(villa.priceLkr)}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{villa.location}</dd>
                </div>
                <div>
                  <dt>Plan type</dt>
                  <dd>Type {villa.planType}</dd>
                </div>
                <div>
                  <dt>Bedrooms</dt>
                  <dd>{villa.bedrooms}</dd>
                </div>
                <div>
                  <dt>Bathrooms</dt>
                  <dd>{villa.bathrooms}</dd>
                </div>
                <div>
                  <dt>Built-up area</dt>
                  <dd>{numberFormat.format(villa.sizeSqft)} sq. ft.</dd>
                </div>
                <div>
                  <dt>Floors</dt>
                  <dd>{villa.floors}</dd>
                </div>
                <div>
                  <dt>Parking</dt>
                  <dd>{villa.parking}</dd>
                </div>
                <div>
                  <dt>Architect</dt>
                  <dd>{villa.architect}</dd>
                </div>
                <div>
                  <dt>Developer</dt>
                  <dd>{villa.developer}</dd>
                </div>
                <div>
                  <dt>Contractor</dt>
                  <dd>{villa.contractor}</dd>
                </div>
              </dl>
            </section>
          </div>

          <aside className='villa-detail__aside'>
            <div className='villa-detail__price-card'>
              <p className='villa-detail__price'>USD {numberFormat.format(villa.priceUsd)}</p>
              <p className='villa-detail__price-alt'>
                LKR {numberFormat.format(villa.priceLkr)}
              </p>
              <a className='villa-detail__cta' href='/#register'>
                Enquire about this villa
                <ArrowUpRight aria-hidden='true' />
              </a>
              <p className='villa-detail__price-note'>
                Every residence in the collection is offered at the same price.
              </p>
            </div>

            <div className='villa-detail__help'>
              <h2>Need help with this listing?</h2>
              <a href='mailto:deepakjs@yahoo.com'>deepakjs@yahoo.com</a>
              <a href='tel:+94114335444'>+94 11 4 335 444</a>
            </div>

            <div className='villa-detail__others'>
              <h2>Other residences</h2>
              <ul>
                {villas
                  .filter((other) => other.slug !== villa.slug)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link to={`/villas/${other.slug}`}>
                        <img
                          src={other.gallery[0].src}
                          alt=''
                          width='120'
                          height='90'
                          loading='lazy'
                          decoding='async'
                        />
                        <span>
                          <strong>{other.name}</strong>
                          <small>{numberFormat.format(other.sizeSqft)} sq. ft.</small>
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {lightbox ? (
        <div
          className='villa-detail__lightbox'
          role='dialog'
          aria-modal='true'
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button type='button' className='villa-detail__lightbox-close' aria-label='Close'>
            <X aria-hidden='true' />
          </button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </div>
  );
}
