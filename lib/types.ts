export interface Guest {
  token: string;
  familia: string;
  criancas: string[];
}

export interface GuestRecord {
  id: string;
  token: string;
  familia: string;
  criancas: string[];
  confirmado: boolean;
  confirmados: string[];
  data_confirmacao: string | null;
  observacao: string | null;
  created_at: string;
}

export interface ConfirmPayload {
  token: string;
  confirmados: string[];
  observacao?: string;
}
