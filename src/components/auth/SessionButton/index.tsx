'use client'

import { useSession } from 'next-auth/react'

import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export const SessionButton = () => {
  const { status } = useSession()

  if (status === 'authenticated') {
    return <LogoutButton />
  } else {
    return <LoginButton />
  }
}
