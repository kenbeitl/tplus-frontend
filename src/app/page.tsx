'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';

export default function RootLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    } else if (status === 'unauthenticated') {
      signIn('keycloak', { callbackUrl: '/dashboard' });
    }
  }, [session, status, router]);

  return null;
}
