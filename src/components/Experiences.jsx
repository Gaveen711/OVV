import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup, RevealText } from './Reveal';
import { revealChild } from './motionTokens';
import './Experiences.css';

/* The Colombo-Negombo corridor, as a resident would work through it rather
   than as a tourist itinerary. Ordered by distance from the front door:
   the lagoon and the marsh are the immediate surroundings, the market and
   the churches are the town, the coast is the day out.

   Every photograph is a Wikimedia Commons file of the actual named place,
   under a licence that permits commercial reuse with attribution - hence the
   `credit` on each entry, which the card renders. Swap these for owned
   photography and the credit can go with them. */
const EXPERIENCES = [
  {
    name: 'Negombo Lagoon',
    kind: 'On the water',
    copy: 'Outrigger canoes still work the lagoon under sail, the same hulls the coast has used for generations. Best seen at first light, when the fleet comes back in.',
    image: '/images/experiences/lagoon.webp',
    alt: 'Fishing boats moored on Negombo Lagoon',
    credit: {
      author: 'Steffen Schmitz',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Negombo,_Lagoon,_2025-08_CN-06.jpg',
    },
  },
  {
    name: 'Muthurajawela Marsh',
    kind: 'Wetland',
    copy: 'The wetland immediately south of the lagoon - a coastal marsh threaded with waterways, and one of the richest bird habitats on this stretch of the island. Explored by shallow boat.',
    image: '/images/experiences/marsh.webp',
    alt: 'Waterways through the Muthurajawela marsh near Negombo',
    credit: {
      author: 'Nikolay Maksimovich',
      license: 'CC BY 3.0',
      href: 'https://commons.wikimedia.org/wiki/File:Negombo_Lagoon_(Muthurajawela_marsh),_Sri_Lanka_-_panoramio.jpg',
    },
  },
  {
    name: 'The Dutch Canal',
    kind: 'Heritage',
    copy: 'A colonial waterway running the length of the corridor, cut to move cinnamon toward Colombo. It still traces the back of the coast road, quiet and shaded.',
    image: '/images/experiences/canal.webp',
    alt: 'The Dutch canal at Negombo, lined with palms',
    credit: {
      author: 'Steffen Schmitz',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Negombo,_Dutch_Canal,_2025-08_CN-03.jpg',
    },
  },
  {
    name: 'Lellama Fish Market',
    kind: 'Every morning',
    copy: 'Negombo’s working fish market, and the reason the seafood here is what it is. Loud, wet, and entirely unstaged - the day’s catch sold within hours of landing.',
    image: '/images/experiences/market.webp',
    alt: 'The fish market at Negombo',
    credit: {
      author: 'BlackNose',
      license: 'CC BY 3.0',
      href: 'https://commons.wikimedia.org/wiki/File:Fish_Market,_Negombo_-_panoramio.jpg',
    },
  },
  {
    name: 'St. Mary’s & the Old Fort',
    kind: 'In town',
    copy: 'Negombo earned the name Little Rome honestly: a dense Catholic quarter built around St. Mary’s, with the remains of the Dutch fort and its gate a short walk on.',
    image: '/images/experiences/church.webp',
    alt: 'St. Mary’s Church in Negombo',
    credit: {
      author: 'Steffen Schmitz',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Negombo,_St._Mary%27s_Church,_2025-07_CN-01.jpg',
    },
  },
  {
    name: 'The Coast',
    kind: 'Offshore',
    copy: 'Dive boats run out to reef and wreck sites off this coast through the calm season, with the wider water-sport coast opening up further north.',
    image: '/images/experiences/coast.webp',
    alt: 'The beach and shoreline at Negombo',
    credit: {
      author: 'Dhananjaya Bulathwatte',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Negombo_beach_3.jpg',
    },
  },
];

export default function Experiences() {
  /* Pointer devices reveal on :hover and keyboards on :focus-within, both in
     CSS. Touch has neither, so a tapped card is tracked here and gets the
     same class those two states set. */
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((current) => (current === i ? null : i));

  return (
    <section
      id='experiences'
      className='experiences'
      aria-labelledby='experiences-title'
    >
      <div className='experiences__intro'>
        <Reveal as='p' className='experiences__label' y={16} duration={0.7}>
          The surrounding coast
        </Reveal>

        <RevealText id='experiences-title' className='experiences__heading' delay={0.08}>
          What is around you.
        </RevealText>

        <Reveal as='p' className='experiences__lead' delay={0.18}>
          The villas sit on the Colombo&ndash;Negombo corridor, with the airport and
          the capital on either side of the front door. Between them is a working
          coastline &mdash; a lagoon, a marsh, a fish market and a colonial town that
          have been here far longer than the road.
        </Reveal>
      </div>

      <RevealGroup as='ul' className='experiences__grid' delay={0.06} stagger={0.09}>
        {EXPERIENCES.map((item, i) => (
          <motion.li
            key={item.name}
            className={openIndex === i ? 'experiences__card is-open' : 'experiences__card'}
            variants={revealChild}
            tabIndex={0}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <img
              className='experiences__img'
              src={item.image}
              alt={item.alt}
              width={1200}
              height={900}
              loading='lazy'
              decoding='async'
            />

            <span className='experiences__scrim' aria-hidden='true' />

            {/* The copy is never removed from the document - it is only shifted
                and faded - so assistive tech and crawlers get the whole card
                whether or not it is visually revealed. */}
            <div className='experiences__body'>
              <p className='experiences__kind'>{item.kind}</p>
              <h3 className='experiences__name'>{item.name}</h3>
              <p className='experiences__copy'>
                <span>{item.copy}</span>
              </p>
              <p className='experiences__credit'>
                <span>
                  <a
                    href={item.credit.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.credit.author}
                  </a>
                  <span aria-hidden='true'> / </span>
                  {item.credit.license}
                </span>
              </p>
            </div>
          </motion.li>
        ))}
      </RevealGroup>

      <RevealGroup as='dl' className='experiences__reach' delay={0.1} stagger={0.08}>
        <motion.div variants={revealChild}>
          <dt>Airport</dt>
          <dd>Bandaranaike International, up the coast</dd>
        </motion.div>
        <motion.div variants={revealChild}>
          <dt>Capital</dt>
          <dd>Colombo, down the coast road</dd>
        </motion.div>
        <motion.div variants={revealChild}>
          <dt>Town</dt>
          <dd>Negombo, for the market and the harbour</dd>
        </motion.div>
      </RevealGroup>
    </section>
  );
}
