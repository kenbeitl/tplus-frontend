'use client';

import { useMemo } from "react";
import Link from "next/link";

import { Box, Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ActionButton, FormField, Spacer } from "@/components";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useTranslations } from "@/contexts/AppContext";
import { getLucideIcon } from "@/helpers/utils";

export default function HSCodeAIClassifierClient() {
    const t = useTranslations();
    const translations = useMemo(() => {
        const govConnect = t('pages.govConnect');
        const productClassification = t('pages.govConnect.hsCodeAIClassifier.productClassification');
        return {
            govConnect,
            hsCodeAIClassifier: govConnect?.hsCodeAIClassifier,
            productClassification,
            hsCodeType: [
                {
                    label: productClassification.hkHSCodeLabel,
                    value: productClassification.hkHSCode
                },
                {
                    label: productClassification.chinaHSCodeLabel,
                    value: productClassification.chinaHSCode
                }
            ]
        }
    }, [t]);
    const validationRules = useMemo(() => {
        return {
            productDescription: { required: true }
        };
    }, []);

    const initialValues = useMemo(() => {
        return {
            productDescription: '',
            hsCodeType: translations.productClassification.hkHSCode
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules)
    return (
        <Box component="div" className="relative">
            <Button 
                component={Link}
                startIcon={ getLucideIcon('arrow-left', 16) }
                variant="outlined"
                href="/services/gov-connect"
            >{ translations.govConnect.backToGovConnect }</Button>
            <Spacer height={20} />
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ translations.hsCodeAIClassifier.title }</Typography>
            <Typography variant="body2" component="p">{ translations.hsCodeAIClassifier.context }</Typography>
            <Spacer height={20} />
            <Box component="div" className="max-w-3xl">
                <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
                    <Box className="flex items-center mb-2">
                        <Box component="span" sx={{ mr: 1 }}>{ getLucideIcon('search', 20) }</Box>
                        <Typography variant="body1" component="h2" sx={{ fontWeight: 600 }}>{ translations.productClassification.title }</Typography>
                    </Box>
                    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>{ translations.productClassification.context }</Typography>
                    <Spacer height={10} />
                    <Typography variant="body1" component="p" sx={{ fontWeight: 600 }}>{ translations.productClassification.selectHSCodeType }</Typography>
                    <FormControl>
                        <RadioGroup
                            defaultValue={ translations.productClassification.hkHSCode }
                            name="hsCodeType"
                        >
                            {translations.hsCodeType.map((type) => {
                                return (
                                    <FormControlLabel 
                                        key={type.value}
                                        value={ type.value } 
                                        control={<Radio />} 
                                        label={ type.label }
                                    />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                    <Spacer height={10} />
                    <Typography variant="body1" component="p" sx={{ fontWeight: 600, marginBottom: 1 }}>{ translations.productClassification.productDescription } *</Typography>
                    <FormField
                        name="productDescription"
                        placeholder={ translations.productClassification.productPlaceholder }
                        value={form.values.productDescription || ''}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.message ? (form.errors.message as string) : ''}
                        multiline
                        minRows={2}
                        maxRows={5}
                        fullWidth
                        sx={{ 
                            '& .MuiInputBase-root': { 
                                padding: '4px' 
                            } 
                        }}
                    />
                    <Typography variant="caption" component="p" sx={{ color: 'text.secondary', marginTop: 1 }}>{ translations.productClassification.productTip }</Typography>
                    <Spacer height={20} />
                    <ActionButton
                        buttonText={ translations.productClassification.classifyProduct }
                        startIcon={ getLucideIcon('bot', 16) }
                        variant="gradient"
                        onClick={() => {}}
                        disabled={form.values.productDescription === ''}
                    />
                </Card>
            </Box>
        </Box>
    )
}