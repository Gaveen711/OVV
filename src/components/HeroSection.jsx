import { useEffect, useRef, useState } from 'react';

/* Served from the site's own /public rather than blob storage: the blob store
   returns 403 ("Your store is blocked"), and this 1080p encode is 14.8MB
   against the original 162MB, so it is cheap to ship with the deploy. */
const HERO_VIDEO = '/videos/ovv-hero-1080p.mp4';

/**
 * Full-bleed hero.
 *
 * The still is not a fallback that gets swapped out - it is the first frame the
 * visitor sees, and it stays underneath the video for the whole sequence. The
 * film is streamed from blob storage and only fades in once it can actually
 * play, so a slow connection shows the photograph rather than a black rectangle,
 * and a stall mid-loop reveals the still instead of a gap.
 */
export default function HeroSection({
  posterSrc = '/images/resort-hero-bg.webp',
  videoSrc = HERO_VIDEO,
}) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
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

    // A cached video can be ready before React attaches onCanPlay, and the
    // event never fires again - so the fade-in has to be triggered from the
    // current readyState too, or the film plays invisibly under the still.
    if (video.readyState >= 3) setVideoReady(true);

    // Autoplay can still be refused (low power mode, data saver). The still
    // underneath is already the designed state, so a refusal needs no handling
    // beyond not letting the rejection surface as an unhandled error.
    const attempt = video.play();
    if (attempt?.catch) attempt.catch(() => {});
  }, [motionOk]);

  return (
    <section className='relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#060b13]'>
      <img
        src={posterSrc}
        alt='Architectural render of the Ocean View Villas beachfront resort'
        width={1920}
        height={1080}
        fetchPriority='high'
        decoding='async'
        className='absolute inset-0 w-full h-full object-cover object-center scale-105'
      />

      {/* The fade is an inline style, not an `opacity-0`/`opacity-100` pair:
          those would be built from a template literal, and the utility only
          lands in the stylesheet if the build happens to scan that exact
          string - which it did not, leaving the film playing invisibly. */}
      {motionOk ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
          aria-hidden='true'
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
          className='absolute inset-0 w-full h-full object-cover object-center scale-105'
          style={{
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 900ms ease-out',
          }}
        />
      ) : null}

      <div className='absolute inset-0 bg-black/25' />
    </section>
  );
}
