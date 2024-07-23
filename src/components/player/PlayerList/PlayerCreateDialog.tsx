'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RxPlus } from 'react-icons/rx'
import { z } from 'zod'

import type { Player } from '@/models/player/type'

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

type Props = {
  players: Player[]
}

export const PlayerCreateDialog = ({ players }: Props) => {
  const formSchema = z
    .object({
      name: z.string().min(1, { message: '1文字以上の名前にしてください' }),
    })
    .refine(
      (val) => {
        return players.findIndex((player) => player.name === val.name) === -1
      },
      { message: '既に使用されている名前です', path: ['name'] },
    )

  type FormSchemaType = z.infer<typeof formSchema>
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })
  const { createPlayer } = usePlayerUsecase()
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (value: FormSchemaType) => {
    console.log(value)
    createPlayer(value.name)
    form.reset()
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
