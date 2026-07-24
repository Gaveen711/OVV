import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollExpandMedia component with Full Viewport expansion, continuous Video Loop inside card, and Resort Background image outside.
 */
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  bgImageSrc = '/images/resort-hero-bg.jpg',
  title = 'OCEAN VIEW',
  date = '',
  scrollToExpand = '',
  textBlend = true,
  children,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const [winSize, setWinSize] = useState({ width: 1400, height: 900 });

  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Let the smooth-scroll layer know whether the page scroll is ours or the hero's
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('hero-state', {
        detail: { expanded: mediaFullyExpanded },
      })
    );
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(window.innerWidth < 768);
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for navigation clicks from Navbar or CTAs
  useEffect(() => {
    const handleExpandAndScroll = (e) => {
      const { id, scrollToTop } = e.detail || {};

      if (scrollToTop) {
        setScrollProgress(0);
        setMediaFullyExpanded(false);
        setShowContent(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);

      if (id) {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { duration: 1.4 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
      }
    };

    window.addEventListener('expand-and-scroll', handleExpandAndScroll);
    return () => window.removeEventListener('expand-and-scroll', handleExpandAndScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartY || !e.touches || !e.touches[0]) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Full viewport dimensions calculation
  const targetWidth = winSize.width;
  const targetHeight = winSize.height;

  const currentWidth = 320 + scrollProgress * (targetWidth - 320);
  const currentHeight = 420 + scrollProgress * (targetHeight - 420);
  const borderRadius = Math.max(0, Math.round(16 * (1 - scrollProgress * 1.5)));

  // Title text horizontal displacement
  const textTranslateX = scrollProgress * (isMobileState ? 200 : 180);
  const isFullViewport = scrollProgress >= 0.8;

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh] bg-[#060b13]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* Ambient Outer Resort Background Image (Rendered behind video card) */}
          <motion.div
            className='absolute inset-0 z-0 h-full overflow-hidden'
            initial={{ opacity: 1 }}
            animate={{ opacity: Math.max(0, 1 - scrollProgress * 1.3) }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt='Architectural render of the Ocean View Villas beachfront resort'
              width={1920}
              height={1080}
              fetchPriority='high'
              decoding='async'
              className='w-screen h-screen object-cover object-center scale-105'
            />
            <div className='absolute inset-0 bg-black/25' />
          </motion.div>

          <div className='w-full flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative overflow-hidden'>

              {/* Expanding Video Media Box */}
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none overflow-hidden bg-black'
                style={{
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  borderRadius: `${borderRadius}px`,
                  boxShadow: isFullViewport ? 'none' : '0px 25px 70px rgba(0, 0, 0, 0.6)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            (mediaSrc.split('v=')[1] ? mediaSrc.split('v=')[1] : '')
                        }
                        className='w-full h-full pointer-events-none scale-105'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        title='Hero Video'
                      />
                      <motion.div
                        className='absolute inset-0 bg-black/30 pointer-events-none'
                        animate={{ opacity: 0.4 - scrollProgress * 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <motion.div
                        className='absolute inset-0 bg-black/30 pointer-events-none'
                        animate={{ opacity: 0.4 - scrollProgress * 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover'
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/40'
                      animate={{ opacity: 0.4 - scrollProgress * 0.2 }}
                    />
                  </div>
                )}

                {/* Subtitle positioned cleanly at bottom of media box */}
                <div className='flex flex-col items-center text-center absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none w-full px-4'>
                  {date && (
                    <p
                      className='text-xs md:text-sm tracking-[0.35em] font-semibold text-amber-200 uppercase drop-shadow-lg'
                      style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-xs md:text-sm text-slate-200 font-light tracking-[0.2em] text-center drop-shadow-md mt-1'
                      style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title Text Splitting Outward ("OCEAN" Left, "VIEW" Right) */}
              <h1
                className={`flex items-center justify-center text-center gap-2 md:gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
              >
                <motion.span
                  className='block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-wider font-bold text-amber-100 uppercase drop-shadow-2xl'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.span>
                <motion.span
                  className='block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-wider font-bold text-center text-amber-100 uppercase drop-shadow-2xl'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.span>
              </h1>

            </div>

            {/* Transition into Next Website Sections */}
            <motion.section
              className='flex flex-col w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
