import { notFound } from 'next/navigation';
import { getGuest } from '@/lib/guests';
import InviteExperience from '@/components/InviteExperience';

interface ConvitePageProps {
  params: Promise<{ token: string }>;
}

async function getGuestData(token: string) {
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
      console.error('Error fetching guest in Server Component:', err);
    }
  }

  if (dbGuest) {
    return {
      token: dbGuest.token,
      familia: dbGuest.familia,
      criancas: dbGuest.criancas,
      confirmado: dbGuest.confirmado,
      confirmados: dbGuest.confirmados,
      observacao: dbGuest.observacao,
    };
  }

  // Fallback to static guests
  const staticGuest = getGuest(token);
  if (staticGuest) {
    return {
      token: staticGuest.token,
      familia: staticGuest.familia,
      criancas: staticGuest.criancas,
      confirmado: false,
      confirmados: [],
      observacao: null,
    };
  }

  return null;
}

export default async function ConvitePage({ params }: ConvitePageProps) {
  const { token } = await params;
  const record = await getGuestData(token);

  if (!record) notFound();

  return (
    <InviteExperience
      token={token}
      familia={record.familia}
      criancas={record.criancas}
      jaConfirmado={record.confirmado}
      confirmadosAnteriores={record.confirmados}
    />
  );
}

export async function generateMetadata({ params }: ConvitePageProps) {
  const { token } = await params;
  const record = await getGuestData(token);
  
  if (!record) return { title: 'Convite não encontrado' };
  
  return {
    title: `⚠️ Missão Especial para ${record.familia} — Aniversário do Lorenzo 🕷️`,
    description: `${record.familia}, você foi escolhido para a missão especial do aniversário de 6 anos do Lorenzo!`,
  };
}
