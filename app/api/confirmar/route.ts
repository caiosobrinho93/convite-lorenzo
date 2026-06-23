import { NextRequest, NextResponse } from 'next/server';
import { getGuest } from '@/lib/guests';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, confirmados, observacao } = body;

    // Validate token
    const guest = getGuest(token);
    if (!guest) {
      return NextResponse.json({ error: 'Convidado não encontrado' }, { status: 404 });
    }

    // Try Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder')) {
      const { createServerClient } = await import('@/lib/supabase');
      const supabase = createServerClient();

      const { error } = await supabase.from('convidados').upsert(
        {
          token,
          familia: guest.familia,
          criancas: guest.criancas,
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
        familia: guest.familia,
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
