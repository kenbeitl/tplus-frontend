'use client';

import { ButtonWithFormModal, ButtonWithModal, Checklist, Emoji, Spacer, StyledIcon } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon, subSlot } from "@/helpers/utils";
import { Box, Button, Card, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import ProviderDetails from "../modal/provider-details";
import theme from "@/theme/theme";
import { useRouter } from "next/navigation";

interface Provider {
  name: string;
  context: string;
  features?: string[];
  coverage?: string;
  fees?: string;
  minDeposit?: string;
  successRate?: string;
  processingTime?: string;
  details?: string;
  formId?: string;
  logo?: string;
}

interface PayConnectProviderListProps {
  modalNode: string;
  iconName?: string;
  iconSize?: number;
  iconVariant?: string;
}

export default function PayConnectProviderList({ 
  modalNode, 
  iconName = 'building',
  iconSize = 18,
  iconVariant = 'blue-gradient',
}: PayConnectProviderListProps) {
    const t = useTranslations();
    const router = useRouter();
    const providerList = Array.isArray(t(`${modalNode}.providers`)) ? t(`${modalNode}.providers`) : [];
    const providerCount = providerList.length || 0;

    return (
        <>
            <Button 
                variant="text"
                className="text-gray-600! mb-2!"
                startIcon={ getSVGIcon('arrow-left', 16) }
                onClick={() => router.push("/services/pay-connect")}
            >
                { t('pages.payConnect.backToPayConnect') }
            </Button>
            <Box className="flex items-center">
                <StyledIcon
                    icon={ getSVGIcon(iconName, iconSize) } 
                    variant={iconVariant as any}
                    size={48}
                    square
                    className="mr-3"
                />
                <Box>
                <Typography variant="h4" component="h1">{ t(`${modalNode}.title`) }</Typography>
                <Typography variant="body1" component="p" color={theme.palette.text.secondary}>{ t(`${modalNode}.context`) }</Typography>
                </Box>
            </Box>
            <Spacer height={30} />

            {/* Search field here */}
            
            {/* <Spacer height={30} /> */}
            <Grid container spacing={3}>
                {providerList.map((provider: Provider, index: number) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                        <Card variant="outlined" className="h-full card-hover">
                            <Box className="pt-4 px-4 w-full h-32 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center border-b border-gray-300">
                                <img src={`/assets/logo/${provider.logo}`} alt={provider.name} width={200} />
                            </Box>
                            <Box className="pt-12 px-4 flex flex-col items-center mb-4">
                                <Typography variant="h6" component="h3" className="ml-8 font-bold!">{ provider.name }</Typography>
                                <Typography variant="h6" component="p" color={ theme.palette.text.secondary }>{ provider.context }</Typography>
                            </Box>  
                            <Box className="px-4 pb-4">
                                <Spacer height={30} />
                                <Typography variant="subtitle1" component="p">{ t('pages.payConnect.keyFeatures') }</Typography>
                                <Checklist items={provider.features || []} />
                                <Spacer height={30} />
                                <Box className="p-3 bg-gray-50 rounded">
                                    <Grid container spacing={2}>
                                    {provider.coverage && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.payConnect.coverage') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            {provider.coverage}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.minDeposit && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.payConnect.minDeposit') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            ${Number(provider.minDeposit).toLocaleString('en-US')}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.fees && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.payConnect.fees') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            {provider.fees}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.successRate && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.payConnect.successRate') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            {provider.successRate}
                                        </Typography>
                                        </Grid>
                                    )}
                                    {provider.processingTime && (
                                        <Grid size={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ display: 'block' }}>
                                            { t('pages.payConnect.processingTime') }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            {provider.processingTime}
                                        </Typography>
                                        </Grid>
                                    )}
                                    </Grid>
                                </Box>
                                <Spacer height={30} />
                                <Box component="div" className="flex justify-between gap-2">
                                    <ButtonWithFormModal
                                        templateId="payconnect-service-providers"
                                        formId={`payconnect-service-providers@${provider.formId}`}
                                        buttonText={ t('pages.payConnect.requestService') }
                                        buttonProps={{
                                            variant: 'gradient',
                                            color: 'blue',
                                            sx: { width: '100%' }
                                        }}
                                    />
                                    <ButtonWithModal
                                        buttonText={ t('pages.payConnect.learnMore') }
                                        buttonProps={{
                                            variant: 'outlined',
                                            sx: { width: '100%' }
                                        }}
                                        buttonStartIcon={ getSVGIcon('external-link', 16) }
                                        modalContent={(open: boolean, onClose: () => void) => (
                                            <ProviderDetails open={open} onClose={onClose} name={provider.name} emoji="📸" source={provider.details || ''} />
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
