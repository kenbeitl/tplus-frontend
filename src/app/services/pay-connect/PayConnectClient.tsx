'use client';

import { ArrowRight, Building, CreditCard, DollarSign, Plane, Shield, Sparkles, Users } from 'lucide-react';
import { Box, Card, Grid, Typography } from '@mui/material';

import ButtonWithModal from '@/components/ButtonWithModal';
import Carousel from '@/components/Carousel';
import InlineTag from '@/components/InlineTag';
import Spacer from '@/components/ui/Spacer';
import StyledIcon from '@/components/StyledIcon';

import ModalBankAccountOpening from './modal/bank-account-opening';
import ModalDebtCollectionServices from './modal/debt-collection-services';
import ModalIntegratedPaymentSolutions from './modal/integrated-payment-solutions';
import ModalLocalCrossBorderRemittance from './modal/local-cross-border-remittance';
import ModalTradeCardInsurance from './modal/trade-card-insurance';
import ModalTradeFinancing from './modal/trade-financing';

const DIALOG_CARD = [
    {
        id: "1",
        icon: <Building size={18} />,
        title: "Bank Account Opening",
        description: "Open business accounts with partner banks across Asia-Pacific",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalBankAccountOpening open={open} onClose={onClose} />
    },
    {
        id: "2",
        icon: <CreditCard size={18} />,
        title: "Integrated Payment Solutions",
        description: "Online and offline payment processing for your business",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalIntegratedPaymentSolutions open={open} onClose={onClose} /> 
    },
    {
        id: "3",
        icon: <Plane size={18} />,
        title: "Local & Cross-Border Remittance",
        description: "Fast and secure money transfers locally and internationally",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalLocalCrossBorderRemittance open={open} onClose={onClose} />
    },
    {
        id: "4",
        icon: <DollarSign size={18} />,
        title: "Trade Financing",
        description: "Flexible trade financing solutions to support your business growth",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalTradeFinancing open={open} onClose={onClose} />
    },
    {
        id: "5",
        icon: <Shield size={18} />,
        title: "Trade Credit Insurance",
        description: "Protect your business against trade credit risks",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalTradeCardInsurance open={open} onClose={onClose} /> 
    },
    {
        id: "6",
        icon: <Users size={18} />,
        title: "Debt Collection Services",
        description: "Efficient debt recovery solutions for your business",
        providersAvailable: 2,
        targetModal: (open: boolean, onClose: () => void) => <ModalDebtCollectionServices open={open} onClose={onClose} />
    },                
]

export default function PayConnectClient() {
  return (
    <>
      <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">PayConnect</Typography>
      <Typography variant="body2" component="p">Comprehensive financial services and payment solutions for your business</Typography>
      <Spacer height={20} />
      <InlineTag label="Sponsored Partner Offers" className="text-base! text-only" startIcon={<Sparkles className="h-4 w-4 text-amber-500" />} />
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
                        className="mr-3"
                    />
                    <Box>
                        <Typography variant="body1" component="h4">{item.title}</Typography>
                    </Box>
                    </Box>
                    <Typography sx={{ mt: 2 }} variant="body2" component="p">{item.description}</Typography>
                    <Spacer height={20} />
                    <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200! center-layout">
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
