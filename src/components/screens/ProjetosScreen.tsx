import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Users,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { ProjectItem, ScreenType } from '../../types';
import { soundFx } from '../../utils/audio';

interface ProjetosScreenProps {
  projects: ProjectItem[];
  onNavigate: (screen: ScreenType) => void;
  onAddProject: (project: ProjectItem) => void;
}

export const ProjetosScreen: React.FC<ProjetosScreenProps> = ({
  projects,
  onNavigate,
  onAddProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    soundFx.playConfirm();
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name,
      description: description || 'Campanha de prospecção comercial customizada.',
      niche: niche || 'Geral B2B',
      targetLocation: location || 'Brasil',
      leadCount: 0,
      lastActivity: 'Criado agora',
      status: 'ativo',
      tags: ['Novo', niche || 'Prospecção'],
    };

    onAddProject(newProj);
    setIsModalOpen(false);
    setName('');
    setDescription('');
    setNiche('');
    setLocation('');
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
                <FolderKanban className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Segmentação Estratégica
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Workspaces & Projetos de Prospecção
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Organize suas listas de leads por campanha, cliente, nicho ou região geográfica
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setIsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Novo Projeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid with Expanding Backlights & LED Tube Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="relative z-10 ambilight-cyan group">
            <div className="absolute -inset-3 rounded-3xl bg-cyan-400/30 group-hover:bg-cyan-400/50 blur-2xl opacity-75 group-hover:opacity-100 transition-all pointer-events-none -z-10" />

            <div
              className="scifi-panel-interactive led-tube-cyan rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        proj.status === 'ativo'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {proj.status}
                    </span>
                    <span className="text-xs font-mono text-cyan-400/80">{proj.niche}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-display font-bold text-cyan-300 tabular-nums">
                    {proj.leadCount.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">leads vinculados</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {proj.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-cyan-400/70" />
                  <span>{proj.targetLocation}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{proj.lastActivity}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-cyan-200 border border-cyan-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('resultados');
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
              >
                <span>Acessar Base deste Projeto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundFx.playPulse();
                  onNavigate('coleta');
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 transition-colors"
              >
                + Coletar Mais
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>

      {/* Modal: Novo Projeto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="scifi-panel led-tube-cyan rounded-2xl w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-display font-bold text-white">Criar Novo Projeto</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Nome do Projeto
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Clínicas Premium Belo Horizonte - Q1"
                  required
                  className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Segmento / Nicho
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Ex: Clínicas Odontológicas"
                  className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Cidades ou Regiões Alvo
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Belo Horizonte, Contagem e Betim - MG"
                  className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Descrição / Objetivo Estratégico
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Objetivo da prospecção, equipe responsável..."
                  rows={3}
                  className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-display font-bold text-xs uppercase tracking-wider"
                >
                  Criar Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
