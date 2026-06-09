import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Position values for the main dot and outer circle
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for the smooth follow effect
  const springConfig = { damping: 40, stiffness: 280, mass: 0.6 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if target is hovering over interactive elements with cursor attributes
      const target = e.target;
      const hoverable = target.closest('[data-cursor-text], [data-cursor-expand], a, button, select, input[type="submit"]');

      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot follows mouse exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-olive rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Spring-animated outer circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-olive pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (cursorText ? 76 : 40) : 24,
          height: isHovered ? (cursorText ? 76 : 40) : 24,
          backgroundColor: isHovered && cursorText ? 'rgba(28, 45, 31, 0.9)' : 'rgba(28, 45, 31, 0)',
          borderColor: isHovered ? 'rgba(28, 45, 31, 0.4)' : 'rgba(28, 45, 31, 0.8)',
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-display uppercase tracking-widest text-brand-cream font-bold text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
