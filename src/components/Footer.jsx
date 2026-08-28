import { useLocation } from 'react-router-dom';
import { Reveal, RevealGroup } from './Reveal';
import BrandLogo from './BrandLogo';
import { revealChild } from './motionTokens';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  // The footer also renders on villa detail pages, where none of these sections
  // exist. A bare `#villas` there just sets the hash and goes nowhere, so the
  // links are pointed back at the landing page when we are off it. On the
  // landing page they stay bare so Lenis keeps handling them as smooth
  // in-page anchors rather than forcing a reload.
  const { pathname } = useLocation();
  const home = pathname === '/' ? '' : '/';

  return (
    <footer className='site-footer'>
      <RevealGroup className='site-footer__layout' stagger={0.1}>
        <motion.div className='site-footer__brand' variants={revealChild}>
          <div className='mb-5'>
            <BrandLogo
              theme='dark'
              variant='full'
              markClassName='h-10 md:h-12 w-auto'
              textClassName='text-white tracking-[0.28em] text-[8px] md:text-[9.5px]'
            />
          </div>
          <p className='site-footer__tagline'>
            Six beachfront residences in Uswetakeiyawa, Sri Lanka.
          </p>
        </motion.div>

        <motion.nav
          className='site-footer__menu'
          aria-label='Footer'
          variants={revealChild}
        >
          <h4>Explore</h4>
          <ul>
            <li>
              <a href={`${home}#villa-collection`}>Villas</a>
            </li>
            <li>
              <a href={`${home}#experiences`}>Experiences</a>
            </li>
            <li>
              <a href={`${home}#register`}>Register Interest</a>
            </li>
            <li>
              <a href='/privacy-policy.html'>Privacy Policy</a>
            </li>
          </ul>
        </motion.nav>

        <motion.div className='site-footer__contact' variants={revealChild}>
          <h4>Contact</h4>
          <ul>
            <li>Uswetakeiyawa, Sri Lanka</li>
            <li>
              <a href='tel:+94114335444'>+94 11 4 335 444</a>
            </li>
            <li>
              <a href='mailto:deepakjs@yahoo.com'>
                deepakjs@yahoo.com
              </a>
            </li>
          </ul>
        </motion.div>
      </RevealGroup>

      <Reveal className='site-footer__base' y={16} duration={0.7} delay={0.1}>
        <p>&copy; 2026 Ocean View Villas. All rights reserved.</p>
      </Reveal>
    </footer>
  );
}
