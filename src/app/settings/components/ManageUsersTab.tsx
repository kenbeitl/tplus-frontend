'use client';

import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { Spacer } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { useMemo } from 'react';

export default function ManageUsersTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();

    const translations = useMemo(() => {
        const page = t('pages.settings.manageUsers');
        return {
            page
        }
    }, [t])

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1!">
                { getSVGIcon('building', 20) }
                <Typography variant="h6" component="h2">{ translations.page.title }</Typography>
            </Box>
            <Typography variant="body2" component="p">{ translations.page.context }</Typography>
            <Spacer height={30} />
            
        </Card>
    );
}
