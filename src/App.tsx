import React, { useState } from 'react';
import { ScreenType, LeadItem, CollectionHistoryItem, ProjectItem, LogEntry, ExportItem } from './types';
import { initialLeads, initialHistory, initialProjects, initialLogs, initialExports } from './data/mockData';
import { BackgroundEnvironment } from './components/BackgroundEnvironment';
import { ParticleCanvas } from './components/ParticleCanvas';
import { HolographicGridOverlay } from './components/HolographicGridOverlay';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ColetaScreen } from './components/screens/ColetaScreen';
import { ResultadosScreen } from './components/screens/ResultadosScreen';
import { HistoricoScreen } from './components/screens/HistoricoScreen';
import { ProjetosScreen } from './components/screens/ProjetosScreen';
import { LogsScreen } from './components/screens/LogsScreen';
import { ConfiguracoesScreen } from './components/screens/ConfiguracoesScreen';
import { ExportacoesScreen } from './components/screens/ExportacoesScreen';
import { LeadDetailModal } from './components/LeadDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { VoiceAssistantBar } from './components/VoiceAssistantBar';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [history, setHistory] = useState<CollectionHistoryItem[]>(initialHistory);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [exportsList, setExportsList] = useState<ExportItem[]>(initialExports);

  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particleIntensity, setParticleIntensity] = useState<'high' | 'medium' | 'low' | 'off'>('high');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  const handleAddLeads = (newLeads: LeadItem[]) => {
    setLeads((prev) => [...newLeads, ...prev]);

    // Also register an entry in the history
    const newHistoryItem: CollectionHistoryItem = {
      id: `col-${Date.now()}`,
      protocol: `COL-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      date: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      niche: newLeads[0]?.category || 'Clínicas Odontológicas',
      location: `${newLeads[0]?.city || 'São Paulo'}, SP (Raio 15km)`,
      requestedCount: newLeads.length,
      capturedCount: newLeads.length,
      duration: '1m 18s',
      status: 'concluido',
    };
    setHistory((prev) => [newHistoryItem, ...prev]);

    // Register log
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toTimeString().split(' ')[0],
      level: 'success',
      module: 'Scraper',
      message: `Varredura concluída: ${newLeads.length} novos estabelecimentos adicionados à base de dados.`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleAddProject = (project: ProjectItem) => {
    setProjects((prev) => [project, ...prev]);
  };

  const handleAddExport = (exportItem: ExportItem) => {
    setExportsList((prev) => [exportItem, ...prev]);
  };

  const handleRepeatScrape = (historyItem: CollectionHistoryItem) => {
    setCurrentScreen('coleta');
  };

  const handleTriggerExport = (count: number) => {
    const newExp: ExportItem = {
      id: `exp-${Date.now()}`,
      fileName: `export_maisclientes_v2_${Date.now()}.csv`,
      format: 'CSV',
      recordCount: count,
      fileSize: `${Math.round(count * 2.8)} KB`,
      createdAt: 'Agora mesmo',
      status: 'pronto',
    };
    handleAddExport(newExp);
  };

  // If in Login screen, show standalone login mode
  if (currentScreen === 'login') {
    return (
      <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
        <BackgroundEnvironment />
        <ParticleCanvas intensity={particleIntensity} />
        <LoginScreen onLoginSuccess={() => setCurrentScreen('dashboard')} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      {/* Sci-Fi Background Layer with Panoramic Command Center */}
      <BackgroundEnvironment />

      {/* Dynamic Holographic Pulsing Grid Matrix Overlay */}
      <HolographicGridOverlay />

      {/* Floating Canvas 2D Particle Atmosphere */}
      <ParticleCanvas intensity={particleIntensity} />

      {/* Navigation Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        totalLeadsCount={leads.length}
      />

      {/* Main Content Area */}
      <div className="relative z-10 lg:pl-72 flex flex-col min-h-screen">
        {/* Top Control Bar */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          particleIntensity={particleIntensity}
          onChangeParticleIntensity={setParticleIntensity}
          onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
          onToggleVoiceAssistant={() => setIsVoiceAssistantOpen((prev) => !prev)}
          isVoiceAssistantActive={isVoiceAssistantOpen}
        />

        {/* Viewport Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1580px] w-full mx-auto">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={setCurrentScreen}
              leads={leads}
              history={history}
              onSelectLead={setSelectedLead}
            />
          )}

          {currentScreen === 'coleta' && (
            <ColetaScreen
              onNavigate={setCurrentScreen}
              onAddLeads={handleAddLeads}
              onSelectLead={setSelectedLead}
            />
          )}

          {currentScreen === 'resultados' && (
            <ResultadosScreen
              leads={leads}
              onSelectLead={setSelectedLead}
              onNavigate={setCurrentScreen}
              onTriggerExport={handleTriggerExport}
            />
          )}

          {currentScreen === 'historico' && (
            <HistoricoScreen
              history={history}
              onNavigate={setCurrentScreen}
              onRepeatScrape={handleRepeatScrape}
            />
          )}

          {currentScreen === 'projetos' && (
            <ProjetosScreen
              projects={projects}
              onNavigate={setCurrentScreen}
              onAddProject={handleAddProject}
            />
          )}

          {currentScreen === 'logs' && (
            <LogsScreen
              logs={logs}
              onClearLogs={() => setLogs([])}
            />
          )}

          {currentScreen === 'exportacoes' && (
            <ExportacoesScreen
              exports={exportsList}
              onAddExport={handleAddExport}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'configuracoes' && (
            <ConfiguracoesScreen
              particleIntensity={particleIntensity}
              onChangeParticleIntensity={setParticleIntensity}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />
          )}
        </main>
      </div>

      {/* Sci-Fi Voice Assistant Bar & Audio Frequency Visualizer */}
      <VoiceAssistantBar
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        onNavigate={setCurrentScreen}
        onTriggerStartScrape={() => setCurrentScreen('coleta')}
      />

      {/* Modals & Slide-overs */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        leads={leads}
        onSelectLead={setSelectedLead}
      />
    </div>
  );
}

