'use client';

import { ArrowRight, Building, CreditCard, DollarSign, Plane, Shield, Sparkles, Users } from 'lucide-react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { ButtonWithModal, Carousel, Tag, Spacer, StyledIcon } from '@/components';
import ProviderModal from './modal/provider-modal';
import { useTranslations } from '@/contexts/AppContext';

export default function PayConnectClient() {

    const t = useTranslations();

    const getProviderCount = (key: string) => {
        const providers = t(`pages.payConnect.modal.${key}.providers`);
        return Array.isArray(providers) ? providers.length : 0;
    };

    const DIALOG_CARD = [
        {
            id: "1",
            icon: <Building size={18} />,
            title: "Bank Account Opening",
            description: "Open business accounts with partner banks across Asia-Pacific",
            providersAvailable: getProviderCount("bankAccountOpening"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="bankAccountOpening" emoji="🏦" />
        },
        {
            id: "2",
            icon: <CreditCard size={18} />,
            title: "Integrated Payment Solutions",
            description: "Online and offline payment processing for your business",
            providersAvailable: getProviderCount("integratedPaymentSolutions"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="integratedPaymentSolutions"  emoji="💳"/> 
        },
        {
            id: "3",
            icon: <Plane size={18} />,
            title: "Local & Cross-Border Remittance",
            description: "Fast and secure money transfers locally and internationally",
            providersAvailable: getProviderCount("localCrossBorderRemittance"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="localCrossBorderRemittance" emoji="🌐" />
        },
        {
            id: "4",
            icon: <DollarSign size={18} />,
            title: "Trade Financing",
            description: "Flexible trade financing solutions to support your business growth",
            providersAvailable: getProviderCount("tradeFinancing"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="tradeFinancing" emoji="🏛️" />
        },
        {
            id: "5",
            icon: <Shield size={18} />,
            title: "Trade Credit Insurance",
            description: "Protect your business against trade credit risks",
            providersAvailable: getProviderCount("tradeCreditInsurance"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="tradeCreditInsurance" emoji="🛡️" /> 
        },
        {
            id: "6",
            icon: <Users size={18} />,
            title: "Debt Collection Services",
            description: "Efficient debt recovery solutions for your business",
            providersAvailable: getProviderCount("debtCollectionServices"),
            targetModal: (open: boolean, onClose: () => void) => <ProviderModal open={open} onClose={onClose} type="debtCollectionServices" emoji="⚖️" />
        },
    ]

    return (
        <>
        <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.payConnect.title") }</Typography>
        <Typography variant="body2" component="p">{ t("pages.payConnect.context") }</Typography>
        <Spacer height={20} />
        <Tag label="Sponsored Partner Offers" className="text-base! text-only" startIcon={<Sparkles className="h-4 w-4 text-amber-500" />} />
        <Spacer height={20} />
        <Carousel slideNum={2} />
        <Spacer height={40} />
        <Grid container spacing={2}>
            {DIALOG_CARD.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                    <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }}>
                        <Box className="flex items-center">
                        <StyledIcon
                            icon={item.icon} 
                            variant="blue-gradient"
                            size={36}
                            square
                            className="mr-3 shrink-0"
                        />
                        <Box>
                            <Typography variant="body1" component="h4">{item.title}</Typography>
                        </Box>
                        </Box>
                        <Typography sx={{ mt: 2 }} variant="body2" component="p">{item.description}</Typography>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-3 border-2! bg-blue-50! border-blue-200! center-layout">
                            <StyledIcon 
                                icon={item.providersAvailable} 
                                variant="transparent"
                            />
                            <Typography variant="caption" component="p">Service Providers Available</Typography>
                        </Card>
                        <Spacer height={20} />
                        <ButtonWithModal
                            buttonProps={{
                                variant: 'gradient',
                                color: 'blue',
                                className: 'w-full',
                            }}
                            buttonText="View All Providers"
                            buttonEndIcon={<ArrowRight />}
                            modalContent={item.targetModal}
                        /> 
                    </Card>
                </Grid>        
            ))}        
        </Grid>
        </>
    );
}
