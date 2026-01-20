'use client';

import React, { useEffect, useMemo } from "react";
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useFormValidation } from "@/hooks/useFormValidation";
import { keycloakApiService } from '@/lib/keycloakApi';

import { Spacer } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";

import UserInfoSection from './UserInfoSection';

export default function UserProfileTab() {
    const { data: session, tokenPayload, update: updateSession } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        console.log(tokenPayload);
    }, [tokenPayload]);

    const formConfig = useMemo(() => {
        const form = t('pages.settings.form');
        return {
            labels: form?.labels || {},
            validation: form?.validation || {},
        };
    }, [t]);

    const validationRules = useMemo(() => {
        const { validation } = formConfig;
        return {
            firstName: { required: true, minLength: 2, message: validation.firstNameRequired || '' },
            lastName: { required: true, minLength: 2, message: validation.lastNameRequired || '' },
            userRole: { required: false },
            email: { required: true, email: true, message: validation.emailRequired || '' },
            currentPassword: { required: false, minLength: 4, message: validation.currentPasswordMinLength || '' },
            newPassword: { required: false, minLength: 4, message: validation.newPasswordMinLength || '' },
        };
    }, [formConfig]);

    const initialValues = useMemo(() => ({
        firstName: tokenPayload?.given_name || '',
        lastName: tokenPayload?.family_name || '',
        userRole: tokenPayload?.customUserAttributes?.userRole || '',
        email: tokenPayload?.email || '',
        currentPassword: '',
        newPassword: '',
    }), [tokenPayload]);

    const userForm = useFormValidation(initialValues, validationRules);

    // Update form values when session loads
    React.useEffect(() => {
        if (tokenPayload) {
            userForm.setValues(initialValues);
        }
    }, [tokenPayload]);

    const handleUpdateProfile = async () => {
        userForm.clearFieldError('firstName');
        userForm.clearFieldError('lastName');
        userForm.clearFieldError('email');
        userForm.clearFieldError('userRole');

        if (!userForm.validateAll()) {
            return;
        }

        try {
            await keycloakApiService.updateUserProfile({
                email: userForm.values.email,
                firstName: userForm.values.firstName,
                lastName: userForm.values.lastName,
                userRole: userForm.values.userRole,
            });

            // Refresh session to get updated user data
            await updateSession();

            showSnackbar('Profile updated successfully!', 'success');
        } catch (error: any) {
            console.error('Update error:', error);
            const errorMessage = error.message || 'An error occurred while updating profile';
            showSnackbar(errorMessage, 'error');
        }
    };

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1!">
                {getSVGIcon('user', 20)}
                <Typography variant="h6" component="h2">
                    { t("pages.settings.userProfile.title") }
                </Typography>
            </Box>
            <Typography variant="body2" component="p">
                { t("pages.settings.userProfile.context") }
            </Typography>
            <Spacer height={30} />

            <UserInfoSection 
                userForm={userForm} 
                formConfig={formConfig}
                onUpdate={handleUpdateProfile}
            />
        </Card>
    );
}
