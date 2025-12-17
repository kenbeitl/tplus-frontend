'use client';

import React, { useMemo } from "react";
import { useSession } from "next-auth/react";

import theme from "@/theme/theme";
import { Spacer, TabList, TabPanel, Form, FormField, FormSelect, ActionButton, Tag } from "@/components";
import { Box, Card, Divider, Grid, Paper, Switch, Tab, TextField, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { SelectChangeEvent } from '@mui/material';
import { useTranslations } from '@/contexts/AppContext';
import { useFormValidation } from "@/hooks/useFormValidation";
import { getSVGIcon } from "@/helpers/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function SettingsClient() {
    const { data: session } = useSession();
    const t = useTranslations();
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
    const isAboveMobile = useBreakpoint('mobile');
    const formConfig = React.useMemo(() => {
        const form = t('pages.settings.form');
        return {
            industryOptions: form?.industryOptions || [],
            employeeCountOptions: form?.employeeCountOptions || [],
            businessIdentifierTypeOptions: form?.businessIdentifierTypeOptions || [],
            labels: form?.labels || {},
            validation: form?.validation || {},
        };
    }, [t]);

    const validationRules = React.useMemo(() => {
        const { validation } = formConfig;
        return {
            firstName: { required: true, minLength: 2, message: validation.firstNameRequired || '' },
            lastName: { required: true, minLength: 2, message: validation.lastNameRequired || '' },
            companyName: { required: false },
            userRole: { required: false },
            email: { required: true, email: true, message: validation.emailRequired || '' },
            currentPassword: { required: false, minLength: 6, message: validation.currentPasswordMinLength || '' },
            newPassword: { required: false, minLength: 6, message: validation.newPasswordMinLength || '' },
        };
    }, [formConfig]);

    const initialValues = useMemo(() => {
    return {
        firstName: (session?.user as any)?.firstName || '',
        lastName: (session?.user as any)?.lastName || '',
        companyName: (session?.user as any)?.companyName || '',
        userRole: (session?.user as any)?.role || '',
        email: (session?.user as any)?.email || '',
        currentPassword: '',
        newPassword: '',
    };
    }, [session?.user]);
    
    // Initialize user profile form validation
    const userForm = useFormValidation(initialValues, validationRules);

    type businessIdentfierProps = {
        type: string;
        value: string;
        verified: boolean;
    }

    const [companyForm, setCompanyForm] = React.useState({
        companyName: ((session?.user as any)?.company as any)?.name || '',
        industry: ((session?.user as any)?.company as any)?.industry || '',
        location: ((session?.user as any)?.company as any)?.location || '',
        websiteURL: ((session?.user as any)?.company as any)?.websiteURL || '',
        cetsId: ((session?.user as any)?.company as any)?.cetsId || '',
        employeeCount: ((session?.user as any)?.company as any)?.employeeCount || '',
        businessIdentifierList: [
            { type: 'business_registration_no', value: '123456789', verified: true },
            { type: 'duns_no', value: '91350211MA2Y3XXXXXX', verified: false },
        ] as businessIdentfierProps[]
    });

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCompanyForm({
            ...companyForm,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async() => {
        console.log('form submitted');
    }
    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.settings.title") }</Typography>
            <Spacer height={20} />
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label={t("pages.settings.userProfile.title")} value="1" disableRipple />
                        <Tab label={t("pages.settings.companyProfile.title")} value="2" disableRipple />
                        <Tab label={t("pages.settings.manageUsers.title")} value="3" disableRipple />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Card variant="outlined" className="p-6">
                        <Box component="div" className="flex items-center gap-2 mb-1">
                            { getSVGIcon('user', 20) }
                            <Typography variant="h6" component="h2">{t("pages.settings.userProfile.title")}</Typography>
                        </Box>
                        <Typography variant="body2" component="p">{t("pages.settings.userProfile.context")}</Typography>
                        <Spacer height={20} />
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="firstName"
                                        label={formConfig.labels.firstName}
                                        value={userForm.values.firstName || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.firstName ? (userForm.errors.firstName as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="lastName"
                                        label={formConfig.labels.lastName}
                                        value={userForm.values.lastName || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.lastName ? (userForm.errors.lastName as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="companyName"
                                        label={formConfig.labels.companyName}
                                        value={userForm.values.companyName || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.companyName ? (userForm.errors.companyName as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="userRole"
                                        label={formConfig.labels.userRole}
                                        value={userForm.values.userRole || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.userRole ? (userForm.errors.userRole as string) : ''}
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>{t("pages.settings.userProfile.loginDetails")}</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <FormField
                                        name="email"
                                        label={formConfig.labels.email}
                                        value={userForm.values.email || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.email ? (userForm.errors.email as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="currentPassword"
                                        label={formConfig.labels.currentPassword}
                                        value={userForm.values.currentPassword || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.currentPassword ? (userForm.errors.currentPassword as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="newPassword"
                                        label={formConfig.labels.newPassword}
                                        value={userForm.values.newPassword || ''}
                                        onChange={userForm.handleChange}
                                        onBlur={userForm.handleBlur}
                                        error={userForm.touched.newPassword ? (userForm.errors.newPassword as string) : ''}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6" component="h2" sx={{ mb: 3, color: theme.palette.text.red }}>{t("pages.settings.userProfile.dangerZone")}</Typography>
                        <Card variant="outlined" className="p-3 bg-red-50! border-red-200!">
                            <Box component="div" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <Box component="div" className="flex flex-col gap-1">
                                    <Typography variant="h6" component="p">{t("pages.settings.userProfile.deleteAccount.title")}</Typography>
                                    <Typography variant="caption" component="p">{t("pages.settings.userProfile.deleteAccount.description")}</Typography>
                                </Box>
                                <ActionButton 
                                    buttonText={t("pages.settings.userProfile.deleteAccount.buttonText")}
                                    variant="contained"
                                    color="error"
                                    autoWidth
                                />
                            </Box>                           
                        </Card>
                        <Spacer height={20} />
                        <Box component="div" className="flex justify-end">
                            <ActionButton 
                                variant="gradient" 
                                buttonText={formConfig.labels.saveChanges} 
                                onClick={handleSubmit}
                                autoWidth
                            />
                        </Box>
                    </Card>
                </TabPanel>
                <TabPanel value="2">
                    <Card variant="outlined" className="p-6">
                        <Box component="div" className="flex items-center gap-2 mb-1">
                            { getSVGIcon('building', 20) }
                            <Typography variant="h6" component="h2">{t("pages.settings.companyProfile.title")}</Typography>
                        </Box>
                        <Typography variant="body2" component="p">{t("pages.settings.companyProfile.context")}</Typography>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200!">
                            <Box component="div" className="flex items-center gap-2 mb-1">
                                { getSVGIcon('eye', 20, theme.palette.text.gold) }
                                <Typography variant="h6" component="h2" color={theme.palette.text.darkAmber}>{t("pages.settings.companyProfile.viewOnly.title")}</Typography>
                            </Box>
                            <Typography variant="caption" component="h2" color={theme.palette.text.darkAmber}>{t("pages.settings.companyProfile.viewOnly.description")}</Typography>
                        </Card>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200! relative">
                            <Box component="div" className="flex justify-between items-center">
                                <Box component="div">
                                    <Box component="div" className="flex items-center gap-2 mb-1">
                                        <Typography variant="h6" component="h2">{t("pages.settings.companyProfile.publicProfile.title")}</Typography>
                                        <Tag variant="orange" label="Coming Soon" className="absolute sm:static right-2 sm:right-auto top-4 sm:top-auto"  />
                                    </Box>
                                    <Typography variant="caption" component="h2">{t("pages.settings.companyProfile.publicProfile.body")}</Typography>
                                </Box>                                
                                <Switch disabled />
                            </Box>                            
                        </Card>
                        <Divider sx={{ my: 3 }} />
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        name="companyName"
                                        label={formConfig.labels.companyName}
                                        value={companyForm.companyName}
                                        placeholder="Demo Company"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormSelect
                                        name="industry"
                                        label={formConfig.labels.industry}
                                        value={companyForm.industry}
                                        onChange={handleSelectChange}
                                        options={formConfig.industryOptions}
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        name="location"
                                        label={formConfig.labels.location}
                                        value={companyForm.location}
                                        placeholder="City, Country"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        name="websiteURL"
                                        label={formConfig.labels.websiteURL}
                                        value={companyForm.websiteURL}
                                        placeholder="https://www.company.com"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        name="cetsId"
                                        label={formConfig.labels.cetsId}
                                        value={companyForm.cetsId}
                                        placeholder="Enter CETS"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormSelect
                                        name="employeeCount"
                                        label={formConfig.labels.employeeCount}
                                        value={companyForm.employeeCount}
                                        onChange={handleSelectChange}
                                        options={formConfig.employeeCountOptions}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <Spacer height={20} />
                            <Typography variant="subtitle1" component="h2" sx={{ mb: 2 }}>{t("pages.settings.companyProfile.businessIdentifiers")}</Typography>
                            {companyForm.businessIdentifierList.map((identifier, index) => (
                                <Paper key={`bizId-${index}`} variant="outlined" className="p-3" sx={{ mb: 2 }}>
                                    <Box component="div" className="flex flex-row items-center gap-2">
                                        <Box component="div" className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                            <FormSelect 
                                                name={`businessIdentifierType-${index+1}`}
                                                label={""}
                                                value={identifier.type}
                                                onChange={handleSelectChange}
                                                options={formConfig.businessIdentifierTypeOptions}
                                                disabled
                                                fullWidth={true}
                                                sx={{ width: '100%' }}
                                            />
                                            <TextField
                                                name={`businessIdentifierValue-${index+1}`}
                                                label={""}
                                                value={identifier.value}
                                                disabled
                                                sx={{ width: '100%' }}
                                            />
                                        </Box>
                                        {identifier.verified && getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }
                                    </Box>
                                </Paper>
                            ))}                            
                        </Form>
                    </Card>
                </TabPanel>
                <TabPanel value="3">

                </TabPanel>
            </TabContext>
        </>
    )
}