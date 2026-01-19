import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig } from "axios";

interface ExtendedSession {
  accessToken?: string;
  user?: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}

interface KeycloakApiConfig {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  validateBody?: (body: any) => { valid: boolean; error?: string };
  transformBody?: (body: any) => any;
}

const BACKEND_URL = process.env.KEYCLOAK_API_URL || 'https://portal.tplus.ai/backend-api-service';

/**
 * Generic handler for Keycloak API requests
 * Handles session validation, API proxying, and error handling
 */
export function createKeycloakApiHandler(config: KeycloakApiConfig) {
  return async (request: NextRequest) => {
    try {
      // Validate session
      const session = await getServerSession(authOptions) as ExtendedSession | null;
      
      if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Parse request body for non-GET requests
      let body = null;
      if (config.method !== 'GET') {
        try {
          body = await request.json();
        } catch {
          // No body or invalid JSON
          body = {};
        }

        // Validate body if validator is provided
        if (config.validateBody) {
          const validation = config.validateBody(body);
          if (!validation.valid) {
            return NextResponse.json(
              { error: validation.error || "Invalid request body" },
              { status: 400 }
            );
          }
        }

        // Transform body if transformer is provided
        if (config.transformBody) {
          body = config.transformBody(body);
        }
      }

      // Prepare axios config
      const axiosConfig: AxiosRequestConfig = {
        method: config.method,
        url: `${BACKEND_URL}${config.endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        timeout: 10000,
      };

      // Add body for non-GET requests
      if (config.method !== 'GET' && body !== null) {
        axiosConfig.data = body;
      }

      // Make API call
      const response = await axios(axiosConfig);

      return NextResponse.json(response.data);
    } catch (error: any) {
      console.error(`Keycloak API error [${config.method} ${config.endpoint}]:`, error);
      
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message || 'API request failed';
      
      return NextResponse.json(
        { error: message },
        { status }
      );
    }
  };
}
