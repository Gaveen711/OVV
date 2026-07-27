import { Fragment, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT, VIEWPORT } from './motionTokens';
import './Reveal.css';

/**
 * Fade-and-rise wrapper for any block of content.
 *
 * `as` lets it take over an existing element's tag so it does not add a
 * layout-affecting wrapper div inside grid layouts.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  duration = 0.85,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered container - children using `revealChild` animate in sequence.
 * Use when several sibling elements should cascade rather than move together.
 */
export function RevealGroup({
  children,
  as = 'div',
  delay = 0,
  stagger = 0.08,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial='hidden'
      whileInView='visible'
      viewport={VIEWPORT}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Word-by-word masked reveal for headings - each word rises out of its own
 * clipping box on a stagger.
 *
 * Only for short display copy. Body paragraphs are left as single text nodes
 * so screen readers and text selection are not fragmented across dozens of
 * spans, and so the stagger does not run long enough to feel slow.
 */
export function RevealText({
  children,
  as = 'h2',
  delay = 0,
  stagger = 0.055,
  duration = 0.95,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const Tag = motion[as] ?? motion.h2;
  const Plain = as;

  if (reduce || typeof children !== 'string') {
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag
      className={className}
      initial='hidden'
      whileInView='visible'
      viewport={VIEWPORT}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      onAnimationComplete={() => setDone(true)}
      {...rest}
    >
      {/* The full string is exposed to assistive tech as one label; the visual
          word spans are hidden from it to avoid a stuttered read-out. */}
      <span className='sr-only'>{children}</span>
      <span aria-hidden='true'>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className='reveal-word-mask'>
              <motion.span
                className='reveal-word'
                data-revealed={done ? 'true' : 'false'}
                variants={{
                  // 130%, not 100%: the mask is padded taller than the word,
                  // so a 100% shift would leave the glyph tops still showing.
                  hidden: { y: '130%' },
                  visible: { y: '0%', transition: { duration, ease: EASE_OUT } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {/* Separator sits outside the mask - inside it would be clipped
                and the words would run together. */}
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
