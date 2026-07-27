import { Reveal, RevealGroup } from './Reveal';
import BrandWordmark from './BrandWordmark';
import { revealChild } from './motionTokens';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <RevealGroup className='site-footer__layout' stagger={0.1}>
        <motion.div className='site-footer__brand' variants={revealChild}>
          <p className='site-footer__wordmark'>
            <BrandWordmark accentClassName='site-footer__monogram' />
          </p>
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
              <a href='#villas'>Villas &amp; Suites</a>
            </li>
            <li>
              <a href='#amenities'>Experiences</a>
            </li>
            <li>
              <a href='#register'>Register Interest</a>
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
              <a href='mailto:hemantha@emeraldisle.lk'>
                hemantha@emeraldisle.lk
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
