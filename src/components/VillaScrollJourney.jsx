import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowUpRight,
  BedDouble,
  CarFront,
  Expand,
  Waves,
} from 'lucide-react';
import { Reveal, RevealGroup, RevealText } from './Reveal';
import { revealChild } from './motionTokens';
import './VillaScrollJourney.css';

const villaImages = [
  {
    src: '/images/ovv/property-aerial.webp',
    alt: 'Open-plan living and dining spaces of an Ocean View Villa seen from the staircase above',
    label: 'Living spaces from above',
  },
  {
    src: '/images/ovv/plunge-pool.webp',
    alt: 'Private plunge pool opening into a villa living space',
    label: 'Private plunge pool',
  },
  {
    src: '/images/ovv/open-living.webp',
    alt: 'Open-plan villa living room with lounge seating beside a sea-view window',
    label: 'Open-plan living',
  },
  {
    src: '/images/ovv/kitchen.webp',
    alt: 'Contemporary kitchen and dining area inside an Ocean View Villa',
    label: 'Kitchen & dining',
  },
  {
    src: '/images/ovv/ocean-suite.webp',
    alt: 'Ocean-facing master bedroom with full-height glass doors onto the sea',
    label: 'Ocean-facing suite',
  },
  {
    src: '/images/ovv/private-balcony.webp',
    alt: 'Private balcony seating framing the beach and the Indian Ocean',
    label: 'Private balcony',
  },
  {
    src: '/images/ovv/family-room.webp',
    alt: 'Dining table beside the plunge pool with the ocean beyond',
    label: 'Poolside dining',
  },
  {
    src: '/images/ovv/suite-vaulted.webp',
    alt: 'Master suite beneath a vaulted timber ceiling with a private lounge',
    label: 'Vaulted master suite',
  },
  {
    src: '/images/ovv/suite-mezzanine.webp',
    alt: 'Double-height bedroom with a full-height window framing the sea',
    label: 'Double-height suite',
  },
  {
    src: '/images/ovv/suite-oceanfan.webp',
    alt: 'Sea-view bedroom with slatted timber headboard and lounge seating',
    label: 'Sea-view bedroom',
  },
  {
    src: '/images/ovv/suite-study.webp',
    alt: 'Bedroom study nook with a timber desk and cane chair',
    label: 'Bedroom study',
  },
  {
    src: '/images/ovv/bath-twin.webp',
    alt: 'Twin backlit round mirrors above a stone vanity with brass fittings',
    label: 'Twin stone vanity',
  },
  {
    src: '/images/ovv/bath-stone.webp',
    alt: 'Stone-clad bathroom with a backlit oval mirror and timber joinery',
    label: 'Stone bathroom',
  },
  {
    src: '/images/ovv/bath-shower.webp',
    alt: 'Walk-in rain shower beside a stone vanity in a villa bathroom',
    label: 'Walk-in shower',
  },
  {
    src: '/images/ovv/sea-kitchen.webp',
    alt: 'Kitchen island looking through the open living space to the ocean',
    label: 'Kitchen, ocean view',
  },
  {
    src: '/images/ovv/table-setting.webp',
    alt: 'Round dining table dressed with a full place setting',
    label: 'The dining table',
  },
];

/* The zoom-parallax collage positions (0: Center, 1: Top-Right, 2: Left, 3: Mid-Right, 4: Bottom-Center, 5: Bottom-Left, 6: Bottom-Far-Right).
   Rearrange the indices below to change which image appears in each position: */
const heroOrder = [1, 0, 2, 3, 4, 5, 6];
const heroImages = heroOrder.map((index) => villaImages[index]);

/* Card order for "The villa, room by room" - a hand-picked shuffle of
   all sixteen views so the deck alternates between living spaces,
   suites and bathrooms as it flips. Indices map into villaImages. */
const stackOrder = [0, 4, 11, 2, 7, 14, 5, 9, 13, 1, 8, 6, 15, 3, 10, 12];
const stackImages = stackOrder.map((index) => villaImages[index]);

/* Original zoom parallax - the collage of seven perspectives zooms
   outward as the visitor scrolls through the sticky sequence. */
function ZoomParallax({ images }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const guideOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32],
    [1, 1, 0]
  );
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={containerRef} className='villa-parallax'>
      <div className='villa-parallax__sticky'>
        <motion.div
          className='villa-parallax__guide'
          style={{ opacity: guideOpacity }}
        >
          <p>Ocean View Villas / Seven perspectives</p>
          <span>Scroll to explore</span>
        </motion.div>

        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className={`villa-parallax__layer villa-parallax__layer--${index}`}
            style={{ scale: scales[index] }}
          >
            <figure className='villa-parallax__frame'>
              <img
                src={image.src}
                alt={image.alt}
                width='1600'
                height='900'
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding='async'
                draggable='false'
              />
            </figure>
          </motion.div>
        ))}

        <div className='villa-parallax__progress' aria-hidden='true'>
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
}

