'use client';

import Carousel from "@/components/Carousel";
import Spacer from "@/components/ui/Spacer";
import { ArrowRight, Award, Building, Building2, Calendar, CircleCheckBig, CreditCard, FilePenLine, IdCard, Shield, Sparkles, User } from "lucide-react";
import StyledIcon from "@/components/StyledIcon";
import Emoji from "@/components/Emoji";
import { Box, Button, Card, Grid, Link, Paper, Typography } from "@mui/material";
import ButtonWithFormModal from "@/components/ButtonWithFormModal";
import theme from "@/theme/theme";
import { useTranslations } from "@/contexts/AppContext";

export default function DashboardClient() {
    const t = useTranslations();
    const CONTACT_SUPPORT_FORM_ID = 'contact-support';
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
                    <Typography variant="h4" component="h2">Welcome to T+</Typography>
                </Box>
                <Spacer height={20} />
                <Typography variant="body2" component="p">Your account has been successfully created — welcome aboard!</Typography>
                <Spacer height={20} />
                <Typography variant="body2" component="p">To help you get started, we've activated a <strong>3-month free trial</strong>, giving you immediate<br /> access to a selection of core services. Explore now and discover how T+ can support<br /> your business.</Typography>
            </Box>
        
        {/* Get Started Tips */}
        
            <Card variant="outlined" className="p-6">
                <Box className="flex items-center">
                    <Emoji symbol="🚀" size={25} sx={{ mr: 1 }} />
                    <Typography variant="body1" component="h3">Get Started Tips</Typography>
                </Box>
                <Typography variant="body2" component="p" sx={{ mt: 2 }}>Follow these 3 steps to unlock the full potential of T+</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size="grow">
                        <Card 
                            variant="outlined" 
                            className="p-3 lg:p-6 bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200! gap-4 center-layout"
                        >
                        <StyledIcon 
                            icon={<User size={25} />} 
                            variant="blue-inverted"
                            size={50}
                        />
                        <StyledIcon 
                            icon="1" 
                            variant="blue-inverted"
                            size={32}
                        />
                        <Typography variant="body2" component="h4">Complete your profile</Typography>
                        <Typography variant="caption" component="p" sx={{ color: theme.palette.text.blue }}>Fill in your user and company profile to access all T+ platform features</Typography>
                    </Card>
                </Grid>
                <Grid size={1}>
                    <Card elevation={0} className="center-layout">
                        <ArrowRight className="text-blue-400" />
                    </Card>
                </Grid>
                <Grid size="grow">
                    <Card 
                        variant="outlined" 
                        className="p-3 lg:p-6 bg-linear-to-br from-purple-50 to-purple-100 border-2 border-purple-200! gap-4 center-layout"
                    >
                        <StyledIcon 
                            icon={<IdCard size={25} />} 
                            variant="purple-inverted"
                            size={50}
                        />
                        <StyledIcon 
                            icon="2" 
                            variant="purple-inverted"
                            size={32}
                        />
                        <Typography variant="body2" component="h4">Apply for Digital Identity</Typography>
                        <Typography variant="caption" component="p" sx={{ color: theme.palette.text.purple }}>Create your verified digital identity to securely access T+ services</Typography>
                    </Card>
                </Grid>
                <Grid size={1}>
                    <Card elevation={0} className="center-layout">
                        <ArrowRight className="text-purple-400" />
                    </Card>
                </Grid>
                <Grid size="grow">
                    <Card 
                        variant="outlined" 
                        className="p-3 lg:p-6 bg-linear-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200! gap-4 center-layout"
                    >
                        <StyledIcon 
                            icon={<Sparkles size={25} />} 
                            variant="indigo-inverted"
                            size={50}
                        />
                        <StyledIcon 
                            icon="3" 
                            variant="indigo-inverted"
                            size={32}
                        />
                        <Typography variant="body2" component="h4">Explore Services</Typography>
                        <Typography variant="caption" component="p" sx={{ color: theme.palette.text.indigo }}>Use the menu bar to browse and try out all available services</Typography>
                    </Card>
                </Grid>
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
                            <Button variant="outlined" color="blue" sx={{ mt: 2 }}>View Subscription Plans</Button>
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
                        formId={CONTACT_SUPPORT_FORM_ID} 
                        buttonEndIcon={<ArrowRight />}
                        buttonText="Contact Support"
                    />
                </Box>
            </Card>
        </>
    );
}