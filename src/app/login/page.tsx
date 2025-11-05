
import {
  Card,
  Container,
  Typography,
} from '@mui/material';
import Logo from '@/assets/svg/Logo';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | TPlus",
  description: "Secure login portal for TPlus application",
}

export default function Login() {


  return (
    <div>
      <Container 
        maxWidth="md"
        className="flex items-center justify-center min-h-screen">
        <Card variant="outlined" className="w-100 p-6 text-center">
          <div className="flex justify-center mb-6">
            <Logo open={true} />
          </div>
          <Typography sx={{ mb: 3 }} variant="subtitle1" component="p" color="text.secondary">Sign in to access your business services</Typography>
          
        </Card>
      </Container>
    </div>
  );
}
