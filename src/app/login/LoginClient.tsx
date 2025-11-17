'use client';

import { useSession, signIn } from 'next-auth/react';
import {
  Box,
  Card,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import Logo from '@/assets/svg/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActionButton from '@/components/ActionButton';

export default function LoginClient() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        if (status === 'authenticated' && session) {
            console.log('Session authenticated, redirecting to dashboard');
            router.push('/dashboard');
        }
    }, [session, status, router]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signIn('keycloak', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container 
                maxWidth="md"
                className="flex items-center justify-center min-h-screen">
                <Card variant="outlined" className="w-100 py-30 px-6 text-center">
                    <Box component="div" className="flex justify-center mb-6">
                        <Logo open={true} />
                    </Box>
                    <Typography sx={{ mb: 3 }} variant="h4" component="p" color="text.secondary">Sign in to access your business services</Typography>
                    <ActionButton
                        buttonText={isLoading ? "Signing in..." : "Login"}
                        variant="gradient"
                        onClick={handleLogin}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    />
                </Card>
            </Container>
        </>
    )
}
