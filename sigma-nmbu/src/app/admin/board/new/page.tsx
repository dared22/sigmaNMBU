import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { AdminPageHeader } from '../../_components/AdminForm';
import { createBoardMemberAction } from '../actions';
import { BoardForm } from '../BoardForm';

export const dynamic = 'force-dynamic';

export default async function NewBoardMemberPage() {
  await requireAdmin();

  return (
    <main className="space-y-8">
      <AdminPageHeader title="Add member" eyebrow="Styret" />
      <Panel className="p-5">
        <BoardForm action={createBoardMemberAction} />
      </Panel>
    </main>
  );
}
