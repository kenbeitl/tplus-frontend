'use client';

import Tag from "@/components/Tag";
import Spacer from "@/components/ui/Spacer";
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import { useTranslations } from '@/contexts/AppContext';
import { ArrowRight, Bell, Briefcase, Building2, CircleCheckBig, FileCheck, Globe, Search, Shield, Sparkles, Target, Users } from "lucide-react";
import theme from "@/theme/theme";
import StyledIcon from "@/components/StyledIcon";
import ActionButton from "@/components/ActionButton";
import ButtonWithFormModal from "@/components/ButtonWithFormModal";

const WHATS_COMING_LIST = [
    {
        variant: "blue-inverted",
        icon: <Search size={24} />,
        title: "Business Matching Network",
        description: "Access our extensive database of 1M+ verified businesses across Hong Kong, Mainland China, and overseas markets",
        list: [
            "Advanced search and filtering capabilities",
            "Industry-specific recommendations",
            "AI-powered partnership suggestions",
        ]
    },
    {
        variant: "purple-inverted",
        icon: <FileCheck size={24} />,
        title: "Due Diligence Services",
        description: "Comprehensive background checks and verification services for potential business partners",
        list: [
            "Company verification and credentials",
            "Financial health assessments",
            "Regulatory compliance checks",
        ]
    },
    {
        variant: "green-inverted",
        icon: <Globe size={24} />,
        title: "One-Stop Go Global Services",
        description: "Everything you need to expand your business into international markets",
        list: [
            "Market entry strategy consulting",
            "International partnership facilitation",
            "Cross-border regulatory guidance",
        ]
    },
    {
        variant: "red-inverted",
        icon: <Target size={24} />,
        title: "China Market Entry Services",
        description: "Specialized support for businesses looking to enter or expand in the Chinese market",
        list: [
            "Mainland China business registration",
            "Local partner identification",
            "Regulatory compliance assistance",
        ]
    },
    {
        variant: "orange-inverted",
        icon: <Users size={24} />,
        title: "Verified Business Network",
        description: "Connect with confidence through our verified and authenticated business community",
        list: [
            "Digital identity verification",
            "Business credential authentication",
            "Secure communication channels",
        ]
    },
]

const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';
const GET_NOTIFICATION_ID = "get-notification";

