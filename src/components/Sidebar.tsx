import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Building2,
  History,
  FolderKanban,
  Terminal,
  Settings,
  FileSpreadsheet,
  LogOut,
  X,
  Radio,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';
import { soundFx } from '../utils/audio';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeScrapeRunning?: boolean;
  totalLeadsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  activeScrapeRunning = false,
  totalLeadsCount = 10,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'coleta' as ScreenType,
      label: 'Coleta de Estabelecimentos',
      icon: Compass,
      badge: activeScrapeRunning ? 'Ativa' : 'Pronto',
      badgeColor: activeScrapeRunning ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' : 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
    },
    {
      id: 'resultados' as ScreenType,
      label: 'Resultados',
      icon: Building2,
      badge: totalLeadsCount.toString(),
      badgeColor: 'bg-blue-950/70 text-blue-300 border-blue-500/30 font-mono',
    },
    {
      id: 'historico' as ScreenType,
      label: 'Histórico de Coletas',
      icon: History,
      badge: null,
    },
    {
      id: 'projetos' as ScreenType,
      label: 'Projetos',
      icon: FolderKanban,
      badge: '4',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700 font-mono',
    },
    {
      id: 'logs' as ScreenType,
      label: 'Logs e Atividades',
      icon: Terminal,
      badge: 'Live',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'exportacoes' as ScreenType,
      label: 'Exportações',
      icon: FileSpreadsheet,
      badge: null,
    },
    {
      id: 'configuracoes' as ScreenType,
      label: 'Credenciais & Ajustes',
      icon: Settings,
      badge: null,
    },
  ];

  const handleItemClick = (screen: ScreenType) => {
    soundFx.playClick();
    onNavigate(screen);
    onCloseMobile();
  };

  const handleLogout = () => {
    soundFx.playClick();
    onNavigate('login');
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col bg-[#050b1a]/90 backdrop-blur-2xl border-r border-cyan-500/20 transition-transform duration-300 ease-out lg:translate-x-0 animate-origami-sidebar ${
          isOpenMobile ? 'translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.9)]' : '-translate-x-full'
        }`}
      >
        {/* Sequential Cyan Running Border Beam */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] overflow-hidden pointer-events-none z-30">
          <div className="w-full h-36 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-beam-sidebar shadow-[0_0_18px_#00f0ff]" />
        </div>

        {/* Header Branding Area */}
        <div className="p-5 border-b border-cyan-500/15 flex items-center justify-between">
          <BrandLogo size="md" />
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-mono tracking-widest text-cyan-400/60 uppercase">
            Módulos Operacionais
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-200 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-cyan-500/5 hover:border hover:border-cyan-500/20 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-cyan-400/20 text-cyan-300'
                        : 'bg-slate-800/60 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/40'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-medium shrink-0 ml-2 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* System telemetry box */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-gradient-to-b from-[#091530]/80 to-[#040916]/90 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Nó de Varredura</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              18/18 Online
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
            <div className="flex justify-between items-center">
              <span>Latência Google Places:</span>
              <span className="text-cyan-300 tabular-nums">38 ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Concorrência Ativa:</span>
              <span className="text-slate-200 tabular-nums">6 Threads</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Quota Diária Restante:</span>
              <span className="text-emerald-300 tabular-nums">98.4%</span>
            </div>
          </div>
        </div>

        {/* Operator Profile Card & Logout */}
        <div className="p-3 border-t border-cyan-500/15 bg-[#030713]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-bold text-xs text-white shadow-[0_0_10px_rgba(0,240,255,0.3)] shrink-0">
              OF
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">Osvaldo Farias</div>
              <div className="text-[10px] font-mono text-cyan-400/70 truncate">Operador Comandante</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Encerrar Sessão / Ir para Login"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
