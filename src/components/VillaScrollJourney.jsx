import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowUpRight,
  BedDouble,
  CarFront,
  Expand,
  Waves,
} from 'lucide-react';
import LocationMap from './LocationMap';
import './VillaScrollJourney.css';

const villaImages = [
  {
    src: '/images/ovv/property-aerial.webp',
    alt: 'Aerial view of Ocean View Villas between the shoreline and Uswetakeiyawa',
    label: 'The shoreline from above',
  },
  {
    src: '/images/ovv/plunge-pool.webp',
    alt: 'Private plunge pool opening into a villa living space',
    label: 'Private plunge pool',
  },
  {
    src: '/images/ovv/open-living.webp',
    alt: 'Open-plan villa living and dining space beside the pool',
    label: 'Open-plan living',
  },
  {
    src: '/images/ovv/kitchen.webp',
    alt: 'Contemporary kitchen and dining area inside an Ocean View Villa',
    label: 'Kitchen & dining',
  },
  {
    src: '/images/ovv/ocean-suite.webp',
    alt: 'Ocean-facing bedroom with full-height glass doors',
    label: 'Ocean-facing suite',
  },
  {
    src: '/images/ovv/private-balcony.webp',
    alt: 'Private balcony overlooking palms and the Indian Ocean',
    label: 'Private balcony',
  },
  {
    src: '/images/ovv/family-room.webp',
    alt: 'Warm timber family room inside an Ocean View Villa',
    label: 'Family room',
  },
];

/* Original zoom parallax - the collage of seven perspectives zooms
   outward as the visitor scrolls through the sticky sequence. */
function ZoomParallax({ images }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const guideOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32],
    [1, 1, 0]
  );
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={containerRef} className='villa-parallax'>
      <div className='villa-parallax__sticky'>
        <motion.div
          className='villa-parallax__guide'
          style={{ opacity: guideOpacity }}
        >
          <p>Ocean View Villas / Seven perspectives</p>
          <span>Scroll to explore</span>
        </motion.div>

        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className={`villa-parallax__layer villa-parallax__layer--${index}`}
            style={{ scale: scales[index] }}
          >
            <figure className='villa-parallax__frame'>
              <img
                src={image.src}
                alt={image.alt}
                width='1600'
                height='900'
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding='async'
                draggable='false'
              />
            </figure>
          </motion.div>
        ))}

        <div className='villa-parallax__progress' aria-hidden='true'>
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
}

/* 3D vertical card stack - scrolling through the section flips the deck
   one villa image at a time, with dots and a counter for orientation. */
function getCardStyle(diff) {
  if (diff === 0) {
    return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
  } else if (diff === -1) {
    return { y: -190, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: 8 };
  } else if (diff === -2) {
    return { y: -330, scale: 0.7, opacity: 0.25, zIndex: 3, rotateX: 15 };
  } else if (diff === 1) {
    return { y: 190, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: -8 };
  } else if (diff === 2) {
    return { y: 330, scale: 0.7, opacity: 0.25, zIndex: 3, rotateX: -15 };
  }
  return {
    y: diff > 0 ? 460 : -460,
    scale: 0.6,
    opacity: 0,
    zIndex: 0,
    rotateX: diff > 0 ? -20 : 20,
  };
}

function VillaCardStack({ images }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(value * images.length))
    );
    setCurrentIndex(index);
  });

  const jumpTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = top + ((index + 0.5) / images.length) * scrollable;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className='villa-stack'
      style={{ height: `${images.length * 55 + 45}vh` }}
    >
      <div className='villa-stack__sticky'>
        <p className='villa-stack__guide'>The villa, room by room</p>

        <div className='villa-stack__deck'>
          {images.map((image, index) => {
            const diff = index - currentIndex;
            if (Math.abs(diff) > 2) return null;
            const style = getCardStyle(diff);
            const isCurrent = diff === 0;

            return (
              <motion.div
                key={image.src}
                className='villa-stack__card'
                animate={style}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
              >
                <div
                  className={`villa-stack__card-inner${
                    isCurrent ? ' villa-stack__card-inner--current' : ''
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width='1600'
                    height='900'
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding='async'
                    draggable='false'
                  />
                  <div
                    className='villa-stack__card-shade'
                    aria-hidden='true'
                  />
                  <p className='villa-stack__card-label'>{image.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className='villa-stack__counter' aria-hidden='true'>
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(images.length).padStart(2, '0')}</span>
        </div>

        <div className='villa-stack__dots'>
          {images.map((image, index) => (
            <button
              key={image.src}
              type='button'
              className={
                index === currentIndex ? 'villa-stack__dot--active' : undefined
              }
              onClick={() => jumpTo(index)}
              aria-label={`Go to ${image.label}`}
            />
          ))}
        </div>

        <motion.div
          className='villa-stack__hint'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          aria-hidden='true'
        >
          <motion.svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <path d='M12 5v14M5 12l7-7 7 7' />
          </motion.svg>
          <span>Scroll to browse</span>
          <motion.svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <path d='M12 5v14M19 12l-7 7-7-7' />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}

function StaticGallery({ images }) {
  return (
    <div className='villa-static'>
      <div className='villa-static__grid'>
        {images.map((image) => (
          <figure key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              width='1600'
              height='900'
              loading='lazy'
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function VillaScrollJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <main className='villa-experience'>
      <section
        id='villas'
        className='villa-gallery'
        aria-labelledby='villa-gallery-title'
      >
        <h2 id='villa-gallery-title' className='villa-gallery__title'>
          Seven views inside Ocean View Villas
        </h2>
        {reduceMotion ? (
          <StaticGallery images={villaImages} />
        ) : (
          <>
            <ZoomParallax images={villaImages} />
            <VillaCardStack images={villaImages} />
          </>
        )}
      </section>

      <section id='amenities' className='villa-proof'>
        <div className='villa-proof__plan'>
          <img
            src='/images/ovv/master-plan.webp'
            alt='Master plan showing the six Ocean View Villas on the beachfront site'
            loading='lazy'
            decoding='async'
          />
        </div>
        <div className='villa-proof__content'>
          <p className='villa-proof__lead'>Six keys. One coastline.</p>
          <h2>A beachfront collection made deliberately scarce.</h2>
          <p>
            Every residence combines private outdoor living with the scale and
            service spaces of a permanent home - positioned between Colombo and
            Negombo with the airport within easy reach.
          </p>
          <dl>
            <div>
              <BedDouble aria-hidden='true' />
              <dt>Bedrooms</dt>
              <dd>4 per villa</dd>
            </div>
            <div>
              <Expand aria-hidden='true' />
              <dt>Built area</dt>
              <dd>5,500 sq ft</dd>
            </div>
            <div>
              <Waves aria-hidden='true' />
              <dt>Outdoor living</dt>
              <dd>Pool + garden</dd>
            </div>
            <div>
              <CarFront aria-hidden='true' />
              <dt>Private parking</dt>
              <dd>2-car garage</dd>
            </div>
          </dl>
        </div>
      </section>

      <LocationMap />

      <section id='inquiry' className='villa-inquiry'>
        <p>Ocean View Villas / Uswetakeiyawa, Sri Lanka</p>
        <h2>Own one of six.</h2>
        <a href='#register'>
          Request the private presentation
          <ArrowUpRight aria-hidden='true' />
        </a>
        <span>+94 11 4 335 444</span>
      </section>
    </main>
  );
}
