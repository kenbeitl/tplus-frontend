import { ActionButton, FormField, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import { useFormValidation } from "@/hooks/useFormValidation";
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import { Info } from "lucide-react";
import { useMemo } from "react";

export function SignUpTab() {
    const t = useTranslations();

    const validationRules = useMemo(() => {
        return {
            firstName: { required: true, minLength: 2, message: subSlot(t('form.error.required'), "{field}", "First Name") as string },
            lastName: { required: true, minLength: 2, message: subSlot(t('form.error.required'), "{field}", "Last Name") as string },
            companyName: { required: true, message: subSlot(t('form.error.required'), "{field}", "Company Name") as string },
            email: { required: true, email: true, message: subSlot(t('form.error.invalidEmail'), "{field}", "Email") as string },
            password: { required: true, minLength: 6, message: subSlot(t('form.error.minLength'), "{field}", "Password") as string },
            confirmPassword: { required: true, matchField: 'password', message: subSlot(t('form.error.passwordsNotMatch'), "{field}", "Confirm Password") as string },
            areYouGETS: { required: false },
            cetsId: { required: false }
        };
    }, [t]);
    const initialValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            password: '',
            confirmPassword: '',
            areYouGETS: true,
            cetsId: '',
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules);

    const handleSignUp = () => {
        // Sign up logic here
    }
    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="firstName"
                        label={ t("pages.signUp.form.firstName") }
                        placeholder={ t("pages.signUp.form.firstName") }
                        value={form.values.firstName || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.firstName ? (form.errors.firstName as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="lastName"
                        label={ t("pages.signUp.form.lastName") }
                        placeholder={ t("pages.signUp.form.lastName") }
                        value={form.values.lastName || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.lastName ? (form.errors.lastName as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormField
                        name="companyName"
                        label={ t("pages.signUp.form.companyName") }
                        placeholder={ t("pages.signUp.form.companyNamePlaceholder") }
                        value={form.values.companyName || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.companyName ? (form.errors.companyName as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormField
                        name="email"
                        label={ t("pages.signUp.form.email") }
                        placeholder={ t("pages.signUp.form.emailPlaceholder") }
                        value={form.values.email || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.email ? (form.errors.email as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="password"
                        label={"Password"}
                        value={form.values.password || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.password ? (form.errors.password as string) : ''}
                        autoComplete="new-password"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField
                        name="confirmPassword"
                        label={"Confirm Password"}
                        value={form.values.confirmPassword || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.confirmPassword ? (form.errors.confirmPassword as string) : ''}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" component="p">
                        { t('pages.signUp.form.areYouGETS') }
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <RadioGroup
                        value={ form.values.areYouGETS ? "yes" : "no" }
                        name="areYouGETS"
                        onChange={(e) => {
                            form.handleChange('areYouGETS', e.target.value === 'yes');
                        }}
                    >
                        <FormControl>
                            <FormControlLabel 
                                key={"gets-yes"}
                                value={"yes"} 
                                control={<Radio />} 
                                label={
                                    <Box component="div" className="flex items-center gap-2">
                                        <Typography variant="subtitle1" component="p">{ t('pages.signUp.form.yesGETS') }</Typography>
                                        <Tooltip
                                            title={ <Typography fontSize={14}>{t('wiki.cetsId')}</Typography> }
                                            placement="top"
                                            arrow
                                        >
                                            <Info size={16} className="shrink-0" />
                                        </Tooltip>
                                        :
                                        { form.values.areYouGETS && (
                                            <FormField
                                                name="cetsId"
                                                placeholder={ t('pages.signUp.form.cetsIdPlaceholder') }
                                                value={form.values.cetsId || ''}
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                                error={form.touched.cetsId ? (form.errors.cetsId as string) : ''}
                                                autoComplete="off"
                                                required
                                            />
                                        ) }                                        
                                    </Box>
                                }
                            />
                            <FormControlLabel 
                                key={"gets-no"}
                                value={"no"} 
                                control={<Radio />} 
                                label={ <Typography variant="subtitle1" component="p">{ t('pages.signUp.form.noGETS') }</Typography> }
                            />                        
                        </FormControl>
                    </RadioGroup>
                </Grid>                
            </Grid>
            <Spacer height={30} />
            <ActionButton
                variant="gradient"
                type="submit"
                buttonText="Create Account"
                endIcon={ getSVGIcon("check", 20) }
                autoWidth={false}         
            />
        </Box>
    );
}