'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/shadcn/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormSchemaType) => {
    signIn('credentials', {
      callbackUrl: searchParams.get('callbackUrl') ?? '/',
      username: data.username,
      password: data.password,
    }).catch(() => {
      form.setError('root', { message: 'ユーザ名とパスワードが異なります' })
    })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          管理者ログイン
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ユーザ名</FormLabel>
                  <FormControl>
                    <Input aria-label="Username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" aria-label="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ログイン
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
