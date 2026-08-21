import { useEffect, useRef, useState } from 'react';

/* Served from the site's own /public rather than blob storage: the blob store
   returns 403 ("Your store is blocked"), and these encodes are cheap enough to
   ship with the deploy. Both are muxed with the moov atom ahead of the media
   data, so a browser can start playing on the first chunk instead of waiting
   for the whole file. */
const HERO_VIDEO_1080 = '/videos/ovv-hero-1080p.mp4';
const HERO_VIDEO_720 = '/videos/ovv-hero-720p.mp4';

/* Frame zero of the film itself rather than a separate photograph, so the
   handover from poster to video is invisible - the pixels are identical. At
   ~85KB it paints almost immediately and covers the second or two the video
   spends buffering, which would otherwise be bare background. */
const HERO_POSTER = '/videos/ovv-hero-poster.webp';

/* Phones get the 720p cut: 5.8MB against 14.8MB, on the connection least able
   to afford it and the screen least able to show the difference. Resolved once,
   before first paint, so the element never fetches one file and then the other. */
const SMALL_SCREEN = '(max-width: 820px)';

function pickSource() {
  if (typeof window === 'undefined') return HERO_VIDEO_1080;
  return window.matchMedia(SMALL_SCREEN).matches ? HERO_VIDEO_720 : HERO_VIDEO_1080;
}

/**
 * Full-bleed hero - the film, over its own first frame.
 *
 * Reduced-motion visitors still get the video element, but paused on that
 * first frame instead of looping, so the hero is never empty for them.
 */
export default function HeroSection({ videoSrc }) {
  const videoRef = useRef(null);
  const [source] = useState(() => videoSrc ?? pickSource());
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React sets `muted` as a DOM property, and some browsers check the
    // attribute when deciding whether an autoplaying video counts as silent.
    // Setting it directly keeps mobile Safari from blocking playback.
    video.muted = true;

    if (!motionOk) return;

    // Autoplay can still be refused (low power mode, data saver). Nothing to
    // handle beyond keeping the rejection from surfacing as an unhandled
    // error - the poster frame stays on screen.
    const attempt = video.play();
    if (attempt?.catch) attempt.catch(() => {});
  }, [motionOk]);

  return (
    <section className='relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#060b13]'>
      <video
        ref={videoRef}
        src={source}
        poster={HERO_POSTER}
        autoPlay={motionOk}
        loop={motionOk}
        muted
        playsInline
        preload='auto'
        aria-label='Ocean View Villas, filmed on the beachfront in Uswetakeiyawa'
        tabIndex={-1}
        className='absolute inset-0 w-full h-full object-cover object-center scale-105'
      />

      <div className='absolute inset-0 bg-black/25' />
    </section>
  );
}
