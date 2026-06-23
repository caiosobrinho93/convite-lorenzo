import { notFound } from 'next/navigation';
import { getGuest } from '@/lib/guests';
import InviteExperience from '@/components/InviteExperience';

interface ConvitePageProps {
  params: Promise<{ token: string }>;
}

async function getGuestRecord(token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/convidados/${token}`, {
      cache: 'no-store',
    });
    if (res.ok) return await res.json();
  } catch {
    // Supabase not configured
  }
  return null;
}

export default async function ConvitePage({ params }: ConvitePageProps) {
  const { token } = await params;
  const guest = getGuest(token);

  if (!guest) notFound();

  const record = await getGuestRecord(token);
  const jaConfirmado = record?.confirmado ?? false;
  const confirmadosAnteriores: string[] = record?.confirmados ?? [];

  return (
    <InviteExperience
      token={token}
      familia={guest.familia}
      criancas={guest.criancas}
      jaConfirmado={jaConfirmado}
      confirmadosAnteriores={confirmadosAnteriores}
    />
  );
}

export async function generateMetadata({ params }: ConvitePageProps) {
  const { token } = await params;
  const guest = getGuest(token);
  if (!guest) return { title: 'Convite não encontrado' };
  return {
    title: `⚠️ Missão Especial para ${guest.familia} — Aniversário do Lorenzo 🕷️`,
    description: `${guest.familia}, você foi escolhido para a missão especial do aniversário de 6 anos do Lorenzo!`,
  };
}
