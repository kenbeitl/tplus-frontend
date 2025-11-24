'use client';

import { useState } from 'react';
import { Box, Button, Card, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { CircleQuestionMark, CreditCard, FilePenLine, Search, Shield, SquareArrowOutUpRight, User, Users } from 'lucide-react';

// modals
import { ModalDigital, ModalSigning, ModalSubscription } from './modal';
import { Spacer, ButtonWithFormModal } from '@/components';

type CardId = 'digital' | 'signing' | 'subscription' | null;
const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';

export default function HelpCentreClient() {
  const [openCard, setOpenCard] = useState<CardId>(null);
  const handleOpen = (id: CardId) => setOpenCard(id);
  const handleClose = () => setOpenCard(null);

  return (
   <>
    <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">Help Centre</Typography>
    <Spacer height={10} />
    <Typography variant="body2" component="p">Find answers to your questions about T+ services and features</Typography>
    <Spacer height={15} />
    <Box sx={{ width: '100%', maxWidth: 450 }}>
      <TextField
        fullWidth
        placeholder="Search help articles..."
        variant="outlined"
        size="medium"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} style={{ color: '#8a8d91' }} />
              </InputAdornment>
            ),
          }
        }}
        sx={{          
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            backgroundColor: '#F8FAFC',
            height: 34,
            fontSize:14,
          },
        }}
      />
    </Box>
    <Spacer height={20} />
    {/* search bar */}
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }} onClick={() => handleOpen('digital')}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Users size={24} />
            <Typography variant="h6" component="h2">Digital Identity Guide</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Compare and understand digital identity options
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }} onClick={() => handleOpen('signing')}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FilePenLine size={24} />
            <Typography variant="h6" component="h2">Signing Platform Guide</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Compare Tradelink, DocuSign, and Fadada
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }} onClick={() => handleOpen('subscription')}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <CreditCard size={24} />
            <Typography variant="h6" component="h2">Subscription Plans Guide</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Compare all T+ subscription plans and features
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <CircleQuestionMark size={24} />
            <Typography variant="h6" component="h2">Getting Started</Typography>
          </Box>
          <Spacer height={10} />
          <Stack spacing={0} sx={{ mt: 0 }}>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >First steps with T+ services</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Setting up your user profile</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Setting up your company profile</Button>
          </Stack>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <User size={24} />
            <Typography variant="h6" component="h2">Digital Identities</Typography>
          </Box>
          <Spacer height={10} />
          <Stack spacing={0} sx={{ mt: 0 }}>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Digital Identity Overview</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >How to apply for iD-One</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >How to apply for iCorp-One</Button>
          </Stack>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FilePenLine size={24} />
            <Typography variant="h6" component="h2">T+ Services</Typography>
          </Box>
          <Spacer height={10} />
          <Stack spacing={0} sx={{ mt: 0 }}>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >SignConnect Overview</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >PayConnect Overview</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >GovConnect Overview</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >SafeConnect Overview</Button>
          </Stack>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Shield size={24} />
            <Typography variant="h6" component="h2">Legal & Policy Information</Typography>
          </Box>
          <Spacer height={10} />
          <Stack spacing={0} sx={{ mt: 0 }}>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Terms and Conditions</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Disclaimer</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Copyright Notice</Button>
            <Button 
              sx={{ width: 'auto', justifyContent: 'flex-start', gap: 1 }} 
              endIcon={<SquareArrowOutUpRight size={16} style={{ color: '#65686B' }}/>}
              // onClick={applicationModal.handleOpen}
            >Privacy Statement</Button>
          </Stack>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Typography variant="h6" component="h2">Still need help?</Typography>
          </Box >
          <Spacer height={5} />
          <Typography sx={{ mt: 0 }} variant="body2" component="p">
            Can't find what you're looking for? Contact our support team
          </Typography>
          <Spacer height={20} />
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <ButtonWithFormModal
                templateId={CONTACT_SUPPORT_TEMPLATE_ID} 
                buttonText="Contact Support"
                buttonProps={{
                  sx:{ width: 'auto' }
                }}                
            />
            <Button 
              sx={{ 
                width: 'auto',
                color: '#000000',
                borderColor: '#C4C4C4',
                borderWidth: '1px',
                borderStyle: 'solid',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >Schedule a Call</Button>
          </Box>
        </Card>
      </Grid>
    </Grid>

    <ModalDigital open={openCard === 'digital'} onClose={handleClose} />
    <ModalSigning open={openCard === 'signing'} onClose={handleClose} />
    <ModalSubscription open={openCard === 'subscription'} onClose={handleClose} />
   </>
  );
}
