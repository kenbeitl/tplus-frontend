'use client';

import React from "react";
import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService } from '@/lib/keycloakApi';
import { Spacer, FormSelect, Tag } from "@/components";
import { Box, Button, Card, Divider, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";

export default function CompanyProfileTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();

    const isAdmin = tokenPayload?.customUserAttributes?.userRole?.toLowerCase() === 'admin';

    const formConfig = React.useMemo(() => {
        const form = t('pages.settings.form');
        return {
            industryOptions: form?.industryOptions || [],
            employeeCountOptions: form?.employeeCountOptions || [],
            businessIdentifierTypeOptions: form?.businessIdentifierTypeOptions || [],
            labels: form?.labels || {},
        };
    }, [t]);

    const [companyForm, setCompanyForm] = React.useState({
        name: tokenPayload?.companyName || '',
        relatedIndustries: (tokenPayload?.company as any)?.[0]?.relatedIndustries || '',
        addressBlkBldg: (tokenPayload?.company as any)?.[0]?.addressBlkBldg || '',
        addressStreet: (tokenPayload?.company as any)?.[0]?.addressStreet || '',
        addressDistrict: (tokenPayload?.company as any)?.[0]?.addressDistrict || '',
        addressCity: (tokenPayload?.company as any)?.[0]?.addressCity || '',
        websiteURL: (tokenPayload?.company as any)?.[0]?.websiteURL || '',
        cetsID: (tokenPayload?.company as any)?.[0]?.cetsID || '',
        numOfEmployeeInHK: (tokenPayload?.company as any)?.[0]?.numOfEmployeeInHK || '',
    });

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCompanyForm({
            ...companyForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyForm({
            ...companyForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateProfile = async () => {
        try {
            // Get company/group ID from token payload (company is an array)
            const companyId = (tokenPayload?.company as any)?.[0]?.id;
            
            if (!companyId) {
                showSnackbar('Company ID not found', 'error');
                return;
            }

            // Transform form data to match API schema (each field must be an array)
            const requestBody = {
                id: companyId,
                name: companyForm.name,
                attributes: {
                    name: [companyForm.name],
                    relatedIndustries: [companyForm.relatedIndustries],
                    addressBlkBldg: [companyForm.addressBlkBldg],
                    addressStreet: [companyForm.addressStreet],
                    addressDistrict: [companyForm.addressDistrict],
                    addressCity: [companyForm.addressCity],
                    websiteURL: [companyForm.websiteURL],
                    cetsID: [companyForm.cetsID],
                    numOfEmployeeInHK: [companyForm.numOfEmployeeInHK],
                },
            };

            await keycloakApiService.updateCompanyProfile(requestBody);

            showSnackbar('Company profile updated successfully!', 'success');
        } catch (error: any) {
            console.error('Update company profile error:', error);
            showSnackbar(error.message || 'Failed to update company profile', 'error');
        }
    };

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
            

            { !isAdmin && 
                <>
                    <Spacer height={30} />
                    <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200!">
                        <Box component="div" className="flex items-center gap-2 mb-1">
                            { getSVGIcon('eye', 20, theme.palette.text.gold) }
                            <Typography variant="h6" component="h2" color={theme.palette.text.darkAmber}>
                                { t("pages.settings.companyProfile.viewOnly.title") }
                            </Typography>
                        </Box>
                        <Typography variant="caption" component="h2" color={theme.palette.text.darkAmber}>
                            { t("pages.settings.companyProfile.viewOnly.description") }
                        </Typography>
                    </Card>
                </>
            }

            <Spacer height={30} />

            {/* <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200! relative">
                <Box component="div" className="flex justify-between items-center">
                    <Box component="div">
                        <Box component="div" className="flex items-center gap-2 mb-1!">
                            <Typography variant="h6" component="h2">
                                { t("pages.settings.companyProfile.publicProfile.title") }
                            </Typography>
                            <Tag 
                                variant="orange" 
                                label="Coming Soon" 
                                className="absolute sm:static right-2 sm:right-auto top-4 sm:top-auto" 
                            />
                        </Box>
                        <Typography variant="caption" component="h2">
                            { t("pages.settings.companyProfile.publicProfile.body") }
                        </Typography>
                    </Box>
                    <Switch disabled />
                </Box>
            </Card>

            <Divider className="my-12!" /> */}

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="name"
                        label={formConfig.labels.companyName}
                        value={companyForm.name}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormSelect
                        name="relatedIndustries"
                        label={formConfig.labels.industry}
                        value={companyForm.relatedIndustries}
                        onChange={handleSelectChange}
                        options={formConfig.industryOptions}
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="addressBlkBldg"
                        label={formConfig.labels.addressBlkBldg || "Block/Building"}
                        value={companyForm.addressBlkBldg}
                        onChange={handleInputChange}
                        placeholder="Block/Building"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="addressStreet"
                        label={formConfig.labels.addressStreet || "Street"}
                        value={companyForm.addressStreet}
                        onChange={handleInputChange}
                        placeholder="Street Address"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="addressDistrict"
                        label={formConfig.labels.addressDistrict || "District"}
                        value={companyForm.addressDistrict}
                        onChange={handleInputChange}
                        placeholder="District"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="addressCity"
                        label={formConfig.labels.addressCity || "City"}
                        value={companyForm.addressCity}
                        onChange={handleInputChange}
                        placeholder="City"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="websiteURL"
                        label={formConfig.labels.websiteURL}
                        value={companyForm.websiteURL}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="cetsID"
                        label={formConfig.labels.cetsID}
                        value={companyForm.cetsID}
                        onChange={handleInputChange}
                        placeholder="CETS ID"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormSelect
                        name="numOfEmployeeInHK"
                        label={formConfig.labels.employeeCount}
                        value={companyForm.numOfEmployeeInHK}
                        onChange={handleSelectChange}
                        options={formConfig.employeeCountOptions}
                        // disabled={!isAdmin}
                        disabled
                    />
                </Grid>
            </Grid>

            { isAdmin &&
                <Box component="div" className="flex justify-end mt-4!">
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={handleUpdateProfile}
                        sx={{ width: 'auto' }}
                        disabled
                    >
                        {t('common.saveProfile')}
                    </Button>
                </Box>
            }

            {/* <Spacer height={30} />

            <Typography variant="subtitle1" component="h2" className="mb-2!">
                {t("pages.settings.companyProfile.businessIdentifiers")}
            </Typography>
            
            <Paper key={`bizId-${index}`} variant="outlined" className="p-3 mb-8">
                <Box component="div" className="flex flex-row items-center gap-2">
                    <Box component="div" className="flex flex-col sm:flex-row items-center gap-2 w-full">
                        <FormSelect
                            name={`businessIdentifierType-${index + 1}`}
                            label={""}
                            value={identifier.type}
                            onChange={handleSelectChange}
                            options={formConfig.businessIdentifierTypeOptions}
                            disabled
                            fullWidth={true}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            name={`businessIdentifierValue-${index + 1}`}
                            label={""}
                            value={identifier.value}
                            disabled
                            sx={{ width: '100%' }}
                        />
                    </Box>
                    {identifier.verified && getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen)}
                </Box>
            </Paper> */}
        </Card>
    );
}
