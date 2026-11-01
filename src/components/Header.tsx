import React from 'react';
import {
  Menu,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Layers,
  Search,
  Mic,
} from 'lucide-react';
import { ScreenType } from '../types';
import { soundFx } from '../utils/audio';
import { LiveDataStreamTicker } from './LiveDataStreamTicker';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onToggleMobileMenu: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  particleIntensity: 'high' | 'medium' | 'low' | 'off';
  onChangeParticleIntensity: (intensity: 'high' | 'medium' | 'low' | 'off') => void;
  onOpenQuickSearch: () => void;
  onToggleVoiceAssistant: () => void;
  isVoiceAssistantActive?: boolean;
}

const screenTitles: Record<ScreenType, { title: string; subtitle: string }> = {
  dashboard: { title: 'Cockpit Geral de Operações', subtitle: 'Métricas, fluxo de prospecção e nós ativos' },
  coleta: { title: 'Terminal de Coleta & Varredura', subtitle: 'Motor de scraping geolocalizado de estabelecimentos' },
  resultados: { title: 'Banco de Estabelecimentos Mapeados', subtitle: 'Leads qualificados, validação de WhatsApp e contatos' },
  historico: { title: 'Histórico de Missões de Extração', subtitle: 'Relatórios consolidados de coletas anteriores' },
  projetos: { title: 'Workspaces & Campanhas', subtitle: 'Segmentação estratégica de prospecção por nicho e região' },
  logs: { title: 'Terminal de Telemetria & Logs', subtitle: 'Fluxo em tempo real de eventos, requisições e erros' },
  exportacoes: { title: 'Central de Exportações', subtitle: 'Geração e download de arquivos em CSV, XLSX e JSON' },
  configuracoes: { title: 'Credenciais, Chaves de API & Ajustes', subtitle: 'Tokens de scraping, delays e parâmetros da interface' },
  login: { title: 'Autenticação de Operador', subtitle: 'Acesso ao sistema central' },
};

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onToggleMobileMenu,
  soundEnabled,
  onToggleSound,
  particleIntensity,
  onChangeParticleIntensity,
  onOpenQuickSearch,
  onToggleVoiceAssistant,
  isVoiceAssistantActive = false,
}) => {
  const currentInfo = screenTitles[currentScreen] || { title: 'Sistema', subtitle: '' };

  const cycleParticles = () => {
    soundFx.playClick();
    const nextMap: Record<string, 'high' | 'medium' | 'low' | 'off'> = {
      high: 'medium',
      medium: 'low',
      low: 'off',
      off: 'high',
    };
    onChangeParticleIntensity(nextMap[particleIntensity]);
  };

  const handleStartScrape = () => {
    soundFx.playPulse();
    onNavigate('coleta');
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#040816]/85 backdrop-blur-xl border-b border-cyan-500/15 px-4 lg:px-8 flex items-center justify-between gap-4 animate-origami-header">
      {/* Sequential Cyan Running Border Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-30">
        <div className="h-full w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-beam-header shadow-[0_0_18px_#00f0ff]" />
      </div>
      {/* Left Zone: Hamburger for mobile + Context Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20"
          title="Abrir menu lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest hidden sm:inline">
              Mais Clientes
            </span>
            <span className="text-cyan-500/40 text-xs hidden sm:inline">/</span>
            <h1 className="text-sm md:text-base font-display font-bold text-white truncate tracking-tight">
              {currentInfo.title}
            </h1>
          </div>
          <span className="text-[11px] text-slate-400 truncate hidden md:block">
            {currentInfo.subtitle}
          </span>
        </div>
      </div>

      {/* Middle Zone: LIVE DATA STREAM TERMINAL TICKER */}
      <LiveDataStreamTicker />

      {/* Right Zone: Controls & Quick Action */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Search Trigger */}
        <button
          onClick={onOpenQuickSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all text-xs font-mono"
          title="Busca rápida nos leads"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Buscar...</span>
          <kbd className="hidden lg:inline px-1 py-0.2 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Sci-Fi Voice Assistant Trigger */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleVoiceAssistant();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
            isVoiceAssistantActive
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] ring-1 ring-cyan-400/50'
              : 'bg-slate-900/60 text-slate-300 border-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400/50'
          }`}
          title="Comando de Voz Sci-Fi AI (ouvir comandos)"
        >
          <Mic className={`w-3.5 h-3.5 ${isVoiceAssistantActive ? 'text-cyan-300 animate-pulse' : 'text-cyan-400'}`} />
          <span className="hidden md:inline font-semibold">Comando IA</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          className={`p-2 rounded-lg border transition-all ${
            soundEnabled
              ? 'bg-cyan-950/50 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
              : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Sons Sci-Fi Ativados (clique para mutar)' : 'Sons Sci-Fi Desativados (clique para ativar)'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Particle Control */}
        <button
          onClick={cycleParticles}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all text-xs font-mono"
          title={`Partículas: ${particleIntensity} (clique para alternar)`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="capitalize">{particleIntensity}</span>
        </button>

        {/* Primary CTA: Iniciar Nova Coleta */}
        {currentScreen !== 'coleta' && (
          <button
            onClick={handleStartScrape}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] active:scale-95 whitespace-nowrap"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Coleta</span>
          </button>
        )}
      </div>
    </header>
  );
};
