'use client';

import React from "react";
import { Box } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { TabList, Tab, TabPanel } from "@/components/ui/StyledTabs";
import { useTranslations } from '@/contexts/AppContext';

import Spacer from "@/components/ui/Spacer";
import { Typography } from "@mui/material";

export default function SettingsClient() {
    const t = useTranslations();
    const [value, setValue] = React.useState('1');
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.settings.title") }</Typography>
            <Spacer height={20} />
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label={t("pages.settings.userProfile")} value="1" disableRipple />
                        <Tab label={t("pages.settings.companyProfile")} value="2" disableRipple />
                        <Tab label={t("pages.settings.manageUsers")} value="3" disableRipple />
                    </TabList>
                </Box>
                <TabPanel value="1"></TabPanel>
                <TabPanel value="2"></TabPanel>
                <TabPanel value="3"></TabPanel>
            </TabContext>
        </>
    )
}