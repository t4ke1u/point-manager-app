'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export const SessionButton = () => {
  const pathname = usePathname()
  const { status } = useSession()

  if (pathname === '/login') {
    return null
  }

  if (status === 'authenticated') {
    return <LogoutButton />
  }

  return <LoginButton />
}
