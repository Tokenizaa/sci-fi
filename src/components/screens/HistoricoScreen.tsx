import React from 'react';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Compass,
  Download,
  RotateCw,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { CollectionHistoryItem, ScreenType } from '../../types';
import { soundFx } from '../../utils/audio';

interface HistoricoScreenProps {
  history: CollectionHistoryItem[];
  onNavigate: (screen: ScreenType) => void;
  onRepeatScrape: (item: CollectionHistoryItem) => void;
}

export const HistoricoScreen: React.FC<HistoricoScreenProps> = ({
  history,
  onNavigate,
  onRepeatScrape,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner with Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card animate-floating">
        <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-gradient-to-r from-pink-500/40 via-cyan-400/50 to-[#00ff66]/40 blur-3xl opacity-90 pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#00ff66] to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Log Histórico de Missões
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Histórico de Varreduras & Extrações
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Auditoria completa de execuções com taxa de conversão e parâmetros utilizados
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playPulse();
                onNavigate('coleta');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Disparar Nova Missão</span>
            </button>
          </div>
        </div>
      </div>

      {/* History Items Cards & Table with Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card">
        <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/25 to-emerald-500/30 blur-2xl pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl overflow-hidden relative">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan-500/20 bg-[#040a1d]/90 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 pr-4 font-medium">Protocolo</th>
                <th className="py-3.5 pr-4 font-medium">Data / Hora</th>
                <th className="py-3.5 pr-4 font-medium">Segmento Alvo</th>
                <th className="py-3.5 pr-4 font-medium">Localidade & Raio</th>
                <th className="py-3.5 pr-4 font-medium text-center">Registros</th>
                <th className="py-3.5 pr-4 font-medium text-center">Duração</th>
                <th className="py-3.5 pr-4 font-medium text-center">Status</th>
                <th className="py-3.5 pr-6 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cyan-500/5 transition-colors group"
                >
                  <td className="py-4 pl-6 pr-4 font-mono font-bold text-cyan-300">
                    {item.protocol}
                  </td>

                  <td className="py-4 pr-4 text-slate-300 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.date}</span>
                    </div>
                  </td>

                  <td className="py-4 pr-4 font-semibold text-slate-100">
                    {item.niche}
                  </td>

                  <td className="py-4 pr-4 text-slate-300 font-mono text-[11px]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400/70 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </td>

                  <td className="py-4 pr-4 text-center font-mono">
                    <span className="text-cyan-300 font-bold tabular-nums">
                      {item.capturedCount}
                    </span>
                    <span className="text-slate-500 text-[10px]"> / {item.requestedCount}</span>
                  </td>

                  <td className="py-4 pr-4 text-center font-mono text-slate-400">
                    {item.duration}
                  </td>

                  <td className="py-4 pr-4 text-center font-mono">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border capitalize ${
                        item.status === 'concluido'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                          : item.status === 'em_andamento'
                          ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 animate-pulse'
                          : 'bg-red-950/70 text-red-300 border-red-500/40'
                      }`}
                    >
                      {item.status === 'concluido'
                        ? 'Concluído'
                        : item.status === 'em_andamento'
                        ? 'Em Andamento'
                        : 'Interrompido'}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onNavigate('resultados');
                        }}
                        className="p-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors"
                        title="Ver registros capturados"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onRepeatScrape(item);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="Repetir esta coleta"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
};
