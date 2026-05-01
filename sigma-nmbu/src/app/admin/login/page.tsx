import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { getCurrentAdmin } from '@/lib/admin-auth';
import { AdminField, AdminInput } from '../_components/AdminForm';
import { loginAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect('/admin');
  }

  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
      <Panel className="w-full p-6" stripe="primary">
        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">
              /admin
            </p>
            <h1 className="font-headline text-3xl font-semibold text-on-surface">
              Admin Login
            </h1>
          </div>

          {error === '1' ? (
            <p className="border border-error/30 bg-error/10 px-3 py-2 font-mono text-sm text-error">
              Invalid username or password.
            </p>
          ) : null}

          <div className="space-y-4">
            <AdminField label="Username">
              <AdminInput name="username" autoComplete="username" required />
            </AdminField>
            <AdminField label="Password">
              <AdminInput
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </AdminField>
          </div>

          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Panel>
    </main>
  );
}
