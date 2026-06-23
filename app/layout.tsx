import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '⚠️ Missão Especial — Aniversário do Lorenzo 🕷️',
  description:
    'Você foi escolhido para uma missão muito importante. O Lorenzo está completando 6 anos e quer você na equipe de heróis!',
  openGraph: {
    title: '⚠️ Missão Especial — Aniversário do Lorenzo',
    description:
      'Você foi escolhido para uma missão muito importante. O Lorenzo está completando 6 anos!',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '⚠️ Missão Especial — Aniversário do Lorenzo',
    description: 'Você foi escolhido para uma missão muito importante!',
  },

};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0A1A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-spider-dark text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
