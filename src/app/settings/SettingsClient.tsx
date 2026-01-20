'use client';

import React from "react";
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import { useSnackbar } from '@/contexts/SnackbarContext';

import { Spacer, TabList, TabPanel } from "@/components";
import { Box, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';

// Import tab components
import UserProfileTab from './components/UserProfileTab';
import CompanyProfileTab from './components/CompanyProfileTab';
import ManageUsersTab from "./components/ManageUsersTab";

export default function SettingsClient() {
    const { tokenPayload, status } = useSession();
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const { showSnackbar } = useSnackbar();
    
    // Map pathname to tab value
    const getTabFromPath = () => {
        if (pathname?.includes('/company-profile')) return '2';
        if (pathname?.includes('/manage-users')) return '3';
        if (pathname?.includes('/user-profile')) return '1';
        return '1'; // default to user profile
    };

    const [value, setValue] = React.useState(getTabFromPath());

    const isAdmin = tokenPayload?.customUserAttributes?.userRole?.toLowerCase() === 'admin';

    // Update tab value when pathname changes
    React.useEffect(() => {
        // Don't check permissions while session is loading
        if (status === 'loading' || !tokenPayload) {
            return;
        }

        const newTab = getTabFromPath();
        
        // Check permission for manage-users tab
        if (newTab === '3' && !isAdmin) {
            showSnackbar('You do not have permission to view this page', 'error');
            router.push('/settings');
            return;
        }
        
        setValue(newTab);
    }, [pathname, tokenPayload, status, isAdmin]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        
        // Navigate to the corresponding route
        const routes: { [key: string]: string } = {
            '1': '/settings',
            '2': '/settings/company-profile',
            '3': '/settings/manage-users'
        };
        
        router.push(routes[newValue] || '/settings');
    };

    return (
        <>
            <Typography className="font-bold mb-1" variant="h4" component="h1">
                {t("pages.settings.title")}
            </Typography>
            <Spacer height={30} />
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label={t("pages.settings.userProfile.title")} value="1" disableRipple />
                        <Tab label={t("pages.settings.companyProfile.title")} value="2" disableRipple />
                        { isAdmin && <Tab label={t("pages.settings.manageUsers.title")} value="3" disableRipple /> }
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserProfileTab />
                </TabPanel>
                <TabPanel value="2">
                    <CompanyProfileTab />
                </TabPanel>
                { isAdmin && 
                    <TabPanel value="3">
                        <ManageUsersTab />
                    </TabPanel>
                }
                
            </TabContext>
        </>
    );
}