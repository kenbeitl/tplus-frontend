'use client';

import React, { useMemo } from "react";
import { Spacer, TabList, Tab, TabPanel, Form, FormField, FormSelect, ActionButton, Tag } from "@/components";
import { useTranslations } from '@/contexts/AppContext';
import { useFormValidation } from "@/hooks/useFormValidation";
import { Box, Card, Divider, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { SelectChangeEvent } from '@mui/material';
import { Building, CircleCheck, CircleCheckBig, Eye, User } from "lucide-react";
import { useSession } from "next-auth/react";
import theme from "@/theme/theme";

export default function SettingsClient() {
    const { data: session, status } = useSession();
    const t = useTranslations();
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const industryOptions = [
        { value: 'technology', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'construction', label: 'Construction' },
    ];

    const employeeCountOptions = [
        { value: '1-10', label: '1-10' },
        { value: '11-50', label: '11-50' },
        { value: '51-200', label: '51-200' },
        { value: '201-500', label: '201-500' },
        { value: '500+', label: '500+' },
    ];

     const businessIdentfierTypeOptions = [
        { value: 'business_registration_no', label: "Business Registration No." },
        { value: 'duns_no', label: "D-U-N-S No." },
        { value: 'lei_no', label: "LEI No." },
        { value: 'unified_social_credit_identifier', label: "Unified Social Credit Identifier (统一社会信用代码)" },
    ];

    const validationRules = useMemo(() => {
    return {
        firstName: { required: true, minLength: 2, message: "First name is required and must be at least 2 characters" },
        lastName: { required: true, minLength: 2, message: "Last name is required and must be at least 2 characters" },
        companyName: { required: false },
        userRole: { required: false },
        email: { required: true, email: true, message: "A valid email is required" },
        currentPassword: { required: false, minLength: 6, message: "Current password must be at least 6 characters" },
        newPassword: { required: false, minLength: 6, message: "New password must be at least 6 characters" },
    };
    }, []);

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
                        <Tab label={t("pages.settings.userProfile")} value="1" disableRipple />
                        <Tab label={t("pages.settings.companyProfile")} value="2" disableRipple />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Card variant="outlined" className="p-6">
                        <Box component="div" className="flex items-center gap-2 mb-1">
                            <User size={20} />
                            <Typography variant="h6" component="h2">{t("pages.settings.userProfile")}</Typography>
                        </Box>
                        <Typography variant="body2" component="p">Manage your personal account information and security settings</Typography>
                        <Spacer height={20} />
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <FormField
                                        name="firstName"
                                        label={t('pages.settings.firstName')}
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
                                        label={t('pages.settings.lastName')}
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
                                        label="Company Name"
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
                                        label="User Role"
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
                            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>{t("pages.settings.loginDetails")}</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <FormField
                                        name="email"
                                        label="Email"
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
                                        label="Current Password"
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
                                        label="New Password"
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
                        <Typography variant="h6" component="h2" sx={{ mb: 3, color: theme.palette.text.red }}>{t("pages.settings.dangerZone")}</Typography>
                        <Card variant="outlined" className="p-3 bg-red-50! border-red-200!">
                            <Box component="div" className="flex items-center justify-between mb-2">
                                <Box component="div" className="flex flex-col gap-1">
                                    <Typography variant="h6" component="p">Delete Account</Typography>
                                    <Typography variant="caption" component="p">Permanently delete your account and all data</Typography>
                                </Box>
                                <ActionButton 
                                    buttonText="Delete Account"
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
                                buttonText={t("pages.settings.saveChanges")} 
                                onClick={handleSubmit}
                                autoWidth
                            />
                        </Box>
                    </Card>
                </TabPanel>
                <TabPanel value="2">
                    <Card variant="outlined" className="p-6">
                        <Box component="div" className="flex items-center gap-2 mb-1">
                            <Building size={20} />
                            <Typography variant="h6" component="h2">{t("pages.settings.companyProfile")}</Typography>
                        </Box>
                        <Typography variant="body2" component="p">View your company information (contact admin to make changes)</Typography>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200!">
                            <Box component="div" className="flex items-center gap-2 mb-1">
                                <Eye size={20} color={theme.palette.text.gold} />
                                <Typography variant="h6" component="h2" color={theme.palette.text.darkAmber}>View Only</Typography>
                            </Box>
                            <Typography variant="caption" component="h2" color={theme.palette.text.darkAmber}>You can view company profile information but cannot make changes. Contact your administrator to update company details.</Typography>
                        </Card>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200!">
                            <Box component="div" className="flex justify-between items-center">
                                <Box component="div">
                                    <Box component="div" className="flex items-center gap-2 mb-1">
                                        <Typography variant="h6" component="h2">Make my company profile public</Typography>
                                        <Tag variant="orange" label="Coming Soon" />
                                    </Box>
                                    <Typography variant="caption" component="h2">Your profile will be visible in BizConnect when it launches. You can manage this setting now for future use.</Typography>
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
                                        label={t('pages.settings.companyName')}
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
                                        label={t('pages.settings.industry')}
                                        value={companyForm.industry}
                                        onChange={handleSelectChange}
                                        options={industryOptions}
                                        disabled
                                    />
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        name="location"
                                        label={t('pages.settings.location')}
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
                                        label={t('pages.settings.websiteURL')}
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
                                        label={t('pages.settings.cetsId')}
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
                                        label={t('pages.settings.employeeCount')}
                                        value={companyForm.employeeCount}
                                        onChange={handleSelectChange}
                                        options={employeeCountOptions}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <Spacer height={20} />
                            <Typography variant="subtitle1" component="h2" sx={{ mb: 2 }}>Business Identifiers</Typography>
                            {companyForm.businessIdentifierList.map((identifier, index) => (
                                <Paper key={`bizId-${index}`} variant="outlined" className="p-3" sx={{ mb: 2 }}>
                                    <Box component="div" className="flex items-center gap-2">
                                        <FormSelect 
                                            name={`businessIdentifierType-${index+1}`}
                                            label={""}
                                            value={identifier.type}
                                            onChange={handleSelectChange}
                                            options={businessIdentfierTypeOptions}
                                            disabled
                                            fullWidth={false}
                                            sx={{ width: '20vw' }}
                                        />
                                        <TextField
                                            name={`businessIdentifierValue-${index+1}`}
                                            label={""}
                                            value={identifier.value}
                                            disabled
                                            sx={{ flexGrow: 1 }}
                                        />
                                        {identifier.verified && (
                                            <CircleCheckBig size={20} color={theme.palette.text.lightGreen} />
                                        )}
                                    </Box>
                                </Paper>
                            ))}                            
                        </Form>
                    </Card>
                </TabPanel>
            </TabContext>
        </>
    )
}