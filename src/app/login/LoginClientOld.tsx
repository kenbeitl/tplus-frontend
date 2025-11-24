'use client';

import {
  Box,
  Card,
  Container,
  Typography,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import { TabList, Tab, TabPanel, ActionButton, FormField } from "@/components";
import Logo from '@/assets/svg/Logo';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import theme from '@/theme/theme';

export default function LoginClient() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    
    // Set tab value based on current route
    const [value, setValue] = useState(() => {
        return pathname === '/sign-up' ? '2' : '1';
    });

    const [formData, setFormData] = useState({
        loginMethod: 'email', // email or cetsId
        email: '',
        cetsId: '',
        password: '',
    });

    const [forgotPassword, setForgotPassword] = useState(false);

    // Update tab value when pathname changes
    useEffect(() => {
        setValue(pathname === '/sign-up' ? '2' : '1');
    }, [pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // Navigate to the corresponding route
        if (newValue === '1') {
            router.push('/');
        } else if (newValue === '2') {
            router.push('/sign-up');
        }
    };

    // Check if user is already logged in
    useEffect(() => {
        const hasSession = sessionStorage.getItem('hasSession') === 'true';
        if (hasSession) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData(prevData => ({  
            ...prevData,
            loginMethod: value
        }));
    }

    const handleFormChange = (name: string, value: any) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

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
        
        router.push('/dashboard');
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        
        // Simulate sign up delay (remove in production with real auth)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // TODO: Implement actual sign up logic
        // For now, just log the user in after sign up
        const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
        
        sessionStorage.setItem('hasSession', 'true');
        sessionStorage.setItem('sessionExpiry', expiryTime.toString());
        
        document.cookie = `hasSession=true; path=/; SameSite=Strict`;
        document.cookie = `sessionExpiry=${expiryTime}; path=/; SameSite=Strict`;
        
        router.push('/dashboard');
    };

    const handleResetPassword = async () => {
        setIsLoading(true);

        // Simulate reset password delay (remove in production with real auth)
        await new Promise(resolve => setTimeout(resolve, 500));

        router.push('/');
    }

    const isLoginTab = value === '1';
    const isSignUpTab = value === '2';

    return (
        <>
            <Container 
                maxWidth="md"
                className="flex items-center justify-center min-h-screen">
                <Card variant="outlined" className="w-100 p-6 text-center">
                    {!forgotPassword ? (
                        <>
                        <Box component="div" className="flex justify-center mb-6">
                            <Logo open={true} />
                        </Box>
                        <Typography sx={{ mb: 3 }} variant="subtitle1" component="p" color="text.secondary">
                            {isLoginTab ? 'Sign in to access your business services' : null}
                            {isSignUpTab ? 'Create your account to get started' : null}
                        </Typography>
                        <TabContext value={value}>
                            <Box>
                                <TabList onChange={handleChange} variant="fullWidth">
                                    <Tab label="Login" value="1" disableRipple />
                                    <Tab label="Sign Up" value="2" disableRipple />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, textAlign: 'left' }}>Login Method</Typography>
                                <RadioGroup
                                    className="flex flex-row! items-center! mb-2"
                                    value={formData.loginMethod}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="email" control={<Radio />} label="Email Address" />
                                    <FormControlLabel value="cetsId" control={<Radio />} label="CETS ID" />
                                </RadioGroup>
                                <FormField 
                                    name={formData.loginMethod === 'email' ? "email" : "cetsId"}
                                    label={formData.loginMethod === 'email' ? "Email" : "CETS ID"}
                                    value={formData.email}
                                    placeholder={`Enter your ${formData.loginMethod === 'email' ? "email" : "CETS ID"}`}
                                    onChange={handleFormChange}
                                    onBlur={() => {}}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <FormField 
                                    name="password"
                                    label="Password"
                                    value={formData.password}
                                    placeholder="Enter your password"
                                    onChange={handleFormChange}
                                    onBlur={() => {}}
                                    required
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                {/* Sign up form content can be added here */}
                            </TabPanel>
                        </TabContext>
                        <ActionButton
                            buttonText={
                                isLoginTab ? (isLoading ? "Signing in..." : "Login") : 
                                isSignUpTab ? (isLoading ? "Creating account..." : "Sign Up") : ""
                            }
                            variant="gradient"
                            onClick={isLoginTab ? handleLogin : isSignUpTab ? handleSignUp : undefined}
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        />
                        {isLoginTab ? (
                            <ActionButton
                                buttonText="Forgot password?"
                                variant="text"
                                buttonProps={{ disableRipple: true, sx: { color: theme.palette.text.primary, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } } }}
                                onClick={() => setForgotPassword(true)}
                            />
                        ) : null}
                        {isSignUpTab ? (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Already have an account?{' '}
                                <Box component="span" sx={{ cursor: 'pointer', color: theme.palette.text.primary, '&:hover': { textDecoration: 'underline' } }} onClick={() => router.push('/') }>
                                    Sign in
                                </Box>
                            </Typography>
                        ) : null}
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1 }}>Forgot Password</Typography>
                            <Typography variant="caption" component="p" sx={{ mb: 3 }}>Enter your email address and we'll send you a reset link</Typography>
                            <FormField 
                                name="email"
                                label="Email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleFormChange}
                                onBlur={() => {}}
                                required
                                sx={{ mb: 2 }}
                            />
                            <ActionButton
                                buttonText="Send Reset Link"
                                variant="gradient"
                                onClick={handleResetPassword}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                            />
                            <ActionButton
                                buttonText="Back to login"
                                variant="text"
                                buttonProps={{ disableRipple: true, sx: { color: theme.palette.text.white, '&:hover': { backgroundColor: 'transparent',  textDecoration: 'underline' } } }}
                                onClick={() => setForgotPassword(false)}
                            />
                        </>
                    )}
                    
                </Card>
            </Container>
        </>
    )
}