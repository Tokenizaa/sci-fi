import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Download,
  ExternalLink,
  Phone,
  Globe,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import { LeadItem, ScreenType } from '../../types';
import { nichesSuggestions } from '../../data/mockData';
import { soundFx } from '../../utils/audio';

interface ResultadosScreenProps {
  leads: LeadItem[];
  onSelectLead: (lead: LeadItem) => void;
  onNavigate: (screen: ScreenType) => void;
  onTriggerExport: (selectedCount: number) => void;
}

export const ResultadosScreen: React.FC<ResultadosScreenProps> = ({
  leads,
  onSelectLead,
  onNavigate,
  onTriggerExport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [onlyWhatsapp, setOnlyWhatsapp] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);

      const matchesCategory =
        selectedCategory === 'todos' || lead.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesWhatsapp = !onlyWhatsapp || lead.whatsapp;

      return matchesSearch && matchesCategory && matchesWhatsapp;
    });
  }, [leads, searchTerm, selectedCategory, onlyWhatsapp]);

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage]);

  const toggleSelectAll = () => {
    soundFx.playClick();
    if (selectedIds.length === paginatedLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedLeads.map((l) => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    soundFx.playClick();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportSelected = () => {
    soundFx.playConfirm();
    onTriggerExport(selectedIds.length || filteredLeads.length);
    onNavigate('exportacoes');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Filter Toolbar with Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card animate-floating">
        <div className="absolute -inset-4 sm:-inset-5 rounded-3xl bg-gradient-to-r from-pink-500/40 via-cyan-400/50 to-[#00ff66]/40 blur-3xl opacity-90 pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] via-[#00ff66] to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                Repositório de Inteligência B2B
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Estabelecimentos Encontrados ({filteredLeads.length} registros)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportSelected}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Exportar {selectedIds.length > 0 ? `(${selectedIds.length})` : 'Lista'}</span>
            </button>
          </div>
        </div>

        {/* Search & Segment Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-4 border-t border-cyan-500/15">
          {/* Search bar */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por nome, telefone, bairro ou cidade..."
              className="w-full pl-10 pr-4 py-2 bg-[#04091a]/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Segment Selector */}
          <div className="lg:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-200 font-mono outline-none"
            >
              <option value="todos">Todos os Segmentos</option>
              {nichesSuggestions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp Toggle */}
          <div className="lg:col-span-3 flex items-center justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                setOnlyWhatsapp(!onlyWhatsapp);
                setCurrentPage(1);
              }}
              className={`w-full sm:w-auto px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                onlyWhatsapp
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${onlyWhatsapp ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span>Apenas com WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Panel with Expanding Backlight & LED Tube Border */}
      <div className="relative z-10 ambilight-card">
        <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/25 to-emerald-500/30 blur-2xl pointer-events-none -z-10" />

        <div className="scifi-panel led-tube-cyan rounded-2xl overflow-hidden relative">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan-500/20 bg-[#040a1d]/90 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 pr-3 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedLeads.length > 0 && selectedIds.length === paginatedLeads.length}
                    onChange={toggleSelectAll}
                    className="rounded border-cyan-500/40 text-cyan-500 focus:ring-cyan-500/40 bg-slate-900"
                  />
                </th>
                <th className="py-3.5 pr-4 font-medium">Nome do Estabelecimento</th>
                <th className="py-3.5 pr-4 font-medium">Segmento</th>
                <th className="py-3.5 pr-4 font-medium">Localização</th>
                <th className="py-3.5 pr-4 font-medium">Telefone / WhatsApp</th>
                <th className="py-3.5 pr-4 font-medium">Website</th>
                <th className="py-3.5 pr-4 font-medium text-center">Avaliação</th>
                <th className="py-3.5 pr-4 font-medium text-center">Status</th>
                <th className="py-3.5 pr-6 font-medium text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-mono text-xs">
                    Nenhum estabelecimento corresponde aos filtros aplicados.
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => {
                  const isSelected = selectedIds.includes(lead.id);

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-cyan-500/5 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-cyan-500/10' : ''
                      }`}
                      onClick={() => {
                        soundFx.playClick();
                        onSelectLead(lead);
                      }}
                    >
                      <td
                        className="py-3.5 pl-6 pr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(lead.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-cyan-500/40 text-cyan-500 focus:ring-cyan-500/40 bg-slate-900"
                        />
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs font-sans">
                          {lead.address}
                        </div>
                      </td>

                      <td className="py-3.5 pr-4 text-slate-300 font-mono text-[11px]">
                        {lead.category}
                      </td>

                      <td className="py-3.5 pr-4 text-slate-300 font-mono text-[11px]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400/70 shrink-0" />
                          <span>{lead.city}, {lead.state}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">{lead.neighborhood}</div>
                      </td>

                      <td className="py-3.5 pr-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          {lead.whatsapp && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                              WhatsApp
                            </span>
                          )}
                          <span className="text-slate-200 tabular-nums">{lead.phone}</span>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4 text-slate-400 font-mono text-[11px]">
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                          >
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[120px]">
                              {lead.website.replace('https://', '').replace('http://', '')}
                            </span>
                          </a>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      <td className="py-3.5 pr-4 text-center font-mono">
                        <span className="text-amber-300 font-bold tabular-nums">★ {lead.rating}</span>
                        <div className="text-slate-500 text-[10px]">({lead.reviewsCount} rev)</div>
                      </td>

                      <td className="py-3.5 pr-4 text-center font-mono">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border capitalize ${
                            lead.status === 'verificado'
                              ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                              : lead.status === 'enriquecido'
                              ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                              : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      <td className="py-3.5 pr-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playClick();
                            onSelectLead(lead);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ficha</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-cyan-500/15 bg-[#030818]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div>
            Página <span className="text-cyan-300 font-bold">{currentPage}</span> de <span className="text-slate-200">{totalPages}</span> · Total de {filteredLeads.length} estabelecimentos
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentPage((p) => Math.max(1, p - 1));
              }}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-cyan-500/20 bg-slate-900/50 hover:bg-cyan-500/10 text-slate-300 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentPage((p) => Math.min(totalPages, p + 1));
              }}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-cyan-500/20 bg-slate-900/50 hover:bg-cyan-500/10 text-slate-300 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
