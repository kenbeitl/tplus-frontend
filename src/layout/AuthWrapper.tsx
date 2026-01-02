import { Box, Container } from "@mui/material";
import theme from "@/theme/theme";

export default function AuthWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Box component="div" className={`auth-layout min-h-screen flex items-center justify-center ${theme.palette.gradientClasses.blueIndigoAuth}`}>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}