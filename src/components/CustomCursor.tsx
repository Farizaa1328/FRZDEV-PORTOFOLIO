import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for trail
  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
        setIsPointer(!!clickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing Red Tracer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-crimson-500/70 dark:border-crimson-400/80 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          backgroundColor: isPointer ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
          boxShadow: isPointer ? '0 0 20px rgba(239, 68, 68, 0.4)' : '0 0 10px rgba(239, 68, 68, 0.2)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
        }}
      />

      {/* Inner Pinpoint Laser Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-crimson-500 -translate-x-1/2 -translate-y-1/2 shadow-glow-crimson"
        style={{
          x: cursorX,
          y: cursorY,
          width: isClicking ? 3 : 5,
          height: isClicking ? 3 : 5,
          transition: 'width 0.1s, height 0.1s',
        }}
      />
    </>
  );
};
