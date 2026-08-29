import React from 'react';
import { motion } from 'framer-motion';

/**
 * Apple-style Ultra Smooth Scroll Reveal Component
 * Minimal, sleek, iPhone-like blur-to-clear & fade-slide entrance animation.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 28,
  blur = 8,
  className = "",
  direction = "up",
}) {
  const getInitialY = () => {
    if (direction === "up") return yOffset;
    if (direction === "down") return -yOffset;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return yOffset;
    if (direction === "right") return -yOffset;
    return 0;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: getInitialY(),
        x: getInitialX(),
        filter: blur ? `blur(${blur}px)` : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Iconic Apple fluid cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
