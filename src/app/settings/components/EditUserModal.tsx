'use client';

import React, { useState, useEffect } from 'react';
import { InfoModal } from '@/components';
import { 
    Box, 
    Typography, 
    TextField, 
    Select, 
    MenuItem, 
    FormControl,
    InputLabel,
    Switch,
    Chip,
    Alert
} from '@mui/material';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService, userRoles } from '@/lib/keycloakApi';
import { getSVGIcon } from '@/helpers/utils';

interface EditUserModalProps {
    open: boolean;
    onClose: () => void;
    onUserUpdated: () => void;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        status: 'Active' | 'Inactive';
    } | null;
}

export default function EditUserModal({ open, onClose, onUserUpdated, user }: EditUserModalProps) {
    const { showSnackbar } = useSnackbar();
    const [formData, setFormData] = useState<{
        role: userRoles;
        enabled: boolean;
    }>({
        role: 'General',
        enabled: true
    });
    const [loading, setLoading] = useState(false);

    // Update form data when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                role: user.role as userRoles,
                enabled: user.status === 'Active'
            });
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!user) return;

        setLoading(true);
        try {
            // Update user role (you may need to create this API endpoint)
            // await keycloakApiService.updateUserRole(user.id, formData.role);

            // Update user status
            if (formData.enabled && user.status === 'Inactive') {
                await keycloakApiService.enableUser(user.id);
            } else if (!formData.enabled && user.status === 'Active') {
                await keycloakApiService.disableUser(user.id);
            }

            showSnackbar('User updated successfully!', 'success');
            onUserUpdated();
            onClose();
        } catch (error: any) {
            console.error('Error updating user:', error);
            showSnackbar(error.message || 'Failed to update user', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!user) return null;

    // Extract first and last name from display name
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return (
        <InfoModal
            open={open}
            onClose={onClose}
            title={`Edit User - ${user.name}`}
            subtitle={"Modify user information, permissions, and account status. Changes will take effect immediately."}
        >
            {/* Basic Information Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {getSVGIcon('user', 20)}
                    <Typography variant="subtitle1" fontWeight={600}>
                        Basic Information
                    </Typography>
                    <Chip label="Read Only" size="small" sx={{ bgcolor: '#F3F4F6', color: '#6B7280' }} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            First Name
                        </Typography>
                        <TextField
                            fullWidth
                            value={firstName}
                            disabled
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Last Name
                        </Typography>
                        <TextField
                            fullWidth
                            value={lastName}
                            disabled
                            size="small"
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Email Address
                    </Typography>
                    <TextField
                        fullWidth
                        value={user.email}
                        disabled
                        size="small"
                    />
                </Box>

                <Typography variant="caption" color="text.secondary">
                    These fields can only be edited by the user in their profile settings.
                </Typography>
            </Box>

            {/* Permissions & Access Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {getSVGIcon('shield-check', 20)}
                    <Typography variant="subtitle1" fontWeight={600}>
                        Permissions & Access
                    </Typography>
                </Box>

                <FormControl fullWidth size="small">
                    <InputLabel>User Role</InputLabel>
                    <Select
                        value={formData.role}
                        label="User Role"
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as userRoles })}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="General">General</MenuItem>
                    </Select>
                </FormControl>

                {formData.role === 'Admin' && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        Admins have full access to all services and features, and can manage other users.
                    </Alert>
                )}
            </Box>

            {/* Account Status Section */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {getSVGIcon('user-check', 20)}
                    <Typography variant="subtitle1" fontWeight={600}>
                        Account Status
                    </Typography>
                </Box>

                <Box 
                    sx={{ 
                        p: 2, 
                        border: '1px solid',
                        borderColor: formData.enabled ? '#D1FAE5' : '#F3F4F6',
                        bgcolor: formData.enabled ? '#F0FDF4' : '#F9FAFB',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Chip 
                                label={formData.enabled ? 'Active' : 'Inactive'} 
                                size="small"
                                sx={{ 
                                    bgcolor: formData.enabled ? '#D1FAE5' : '#F3F4F6',
                                    color: formData.enabled ? '#065F46' : '#6B7280'
                                }}
                            />
                            <Typography variant="body2" fontWeight={600}>
                                User has platform access
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Can login and use all permitted services
                        </Typography>
                    </Box>
                    <Switch
                        checked={formData.enabled}
                        onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                        color="primary"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Digital Identity
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        iAM Smart+
                    </Typography>
                </Box>
            </Box>
        </InfoModal>
    );
}
