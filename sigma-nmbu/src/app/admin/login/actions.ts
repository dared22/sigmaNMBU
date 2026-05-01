'use server';

import { redirect } from 'next/navigation';
import {
  createSessionToken,
  setSessionCookie,
  verifyCredentials,
} from '@/lib/admin-auth';

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!verifyCredentials(username, password)) {
    redirect('/admin/login?error=1');
  }

  await setSessionCookie(createSessionToken(username));
  redirect('/admin');
}
