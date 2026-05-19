import { headers } from "next/headers";
import { grotesk, inter, mono } from "@/lib/fonts";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const locale = headerStore.get("X-NEXT-INTL-LOCALE") ?? "nb";

  return (
    <html
      lang={locale}
      className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        {/*
          display=block (not swap): this is an icon ligature font, so swap would
          flash the raw text ("terminal", "login") before glyphs load. block keeps
          icons invisible until ready, which is correct for icon fonts.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
        <link rel="icon" type="image/png" href="/brand/sigma-nmbu-logo.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/brand/sigma-nmbu-logo.png"
        />
      </head>
      <body className="min-h-screen bg-background font-body text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
