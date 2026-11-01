import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  depth: number; // 0 (far), 1 (mid), 2 (near)
  color: string;
  glowColor: string;
  oscillationSpeed: number;
  oscillationAngle: number;
  oscillationRadius: number;
}

interface ParticleCanvasProps {
  intensity?: 'high' | 'medium' | 'low' | 'off';
  interactive?: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  intensity = 'high',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (intensity === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    // Particle count scale
    let particleCount = isMobile ? 35 : 75;
    if (intensity === 'medium') particleCount = Math.floor(particleCount * 0.65);
    if (intensity === 'low') particleCount = Math.floor(particleCount * 0.35);

    const particles: Particle[] = [];
    const colors = [
      { core: 'rgba(0, 240, 255, ', glow: 'rgba(0, 240, 255, ' }, // Luminous Cyan
      { core: 'rgba(255, 0, 128, ', glow: 'rgba(255, 0, 128, ' }, // Neon Pink / Magenta
      { core: 'rgba(0, 255, 102, ', glow: 'rgba(0, 255, 102, ' }, // Neon Emerald Green
      { core: 'rgba(255, 23, 68, ', glow: 'rgba(255, 23, 68, ' }, // Neon Alert Red
      { core: 'rgba(56, 189, 248, ', glow: 'rgba(37, 99, 235, ' }, // Sky Blue / Electric Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random() < 0.25 ? 2 : Math.random() < 0.6 ? 1 : 0;
      const baseRadius = depth === 2 ? Math.random() * 2.2 + 1.8 : depth === 1 ? Math.random() * 1.5 + 1.0 : Math.random() * 1.0 + 0.6;
      const baseAlpha = depth === 2 ? Math.random() * 0.3 + 0.35 : depth === 1 ? Math.random() * 0.25 + 0.2 : Math.random() * 0.15 + 0.1;
      const palette = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (depth === 2 ? 0.35 : depth === 1 ? 0.25 : 0.15),
        vy: (Math.random() - 0.5) * (depth === 2 ? 0.35 : depth === 1 ? 0.25 : 0.15) - 0.1, // Subtle upward atmospheric drift
        radius: baseRadius,
        baseRadius,
        alpha: baseAlpha,
        baseAlpha,
        depth,
        color: palette.core,
        glowColor: palette.glow,
        oscillationSpeed: Math.random() * 0.02 + 0.005,
        oscillationAngle: Math.random() * Math.PI * 2,
        oscillationRadius: Math.random() * 1.5 + 0.5,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const maxConnectionDistance = isMobile ? 85 : 120;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connections between nearby particles (tactical sci-fi node constellation)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.12 * Math.min(particles[i].alpha, particles[j].alpha);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render individual particles with glow and organic drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic oscillation
        p.oscillationAngle += p.oscillationSpeed;
        const ox = Math.cos(p.oscillationAngle) * p.oscillationRadius;
        const oy = Math.sin(p.oscillationAngle) * p.oscillationRadius;

        p.x += p.vx + ox * 0.1;
        p.y += p.vy + oy * 0.1;

        // Wrap around screen edges seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Subtle mouse interaction (deflection / proximity shine)
        if (mouseRef.current.active) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const force = (1 - mDist / 140) * 0.6;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
            p.alpha = Math.min(0.85, p.baseAlpha + (1 - mDist / 140) * 0.35);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Foreground particle volumetric glow
        if (p.depth >= 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * (p.depth === 2 ? 3.5 : 2.2), 0, Math.PI * 2);
          ctx.fillStyle = `${p.glowColor}${p.alpha * 0.22})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, interactive]);

  if (intensity === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
