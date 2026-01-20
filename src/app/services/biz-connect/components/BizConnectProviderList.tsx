'use client';

import { ButtonWithFormModal, Spacer, StyledIcon } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon } from "@/helpers/utils";
import { Box, Button, Card, Grid, List, ListItem as MuiListItem, ListItemIcon as MuiListItemIcon, ListItemText, Typography, styled, Divider } from "@mui/material";
import theme from "@/theme/theme";
import { useRouter } from "next/navigation";

interface Provider {
    name: string;
    context: string;
    features?: string[];
    pricing: string;
    deliveryTime?: string;
    consultation?: string;
    formId?: string;
    logo?: string;
    link?: string;
}

interface BizConnectProviderListProps {
  modalNode: string;
  iconName?: string;
  iconSize?: number;
  variant?: string;
}

const ListItem = styled(MuiListItem)({
    marginBottom: 0,
});

const ListItemIcon = styled(MuiListItemIcon)({
    alignSelf: 'flex-start',
    marginTop: '0.55em',
});

export default function BizConnectProviderList({ 
  modalNode, 
  iconName = 'building',
  iconSize = 18,
  variant = 'blue-gradient',
}: BizConnectProviderListProps) {
    const t = useTranslations();
    const router = useRouter();
    const providerList = Array.isArray(t(`${modalNode}.providers`)) ? t(`${modalNode}.providers`) : [];

    return (
        <>
            <Button 
                variant="text"
                className="text-gray-600! mb-2!"
                startIcon={ getSVGIcon('arrow-left', 16) }
                onClick={() => router.push("/services/biz-connect")}
            >
                { t('pages.bizConnect.backToBizConnect') }
            </Button>
            <Box className="flex items-center">
                <StyledIcon
                    icon={ getSVGIcon(iconName, iconSize) } 
                    variant={variant as any}
                    size={64}
                    square
                    className="mr-3"
                />
                <Box>
                <Typography variant="h5" component="h1" className="font-bold!">{ t(`${modalNode}.title`) }</Typography>
                <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{ t(`${modalNode}.context`) }</Typography>
                </Box>
            </Box>
            <Spacer height={30} />
            <Grid container spacing={3}>
                {providerList.map((provider: Provider, index: number) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" className="h-full border! card-hover">
                            <Box className="pt-4 px-4 w-full h-32 flex items-center justify-center">
                                <img src={`/assets/logo/${provider.logo}`} alt={provider.name} width={200} />
                            </Box>
                            <Box className="pt-5 px-4 flex flex-col items-center mb-4">
                                <Typography variant="h5" component="h3" className="ml-8">{ provider.name }</Typography>
                                <Typography variant="caption" component="p" color={ theme.palette.text.secondary }>{ provider.context }</Typography>
                            </Box>  
                            <Box className="px-4 pb-4">
                                <Spacer height={30} />
                                <Typography variant="subtitle2" component="p" className="font-normal!">{ t('pages.bizConnect.servicesOffered') }</Typography>
                                <List sx={{ flexGrow: 1 }}>
                                    {provider.features?.map((feature: string, f_idx: number) => (
                                    <ListItem key={`features-${f_idx}`}>
                                        <ListItemIcon sx={{ marginTop: '0.35em' }}>
                                            { getSVGIcon('circle-check-big', 16, theme.palette.icon.lightGreen) }
                                        </ListItemIcon>
                                        <ListItemText primary={feature} slotProps={{ primary: { sx: { fontSize: '14px' } } }} />
                                    </ListItem>
                                    ))}
                                </List>
                                <Divider className="my-2!" />
                                <Grid container spacing={2}>
                                    {provider.pricing && (
                                        <Grid size={6}>
                                        <Typography variant="caption" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.bizConnect.pricing') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                            {provider.pricing}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.deliveryTime && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.bizConnect.deliveryTime') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                            {provider.deliveryTime}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.consultation && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.bizConnect.consultation') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                            {provider.consultation}
                                        </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                
                                <Spacer height={30} />
                                <Box component="div" className="flex justify-between gap-2">
                                    <ButtonWithFormModal
                                        templateId="bizconnect-service-providers"
                                        formId={`bizconnect-service-providers@${provider.formId}`}
                                        buttonText={ modalNode.indexOf('dueDiligenceService') >= 0 ? t('pages.bizConnect.requestService') : t('pages.bizConnect.requestConsultation') }
                                        buttonProps={{
                                            variant: 'gradient',
                                            color: 'blue',
                                            sx: { width: '100%' }
                                        }}
                                    />
                                    {provider.link && 
                                        <Button 
                                            variant="outlined" 
                                            color="white"
                                            endIcon={ getSVGIcon('external-link', 16) }
                                            onClick={ () => window.open(`/assets/files/${provider.link}`, "_blank") }
                                            className="whitespace-nowrap"
                                            sx={{ width: '100%' }}
                                        >
                                            { modalNode.indexOf('dueDiligenceService') >= 0 ? t('pages.bizConnect.learnMore') : t('pages.bizConnect.downloadBrochure') }
                                        </Button>
                                    }                                    
                                </Box> 
                            </Box>                           
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* { t(`${modalNode}.whyUs`) && (
                <Card variant="outlined" className="mt-6 p-4 border-2! border-blue-300! bg-blue-50!">
                    <Typography variant="h6" component="p" color={theme.palette.text.darkBlue}>{ t(`${modalNode}.whyUs.title`) }</Typography>
                    <List sx={{ flexGrow: 1 }}>
                        {t(`${modalNode}.whyUs`)?.rationale?.map((reason: string, r_idx: number) => (
                        <ListItem key={`reason-${r_idx}`} className="py-0!">
                            <ListItemIcon>
                                { getSVGIcon('circle-check-big', 16, theme.palette.icon.blue) }
                            </ListItemIcon>
                            <ListItemText primary={reason} sx={{ color: theme.palette.text.darkBlue }} />
                        </ListItem>
                        ))}
                    </List>
                </Card>
            )} */}
        </>
    )
}
