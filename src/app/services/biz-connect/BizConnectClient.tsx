'use client';

import Tag from "@/components/Tag";
import Spacer from "@/components/ui/Spacer";
import { Box, Typography } from "@mui/material";

import { useTranslations } from '@/contexts/AppContext';

export default function BizConnectClient() {
    const t = useTranslations();
    return (
        <>
            <Box component="div" className="flex items-start gap-2">
                <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.bizConnect.title") }</Typography>
                <Tag variant="orange" label={t('common.comingSoon')} />
            </Box>
            <Typography variant="body2" component="p">{ t("pages.bizConnect.context") }</Typography>
            <Spacer height={20} />
        </>
    );
}