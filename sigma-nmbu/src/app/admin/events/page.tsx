import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { requireAdmin } from '@/lib/admin-auth';
import { listAllEventsForAdmin } from '@/lib/events-admin';
import type { Locale } from '@/types/content';
import {
  AdminLink,
  AdminPageHeader,
  EmptyPanel,
} from '../_components/AdminForm';
import { deleteEventAction } from './actions';

export const dynamic = 'force-dynamic';

const locales: Locale[] = ['nb', 'en'];

export default async function AdminEventsPage() {
  await requireAdmin();
  const events = listAllEventsForAdmin();

  return (
    <main className="space-y-8">
      <AdminPageHeader
        title="Arrangementer"
        eyebrow="Admin Panel"
        action={<AdminLink href="/admin/events/new">New event</AdminLink>}
      />

      <div className="space-y-8">
        {locales.map((locale) => {
          const localeEvents = events.filter((event) => event.locale === locale);

          return (
            <section key={locale} className="space-y-3">
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-secondary">
                {locale}
              </h2>

              {localeEvents.length === 0 ? (
                <EmptyPanel>No events yet</EmptyPanel>
              ) : (
                <Panel className="overflow-hidden">
                  <div className="divide-y divide-line">
                    {localeEvents.map((event) => (
                      <div
                        key={`${event.locale}-${event.slug}`}
                        className="grid gap-3 px-4 py-4 md:grid-cols-[1.3fr_0.8fr_1fr_1fr_auto] md:items-center"
                      >
                        <div className="space-y-1">
                          <p className="font-mono text-sm text-on-surface">
                            {event.slug}
                          </p>
                          <p className="font-mono text-xs text-on-surface-variant">
                            {event.frontmatter.excerpt}
                          </p>
                        </div>
                        <p className="font-mono text-sm text-on-surface-variant">
                          {event.frontmatter.type}
                        </p>
                        <p className="font-mono text-sm text-on-surface-variant">
                          {event.frontmatter.timestamp}
                        </p>
                        <p className="font-mono text-sm text-on-surface-variant">
                          {event.frontmatter.location}
                        </p>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          <AdminLink
                            href={`/admin/events/${event.locale}/${event.slug}/edit`}
                            variant="ghost"
                          >
                            Edit
                          </AdminLink>
                          <form
                            action={deleteEventAction.bind(
                              null,
                              event.locale,
                              event.slug,
                            )}
                          >
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
            </section>
          );
        })}
      </div>
    </main>
  );
}
