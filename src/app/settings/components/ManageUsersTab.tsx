'use client';

import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { keycloakApiService } from '@/lib/keycloakApi';
import { Spacer } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { useMemo, useEffect, useState } from 'react';

export default function ManageUsersTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const translations = useMemo(() => {
        const page = t('pages.settings.manageUsers');
        return {
            page
        }
    }, [t])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await keycloakApiService.getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1!">
                { getSVGIcon('building', 20) }
                <Typography variant="h6" component="h2">{ translations.page.title }</Typography>
            </Box>
            <Typography variant="body2" component="p">{ translations.page.context }</Typography>
            <Spacer height={30} />
            <Box component="div" className="flex items-center gap-2">

            </Box>
        </Card>
    );
}
