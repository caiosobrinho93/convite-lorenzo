import { NextRequest, NextResponse } from 'next/server';
import { getGuest } from '@/lib/guests';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let dbGuest = null;

  if (supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createServerClient } = await import('@/lib/supabase');
      const supabase = createServerClient();

      const { data, error } = await supabase
        .from('convidados')
        .select('*')
        .eq('token', token)
        .maybeSingle();

      if (!error && data) {
        dbGuest = data;
      }
    } catch (err) {
      console.error('Error fetching guest from Supabase:', err);
    }
  }

  if (dbGuest) {
    return NextResponse.json(dbGuest);
  }

  // Fallback to static guests list
  const staticGuest = getGuest(token);
  if (staticGuest) {
    return NextResponse.json({
      token: staticGuest.token,
      familia: staticGuest.familia,
      criancas: staticGuest.criancas,
      confirmado: false,
      confirmados: [],
      data_confirmacao: null,
      observacao: null,
    });
  }

  return NextResponse.json(null, { status: 404 });
}
