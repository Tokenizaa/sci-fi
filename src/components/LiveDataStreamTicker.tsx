import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, Radio, Activity } from 'lucide-react';

export const LiveDataStreamTicker: React.FC = () => {
  const events = [
    { label: 'SYSTEM STATUS', val: 'STABLE // NOMINAL', color: 'text-emerald-400', icon: Activity },
    { label: 'PROSPECTING ENGINE', val: 'ACTIVE [CLUSTER BR-EAST]', color: 'text-cyan-400', icon: Zap },
    { label: 'CONNECTION', val: 'SECURE (TLS 1.3 // 256-BIT)', color: 'text-emerald-400', icon: Shield },
    { label: 'LATENCY', val: '32MS // GOOGLE PLACES', color: 'text-sky-300', icon: Radio },
    { label: 'WHATSAPP GATEWAY', val: 'OPERATIONAL [98.4%]', color: 'text-[#00ff66]', icon: Activity },
    { label: 'RADAR DOPPLER', val: '360° SWEEP ACTIVE', color: 'text-pink-400', icon: Radio },
    { label: 'PROXY MESH', val: '18 NODES SYNCHRONIZED', color: 'text-cyan-300', icon: Zap },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth cyclic transition between events every 3.5s with subtle typing/fade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [events.length]);

  const current = events[currentIndex];
  const Icon = current.icon;

  return (
    <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#030919]/90 border border-cyan-500/25 shadow-[0_0_15px_rgba(0,240,255,0.12),inset_0_0_10px_rgba(0,240,255,0.06)] min-w-[340px] max-w-[440px] select-none group">
      {/* Blinking Terminal Prefix */}
      <div className="flex items-center gap-1.5 shrink-0 text-cyan-400 font-mono text-xs">
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Dynamic Event Carousel */}
      <div className="flex-1 min-w-0 font-mono text-xs overflow-hidden">
        <div
          key={currentIndex}
          className="flex items-center gap-2 truncate animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <span className="text-slate-400 tracking-wider text-[11px] font-semibold shrink-0">
            {current.label}:
          </span>
          <span className={`font-bold truncate tracking-wide ${current.color}`}>
            {current.val}
          </span>
        </div>
      </div>

      {/* Progress tick bar */}
      <div className="hidden xl:flex items-center gap-0.5 shrink-0">
        {events.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-3 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                : 'w-1 bg-slate-700/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
