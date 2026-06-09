import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  className = '',
  once = true,
  animateOnMount = false,
}) => {
  // Define animation presets
  const presets = {
    'slide-up': {
      hidden: { y: 45, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    'slide-down': {
      hidden: { y: -45, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    'slide-left': {
      hidden: { x: 45, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    'slide-right': {
      hidden: { x: -45, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    'zoom-in': {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  // 1. mask revealing container clip
  if (variant === 'reveal-mask') {
    return (
      <motion.div
        initial="hidden"
        {...(animateOnMount ? { animate: 'visible' } : { whileInView: 'visible' })}
        viewport={{ once, margin: '-5%' }}
        className={`overflow-hidden relative ${className}`}
      >
        <motion.div
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
            visible: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
          }}
          transition={{
            duration: duration + 0.35,
            delay,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
          }}
          className="w-full h-full rounded-[inherit] overflow-hidden"
          style={{ willChange: 'clip-path, transform' }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  // 2. Word by word reveal
  if (variant === 'text-reveal-words') {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.045,
          delayChildren: delay,
        },
      },
    };

    const child = {
      hidden: { y: '105%', opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.75,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        {...(animateOnMount ? { animate: 'visible' } : { whileInView: 'visible' })}
        viewport={{ once, margin: '-5%' }}
        className={`inline-block ${className}`}
      >
        {words.map((word, idx) => (
          <span key={idx} className="word-wrap mr-[0.24em] pb-0.5">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // 3. Letter by letter reveal
  if (variant === 'letter-reveal') {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.012,
          delayChildren: delay,
        },
      },
    };

    const child = {
      hidden: { y: '108%', opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        {...(animateOnMount ? { animate: 'visible' } : { whileInView: 'visible' })}
        viewport={{ once, margin: '-5%' }}
        className={`inline-block ${className}`}
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="word-wrap mr-[0.22em] pb-1 whitespace-nowrap">
            {Array.from(word).map((char, charIdx) => (
              <motion.span key={charIdx} variants={child} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    );
  }

  // Default preset transitions
  const selectedPreset = presets[variant] || presets['slide-up'];

  return (
    <motion.div
      initial="hidden"
      {...(animateOnMount ? { animate: 'visible' } : { whileInView: 'visible' })}
      viewport={{ once, amount: threshold }}
      variants={selectedPreset}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Standardize to luxury exponential curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
