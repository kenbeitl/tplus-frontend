'use client';

import React from "react";
import { useTranslations } from '@/contexts/AppContext';
import { FormField, ActionButton } from "@/components";
import { Box, Grid } from "@mui/material";

interface UserInfoSectionProps {
    userForm: any;
    formConfig: any;
    onUpdate: () => void;
}

export default function UserInfoSection({ userForm, formConfig, onUpdate }: UserInfoSectionProps) {
    const t = useTranslations();

    return (
        <>
            <Grid container spacing={2}>
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
            <Box component="div" className="flex justify-end mt-4">
                <ActionButton
                    buttonText={t('common.updateProfile')}
                    variant="gradient"
                    onClick={onUpdate}
                    autoWidth
                />
            </Box>
        </>
    );
}
