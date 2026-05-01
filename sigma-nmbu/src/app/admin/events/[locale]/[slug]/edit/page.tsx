import { notFound } from 'next/navigation';
import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { readEventForAdmin } from '@/lib/events-admin';
import type { Locale } from '@/types/content';
import { AdminPageHeader } from '../../../../_components/AdminForm';
import { updateEventAction } from '../../../actions';
import { EventForm } from '../../../EventForm';

export const dynamic = 'force-dynamic';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  await requireAdmin();
  const { locale, slug } = await params;
  const event = readEventForAdmin(locale, slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <AdminPageHeader title="Edit event" eyebrow={`${locale}/${slug}`} />
      <Panel className="p-5">
        <EventForm action={updateEventAction.bind(null, locale, slug)} event={event} />
      </Panel>
    </main>
  );
}
