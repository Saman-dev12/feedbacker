import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { env } from "~/env";
import NextAuth, { DefaultSession, getServerSession, User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

// Ensure these are set in your environment variables
const {
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DATABASE_URL,
} = env;

if (!NEXTAUTH_SECRET || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !DATABASE_URL) {
  throw new Error("Missing required environment variables");
}

// Prisma client
const prisma = new PrismaClient();

// Extended types for session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    password?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

// Auth options configuration
export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  // adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Retrieve user from the database
        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (user && user.password) {
          const isValidPassword = await compare(credentials.password, user.password);
          if (isValidPassword) {
            return {
              id: user.id,
              name: user.name || '', // Ensure name is a string, default to empty string if null
              email: user.email,
              image: user.image,
            } as User; // Cast to User type
          }
        }
        return null;
      },
    }),
  ],
  // debug: process.env.NODE_ENV === "development",

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const existingUser = await prisma.user.findFirst({ where: { email: user.email } });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name ?? '',
              email: user.email,
              image: user.image ?? '',
              provider: account?.provider ?? 'credentials',
              oauth_id: account?.providerAccountId ?? null,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? '';
        token.email = user.email ?? '';
        token.image = user.image ?? '';
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

// Export session retrieval
export const getServerAuthSession = () => getServerSession(authOptions);

export default authOptions;