/* 3D vertical card stack - scrolling through the section flips the deck
   one villa image at a time, with dots and a counter for orientation. */
function getCardStyle(diff) {
  if (diff === 0) {
    return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
  } else if (diff === -1) {
    return { y: -190, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: 8 };
  } else if (diff === -2) {
    return { y: -330, scale: 0.7, opacity: 0.25, zIndex: 3, rotateX: 15 };
  } else if (diff === 1) {
    return { y: 190, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: -8 };
  } else if (diff === 2) {
    return { y: 330, scale: 0.7, opacity: 0.25, zIndex: 3, rotateX: -15 };
  }
  return {
    y: diff > 0 ? 460 : -460,
    scale: 0.6,
    opacity: 0,
    zIndex: 0,
    rotateX: diff > 0 ? -20 : 20,
  };
}

/* Gesture physics for the interactive cards. */
const CARD_RETURN_SPRING = {
  type: 'spring',
  stiffness: 360,
  damping: 32,
  mass: 0.85,
};
const ZOOM_MAX = 4;
const ZOOM_MIN = 0.82;
const LOCKED_ZOOM = 2.25;

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

/* Interactive card - grab and drag with a spring return, two-finger
   pinch zoom anchored at the pinch midpoint, double-tap / double-click
   to lock a zoom, and ctrl+wheel / trackpad pinch on desktop.
   touch-action stays pan-y so vertical swipes keep scrolling the deck. */
