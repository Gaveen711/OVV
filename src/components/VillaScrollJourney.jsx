import { motion } from 'framer-motion';
import { ArrowUpRight, BedDouble, Expand, Palmtree, Waves } from 'lucide-react';
import { Reveal, RevealGroup, RevealText } from './Reveal';
import { revealChild } from './motionTokens';
import AboutVillas from './AboutVillas';
import VillaListings from './VillaListings';
import CssImageStacking from './ui/css-image-stacking';
import './VillaScrollJourney.css';

/* The pool of villa photography available to this page. Nothing renders
   straight from here - `galleryImages` below picks which of these appear in
   the sticky scroll stack, so entries can sit here unused as a ready palette. */
const villaImages = [
  {
    src: '/images/ovv/property-aerial.webp',
    alt: 'Open-plan living and dining spaces of an Ocean View Villa seen from the staircase above',
    label: 'Living spaces from above',
  },
  {
    src: '/images/ovv/plunge-pool.webp',
    alt: 'Private plunge pool opening into a villa living space',
    label: 'Private plunge pool',
  },
  {
    src: '/images/ovv/open-living.webp',
    alt: 'Open-plan villa living room with lounge seating beside a sea-view window',
    label: 'Open-plan living',
  },
  {
    src: '/images/ovv/kitchen.webp',
    alt: 'Contemporary kitchen and dining area inside an Ocean View Villa',
    label: 'Kitchen & dining',
  },
  {
    src: '/images/ovv/ocean-suite.webp',
    alt: 'Ocean-facing master bedroom with full-height glass doors onto the sea',
    label: 'Ocean-facing suite',
  },
  {
    src: '/images/ovv/private-balcony.webp',
    alt: 'Aerial view of the Ocean View Villas beachfront and coastline',
    label: 'The beachfront from above',
  },
  {
    src: '/images/ovv/family-room.webp',
    alt: 'Dining table beside the plunge pool with the ocean beyond',
    label: 'Poolside dining',
  },
  {
    src: '/images/ovv/suite-vaulted.webp',
    alt: 'Master suite beneath a vaulted timber ceiling with a private lounge',
    label: 'Vaulted master suite',
  },
  {
    src: '/images/ovv/suite-mezzanine.webp',
    alt: 'Double-height bedroom with a full-height window framing the sea',
    label: 'Double-height suite',
  },
  {
    src: '/images/ovv/suite-oceanfan.webp',
    alt: 'Sea-view bedroom with slatted timber headboard and lounge seating',
    label: 'Sea-view bedroom',
  },
  {
    src: '/images/ovv/suite-study.webp',
    alt: 'Bedroom study nook with a timber desk and cane chair',
    label: 'Bedroom study',
  },
  {
    src: '/images/ovv/bath-twin.webp',
    alt: 'Twin backlit round mirrors above a stone vanity with brass fittings',
    label: 'Twin stone vanity',
  },
  {
    src: '/images/ovv/bath-stone.webp',
    alt: 'Stone-clad bathroom with a backlit oval mirror and timber joinery',
    label: 'Stone bathroom',
  },
  {
    src: '/images/ovv/bath-shower.webp',
    alt: 'Walk-in rain shower beside a stone vanity in a villa bathroom',
    label: 'Walk-in shower',
  },
  {
    src: '/images/ovv/sea-kitchen.webp',
    alt: 'Kitchen island looking through the open living space to the ocean',
    label: 'Kitchen, ocean view',
  },
  {
    src: '/images/ovv/table-setting.webp',
    alt: 'Round dining table dressed with a full place setting',
    label: 'The dining table',
  },
];

/* The sticky scroll stack in the "Inside Ocean View Villas" section - edit
   this list to change which photographs appear and in what order. Index into
   `villaImages` above to reuse one of those, or drop in a plain
   `{ src, alt, label }` object for a new image. CssImageStacking renders at
   most five cards, so entries past the fifth are ignored. */
const galleryImages = [
  villaImages[0],
  villaImages[1],
  villaImages[3],
  villaImages[4],
  villaImages[14],
];

export default function VillaScrollJourney() {
  return (
    <main className='villa-experience'>
      <section id='amenities' className='villa-proof'>
        <Reveal className='villa-proof__plan' y={34} duration={1}>
          <img
            src='/images/ovv/master-plan.webp'
            alt='Master plan showing the six Ocean View Villas on the beachfront site'
            loading='lazy'
            decoding='async'
          />
        </Reveal>
        <div className='villa-proof__content'>
          <Reveal as='p' className='villa-proof__lead' y={16} duration={0.7}>
            Six keys. One coastline.
          </Reveal>
          <RevealText delay={0.08}>
            A beachfront collection made deliberately scarce.
          </RevealText>
          <Reveal as='p' delay={0.18}>
            Every residence combines private outdoor living with the scale and
            service spaces of a permanent home - positioned between Colombo and
            Negombo with the airport within easy reach.
          </Reveal>
          <RevealGroup as='dl' delay={0.1} stagger={0.09}>
            <motion.div variants={revealChild}>
              <BedDouble aria-hidden='true' />
              <dt>Bedrooms</dt>
              <dd>Four en-suite</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <Expand aria-hidden='true' />
              <dt>Built area</dt>
              <dd>5,500 sq ft</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <Waves aria-hidden='true' />
              <dt>Outdoor living</dt>
              <dd>Pool + garden</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <Palmtree aria-hidden='true' />
              <dt>Beachfront</dt>
              <dd>Garden to the shore</dd>
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      <VillaListings />

      <section
        id='villas'
        className='villa-gallery'
        aria-labelledby='villa-gallery-title'
      >
        {/* Visually hidden (clipped to 1px) - it exists to label the section
            for assistive tech, so there is nothing here to animate. */}
        <h2 id='villa-gallery-title' className='villa-gallery__title'>
          Inside Ocean View Villas
        </h2>
        <CssImageStacking images={galleryImages} />
      </section>

      <AboutVillas />

      <section id='inquiry' className='villa-inquiry'>
        <Reveal as='p' y={16} duration={0.7}>
          Ocean View Villas / Uswetakeiyawa, Sri Lanka
        </Reveal>
        <RevealText delay={0.08} stagger={0.07}>
          Own one of six.
        </RevealText>
        <Reveal as='a' href='#register' delay={0.22}>
          Request the private presentation
          <ArrowUpRight aria-hidden='true' />
        </Reveal>
        <Reveal as='span' delay={0.3} y={14} duration={0.7}>
          +94 11 4 335 444
        </Reveal>
      </section>
    </main>
  );
}
