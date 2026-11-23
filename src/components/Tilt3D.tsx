import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
  spotlight?: boolean;
  spotlightColor?: string;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  maxTilt = 7, // Subtle, weighted professional angle
  scale = 1.015,
  glare = true,
  perspective = 1200,
  spotlight = true,
  spotlightColor = 'rgba(239, 68, 68, 0.2)', // Crimson Red Spotlight
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Raw pixel coordinates for the spotlight beam
  const mousePixelX = useMotionValue(0);
  const mousePixelY = useMotionValue(0);

  // High-precision physical spring: heavy, solid feel
  const springConfig = { damping: 30, stiffness: 400, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Calibrated rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Smooth Glare Coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mousePx = e.clientX - rect.left;
    const mousePy = e.clientY - rect.top;

    mousePixelX.set(mousePx);
    mousePixelY.set(mousePy);

    const xPct = mousePx / rect.width - 0.5;
    const yPct = mousePy / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-all duration-300 will-change-transform ${className}`}
      >
        {children}

        {/* 1. Dynamic Cursor Spotlight (Crimson Red Beam) */}
        {spotlight && (
          <motion.div
            style={{
              background: `radial-gradient(400px circle at ${mousePixelX}px ${mousePixelY}px, ${spotlightColor}, transparent 80%)`,
              transform: 'translateZ(1px)',
            }}
            className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* 2. Professional Specular Glare Reflection */}
        {glare && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              transform: 'translateZ(2px)',
            }}
            className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </motion.div>
    </div>
  );
};
