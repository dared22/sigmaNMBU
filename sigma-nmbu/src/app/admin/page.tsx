import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { getBoard } from '@/lib/board';
import { listAllEventsForAdmin } from '@/lib/events-admin';
import { AdminLink, AdminPageHeader } from './_components/AdminForm';
import { logoutAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const eventCount = listAllEventsForAdmin().length;
  const boardCount = getBoard().length;

  return (
    <main className="space-y-8">
      <AdminPageHeader
        title="Admin Panel"
        eyebrow="Sigma NMBU"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="status">{admin.username}</Badge>
            <form action={logoutAction}>
              <Button type="submit" variant="terminal">
                Log out
              </Button>
            </form>
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Panel className="space-y-5 p-5" stripe="primary">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-on-surface">
              Arrangementer
            </h2>
            <p className="font-mono text-sm text-on-surface-variant">
              {eventCount} events across nb and en.
            </p>
          </div>
          <AdminLink href="/admin/events">Open events</AdminLink>
        </Panel>

        <Panel className="space-y-5 p-5" stripe="secondary">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-semibold text-on-surface">
              Styret
            </h2>
            <p className="font-mono text-sm text-on-surface-variant">
              {boardCount} board members.
            </p>
          </div>
          <AdminLink href="/admin/board">Open board</AdminLink>
        </Panel>
      </section>
    </main>
  );
}
