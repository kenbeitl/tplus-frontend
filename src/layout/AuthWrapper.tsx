import { Box } from "@mui/material";

export default function AuthWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Box component="div" className="auth-layout min-h-screen flex items-center justify-center bg-gray-50">
      <Box component="div" className="w-full max-w-md">
        {children}
      </Box>
    </Box>
  );
}