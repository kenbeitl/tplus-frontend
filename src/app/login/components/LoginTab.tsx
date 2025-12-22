import { ActionButton, FormField, Spacer } from "@/components";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Info } from "lucide-react";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import React, { useMemo } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { useTranslations } from "@/contexts/AppContext";
import { useLogin } from "@/hooks/useLogin";
import { useFormValidation } from "@/hooks/useFormValidation";


export function LoginTab() {
    const t = useTranslations();
    const [showPassword, setShowPassword] = React.useState(false);
    const { login, isLoading, error: loginError } = useLogin({
        onError: (error) => {
            form.setFieldError('password', error);
        }
    });

    const validationRules = useMemo(() => {
        return {
            userId: { required: true, message: subSlot(t('form.error.required'), '{field}', t('pages.login.form.userId')) as string },
            password: { required: true, message: subSlot(t('form.error.required'), '{field}', t('pages.login.form.password')) as string },
        };
    }, [t]);
    const initialValues = useMemo(() => {
        return {
            userId: '',
            password: '',
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules);

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
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                     <FormField
                        name="userId"
                        label={ 
                            <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                { t('pages.login.form.userId') }
                                <Tooltip 
                                    title={ <Typography fontSize={14}>{t('wiki.cetsID')}</Typography> }
                                    placement="top"
                                    arrow
                                >
                                    <Info size={16} />
                                </Tooltip>
                            </Box>
                        }
                        placeholder={ t('pages.login.form.userIdPlaceholder') }
                        value={form.values.userId || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.userId ? (form.errors.userId as string) : ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormField
                        name="password"
                        label={ t('pages.login.form.password') }
                        type={showPassword ? "text" : "password"}
                        placeholder={ t('pages.login.form.passwordPlaceholder') }
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
                </Grid>
            </Grid>
            <Spacer height={30} />
            <ActionButton
                buttonText={isLoading ? t('pages.login.form.signingIn') : t('pages.login.form.signIn')}
                variant="gradient"
                type="submit"
                disabled={isLoading}
                startIcon={isLoading ? getSVGIcon("circular-progress") : undefined}
                endIcon={ getSVGIcon("arrow-right", 20) }
            />
        </Box>
    )
}