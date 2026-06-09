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
          playOpenChord();
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

  // Synthesizes a gorgeous, pure, major 7th opening chime chord
  const playOpenChord = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playSine = (freq, delay, volume, duration) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration + 0.1);
      };

      const now = 0;
      // Majestic major 7th chord: C4, G4, C5, E5, B5
      playSine(261.63, now, 0.03, 1.8);
      playSine(392.00, now + 0.08, 0.02, 1.6);
      playSine(523.25, now + 0.16, 0.02, 1.4);
      playSine(659.25, now + 0.24, 0.02, 1.2);
      playSine(987.77, now + 0.32, 0.015, 1.0);
    } catch (e) {
      console.warn("Chime play error: ", e);
    }
  };

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
