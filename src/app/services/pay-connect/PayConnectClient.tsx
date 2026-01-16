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

    // const getProviderCount = (key: string) => {
    //     const providers = t(`pages.payConnect.${key}.providers`);
    //     return Array.isArray(providers) ? providers.length : 0;
    // };

    const AVAILABLE_SERVICES = t('pages.payConnect.availableServices');

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
                    icon={getSVGIcon('credit-card', 20, '#FFFFFF')}
                    variant="blue-gradient"
                    size={40}
                    className="mr-3"
                    square
                />
                <Typography variant="h5" component="h2" className="font-bold!">{ t("common.ourServices") }</Typography>
            </Box>
            <Grid container spacing={3}>
                {Array.isArray(AVAILABLE_SERVICES) && AVAILABLE_SERVICES.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`available-services-${index}`}>
                        <Card variant="outlined" className={`flex flex-col justify-between p-5 card-hover h-full border-2! ${item.active ? '' : 'border-yellow-200!'} relative`}>
                            <StyledIcon
                                icon={ getSVGIcon('lock', 20) } 
                                variant="orange-gradient"
                                size={40}
                                square
                                className="absolute top-5 right-5 shadow-xl"
                            />
                            <Box component="div">
                                <Box className="flex items-center mb-2 pe-12">
                                    <StyledIcon
                                        icon={ getSVGIcon(item.icon, 20) } 
                                        variant={`${item.active ? 'blue' : 'gray'}-gradient`}
                                        size={40}
                                        square
                                        className="mr-3 shrink-0"
                                    />
                                    <Typography variant="h5" component="h4">{item.title}</Typography>
                                </Box>
                                <Typography variant="subtitle1" component="p" className="font-normal!">{item.description}</Typography>
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
                                startIcon={ item.active ? undefined : getSVGIcon('sparkles', 20) }
                                endIcon={ item.active ? getSVGIcon('arrow-right', 20) : undefined }
                                onClick={ () => router.push(item.slug) }
                                disabled={!item.active}
                            >
                                { item.active ? t('pages.payConnect.viewAllProviders') : t('common.comingSoon') }
                            </Button> 
                        </Card>
                    </Grid>        
                ))}        
            </Grid>
            
        </>
    );
}
