'use client';

import React, { useMemo, useState } from 'react';
import { keycloakApiService, userRoles } from '@/lib/keycloakApi';
import { useSnackbar } from '@/contexts/SnackbarContext';
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl
} from "@mui/material";
import theme from "@/theme/theme";
import { useTranslations } from '@/contexts/AppContext';
import { InfoModal } from '@/components';

interface AddUserModalProps {
    open: boolean;
    onClose: () => void;
    onUserAdded: () => void;
}

export default function AddUserModal({ open, onClose, onUserAdded }: AddUserModalProps) {
    const t = useTranslations();
    const translations = useMemo(() => {
        const page = t('pages.settings.manageUsers');
        const modal = t('pages.settings.manageUsers.addUserModal');
        return {
            page,
            modal
        }
    }, [t])
    const { showSnackbar } = useSnackbar();
    const [formData, setFormData] = useState<{ email: string; role: userRoles }>({ 
        email: '', 
        role: 'General' 
    });
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => {
        setFormData({ email: '', role: 'General' });
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email) {
            showSnackbar('Email is required', 'error');
            return;
        }

        try {
            setSubmitting(true);
            await keycloakApiService.createUser({
                email: formData.email,
                userRole: formData.role
            });
            showSnackbar('User invitation sent successfully!', 'success');
            handleClose();
            onUserAdded();
        } catch (error: any) {
            console.error('Failed to create user:', error);
            showSnackbar(error.message || 'Failed to send invitation', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <InfoModal 
            open={open} 
            onClose={handleClose}
            title={ translations.modal.title }
            subtitle={ translations.modal.context }
            maxWidth={800}
        >
            <Box component="form" onSubmit={handleSubmit}>
                <Box component="div" className="mb-4!">
                    <Typography variant="body2" className="mb-1! font-bold!">
                        { translations.modal.email } <span style={{ color: theme.palette.error.main }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="user@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={submitting}
                    />
                </Box>

                <Box component="div" className="mb-4!">
                    <Typography variant="body2" className="mb-1! font-bold!">
                        { translations.modal.role }
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as userRoles })}
                            disabled={submitting}
                        >
                            <MenuItem value="General">{ translations.page.general }</MenuItem>
                            <MenuItem value="Admin">{ translations.page.admin }</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 1 }}>{ translations.modal.remarks }</Typography>
                </Box>

                <Box component="div" className="flex justify-end gap-2 mt-6!">
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        disabled={submitting}
                    >
                        { t('common.cancel') }
                    </Button>
                    <Button
                        type="submit"
                        variant="gradient"
                        color="blue"
                        disabled={submitting}
                        sx={{ bgcolor: theme.palette.primary.main }}
                    >
                        { translations.modal[submitting ? 'sending' : 'buttonText'] }
                    </Button>
                </Box>
            </Box>
        </InfoModal>
    );
}
