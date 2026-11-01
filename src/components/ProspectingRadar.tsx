import React, { useState, useEffect } from 'react';
import {
  Radio,
  Crosshair,
  Sparkles,
  Zap,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Flame,
  Activity,
  Layers,
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { LeadItem } from '../types';

const RADAR_MAP_IMAGE = '/src/assets/images/tactical_radar_map_1793542783612.jpg';

interface RadarBlip {
  id: string;
  name: string;
  category: string;
  distance: string;
  angle: number; // degrees 0-360
  radiusPercent: number; // 20% to 90%
  color: 'cyan' | 'pink' | 'green' | 'red';
  phone: string;
  city: string;
  timestamp: string;
}

interface ProspectingRadarProps {
  onSelectLeadPreview?: (name: string) => void;
  onNavigateToColeta?: () => void;
  isLiveScraping?: boolean;
  targetCity?: string;
  targetNiche?: string;
}

export const ProspectingRadar: React.FC<ProspectingRadarProps> = ({
  onSelectLeadPreview,
  onNavigateToColeta,
  isLiveScraping = false,
  targetCity = 'São Paulo, SP',
  targetNiche = 'Clínicas & Estabelecimentos',
}) => {
  const [selectedBlip, setSelectedBlip] = useState<RadarBlip | null>(null);
  const [detectionCount, setDetectionCount] = useState(148);
  const [currentAzimuth, setCurrentAzimuth] = useState(142);
  const [recentDetections, setRecentDetections] = useState<RadarBlip[]>([]);

  // Initial radar blips with rich tactical positions
  const [blips, setBlips] = useState<RadarBlip[]>([
    {
      id: 'blip-1',
      name: 'Clínica Odonto Prime Jardins',
      category: 'Odontologia & Implantes',
      distance: '2.4 km',
      angle: 45,
      radiusPercent: 42,
      color: 'green',
      phone: '(11) 98422-9010',
      city: 'São Paulo',
      timestamp: '06:12:04',
    },
    {
      id: 'blip-2',
      name: 'Bistrô Fogo & Parrilla Lux',
      category: 'Restaurantes',
      distance: '4.8 km',
      angle: 135,
      radiusPercent: 68,
      color: 'pink',
      phone: '(11) 97110-3344',
      city: 'São Paulo',
      timestamp: '06:11:50',
    },
    {
      id: 'blip-3',
      name: 'Iron Tech Fitness 24h Faria Lima',
      category: 'Academias',
      distance: '1.8 km',
      angle: 220,
      radiusPercent: 32,
      color: 'cyan',
      phone: '(11) 3045-8822',
      city: 'São Paulo',
      timestamp: '06:11:25',
    },
    {
      id: 'blip-4',
      name: 'Alphaville Real Estate Brokers',
      category: 'Imobiliárias',
      distance: '8.5 km',
      angle: 310,
      radiusPercent: 84,
      color: 'red',
      phone: '(11) 4195-2000',
      city: 'Barueri',
      timestamp: '06:10:55',
    },
    {
      id: 'blip-5',
      name: 'Harmonize Dermatologia & Estética',
      category: 'Estética Avançada',
      distance: '3.1 km',
      angle: 85,
      radiusPercent: 55,
      color: 'pink',
      phone: '(11) 97722-4411',
      city: 'São Paulo',
      timestamp: '06:10:12',
    },
    {
      id: 'blip-6',
      name: 'Centro Veterinário PetCare Jardins',
      category: 'Clínicas Veterinárias',
      distance: '5.2 km',
      angle: 190,
      radiusPercent: 72,
      color: 'green',
      phone: '(11) 3088-7711',
      city: 'São Paulo',
      timestamp: '06:09:40',
    },
  ]);

  // Periodic random target acquisition to keep the sci-fi cockpit alive
  useEffect(() => {
    const interval = setInterval(() => {
      const angles = [25, 75, 115, 160, 210, 260, 305, 340];
      const colors: ('cyan' | 'pink' | 'green' | 'red')[] = ['green', 'pink', 'cyan', 'red'];
      const randomAngle = angles[Math.floor(Math.random() * angles.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.floor(25 + Math.random() * 65);

      const sampleNames = [
        'Studio Pilates & Saúde Moema',
        'Hospital Veterinário 24h Morumbi',
        'Advocacia Empresarial Jardins',
        'Consultório Sorriso Perfeito',
        'Café Gourmet & Bistrô Batel',
        'Estética Dental Dr. Ricardo',
      ];
      const chosenName = sampleNames[Math.floor(Math.random() * sampleNames.length)];

      const newBlip: RadarBlip = {
        id: `blip-${Date.now()}`,
        name: chosenName,
        category: targetNiche,
        distance: `${(randomRadius * 0.1).toFixed(1)} km`,
        angle: randomAngle,
        radiusPercent: randomRadius,
        color: randomColor,
        phone: `(11) 9${Math.floor(8000 + Math.random() * 1999)}-${Math.floor(1000 + Math.random() * 8999)}`,
        city: targetCity.split(',')[0] || 'São Paulo',
        timestamp: new Date().toTimeString().split(' ')[0],
      };

      setBlips((prev) => [newBlip, ...prev.slice(0, 7)]);
      setDetectionCount((c) => c + 1);
      setCurrentAzimuth(Math.floor(Math.random() * 360));
      setRecentDetections((prev) => [newBlip, ...prev.slice(0, 3)]);
    }, isLiveScraping ? 2500 : 4500);

    return () => clearInterval(interval);
  }, [isLiveScraping, targetCity, targetNiche]);

  const getBlipColorClasses = (color: RadarBlip['color']) => {
    switch (color) {
      case 'pink':
        return {
          core: 'bg-[#ff007f]',
          glow: 'rgba(255, 0, 128, 0.9)',
          text: 'text-pink-400',
          border: 'border-pink-500/60',
          badge: 'bg-pink-950/80 text-pink-300 border-pink-500/50',
        };
      case 'green':
        return {
          core: 'bg-[#00ff66]',
          glow: 'rgba(0, 255, 102, 0.9)',
          text: 'text-emerald-400',
          border: 'border-emerald-500/60',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
        };
      case 'red':
        return {
          core: 'bg-[#ff003c]',
          glow: 'rgba(255, 0, 60, 0.9)',
          text: 'text-red-400',
          border: 'border-red-500/60',
          badge: 'bg-red-950/80 text-red-300 border-red-500/50',
        };
      case 'cyan':
      default:
        return {
          core: 'bg-[#00f0ff]',
          glow: 'rgba(0, 240, 255, 0.9)',
          text: 'text-cyan-400',
          border: 'border-cyan-500/60',
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50',
        };
    }
  };

  return (
    <div className="relative z-10 w-full mb-6 ambilight-card animate-floating">
      {/* PHILIPS AMBILIGHT DYNAMIC BACKLIGHT GLOW (Emanação radiante de luz do fundo do card expandindo ao redor) */}
      <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#ff007f]/55 via-[#00f0ff]/65 to-[#00ff66]/55 blur-3xl opacity-95 pointer-events-none -z-10" />

      {/* Main Radar Card Container with 2.5px LED Tube Border & Outward Expanding Glow */}
      <div className="scifi-panel led-tube-cyan rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden">
        {/* Top edge neon running highlight */}
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#ff007f] to-transparent pointer-events-none" />

        {/* Ambient Corner Sci-Fi Flairs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff007f]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00ff66]/12 rounded-full blur-3xl pointer-events-none" />

        {/* Header Strip of Radar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cyan-500/20 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff007f]"></span>
              </span>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-300 to-[#00ff66]">
                Radar de Prospecção Geográfica · Varredura Ativa
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-950/80 text-pink-300 border border-pink-500/40 shadow-[0_0_12px_rgba(255,0,128,0.35)]">
                {isLiveScraping ? 'VARREDURA EM CURSO' : 'RADAR ONLINE 360°'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Localização de Estabelecimentos no Mapa</span>
              <span className="text-xs font-mono text-cyan-300 font-normal px-2.5 py-0.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30">
                {targetCity}
              </span>
            </h3>
          </div>

          {/* Quick Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-xl bg-[#04091a]/90 border border-cyan-500/30 text-xs font-mono flex items-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-slate-400">Alvos Identificados:</span>
              <span className="text-cyan-300 font-bold tabular-nums">{detectionCount}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-[#04091a]/90 border border-emerald-500/30 text-xs font-mono flex items-center gap-2 shadow-[0_0_12px_rgba(0,255,102,0.15)]">
              <Zap className="w-3.5 h-3.5 text-[#00ff66]" />
              <span className="text-slate-400">Varredura:</span>
              <span className="text-emerald-300 font-bold tabular-nums">{isLiveScraping ? '85 leads/min' : '42 leads/min'}</span>
            </div>
          </div>
        </div>

        {/* Center Grid: The Rotating Sweep Radar WITH TACTICAL MAP BACKGROUND + Telemetry Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6 relative z-10">
          {/* Left Visual: The Holographic Sweeping Radar Scope WITH CITY MAP */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Outer Decorative Ring Frame with Ambilight Edge Glow */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#050e26] via-[#091838] to-[#040c1e] border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(0,240,255,0.35),0_0_25px_rgba(0,255,102,0.2),inset_0_0_30px_rgba(0,240,255,0.2)] flex items-center justify-center overflow-hidden">
              
              {/* PHOTOREALISTIC TOP-DOWN TACTICAL SATELLITE/STREET NIGHT MAP */}
              <img
                src={RADAR_MAP_IMAGE}
                alt="Mapa Tático de Ruas e Avenidas"
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full opacity-70 mix-blend-screen pointer-events-none filter contrast-125 brightness-110"
              />

              {/* Grid overlay lines on top of map */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-cyan-400/30" />
                <div className="h-full w-[1px] bg-cyan-400/30 absolute" />
              </div>

              {/* Concentric Tactical Scope Rings */}
              <div className="absolute w-[82%] h-[82%] rounded-full border border-cyan-400/30 pointer-events-none" />
              <div className="absolute w-[62%] h-[62%] rounded-full border border-emerald-400/35 border-dashed pointer-events-none" />
              <div className="absolute w-[42%] h-[42%] rounded-full border border-cyan-400/40 pointer-events-none" />
              <div className="absolute w-[22%] h-[22%] rounded-full border border-cyan-400/50 pointer-events-none" />

              {/* Map Quadrant Labels */}
              <span className="absolute top-2 text-[9px] font-mono text-cyan-300 font-bold tracking-wider z-20 bg-black/50 px-1 rounded">50km</span>
              <span className="absolute bottom-2 text-[9px] font-mono text-cyan-300 font-bold tracking-wider z-20 bg-black/50 px-1 rounded">180°</span>
              <span className="absolute right-2 text-[9px] font-mono text-cyan-300 font-bold tracking-wider z-20 bg-black/50 px-1 rounded">90°</span>
              <span className="absolute left-2 text-[9px] font-mono text-cyan-300 font-bold tracking-wider z-20 bg-black/50 px-1 rounded">270°</span>

              {/* Center Core Emitter */}
              <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#00f0ff] z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* ROTATING RADAR SWEEP CONE WITH ELECTRIC GREEN & CYAN TRAIL */}
              <div
                className={`absolute inset-0 rounded-full pointer-events-none z-10 ${
                  isLiveScraping ? 'animate-radar-sweep-fast' : 'animate-radar-sweep'
                }`}
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 240, 255, 0.5) 0deg, rgba(0, 255, 102, 0.3) 40deg, transparent 75deg, transparent 360deg)',
                }}
              />

              {/* SECOND HARMONIC ROTATING SWEEP IN REVERSE (NEON PINK TRAIL) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none z-10 opacity-40"
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, rgba(255, 0, 128, 0.45) 0deg, transparent 55deg, transparent 360deg)',
                  animation: 'radar-sweep 5.5s linear infinite reverse',
                }}
              />

              {/* PULSATING RADAR BLIPS (Detected Clients / Leads) */}
              {blips.map((blip) => {
                const colorConfig = getBlipColorClasses(blip.color);
                const rad = (blip.angle * Math.PI) / 180;
                // Compute position on circle
                const x = 50 + (blip.radiusPercent / 2) * Math.cos(rad);
                const y = 50 + (blip.radiusPercent / 2) * Math.sin(rad);

                const isSelected = selectedBlip?.id === blip.id;

                return (
                  <button
                    key={blip.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedBlip(blip);
                    }}
                    title={`${blip.name} (${blip.category})`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group focus:outline-none"
                  >
                    {/* Blip halo wave */}
                    <span
                      className="absolute -inset-2 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: colorConfig.glow }}
                    />
                    
                    {/* Core Point */}
                    <span
                      className={`relative block w-3 h-3 rounded-full ${colorConfig.core} border-2 border-white shadow-[0_0_15px_${colorConfig.glow}] transition-transform duration-200 group-hover:scale-150 ${
                        isSelected ? 'scale-150 ring-2 ring-white' : ''
                      }`}
                    />

                    {/* Quick Hover Tooltip */}
                    <div className="absolute left-4 top-0 hidden group-hover:block z-30 whitespace-nowrap px-2 py-1 rounded bg-[#030818]/95 border border-cyan-400 text-[10px] font-mono text-white shadow-xl pointer-events-none">
                      <div className="font-bold text-cyan-300">{blip.name}</div>
                      <div className="text-slate-400">{blip.distance} · {blip.phone}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Azimuth and Speed Telemetry Below Scope */}
            <div className="mt-3 flex items-center justify-between w-full max-w-xs text-[11px] font-mono text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Azimute: <span className="text-cyan-300 font-bold tabular-nums">{currentAzimuth}° NW</span>
              </span>
              <span>Freq: <span className="text-emerald-400 font-bold">2.4 GHz</span></span>
            </div>
          </div>

          {/* Right Visual: Tactical Inspection Panel & Target Inspector */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Target Selected Inspector Card */}
            <div className="p-4 rounded-xl bg-[#030818]/90 border border-cyan-500/30 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-pink-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-300">
                    Inspeção do Alvo Detectado
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/50">
                  {selectedBlip ? 'LOCK ON' : 'AUTO-LOCK'}
                </span>
              </div>

              {selectedBlip ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-display font-bold text-white">
                        {selectedBlip.name}
                      </h4>
                      <div className="text-xs font-mono text-cyan-300 mt-0.5">
                        {selectedBlip.category} · {selectedBlip.city}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                        getBlipColorClasses(selectedBlip.color).badge
                      }`}
                    >
                      {selectedBlip.color === 'green' ? 'WhatsApp OK' : selectedBlip.color === 'pink' ? 'Decisor Alto' : 'Lead Quente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                      <span className="text-[10px] text-slate-400 uppercase block">Distância</span>
                      <span className="text-cyan-300 font-bold tabular-nums">{selectedBlip.distance}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                      <span className="text-[10px] text-slate-400 uppercase block">Contato</span>
                      <span className="text-slate-100 font-bold tabular-nums">{selectedBlip.phone}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                      <span className="text-[10px] text-slate-400 uppercase block">Detectado às</span>
                      <span className="text-emerald-400 font-bold tabular-nums">{selectedBlip.timestamp}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-200">
                    {blips[0]?.name}
                  </div>
                  <div className="text-xs font-mono text-cyan-400/90">
                    {blips[0]?.category} · Distância: {blips[0]?.distance} · {blips[0]?.phone}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Clique em qualquer ponto luminoso do radar acima para isolar as coordenadas do estabelecimento.
                  </p>
                </div>
              )}
            </div>

            {/* Live Feed Stream of Targets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
                <span>Deteções Recentes da Grade</span>
                <span className="text-cyan-400">{blips.length} pontos no raio</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {blips.slice(0, 4).map((b) => {
                  const cfg = getBlipColorClasses(b.color);
                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedBlip(b);
                      }}
                      className="p-2.5 rounded-xl bg-[#040c22]/80 hover:bg-[#08173d] border border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full ${cfg.core} shrink-0 animate-ping`} />
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                            {b.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            {b.category} · {b.distance}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-cyan-400/80 shrink-0 font-bold">
                        {b.distance}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions inside the Radar Card */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-cyan-500/15 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00ff66]" />
                  <span className="text-slate-300">WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
                  <span className="text-slate-300">Decisor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  <span className="text-slate-300">Rating 4.8+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff003c]" />
                  <span className="text-slate-300">Novo Alvo</span>
                </div>
              </div>

              {onNavigateToColeta && (
                <button
                  onClick={() => {
                    soundFx.playPulse();
                    onNavigateToColeta();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,0,128,0.4)] flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Expandir Varredura</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
