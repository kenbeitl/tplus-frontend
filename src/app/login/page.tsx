import React from 'react';
import {
  Card,
  Container,
  Typography,
} from '@mui/material';
import FluidLogo from '../../components/FluidLogo';

export default function Home() {


  return (
    <div>
      <Container 
        maxWidth="md"
        className="flex items-center justify-center min-h-screen">
        <Card variant="outlined" className="w-100 p-6 text-center">
          <FluidLogo width={100} className="flex justify-center mb-6" />
          <Typography sx={{ mb: 3 }} variant="subtitle1" component="p" color="text.secondary">Sign in to access your business services</Typography>
          
        </Card>
      </Container>
    </div>
  );
}
