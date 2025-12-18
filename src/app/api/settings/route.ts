import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  accessToken?: string;
}

// Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession;
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, email } = await request.json();

    // Update user info in Keycloak
    const userId = (session.user as any).sub;
    const response = await fetch(
      `${process.env.KEYCLOAK_ISSUER}/admin/realms/tplus-realm/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile update failed:", errorText);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete user account
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as ExtendedSession;
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).sub;
    const response = await fetch(
      `${process.env.KEYCLOAK_ISSUER}/admin/realms/tplus-realm/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Account deletion failed:", errorText);
      return NextResponse.json(
        { error: "Failed to delete account" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
