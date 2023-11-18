import type { DefaultSession, NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { env } from '@/env.mjs'
import { db } from '@/server/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type Workspace } from '@prisma/client'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      hasDefaultWorkspace: boolean
    }
  }

  interface User {
    hasDefaultWorkspace: boolean
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      // if (!user.hasDefaultWorkspace) {
      //   await db.workspace.create({
      //     data: {
      //       name: 'Default Workspace',
      //       user: {
      //         connect: {
      //           id: user.id,
      //         },
      //       },
      //     },
      //   })
      // }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          hasDefaultWorkspace: true,
        },
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions)
}
