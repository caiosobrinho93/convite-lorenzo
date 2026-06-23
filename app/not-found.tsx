import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(160deg, #0A0A1A 0%, #1A0A0A 100%)' }}
    >
      <div className="text-7xl mb-4">🕷️</div>
      <h1
        className="text-5xl text-gradient-red font-display mb-3"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
      >
        LINK INVÁLIDO
      </h1>
      <p className="text-white/60 text-base mb-8 max-w-xs">
        Esse convite não foi encontrado. Verifique o link que você recebeu no WhatsApp.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full text-white font-semibold text-sm"
        style={{ background: 'linear-gradient(135deg, #C0392B, #E53935)' }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
