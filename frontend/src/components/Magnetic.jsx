import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const Magnetic = ({ children, strength = 0.35, className = '', style = {} }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from client mouse cursor to center of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 18, stiffness: 180, mass: 0.15 }}
      style={{ display: 'inline-block', ...style }}
      data-cursor-magnetic
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
