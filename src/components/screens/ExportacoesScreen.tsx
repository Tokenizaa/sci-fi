import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Database,
  X,
  Check,
} from 'lucide-react';
import { ExportItem, ScreenType } from '../../types';
import { soundFx } from '../../utils/audio';

interface ExportacoesScreenProps {
  exports: ExportItem[];
  onAddExport: (item: ExportItem) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ExportacoesScreen: React.FC<ExportacoesScreenProps> = ({
  exports,
  onAddExport,
  onNavigate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [format, setFormat] = useState<'CSV' | 'XLSX' | 'JSON'>('CSV');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Field selection state for export modal
  const [fields, setFields] = useState({
    nome: true,
    telefone: true,
    whatsapp: true,
    website: true,
    endereco: true,
    avaliacao: true,
    cnpj: true,
    email: true,
    instagram: true,
  });

  const handleDownload = (item: ExportItem) => {
    soundFx.playConfirm();
    setDownloadToast(`Download iniciado: ${item.fileName}`);

    // Create a real downloadable text blob so the user actually gets a real demonstration file!
    const sampleCsv = `Nome,Segmento,Telefone,WhatsApp,Cidade,Avaliacao\n"Clinica Odonto Sorriso Prime","Odonto","(11) 3289-4050","Sim","Sao Paulo","4.9"\n"Academia Iron Tech Fitness","Fitness","(11) 3045-8822","Sim","Sao Paulo","4.7"\n"Bistro Terraço Fogo","Restaurante","(11) 3168-9900","Sim","Sao Paulo","4.9"`;
    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', item.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  const handleCreateExport = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playConfirm();

    const name = fileName ? fileName.replace(/\.[^/.]+$/, '') : `export_leads_${Date.now()}`;
    const extension = format.toLowerCase();
    const finalName = `${name}.${extension}`;

    const newExp: ExportItem = {
      id: `exp-${Date.now()}`,
      fileName: finalName,
      format,
      recordCount: 150,
      fileSize: format === 'JSON' ? '1.4 MB' : format === 'XLSX' ? '640 KB' : '410 KB',
      createdAt: 'Agora mesmo',
      status: 'pronto',
    };

    onAddExport(newExp);
    setIsModalOpen(false);
    setFileName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="scifi-panel rounded-2xl p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                Repositório de Arquivos & Dados
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Exportações & Downloads
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Baixe os dados estruturados de estabelecimentos para integração com CRM, planilhas ou automações
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
            <span>Nova Exportação</span>
          </button>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Exports Table */}
      <div className="scifi-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan-500/20 bg-[#040a1d]/90 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 pr-4 font-medium">Nome do Arquivo</th>
                <th className="py-3.5 pr-4 font-medium text-center">Formato</th>
                <th className="py-3.5 pr-4 font-medium text-center">Registros</th>
                <th className="py-3.5 pr-4 font-medium text-center">Tamanho</th>
                <th className="py-3.5 pr-4 font-medium">Criado Em</th>
                <th className="py-3.5 pr-4 font-medium text-center">Status</th>
                <th className="py-3.5 pr-6 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {exports.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cyan-500/5 transition-colors group"
                >
                  <td className="py-4 pl-6 pr-4 font-semibold text-slate-100 flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {item.format === 'CSV' ? (
                        <FileText className="w-4 h-4" />
                      ) : item.format === 'XLSX' ? (
                        <FileSpreadsheet className="w-4 h-4" />
                      ) : (
                        <Database className="w-4 h-4" />
                      )}
                    </div>
                    <span className="truncate max-w-sm">{item.fileName}</span>
                  </td>

                  <td className="py-4 pr-4 text-center font-mono">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold">
                      {item.format}
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-center font-mono text-cyan-300 font-bold tabular-nums">
                    {item.recordCount.toLocaleString()}
                  </td>

                  <td className="py-4 pr-4 text-center font-mono text-slate-400 tabular-nums">
                    {item.fileSize}
                  </td>

                  <td className="py-4 pr-4 font-mono text-slate-300 text-[11px]">
                    {item.createdAt}
                  </td>

                  <td className="py-4 pr-4 text-center font-mono">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 capitalize">
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <button
                      onClick={() => handleDownload(item)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all text-xs font-mono inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Nova Exportação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="scifi-panel rounded-2xl w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-display font-bold text-white">Configurar Nova Exportação</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExport} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Nome do Arquivo
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Ex: leads_clinicas_odontologicas_sp_q4"
                  className="w-full px-3.5 py-2 bg-[#04091a]/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Formato de Saída
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['CSV', 'XLSX', 'JSON'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
                        format === fmt
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                          : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Campos para Exportação
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(fields).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.checked }))}
                        className="rounded border-cyan-500/40 text-cyan-500 bg-slate-900"
                      />
                      <span className="capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-cyan-500/15">
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
                  Gerar Arquivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
