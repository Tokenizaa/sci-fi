import React from 'react';

// Using the generated panoramic sci-fi control room backdrop
const BG_IMAGE_PATH = '/src/assets/images/scifi_control_room_bg_1793541718927.jpg';

interface BackgroundEnvironmentProps {
  glowIntensity?: 'high' | 'medium' | 'subtle';
}

export const BackgroundEnvironment: React.FC<BackgroundEnvironmentProps> = ({
  glowIntensity = 'medium',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Photorealistic 3D sci-fi control room background */}
      <img
        src={BG_IMAGE_PATH}
        alt="Central de Operações Sci-Fi"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out filter brightness-[0.72] contrast-[1.12]"
      />

      {/* Atmospheric depth & readability scrims */}
      {/* 1. Deep navy radial vignette to focus center & preserve card contrast */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/60 to-[#02050f]/95" />

      {/* 2. Top-down ambient grid & header shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-transparent to-[#020617]/90" />

      {/* 3. Subtle horizontal scanline texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.6) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Ambient Lighting Layer: volumetric sci-fi halos behind the layout with vivid neon backlighting */}
      {glowIntensity !== 'subtle' && (
        <>
          {/* Top-center luminous cyan halo */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-cyan-500/18 rounded-full blur-[130px] pointer-events-none" />

          {/* Left command console blue & pink flare */}
          <div className="absolute top-1/4 -left-32 w-[580px] h-[580px] bg-pink-600/14 rounded-full blur-[150px] pointer-events-none animate-floating" />

          {/* Right tactical intelligence emerald-green neon accent */}
          <div className="absolute top-1/2 -right-24 w-[520px] h-[520px] bg-emerald-500/14 rounded-full blur-[140px] pointer-events-none animate-floating-delay" />

          {/* Lower bottom subtle neon red alert halo */}
          <div className="absolute -bottom-24 left-1/3 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      {/* Edge border tech illumination */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 via-pink-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </div>
  );
};
