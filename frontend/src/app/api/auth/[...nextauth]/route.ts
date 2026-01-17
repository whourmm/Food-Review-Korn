import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshed = await res.json();

    if (!res.ok) {
      throw refreshed;
    }

    return {
      ...token,
      accessToken: refreshed.access_token,
      expiresAt: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("❌ Failed to refresh access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


export const authOptions = {
  providers: [
   GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorization: {
    params: {
      scope:
        "openid email profile https://www.googleapis.com/auth/calendar.readonly",
      access_type: "offline",
      prompt: "consent",
    },
  },
})


  ],

  callbacks: {
  async jwt({ token, account, profile } : {token : any, account : any, profile?: any}) {
    // 1️⃣ Initial Google login
    if (account?.provider === "google") {
    token.accessToken = account.access_token;
    token.refreshToken = account.refresh_token;
    token.expiresAt = account.expires_at * 1000;

    // 🔴 THIS WAS MISSING
    token.email = profile?.email;
    token.name = profile?.name;
    token.picture = profile?.picture;

    return token;
  }

    // 2️⃣ Token still valid → reuse
    if (Date.now() < token.expiresAt) {
      return token;
    }

    // 3️⃣ Token expired → refresh
    console.log("🔄 Access token expired, refreshing...");
    return await refreshAccessToken(token);
  },

  async session({ session, token } : {session : any, token: any}) {
    session.user = {
    email: token.email,
    name: token.name,
    image: token.picture,
  };
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    session.expiresAt = token.expiresAt;
    return session;
  },
}
  }


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
