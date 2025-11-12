'use client';

import {
  Box,
  Card,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import Logo from '@/assets/svg/Logo';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActionButton from '@/components/ActionButton';

export default function LoginClient() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const hasSession = sessionStorage.getItem('hasSession') === 'true';
        if (hasSession) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogin = async () => {
        setIsLoading(true);
        
        // Simulate authentication delay (remove in production with real auth)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Calculate session expiry (8 hours from now)
        const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
        
        sessionStorage.setItem('hasSession', 'true');
        sessionStorage.setItem('sessionExpiry', expiryTime.toString());
        
        // Set cookies with expiry
        document.cookie = `hasSession=true; path=/; SameSite=Strict`;
        document.cookie = `sessionExpiry=${expiryTime}; path=/; SameSite=Strict`;
        
        // Redirect to external URL after login
        router.push('/login');
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
