// app/api/auth/[...nextauth]/auth.ts
import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const response = await fetch(
            `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: process.env.KEYCLOAK_CLIENT_ID!,
                    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
                    grant_type: "refresh_token",
                    refresh_token: token.refreshToken as string,
                }),
                cache: "no-store",
            }
        );

        const refreshedTokens = await response.json();

        if (!response.ok) {
            console.error("Failed to refresh token:", refreshedTokens);
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            idToken: refreshedTokens.id_token,
            expiresAt: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial sign in
            if (account && user) {
                console.log("Initial sign in, storing tokens");
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    idToken: account.id_token,
                    expiresAt: account.expires_at, // This is in seconds
                    user,
                };
            }

            // Return previous token if the access token has not expired yet
            // Check if token expires in more than 60 seconds
            const shouldRefresh = token.expiresAt && Date.now() > ((token.expiresAt as number) * 1000 - 60 * 1000);

            if (!shouldRefresh) {
                console.log("Token still valid, no refresh needed");
                return token;
            }

            // Access token has expired, try to refresh it
            console.log("Token expired or expiring soon, refreshing...");
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user as any;
                session.accessToken = token.accessToken as string;
                session.error = token.error as string | undefined;
            }
            return session;
        },
    },
    events: {
        async signOut({ token }) {
            // Revoke the session on Keycloak
            if (token.idToken) {
                try {
                    const params = new URLSearchParams({
                        id_token_hint: token.idToken as string,
                        post_logout_redirect_uri: process.env.NEXTAUTH_URL || "http://localhost:3000",
                    });

                    await fetch(
                        `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`,
                        { method: "GET" }
                    );
                } catch (error) {
                    console.error("Error during Keycloak logout:", error);
                }
            }
        },
    },
    debug: process.env.NODE_ENV === "development", // Enable debug logging in development
};


// Create the handler
const handler = NextAuth(authOptions);

// Export for route handlers
export { handler as GET, handler as POST };

// Export auth helpers (these might not be available in v4)
export { handler };