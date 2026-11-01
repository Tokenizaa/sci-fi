import React from 'react';
import {
  Users,
  Compass,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Radio,
  Building2,
  Flame,
  Zap,
} from 'lucide-react';
import { ScreenType, LeadItem, CollectionHistoryItem } from '../../types';
import { soundFx } from '../../utils/audio';
import { ProspectingRadar } from '../ProspectingRadar';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  leads: LeadItem[];
  history: CollectionHistoryItem[];
  onSelectLead: (lead: LeadItem) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  leads,
  history,
  onSelectLead,
}) => {
  const kpis = [
    {
      title: 'Total de Leads Mapeados',
      value: '48.920',
      change: '+14.2%',
      timeframe: 'vs. mês anterior',
      icon: Users,
      color: 'from-cyan-500/25 to-blue-600/15',
      borderColor: 'border-cyan-400',
      iconColor: 'text-cyan-300',
      glowClass: 'neon-glow-cyan',
      floatingClass: 'animate-floating',
      ambilightClass: 'ambilight-cyan',
      ledClass: 'led-tube-cyan',
      backlightGradient: 'from-cyan-400/60 via-blue-500/50 to-cyan-300/40',
    },
    {
      title: 'Taxa de Validação WhatsApp',
      value: '94.2%',
      change: '+3.8%',
      timeframe: 'contatos ativos',
      icon: CheckCircle2,
      color: 'from-emerald-500/25 to-teal-600/15',
      borderColor: 'border-emerald-400',
      iconColor: 'text-[#00ff66]',
      glowClass: 'neon-glow-green',
      floatingClass: 'animate-floating-delay',
      ambilightClass: 'ambilight-green',
      ledClass: 'led-tube-green',
      backlightGradient: 'from-[#00ff66]/60 via-emerald-500/50 to-teal-300/40',
    },
    {
      title: 'Missões com Alvos Quentes',
      value: '318',
      change: '100% sucesso',
      timeframe: 'sem bloqueios',
      icon: Zap,
      color: 'from-pink-500/25 to-rose-600/15',
      borderColor: 'border-pink-400',
      iconColor: 'text-[#ff007f]',
      glowClass: 'neon-glow-pink',
      floatingClass: 'animate-floating',
      ambilightClass: 'ambilight-pink',
      ledClass: 'led-tube-pink',
      backlightGradient: 'from-[#ff007f]/60 via-rose-500/50 to-pink-300/40',
    },
    {
      title: 'Exportações Realizadas',
      value: '142',
      change: 'CSV / XLSX / JSON',
      timeframe: 'armazenadas',
      icon: FileSpreadsheet,
      color: 'from-amber-500/25 to-orange-600/15',
      borderColor: 'border-amber-400',
      iconColor: 'text-[#ffaa00]',
      glowClass: 'neon-glow-amber',
      floatingClass: 'animate-floating-delay',
      ambilightClass: 'ambilight-amber',
      ledClass: 'led-tube-amber',
      backlightGradient: 'from-[#ffaa00]/60 via-amber-500/50 to-orange-400/40',
    },
  ];

  // Visual bar distribution for niche breakdown
  const nicheDistribution = [
    { name: 'Clínicas Odontológicas', count: 18450, percentage: 38, color: 'bg-cyan-400' },
    { name: 'Academias & Fitness', count: 11200, percentage: 23, color: 'bg-pink-500' },
    { name: 'Restaurantes & Bares', count: 9800, percentage: 20, color: 'bg-[#00ff66]' },
    { name: 'Imobiliárias & Corretores', count: 5470, percentage: 11, color: 'bg-red-500' },
    { name: 'Outros Segmentos B2B', count: 4000, percentage: 8, color: 'bg-emerald-400' },
  ];

  // Weekly collection trend mock values
  const weeklyTrends = [
    { day: 'Seg', leads: 4200, height: '55%' },
    { day: 'Ter', leads: 5800, height: '75%' },
    { day: 'Qua', leads: 7400, height: '95%' },
    { day: 'Qui', leads: 6100, height: '80%' },
    { day: 'Sex', leads: 8200, height: '100%' },
    { day: 'Sáb', leads: 3100, height: '40%' },
    { day: 'Dom', leads: 2400, height: '32%' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. NEW PROSPECTING RADAR COMPONENT AT THE VERY TOP OF DASHBOARD */}
      <ProspectingRadar
        onNavigateToColeta={() => onNavigate('coleta')}
      />

      {/* 2. Tactical Hero Banner with Expanding Multi-Chromatic Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card animate-floating">
        {/* Outward Expanding Radiant Backlight Halo (Ambilight) */}
        <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-gradient-to-r from-[#ff007f]/45 via-[#00f0ff]/55 to-[#00ff66]/45 blur-3xl opacity-90 pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative overflow-hidden">
          {/* Top Edge LED Tube Glass Highlight */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#ff007f] to-transparent pointer-events-none" />
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-gradient-to-br from-pink-500/20 via-cyan-500/20 to-[#00ff66]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66]"></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-pink-400">
                  Sistema Operacional Ativo · Nós Conectados
                </span>
                <span className="text-slate-500 text-xs">·</span>
                <span className="text-xs font-mono text-slate-400">Cluster Brasil Leste</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Cockpit Central de Prospecção Mais Clientes V2
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Varredura geolocalizada em alta precisão no Google Maps, enriquecimento de números de WhatsApp, websites e decisores com proteção anti-bloqueio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  soundFx.playPulse();
                  onNavigate('coleta');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-cyan-400 to-[#00ff66] hover:brightness-110 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4 fill-slate-950" />
                <span>Nova Varredura de Leads</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('resultados');
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border-2 border-cyan-400/60 text-xs font-mono text-cyan-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(0,240,255,0.3)]"
              >
                <Building2 className="w-4 h-4 text-cyan-300" />
                <span>Ver Base Completa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Zero-G KPI Cards Strip with Expanding Backlight Halos & 2.5px LED Tube Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className={`relative z-10 ${kpi.ambilightClass} ${kpi.floatingClass}`}>
              {/* Outward Expanding Radiant Light blooming from behind the card */}
              <div className={`absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r ${kpi.backlightGradient} blur-2xl opacity-85 group-hover:opacity-100 transition-all pointer-events-none -z-10`} />

              <div
                className={`scifi-panel-interactive ${kpi.ledClass} rounded-2xl p-5 relative group overflow-hidden`}
              >
                {/* Subtle top edge LED tube glass highlight */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-white/40 pointer-events-none" />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-xs font-mono text-slate-200 font-semibold tracking-wide uppercase">
                    {kpi.title}
                  </span>
                  <div className={`p-2.5 rounded-xl bg-[#030818]/95 border border-white/20 ${kpi.iconColor} shadow-[0_0_15px_rgba(0,0,0,0.8)]`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1.5 relative z-10">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums tracking-tight">
                    {kpi.value}
                  </span>
                  <span className="text-xs font-mono text-[#00ff66] font-bold flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {kpi.change}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 font-sans relative z-10">
                  <span>{kpi.timeframe}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Visualizer */}
        <div className="lg:col-span-7 relative ambilight-cyan">
          {/* Outward Expanding Cyan Backlight Halo */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-cyan-400/35 blur-2xl pointer-events-none -z-10" />

          <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative h-full">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-cyan-300/40 pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400/80 mb-1">
                  Taxa de Coleta Semanal
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  Volume de Prospecção Diária
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Total 7 dias:</span>
                <div className="text-base font-mono font-bold text-cyan-300 tabular-nums">37.200 leads</div>
              </div>
            </div>

            {/* Bar Chart Bars */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-cyan-500/20">
              {weeklyTrends.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {bar.leads.toLocaleString()}
                  </div>
                  <div className="w-full bg-slate-800/60 rounded-t-lg overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                <span>Coletas no Google Maps Brasil</span>
              </div>
              <span className="font-mono text-cyan-300">Pico: Sexta-feira (8.200)</span>
            </div>
          </div>
        </div>

        {/* Segment Niche Distribution */}
        <div className="lg:col-span-5 relative ambilight-pink">
          {/* Outward Expanding Pink Backlight Halo */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-pink-500/35 blur-2xl pointer-events-none -z-10" />

          <div className="scifi-panel led-tube-pink rounded-2xl p-6 relative h-full">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-pink-300/40 pointer-events-none" />

            <div className="mb-4">
              <div className="text-xs font-mono uppercase tracking-wider text-pink-400/80 mb-1">
                Composição da Base
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Distribuição por Segmento
              </h3>
            </div>

            <div className="space-y-3.5">
              {nicheDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-200 font-medium">{item.name}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 tabular-nums">{item.count.toLocaleString()}</span>
                      <span className="text-pink-300 font-semibold tabular-nums">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(255,0,128,0.3)]`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-pink-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Filtro de enriquecimento:</span>
              <span className="text-emerald-400 font-medium">98.5% com Telefone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Captures Table & Live Feed */}
      <div className="relative z-10 ambilight-card">
        {/* Outward Expanding Multi-Color Backlight Halo */}
        <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/25 to-blue-500/30 blur-2xl pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-cyan-400/40 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400/80 mb-1">
                Fluxo em Tempo Real
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Últimos Estabelecimentos Capturados
              </h3>
            </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onNavigate('resultados');
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto"
          >
            <span>Ver todos os {leads.length} registros</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan-500/20 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-medium">Estabelecimento</th>
                <th className="pb-3 font-medium">Segmento</th>
                <th className="pb-3 font-medium">Localização</th>
                <th className="pb-3 font-medium">Telefone / WhatsApp</th>
                <th className="pb-3 font-medium text-center">Avaliação</th>
                <th className="pb-3 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {leads.slice(0, 5).map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-cyan-500/5 transition-colors group cursor-pointer"
                  onClick={() => {
                    soundFx.playClick();
                    onSelectLead(lead);
                  }}
                >
                  <td className="py-3 pr-3">
                    <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {lead.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">
                      {lead.address}
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-slate-300 font-mono text-[11px]">
                    {lead.category}
                  </td>
                  <td className="py-3 pr-3 text-slate-300 font-mono text-[11px]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400/70 shrink-0" />
                      <span>{lead.city}, {lead.state}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      {lead.whatsapp && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                          WhatsApp
                        </span>
                      )}
                      <span className="text-slate-200 tabular-nums">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-center font-mono">
                    <span className="text-amber-300 font-bold tabular-nums">★ {lead.rating}</span>
                    <span className="text-slate-500 text-[10px] ml-1">({lead.reviewsCount})</span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        onSelectLead(lead);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-colors"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
