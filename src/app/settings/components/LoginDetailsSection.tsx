'use client';

import React, { useState } from "react";
import { useTranslations } from '@/contexts/AppContext';
import { FormField, ActionButton } from "@/components";
import { Box, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";

interface LoginDetailsSectionProps {
    userForm: any;
    formConfig: any;
    onUpdate: () => void;
}

export default function LoginDetailsSection({ userForm, formConfig, onUpdate }: LoginDetailsSectionProps) {
    const t = useTranslations();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    return (
        <>
            <Typography variant="h6" component="h2" className="mb-3">
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
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="currentPassword"
                        label={formConfig.labels.currentPassword}
                        type={showCurrentPassword ? "text" : "password"}
                        value={userForm.values.currentPassword || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.currentPassword ? (userForm.errors.currentPassword as string) : ''}
                        autoComplete="new-password"
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            edge="end"
                                        >
                                            {getSVGIcon(showCurrentPassword ? 'eye-off' : 'eye', 20)}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="newPassword"
                        label={formConfig.labels.newPassword}
                        type={showNewPassword ? "text" : "password"}
                        value={userForm.values.newPassword || ''}
                        onChange={userForm.handleChange}
                        onBlur={userForm.handleBlur}
                        error={userForm.touched.newPassword ? (userForm.errors.newPassword as string) : ''}
                        autoComplete="new-password"
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end"
                                        >
                                            {getSVGIcon(showNewPassword ? 'eye-off' : 'eye', 20)}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Box component="div" className="flex justify-end mt-4">
                <ActionButton
                    buttonText={t('common.updatePassword')}
                    variant="gradient"
                    onClick={onUpdate}
                    autoWidth
                />
            </Box>
        </>
    );
}
