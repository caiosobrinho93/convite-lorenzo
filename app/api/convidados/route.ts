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

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const senha = searchParams.get('senha');
  const adminPassword = process.env.ADMIN_PASSWORD || 'lorenzo2026';

  if (senha !== adminPassword) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { familia, criancas } = body;

    if (!familia) {
      return NextResponse.json({ error: 'Nome da família é obrigatório' }, { status: 400 });
    }

    // Generate token: slugify the family name
    let token = familia
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/\s+/g, '-'); // replace spaces with hyphens

    if (!token) {
      token = 'convidado-' + Math.random().toString(36).substring(2, 7);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder')) {
      const { createServerClient } = await import('@/lib/supabase');
      const supabase = createServerClient();

      // Check if token already exists, if so append a suffix to keep it unique
      let tokenExists = true;
      let finalToken = token;
      let suffix = 1;

      while (tokenExists) {
        const { data } = await supabase
          .from('convidados')
          .select('token')
          .eq('token', finalToken)
          .maybeSingle();

        if (!data) {
          tokenExists = false;
        } else {
          finalToken = `${token}-${suffix}`;
          suffix++;
        }
      }

      const { data, error } = await supabase
        .from('convidados')
        .insert({
          token: finalToken,
          familia,
          criancas: criancas ?? [],
          confirmado: false,
          confirmados: [],
          data_confirmacao: null,
          observacao: null,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error inserting guest:', error);
        return NextResponse.json({ error: 'Erro ao criar convidado no banco de dados' }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
    }
  } catch (err) {
    console.error('Erro ao adicionar convidado:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const senha = searchParams.get('senha');
  const token = searchParams.get('token');
  const adminPassword = process.env.ADMIN_PASSWORD || 'lorenzo2026';

  if (senha !== adminPassword) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  if (!token) {
    return NextResponse.json({ error: 'Token é obrigatório' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey && !supabaseUrl.includes('placeholder')) {
    const { createServerClient } = await import('@/lib/supabase');
    const supabase = createServerClient();

    const { error } = await supabase
      .from('convidados')
      .delete()
      .eq('token', token);

    if (error) {
      console.error('Supabase error deleting guest:', error);
      return NextResponse.json({ error: 'Erro ao excluir convidado' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
}
