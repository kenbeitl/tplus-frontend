import { useSession as useNextAuthSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';
import type { Session } from 'next-auth';

export interface TokenPayload {
  [key: string]: any;
  // JWT standard fields
  sub?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  jti?: string;
  iss?: string;
  aud?: string;
  typ?: string;
  azp?: string;
  sid?: string;
  acr?: string;
  scope?: string;
  // User profile fields
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  companyName?: string;
  company?: any[];
  // Access control
  "allowed-origins"?: string[];
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
  // Custom attributes
  customUserAttributes?: {
    companyName?: string;
    userRole?: string;
  };
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
      console.log(session);
      // console.log(decoded);
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
