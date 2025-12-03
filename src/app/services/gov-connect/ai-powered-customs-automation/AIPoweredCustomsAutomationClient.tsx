'use client';

import { ActionButton, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import theme from "@/theme/theme";
import { Box, Button, Card, FormControl, List, ListItem, ListItemText, Paper, RadioGroup, Typography } from "@mui/material";
import { ArrowLeft, Brain, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AIPoweredCustomsAutomationClient() {
    const t = useTranslations();
    const translations = useMemo(() => {
        const govConnect = t('pages.govConnect');
        const legalNotice = govConnect?.aiPoweredCustomsAutomation?.legalNotice;
        const declaration = govConnect?.aiPoweredCustomsAutomation?.declaration;
        
        return {
            govConnect,
            aiPoweredCustomsAutomation: govConnect?.aiPoweredCustomsAutomation,
            legalNotice,
            declaration,
        }
    }, [t]);
    const validationRules = useMemo(() => {
        return {
            declarationType: { required: true }
        };
    }, []);

    const initialValues = useMemo(() => {
        return {
            declarationType: translations.declaration.types[0].value,
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules)
    const [agreeConsent, setAgreeConsent] = useState(false);
    return (
        <>
            <Button
                component={Link}
                startIcon={<ArrowLeft size={16} />}
                variant="outlined"
                href="/services/gov-connect"
            >{ translations.govConnect.backToGovConnect }</Button>
            <Spacer height={20} />
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ translations.aiPoweredCustomsAutomation.title }</Typography>
            <Typography variant="body2" component="p">{ translations.aiPoweredCustomsAutomation.context }</Typography>
            <Spacer height={20} />
            
            <Box component="div" className="max-w-4xl">
                <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
                    { !agreeConsent &&
                    <>
                        <Box component="div" className="flex">
                            <CircleAlert size={20} color={theme.palette.text.blue} className="mr-2" />
                            <Typography variant="body2" component="p">{ translations.legalNotice.title }</Typography>
                        </Box>
                        <Spacer height={20} />
                        <Paper variant="outlined" className="px-12 py-6 bg-blue-50! border-blue-200! relative">
                            <CircleAlert size={16} className="top-5 left-4 absolute" />
                            <Typography variant="h6" component="p" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>{ translations.legalNotice.consent.title }</Typography>
                            <Spacer height={10} />
                            <Typography variant="caption" component="p" color={theme.palette.text.darkBlue}>{ translations.legalNotice.consent.body }</Typography>
                            <Spacer height={10} />
                            <List sx={{ listStyle: "decimal", pl: 3, color: theme.palette.text.darkBlue }}>
                                {translations.legalNotice.consent.points.map((point: string, idx: number) => 
                                    <ListItem key={`consent-point-${idx}`} sx={{ display: "list-item", py: 0, fontSize: 14 }}>
                                        <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: point }} />} />
                                    </ListItem>
                                )}
                            </List>
                            <Spacer height={10} />
                            <Typography variant="caption" component="p" color={theme.palette.text.darkBlue} sx={{ fontWeight: 700 }}>{ translations.legalNotice.consent.agreement }</Typography>
                        </Paper>
                        <Spacer height={20} />
                        <Box component="div" className="flex justify-end gap-4">
                            <Button
                                component={Link}
                                variant="outlined"
                                href="/services/gov-connect"
                            >{ t('common.decline') }</Button>
                            <ActionButton
                                buttonText={ t('common.acceptAndContinue') }
                                variant="gradient"
                                onClick={() => setAgreeConsent(true)}
                                autoWidth
                            />
                        </Box>
                    </>
                    }
                    { agreeConsent && 
                    <>
                        <Box component="div" className="flex">
                            <Brain size={20} className="mr-2" />
                            <Typography variant="body2" component="p">{ translations.declaration.title }</Typography>
                        </Box>
                        <Typography variant="body2" component="p" sx={{ mt: 1 }}>{ translations.declaration.context }</Typography>
                        <Spacer height={20} />
                        <FormControl>
                            <RadioGroup
                                defaultValue={ translations.declaration.types[0].value }
                                name="declarationType"
                            >
                                
                            </RadioGroup>
                        </FormControl>
                    </>
                    }  
                </Card>
            </Box> 
        </>
    )
}