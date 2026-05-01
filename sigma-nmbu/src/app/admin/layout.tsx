import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Sigma NMBU',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background px-4 py-6 text-on-surface md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}
