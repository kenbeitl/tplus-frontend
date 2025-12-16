import { Box, Container } from "@mui/material";

export default function AuthWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Box component="div" className="auth-layout min-h-screen flex items-center justify-center bg-gray-50">
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}