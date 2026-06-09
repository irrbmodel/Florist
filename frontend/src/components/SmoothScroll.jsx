import React, { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext({
  lenis: null,
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync layout
    document.documentElement.classList.add('lenis');

    // Handle initial hash scrolls gracefully
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          lenis.scrollTo(el, { offset: 0, duration: 1.5 });
        }, 500);
      }
    }

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
