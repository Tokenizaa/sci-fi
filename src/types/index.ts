export type ScreenType =
  | 'dashboard'
  | 'coleta'
  | 'resultados'
  | 'historico'
  | 'projetos'
  | 'logs'
  | 'configuracoes'
  | 'exportacoes'
  | 'login';

export interface LeadItem {
  id: string;
  name: string;
  category: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: boolean;
  website?: string;
  email?: string;
  instagram?: string;
  cnpj?: string;
  rating: number;
  reviewsCount: number;
  status: 'enriquecido' | 'pendente' | 'verificado';
  capturedAt: string;
  googleMapsUrl: string;
}

export interface CollectionHistoryItem {
  id: string;
  protocol: string;
  date: string;
  niche: string;
  location: string;
  requestedCount: number;
  capturedCount: number;
  duration: string;
  status: 'concluido' | 'em_andamento' | 'interrompido';
  projectId?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  niche: string;
  targetLocation: string;
  leadCount: number;
  lastActivity: string;
  status: 'ativo' | 'arquivado';
  tags: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  module: 'Scraper' | 'Enriquecimento' | 'Google Places' | 'Exportação' | 'Sistema' | 'Autenticação';
  message: string;
  details?: string;
}

export interface ExportItem {
  id: string;
  fileName: string;
  format: 'CSV' | 'XLSX' | 'JSON';
  recordCount: number;
  fileSize: string;
  createdAt: string;
  status: 'pronto' | 'processando' | 'expirado';
  downloadUrl?: string;
}
