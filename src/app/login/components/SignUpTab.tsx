import { ActionButton, FormField, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Box, CircularProgress, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import { Info } from "lucide-react";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";

export function SignUpTab() {
    const t = useTranslations();
    const { showSuccess } = useSnackbar();
    const { createUser, isLoading, error } = useCreateUser({
        onSuccess: () => {
            showSuccess('Account created successfully! Please check your email to verify your account before logging in.', 8000);
        }
    });

    const [usernameChecking, setUsernameChecking] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [usernameError, setUsernameError] = useState('');
    const [emailChecking, setEmailChecking] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
    const [emailError, setEmailError] = useState('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const validationRules = useMemo(() => {
        return {
            firstName: { required: true, minLength: 2, message: subSlot(t('form.error.required'), "{field}", "First Name") as string },
            lastName: { required: true, minLength: 2, message: subSlot(t('form.error.required'), "{field}", "Last Name") as string },
            companyName: { required: true, message: subSlot(t('form.error.required'), "{field}", "Company Name") as string },
            email: { required: true, email: true, message: subSlot(t('form.error.invalidEmail'), "{field}", "Email") as string },
            username: { required: true, message: subSlot(t('form.error.required'), "{field}", "Username") as string },
            password: { required: true, minLength: 6, message: subSlot(t('form.error.minLength'), "{field}", "Password") as string },
            confirmPassword: { required: true, matchField: 'password', message: t('form.error.passwordMismatch') as string },
            areYouGETS: { required: false },
            cetsID: { required: false }
        };
    }, [t]);
    const initialValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            areYouGETS: true,
            cetsID: '',
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules);

    const checkUsername = useCallback(async (username: string) => {
        if (!username || username.length < 3) {
            setUsernameAvailable(null);
            setUsernameError('');
            return;
        }

        setUsernameChecking(true);
        setUsernameError('');

        try {
            const response = await fetch(`/api/auth/check-user?username=${encodeURIComponent(username)}`);
            const data = await response.json();

            if (!response.ok) {
                setUsernameError(data.error || 'Error checking username');
                setUsernameAvailable(null);
            } else {
                setUsernameAvailable(!data.exists);
                if (data.exists) {
                    setUsernameError('Username is already taken');
                }
            }
        } catch (err) {
            setUsernameError('Error checking username availability');
            setUsernameAvailable(null);
        } finally {
            setUsernameChecking(false);
        }
    }, []);

    const checkEmail = useCallback(async (email: string) => {
        if (!email || !email.includes('@')) {
            setEmailAvailable(null);
            setEmailError('');
            return;
        }

        setEmailChecking(true);
        setEmailError('');

        try {
            const response = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`);
            const data = await response.json();

            if (!response.ok) {
                setEmailError(data.error || 'Error checking email');
                setEmailAvailable(null);
            } else {
                setEmailAvailable(!data.exists);
                if (data.exists) {
                    setEmailError('Email is already registered');
                }
            }
        } catch (err) {
            setEmailError('Error checking email availability');
            setEmailAvailable(null);
        } finally {
            setEmailChecking(false);
        }
    }, []);

    const handleCheckUser = useCallback((name: string, value: any) => {
        form.handleChange(name, value);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            if (name === 'username') {
                checkUsername(value);
            } else if (name === 'email') {
                checkEmail(value);
            }
        }, 500);

    }, [form, checkUsername, checkEmail]);



    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    const handleSignUp = async () => {
        const isValid = form.validateAll();
        
        if (!isValid || !usernameAvailable || !emailAvailable) {
            return;
        }

        await createUser({
            firstName: form.values.firstName,
            lastName: form.values.lastName,
            email: form.values.email,
            username: form.values.username,
            password: form.values.password,
            companyName: form.values.companyName,
            cetsID: form.values.areYouGETS ? form.values.cetsID : undefined,
        });
    };

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
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
                        onChange={handleCheckUser}
                        onBlur={form.handleBlur}
                        error={form.touched.email ? (form.errors.email as string) || emailError : ''}
                        autoComplete="off"
                        required
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: emailChecking ? (
                                    <CircularProgress size={20} />
                                ) : emailAvailable === true ? (
                                    getSVGIcon('check', 20, 'green')
                                ) : emailAvailable === false ? (
                                    getSVGIcon('close', 20, 'red')
                                ) : null
                            }
                        }}
                    />
                </Grid>
                {
                    emailAvailable === true && (
                    <Grid size={{ xs: 12 }}>
                        <FormField
                            name="username"
                            label={ t("pages.signUp.form.username") }
                            placeholder={ t("pages.signUp.form.usernamePlaceholder") }
                            value={form.values.username || ''}
                            onChange={handleCheckUser}
                            onBlur={form.handleBlur}
                            error={form.touched.username ? (form.errors.username as string) || usernameError : ''}
                            autoComplete="off"
                            required
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: usernameChecking ? (
                                        <CircularProgress size={20} />
                                    ) : usernameAvailable === true ? (
                                        getSVGIcon('check', 20, 'green')
                                    ) : usernameAvailable === false ? (
                                        getSVGIcon('close', 20, 'red')
                                    ) : null
                                }
                            }}
                        />
                    </Grid>
                    )
                }
               
                {usernameAvailable === true && (
                    <>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField
                                name="password"
                                label={ t('pages.signUp.form.password') }
                                placeholder={ t('pages.signUp.form.passwordPlaceholder') }
                                value={form.values.password || ''}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.password ? (form.errors.password as string) : ''}
                                autoComplete="new-password"
                                type="password"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField
                                name="confirmPassword"
                                label={ t('pages.signUp.form.confirmPassword') }
                                placeholder={ t('pages.signUp.form.confirmPasswordPlaceholder') }
                                value={form.values.confirmPassword || ''}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.confirmPassword ? (form.errors.confirmPassword as string) : ''}
                                autoComplete="off"
                                type="password"
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
                                                <Typography variant="subtitle1" component="p" sx={{ whiteSpace: 'nowrap' }}>{ t('pages.signUp.form.yesGETS') }</Typography>
                                                <Tooltip
                                                    title={ <Typography fontSize={14}>{t('wiki.cetsID')}</Typography> }
                                                    placement="top"
                                                    arrow
                                                >
                                                    <Info size={16} className="shrink-0" />
                                                </Tooltip>
                                                
                                                { form.values.areYouGETS && (
                                                    <FormField
                                                        name="cetsID"
                                                        placeholder={ t('pages.signUp.form.cetsIDPlaceholder') }
                                                        value={form.values.cetsID || ''}
                                                        onChange={form.handleChange}
                                                        onBlur={form.handleBlur}
                                                        error={form.touched.cetsID ? (form.errors.cetsID as string) : ''}
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
                    </>
                )}          
            </Grid>
            <Spacer height={30} />
            <ActionButton
                variant="gradient"
                type="submit"
                buttonText={ t("pages.signUp.form.createAccount") }
                endIcon={ getSVGIcon("check", 20) }
                autoWidth={false}
                disabled={isLoading}
            />
            <Typography variant="body2" component="p" sx={{ mt: 1, fontSize: 11 }}>{ t('pages.signUp.form.agreement') }</Typography>
        </Box>
    );
}