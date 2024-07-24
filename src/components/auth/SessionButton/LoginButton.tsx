'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/shadcn/ui/button'

export const LoginButton = () => {
  return (
    <Button
      className="bg-purple-600 hover:bg-purple-800"
      onClick={() => signIn()}
    >
      ログイン
    </Button>
  )
}
