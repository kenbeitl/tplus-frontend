'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, Alert, Button, CircularProgress } from '@mui/material';

export default function RootLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      // Map OAuth errors to user-friendly messages
      const errorMessages: Record<string, string> = {
        'OAuthSignin': 'Failed to start OAuth sign-in. Please check your Keycloak configuration.',
        'OAuthCallback': 'Failed to process OAuth callback. Please verify redirect URIs in Keycloak.',
        'OAuthCreateAccount': 'Failed to create user account. Please contact support.',
        'OAuthAccountNotLinked': 'Account not linked. Please use the same sign-in method.',
        'EmailCreateAccount': 'Failed to create account with email.',
        'Callback': 'OAuth callback error. Please check Keycloak settings.',
        'Configuration': 'NextAuth configuration error. Please check environment variables.',
        'AccessDenied': 'Access denied. You may not have permission to sign in.',
        'Verification': 'Verification token has expired or is invalid.',
      };
      
      setError(errorMessages[errorParam] || `Authentication error: ${errorParam}`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    } else if (status === 'unauthenticated' && !error) {
      signIn('keycloak', { callbackUrl: '/dashboard' });
    }
  }, [session, status, router, error]);

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen p-6">
        <Box className="max-w-md w-full">
          <Alert severity="error" className="mb-4">
            <Typography variant="h6" component="div" className="mb-2">
              Authentication Error
            </Typography>
            <Typography variant="body2">
              {error}
            </Typography>
          </Alert>
          
          <Box className="space-y-2">
            <Typography variant="body2" color="text.secondary">
              Common causes:
            </Typography>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Incorrect Keycloak client configuration</li>
              <li>Missing or invalid redirect URI in Keycloak</li>
              <li>Environment variables not set correctly</li>
              <li>Network connectivity issues</li>
            </ul>
          </Box>

          <Box className="flex gap-2 mt-6">
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                setError(null);
                router.push('/');
              }}
              fullWidth
            >
              Try Again
            </Button>
            <Button 
              variant="outlined"
              onClick={() => window.location.href = '/api/auth/error?error=' + searchParams.get('error')}
              fullWidth
            >
              View Details
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex items-center justify-center min-h-screen">
      <CircularProgress />
    </Box>
  );
}
