import React from 'react';

/**
 * Reusable animated CTA button with horizontal sliding SVG arrow and expanding underline.
 */
export default function CtaButton({
  label,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  showArrow = true,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`cta ${className}`}
    >
      <span className='hover-underline-animation'>{label}</span>
      {showArrow && (
        <svg
          id='arrow-horizontal'
          xmlns='http://www.w3.org/2000/svg'
          width={22}
          height={8}
          viewBox='0 0 46 16'
        >
          <path
            id='Path_10'
            data-name='Path 10'
            d='M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z'
            transform='translate(30)'
          />
        </svg>
      )}
    </button>
  );
}
