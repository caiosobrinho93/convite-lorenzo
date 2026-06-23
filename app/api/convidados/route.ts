import { NextRequest, NextResponse } from 'next/server';
import { guests } from '@/lib/guests';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const senha = searchParams.get('senha');
  const adminPassword = process.env.ADMIN_PASSWORD || 'lorenzo2026';

  if (senha !== adminPassword) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder')) {
    const { createServerClient } = await import('@/lib/supabase');
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('convidados')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
    }

    return NextResponse.json({ data });
  }

  // Fallback: return guest list from local config (no confirmation data)
  const localData = Object.values(guests).map((g) => ({
    id: g.token,
    token: g.token,
    familia: g.familia,
    criancas: g.criancas,
    confirmado: false,
    confirmados: [],
    data_confirmacao: null,
    observacao: null,
    created_at: new Date().toISOString(),
  }));

  return NextResponse.json({ data: localData, dev: true });
}
