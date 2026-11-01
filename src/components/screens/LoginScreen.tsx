import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { soundFx } from '../../utils/audio';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('osvaldo@maisclientes.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Por favor insira um e-mail válido.');
      return;
    }
    soundFx.playConfirm();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleDemoAccess = () => {
    soundFx.playConfirm();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 450);
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
      {/* Central Login Pod */}
      <div className="w-full max-w-md">
        {/* Holographic Header Container */}
        <div className="text-center mb-8 flex flex-col items-center">
          <BrandLogo size="lg" className="mb-4" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TERMINAL DE ACESSO SEGURO V2</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            Central de inteligência geolocalizada e prospecção massiva B2B
          </p>
        </div>

        {/* Futuristic Glass Card with Expanding Backlight & LED Tube Border */}
        <div className="relative z-10 ambilight-card animate-floating">
          <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#ff007f]/45 via-[#00f0ff]/55 to-[#00ff66]/45 blur-3xl opacity-95 pointer-events-none -z-10" />

          <div className="scifi-panel led-tube-cyan rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Subtle top laser glow accent */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#00ff66] to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Identificação do Operador (E-mail)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operador@maisclientes.io"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Chave de Acesso / Senha
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => e.preventDefault()}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Esqueceu a chave?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-sans"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-slate-900 font-mono text-xs">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Autenticando no Nó de Controle...</span>
                </div>
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-5 pt-5 border-t border-cyan-500/20 text-center">
            <button
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Acessar Demonstração Imediata</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ambiente Seguro Criptografado TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
        <div className="mt-6 text-center text-[11px] font-mono text-slate-400">
          <span>Mais Clientes V2 — Plataforma de Prospecção & Inteligência Comercial</span>
        </div>
      </div>
    </div>
  );
};
