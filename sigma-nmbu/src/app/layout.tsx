import { headers } from 'next/headers';
import { grotesk, mono } from '@/lib/fonts';
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const locale = headerStore.get('X-NEXT-INTL-LOCALE') ?? 'nb';

  return (
    <html lang={locale} className={`${grotesk.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg font-mono text-neutral antialiased">
        {children}
      </body>
    </html>
  );
}
