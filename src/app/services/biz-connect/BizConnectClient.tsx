'use client';

import { useMemo } from "react";

import theme from "@/theme/theme";
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Tag, Spacer, StyledIcon, ActionButton, ButtonWithFormModal } from "@/components";
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from "@/helpers/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function BizConnectClient() {
    const t = useTranslations();
    const isAboveMobile = useBreakpoint('mobile');

    const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';
    const GET_NOTIFICATION_ID = "get-notification";

    type bizConnectFeatureProps = {
        icon: string;
        variant: string;
        title: string;
        description: string;
        list: string[];
    }

    const translations = useMemo(() => {
        const bizConnect = t('pages.bizConnect');
        return {
            prelaunch: bizConnect.prelaunch,
            upcoming: bizConnect.upcoming,
            upcomingFeatures: bizConnect.upcoming?.features as bizConnectFeatureProps[],
            builtForYourSuccess: bizConnect.builtForYourSuccess,
            builtForYourSuccessFeatures: bizConnect.builtForYourSuccess?.features as Pick<bizConnectFeatureProps, "icon" | "title" | "description">[],
            stayInformed: bizConnect.stayInformed,
            developmentInProgress: bizConnect.developmentInProgress,
        };
    }, [t]);

    
    return (
        <>
            <Box component="div" className="flex items-start gap-2">
                <Typography className="font-bold mb-4" variant="h4" component="h1">{ t("pages.bizConnect.title") }</Typography>
                <Tag variant="orange" label={t('common.comingSoon')} />
            </Box>
            <Typography variant="body2" component="p">{ t("pages.bizConnect.context") }</Typography>
            <Spacer height={40} />
            <Card variant="outlined" className="p-6 bg-blue-50! border-2! border-blue-200!">
                <Box component="div" className="flex flex-col md:flex-row items-top justify-between gap-8">
                    <Box component="div">
                        <Box component="div" className="flex items-center">
                            <Box component="span" className="mr-4">{ getSVGIcon('sparkles', 24, theme.palette.text.blue) }</Box>
                            <Typography variant="h4" component="h2" color={theme.palette.text.darkBlue}>{translations.prelaunch.title}</Typography>
                        </Box>
                        <Spacer height={10} />
                        <Typography variant="body2" component="p" className="mt-4">{translations.prelaunch.body}</Typography>
                        <Box component="div" className="flex flex-col sm:flex-row items-center gap-2 mt-6">
                            <ButtonWithFormModal
                                templateId={GET_NOTIFICATION_ID}
                                formId="BizConnect"
                                buttonStartIcon={ getSVGIcon('bell', 16) }
                                buttonText={translations.prelaunch.buttonText}
                                buttonProps={{
                                    sx:{ width: isAboveMobile ? 'auto' : '100%' }
                                }}
                            />
                            <ActionButton 
                                variant="outlined"
                                buttonText={t("common.learnMore")}
                                autoWidth={isAboveMobile ? true : false}
                                endIcon={ getSVGIcon('arrow-right', 16) }
                                color="white"
                            />
                        </Box>
                    </Box>
                    <StyledIcon
                        icon={ getSVGIcon('building-2', 100) }
                        variant="blue-inverted"
                        square
                        size={200}
                        className="shrink-0"
                        elevation={5}
                    />
                </Box>                
            </Card>
            <Spacer height={40} />
            <Typography variant="h4" component="h2" className="mb-8">{translations.upcoming.title}</Typography>
            <Grid container spacing={2}>
                {Array.isArray(translations.upcomingFeatures) && translations.upcomingFeatures.map((item, w) => (
                    <Grid key={`whats-comming-${w}`} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card 
                            variant="outlined"
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <StyledIcon 
                                icon={getSVGIcon(item.icon)}
                                square
                                variant={item.variant as any}
                                size={48}
                            />
                            <Typography variant="h6" component="h3" className="mt-8 mb-4">{ item.title }</Typography>
                            <Typography variant="body2" component="p" className="grow">{ item.description }</Typography>
                            <Spacer height={20} />
                            <List sx={{ flexGrow: 1 }}>
                                {item.list.map((point) => (
                                    <ListItem key={`${item.title}-point-${point}`}>
                                        <ListItemIcon>
                                            { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
                                        </ListItemIcon>
                                        <ListItemText primary={point} />
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </Grid>
                ))}            
            </Grid>
            <Spacer height={40} />
            <Card variant="outlined" className={`${theme.palette.gradientClasses.slateBlueLight} p-6`}>
                <Box component="div" className="flex items-center gap-4 mb-3">
                    { getSVGIcon('shield', 32, theme.palette.text.blue) }
                    <Typography variant="h6" component="h3">{translations.builtForYourSuccess.title}</Typography>
                </Box>
                <Typography variant="body2" component="p">{translations.builtForYourSuccess.context}</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    {Array.isArray(translations.builtForYourSuccessFeatures) && translations.builtForYourSuccessFeatures.map((feature, f) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`built-for-your-success-feature-${f}`}>
                            <Box component="div" className="flex items-center gap-4 mb-3">
                                { getSVGIcon(feature.icon, 24, theme.palette.text.blue) }
                                <Typography variant="h6" component="h3" className="font-bold">{feature.title}</Typography>
                            </Box>
                            <Typography variant="caption" component="p">{feature.description}</Typography>
                        </Grid>
                    ))}                    
                </Grid>
            </Card>
            <Spacer height={40} />
            <Card variant="outlined" className="p-6 bg-blue-600! border-2! border-blue-200!">
                <Box component="div" className="flex flex-col sm:flex-row items-top justify-between gap-6">
                    <Box component="div">
                        <Typography variant="h4" component="h2" color={theme.palette.text.white}>{translations.stayInformed.title}</Typography>
                        <Typography variant="body2" component="p" color={theme.palette.text.white} className="mt-4">{translations.stayInformed.body}</Typography>
                    </Box>
                    <Box component="div" className="flex flex-col sm:flex-row gap-2 items-center">
                        <ButtonWithFormModal 
                            templateId={GET_NOTIFICATION_ID}
                            formId="BizConnect"
                            buttonStartIcon={ getSVGIcon('bell', 16) }
                            buttonText={t('common.getNotified')}
                            buttonProps={{
                                variant: 'outlined',
                                sx: { 
                                    whiteSpace: 'nowrap', 
                                    margin: 0,
                                    width: isAboveMobile ? 'auto' : '100%',
                                }
                            }}
                        />
                        <ButtonWithFormModal 
                            templateId={CONTACT_SUPPORT_TEMPLATE_ID}
                            buttonText={t('common.contactSupport')}
                            buttonProps={{
                                variant: 'outlined',
                                sx: { 
                                    whiteSpace: 'nowrap',
                                    width: isAboveMobile ? 'auto' : '100%',
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Card>
             <Spacer height={40} />
            <Card variant="outlined" className="p-12">
                <Box component="div" className="flex items-top gap-4">
                    <StyledIcon 
                       variant="amber"
                       icon={ getSVGIcon('sparkles', 24) }
                       className="shrink-0"
                    />
                    <Box component="div">
                        <Typography variant="caption" component="h4" className="font-bold">{translations.developmentInProgress.title}</Typography>
                        <Typography variant="caption" component="p" className="mt-2">{translations.developmentInProgress.body}</Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
}