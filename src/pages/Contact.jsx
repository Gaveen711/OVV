import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/Navbar';
import SmoothScroll from '../components/SmoothScroll';
import HashScroll from '../components/HashScroll';
import ScrollToTop from '../components/ScrollToTop';
import RegisterInterest from '../components/RegisterInterest';
import Footer from '../components/Footer';
import './Contact.css';

const questions = [
  {
    question: 'Where are Ocean View Villas located?',
    answer: 'The residences are in Uswetakeiyawa, Sri Lanka, on the coast near Colombo and the airport.',
  },
  {
    question: 'How many residences are in the collection?',
    answer: 'Ocean View Villas is a collection of six beachfront residences.',
  },
  {
    question: 'What is included in each residence?',
    answer: 'Each residence has four en-suite bedrooms, 5,500 sq ft of living space and a private plunge pool. Explore the villa pages for more details and plans.',
  },
  {
    question: 'How can I arrange a private presentation?',
    answer: 'Complete the interest form on this page and our team will be in touch to discuss a private presentation.',
  },
  {
    question: 'Can I contact the team directly?',
    answer: 'Yes. Call +94 77 018 3334 or email sales@ovvlanka.com.',
  },
];

export default function Contact() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Contact Us | Ocean View Villas';
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className='contact-page'>
      <SmoothScroll />
      <HashScroll />
      <Navbar />
      <ScrollToTop />
      <main>
        <section className='contact-hero' aria-labelledby='contact-title'>
          <div className='contact-hero__copy'>
            <p className='contact-hero__location'>Ocean View Villas · Uswetakeiyawa</p>
            <h1 id='contact-title'>Start a conversation by the sea.</h1>
            <p className='contact-hero__intro'>Ask about the residences, request a private presentation, or speak with our team directly.</p>
            <div className='contact-hero__links'>
              <a href='tel:+94770183334'>+94 77 018 3334</a>
              <a href='mailto:sales@ovvlanka.com'>sales@ovvlanka.com</a>
            </div>
            <a className='contact-hero__form-link' href='#register'>Register your interest <span aria-hidden='true'>↗</span></a>
          </div>
          <div className='contact-hero__image' role='img' aria-label='Ocean View Villas on the Sri Lankan coast' />
        </section>

        <RegisterInterest />

        <section className='contact-faq' aria-labelledby='faq-title'>
          <div className='contact-faq__intro'>
            <h2 id='faq-title'>Frequently asked questions</h2>
            <p>A few details before you get in touch.</p>
          </div>
          <div className='contact-faq__questions'>
            {questions.map(({ question, answer }) => (
              <details key={question} className='contact-faq__item'>
                <summary>{question}<span aria-hidden='true'>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
