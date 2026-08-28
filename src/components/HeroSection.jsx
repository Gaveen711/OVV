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
   to afford it and the screen least able to show the difference. */
const SMALL_SCREEN = '(max-width: 820px)';

/* Both media queries are read during the first render rather than in an
   effect. Resolving them afterwards meant the element mounted with no
   `autoplay` and the wrong source, then had both swapped underneath it - the
   browser had already begun loading by that point. */
function initialState(videoSrc) {
  if (typeof window === 'undefined') {
    return { source: videoSrc ?? HERO_VIDEO_1080, motionOk: true };
  }
  return {
    source:
      videoSrc ??
      (window.matchMedia(SMALL_SCREEN).matches ? HERO_VIDEO_720 : HERO_VIDEO_1080),
    motionOk: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
}

/**
 * Full-bleed hero - the film, over its own first frame.
 *
 * Reduced-motion visitors still get the video element, but paused on that
 * first frame instead of looping, so the hero is never empty for them.
 */
export default function HeroSection({ videoSrc }) {
  const videoRef = useRef(null);
  const [{ source, motionOk }] = useState(() => initialState(videoSrc));

  /* React assigns `muted` as a DOM property and never writes the attribute.
     Autoplay policies look for the attribute, so without this the browser
     treats the video as unmuted, refuses to autoplay it, and the hero sits
     frozen on the poster. Done in the ref callback so it lands before the
     play() attempt below. */
  const attachVideo = (el) => {
    videoRef.current = el;
    if (!el) return;
    el.setAttribute('muted', '');
    el.defaultMuted = true;
    el.muted = true;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionOk) return undefined;

    let cleanup = () => {};

    // Autoplay can still be refused - iOS Low Power Mode and data-saver modes
    // block it regardless of muting. Rather than swallow that silently, wait
    // for the first interaction and start on the back of it, which every
    // autoplay policy accepts.
    const resumeOnInteraction = () => {
      video.play().catch(() => {});
      cleanup();
    };

    const events = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
    const arm = () => {
      events.forEach((e) =>
        window.addEventListener(e, resumeOnInteraction, { once: true, passive: true })
      );
      cleanup = () =>
        events.forEach((e) => window.removeEventListener(e, resumeOnInteraction));
    };

    const attempt = video.play();
    if (attempt?.catch) attempt.catch(arm);

    return () => cleanup();
  }, [motionOk]);

  return (
    <section className='relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#03045E]'>
      <video
        ref={attachVideo}
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
