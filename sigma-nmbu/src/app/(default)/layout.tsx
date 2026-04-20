import { getMessages, setRequestLocale } from 'next-intl/server';
import { SiteFrame } from '@/components/layout/SiteFrame';

export default async function DefaultLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale('nb');
  const messages = await getMessages();

  return <SiteFrame messages={messages}>{children}</SiteFrame>;
}
