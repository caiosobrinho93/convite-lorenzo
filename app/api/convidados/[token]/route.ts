import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey || supabaseUrl.includes('placeholder')) {
    return NextResponse.json(null, { status: 404 });
  }

  const { createServerClient } = await import('@/lib/supabase');
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('convidados')
    .select('confirmado, confirmados')
    .eq('token', token)
    .single();

  if (error || !data) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(data);
}
