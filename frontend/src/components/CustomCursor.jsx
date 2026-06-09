import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);

  // Base mouse pointer coordinates (always follows mouse exactly)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth trailing outer ring
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update inner dot coordinate
      mouseX.set(clientX);
      mouseY.set(clientY);

      const target = e.target;
      if (!target) return;

      // Check for hover interactive elements
      const hoverable = target.closest('[data-cursor-text], [data-cursor-expand], a, button, select, input[type="submit"]');
      const magneticTarget = target.closest('[data-cursor-magnetic]');

      if (magneticTarget) {
        setIsMagnetic(true);
        const rect = magneticTarget.getBoundingClientRect();
        // Snap the outer spring-ring directly to the center of the magnetic item
        circleX.set(rect.left + rect.width / 2);
        circleY.set(rect.top + rect.height / 2);
      } else {
        setIsMagnetic(false);
        // Follow cursor pointer coordinate
        circleX.set(clientX);
        circleY.set(clientY);
      }

      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, circleX, circleY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny inner dot following cursor 1:1 */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-olive rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Spring outer circle snapping dynamically to magnetic zones */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-olive pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (cursorText ? 76 : 42) : 22,
          height: isHovered ? (cursorText ? 76 : 42) : 22,
          backgroundColor: isHovered && cursorText ? 'rgba(28, 45, 31, 0.95)' : 'rgba(28, 45, 31, 0)',
          borderColor: isMagnetic ? 'rgba(197, 168, 128, 0.85)' : (isHovered ? 'rgba(28, 45, 31, 0.35)' : 'rgba(28, 45, 31, 0.7)'),
          borderWidth: isMagnetic ? '2px' : '1px',
        }}
        animate={{
          scale: isHovered ? 1.15 : (isMagnetic ? 1.25 : 1),
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-display uppercase tracking-widest text-brand-cream font-bold text-center px-1.5"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
