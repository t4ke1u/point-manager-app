'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RxPlus } from 'react-icons/rx'
import { z } from 'zod'

import { Button } from '@/components/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import { usePlayerUsecase } from '@/usecases/player/usecase'

const formSchema = z.object({
  name: z.string().min(1, { message: '1文字以上の名前にしてください' }),
})

type FormSchemaType = z.infer<typeof formSchema>

export const PlayerCreateDialog = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })
  const { createPlayer } = usePlayerUsecase()
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (value: FormSchemaType) => {
    console.log(value)
    createPlayer(value.name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-1">
          <RxPlus />
          新規作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>プロフィール作成</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名前</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors['name']
                        ? form.formState.errors['name'].message
                        : undefined}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">作成</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
