'use client';

import { useRouter } from "next/navigation";
import { Box, Card, Grid, Link, Paper, Typography } from "@mui/material";
import { ArrowRight, Award, Building, Building2, Calendar, CircleCheckBig, CreditCard, FilePenLine, IdCard, Shield, Sparkles, User } from "lucide-react";

import { Carousel, Spacer, StyledIcon, Emoji, ButtonWithFormModal, ActionButton } from "@/components";
import theme from "@/theme/theme";
import { useTranslations } from "@/contexts/AppContext";
import React from "react";
import { getLucideIcon } from "@/helpers/utils";

export default function DashboardClient() {
    const t = useTranslations();
    const router = useRouter();
    
    const GET_STARTED_STEPS = t('pages.dashboard.getStartedTips.steps');
    const FREE_TRIAL_FEATURES = t('pages.dashboard.freeTrialFeatures.list');
    const TBC_FEATURES = t('pages.dashboard.featuresTBC.list');

    const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';
    return (
        <>
            <Carousel slideNum={2} />

            { /* Welcome Section */ }

            { t('pages.dashboard.welcome') && 
                <Box
                    className="flex flex-col items-center text-center py-8"
                    component="div"
                >
                    <StyledIcon 
                        icon={<CircleCheckBig size={32} />} 
                        variant="green"
                        size={64}
                    />
                    <Spacer height={10} />
                    <Box className="flex items-center">
                        <Emoji symbol="🎉" size={40} sx={{ mr: 1 }} />
                        <Typography variant="h4" component="h2">{ t('pages.dashboard.welcome.title') }</Typography>
                    </Box>
                    <Spacer height={20} />
                    <Typography variant="body2" component="p">{ t('pages.dashboard.welcome.line1') }</Typography>
                    <Spacer height={20} />
                    <Typography variant="body2" component="p" dangerouslySetInnerHTML={{ __html: t('pages.dashboard.welcome.line2') }} />
                </Box>
            }
        
            {/* Get Started Tips */}

            { t('pages.dashboard.getStartedTips') &&
                <>
                    <Card variant="outlined" className="p-6">
                        <Box className="flex items-center">
                            <Emoji symbol="🚀" size={25} sx={{ mr: 1 }} />
                            <Typography variant="body1" component="h3">{ t('pages.dashboard.getStartedTips.title') }</Typography>
                        </Box>
                        <Typography variant="body2" component="p" sx={{ mt: 2 }}>{ t('pages.dashboard.getStartedTips.context') }</Typography>
                        <Spacer height={20} />
                        <Grid container spacing={2}>
                            {Array.isArray(GET_STARTED_STEPS) && GET_STARTED_STEPS.map((step, index) => {
                                const getThemeColors = (themeName: string) => {
                                    const colors: Record<string, { border: string; from: string; to: string }> = {
                                        blue: { border: '#BFDBFE', from: '#EFF6FF', to: '#DBEAFE' },
                                        purple: { border: '#E9D5FF', from: '#FAF5FF', to: '#F3E8FF' },
                                        indigo: { border: '#C7D2FE', from: '#EEF2FF', to: '#E0E7FF' },
                                    } as const;
                                    return colors[themeName] || colors.blue;
                                };
                                const themeColors = getThemeColors(step.theme);
                                
                                return (
                                <React.Fragment key={index}>
                                    <Grid size="grow">
                                        <Card 
                                            variant="outlined" 
                                            className="p-3 lg:p-6 gap-4 center-layout h-full"
                                            sx={{ 
                                                height: '100%',
                                                borderWidth: '2px',
                                                borderColor: themeColors.border,
                                                background: `linear-gradient(to bottom right, ${themeColors.from}, ${themeColors.to})`
                                            }}
                                        >
                                            <StyledIcon 
                                                icon={getLucideIcon(step.icon, 25)} 
                                                variant={`${step.theme}-inverted` as any}
                                                size={50}
                                            />
                                            <StyledIcon 
                                                icon={index+1} 
                                                variant={`${step.theme}-inverted` as any}
                                                size={32}
                                            />
                                            <Typography variant="body2" component="h4">{step.title}</Typography>
                                            <Typography variant="caption" component="p" color={theme.palette.text[step.theme as keyof typeof theme.palette.text]}>{step.description}</Typography>
                                        </Card>
                                    </Grid>
                                    {index < GET_STARTED_STEPS.length - 1 && (
                                    <Grid size={1} sx={{ alignSelf: 'center' }}>
                                        <Card elevation={0} className="center-layout">
                                            <ArrowRight style={{ color: themeColors.border }} />
                                        </Card>
                                    </Grid>
                                    )}
                                </React.Fragment>
                            )})}
                        </Grid>
                    </Card>
                    <Spacer height={20} />
                </>
            }

            {/* Free Trial Features */}

            { t('pages.dashboard.freeTrialFeatures') && 
                <>
                    <Card variant="outlined" className="p-6">
                        <Box className="flex items-center">
                            <CircleCheckBig size="20" color="#016630" className="mr-2" />
                            <Emoji symbol="🆓" size={25} sx={{ mr: 1 }} />
                            <Typography variant="body1" component="h3" color="#016630">{ t('pages.dashboard.freeTrialFeatures.title') }</Typography>
                        </Box>
                        <Typography variant="body2" component="p" sx={{ mt: 2 }}>{ t('pages.dashboard.freeTrialFeatures.context') }</Typography>
                        <Spacer height={20} />
                        <Grid container spacing={2}>
                            {Array.isArray(FREE_TRIAL_FEATURES) && FREE_TRIAL_FEATURES.map((feature: any, index: number) => (
                                <Grid size={12} key={`ftf-${index}`}>
                                    <Paper elevation={0} className="p-3 bg-green-50!">
                                        <Box className="flex items-top">
                                            <StyledIcon 
                                                icon={getLucideIcon(feature.icon, 18)} 
                                                variant="green"
                                                size={36}
                                                square
                                                className="mr-3"
                                            />
                                            <Box>
                                                <Typography variant="body1" component="h4">{ feature.title }</Typography>
                                                <Typography variant="caption" component="p" color="#016630">{ feature.context }</Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                            { t('pages.dashboard.freeTrialFeatures.remarks') && (
                                <Grid size={12}>
                                    <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                                        <Typography variant="caption" component="h4" color="#2b7fff"><em>{ t('pages.dashboard.freeTrialFeatures.remarks.body') }</em></Typography>
                                    </Card>
                                </Grid>
                            )}       
                        </Grid>                
                    </Card>
                    <Spacer height={20} />
                </>
            }
            
            {/* Features Available Soon */}
            
            { t('pages.dashboard.featuresTBC') && 
                <>
                    <Card variant="outlined" className="p-6">
                        <Box className="flex items-center">
                            <Calendar size="20" color="#c05621" className="mr-2" />
                            <Emoji symbol="🔐" size={25} sx={{ mr: 1 }} />
                            <Typography variant="body1" component="h3" color="#c05621">{ t('pages.dashboard.featuresTBC.title') }</Typography>
                        </Box>
                        <Typography variant="body2" component="p" sx={{ mt: 2 }}>{ t('pages.dashboard.featuresTBC.context') }</Typography>
                        <Spacer height={20} />
                        <Grid container spacing={2}>
                            { Array.isArray(TBC_FEATURES) && TBC_FEATURES.map((feature: any, index: number) => 
                                <Grid size={12} key={`ftbc-${index}`}>
                                    <Paper elevation={0} className={`p-3 ${feature.isActive ? 'bg-orange-50!' : 'bg-amber-50!'}`}>
                                        <Box className="flex items-top">
                                            <StyledIcon 
                                                icon={getLucideIcon(feature.icon, 18)} 
                                                variant={feature.isActive ? 'orange' : 'amber'}
                                                size={36}
                                                square
                                                className="mr-3"
                                            />
                                            <Box>
                                                <Typography variant="body1" component="h4">{ feature.title }</Typography>
                                                <Typography variant="caption" component="p" color={feature.isActive ? '#C05621' : '#B45309'}>{ feature.context }</Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )}

                            { t('pages.dashboard.featuresTBC.remarks') && 
                                <Grid size={12}>
                                    <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                                        <Typography variant="body1" component="h4">{ t('pages.dashboard.featuresTBC.remarks.title') }</Typography>
                                        <Typography variant="caption" component="h4" color="#2b7fff">{ t('pages.dashboard.featuresTBC.remarks.context') }</Typography>
                                        <ActionButton
                                            autoWidth
                                            variant="outlined" 
                                            color="blue" 
                                            buttonText={ t('pages.dashboard.viewSubscriptionPlans') }
                                            onClick={() => router.push("/subscriptions")}
                                        />
                                    </Card>
                                </Grid>
                            }                            
                        </Grid>
                    </Card>
                    <Spacer height={20} />
                </>
            }
            
            {/* Need help getting started? */}

            { t('pages.dashboard.getHelp') && 
                <Card variant="outlined" className="p-6">
                    <Box className="flex items-center">
                        <Emoji symbol="🛠️" size={25} sx={{ mr: 1 }} />
                        <Typography variant="body1" component="h3" fontWeight={500}>{ t('pages.dashboard.needHelp.title') }</Typography>
                    </Box>
                    <Typography variant="body2" component="p" sx={{ mt: 2 }}>{ t('pages.dashboard.needHelp.context') }</Typography>
                    <Spacer height={20} />
                    <Box
                        className="flex flex-row gap-5 justify-center items-center"
                        component="div"
                    >
                        <Link variant="caption" href="/help-centre" underline="hover">{ t('nav.helpCentre') }</Link> 
                        | 
                        <ButtonWithFormModal
                            textOnly={true}
                            templateId={CONTACT_SUPPORT_TEMPLATE_ID} 
                            buttonEndIcon={<ArrowRight />}
                            buttonText={ t('pages.dashboard.contactSupport') }
                        />
                    </Box>
                </Card>   
            }
        </>
    );
}