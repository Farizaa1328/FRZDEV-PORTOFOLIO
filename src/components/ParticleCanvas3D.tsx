import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export const ParticleCanvas3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let rawMouseX = width / 2;
    let rawMouseY = height / 2;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let cameraX = 0;
    let cameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      mouseX = (e.clientX - width / 2) * 0.45;
      mouseY = (e.clientY - height / 2) * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Cloud with Crimson-Onyx Palette
    const particleCount = Math.min(110, Math.floor((width * height) / 13000));
    const particles: Particle[] = [];
    const colors =
      theme === 'dark'
        ? ['#EF4444', '#DC2626', '#F87171', '#E11D48', '#FDA4AF', '#FFFFFF', '#FB7185']
        : ['#DC2626', '#EF4444', '#B91C1C', '#E11D48', '#475569', '#1E293B'];

    for (let i = 0; i < particleCount; i++) {
      const radius = 320 + Math.random() * 850;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const px = radius * Math.sin(phi) * Math.cos(theta);
      const py = (Math.random() - 0.5) * height * 1.3;
      const pz = radius * Math.cos(phi);

      particles.push({
        x: px,
        y: py,
        z: pz,
        originX: px,
        originY: py,
        originZ: pz,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const focalLength = 480;

    const render = () => {
      targetCameraX = mouseX;
      targetCameraY = mouseY;
      cameraX += (targetCameraX - cameraX) * 0.05;
      cameraY += (targetCameraY - cameraY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const projected: { x: number; y: number; scale: number; alpha: number; color: string; size: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > 1100) p.vx *= -1;
        if (Math.abs(p.y) > 1100) p.vy *= -1;
        if (Math.abs(p.z) > 1100) p.vz *= -1;

        const relX = p.x - cameraX;
        const relY = p.y - cameraY;
        const relZ = p.z + 650;

        if (relZ > 20) {
          const scale = focalLength / relZ;
          const projX = width / 2 + relX * scale;
          const projY = height / 2 + relY * scale;

          // Subtle gravitational swirl toward cursor
          const dx = rawMouseX - projX;
          const dy = rawMouseY - projY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 10) {
            const force = (140 - dist) * 0.00015;
            p.vx += dx * force;
            p.vy += dy * force;
          }

          const alpha = Math.min(1, Math.max(0.12, (1250 - relZ) / 1050));

          projected.push({
            x: projX,
            y: projY,
            scale,
            alpha,
            color: p.color,
            size: p.size * scale,
          });
        }
      }

      // Draw constellation laser lines
      ctx.lineWidth = 0.55;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * p1.alpha * p2.alpha * (theme === 'dark' ? 0.28 : 0.16);
            ctx.strokeStyle = `rgba(239, 68, 68, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D glowing particle nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.size), 0, Math.PI * 2);
        ctx.fill();

        if (p.scale > 0.8) {
          ctx.globalAlpha = p.alpha * 0.22;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: theme === 'dark' ? 0.9 : 0.65 }}
    />
  );
};
