'use client';

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

import theme from "@/theme/theme";
import { alpha, Box, Button, Card, FormControl, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { ActionButton, FileDropZone, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useFileDrop } from "@/hooks/useFileDrop";

export default function AIPoweredCustomsAutomationClient() {
    const t = useTranslations();
    const translations = useMemo(() => {
        const govConnect = t('pages.govConnect');
        const legalNotice = govConnect?.aiPoweredCustomsAutomation?.legalNotice;
        const declaration = govConnect?.aiPoweredCustomsAutomation?.declaration;
        const fileUpload = govConnect?.aiPoweredCustomsAutomation?.fileUpload;
        const submission = govConnect?.aiPoweredCustomsAutomation?.submission;
        
        return {
            govConnect,
            aiPoweredCustomsAutomation: govConnect?.aiPoweredCustomsAutomation,
            legalNotice,
            declaration,
            fileUpload,
            submission,
        }
    }, [t]);
    const validationRules = useMemo(() => {
        return {
            declarationType: { required: true },
        };
    }, []);

    const initialValues = useMemo(() => {
        return {
            declarationType: translations.declaration.types[0].value,
        };
    }, []);
    const form = useFormValidation(initialValues, validationRules);
    const [currentStep, setCurrentStep] = useState(1);
    const [files, setFiles] = useState<{ shipment?: File; goods?: File }>({});

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        form.handleChange('declarationType', value);
    };

    // File drop hooks for each document
    const shipmentFileDrop = useFileDrop({
        onFileSelect: (file) => setFiles(prev => ({ ...prev, shipment: file }))
    });

    const goodsFileDrop = useFileDrop({
        onFileSelect: (file) => setFiles(prev => ({ ...prev, goods: file }))
    });

    const fileDropHooks = [shipmentFileDrop, goodsFileDrop];

    useEffect(() => {
        if (currentStep === 3) {
            setFiles({});
            shipmentFileDrop.clearFile();
            goodsFileDrop.clearFile();
        }
    }, [currentStep]);

    return (
        <>
            <Button
                component={Link}
                startIcon={ getSVGIcon('arrow-left', 16) }
                variant="outlined"
                href="/services/gov-connect"
            >{ translations.govConnect.backToGovConnect }</Button>
            <Spacer height={20} />
            <Typography className="font-bold mb-4" variant="h4" component="h1">{ translations.aiPoweredCustomsAutomation.title }</Typography>
            <Typography variant="body2" component="p">{ translations.aiPoweredCustomsAutomation.context }</Typography>
            <Spacer height={20} />
            
            <Box component="div" className="max-w-4xl">

                    {/* Step 1 */}

                    { currentStep === 1 &&
                    <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
                        <Box component="div" className="flex">
                            <Box component="span" sx={{ mr: 1}}>{ getSVGIcon('circle-alert', 20, theme.palette.text.blue) }</Box>
                            <Typography variant="body2" component="p">{ translations.legalNotice.title }</Typography>
                        </Box>
                        <Spacer height={20} />
                        <Paper variant="outlined" className="px-12 py-6 bg-blue-50! border-blue-200! relative">
                            <Box component="span" className="top-5 left-4 absolute">{ getSVGIcon('circle-alert', 16) }</Box>
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
                                onClick={() => setCurrentStep(currentStep+1)}
                                autoWidth
                            />
                        </Box>
                    </Card>
                    }

                    {/* Step 2 */}

                    { currentStep === 2 && 
                    <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
                        <Box component="div" className="flex">
                            <Box component="span" sx={{ mr: 1}}>{ getSVGIcon('brain', 20) }</Box>
                            <Typography variant="body2" component="p">{ translations.declaration.title }</Typography>
                        </Box>
                        <Typography variant="body2" component="p" className="mt-4">{ translations.declaration.context }</Typography>
                        <Spacer height={20} />
                        <FormControl
                            fullWidth
                        >
                            <RadioGroup
                                row
                                defaultValue={ translations.declaration.types[0].value }
                                name="declarationType"
                                sx={{ flexWrap: 'nowrap', gap: 2 }}
                                onChange={handleRadioChange}
                            >
                                {translations.declaration.types.map((type: any) => (
                                    <FormControlLabel 
                                        key={type.value}
                                        value={type.value}
                                        control={<Radio sx={{position: 'absolute', left: 5, top: 5}} />}
                                        label={
                                            <Box component="div" className="flex flex-col lg:flex-row items-top gap-2">
                                                <Box component="span">{getSVGIcon(type.icon, 20)}</Box>
                                                <Typography variant="caption" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{type.label}</Typography>
                                                <Typography variant="caption">{type.description}</Typography>
                                            </Box>
                                        }
                                        labelPlacement="bottom"
                                        className={type.value === form.values.declarationType ? `border-blue-600! bg-blue-50` : ''}
                                        sx={{
                                            position: 'relative',
                                            pt: 6, pr: 2, pb: 4, pl: 4,
                                            m: 0,
                                            borderWidth: '2px',
                                            borderStyle: 'solid' ,
                                            borderColor: alpha(theme.palette.divider, 0.1),
                                            borderRadius: 1,
                                            flexBasis: '50%',
                                            transition: 'border-color .1s ease-in',
                                            '&:hover': {
                                                borderColor: alpha(theme.palette.divider, 0.2),
                                            },
                                            
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Spacer height={20} />
                        <Box component="div" className="flex justify-between gap-4">
                            <ActionButton
                                buttonText={ t('common.back') }
                                variant="outlined"
                                color="white"
                                onClick={() => setCurrentStep(currentStep-1)}
                                autoWidth
                            />
                            <ActionButton
                                buttonText={ translations.declaration.buttonText }
                                variant="gradient"
                                onClick={() => setCurrentStep(currentStep+1)}
                                autoWidth
                            />
                        </Box>
                    </Card>
                    }

                    {/* Step 3 */}

                    { currentStep === 3 && 
                    <>
                        {translations.fileUpload.documents.map((doc: { id: number, icon: string, title: string, context: string }, idx: number) => {
                            const fileDropHook = fileDropHooks[idx];
                            return (
                                <Card key={doc.id || `doc-${idx}`} variant="outlined" className="p-6 mb-4" sx={{ height: '100%' }}>
                                    <Box component="div" className="flex">
                                        <Box component="span" sx={{ mr: 2 }}>{ getSVGIcon(doc.icon, 20) }</Box>
                                        <Typography variant="body2" component="p">{doc.title}</Typography>
                                    </Box>
                                    <Typography variant="body2" component="p" className="mt-4">{doc.context}</Typography>
                                    <Spacer height={30} />
                                    <FileDropZone
                                        isDragging={fileDropHook.isDragging}
                                        file={fileDropHook.file}
                                        onDragEnter={fileDropHook.handleDragEnter}
                                        onDragLeave={fileDropHook.handleDragLeave}
                                        onDragOver={fileDropHook.handleDragOver}
                                        onDrop={fileDropHook.handleDrop}
                                        onFileChange={fileDropHook.handleFileChange}
                                        placeholder={translations.fileUpload.field.placeholder}
                                        formats={translations.fileUpload.field.formats}
                                        buttonText={translations.fileUpload.field.buttonText}
                                        multiple
                                    />
                                </Card>
                            );
                        })}
                        <Box component="div" className="flex justify-between gap-4">
                            <ActionButton
                                buttonText={ t('common.back') }
                                variant="outlined"
                                color="white"
                                onClick={() => setCurrentStep(currentStep-1)}
                                autoWidth
                            />
                            <ActionButton
                                buttonText={ translations.declaration.buttonText }
                                variant="gradient"
                                onClick={() => setCurrentStep(currentStep+1)}
                                autoWidth
                                disabled={files.shipment === undefined || files.goods === undefined}
                            />
                        </Box>
                    </>
                    }

                    { currentStep === 4 && 
                    <Card variant="outlined" className="p-8" sx={{ height: '100%' }}>
                        <Box component="div" className="flex flex-col items-center">
                            <Box component="div" className="flex relative animate-pulse">
                                { getSVGIcon('brain', 64, theme.palette.text.blue) }
                                <Box component="span" className="absolute top-0 left-12">{ getSVGIcon('circle-check-big', 24, theme.palette.text.lightGreen) }</Box>
                            </Box>
                            <Typography variant="h5" component="h2" className="mt-12 font-bold">{ translations.submission.title }</Typography>
                            <Typography variant="h6" component="p" className="mt-4 mb-16 text-center">{ translations.submission.context }</Typography>
                        </Box>
                        <Paper variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                            <List dense>
                            {translations.submission.notes.map((note: {icon: string, theme: string, text: string}, idx: number) => (
                                <ListItem key={`submission-note-${idx}`} disableGutters>
                                <ListItemIcon sx={{ minWidth: 12, mr: 2 }}>
                                    {getSVGIcon(note.icon, 20, theme.palette.text[note.theme as keyof typeof theme.palette.text])}
                                </ListItemIcon>
                                <ListItemText
                                    slotProps={{
                                        primary: {
                                            variant: 'body1',
                                            color: theme.palette.text.darkBlue
                                        }
                                    }}
                                    primary={<span dangerouslySetInnerHTML={{ __html: note.text }} />}
                                />
                                </ListItem>
                            ))}
                            </List>
                        </Paper>
                        <Spacer height={25} />
                         <Box component="div" className="flex flex-col gap-3">
                            <ActionButton
                                startIcon={getSVGIcon('external-link', 20)}
                                buttonText={ translations.submission.viewDraft }
                                variant="gradient"
                                onClick="https://app.tradelinksig.com/auth/realms/tradelinkbox/protocol/openid-connect/auth?client_id=tdec&redirect_uri=https%3A%2F%2Fapp.tradelinksig.com%2Ftdec%2F%3Flocale%3Dzh_TW&state=a58ad935-e0b5-479a-8873-9f11697c9dd7&response_mode=fragment&response_type=code&scope=openid&nonce=994d7247-8466-4684-92a0-299d8aec9750&ui_locales=zh-TW&code_challenge=tQ2CSyOBRh0f7501lNreIq7U44BVUZSr04J8pY2rBpY&code_challenge_method=S256"
                            />
                            <Button
                                component={Link}
                                variant="outlined"
                                color="white"
                                href="/services/gov-connect"
                            >{subSlot(t('common.returnTo'), '{page}', t('pages.govConnect.title'))}</Button>
                        </Box>
                    </Card>
                    }
            </Box> 
        </>
    )
}