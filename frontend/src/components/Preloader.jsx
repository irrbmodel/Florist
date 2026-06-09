import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOADER_QUOTES = [
  "In search of fleeting poetry...",
  "Sourcing organic silhouettes...",
  "Draping stems in raw form...",
  "Fleur L’Atelier"
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Quote rotation
    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev < PRELOADER_QUOTES.length - 1 ? prev + 1 : prev));
    }, 800);

    // Percentage counter
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds loading

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
          }, 900); // Allow clip-path exit transitions to finish
        }, 200);
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
          className="fixed inset-0 z-50 bg-brand-olive text-brand-cream flex flex-col justify-between p-8 md:p-16 select-none pointer-events-none"
        >
          {/* Top Details */}
          <div className="flex justify-between items-center text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold">
            <span>FLEUR L’ATELIER</span>
            <span>PARIS — EST. 2026</span>
          </div>

          {/* Central Rotating Quotes */}
          <div className="my-auto max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-serif text-3xl md:text-5xl italic text-left leading-relaxed text-brand-rose"
              >
                {PRELOADER_QUOTES[quoteIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex justify-between items-end border-t border-brand-cream/10 pt-6">
            <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold">
              SYSTEM INITIALIZED
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
