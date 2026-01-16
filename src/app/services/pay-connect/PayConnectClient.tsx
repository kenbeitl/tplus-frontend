'use client';

import { Box, Button, Card, Divider, Grid, Paper, Typography } from '@mui/material';
import { Carousel, Tag, Spacer, StyledIcon, HeroSection } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';
import theme from '@/theme/theme';
import { useRouter } from 'next/navigation';

export default function PayConnectClient() {

    const t = useTranslations();
    const router = useRouter();

    const getProviderCount = (key: string) => {
        const providers = t(`pages.payConnect.${key}.providers`);
        return Array.isArray(providers) ? providers.length : 0;
    };

    const AVAILABLE_SERVICES = t('pages.payConnect.availableServices');
    const UPCOMING_FEATURES = t('pages.payConnect.upcomingFeatures');

    return (
        <>
            <HeroSection
                title={ t("pages.payConnect.title") }
                description={ t("pages.payConnect.context") }
                icon={ getSVGIcon('credit-card', 24, '#FFFFFF') }
                colorScheme="cyan"
            />
            
            {/* <Spacer height={30} />
            <Carousel slides={ t("pages.payConnect.slides") } /> */}
            
            <Divider className="my-9!" />
            <Box component="div" className="flex items-center mb-6">
                <StyledIcon
                    icon={getSVGIcon('credit-card', 24, '#FFFFFF')}
                    variant="blue-gradient"
                    size={48}
                    className="mr-3"
                    square
                />
                <Typography variant="h2" component="h2">{ t("common.ourServices") }</Typography>
            </Box>
            <Grid container spacing={3}>
                {Array.isArray(AVAILABLE_SERVICES) && AVAILABLE_SERVICES.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`available-services-${index}`}>
                        <Card variant="outlined" className="flex flex-col justify-between p-6 card-hover h-full">
                            <Box component="div">
                                <Box className="flex items-center mb-2">
                                    <StyledIcon
                                        icon={ getSVGIcon(item.icon, 30) } 
                                        variant="blue-gradient"
                                        size={48}
                                        square
                                        className="mr-3 shrink-0"
                                    />
                                    <Typography variant="h4" component="h4">{item.title}</Typography>
                                </Box>
                                <Typography variant="body1" component="p">{item.description}</Typography>
                            </Box>
                            {/* <Spacer height={30} />
                            <Card variant="outlined" className="p-3 border! bg-blue-50! border-blue-200/50! center-layout">
                                <StyledIcon 
                                    icon={ <Box component="span" className="text-3xl">{ getProviderCount(item.type) }</Box> }
                                    variant="transparent"
                                />
                                <Typography variant="h6" component="p" color={theme.palette.text.secondary}>{ t('pages.payConnect.serviceProvidersAvailable') }</Typography>
                            </Card> */}
                            <Spacer height={30} />
                            <Button
                                variant={item.active ? 'gradient': 'outlined'}
                                color={item.active ? 'blue': 'white'}
                                className='w-full text-lg! font-normal!'
                                endIcon={ getSVGIcon('arrow-right', 20) }
                                onClick={ () => router.push(item.slug) }
                                disabled={!item.active}
                            >
                                { t('pages.payConnect.viewAllProviders') }
                            </Button> 
                        </Card>
                    </Grid>        
                ))}        
            </Grid>
            <Spacer height={30} />
            <Paper className="bg-linear-to-br! from-yellow-50! via-amber-50! to-orange-50! p-8 border-2! border-yellow-200/50!">
                <Box component="div" className="flex items-start justify-between mb-6">
                    <Box component="div" className="flex items-center">
                        <StyledIcon
                            icon={getSVGIcon('clock')}
                            variant="amber-gradient"
                            size={48}
                            className="mr-3"
                            square
                        />
                        <Typography variant="h2" component="h2">{ t("common.upcomingFeatures") }</Typography>
                    </Box>
                    <Tag
                        label={ t('common.comingSoon') }
                        variant="orange"
                        startIcon={ getSVGIcon('sparkles', 16, theme.palette.text.white) }
                        className="text-base!"
                    />
                </Box>
                <Grid container spacing={3}>
                    {Array.isArray(UPCOMING_FEATURES) && UPCOMING_FEATURES.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`upcoming-features-${index}`}>
                            <Card variant="outlined" className="p-5 card-hover h-full border-2! border-yellow-300! hover:border-blue-400! transition-colors!">                                
                                <StyledIcon
                                    icon={ getSVGIcon(item.icon, 30) } 
                                    variant="blue-inverted"
                                    size={60}
                                    square
                                    className="mr-3 mb-3 shrink-0 shadow-lg"
                                />
                                <Typography variant="h5" component="h4" className="mb-2!">{item.title}</Typography>
                                <Typography variant="body1" component="p">{item.description}</Typography>
                            </Card>
                        </Grid>        
                    ))}        
                </Grid>
            </Paper>
        </>
    );
}
