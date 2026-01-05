'use client';

import React, { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

// import theme from '@/theme/theme';
// import { Box, Card, Container, Paper, Typography, CircularProgress, Grid, styled } from '@mui/material';
// import Logo from '@/assets/images/Logo';
// import { useTranslations } from '@/contexts/AppContext';
// import { getSVGIcon, subSlot, toHyphenCase, toPascalCase } from '@/helpers/utils';
// import { TabContext } from '@mui/lab';
// import { Tab, TabList, TabPanel as MuiTabPanel } from '@/components/ui/CustomStyled';
// import { LoginTab } from './components/LoginTab';
// import { SignUpTab } from './components/SignUpTab';
// import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';

// const TabPanel = styled(MuiTabPanel)({
//     padding: '40px 24px 32px 24px',
//     width: '100%'
// });

export default function LoginClient() {
    // const t = useTranslations();
    // const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();
    // const [value, setValue] = React.useState(toPascalCase(pathname.slice(1)) || 'login');
    // const featuresRef = useFadeInAnimation<HTMLDivElement>({
    //     direction: 'left',
    //     distance: 50,
    //     duration: 0.4,
    //     stagger: 0.2,
    //     ease: 'power2.out',
    //     enabled: status !== 'loading' && status !== 'authenticated'
    // });
    // const formCard = useFadeInAnimation<HTMLDivElement>({
    //     direction: 'right',
    //     distance: 50,
    //     duration: 0.4,
    //     stagger: 0.2,
    //     ease: 'power2.out',
    //     enabled: status !== 'loading' && status !== 'authenticated'
    // });
    
    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    //     router.push(`/${toHyphenCase(newValue)}`);
    // }

    // Check if user is already logged in
    useEffect(() => {
        if (status === 'authenticated' && session) {
            console.log('Session authenticated, redirecting to dashboard');
            router.push('/dashboard');
        } else if (status === 'unauthenticated') {
            // Immediately redirect to Keycloak SSO
            signIn('keycloak', { callbackUrl: '/dashboard' });
        }
    }, [session, status, router]);

    // Return null for seamless redirect - no loading screen
    return null;

    // Unused - keeping for reference if SSO is disabled later
    /*
    return (
        <Grid container spacing={6} sx={{ alignItems: 'center', minHeight: '100vh', padding: '40px 20px' }}>
            <Grid size={{xs: 12, md: 7}}>
                <Box ref={featuresRef}>
                {
                    <>
                        <Typography variant="h2" component="h1" className="gradient-text-blue" sx={{ mb: 2 }}>{ t('pages.login.title') }</Typography>
                        <Typography variant="h5" component="p" color={theme.palette.text.primary} sx={{ mb: 3 }}>{ t('pages.login.context') }</Typography>
                        {
                            t('pages.login.form.feature') && Array.isArray(t('pages.login.form.feature')) &&
                            t('pages.login.form.feature').map((feature: {title: string, icon: string, color: string}, index: number) => (
                                <Paper variant="elevation" elevation={2} key={index} className="flex items-center gap-5 px-5 py-5 mb-8">
                                    <Box component="div" className={`flex justify-center items-center rounded-lg w-[50px] h-[50px] bg-linear-to-br ${feature.color}`}>
                                        { getSVGIcon(feature.icon, 25, theme.palette.text.white) }
                                    </Box>
                                    <Typography variant="h5" component="p">{ feature.title }</Typography>
                                </Paper>
                            ))
                        }
                    </>                   
                }
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 5}}>
                <Box ref={formCard}>
                    <Card 
                        variant="elevation"
                        elevation={2}
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            border: 0, 
                            borderRadius: 3, 
                            height: '100%',
                        }}
                    >
                        <Logo open={true} width={100} className="mt-8 mb-2" />
                        <Typography variant="body1" component="p" color="text.secondary" sx={{ mb: 1 }}>{ t('pages.login.instruction') }</Typography>
                        <TabContext value={value}>
                            <Box component="div" sx={{ width: '80%' }}>
                                <TabList onChange={handleChange} variant="fullWidth">
                                    <Tab label={ t("pages.login.form.label") } value="login" disableRipple />
                                    <Tab label={ t("pages.signUp.form.label") } value="signUp" disableRipple />
                                </TabList>
                            </Box>
                            <TabPanel value="login">
                                <LoginTab />
                            </TabPanel>
                            <TabPanel value="signUp">
                                <SignUpTab />
                            </TabPanel>
                        </TabContext>
                    </Card>
                </Box>
            </Grid>            
        </Grid>
    )
    */
}
