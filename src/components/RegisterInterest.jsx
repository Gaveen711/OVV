import { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { HUBSPOT_CONFIG } from '../config/hubspot';
import './RegisterInterest.css';

const dialCodes = [
  { code: '+94', flag: '\u{1F1F1}\u{1F1F0}' },
  { code: '+1', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: '+44', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: '+61', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: '+64', flag: '\u{1F1F3}\u{1F1FF}' },
  { code: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: '+31', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: '+41', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: '+46', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: '+47', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: '+45', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: '+971', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: '+966', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: '+974', flag: '\u{1F1F6}\u{1F1E6}' },
  { code: '+965', flag: '\u{1F1F0}\u{1F1FC}' },
  { code: '+968', flag: '\u{1F1F4}\u{1F1F2}' },
  { code: '+65', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: '+60', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: '+82', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: '+86', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: '+852', flag: '\u{1F1ED}\u{1F1F0}' },
  { code: '+27', flag: '\u{1F1FF}\u{1F1E6}' },
  { code: '+960', flag: '\u{1F1F2}\u{1F1FB}' },
];

const countries = [
  'Sri Lanka', 'Australia', 'Austria', 'Bahrain', 'Belgium', 'Canada',
  'China', 'Denmark', 'France', 'Germany', 'Hong Kong', 'India',
  'Indonesia', 'Ireland', 'Italy', 'Japan', 'Kuwait', 'Malaysia',
  'Maldives', 'Netherlands', 'New Zealand', 'Norway', 'Oman', 'Portugal',
  'Qatar', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
  'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkiye',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam',
  'Other',
];

const hearAboutUs = [
  'Google search',
  'Social media',
  'Newspaper or magazine',
  'Friend or family',
  'Real estate agent',
  'Event or exhibition',
  'Other',
];

const initialForm = {
  firstname: '',
  lastname: '',
  dialCode: '+94',
  phone: '',
  email: '',
  country: '',
  source: '',
  message: '',
  subscribe: false,
  agree: false,
};

export default function RegisterInterest() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const { portalId, formGuid, demoModeIfUnconfigured } = HUBSPOT_CONFIG;

    const payload = {
      fields: [
        { name: 'firstname', value: form.firstname },
        { name: 'lastname', value: form.lastname },
        { name: 'email', value: form.email },
        { name: 'phone', value: `${form.dialCode} ${form.phone}`.trim() },
        { name: 'country', value: form.country },
        { name: 'how_did_you_hear_about_us', value: form.source },
        {
          name: 'message',
          value:
            form.message +
            (form.subscribe ? '\n\n[Signed up for updates]' : ''),
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'I agree to allow Ocean View Villas to store and process my personal data in line with the Privacy Policy.',
        },
      },
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Submission failed.');
      }

      setStatus({ loading: false, success: true, error: null });
    } catch (err) {
      if (demoModeIfUnconfigured) {
        console.warn(
          'HubSpot submission fell back to demo mode (configure portalId/formGuid in src/config/hubspot.js):',
          err
        );
        setStatus({ loading: false, success: true, error: null });
        return;
      }
      setStatus({
        loading: false,
        success: false,
        error:
          'Something went wrong while sending your details. Please try again, or reach us on WhatsApp below.',
      });
    }
  };

  return (
    <section
      id='register'
      className='register-interest'
      aria-labelledby='register-interest-title'
    >
      <div className='register-interest__layout'>
        <aside className='register-interest__rail'>
          <svg
            width='34'
            height='34'
            viewBox='0 0 34 34'
            fill='none'
            aria-hidden='true'
          >
            <rect
              x='17'
              y='2.2'
              width='21'
              height='21'
              transform='rotate(45 17 2.2)'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <path
              d='M7 17c6.5-5.5 13.5 5.5 20 0'
              stroke='currentColor'
              strokeWidth='1.2'
            />
          </svg>
          <p>For more information</p>
        </aside>

        <div className='register-interest__body'>
          <h2 id='register-interest-title'>Register your interest</h2>

          {status.success ? (
            <div className='register-interest__success' role='status'>
              <CheckCircle2 aria-hidden='true' />
              <h3>Thank you - your interest has been registered.</h3>
              <p>
                One of our team will be in touch shortly to arrange your
                private presentation of Ocean View Villas.
              </p>
              <button
                type='button'
                onClick={() => {
                  setForm(initialForm);
                  setStatus({ loading: false, success: false, error: null });
                }}
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false}>
              <div className='register-interest__row'>
                <input
                  type='text'
                  name='firstname'
                  required
                  autoComplete='given-name'
                  placeholder='First name'
                  aria-label='First name'
                  value={form.firstname}
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='lastname'
                  required
                  autoComplete='family-name'
                  placeholder='Last name'
                  aria-label='Last name'
                  value={form.lastname}
                  onChange={handleChange}
                />
              </div>

              <div className='register-interest__phone'>
                <div className='register-interest__select register-interest__select--dial'>
                  <select
                    name='dialCode'
                    aria-label='Country dialling code'
                    value={form.dialCode}
                    onChange={handleChange}
                  >
                    {dialCodes.map(({ code, flag }) => (
                      <option key={code} value={code}>
                        {flag} {code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden='true' />
                </div>
                <input
                  type='tel'
                  name='phone'
                  required
                  autoComplete='tel-national'
                  placeholder='Phone number'
                  aria-label='Phone number'
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <input
                type='email'
                name='email'
                required
                autoComplete='email'
                placeholder='Email address'
                aria-label='Email address'
                value={form.email}
                onChange={handleChange}
              />

              <div className='register-interest__select'>
                <select
                  name='country'
                  required
                  autoComplete='country-name'
                  aria-label='Country'
                  value={form.country}
                  onChange={handleChange}
                  data-empty={form.country === '' || undefined}
                >
                  <option value='' disabled>
                    Country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden='true' />
              </div>

              <div className='register-interest__select'>
                <select
                  name='source'
                  aria-label='How did you hear about us'
                  value={form.source}
                  onChange={handleChange}
                  data-empty={form.source === '' || undefined}
                >
                  <option value='' disabled>
                    How did you hear about us
                  </option>
                  {hearAboutUs.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden='true' />
              </div>

              <textarea
                name='message'
                rows={4}
                placeholder='Leave us a message'
                aria-label='Leave us a message'
                value={form.message}
                onChange={handleChange}
              />

              <p className='register-interest__whatsapp'>
                <svg
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z' />
                </svg>
                Alternatively, you can call{' '}
                <a href='https://wa.me/94777275727'>+94 77 727 5727</a> to
                speak with one of our team.
              </p>

              <label className='register-interest__check'>
                <input
                  type='checkbox'
                  name='subscribe'
                  checked={form.subscribe}
                  onChange={handleChange}
                />
                <span>Sign up for updates and keep me informed</span>
              </label>

              <label className='register-interest__check'>
                <input
                  type='checkbox'
                  name='agree'
                  required
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>
                  Agree to{' '}
                  <a
                    href='/privacy-policy.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              {status.error && (
                <p className='register-interest__error' role='alert'>
                  <AlertCircle aria-hidden='true' />
                  {status.error}
                </p>
              )}

              <button
                type='submit'
                className='register-interest__submit'
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    Sending
                    <Loader2
                      className='register-interest__spinner'
                      aria-hidden='true'
                    />
                  </>
                ) : (
                  <>
                    Register now
                    <svg
                      width='22'
                      height='8'
                      viewBox='0 0 46 16'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M38 0l-1.455 1.455 5.506 5.506H0v2.078h42.052l-5.507 5.506L38 16l8-8z' />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
