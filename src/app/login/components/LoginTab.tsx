import { ActionButton, FormField, Spacer } from "@/components";
import { Box, Tooltip, Typography } from "@mui/material";
import { Info } from "lucide-react";
import { getSVGIcon } from "@/helpers/utils";
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
    )
}