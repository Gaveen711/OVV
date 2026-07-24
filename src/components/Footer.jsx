import './Footer.css';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <div className='site-footer__layout'>
        <div className='site-footer__brand'>
          <p className='site-footer__wordmark'>Ocean View</p>
          <p className='site-footer__tagline'>
            Six beachfront residences in Uswetakeiyawa, Sri Lanka.
          </p>
        </div>

        <nav className='site-footer__menu' aria-label='Footer'>
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
        </nav>

        <div className='site-footer__contact'>
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
        </div>
      </div>

      <div className='site-footer__base'>
        <p>&copy; 2026 Ocean View Villas. All rights reserved.</p>
      </div>
    </footer>
  );
}