export default function BizConnectClient() {
    const t = useTranslations();
    
    return (
        <>
            <Box component="div" className="flex items-start gap-2">
                <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.bizConnect.title") }</Typography>
                <Tag variant="orange" label={t('common.comingSoon')} />
            </Box>
            <Typography variant="body2" component="p">{ t("pages.bizConnect.context") }</Typography>
            <Spacer height={40} />
            <Card variant="outlined" className="p-6 bg-blue-50! border-2! border-blue-200!">
                <Box component="div" className="flex items-top gap-8">
                    <Box component="div">
                        <Box component="div" className="flex items-center">
                            <Sparkles size={24} className="mr-2" color={theme.palette.text.blue} />
                            <Typography variant="h4" component="h2" color={theme.palette.text.darkBlue}>Expanding Your Business Network</Typography>
                        </Box>
                        <Spacer height={10} />
                        <Typography variant="body2" component="p" className="mt-4">BizConnect is our comprehensive business intelligence and networking platform designed to help you discover partnerships, conduct due diligence, and expand into new markets with confidence.</Typography>
                        <Box component="div" className="flex items-center gap-2 mt-6">
                            <ButtonWithFormModal
                                templateId={GET_NOTIFICATION_ID}
                                formId="BizConnect"
                                buttonStartIcon={<Bell size={16} />}
                                buttonText="Notify Me at Launch"
                                buttonProps={{
                                    sx:{ width: 'auto' }
                                }}
                                
                            />
                            <ActionButton 
                                variant="outlined"
                                buttonText={t("common.learnMore")}
                                autoWidth
                                endIcon={<ArrowRight size={16} />}
                                color="white"
                            />
                        </Box>
                    </Box>
                    <StyledIcon
                        icon={<Building2 size={100} />}
                        variant="blue-inverted"
                        square
                        size={200}
                        className="shrink-0"
                        elevation={5}
                    />
                </Box>                
            </Card>
            <Spacer height={40} />
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>What's Coming with BizConnect</Typography>
            <Grid container spacing={2}>
                {WHATS_COMING_LIST.map((item, w) => (
                    <Grid key={`whats-comming-${w}`} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card 
                            variant="outlined" 
                            className="p-6" 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <StyledIcon 
                                icon={item.icon}
                                square
                                variant={item.variant as any}
                                size={48}
                            />
                            <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>{ item.title }</Typography>
                            <Typography variant="body2" component="p" sx={{ flexGrow: 1 }}>{ item.description }</Typography>
                            <Spacer height={20} />
                            <List sx={{ flexGrow: 1 }}>
                                {item.list.map((point) => (
                                    <ListItem key={`${item.title}-point-${point}`}>
                                        <ListItemIcon>
                                            <CircleCheckBig size={16} color="#43A047" />
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
            <Card variant="outlined" className="bg-linear-to-r from-slate-50 to-blue-50 p-6">
                <Box component="div" className="flex items-center gap-4 mb-3">
                    <Shield size={32} color={theme.palette.text.blue} />
                    <Typography variant="h6" component="h3">Built for Your Success</Typography>
                </Box>
                <Typography variant="body2" component="p">BizConnect combines cutting-edge technology with comprehensive business services</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box component="div" className="flex items-center gap-4 mb-3">
                            <Briefcase size={24} color={theme.palette.text.blue} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>End-to-End Support</Typography>
                        </Box>
                        <Typography variant="caption" component="p">From initial research to partnership execution, we support you throughout your business expansion journey</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box component="div" className="flex items-center gap-4 mb-3">
                            <Shield size={24} color={theme.palette.text.blue} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>Secure & Verified</Typography>
                        </Box>
                        <Typography variant="caption" component="p">All businesses in our network undergo rigorous verification to ensure authenticity and reliability</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box component="div" className="flex items-center gap-4 mb-3">
                            <Globe size={24} color={theme.palette.text.blue} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>Global Reach</Typography>
                        </Box>
                        <Typography variant="caption" component="p">Access opportunities across multiple markets including Hong Kong, Mainland China, and international territories</Typography>
                    </Grid>
                </Grid>
            </Card>
            <Spacer height={40} />
            <Card variant="outlined" className="p-6 bg-blue-600! border-2! border-blue-200!">
                <Box component="div" className="flex items-top justify-between gap-6">
                    <Box component="div">
                        <Typography variant="h4" component="h2" color={theme.palette.text.white}>Stay Informed</Typography>
                        <Typography variant="body2" component="p" color={theme.palette.text.white} className="mt-4">Be the first to know when BizConnect launches and get exclusive early access</Typography>
                    </Box>
                    <Box component="div" className="flex gap-2 items-center">
                        <ButtonWithFormModal 
                            templateId={GET_NOTIFICATION_ID}
                            formId="BizConnect"
                            buttonStartIcon={<Bell size={16} />}
                            buttonText="Get Notified"
                            buttonProps={{
                                variant: 'outlined',
                                sx: { whiteSpace: 'nowrap', margin: 0 }
                            }}
                        />
                        <ButtonWithFormModal 
                            templateId={CONTACT_SUPPORT_TEMPLATE_ID}
                            buttonText="Contact Support"
                            buttonProps={{
                                variant: 'outlined',
                                sx: {whiteSpace: 'nowrap'}
                            }}
                        />
                    </Box>
                </Box>
            </Card>
             <Spacer height={40} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-top gap-4 mb-3">
                    <StyledIcon 
                       variant="amber"
                       icon={<Sparkles size={24} />}
                       className="shrink-0"
                    />
                    <Box component="div">
                        <Typography variant="caption" component="h4" sx={{ fontWeight: 700 }}>Development in Progress</Typography>
                        <Typography variant="caption" component="p" className="mt-2">Our team is working diligently to bring you BizConnect with all its powerful features. We're currently in active development and expect to launch in the coming months. Thank you for your patience!</Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
}