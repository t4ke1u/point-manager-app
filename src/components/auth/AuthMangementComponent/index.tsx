'use client'

import type { ReactNode } from 'react'

import { useSession } from 'next-auth/react'

type Props = {
  children: ReactNode
}

export const AuthManagementComponent = ({ children }: Props) => {
  const { status } = useSession()
  if (status === 'authenticated') {
    return children
  } else {
    return <div />
  }
}
