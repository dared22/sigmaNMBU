import { notFound } from 'next/navigation';
import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { getBoard } from '@/lib/board';
import { AdminPageHeader } from '../../../_components/AdminForm';
import { updateBoardMemberAction } from '../../actions';
import { BoardForm } from '../../BoardForm';

export const dynamic = 'force-dynamic';

export default async function EditBoardMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const member = getBoard().find((item) => item.id === id);

  if (!member) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <AdminPageHeader title="Edit member" eyebrow={id} />
      <Panel className="p-5">
        <BoardForm action={updateBoardMemberAction.bind(null, id)} member={member} />
      </Panel>
    </main>
  );
}
