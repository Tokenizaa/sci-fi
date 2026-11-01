import React, { useState, useEffect } from 'react';
import { Search, X, Building2, MapPin, Phone, ArrowRight } from 'lucide-react';
import { LeadItem } from '../types';
import { soundFx } from '../utils/audio';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadItem[];
  onSelectLead: (lead: LeadItem) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  leads,
  onSelectLead,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.category.toLowerCase().includes(query.toLowerCase()) ||
      l.city.toLowerCase().includes(query.toLowerCase()) ||
      l.phone.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="scifi-panel rounded-2xl w-full max-w-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.3)]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-cyan-500/20 flex items-center gap-3 bg-[#030818]/90">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar estabelecimento, nicho, cidade ou telefone..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-cyan-500/10">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              Nenhum estabelecimento encontrado para "{query}".
            </div>
          ) : (
            results.map((lead) => (
              <div
                key={lead.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectLead(lead);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-cyan-500/10 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
                      {lead.name}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/80">
                      {lead.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                    <span>{lead.city}, {lead.state}</span>
                    <span>·</span>
                    <span className="text-slate-300">{lead.phone}</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#030612] border-t border-cyan-500/15 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>{results.length} resultados encontrados</span>
          <span>Pressione ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};
