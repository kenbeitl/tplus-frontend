'use client';

import Spacer from "@/components/ui/Spacer";
import { Card, Typography } from "@mui/material";
import { useTranslations } from '@/contexts/AppContext';

export default function SubscriptionsClient() {
    const t = useTranslations();
    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.subscriptions.title") }</Typography>
            <Typography variant="body2" component="p">{ t("pages.subscriptions.context") }</Typography>
            <Spacer height={20} />
        </>
    )
}