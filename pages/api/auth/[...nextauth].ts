import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: { label: 'password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Akun yang anda masukan tidak valids')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Akun tidak ada atau password salah!')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Password yang anda masukan salah!")
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions)