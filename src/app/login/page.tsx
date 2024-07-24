import { Suspense } from 'react'

import { LoginForm } from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="h-24" />
      </div>
    </main>
  )
}

export default LoginPage
