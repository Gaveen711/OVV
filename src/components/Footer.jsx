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
      <footer className='site-footer selection:bg-[#DFC184]/35 selection:text-white'>
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
              <a href='/contact'>Contact Us</a>
            </li>
            <li>
              <a href='/privacy-policy.html'>Privacy Policy</a>
            </li>
          </ul>
          <div className='site-footer__socials' aria-label='Social media'>
            <a
              href='https://www.facebook.com/profile.php?id=61596073604427'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Ocean View Villas on Facebook (opens in a new tab)'
            >
              <svg aria-hidden='true' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z' />
              </svg>
            </a>
            <a
              href='https://www.instagram.com/oceanviewvillas1/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Ocean View Villas on Instagram (opens in a new tab)'
            >
              <svg aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
                <rect x='3' y='3' width='18' height='18' rx='5' />
                <circle cx='12' cy='12' r='4' />
                <circle cx='17.5' cy='6.8' r='1' fill='currentColor' stroke='none' />
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/ovv-lanka-4a44a544a'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Ocean View Villas on LinkedIn (opens in a new tab)'
            >
              <svg aria-hidden='true' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.2v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3h-3.4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9V9Z' />
              </svg>
            </a>
          </div>
        </motion.nav>

        <motion.div className='site-footer__contact' variants={revealChild}>
          <h4>Contact</h4>
          <ul>
            <li>Uswetakeiyawa, Sri Lanka</li>
            <li>
              <a href='tel:+94770183334'>+94 77 018 3334</a>
            </li>
            <li>
              <a href='mailto:sales@ovvlanka.com'>
                sales@ovvlanka.com
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
