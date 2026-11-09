import { useEffect, useState } from 'react';

export default function useScrollUpVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastPosition = window.scrollY;

    const handleScroll = () => {
      const position = window.scrollY;
      if (position <= 24) {
        setVisible(true);
        lastPosition = position;
        return;
      }

      const movement = position - lastPosition;
      if (Math.abs(movement) >= 8) {
        setVisible(movement < 0);
        lastPosition = position;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible;
}
