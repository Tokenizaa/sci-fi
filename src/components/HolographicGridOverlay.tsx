import React from 'react';

export const HolographicGridOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Holographic Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.045] transition-opacity duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Secondary Isometric Diamond Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 255, 102, 0.6) 1px, transparent 0)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Subtle Animated Holographic Scan Pulse Beam (Slow, low-noise sweep) */}
      <div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 via-[#00ff66]/20 to-transparent"
        style={{
          animation: 'holo-beam-scan 14s linear infinite',
        }}
      />

      {/* 4. Peripheral Tactical Corner Marks */}
      <div className="absolute top-20 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute top-20 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute bottom-6 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute bottom-6 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/20 pointer-events-none" />
    </div>
  );
};
