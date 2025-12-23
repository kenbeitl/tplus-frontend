import { ActionButton, FormField, Spacer } from "@/components";
import { Box, Button, Grid, Link, Tooltip, Typography, Divider } from "@mui/material";
import { Info } from "lucide-react";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import React, { useMemo } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { useTranslations } from "@/contexts/AppContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useLogin } from "@/hooks/useLogin";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { useFormValidation } from "@/hooks/useFormValidation";


export function LoginTab() {
    const t = useTranslations();
    const { showSuccess, showError } = useSnackbar();
    const [showPassword, setShowPassword] = React.useState(false);
    const [forgotPassword, setForgotPassword] = React.useState(false);
    const { login, loginWithKeycloak, isLoading, error: loginError } = useLogin({
        onError: (error) => {
            form.setFieldError('password', error);
        }
    });
    const { sendResetEmail, isLoading: resetLoading } = useForgotPassword({
        onSuccess: () => {
            showSuccess('Password reset email sent successfully! Please check your inbox.', 8000);
            setForgotPassword(false);
            form.handleChange('userId', '');
            form.handleChange('password', '');
        },
        onError: (error) => {
            showError(error);
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

    const handleFormSubmit = async () => {
        
        form.handleBlur('userId');
        if (!forgotPassword) {
            form.handleBlur('password');
        }
        
        // Validate based on forgot password state
        let isValid = false;
        if (forgotPassword) {
            // Only validate userId for forgot password
            isValid = !form.errors.userId;
        } else {
            // Validate all fields for login
            isValid = form.validateAll();
        }
        
        if (!isValid) {
            return;
        }
        if (!forgotPassword) {
            await login(form.values.userId, form.values.password);
        } else {
            await sendResetEmail(form.values.userId);
        }
    };
    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
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
                { !forgotPassword && (
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
                ) }
            </Grid>
            <Spacer height={30} />
            <ActionButton
                buttonText={ forgotPassword ? t('pages.login.form.sendResetLink') : t('pages.login.form.signIn') }
                variant="gradient"
                type="submit"
                endIcon={ getSVGIcon("arrow-right", 20) }
                disabled={forgotPassword ? resetLoading : isLoading}
            />
            <Box component="div" className="flex justify-center">
                { !forgotPassword && <Link component="button" variant="caption" sx={{ mt: 2 }} onClick={() => setForgotPassword(true)}>{ t('pages.login.form.forgotPassword') }</Link> }
                { forgotPassword && <Button variant="text" sx={{ mt: 2 }} onClick={() => setForgotPassword(false)}>{ t('pages.login.form.backToSignIn') }</Button> }
            </Box>
        </Box>
    )
}