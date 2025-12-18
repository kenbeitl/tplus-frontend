'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

import theme from '@/theme/theme';
import { Box, Card, Container, Tab as MuiTab, Typography, CircularProgress, Grid, styled, Tooltip as MuiTooltip, InputAdornment, IconButton } from '@mui/material';
import Logo from '@/assets/images/Logo';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { ActionButton, Carousel, FormField, Spacer } from '@/components';
import { TabContext } from '@mui/lab';
import { TabList, TabPanel } from '@/components/ui/CustomStyled';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useLogin } from '@/hooks/useLogin';
import { Info } from 'lucide-react';

const Tab = styled(MuiTab)({
    '&.Mui-selected': {
        color: theme.palette.text.white,
        background: theme.palette.gradient.blue
    }
});

const Tooltip = styled(MuiTooltip)({

})

export default function LoginClient() {
    const t = useTranslations();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [value, setValue] = React.useState('login');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading, error: loginError } = useLogin({
        onError: (error) => {
            form.setFieldError('password', error);
        }
    });

    const validationRules = useMemo(() => {
        return {
            userId: { required: true, message: t('pages.login.login.userIdRequired') },
            password: { required: true, message: t('pages.login.login.passwordRequired') },
        };
    }, [t]);
    const initialValues = useMemo(() => {
        return {
            userId: '',
            password: '',
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules);

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

    const handleLogin = async () => {
        // Mark fields as touched first
        form.handleBlur('userId');
        form.handleBlur('password');
        
        // Then validate
        const isValid = form.validateAll();
        
        if (!isValid) {
            return;
        }

        await login(form.values.userId, form.values.password);
    };

    return (
        <Grid container spacing={6}>
            <Grid size={{xs: 12, sm: 7}}>
                <Typography variant="h2" component="h1" className="gradient-text-blue" sx={{ mb: 2 }}>{ t('pages.login.title') }</Typography>
                <Typography variant="h5" component="p" color={theme.palette.text.secondary} sx={{ mb: 3 }}>{ t('pages.login.context') }</Typography>
                { value === 'login' &&
                    <></>
                }
                { value === 'signUp' &&
                    <Carousel slideNum={2} />
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
                    <Logo open={true} width={100} className="my-8" />
                    <Typography variant="body1" component="p" color="text.secondary"></Typography>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} variant="fullWidth">
                                <Tab label={t("pages.login.login.label")} value="login" disableRipple />
                                <Tab label={t("pages.login.signUp.label")} value="signUp" disableRipple />
                            </TabList>
                        </Box>
                        <TabPanel value="login" sx={{ width: '100%', py: 5, px: 3 }}>
                            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                <FormField
                                    name="userId"
                                    label={ 
                                        <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                            { t('pages.login.login.userId') }
                                            <Tooltip 
                                                title={ <Typography fontSize={14}>{t('wiki.cetsId')}</Typography> }
                                                placement="top"
                                                arrow
                                            >
                                                <Info size={16} />
                                            </Tooltip>
                                        </Box>
                                    }
                                    placeholder={ t('pages.login.login.userIdPlaceholder') }
                                    value={form.values.userId || ''}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    error={form.touched.userId ? (form.errors.userId as string) : ''}
                                    required
                                    fullWidth
                                />
                                <Spacer height={30} />
                                <FormField
                                    name="password"
                                    label={ t('pages.login.login.password') }
                                    type={showPassword ? "text" : "password"}
                                    placeholder={ t('pages.login.login.passwordPlaceholder') }
                                    value={form.values.password || ''}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    error={form.touched.password ? (form.errors.password as string) : ''}
                                    required
                                    fullWidth
                                    autoComplete="new-password"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {getSVGIcon(showPassword ? 'eye-off' : 'eye', 20)}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <Spacer height={30} />
                                <ActionButton
                                    buttonText={isLoading ? t('pages.login.login.signingIn') : t('pages.login.login.signIn')}
                                    variant="gradient"
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={isLoading ? getSVGIcon("circular-progress") : undefined}
                                    endIcon={ getSVGIcon("arrow-right", 20) }
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel value="signUp">

                        </TabPanel>
                    </TabContext>
                </Card>    
            </Grid>            
        </Grid>
    )
}
