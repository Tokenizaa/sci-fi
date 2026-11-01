import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Filter,
  Trash2,
  Pause,
  Play,
  Copy,
  Check,
  Radio,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from 'lucide-react';
import { LogEntry } from '../../types';
import { soundFx } from '../../utils/audio';

interface LogsScreenProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

export const LogsScreen: React.FC<LogsScreenProps> = ({ logs: initialLogs, onClearLogs }) => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter logs by level
  const filteredLogs = logs.filter((log) => {
    if (selectedLevel === 'todos') return true;
    return log.level === selectedLevel;
  });

  // Simulated occasional telemetry ping every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const sampleEvents: LogEntry[] = [
        {
          id: `log-${Date.now()}-1`,
          timestamp: timeStr,
          level: 'info',
          module: 'Google Places',
          message: 'Cache geográfico consultado para sub-região São Paulo [Z-04]. 0ms de penalidade de quota.',
        },
        {
          id: `log-${Date.now()}-2`,
          timestamp: timeStr,
          level: 'success',
          module: 'Enriquecimento',
          message: 'Validação de WhatsApp: handshake retornado com sucesso para nó +55 11 98***-****.',
          details: 'Status: WhatsApp Business verificado',
        },
        {
          id: `log-${Date.now()}-3`,
          timestamp: timeStr,
          level: 'info',
          module: 'Scraper',
          message: 'Proxy rotativo alternado com sucesso: IP BR-SP-179 -> BR-SP-204 [Latência 31ms].',
        },
      ];

      const chosen = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setLogs((prev) => [chosen, ...prev.slice(0, 49)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCopyLogs = () => {
    soundFx.playClick();
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.module}] ${l.message} ${l.details || ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    soundFx.playClick();
    setLogs([]);
    onClearLogs();
  };

  const levelBadges = {
    info: { icon: Info, color: 'text-sky-400 bg-sky-950/60 border-sky-500/30' },
    success: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' },
    warning: { icon: AlertTriangle, color: 'text-amber-400 bg-amber-950/60 border-amber-500/30' },
    error: { icon: XCircle, color: 'text-red-400 bg-red-950/60 border-red-500/30' },
  };

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
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Console de Diagnóstico & Eventos
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Logs & Atividades do Sistema
              </h2>
            </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                setIsPaused(!isPaused);
              }}
              className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                isPaused
                  ? 'bg-amber-950/70 border-amber-500/40 text-amber-300'
                  : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Retomar Stream' : 'Pausar Stream'}</span>
            </button>

            <button
              onClick={handleCopyLogs}
              className="p-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Copiar logs formatados"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleClear}
              className="p-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 hover:text-red-400 transition-colors"
              title="Limpar console"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-cyan-500/15">
          <span className="text-xs font-mono text-slate-400 mr-2">Filtrar nível:</span>
          {['todos', 'info', 'success', 'warning', 'error'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundFx.playClick();
                setSelectedLevel(lvl);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all border ${
                selectedLevel === lvl
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                  : 'bg-slate-900/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
              }`}
            >
              {lvl === 'todos' ? 'Todos' : lvl === 'success' ? 'Sucesso' : lvl === 'warning' ? 'Atenção' : lvl === 'error' ? 'Erro' : 'Info'}
            </button>
          ))}
        </div>
      </div>
    </div>

      {/* Terminal Display Console with Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card">
        <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/25 to-blue-500/30 blur-2xl pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl overflow-hidden font-mono text-xs relative">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-[#030714] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono ml-2">
              telemetry_stream_br_east01.log
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Radio className={`w-3 h-3 ${isPaused ? 'text-amber-400' : 'text-emerald-400 animate-pulse'}`} />
            <span>{isPaused ? 'PAUSADO' : 'CONECTADO EM TEMPO REAL'}</span>
          </div>
        </div>

        {/* Log Entries Viewport */}
        <div className="p-4 space-y-2.5 max-h-[500px] overflow-y-auto bg-[#020510]/95">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              Nenhum registro de log para o filtro selecionado.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const badge = levelBadges[log.level] || levelBadges.info;
              const Icon = badge.icon;

              return (
                <div
                  key={log.id}
                  className="p-2.5 rounded-lg bg-[#050c1f]/80 hover:bg-[#081432] border border-cyan-500/10 transition-colors flex items-start gap-3 group"
                >
                  <span className="text-slate-500 shrink-0 tabular-nums">
                    [{log.timestamp}]
                  </span>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border uppercase shrink-0 flex items-center gap-1 ${badge.color}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{log.level}</span>
                  </span>

                  <span className="text-cyan-400/90 font-semibold shrink-0">
                    [{log.module}]
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200 leading-relaxed">
                      {log.message}
                    </div>
                    {log.details && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        ↳ {log.details}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  </div>
);
};
