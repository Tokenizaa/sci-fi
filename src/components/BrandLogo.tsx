import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Sci-Fi Radar / Target Brand Mark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {/* Ambient glow backdrop */}
        <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-md" />

        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#0c1a3a] to-[#040918] border border-cyan-400/40 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-cyan-400"
          >
            {/* Concentric intelligence radar rings */}
            <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.8" />
            
            {/* Targeting reticles */}
            <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Core signal node */}
            <circle cx="20" cy="20" r="2.5" fill="#00f0ff" />
            
            {/* Dynamic radar sweep beam */}
            <path
              d="M20 20 L31 9 A 17 17 0 0 0 20 3 Z"
              fill="url(#radarGradient)"
              opacity="0.35"
            />
            <defs>
              <linearGradient id="radarGradient" x1="20" y1="20" x2="31" y2="9" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00f0ff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-extrabold tracking-tight text-white ${textSizes[size]}`}>
            Mais<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Clientes</span>
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded tracking-wider shadow-[0_0_8px_rgba(0,240,255,0.2)]">
            V2
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-mono text-cyan-400/70 tracking-widest uppercase mt-0.5">
            Command Center
          </span>
        )}
      </div>
    </div>
  );
};
