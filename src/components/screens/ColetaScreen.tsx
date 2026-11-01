import React, { useState, useEffect } from 'react';
import {
  Compass,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sliders,
  MapPin,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Radio,
  Building2,
  Globe,
  Phone,
  Check,
} from 'lucide-react';
import { ScreenType, LeadItem } from '../../types';
import { nichesSuggestions, citiesSuggestions } from '../../data/mockData';
import { soundFx } from '../../utils/audio';

interface ColetaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddLeads: (newLeads: LeadItem[]) => void;
  onSelectLead: (lead: LeadItem) => void;
}

export const ColetaScreen: React.FC<ColetaScreenProps> = ({
  onNavigate,
  onAddLeads,
  onSelectLead,
}) => {
  // Form states
  const [niche, setNiche] = useState('Clínicas Odontológicas');
  const [location, setLocation] = useState('São Paulo, SP');
  const [radius, setRadius] = useState('15km');
  const [quantity, setQuantity] = useState(100);
  const [onlyWhatsapp, setOnlyWhatsapp] = useState(true);
  const [onlyWebsite, setOnlyWebsite] = useState(false);
  const [minRating, setMinRating] = useState('4.0+');

  // Simulation states
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedInSession, setCapturedInSession] = useState<LeadItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const simulationSteps = [
    'Conectando ao nó de varredura Google Maps [Cluster SP-East]...',
    'Calculando grade de cobertura geográfica (Raio ' + radius + ')...',
    'Extraindo fichas de estabelecimentos e metadados de localização...',
    'Enriquecendo dados: cruzando website, e-mail e redes sociais...',
    'Validando nós de WhatsApp e telefonia celular em tempo real...',
    'Finalizando indexação e gerando relatório de inteligência...',
  ];

  // Realistic sample batch generated on the fly during simulation
  const generateSimulatedLead = (index: number): LeadItem => {
    const names = [
      'OdontoPrime Jardins',
      'Ateliê do Sorriso & Implantes',
      'Oral Excellence Centro Avançado',
      'Dental Concept Moema',
      'Instituto de Odontologia Contemporânea',
      'Clínica Paulista de Estética Dental',
      'Studio Oral & Harmonização Facial',
      'Consultório Dr. Thiago Mendes',
    ];
    const name = `${names[index % names.length]} #${index + 1}`;
    const phone = `(11) 9${Math.floor(8000 + Math.random() * 1999)}-${Math.floor(1000 + Math.random() * 8999)}`;
    const rating = +(4.5 + Math.random() * 0.5).toFixed(1);

    return {
      id: `lead-sim-${Date.now()}-${index}`,
      name,
      category: niche,
      address: `Av. Brigadeiro Faria Lima, ${1000 + index * 45} - Pinheiros`,
      neighborhood: 'Pinheiros',
      city: location.split(',')[0] || 'São Paulo',
      state: 'SP',
      phone,
      whatsapp: onlyWhatsapp ? true : Math.random() > 0.2,
      website: `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
      email: `contato@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
      instagram: `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      cnpj: `${Math.floor(10 + Math.random() * 89)}.${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}/0001-${Math.floor(10 + Math.random() * 89)}`,
      rating,
      reviewsCount: Math.floor(40 + Math.random() * 300),
      status: 'verificado',
      capturedAt: 'Agora mesmo',
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(name)}`,
    };
  };

  const handleStartScraping = () => {
    soundFx.playPulse();
    setIsRunning(true);
    setIsPaused(false);
    setProgress(0);
    setCurrentStep(0);
    setCapturedInSession([]);
    setIsFinished(false);
  };

  const handleTogglePause = () => {
    soundFx.playClick();
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    soundFx.playClick();
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setCapturedInSession([]);
    setIsFinished(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && !isFinished) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          const stepIndex = Math.min(
            simulationSteps.length - 1,
            Math.floor((next / 100) * simulationSteps.length)
          );
          setCurrentStep(stepIndex);

          // Emit lead every ~12% progress
          if (next % 12 === 0 && next < 100) {
            const newLead = generateSimulatedLead(Math.floor(next / 12));
            setCapturedInSession((curr) => [newLead, ...curr]);
          }

          if (next >= 100) {
            clearInterval(interval);
            setIsFinished(true);
            setIsRunning(false);
            soundFx.playConfirm();
            // Automatically add captured leads to the global state
            const finalBatch = Array.from({ length: 8 }, (_, i) => generateSimulatedLead(i));
            onAddLeads(finalBatch);
            setCapturedInSession(finalBatch);
            return 100;
          }
          return next;
        });
      }, 80);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, isFinished]);

  return (
    <div className="space-y-6">
      {/* Top Console Bar with Radiant Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card animate-floating">
        <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-gradient-to-r from-pink-500/40 via-cyan-400/50 to-[#00ff66]/40 blur-3xl opacity-90 pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#00ff66] to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Módulo de Extração Ativa
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Varredura de Estabelecimentos Comerciais
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Radio className={`w-3.5 h-3.5 ${isRunning ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`} />
              <span>Status: {isRunning ? (isPaused ? 'Pausado' : 'Varrendo nós...') : isFinished ? 'Missão Concluída' : 'Pronto para disparo'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scraping Parameters Form with Expanding Backlight & LED Tube Border */}
        <div className="lg:col-span-5 relative ambilight-cyan">
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-cyan-400/35 blur-2xl pointer-events-none -z-10" />

          <div className="scifi-panel led-tube-cyan rounded-2xl p-6 space-y-5 relative h-full">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-cyan-300/40 pointer-events-none" />

            <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Sliders className="w-4 h-4" />
            <span>Configuração da Missão</span>
          </div>

          {/* Segmento / Nicho */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Segmento / Nicho Desejado
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Ex: Clínicas Odontológicas, Restaurantes..."
                disabled={isRunning}
                className="w-full px-3.5 py-2.5 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-sans disabled:opacity-60"
              />
            </div>
            {/* Quick chips suggestions */}
            <div className="flex flex-wrap gap-1.5">
              {nichesSuggestions.slice(0, 4).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setNiche(item);
                  }}
                  disabled={isRunning}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-colors ${
                    niche === item
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-medium'
                      : 'bg-slate-900/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Localização / Cidade */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Localização / Cidade Base
            </label>
            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP ou Bairro"
                disabled={isRunning}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-sans disabled:opacity-60"
              />
            </div>
            {/* Quick cities */}
            <div className="flex flex-wrap gap-1.5">
              {citiesSuggestions.slice(0, 4).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setLocation(city);
                  }}
                  disabled={isRunning}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-colors ${
                    location === city
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-medium'
                      : 'bg-slate-900/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Raio & Quantidade Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Raio de Busca
              </label>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                disabled={isRunning}
                className="w-full px-3 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono outline-none"
              >
                <option value="5km">5 km</option>
                <option value="10km">10 km</option>
                <option value="15km">15 km</option>
                <option value="25km">25 km</option>
                <option value="50km">50 km (Metropolitano)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Meta de Registros
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={isRunning}
                className="w-full px-3 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono outline-none"
              >
                <option value={50}>50 leads</option>
                <option value={100}>100 leads</option>
                <option value={250}>250 leads</option>
                <option value={500}>500 leads</option>
                <option value={1000}>1.000 leads (Massivo)</option>
              </select>
            </div>
          </div>

          {/* Filtros de Enriquecimento */}
          <div className="space-y-2.5 pt-2 border-t border-cyan-500/15">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Filtros Avançados
            </span>

            <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyWhatsapp}
                onChange={(e) => setOnlyWhatsapp(e.target.checked)}
                disabled={isRunning}
                className="rounded border-cyan-500/40 text-cyan-500 focus:ring-cyan-500/40 bg-slate-900"
              />
              <span>Validar número de WhatsApp obrigatoriamente</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyWebsite}
                onChange={(e) => setOnlyWebsite(e.target.checked)}
                disabled={isRunning}
                className="rounded border-cyan-500/40 text-cyan-500 focus:ring-cyan-500/40 bg-slate-900"
              />
              <span>Apenas estabelecimentos com Website oficial</span>
            </label>
          </div>

          {/* Action Trigger Buttons */}
          <div className="pt-2">
            {!isRunning && !isFinished ? (
              <button
                type="button"
                onClick={handleStartScraping}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-cyan-400 to-[#00ff66] hover:brightness-110 text-slate-950 font-display font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Disparar Varredura no Mapa</span>
              </button>
            ) : isFinished ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onNavigate('resultados');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Explorar Base nos Resultados</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-xs font-mono text-slate-300 transition-colors"
                >
                  Nova Coleta com Outros Parâmetros
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="flex-1 py-3 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>{isPaused ? 'Retomar' : 'Pausar'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 font-mono text-xs transition-all flex items-center justify-center"
                  title="Cancelar operação"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Tactical Map Radar & Scraping Console Stream */}
        <div className="lg:col-span-7 space-y-6">
          {/* TACTICAL MAP RADAR COMPONENT IN ACTION DURING COLLECTION */}
          <div className="relative z-10 ambilight-card animate-floating">
            {/* Outward Expanding Multi-Color Backlight Halo */}
            <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-gradient-to-r from-[#ff007f]/45 via-[#00f0ff]/55 to-[#00ff66]/45 blur-3xl opacity-95 pointer-events-none -z-10" />

            <div className="scifi-panel led-tube-cyan rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-300 to-[#00ff66]">
                  <Radio className="w-4 h-4 text-[#00ff66] animate-pulse" />
                  <span>Radar Geolocalizado no Mapa · {location}</span>
                </div>
                <div className="text-xs font-mono text-cyan-300 font-bold">
                  {isRunning ? 'VARRENDO MALHA URBANA...' : isFinished ? 'VARREDURA CONCLUÍDA' : 'RADAR PRONTO PARA SCAN'}
                </div>
              </div>

              {/* Scope with Photorealistic Map & Rotating Sweep */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-[#050e26] border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(0,240,255,0.35),0_0_20px_rgba(0,255,102,0.25)] flex items-center justify-center overflow-hidden shrink-0">
                  {/* City Map Image Background */}
                  <img
                    src="/src/assets/images/tactical_radar_map_1793542783612.jpg"
                    alt="Mapa Tático de Ruas e Avenidas"
                    className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full opacity-75 mix-blend-screen pointer-events-none filter contrast-125 brightness-110"
                  />

                  {/* Crosshairs & Scope rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-cyan-400/35" />
                    <div className="h-full w-[1px] bg-cyan-400/35 absolute" />
                  </div>
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-cyan-400/35 pointer-events-none" />
                  <div className="absolute w-[50%] h-[50%] rounded-full border border-[#00ff66]/40 border-dashed pointer-events-none" />

                  {/* Sweep Beam */}
                  <div
                    className={`absolute inset-0 rounded-full pointer-events-none z-10 ${
                      isRunning ? 'animate-radar-sweep-fast' : 'animate-radar-sweep'
                    }`}
                    style={{
                      background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 240, 255, 0.55) 0deg, rgba(0, 255, 102, 0.35) 45deg, transparent 80deg, transparent 360deg)',
                    }}
                  />

                  {/* Core Emitter */}
                  <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#00f0ff] z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Pulsing Blips discovered on the map */}
                  {capturedInSession.slice(0, 6).map((lead, idx) => {
                    const angles = [35, 110, 160, 215, 290, 335];
                    const radii = [35, 60, 45, 70, 50, 65];
                    const angle = angles[idx % angles.length];
                    const rPercent = radii[idx % radii.length];
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + (rPercent / 2) * Math.cos(rad);
                    const y = 50 + (rPercent / 2) * Math.sin(rad);

                    return (
                      <div
                        key={lead.id}
                        style={{ left: `${x}%`, top: `${y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                      >
                        <span className="absolute -inset-2 rounded-full bg-[#00ff66] animate-ping opacity-75" />
                        <span className="relative block w-2.5 h-2.5 rounded-full bg-[#00ff66] border-2 border-white shadow-[0_0_12px_#00ff66]" />
                      </div>
                    );
                  })}
                </div>

                {/* Progress Details & Current Coordinates */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{simulationSteps[currentStep] || 'Pronto'}</span>
                    <span className="text-cyan-300 font-bold tabular-nums text-base">{progress}%</span>
                  </div>

                  {/* Holographic progress tracker */}
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-cyan-500/40">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 via-cyan-400 to-[#00ff66] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.7)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div className="p-2 rounded-lg bg-[#04091a]/80 border border-cyan-500/20">
                      <span className="text-[10px] text-slate-400 block uppercase">Leads Capturados</span>
                      <span className="text-cyan-300 font-bold tabular-nums text-sm">
                        {capturedInSession.length} / {quantity}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-[#04091a]/80 border border-emerald-500/20">
                      <span className="text-[10px] text-slate-400 block uppercase">Nó GPS Ativo</span>
                      <span className="text-emerald-300 font-bold text-xs truncate">
                        São Paulo - {radius}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Ingestion Stream Card with Expanding Backlight & LED Tube Border */}
          <div className="relative z-10 ambilight-green">
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-[#00ff66]/25 blur-2xl pointer-events-none -z-10" />

            <div className="scifi-panel led-tube-green rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00ff66]/40 pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 relative z-10">
                <span>Feed de Estabelecimentos Localizados no Mapa ({capturedInSession.length})</span>
                <span className="text-[#00ff66] font-semibold">Validação Ativa</span>
              </div>

            {capturedInSession.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-cyan-500/15 text-slate-400 text-xs font-mono space-y-2">
                <Compass className="w-6 h-6 mx-auto text-cyan-400/60 animate-spin" />
                <p>Clique em "Disparar Varredura no Mapa" para ativar o radar e localizar empresas em tempo real.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {capturedInSession.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        soundFx.playClick();
                        onSelectLead(lead);
                      }}
                      className="p-3 rounded-xl bg-[#06112c]/70 hover:bg-[#09183d]/90 border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
                            {lead.name}
                          </span>
                          {lead.whatsapp && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shrink-0 font-mono">
                              WhatsApp OK
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{lead.city}</span>
                          <span>·</span>
                          <span className="font-mono text-cyan-400/80">{lead.phone}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono text-amber-300 font-bold">
                          ★ {lead.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom helper info */}
            <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Algoritmo anti-bloqueio: Rotação ativa de user-agents</span>
              <span className="text-emerald-400">0 Falhas Registradas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
