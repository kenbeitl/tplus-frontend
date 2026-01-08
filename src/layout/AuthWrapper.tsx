'use client';

import { Box, Container, Typography, Paper } from "@mui/material";
import { useEffect } from "react";

export default function AuthWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Debug: Log Keycloak configuration
    console.group('🔐 Keycloak Configuration Debug');
    
    console.log('Environment Variables:', {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'NOT SET',
      KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER || 'NOT SET',
      NEXT_PUBLIC_KEYCLOAK_ISSUER: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || 'NOT SET',
    });

    const keycloakIssuer = process.env.KEYCLOAK_ISSUER || process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
    const nextAuthUrl = process.env.NEXTAUTH_URL || window.location.origin;
    
    console.log('Computed Values:', {
      'Keycloak Issuer': keycloakIssuer,
      'NextAuth Base URL': nextAuthUrl,
      'Expected Callback URI': `${nextAuthUrl}/api/auth/callback/keycloak`,
      'Current Origin': window.location.origin,
      'Current URL': window.location.href,
    });

    console.log('Required Keycloak Client Settings:', {
      'Client ID': process.env.KEYCLOAK_CLIENT_ID || 'nextjs-client',
      'Root URL': window.location.origin,
      'Home URL': window.location.origin,
      'Valid Redirect URIs': [
        `${window.location.origin}/api/auth/callback/keycloak`,
        `${window.location.origin}/*`
      ],
      'Valid Post Logout Redirect URIs': [
        `${window.location.origin}/*`
      ],
      'Web Origins': [
        window.location.origin
      ],
    });

    console.groupEnd();
  }, []);

  return (
    <Box component="div" className={`auth-layout min-h-screen`}>
      <Container maxWidth="lg">
        {/* Debug Info Panel */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 2, 
            mt: 2, 
            backgroundColor: '#f5f5f5',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}
        >
          <Typography variant="h6" gutterBottom>
            🔐 Keycloak Debug Information
          </Typography>
          
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
            Environment Variables (Client-side view):
          </Typography>
          <Box component="pre" sx={{ m: 0, fontSize: '11px' }}>
            NEXTAUTH_URL: {process.env.NEXTAUTH_URL || '🔒 Hidden (Server-only)'}{'\n'}
            KEYCLOAK_CLIENT_ID: {process.env.KEYCLOAK_CLIENT_ID || '🔒 Hidden (Server-only)'}{'\n'}
            KEYCLOAK_ISSUER: {process.env.KEYCLOAK_ISSUER || '🔒 Hidden (Server-only)'}{'\n'}
            NEXT_PUBLIC_KEYCLOAK_ISSUER: {process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || 'NOT SET'}
          </Box>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
            ℹ️ Server-only variables are hidden for security. If OAuth works, they are set correctly on the server.
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
            Expected Callback URI:
          </Typography>
          <Box component="pre" sx={{ m: 0, fontSize: '11px', color: 'primary.main' }}>
            {typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback/keycloak` : 'Loading...'}
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
            Required Keycloak Settings:
          </Typography>
          <Box component="pre" sx={{ m: 0, fontSize: '11px' }}>
            {typeof window !== 'undefined' ? `Root URL: ${window.location.origin}
Home URL: ${window.location.origin}
Valid Redirect URIs:
  - ${window.location.origin}/api/auth/callback/keycloak
  - ${window.location.origin}/*
Web Origins:
  - ${window.location.origin}` : 'Loading...'}
          </Box>
        </Paper>

        {children}
      </Container>
    </Box>
  );
}