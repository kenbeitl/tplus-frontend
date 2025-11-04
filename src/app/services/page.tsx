'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard or first service
    router.replace('/');
  }, [router]);

  return null;
}