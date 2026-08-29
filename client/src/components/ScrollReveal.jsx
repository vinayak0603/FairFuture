import React from 'react';
import { motion } from 'framer-motion';

/**
 * Apple-style Ultra Smooth Scroll Reveal Component
 * Snappy, responsive, iPhone-like blur-to-clear & fade-slide entrance animation.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 18,
  blur = 4,
  className = "",
  direction = "up",
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getInitialY = () => {
    const offset = isMobile ? Math.min(yOffset, 12) : yOffset;
    if (direction === "up") return offset;
    if (direction === "down") return -offset;
    return 0;
  };

  const getInitialX = () => {
    const offset = isMobile ? Math.min(yOffset, 12) : yOffset;
    if (direction === "left") return offset;
    if (direction === "right") return -offset;
    return 0;
  };

  // Reduce delay & duration on mobile for instant, crisp responsiveness
  const effectiveDelay = isMobile ? Math.min(delay * 0.3, 0.06) : delay;
  const effectiveDuration = isMobile ? 0.38 : duration;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: getInitialY(),
        x: getInitialX(),
        filter: blur ? `blur(${isMobile ? 2 : blur}px)` : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '40px' }}
      transition={{
        duration: effectiveDuration,
        delay: effectiveDelay,
        ease: [0.16, 1, 0.3, 1], // Iconic Apple fluid cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
