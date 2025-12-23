'use client';

import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from '@/contexts/AppContext';

import { Spacer, TabList, TabPanel } from "@/components";
import { Box, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';

// Import tab components
import UserProfileTab from './components/UserProfileTab';
import CompanyProfileTab from './components/CompanyProfileTab';

export default function SettingsClient() {
    const { data: session } = useSession();
    const t = useTranslations();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">
                {t("pages.settings.title")}
            </Typography>
            <Spacer height={20} />
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label={t("pages.settings.userProfile.title")} value="1" disableRipple />
                        <Tab label={t("pages.settings.companyProfile.title")} value="2" disableRipple />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserProfileTab session={session} />
                </TabPanel>
                <TabPanel value="2">
                    <CompanyProfileTab session={session} />
                </TabPanel>
            </TabContext>
        </>
    );
}