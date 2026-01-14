'use client';

import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { Spacer } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";

export default function ManageUsersTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1!">
                { getSVGIcon('building', 20) }
                <Typography variant="h6" component="h2">
                    { t("pages.settings.companyProfile.title") }
                </Typography>
            </Box>
            <Typography variant="body2" component="p">
                { t("pages.settings.companyProfile.context") }
            </Typography>
            <Spacer height={30} />

        </Card>
    );
}
