'use client';

import { useMemo } from "react";

import theme from "@/theme/theme";
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, styled } from "@mui/material";
import { Tag, Spacer, StyledIcon, ButtonWithFormModal, HeroSection, Carousel, Checklist } from "@/components";
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from "@/helpers/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useRouter } from "next/navigation";

export default function BizConnectClient() {
    const t = useTranslations();
    const router = useRouter();
    const isAboveMobile = useBreakpoint('mobile');

    const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';
    const GET_NOTIFICATION_ID = "get-notification";

    type bizConnectFeatureProps = {
        icon: string;
        variant: string;
        iconStyle?: string;
        title: string;
        description: string;
        list: string[];
        cardStyle?: string;
        slug?: string;
    }

    const translations = useMemo(() => {
        const bizConnect = t('pages.bizConnect');
        return {
            upcoming: bizConnect.upcoming,
            ourServices: bizConnect.ourServices as bizConnectFeatureProps[],
            upcomingFeatures: bizConnect.upcomingFeatures as bizConnectFeatureProps[],
            builtForYourSuccess: bizConnect.builtForYourSuccess,
            builtForYourSuccessFeatures: bizConnect.builtForYourSuccess?.features as Pick<bizConnectFeatureProps, "icon" | "iconStyle" | "title" | "description" | "cardStyle">[],
            stayInformed: bizConnect.stayInformed,
            developmentInProgress: bizConnect.developmentInProgress,
        };
    }, [t]);

    return (
        <>
            <HeroSection
                title={ t("pages.bizConnect.title") }
                description={ t("pages.bizConnect.context") }
                icon={ getSVGIcon('briefcase', 24, '#FFFFFF') }
                colorScheme="purple"
            />
            
            {/* <Spacer height={30} />
            <Carousel slides={ t("pages.bizConnect.slides") } /> */}

            <Spacer height={30} />

            <Paper variant="outlined" className="bg-linear-to-br! from-green-50! via-emerald-50! to-teal-50! p-8 border-2! border-green-200/50! shadow-lg overflow-hidden">
                <Box component="div" className="flex items-center mb-6">
                    <StyledIcon
                        icon={getSVGIcon('briefcase', 20, '#FFFFFF')}
                        variant="green-gradient"
                        size={40}
                        className="mr-3 shrink-0 shadow-lg"
                        square
                    />
                    <Typography variant="h5" component="h2" className="font-bold!">{ t("common.ourServices") }</Typography>
                </Box>
                <Grid container spacing={3}>
                    {Array.isArray(translations.ourServices) && translations.ourServices.map((item, w) => (
                        <Grid key={`our-services-${w}`} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card 
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                className={`group card-hover border-2! border-transparent! ${item.cardStyle} transition-colors! ${item.slug ? 'cursor-pointer!' : ''}`}
                                onClick={() => item.slug && router.push(item.slug)}
                            >
                                <StyledIcon 
                                    icon={getSVGIcon(item.icon, 30)}
                                    square
                                    variant={item.variant as any}
                                    size={60}
                                    className="shrink-0 shadow-lg"
                                />
                                <Typography variant="h5" component="h3" className="mt-5! font-bold!">{ item.title }</Typography>
                                <Checklist iconColor={theme.palette.icon.lightGreen} items={item.list} />                                
                                <Box className="flex items-center gap-1 text-blue-600!">
                                    <Typography variant="caption" color={theme.palette.text.blue}>{ t('common.clickToViewProvider') }</Typography>
                                    <Box component="span" className="group-hover:ml-1 transition-all">{ getSVGIcon('arrow-right', 16, theme.palette.text.blue) }</Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}            
                </Grid>
            </Paper>
            
            <Spacer height={30} />
            
            <Paper variant="outlined" className={`${theme.palette.gradientClasses.slateBlueLight} p-4 border-2! border-blue-200/50! shadow-lg overflow-hidden`}>
                <Box component="div" className="flex items-center gap-4 mb-3">
                    <StyledIcon 
                        icon={ getSVGIcon('shield', 24) }
                        square
                        variant="blue-gradient"
                        size={48}
                        className="shrink-0 shadow-lg"
                    />
                    <Typography variant="h5" component="h3">{translations.builtForYourSuccess.title}</Typography>
                </Box>
                <Typography variant="body2" component="p">{translations.builtForYourSuccess.context}</Typography>
                <Spacer height={30} />                
                <Grid container spacing={2}>
                    {Array.isArray(translations.builtForYourSuccessFeatures) && translations.builtForYourSuccessFeatures.map((feature, f) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`built-for-your-success-feature-${f}`}>
                            <Card variant="outlined" className={`flex items-center gap-3 mb-3 p-3 ${feature.cardStyle || ''}`}>
                                <StyledIcon 
                                    icon={ getSVGIcon(feature.icon, 20, theme.palette.text.white) }
                                    square
                                    size={40}
                                    className={`shrink-0 shadow-lg ${feature.iconStyle ? theme.palette.gradientClasses[feature.iconStyle as keyof typeof theme.palette.gradientClasses] : ''}`}
                                />
                                <Box component="div" className="">
                                    <Typography variant="h6" component="h3" className="font-bold!">{feature.title}</Typography>
                                    <Typography variant="caption" component="p">{feature.description}</Typography>
                                </Box>                                
                            </Card>
                        </Grid>
                    ))}                    
                </Grid>
            </Paper>

            <Spacer height={30} />

            <Paper variant="outlined" className="bg-linear-to-br! from-yellow-50! via-amber-50! to-orange-50! p-8 border-2! border-yellow-200/50! shadow-lg overflow-hidden">
                <Box component="div" className="flex items-start justify-between mb-6">
                    <Box component="div" className="flex items-center">
                        <StyledIcon
                            icon={getSVGIcon('clock')}
                            variant="amber-gradient"
                            size={48}
                            className="mr-3"
                            square
                        />
                        <Typography variant="h5" component="h2" className="font-bold!">{ t("common.upcomingFeatures") }</Typography>
                    </Box>
                    <Tag
                        label={ t('common.comingSoon') }
                        variant="orange"
                        startIcon={ getSVGIcon('sparkles', 16, theme.palette.text.white) }
                        className="text-base!"
                    />
                </Box>
                <Grid container spacing={3}>
                        {Array.isArray(translations.upcomingFeatures) && translations.upcomingFeatures.map((item, w) => (
                        <Grid key={`upcoming-features-${w}`} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card 
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                className={`card-hover border-2! border-amber-200! ${item.cardStyle} transition-colors!`}
                            >
                                <StyledIcon 
                                    icon={getSVGIcon(item.icon, 30)}
                                    square
                                    variant={item.variant as any}
                                    size={60}
                                    className="shrink-0 shadow-lg"
                                />
                                <Typography variant="h4" component="h3" className="mt-6! mb-2!">{ item.title }</Typography>
                                <Typography variant="body1" component="p" color={theme.palette.text.primary}>{ item.description }</Typography>
                                <Spacer height={30} />
                                <List sx={{ flexGrow: 1 }}>
                                    {item.list.map((point) => (
                                        <ListItem key={`${item.title}-point-${point}`}>
                                            <ListItemIcon>
                                                { getSVGIcon('circle-check-big', 16, theme.palette.icon.lightGreen) }
                                            </ListItemIcon>
                                            <ListItemText primary={point} primaryTypographyProps={{ sx: { fontSize: '14px' } }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Grid>
                    ))}  
                </Grid>
            </Paper>   

            <Spacer height={30} />

            <Card variant="outlined" className="p-6 bg-blue-600! border-2! border-blue-200!">
                    <Box component="div" className="flex items-center justify-between gap-6 text-white">
                        <Box component="div" className="flex items-center gap-3">
                            <StyledIcon 
                                variant="opacity"
                                icon={ getSVGIcon('sparkles', 24) }
                                size={48}
                                className="shrink-0"
                            />
                            <Box component="div">
                                <Typography variant="h5" component="h4" color={theme.palette.text.white}>{translations.developmentInProgress.title}</Typography>
                                <Typography variant="subtitle2" component="h6" className="font-normal!" color={theme.palette.text.white}>{translations.developmentInProgress.body}</Typography>
                            </Box>
                        </Box>
                        
                        <Box component="div" className="flex flex-col sm:flex-row gap-2 items-center">
                            <ButtonWithFormModal 
                                templateId={GET_NOTIFICATION_ID}
                                formId="BizConnect"
                                buttonStartIcon={ getSVGIcon('bell', 16) }
                                buttonText={t('common.notifyMeAtLaunch')}
                                buttonProps={{
                                    variant: 'outlined',
                                    color: 'blue',
                                    sx: { 
                                        whiteSpace: 'nowrap', 
                                        margin: 0,
                                        width: isAboveMobile ? 'auto' : '100%',
                                    }
                                }}
                            />
                            <ButtonWithFormModal 
                                templateId={CONTACT_SUPPORT_TEMPLATE_ID}
                                buttonText={t('common.contactUs')}
                                buttonProps={{
                                    variant: 'outlined',
                                    color: 'blue',
                                    sx: { 
                                        whiteSpace: 'nowrap',
                                        width: isAboveMobile ? 'auto' : '100%',
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Card>
        </>
    );
}