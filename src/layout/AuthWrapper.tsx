'use client';

import { Box, Container, Typography, Paper } from "@mui/material";
import { useEffect } from "react";

export default function AuthWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {

  return (
    <Box component="div" className={`auth-layout min-h-screen`}>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}