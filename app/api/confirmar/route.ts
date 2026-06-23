import { NextRequest, NextResponse } from 'next/server';
import { getGuest } from '@/lib/guests';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, confirmados, observacao } = body;

    // Find guest details (Supabase first, then static list)
    let guestFamilia = '';
    let guestCriancas: string[] = [];

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const isSupabaseConfigured = supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder');

    if (isSupabaseConfigured) {
      try {
        const { createServerClient } = await import('@/lib/supabase');
        const supabase = createServerClient();

        const { data: dbGuest } = await supabase
          .from('convidados')
          .select('familia, criancas')
          .eq('token', token)
          .maybeSingle();

        if (dbGuest) {
          guestFamilia = dbGuest.familia;
          guestCriancas = dbGuest.criancas;
        }
      } catch (err) {
        console.error('Error querying guest for confirmation:', err);
      }
    }

    if (!guestFamilia) {
      const staticGuest = getGuest(token);
      if (staticGuest) {
        guestFamilia = staticGuest.familia;
        guestCriancas = staticGuest.criancas;
      }
    }

    if (!guestFamilia) {
      return NextResponse.json({ error: 'Convidado não encontrado' }, { status: 404 });
    }

    if (isSupabaseConfigured) {
      const { createServerClient } = await import('@/lib/supabase');
      const supabase = createServerClient();

      const { error } = await supabase.from('convidados').upsert(
        {
          token,
          familia: guestFamilia,
          criancas: guestCriancas,
          confirmado: true,
          confirmados: confirmados ?? [],
          data_confirmacao: new Date().toISOString(),
          observacao: observacao ?? null,
        },
        { onConflict: 'token' }
      );

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
      }
    } else {
      // Supabase not configured — log to console (for dev)
      console.log('✅ [DEV] Confirmação recebida:', {
        token,
        familia: guestFamilia,
        confirmados,
        observacao,
        data: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, message: 'Missão aceita com sucesso!' });
  } catch (err) {
    console.error('Erro na API confirmar:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
