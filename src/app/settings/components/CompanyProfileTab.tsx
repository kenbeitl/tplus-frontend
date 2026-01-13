'use client';

import React from "react";
import { Session } from "next-auth";
import { useTranslations } from '@/contexts/AppContext';
import { Spacer, FormSelect, Tag } from "@/components";
import { Box, Card, Divider, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";

interface CompanyProfileTabProps {
    session: Session | null;
}

type BusinessIdentifier = {
    type: string;
    value: string;
    verified: boolean;
};

export default function CompanyProfileTab({ session }: CompanyProfileTabProps) {
    const t = useTranslations();

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
        companyName: ((session?.user as any)?.company as any)?.name || '',
        industry: ((session?.user as any)?.company as any)?.industry || '',
        location: ((session?.user as any)?.company as any)?.location || '',
        websiteURL: ((session?.user as any)?.company as any)?.websiteURL || '',
        cetsID: ((session?.user as any)?.company as any)?.cetsID || '',
        employeeCount: ((session?.user as any)?.company as any)?.employeeCount || '',
        businessIdentifierList: [
            { type: 'business_registration_no', value: '123456789', verified: true },
            { type: 'duns_no', value: '91350211MA2Y3XXXXXX', verified: false },
        ] as BusinessIdentifier[]
    });

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCompanyForm({
            ...companyForm,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Card variant="outlined" className="p-6">
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

            <Spacer height={30} />

            <Card variant="outlined" className="p-3 bg-amber-50! border-amber-200! relative">
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

            <Divider className="my-12!" />

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormSelect
                        name="industry"
                        label={formConfig.labels.industry}
                        value={companyForm.industry}
                        onChange={handleSelectChange}
                        options={formConfig.industryOptions}
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="cetsID"
                        label={formConfig.labels.cetsID}
                        value={companyForm.cetsID}
                        placeholder="Enter CETS"
                        slotProps={{ inputLabel: { shrink: true } }}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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

            <Spacer height={30} />

            <Typography variant="subtitle1" component="h2" className="mb-2!">
                {t("pages.settings.companyProfile.businessIdentifiers")}
            </Typography>
            {companyForm.businessIdentifierList.map((identifier, index) => (
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
                </Paper>
            ))}
        </Card>
    );
}
