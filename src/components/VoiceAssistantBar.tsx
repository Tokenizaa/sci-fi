import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Command,
  CheckCircle2,
  X,
  Radio,
  Zap,
} from 'lucide-react';
import { ScreenType } from '../types';
import { soundFx } from '../utils/audio';

interface VoiceAssistantBarProps {
  onNavigate: (screen: ScreenType) => void;
  isOpen: boolean;
  onClose: () => void;
  onTriggerStartScrape?: () => void;
}

// Browser Web Speech Recognition interface
type SpeechRecognitionType = any;

export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  onNavigate,
  isOpen,
  onClose,
  onTriggerStartScrape,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('Diga ou selecione um comando...');
  const [recognizedCommand, setRecognizedCommand] = useState<string | null>(null);
  const [hasMicSupport, setHasMicSupport] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'pt-BR';

          recognition.onstart = () => {
            setIsListening(true);
            setFeedbackMessage('Escutando... Fale seu comando tático.');
          };

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              current += event.results[i][0].transcript;
            }
            setTranscript(current);
            processVoiceCommand(current);
          };

          recognition.onerror = (err: any) => {
            setIsListening(false);
            if (err.error === 'not-allowed') {
              setFeedbackMessage('Microfone bloqueado. Use os comandos rápidos abaixo.');
            }
          };

          recognition.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current = recognition;
        } catch {
          setHasMicSupport(false);
        }
      } else {
        setHasMicSupport(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const speakVoiceFeedback = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.1;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }
  };

  const processVoiceCommand = (text: string) => {
    const lower = text.toLowerCase().trim();

    if (lower.includes('iniciar varredura') || lower.includes('coleta') || lower.includes('coletar') || lower.includes('varredura')) {
      executeCommand('coleta', 'Iniciando terminal de varredura no mapa.');
      if (onTriggerStartScrape) onTriggerStartScrape();
    } else if (lower.includes('listar resultados') || lower.includes('resultados') || lower.includes('leads') || lower.includes('empresas')) {
      executeCommand('resultados', 'Abrindo banco de estabelecimentos qualificados.');
    } else if (lower.includes('abrir exportações') || lower.includes('exportação') || lower.includes('exportar') || lower.includes('planilha')) {
      executeCommand('exportacoes', 'Acessando central de exportações e downloads.');
    } else if (lower.includes('dashboard') || lower.includes('painel') || lower.includes('início') || lower.includes('cockpit')) {
      executeCommand('dashboard', 'Retornando ao cockpit geral de operações.');
    } else if (lower.includes('histórico') || lower.includes('anteriores')) {
      executeCommand('historico', 'Abrindo histórico de missões de coleta.');
    } else if (lower.includes('projetos') || lower.includes('campanhas')) {
      executeCommand('projetos', 'Acessando workspaces e campanhas.');
    } else if (lower.includes('logs') || lower.includes('telemetria') || lower.includes('terminal')) {
      executeCommand('logs', 'Abrindo terminal de diagnóstico e telemetria.');
    } else if (lower.includes('configurações') || lower.includes('ajustes') || lower.includes('credenciais')) {
      executeCommand('configuracoes', 'Abrindo credenciais e parâmetros de scraping.');
    }
  };

  const executeCommand = (screen: ScreenType, speechFeedback: string) => {
    soundFx.playConfirm();
    setRecognizedCommand(speechFeedback);
    speakVoiceFeedback(speechFeedback);

    setTimeout(() => {
      onNavigate(screen);
      setTranscript('');
      setRecognizedCommand(null);
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      onClose();
    }, 900);
  };

  const toggleListening = () => {
    soundFx.playClick();
    if (!recognitionRef.current) {
      setFeedbackMessage('Reconhecimento de fala não suportado neste navegador. Selecione um comando.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch {}
    } else {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  if (!isOpen) return null;

  const quickCommands = [
    { text: 'iniciar varredura', target: 'coleta' as ScreenType, label: 'Iniciar Varredura' },
    { text: 'listar resultados', target: 'resultados' as ScreenType, label: 'Listar Resultados' },
    { text: 'abrir exportações', target: 'exportacoes' as ScreenType, label: 'Abrir Exportações' },
    { text: 'abrir dashboard', target: 'dashboard' as ScreenType, label: 'Abrir Dashboard' },
    { text: 'histórico', target: 'historico' as ScreenType, label: 'Histórico' },
    { text: 'projetos', target: 'projetos' as ScreenType, label: 'Projetos' },
    { text: 'logs', target: 'logs' as ScreenType, label: 'Logs e Telemetria' },
  ];

  return (
    <div className="fixed top-20 inset-x-0 z-50 flex justify-center px-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-full max-w-2xl ambilight-card">
        {/* Dynamic Multi-Color Ambilight Halo */}
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-pink-500/35 via-cyan-400/40 to-[#00ff66]/35 blur-2xl opacity-90 pointer-events-none -z-10" />

        <div className="scifi-panel rounded-2xl p-5 border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-[#00ff66]">
                Sci-Fi AI Voice Assistant · Protocolo V2
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                if (recognitionRef.current && isListening) {
                  try {
                    recognitionRef.current.stop();
                  } catch {}
                }
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Wave Visualizer Area */}
          <div className="p-4 rounded-xl bg-[#03081a]/95 border border-cyan-500/25 flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
            {/* Holographic grid scan background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* FREQUENCY SOUND WAVE BARS (Animadas ao escutar ou em idle) */}
            <div className="flex items-center justify-center gap-1.5 h-12 z-10">
              {[4, 10, 18, 28, 22, 14, 30, 24, 16, 8, 26, 12, 6, 20, 15].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isListening
                      ? 'bg-gradient-to-t from-cyan-400 via-pink-500 to-[#00ff66] shadow-[0_0_10px_#00f0ff]'
                      : 'bg-cyan-500/40'
                  }`}
                  style={{
                    height: isListening ? `${Math.max(6, Math.round(h * (Math.sin(Date.now() / 200 + i) + 1.4)))}px` : `${Math.max(4, Math.round(h * 0.35))}px`,
                    animation: isListening ? `sound-wave-bar 0.${5 + (i % 4)}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* Status Feedback Message */}
            <div className="text-center z-10 space-y-1">
              <div className="text-sm font-mono font-semibold text-white">
                {recognizedCommand || feedbackMessage}
              </div>
              {transcript && (
                <div className="text-xs font-mono text-cyan-300 italic">
                  "{transcript}"
                </div>
              )}
            </div>

            {/* Push to Talk Button */}
            <button
              onClick={toggleListening}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer z-10 active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-[0_0_20px_rgba(255,0,128,0.5)] animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-[#00ff66] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? 'Parar Escuta' : 'Ativar Microfone Sci-Fi'}</span>
            </button>
          </div>

          {/* Quick Command Suggestions (1-Click or Voice) */}
          <div className="mt-4 pt-3 border-t border-cyan-500/15">
            <span className="text-[11px] font-mono text-slate-400 block mb-2">
              Comandos de voz suportados (clique ou fale em voz alta):
            </span>

            <div className="flex flex-wrap gap-2">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd.text}
                  onClick={() => executeCommand(cmd.target, `Comando executado: ${cmd.label}`)}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/25 text-cyan-200 text-xs font-mono transition-all flex items-center gap-1.5 group cursor-pointer hover:border-cyan-400"
                >
                  <Command className="w-3 h-3 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                  <span>"{cmd.text}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
