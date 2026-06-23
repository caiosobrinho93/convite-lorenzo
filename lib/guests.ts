import { Guest } from './types';

// Sistema de tokens — edite aqui para adicionar convidados
// Token = parte final da URL: /convite/SEU-TOKEN
export const guests: Record<string, Guest> = {
  // ─── EXEMPLO DE CONVIDADOS ─────────────────────────────────
  // Substitua pelos convidados reais antes de enviar os links
  'familia-silva': {
    token: 'familia-silva',
    familia: 'Família Silva',
    criancas: ['João', 'Maria'],
  },
  'familia-souza': {
    token: 'familia-souza',
    familia: 'Família Souza',
    criancas: ['Pedro'],
  },
  'familia-costa': {
    token: 'familia-costa',
    familia: 'Família Costa',
    criancas: ['Ana', 'Lucas'],
  },
  'familia-santos': {
    token: 'familia-santos',
    familia: 'Família Santos',
    criancas: ['Isabela', 'Miguel', 'Sofia'],
  },
  // ─── TOKEN DE PREVIEW (sem crianças) ──────────────────────
  preview: {
    token: 'preview',
    familia: 'Convidado Especial',
    criancas: [],
  },
};

export function getGuest(token: string): Guest | null {
  return guests[token] ?? null;
}
