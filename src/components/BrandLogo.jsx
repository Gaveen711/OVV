import React from 'react';

/**
 * Official Brand Logo Component for Ocean View Villas.
 * 
 * Supports:
 * - variant: 'full' (Mark + "OCEAN VIEW VILLAS" text) | 'mark' (OVV symbol only)
 * - theme: 'light' (Deep Ocean Blue mark for light backgrounds) | 'dark' (White/Ice Blue mark for dark backgrounds)
 * - markClassName: custom class for the OVV monogram
 * - textClassName: custom class for the "OCEAN VIEW VILLAS" text
 * - className: wrapper class
 */
export default function BrandLogo({
  variant = 'full',
  theme = 'light',
  className = '',
  markClassName = 'h-7 md:h-8 w-auto',
  textClassName = '',
  alt = 'Ocean View Villas',
}) {
  const isDark = theme === 'dark';

  if (variant === 'mark') {
    return (
      <img
        src={isDark ? '/images/ovv-mark-white.png' : '/images/ovv-mark.png'}
        alt={alt}
        className={`inline-block object-contain select-none ${markClassName} ${className}`}
        loading='eager'
        decoding='async'
      />
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-1.5 select-none ${className}`}>
      <img
        src={isDark ? '/images/ovv-mark-white.png' : '/images/ovv-mark.png'}
        alt={alt}
        className={`inline-block object-contain transition-all duration-300 ${markClassName}`}
        loading='eager'
        decoding='async'
      />
      <span
        className={`font-sans text-[6.5px] md:text-[7.5px] font-medium tracking-[0.28em] uppercase text-center whitespace-nowrap leading-none transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-[#333333]'
        } ${textClassName}`}
      >
        OCEAN VIEW VILLAS
      </span>
    </div>
  );
}

