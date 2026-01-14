'use client';

import React, { useMemo } from "react";
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useFormValidation } from "@/hooks/useFormValidation";

import { Spacer } from "@/components";
import { Box, Card, Divider, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";

import UserInfoSection from './UserInfoSection';
import LoginDetailsSection from './LoginDetailsSection';
import DangerZoneSection from './DangerZoneSection';

export default function UserProfileTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();

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
            companyName: { required: false },
            userRole: { required: false },
            email: { required: true, email: true, message: validation.emailRequired || '' },
            currentPassword: { required: false, minLength: 4, message: validation.currentPasswordMinLength || '' },
            newPassword: { required: false, minLength: 4, message: validation.newPasswordMinLength || '' },
        };
    }, [formConfig]);

    const initialValues = useMemo(() => ({
        firstName: tokenPayload?.given_name || '',
        lastName: tokenPayload?.family_name || '',
        companyName: tokenPayload?.companyName || '',
        userRole: tokenPayload?.user_role || tokenPayload?.cust_user_role || '',
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

        if (!userForm.validateAll()) {
            return;
        }

        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: userForm.values.firstName,
                    lastName: userForm.values.lastName,
                    email: userForm.values.email,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                userForm.setFieldError('email', data.error || 'Failed to update profile');
                return;
            }

            showSnackbar('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Update error:', error);
            userForm.setFieldError('email', 'An error occurred while updating profile');
        }
    };

    const handleUpdateLoginDetails = async () => {
        userForm.clearFieldError('currentPassword');
        userForm.clearFieldError('newPassword');

        if (!userForm.values.currentPassword || !userForm.values.newPassword) {
            if (!userForm.values.currentPassword) {
                userForm.setFieldError('currentPassword', 'Current password is required');
            }
            if (!userForm.values.newPassword) {
                userForm.setFieldError('newPassword', 'New password is required');
            }
            return;
        }

        try {
            const response = await fetch('/api/settings/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: userForm.values.currentPassword,
                    newPassword: userForm.values.newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                userForm.setFieldError('currentPassword', data.error || 'Failed to update password');
                return;
            }

            userForm.setValues({
                ...userForm.values,
                currentPassword: '',
                newPassword: '',
            });

            showSnackbar('Password updated successfully!', 'success');
        } catch (error) {
            console.error('Password update error:', error);
            userForm.setFieldError('currentPassword', 'An error occurred while updating password');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('/api/settings', {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                showSnackbar(data.error || 'Failed to delete account', 'error');
                return;
            }

            showSnackbar('Account deleted successfully', 'success');
            window.location.href = '/login';
        } catch (error) {
            console.error('Delete error:', error);
            showSnackbar('An error occurred while deleting account', 'error');
        }
    };

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-!">
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

            <Divider className="my-3!" />

            <LoginDetailsSection
                userForm={userForm}
                formConfig={formConfig}
                onUpdate={handleUpdateLoginDetails}
            />

            <Divider className="my-3!" />

            <DangerZoneSection onDelete={handleDeleteAccount} />
        </Card>
    );
}