function InteractiveVillaCard({ image, diff, eager }) {
  const innerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [engaged, setEngaged] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [settling, setSettling] = useState(false);
  const zoomLock = useRef(false);
  const settleTimer = useRef(null);
  const wheelHandler = useRef(null);
  const trackpadHandlers = useRef(null);
  const gestureRef = useRef({
    pointers: new Map(),
    mode: null,
    origin: { x: 0, y: 0 },
    base: { x: 0, y: 0, scale: 1 },
    center: { x: 0, y: 0 },
    startDist: 1,
    downTime: 0,
    moved: false,
    lastTap: { time: 0, x: 0, y: 0 },
    lastToggle: 0,
    trackpad: null,
  });

  const { zIndex: deckZIndex, ...deckMotion } = getCardStyle(diff);
  /* The deck scales background cards down, so screen-space pointer
     deltas are converted into the card's local space with this factor. */
  const outerScale = deckMotion.scale || 1;
  const active = engaged || zoomed || settling;

  const stopMotion = () => {
    x.stop();
    y.stop();
    scale.stop();
  };

  const measureCenter = () => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    gestureRef.current.center = {
      x: rect.left + rect.width / 2 - x.get() * outerScale,
      y: rect.top + rect.height / 2 - y.get() * outerScale,
    };
  };

  /* Offset that keeps the content point under `anchor` pinned to
     `target` while the card scales from `fromScale` to `toScale`. */
  const anchoredOffset = (anchor, target, base, fromScale, toScale) => {
    const { center } = gestureRef.current;
    const k = toScale / fromScale;
    return {
      x:
        (target.x - center.x - k * (anchor.x - center.x - base.x * outerScale)) /
        outerScale,
      y:
        (target.y - center.y - k * (anchor.y - center.y - base.y * outerScale)) /
        outerScale,
    };
  };

  const markSettling = () => {
    setSettling(true);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setSettling(false), 700);
  };

  const springHome = (withVelocity) => {
    markSettling();
    animate(x, 0, {
      ...CARD_RETURN_SPRING,
      velocity: withVelocity ? x.getVelocity() : 0,
    });
    animate(y, 0, {
      ...CARD_RETURN_SPRING,
      velocity: withVelocity ? y.getVelocity() : 0,
    });
    animate(scale, 1, CARD_RETURN_SPRING);
  };

  const resetCard = (withVelocity = false) => {
    zoomLock.current = false;
    setZoomed(false);
    springHome(withVelocity);
  };

  const toggleZoom = (px, py) => {
    const g = gestureRef.current;
    g.lastToggle = performance.now();
    if (zoomLock.current) {
      resetCard();
      return;
    }
    stopMotion();
    measureCenter();
    zoomLock.current = true;
    setZoomed(true);
    const anchor = { x: px, y: py };
    const next = anchoredOffset(
      anchor,
      anchor,
      { x: x.get(), y: y.get() },
      scale.get(),
      LOCKED_ZOOM
    );
    animate(x, next.x, CARD_RETURN_SPRING);
    animate(y, next.y, CARD_RETURN_SPRING);
    animate(scale, LOCKED_ZOOM, CARD_RETURN_SPRING);
  };

  const onPointerDown = (e) => {
    const g = gestureRef.current;
    const el = innerRef.current;
    if (!el) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.pointerType === 'mouse') e.preventDefault();
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* pointer already inactive */
    }
    stopMotion();
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    measureCenter();
    if (g.pointers.size === 1) {
      g.mode = 'drag';
      g.origin = { x: e.clientX, y: e.clientY };
      g.base = { x: x.get(), y: y.get(), scale: scale.get() };
      g.moved = false;
      g.downTime = performance.now();
    } else if (g.pointers.size === 2) {
      const [p1, p2] = [...g.pointers.values()];
      g.mode = 'pinch';
      g.origin = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      g.startDist = Math.max(1, Math.hypot(p2.x - p1.x, p2.y - p1.y));
      g.base = { x: x.get(), y: y.get(), scale: scale.get() };
      g.moved = true;
    }
    setEngaged(true);
  };

  const onPointerMove = (e) => {
    const g = gestureRef.current;
    if (!g.pointers.has(e.pointerId)) return;
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (g.mode === 'pinch' && g.pointers.size >= 2) {
      const [p1, p2] = [...g.pointers.values()];
      const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const distNow = Math.max(1, Math.hypot(p2.x - p1.x, p2.y - p1.y));
      const nextScale = clampValue(
        g.base.scale * (distNow / g.startDist),
        ZOOM_MIN,
        ZOOM_MAX
      );
      const next = anchoredOffset(g.origin, mid, g.base, g.base.scale, nextScale);
      x.set(next.x);
      y.set(next.y);
      scale.set(nextScale);
    } else if (g.mode === 'drag') {
      const dx = e.clientX - g.origin.x;
      const dy = e.clientY - g.origin.y;
      if (!g.moved && Math.hypot(dx, dy) > 4) g.moved = true;
      x.set(g.base.x + dx / outerScale);
      y.set(g.base.y + dy / outerScale);
    }
  };

  const onPointerEnd = (e) => {
    const g = gestureRef.current;
    if (!g.pointers.has(e.pointerId)) return;
    g.pointers.delete(e.pointerId);

    if (g.pointers.size === 1) {
      /* Pinch collapsed to one finger - continue as a drag. */
      const [p] = [...g.pointers.values()];
      g.mode = 'drag';
      g.origin = { x: p.x, y: p.y };
      g.base = { x: x.get(), y: y.get(), scale: scale.get() };
      return;
    }
    if (g.pointers.size > 0) return;

    g.mode = null;
    setEngaged(false);

    /* Double-tap on touch toggles the zoom lock. */
    if (e.pointerType === 'touch' && !g.moved && e.type === 'pointerup') {
      const now = performance.now();
      const quickTap = now - g.downTime < 350;
      const prev = g.lastTap;
      if (
        quickTap &&
        now - prev.time < 320 &&
        Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 48
      ) {
        g.lastTap = { time: 0, x: 0, y: 0 };
        toggleZoom(e.clientX, e.clientY);
        return;
      }
      g.lastTap = quickTap
        ? { time: now, x: e.clientX, y: e.clientY }
        : { time: 0, x: 0, y: 0 };
    }

    if (zoomLock.current) {
      const el = innerRef.current;
      const s = scale.get();
      if (s < 1.05 || !el) {
        resetCard(true);
        return;
      }
      /* Keep the zoom but snap the pan back over the card's slot. */
      const maxX = ((s - 1) * el.offsetWidth) / 2;
      const maxY = ((s - 1) * el.offsetHeight) / 2;
      markSettling();
      animate(x, clampValue(x.get(), -maxX, maxX), {
        ...CARD_RETURN_SPRING,
        velocity: x.getVelocity(),
      });
      animate(y, clampValue(y.get(), -maxY, maxY), {
        ...CARD_RETURN_SPRING,
        velocity: y.getVelocity(),
      });
      return;
    }

    springHome(true);
  };

  const onPointerLeave = (e) => {
    if (e.pointerType === 'touch') return;
    if (gestureRef.current.pointers.size > 0) return;
    if (zoomLock.current) resetCard();
  };

  const onDoubleClick = (e) => {
    /* Skip when the touch double-tap path already toggled. */
    if (performance.now() - gestureRef.current.lastToggle < 700) return;
    toggleZoom(e.clientX, e.clientY);
  };

  /* ctrl+wheel / trackpad pinch zoom - needs a non-passive listener. */
  wheelHandler.current = (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    e.stopPropagation();
    stopMotion();
    measureCenter();
    const from = scale.get();
    const step = e.deltaMode === 1 ? e.deltaY * 18 : e.deltaY;
    const target = clampValue(from * Math.exp(-step * 0.0024), 1, ZOOM_MAX);
    const anchor = { x: e.clientX, y: e.clientY };
    const next = anchoredOffset(
      anchor,
      anchor,
      { x: x.get(), y: y.get() },
      from,
      target
    );
    x.set(next.x);
    y.set(next.y);
    scale.set(target);
    if (target > 1.02) {
      if (!zoomLock.current) {
        zoomLock.current = true;
        setZoomed(true);
      }
    } else if (zoomLock.current) {
      zoomLock.current = false;
      setZoomed(false);
      springHome(false);
    }
  };

  /* Safari trackpad pinch fires gesture events instead of ctrl+wheel.
     Skipped while a two-pointer pinch is active (iOS fires both). */
  trackpadHandlers.current = {
    start(e) {
      const g = gestureRef.current;
      if (g.pointers.size >= 2) return;
      e.preventDefault();
      stopMotion();
      measureCenter();
      g.trackpad = {
        scale: scale.get(),
        base: { x: x.get(), y: y.get() },
        anchor: { x: e.clientX, y: e.clientY },
      };
    },
    change(e) {
      const g = gestureRef.current;
      const t = g.trackpad;
      if (!t || g.pointers.size >= 2) return;
      e.preventDefault();
      const target = clampValue(t.scale * e.scale, 1, ZOOM_MAX);
      const next = anchoredOffset(t.anchor, t.anchor, t.base, t.scale, target);
      x.set(next.x);
      y.set(next.y);
      scale.set(target);
      if (target > 1.02 && !zoomLock.current) {
        zoomLock.current = true;
        setZoomed(true);
      }
    },
    end(e) {
      const g = gestureRef.current;
      if (!g.trackpad) return;
      e.preventDefault();
      g.trackpad = null;
      if (scale.get() <= 1.02) resetCard();
    },
  };

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return undefined;
    const onWheel = (e) => wheelHandler.current?.(e);
    el.addEventListener('wheel', onWheel, { passive: false });

    const hasGestureEvents =
      typeof window !== 'undefined' && 'GestureEvent' in window;
    const onGestureStart = (e) => trackpadHandlers.current?.start(e);
    const onGestureChange = (e) => trackpadHandlers.current?.change(e);
    const onGestureEnd = (e) => trackpadHandlers.current?.end(e);
    if (hasGestureEvents) {
      el.addEventListener('gesturestart', onGestureStart);
      el.addEventListener('gesturechange', onGestureChange);
      el.addEventListener('gestureend', onGestureEnd);
    }

    return () => {
      el.removeEventListener('wheel', onWheel);
      if (hasGestureEvents) {
        el.removeEventListener('gesturestart', onGestureStart);
        el.removeEventListener('gesturechange', onGestureChange);
        el.removeEventListener('gestureend', onGestureEnd);
      }
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  /* While a zoom is locked, let one finger pan the card instead of
     scrolling the page. */
  useEffect(() => {
    const el = innerRef.current;
    if (el) el.style.touchAction = zoomed ? 'none' : '';
  }, [zoomed]);

  /* Escape releases a locked zoom. */
  useEffect(() => {
    if (!zoomed) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') resetCard();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* When the deck flips to another card, spring this one home. */
  const prevDiff = useRef(diff);
  useEffect(() => {
    if (prevDiff.current === diff) return;
    prevDiff.current = diff;
    if (gestureRef.current.pointers.size > 0) return;
    if (zoomLock.current || x.get() !== 0 || y.get() !== 0 || scale.get() !== 1) {
      resetCard();
    }
  });

  return (
    <motion.div
      className='villa-stack__card'
      style={{ zIndex: active ? 40 : deckZIndex }}
      animate={{ ...deckMotion, opacity: active ? 1 : deckMotion.opacity }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1 }}
    >
      <motion.div
        ref={innerRef}
        className={`villa-stack__card-inner${
          diff === 0 ? ' villa-stack__card-inner--current' : ''
        }${active ? ' villa-stack__card-inner--active' : ''}`}
        style={{ x, y, scale }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerLeave}
        onDoubleClick={onDoubleClick}
      >
        <img
          src={image.src}
          alt={image.alt}
          width='1600'
          height='900'
          loading={eager ? 'eager' : 'lazy'}
          decoding='async'
          draggable='false'
        />
        <div className='villa-stack__card-shade' aria-hidden='true' />
        <p className='villa-stack__card-label'>{image.label}</p>
      </motion.div>
    </motion.div>
  );
}

function VillaCardStack({ images }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(value * images.length))
    );
    setCurrentIndex(index);
  });

  const jumpTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = top + ((index + 0.5) / images.length) * scrollable;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className='villa-stack'
      style={{ height: `${images.length * 55 + 45}vh` }}
    >
      <div className='villa-stack__sticky'>
        <p className='villa-stack__guide'>The villa, room by room</p>

        <div className='villa-stack__deck'>
          {images.map((image, index) => {
            const diff = index - currentIndex;
            if (Math.abs(diff) > 2) return null;
            return (
              <InteractiveVillaCard
                key={image.src}
                image={image}
                diff={diff}
                eager={index < 2}
              />
            );
          })}
        </div>

        <div className='villa-stack__counter' aria-hidden='true'>
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(images.length).padStart(2, '0')}</span>
        </div>

        <div className='villa-stack__dots'>
          {images.map((image, index) => (
            <button
              key={image.src}
              type='button'
              className={
                index === currentIndex ? 'villa-stack__dot--active' : undefined
              }
              onClick={() => jumpTo(index)}
              aria-label={`Go to ${image.label}`}
            />
          ))}
        </div>

        <motion.div
          className='villa-stack__hint'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          aria-hidden='true'
        >
          <motion.svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <path d='M12 5v14M5 12l7-7 7 7' />
          </motion.svg>
          <span>Scroll to browse · drag, pinch or double-tap a card</span>
          <motion.svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <path d='M12 5v14M19 12l-7 7-7-7' />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}

