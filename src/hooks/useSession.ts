import { useSession as useNextAuthSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';
import type { Session } from 'next-auth';

export interface TokenPayload {
  [key: string]: any;
  // Keycloak token fields
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  display_name?: string;
  user_role?: string;
  cust_user_role?: string;
  companyName?: string;
  company?: any[];
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
  exp?: number;
  iat?: number;
  auth_time?: number;
}

export interface ExtendedSession extends Session {
  tokenPayload: TokenPayload | null;
}

export function useSession() {
  const { data: session, status, update } = useNextAuthSession();

  const tokenPayload = useMemo(() => {
    if (!session?.accessToken) {
      return null;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(session.accessToken);
      console.log('Decoded Token Payload:', decoded);
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }, [session, session?.accessToken]);

  return {
    data: session,
    status,
    update,
    tokenPayload,
  };
}
