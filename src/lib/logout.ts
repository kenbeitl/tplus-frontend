'use client';

import { signOut } from 'next-auth/react';
import { useSession } from '@/hooks/useSession';

export function useLogout() {
  const { data: session } = useSession();

  const logout = async () => {
    // Get id_token from session
    const idToken = (session as any)?.idToken;
    
    // Sign out from NextAuth
    await signOut({ redirect: false });

    // Construct Keycloak logout URL with post-logout redirect and id_token_hint
    const keycloakIssuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
    const postLogoutRedirectUri = encodeURIComponent(window.location.origin + '/login');
    
    let logoutUrl = `${keycloakIssuer}/protocol/openid-connect/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
    
    if (idToken) {
      logoutUrl += `&id_token_hint=${idToken}`;
    }

    // Redirect to Keycloak logout
    window.location.href = logoutUrl;
  };

  return logout;
}
