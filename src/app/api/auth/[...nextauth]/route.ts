import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Get token from Keycloak using Resource Owner Password Credentials flow
          const tokenResponse = await fetch(
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
                username: credentials.username,
                password: credentials.password,
                scope: "openid profile email",
              }),
            }
          );

          if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Keycloak auth failed");
            console.error("Status:", tokenResponse.status, tokenResponse.statusText);
            console.error("URL:", `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`);
            console.error("Response:", errorText);
            return null;
          }

          const tokens = await tokenResponse.json();

          // Get user info
          const userResponse = await fetch(
            `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            }
          );

          const user = await userResponse.json();

          return {
            id: user.sub,
            name: user.name || user.preferred_username,
            email: user.email,
            accessToken: tokens.access_token,
            idToken: tokens.id_token,
            refreshToken: tokens.refresh_token,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Handle credentials provider
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.idToken = (user as any).idToken;
        token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).idToken = token.idToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After login, redirect to dashboard
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl + "/dashboard";
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };