import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { getBoard } from '@/lib/board';
import {
  AdminLink,
  AdminPageHeader,
  EmptyPanel,
} from '../_components/AdminForm';
import { deleteBoardMemberAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminBoardPage() {
  await requireAdmin();
  const members = getBoard().sort((a, b) => a.order - b.order);

  return (
    <main className="space-y-8">
      <AdminPageHeader
        title="Styret"
        eyebrow="Admin Panel"
        action={<AdminLink href="/admin/board/new">Add member</AdminLink>}
      />

      {members.length === 0 ? (
        <EmptyPanel>No board members</EmptyPanel>
      ) : (
        <Panel className="overflow-hidden">
          <div className="divide-y divide-line">
            {members.map((member) => (
              <div
                key={member.id}
                className="grid gap-3 px-4 py-4 md:grid-cols-[4rem_1.2fr_0.8fr_1fr_auto] md:items-center"
              >
                <p className="font-mono text-sm text-secondary">
                  #{member.order}
                </p>
                <div className="space-y-1">
                  <p className="font-mono text-sm text-on-surface">
                    {member.name}
                  </p>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {member.id}
                  </p>
                </div>
                <p className="font-mono text-sm text-on-surface-variant">
                  {member.class}
                </p>
                <p className="font-mono text-sm text-on-surface-variant">
                  {member.roleKey}
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <AdminLink href={`/admin/board/${member.id}/edit`} variant="ghost">
                    Edit
                  </AdminLink>
                  <form action={deleteBoardMemberAction.bind(null, member.id)}>
                    <Button type="submit" variant="terminal">
                      Delete
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </main>
  );
}
