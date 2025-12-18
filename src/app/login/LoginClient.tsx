'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import theme from '@/theme/theme';
import { Box, Card, Container, Paper, Tab as MuiTab, Typography, CircularProgress, Grid, styled } from '@mui/material';
import Logo from '@/assets/images/Logo';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { TabContext } from '@mui/lab';
import { TabList, TabPanel } from '@/components/ui/CustomStyled';
import { LoginTab } from './components/LoginTab';
import { SignUpTab } from './components/SignUpTab';

const Tab = styled(MuiTab)({
    '&.Mui-selected': {
        color: theme.palette.text.white,
        background: theme.palette.gradient.blue
    }
});

export default function LoginClient() {
    const t = useTranslations();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [value, setValue] = React.useState('login');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    // Check if user is already logged in
    useEffect(() => {
        if (status === 'authenticated' && session) {
            console.log('Session authenticated, redirecting to dashboard');
            router.push('/dashboard');
        }
    }, [session, status, router]);

    // Show loading screen while checking authentication
    if (status === 'loading' || status === 'authenticated') {
        return (
            <Container 
                maxWidth="md"
                className="flex items-center justify-center min-h-screen">
                <Box className="text-center">
                    <CircularProgress />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        {status === 'loading' ? t('common.loading') : subSlot(t('common.redirectingTo'), '{page}', t('nav.dashboard'))}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Grid container spacing={6}>
            <Grid size={{xs: 12, sm: 7}}>
                <Typography variant="h2" component="h1" className="gradient-text-blue" sx={{ mb: 2 }}>{ t('pages.login.title') }</Typography>
                <Typography variant="h5" component="p" color={theme.palette.text.secondary} sx={{ mb: 3 }}>{ t('pages.login.context') }</Typography>
                {
                    t('pages.login.login.feature') && Array.isArray(t('pages.login.login.feature')) &&
                    t('pages.login.login.feature').map((feature: {title: string, icon: string}, index: number) => (
                        <Paper variant="elevation" elevation={1} key={index} className="flex items-center gap-5 px-5 py-3 mb-8">
                            <Paper variant="outlined" sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 50, height: 50 }}>{ getSVGIcon(feature.icon, 20, theme.palette.primary.main) }</Paper>
                            <Typography variant="h5" component="p">{ feature.title }</Typography>
                        </Paper>
                    ))
                }
            </Grid>
            <Grid size={{xs: 12, sm: 5}}>
                <Card 
                    variant="outlined" 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        border: 0, 
                        borderRadius: 3, 
                        borderTopColor: theme.palette.text.blue, 
                        borderTopWidth: 4,
                        height: '100%',
                    }}
                >
                    <Logo open={true} width={100} className="mt-8 mb-2" />
                    <Typography variant="body1" component="p" color="text.secondary" sx={{ mb: 1 }}>{ t('pages.login.instruction') }</Typography>
                    <TabContext value={value}>
                        <Box component="div" sx={{ width: '80%' }}>
                            <TabList onChange={handleChange} variant="fullWidth">
                                <Tab label={t("pages.login.login.label")} value="login" disableRipple />
                                <Tab label={t("pages.login.signUp.label")} value="signUp" disableRipple />
                            </TabList>
                        </Box>
                        <TabPanel value="login" sx={{ width: '100%', py: 5, px: 3 }}>
                            <LoginTab />
                        </TabPanel>
                        <TabPanel value="signUp">
                            <SignUpTab />
                        </TabPanel>
                    </TabContext>
                </Card>    
            </Grid>            
        </Grid>
    )
}
