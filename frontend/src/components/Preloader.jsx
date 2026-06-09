import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOADER_QUOTES = [
  "In search of fleeting poetry...",
  "Sourcing organic silhouettes...",
  "Draping stems in raw form...",
  "Fleur L’Atelier"
];

// Stylized linear flower that blossoms dynamically based on loader progress
const PreloaderFlower = ({ progress }) => {
  const t = progress / 100;
  
  // Stem Bezier curve parameters (M 100 170 Q 90 120 100 70)
  // B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
  const flowerX = 100 - 20 * t + 20 * t * t;
  const flowerY = 170 - 100 * t;
  
  // Blossoming animation starts when stem is 70% grown
  const blossom = progress < 70 ? 0 : (progress - 70) / 30; // 0 to 1

  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24 md:w-32 md:h-32 text-brand-gold mb-4 md:mb-0">
      {/* Growing Stem */}
      <motion.path
        d="M 100 170 Q 90 120 100 70"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: t }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      />
      {/* Growing Leaf Left */}
      <motion.g
        animate={{
          x: 95.2,
          y: 130,
          scale: progress > 40 ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 90 }}
        style={{ originX: 0, originY: 0 }}
      >
        <path
          d="M 0 0 Q -25 -10 -20 -22 Q -2 -17 1 -5"
          fill="currentColor"
          opacity="0.8"
        />
      </motion.g>
      {/* Growing Leaf Right */}
      <motion.g
        animate={{
          x: 95.45,
          y: 105,
          scale: progress > 65 ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 90 }}
        style={{ originX: 0, originY: 0 }}
      >
        <path
          d="M 0 0 Q 22 -10 18 -22 Q 2 -17 1 -5"
          fill="currentColor"
          opacity="0.8"
        />
      </motion.g>
      {/* Blossoming Flower Head */}
      <motion.g
        animate={{
          x: flowerX,
          y: flowerY,
          scale: t * 1.1
        }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      >
        {/* Outer Petal Ring */}
        <circle cx="0" cy="0" r="16" fill="currentColor" opacity="0.15" />
        <circle cx={-10 * blossom} cy={-10 * blossom} r="11" fill="currentColor" opacity="0.35" />
        <circle cx={10 * blossom} cy={-10 * blossom} r="11" fill="currentColor" opacity="0.35" />
        <circle cx={-10 * blossom} cy={10 * blossom} r="11" fill="currentColor" opacity="0.35" />
        <circle cx={10 * blossom} cy={10 * blossom} r="11" fill="currentColor" opacity="0.35" />
        {/* Inner Bloom Petals */}
        <circle cx="0" cy={-8 * blossom} r="8" fill="var(--color-brand-rose)" opacity="0.9" />
        <circle cx="0" cy={8 * blossom} r="8" fill="var(--color-brand-rose)" opacity="0.9" />
        <circle cx={-8 * blossom} cy="0" r="8" fill="var(--color-brand-rose)" opacity="0.9" />
        <circle cx={8 * blossom} cy={0} r="8" fill="var(--color-brand-rose)" opacity="0.9" />
        <circle cx="0" cy="0" r="6" fill="var(--color-brand-gold)" />
      </motion.g>
    </svg>
  );
};

// Subtle background flower watermark bottom-right
const BackgroundFlowerRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="absolute -right-24 -bottom-24 w-[55vw] h-[55vw] max-w-[500px] text-brand-gold/5 pointer-events-none animate-pulse z-0"
    style={{ animationDuration: '8s' }}
  >
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.4" fill="none" />
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.4" fill="none" />
    <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.4" fill="none" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x = 50 + Math.cos(angle) * 25;
      const y = 50 + Math.sin(angle) * 25;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="15"
          stroke="currentColor"
          strokeWidth="0.2"
          fill="none"
        />
      );
    })}
  </svg>
);

// Subtle background flower watermark top-left
const BackgroundFlowerLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="absolute -left-20 -top-20 w-[40vw] h-[40vw] max-w-[350px] text-brand-gold/5 pointer-events-none animate-pulse z-0"
    style={{ animationDuration: '10s' }}
  >
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.4" fill="none" />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.4" fill="none" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x = 50 + Math.cos(angle) * 20;
      const y = 50 + Math.sin(angle) * 20;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="12"
          stroke="currentColor"
          strokeWidth="0.2"
          fill="none"
        />
      );
    })}
  </svg>
);

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Quote rotation timed to match loading duration
    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev < PRELOADER_QUOTES.length - 1 ? prev + 1 : prev));
    }, 650);

    // Percentage counter
    const startTime = Date.now();
    const duration = 2000; // 2.0 seconds loading

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 150); // Start hero reveal animations 150ms into the 900ms exit slide
        }, 150);
      }
    };

    requestAnimationFrame(updateCounter);

    return () => {
      clearInterval(quoteInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ 
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] }
          }}
          className="fixed inset-0 z-50 bg-brand-olive text-brand-cream flex flex-col justify-between p-8 md:p-16 select-none pointer-events-none overflow-hidden"
        >
          {/* Faint Background Floral Watermarks */}
          <BackgroundFlowerRight />
          <BackgroundFlowerLeft />

          {/* Top Details */}
          <div className="flex justify-between items-center text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold z-10">
            <span>FLEUR L’ATELIER</span>
            <span>KOLKATA, WEST BENGAL — EST. 2026</span>
          </div>

          {/* Central Rotating Quotes & Growing Flower */}
          <div className="my-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full max-w-4xl mx-auto z-10">
            <div className="flex justify-center items-center">
              <PreloaderFlower progress={progress} />
            </div>

            <div className="max-w-xl flex-1 w-full text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-3xl md:text-5xl italic leading-relaxed text-brand-rose"
                >
                  {PRELOADER_QUOTES[quoteIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex justify-between items-end border-t border-brand-cream/10 pt-6 z-10">
            <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold">
              ATELIER AWAKENING
            </span>
            <div className="font-serif text-7xl md:text-9xl leading-none font-light tracking-tighter text-brand-gold flex items-baseline">
              <span>{progress.toString().padStart(3, '0')}</span>
              <span className="text-sm md:text-lg ml-2 font-display uppercase tracking-widest text-brand-sage font-bold">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
