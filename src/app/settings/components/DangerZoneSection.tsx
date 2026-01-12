'use client';

import React from "react";
import { useTranslations } from '@/contexts/AppContext';
import { Box, Button, Card, Typography } from "@mui/material";
import theme from "@/theme/theme";

interface DangerZoneSectionProps {
    onDelete: () => void;
}

export default function DangerZoneSection({ onDelete }: DangerZoneSectionProps) {
    const t = useTranslations();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            onDelete();
        }
    };

    return (
        <>
            <Typography variant="h6" component="h2" className="mb-3" sx={{ color: theme.palette.text.red }}>
                {t("pages.settings.userProfile.dangerZone")}
            </Typography>
            <Card variant="outlined" className="p-3 bg-red-50! border-red-200!">
                <Box component="div" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Box component="div" className="flex flex-col gap-1">
                        <Typography variant="h6" component="p">
                            {t("pages.settings.userProfile.deleteAccount.title")}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {t("pages.settings.userProfile.deleteAccount.description")}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={{ width: 'auto' }}
                    >
                        {t("pages.settings.userProfile.deleteAccount.buttonText")}
                    </Button>
                </Box>
            </Card>
        </>
    );
}
