// app/page.tsx (Server Component)
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth'; // e.g. reads cookie/session

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (user.role === 'admin') {
    redirect('/admin');
  }

  redirect('/dashboard');
}
