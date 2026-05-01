import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminPageHeader } from '../../_components/AdminForm';
import { createEventAction } from '../actions';
import { EventForm } from '../EventForm';

export const dynamic = 'force-dynamic';

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <main className="space-y-8">
      <AdminPageHeader title="New event" eyebrow="Arrangementer" />
      <Panel className="p-5">
        <EventForm action={createEventAction} />
      </Panel>
    </main>
  );
}
