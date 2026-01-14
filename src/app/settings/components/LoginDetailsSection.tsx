'use client';

import { useState } from 'react';
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService } from '@/lib/keycloakApi';
import { FormField } from "@/components";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

interface LoginDetailsSectionProps {
    userForm: any;
    formConfig: any;
}

export default function LoginDetailsSection({ userForm, formConfig }: LoginDetailsSectionProps) {
    const { data: session } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = async () => {
        // Check if access token is available
        if (!session?.accessToken) {
            showSnackbar('Session expired. Please log in again.', 'error');
            return;
        }

        setIsLoading(true);

        try {
            await keycloakApiService.resetPassword(session.accessToken);
            showSnackbar('Password reset email has been sent to your mailbox!', 'success');
        } catch (error: any) {
            console.error('Password reset error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to reset password';
            showSnackbar(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Typography variant="h6" component="h2" className="mb-3!">
                {t("pages.settings.userProfile.loginDetails")}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <FormField
                        name="email"
                        label={formConfig.labels.email}
                        value={userForm.values.email || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.email ? (userForm.errors.email as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Box component="div" className="flex justify-end mt-4!">
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={resetPassword}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                    sx={{ width: 'auto' }}
                >
                    { t('common.resetPassword') }
                </Button>
            </Box>
        </>
    );
}
