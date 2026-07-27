import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollExpandMedia component with Multi-Browser compatibility, Firefox wheel normalization, Safari video autoplay enforcement, and touch progress handling.
 */
/**
 * Resolve the `<source>` list once, at mount. Picking the variant here rather
 * than with `<source media=...>` avoids the browser fetching both renditions,
 * and freezing it for the component's lifetime means a resize can never swap
 * the src out from under a playing video.
 */
function resolveSources(mediaSrc) {
  if (typeof mediaSrc === 'string') return [{ src: mediaSrc, type: 'video/mp4' }];
  if (!mediaSrc) return [];

  const isSmall =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches || window.innerWidth < 768);
  const set = (isSmall ? mediaSrc.mobile : mediaSrc.desktop) ?? mediaSrc.desktop ?? mediaSrc.mobile;
  if (!set) return [];

  // WebM first: Chrome/Firefox take the smaller VP9 file, Safari falls through
  // to the MP4 without ever requesting the WebM.
  return [
    set.webm && { src: set.webm, type: 'video/webm' },
    set.mp4 && { src: set.mp4, type: 'video/mp4' },
  ].filter(Boolean);
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc = '',
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
  const [isMobileState, setIsMobileState] = useState(false);
  const [winSize, setWinSize] = useState({ width: 1400, height: 900 });
  const [videoSources] = useState(() =>
    mediaType === 'video' ? resolveSources(mediaSrc) : []
  );

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Scroll progress is accumulated in a ref and flushed to state once per
  // animation frame. Wheel/touch events fire far faster than the display
  // refreshes, and every commit relayouts the media box, so throttling here is
  // what keeps the expand smooth instead of stuttering.
  const progressRef = useRef(0);
  const rafRef = useRef(null);
  const expandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  const isYouTube = typeof mediaSrc === 'string' && mediaSrc.includes('youtube.com');

  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Safari & WebKit programmatic video autoplay enforcement
  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Cross-browser video autoplay deferred:', err);
        });
      }
    }
  }, [videoSources, mediaType]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

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
        progressRef.current = 0;
        expandedRef.current = false;
        setScrollProgress(0);
        setMediaFullyExpanded(false);
        setShowContent(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      progressRef.current = 1;
      expandedRef.current = true;
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

  // Firefox & Chrome wheel delta normalization and cross-browser touch events.
  // Listeners attach once and read live values from refs, so a progress change
  // never tears down and re-registers the whole event set mid-gesture.
  useEffect(() => {
    const flush = () => {
      rafRef.current = null;
      const progress = progressRef.current;
      setScrollProgress(progress);

      if (progress >= 1) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (progress < 0.75) {
        setShowContent(false);
      }
    };

    const commit = (delta) => {
      progressRef.current = Math.min(Math.max(progressRef.current + delta, 0), 1);

      // A hidden document never fires rAF, so a queued frame would strand the
      // expand mid-gesture. Nothing is painting anyway - commit straight away.
      if (document.visibilityState === 'hidden') {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
        flush();
        return;
      }

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(flush);
    };

    const collapse = () => {
      expandedRef.current = false;
      setMediaFullyExpanded(false);
    };

    const handleWheel = (e) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 10) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();

        // Firefox deltaMode normalization: 1 = DOM_DELTA_LINE, 2 = DOM_DELTA_PAGE
        let rawDelta = e.deltaY;
        if (e.deltaMode === 1) {
          rawDelta *= 35;
        } else if (e.deltaMode === 2) {
          rawDelta *= 700;
        }

        commit(rawDelta * 0.0008);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartYRef.current || !e.touches || !e.touches[0]) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 10) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        if (e.cancelable) e.preventDefault();
        commit(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

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
      <section className='relative flex flex-col items-center justify-start min-h-screen min-h-[100dvh] bg-[#060b13]'>
        <div className='relative w-full flex flex-col items-center min-h-screen min-h-[100dvh]'>

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
            <div className='flex flex-col items-center justify-center w-full h-screen h-[100dvh] relative overflow-hidden isolate-layer'>
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
                  // Keep the resizing box (and the video painting inside it) on
                  // its own compositor layer for the whole expand.
                  willChange: mediaFullyExpanded ? 'auto' : 'width, height',
                  contain: 'paint',
                }}
              >
                {mediaType === 'video' ? (
                  isYouTube ? (
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
                        ref={videoRef}
                        poster={posterSrc || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        webkit-playsinline='true'
                        x5-playsinline='true'
                        preload='auto'
                        className='w-full h-full object-cover'
                        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      >
                        {/* No `src` attribute: it would win over these and the
                            browser could never pick the smaller WebM. */}
                        {videoSources.map(({ src, type }) => (
                          <source key={src} src={src} type={type} />
                        ))}
                      </video>
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
                className={`flex items-center justify-center text-center gap-2 md:gap-4 w-full relative z-10 transition-none flex-col isolate-layer ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.span
                  className='block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider font-bold text-amber-100 uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.span>
                <motion.span
                  className='block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider font-bold text-center text-amber-100 uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
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
