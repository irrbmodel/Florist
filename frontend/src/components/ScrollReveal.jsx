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
}) => {
  // Define animation presets
  const presets = {
    'slide-up': {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    'slide-down': {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    'slide-left': {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    'slide-right': {
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    'zoom-in': {
      hidden: { scale: 0.94, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  if (variant === 'reveal-mask') {
    return (
      <div className={`overflow-hidden relative ${className}`}>
        <motion.div
          initial={{ y: '102%', scale: 1.1 }}
          whileInView={{ y: 0, scale: 1 }}
          viewport={{ once, margin: '-5%' }}
          transition={{
            duration: duration + 0.2,
            delay,
            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for luxury feel
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (variant === 'text-reveal-words') {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: delay,
        },
      },
    };

    const child = {
      hidden: { y: '110%', opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.215, 0.61, 0.355, 1],
        },
      },
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-5%' }}
        className={`inline-block ${className}`}
      >
        {words.map((word, idx) => (
          <span key={idx} className="word-wrap mr-[0.25em] pb-1">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Default variants
  const selectedPreset = presets[variant] || presets['slide-up'];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedPreset}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
