import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Globe,
  Mail,
  Instagram,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LeadItem } from '../types';
import { soundFx } from '../utils/audio';

interface LeadDetailModalProps {
  lead: LeadItem | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!lead) return null;

  const copyToClipboard = (text: string, label: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="scifi-panel rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-7 shadow-[0_0_50px_rgba(0,240,255,0.25)]">
        {/* Top laser line accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 uppercase">
                {lead.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 uppercase">
                {lead.status}
              </span>
            </div>
            <h3 className="text-xl font-display font-bold text-white tracking-tight">
              {lead.name}
            </h3>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating and Quick Stats */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
              Avaliação Google
            </span>
            <span className="text-lg font-mono font-bold text-amber-300 tabular-nums">
              ★ {lead.rating}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
              Volume Reviews
            </span>
            <span className="text-lg font-mono font-bold text-cyan-300 tabular-nums">
              {lead.reviewsCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
              WhatsApp
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400 block mt-1">
              {lead.whatsapp ? 'Validado OK' : 'Não detectado'}
            </span>
          </div>
        </div>

        {/* Contact & Intelligence Dossier */}
        <div className="space-y-3 font-mono text-xs">
          {/* Telefone / WhatsApp */}
          <div className="p-3 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Telefone Principal</span>
                <span className="text-slate-100 font-bold tabular-nums">{lead.phone}</span>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(lead.phone, 'phone')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1"
            >
              {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'phone' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          {/* Endereço */}
          <div className="p-3 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15 flex items-start justify-between">
            <div className="flex items-start gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Endereço Completo</span>
                <span className="text-slate-100 font-sans text-xs">{lead.address}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">
                  {lead.neighborhood} · {lead.city}, {lead.state}
                </span>
              </div>
            </div>
            <a
              href={lead.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-[11px] transition-colors flex items-center gap-1 border border-cyan-500/30 shrink-0"
            >
              <span>Mapa</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Website */}
          {lead.website && (
            <div className="p-3 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 uppercase block">Website Oficial</span>
                  <span className="text-slate-100 truncate block">{lead.website}</span>
                </div>
              </div>
              <a
                href={lead.website}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>Acessar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* E-mail */}
          {lead.email && (
            <div className="p-3 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 uppercase block">E-mail Comercial</span>
                  <span className="text-slate-100 truncate block">{lead.email}</span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(lead.email!, 'email')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors flex items-center gap-1 shrink-0"
              >
                {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'email' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          )}

          {/* Instagram & CNPJ */}
          <div className="grid grid-cols-2 gap-3">
            {lead.instagram && (
              <div className="p-2.5 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15">
                <span className="text-[10px] text-slate-400 uppercase block">Instagram</span>
                <span className="text-cyan-300 truncate block mt-0.5">{lead.instagram}</span>
              </div>
            )}
            {lead.cnpj && (
              <div className="p-2.5 rounded-xl bg-[#040a1d]/80 border border-cyan-500/15">
                <span className="text-[10px] text-slate-400 uppercase block">CNPJ Estimado</span>
                <span className="text-slate-200 tabular-nums block mt-0.5">{lead.cnpj}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Extraído em {lead.capturedAt}</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            Fechar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
