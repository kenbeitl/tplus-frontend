import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

interface ExtendedSession {
  accessToken?: string;
  user?: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    
    console.log("Session:", session);
    console.log("Access Token:", session?.accessToken ? "Present" : "Missing");
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Verify current password
    const verifyResponse = await fetch(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID!,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
          grant_type: "password",
          username: (session.user as any).preferred_username || session.user?.email!,
          password: currentPassword,
          scope: "openid profile email",
        }),
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Get admin access token using client credentials
    const adminTokenResponse = await fetch(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID!,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
          grant_type: "client_credentials",
        }),
      }
    );

    if (!adminTokenResponse.ok) {
      console.error("Failed to get admin token");
      return NextResponse.json(
        { error: "Failed to authenticate with admin API" },
        { status: 500 }
      );
    }

    const { access_token: adminToken } = await adminTokenResponse.json();

    // Get user ID from the user's access token
    const userId = (session as any).user?.sub || 
                   JSON.parse(Buffer.from(session.accessToken!.split('.')[1], 'base64').toString()).sub;

    // Update password using Keycloak Admin REST API with admin token
    const keycloakBaseUrl = process.env.KEYCLOAK_ISSUER!.replace('/realms/tplus-realm', '');
    const adminApiUrl = `${keycloakBaseUrl}/admin/realms/tplus-realm/users/${userId}/reset-password`;
    
    console.log("Account API URL:", adminApiUrl);
    
    const updateResponse = await fetch(adminApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        type: "password",
        value: newPassword,
        temporary: false,
      }),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error("Password update failed:", errorText);
      console.error("Status:", updateResponse.status);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: updateResponse.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
