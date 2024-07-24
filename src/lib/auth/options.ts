import CredentialsProvider from 'next-auth/providers/credentials'

import type { NextAuthOptions } from 'next-auth'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'user',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const users = [{ id: '1', username: 'togawalab', password: 'SysOnC' }]

        const user = users.find(
          (user) => user.username === credentials?.username,
        )

        if (user && user?.password === credentials?.password) {
          return {
            id: user.id,
            username: user.username,
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}
