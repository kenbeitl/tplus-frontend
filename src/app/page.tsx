'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';

export default function RootLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for OAuth errors in URL
    const errorParam = searchParams.get('error');
    
    if (errorParam) {
      setError(errorParam);
      return; // Don't redirect on error
    }

    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    } else if (status === 'unauthenticated') {
      signIn('keycloak', { callbackUrl: '/dashboard' });
    }
  }, [session, status, router, searchParams]);

  // Show error message if OAuth failed
  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center p-4">
        <Box className="text-center max-w-md">
          <Typography variant="h4" component="h1" className="mb-4 text-red-600">
            Authentication Error
          </Typography>
          <Typography variant="body1" className="mb-6">
            {error === 'OAuthSignin' && 'There was a problem signing in with your account.'}
            {error === 'OAuthCallback' && 'There was a problem processing the authentication callback.'}
            {error === 'OAuthCreateAccount' && 'There was a problem creating your account.'}
            {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount'].includes(error) && `Error: ${error}`}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setError(null);
              router.push('/login');
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return null;
}
