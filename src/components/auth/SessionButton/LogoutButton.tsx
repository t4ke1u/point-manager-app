'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/shadcn/ui/button'

export const LogoutButton = () => {
  return (
    <Button
      className="bg-yellow-600 hover:bg-yellow-800"
      onClick={() => signOut()}
    >
      ログアウト
    </Button>
  )
}