function StaticGallery({ images }) {
  return (
    <div className='villa-static'>
      <div className='villa-static__grid'>
        {images.map((image) => (
          <figure key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              width='1600'
              height='900'
              loading='lazy'
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function VillaScrollJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <main className='villa-experience'>
      <section
        id='villas'
        className='villa-gallery'
        aria-labelledby='villa-gallery-title'
      >
        {/* Visually hidden (clipped to 1px) - it exists to label the section
            for assistive tech, so there is nothing here to animate. */}
        <h2 id='villa-gallery-title' className='villa-gallery__title'>
          Inside Ocean View Villas
        </h2>
        {reduceMotion ? (
          <StaticGallery images={villaImages} />
        ) : (
          <>
            <ZoomParallax images={heroImages} />
            <VillaCardStack images={stackImages} />
          </>
        )}
      </section>

      <section id='amenities' className='villa-proof'>
        <Reveal className='villa-proof__plan' y={34} duration={1}>
          <img
            src='/images/ovv/master-plan.webp'
            alt='Master plan showing the six Ocean View Villas on the beachfront site'
            loading='lazy'
            decoding='async'
          />
        </Reveal>
        <div className='villa-proof__content'>
          <Reveal as='p' className='villa-proof__lead' y={16} duration={0.7}>
            Six keys. One coastline.
          </Reveal>
          <RevealText delay={0.08}>
            A beachfront collection made deliberately scarce.
          </RevealText>
          <Reveal as='p' delay={0.18}>
            Every residence combines private outdoor living with the scale and
            service spaces of a permanent home - positioned between Colombo and
            Negombo with the airport within easy reach.
          </Reveal>
          <RevealGroup as='dl' delay={0.1} stagger={0.09}>
            <motion.div variants={revealChild}>
              <BedDouble aria-hidden='true' />
              <dt>Bedrooms</dt>
              <dd>4 per villa</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <Expand aria-hidden='true' />
              <dt>Built area</dt>
              <dd>5,500 sq ft</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <Waves aria-hidden='true' />
              <dt>Outdoor living</dt>
              <dd>Pool + garden</dd>
            </motion.div>
            <motion.div variants={revealChild}>
              <CarFront aria-hidden='true' />
              <dt>Private parking</dt>
              <dd>2-car garage</dd>
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      <section id='inquiry' className='villa-inquiry'>
        <Reveal as='p' y={16} duration={0.7}>
          Ocean View Villas / Uswetakeiyawa, Sri Lanka
        </Reveal>
        <RevealText delay={0.08} stagger={0.07}>
          Own one of six.
        </RevealText>
        <Reveal as='a' href='#register' delay={0.22}>
          Request the private presentation
          <ArrowUpRight aria-hidden='true' />
        </Reveal>
        <Reveal as='span' delay={0.3} y={14} duration={0.7}>
          +94 11 4 335 444
        </Reveal>
      </section>
    </main>
  );
}
