'use client';

import { useState } from "react";
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService } from '@/lib/keycloakApi';
import { FormField } from "@/components";
import { Box, Button, CircularProgress, Grid } from "@mui/material";

interface UserInfoSectionProps {
    userForm: any;
    formConfig: any;
    onUpdate: () => void;
}

export default function UserInfoSection({ userForm, formConfig, onUpdate }: UserInfoSectionProps) {
    const { data: session } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = async () => {
        setIsLoading(true);

        try {
            await keycloakApiService.resetPassword();
            showSnackbar('Password reset email has been sent to your mailbox!', 'success');
        } catch (error: any) {
            console.error('Password reset error:', error);
            const errorMessage = error.message || 'Failed to reset password';
            showSnackbar(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="firstName"
                        label={formConfig.labels.firstName}
                        value={userForm.values.firstName || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.firstName ? (userForm.errors.firstName as string) : ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="lastName"
                        label={formConfig.labels.lastName}
                        value={userForm.values.lastName || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.lastName ? (userForm.errors.lastName as string) : ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="companyName"
                        label={formConfig.labels.companyName}
                        value={userForm.values.companyName || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.companyName ? (userForm.errors.companyName as string) : ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="userRole"
                        label={formConfig.labels.userRole}
                        value={userForm.values.userRole || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.userRole ? (userForm.errors.userRole as string) : ''}
                        required
                        fullWidth
                        disabled
                    />
                </Grid>
            </Grid>
            <Box component="div" className="flex justify-between mt-4! gap-3">
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={resetPassword}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                    sx={{ width: 'auto' }}
                >
                    {t('common.resetPassword')}
                </Button>
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={onUpdate}
                    sx={{ width: 'auto' }}
                >
                    {t('common.updateProfile')}
                </Button>
            </Box>
        </>
    );
}
