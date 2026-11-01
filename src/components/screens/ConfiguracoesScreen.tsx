import React, { useState } from 'react';
import {
  Settings,
  KeyRound,
  Shield,
  Sliders,
  CheckCircle2,
  Sparkles,
  Volume2,
  Radio,
  Save,
  Server,
  Layers,
  Cpu,
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ConfiguracoesScreenProps {
  particleIntensity: 'high' | 'medium' | 'low' | 'off';
  onChangeParticleIntensity: (intensity: 'high' | 'medium' | 'low' | 'off') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ConfiguracoesScreen: React.FC<ConfiguracoesScreenProps> = ({
  particleIntensity,
  onChangeParticleIntensity,
  soundEnabled,
  onToggleSound,
}) => {
  // Mock credentials
  const [googleKey, setGoogleKey] = useState('AIzaSyD-9812_PLACE_API_KEY_SECURE_TOKEN_MCV2');
  const [waToken, setWaToken] = useState('WA_EAAO_INSTANCE_TOKEN_LIVE_NATIVE_SESSION_894');
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.n8n.cloud/webhook/mais-clientes-v2-leads');

  // Scraping engine parameters
  const [concurrency, setConcurrency] = useState('6');
  const [requestDelay, setRequestDelay] = useState('1.2s');
  const [proxyRotation, setProxyRotation] = useState(true);
  const [holographicGlow, setHolographicGlow] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playConfirm();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="scifi-panel rounded-2xl p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                Parâmetros Globais do Sistema
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Credenciais & Ajustes da Central
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Controle de nós de API, chaves de webhook, concorrência e ambientação sci-fi
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Parâmetros e chaves criptográficas salvos com sucesso no cluster operacional!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credentials & APIs */}
        <div className="scifi-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <KeyRound className="w-4 h-4" />
            <span>Chaves de API & Conexões Externas</span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Google Places Platform API Key
              </label>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Conectado (48ms)
              </span>
            </div>
            <input
              type="password"
              value={googleKey}
              onChange={(e) => setGoogleKey(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-slate-100 font-mono outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                WhatsApp Business Gateway Token
              </label>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Sessão Ativa
              </span>
            </div>
            <input
              type="password"
              value={waToken}
              onChange={(e) => setWaToken(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-slate-100 font-mono outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Webhook de Disparo Automático (n8n / Zapier)
              </label>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                POST 200 OK
              </span>
            </div>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-slate-100 font-mono outline-none"
            />
          </div>
        </div>

        {/* Scraping Engine Settings */}
        <div className="scifi-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Motor de Scraping & Anti-Bloqueio</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Threads Concorrentes
              </label>
              <select
                value={concurrency}
                onChange={(e) => setConcurrency(e.target.value)}
                className="w-full px-3 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono outline-none"
              >
                <option value="2">2 Threads (Seguro)</option>
                <option value="4">4 Threads (Balanceado)</option>
                <option value="6">6 Threads (Padrão V2)</option>
                <option value="12">12 Threads (Turbinado)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Delay Anti-CAPTCHA
              </label>
              <select
                value={requestDelay}
                onChange={(e) => setRequestDelay(e.target.value)}
                className="w-full px-3 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono outline-none"
              >
                <option value="0.8s">0.8s (Rápido)</option>
                <option value="1.2s">1.2s (Recomendado)</option>
                <option value="2.0s">2.0s (Cauteloso)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center justify-between text-xs text-slate-200 cursor-pointer p-2.5 rounded-xl bg-slate-900/40 border border-cyan-500/10">
              <div className="space-y-0.5">
                <div className="font-semibold">Rotação de Proxies Residenciais</div>
                <div className="text-[11px] text-slate-400">Muda de IP a cada 50 requisições geográficas</div>
              </div>
              <input
                type="checkbox"
                checked={proxyRotation}
                onChange={(e) => setProxyRotation(e.target.checked)}
                className="rounded border-cyan-500/40 text-cyan-500 bg-slate-900"
              />
            </label>
          </div>
        </div>

        {/* Futuristic Ambient & Visual Controls */}
        <div className="lg:col-span-2 scifi-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>Ambiente da Sala de Controle Sci-Fi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Particle Intensity */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/20 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Densidade de Partículas
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['high', 'medium', 'low', 'off'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onChangeParticleIntensity(lvl);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono capitalize transition-all ${
                      particleIntensity === lvl
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Canvas 2D com oscilação orgânica e nós de proximidade
              </div>
            </div>

            {/* Sound FX */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/20 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Efeitos Sonoros Sci-Fi
              </label>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onToggleSound();
                }}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                  soundEnabled
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{soundEnabled ? 'Sons Ativados (Web Audio)' : 'Sons Desativados'}</span>
              </button>
              <div className="text-[10px] text-slate-400 font-mono">
                Feedback tátil sintetizado nativamente no navegador
              </div>
            </div>

            {/* Holographic Glow */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/20 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Iluminação Holográfica
              </label>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setHolographicGlow(!holographicGlow);
                }}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                  holographicGlow
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>{holographicGlow ? 'Glow Ciano Ativado' : 'Modo Foco Sóbrio'}</span>
              </button>
              <div className="text-[10px] text-slate-400 font-mono">
                Halos ciano e azuis projetados atrás dos painéis
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
