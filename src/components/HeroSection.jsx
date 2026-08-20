export default function HeroSection({ bgImageSrc = '/images/resort-hero-bg.webp' }) {
  return (
    <section className='relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#060b13]'>
      <img
        src={bgImageSrc}
        alt='Architectural render of the Ocean View Villas beachfront resort'
        width={1920}
        height={1080}
        fetchPriority='high'
        decoding='async'
        className='w-full h-full object-cover object-center scale-105'
      />
      <div className='absolute inset-0 bg-black/25' />
    </section>
  );
}
