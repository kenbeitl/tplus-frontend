'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Check for OAuth errors - don't redirect if there's an error
    const errorParam = searchParams.get('error');
    
    if (errorParam) {
      // Redirect to home with error param so it can be displayed
      router.push(`/?error=${errorParam}`);
      return;
    }

    // Small delay to ensure clean state before redirecting
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  return (
    <Box className="min-h-screen flex items-center justify-center">
      <Box className="text-center">
        <CircularProgress />
        <Typography variant="body1" className="mt-4">
          Redirecting...
        </Typography>
      </Box>
    </Box>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    }>
      <LoginContent />
    </Suspense>
  );
}
