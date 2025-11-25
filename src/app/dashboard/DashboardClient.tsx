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
    const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';
    const GET_STARTED_STEPS = t('pages.dashboard.getStartedSteps');
    return (
        <>
            <Carousel slideNum={2} />
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
                    <Typography variant="h4" component="h2">{ t('pages.dashboard.welcomeTitle') }</Typography>
                </Box>
                <Spacer height={20} />
                <Typography variant="body2" component="p">{ t('pages.dashboard.welcomeLine1') }</Typography>
                <Spacer height={20} />
                <Typography variant="body2" component="p" dangerouslySetInnerHTML={{ __html: t('pages.dashboard.welcomeLine2') }} />
            </Box>
        
        {/* Get Started Tips */}
        
            <Card variant="outlined" className="p-6">
                <Box className="flex items-center">
                    <Emoji symbol="🚀" size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" component="h3">{ t('pages.dashboard.getStartedTitle') }</Typography>
                </Box>
                <Typography variant="body2" component="p" sx={{ mt: 2 }}>{ t('pages.dashboard.getStartedContext') }</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    {Array.isArray(GET_STARTED_STEPS) && GET_STARTED_STEPS.map((step, index) => (
                        <React.Fragment key={index}>
                            <Grid size="grow">
                                <Card 
                                    variant="outlined" 
                                    className={`p-3 lg:p-6 bg-linear-to-br border-2 border-${step.theme}-200! from-${step.theme}-50 to-${step.theme}-100 gap-4 center-layout h-full`}
                                    sx={{ height: '100%' }}
                                >
                                    <StyledIcon 
                                        icon={getLucideIcon(step.icon, 25)} 
                                        variant={`${step.theme}-inverted` as any}
                                        size={50}
                                    />
                                    <StyledIcon 
                                        icon={step.step} 
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
                                    <ArrowRight className={`text-${step.theme}-400`} />
                                </Card>
                            </Grid>
                            )}
                        </React.Fragment>
                    ))}
                </Grid>
            </Card>
            <Spacer height={20} />
            
            {/* Free Trial Features */}
            
            <Card variant="outlined" className="p-6">
                <Box className="flex items-center">
                    <CircleCheckBig size="20" color="#016630" className="mr-2" />
                    <Emoji symbol="🆓" size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" component="h3" color="#016630">Free Trial Features</Typography>
                </Box>
                <Typography variant="body2" component="p" sx={{ mt: 2 }}>You can start using these features right away (some with limited access):</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-green-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<FilePenLine size={18} />} 
                                    variant="green"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">SignConnect</Typography>
                                    <Typography variant="caption" component="p" color="#016630">Sign documents via Tradelink's DMSS using a certified digital identity (limited signing quota).</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-green-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<CreditCard size={18} />} 
                                    variant="green"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">PayConnect</Typography>
                                    <Typography variant="caption" component="p" color="#016630">Enjoy exclusive offers on financial services provided by T+ partners.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-green-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Building2 size={18} />} 
                                    variant="green"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">GovConnect</Typography>
                                    <Typography variant="caption" component="p" color="#016630">Use smart trade functions to automate and enhance trade compliance.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-green-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Shield size={18} />} 
                                    variant="green"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">SafeConnect</Typography>
                                    <Typography variant="caption" component="p" color="#016630">Access cybersecurity services for individuals and corporations (some features may be limited).</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                            <Typography variant="caption" component="h4" color="#2b7fff"><em>Note: Some features may require a subscription after the trial period ends. Click on the relevant pages in the menu to start using them.</em></Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
            <Spacer height={20} />
            
            {/* Features Available Soon */}
            
            <Card variant="outlined" className="p-6">
                <Box className="flex items-center">
                    <Calendar size="20" color="#c05621" className="mr-2" />
                    <Emoji symbol="🔐" size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" component="h3" color="#c05621">Features Available Soon</Typography>
                </Box>
                <Typography variant="body2" component="p" sx={{ mt: 2 }}>These advanced features are being rolled out progressively. Some will only be available with a subscription:</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-orange-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<FilePenLine size={18} />} 
                                    variant="orange"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">SignConnect</Typography>
                                    <Typography variant="caption" component="p" color="#c05621">Sign via other platforms (e.g. DocuSign, Fadada) and access premium features such as AI Document Assistant and AI Legal Assistant — exclusive to T+ members.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-amber-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Building size={18} />} 
                                    variant="amber"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">BizConnect</Typography>
                                    <Typography variant="caption" component="p" color="#B45309">Comprehensive business intelligence, due diligence services, and global market entry support launching soon.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-orange-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Building2 size={18} />} 
                                    variant="orange"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">GovConnect</Typography>
                                    <Typography variant="caption" component="p" color="#c05621">Use advanced AI tools to automate trade compliance (e.g. AI-powered customs automation) and connect to more government services via T+.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>          
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-orange-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Shield size={18} />} 
                                    variant="orange"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">SafeConnect</Typography>
                                    <Typography variant="caption" component="p" color="#c05621">Add-on cybersecurity services, such as additional web vulnerability assessments.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper elevation={0} className="p-3 bg-orange-50!">
                            <Box className="flex items-top">
                                <StyledIcon 
                                    icon={<Award size={18} />} 
                                    variant="orange"
                                    size={36}
                                    square
                                    className="mr-3"
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">ESG</Typography>
                                    <Typography variant="caption" component="p" color="#c05621">Track your environmental impact through paperless signing, and download annual ESG certificates or badges/reports from T+ partners with exclusive offers.</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                            <Typography variant="body1" component="h4">Ready to upgrade?</Typography>
                            <Typography variant="caption" component="h4" color="#2b7fff">Unlock all features by subscribing to our plans — launching soon!</Typography>
                            <ActionButton
                                autoWidth
                                variant="outlined" 
                                color="blue" 
                                buttonText="View Subscription Plans"
                                onClick={() => router.push("/subscriptions")}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Card>
            <Spacer height={20} />
            
            {/* Need help getting started? */}
            
            <Card variant="outlined" className="p-6">
                <Box className="flex items-center">
                    <Emoji symbol="🛠️" size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" component="h3" fontWeight={500}>Need help getting started?</Typography>
                </Box>
                <Typography variant="body2" component="p" sx={{ mt: 2 }}>Follow these 3 steps to unlock the full potential of T+</Typography>
                <Spacer height={20} />
                <Box
                    className="flex flex-row gap-5 justify-center items-center"
                    component="div"
                >
                    <Link variant="caption" href="/help-centre" underline="hover">Help Centre</Link> 
                    | 
                    <ButtonWithFormModal
                        textOnly={true}
                        templateId={CONTACT_SUPPORT_TEMPLATE_ID} 
                        buttonEndIcon={<ArrowRight />}
                        buttonText="Contact Support"
                    />
                </Box>
            </Card>
        </>
    );
}