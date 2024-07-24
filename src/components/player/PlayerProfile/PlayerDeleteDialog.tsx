'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RxTrash } from 'react-icons/rx'
import { z } from 'zod'

import type { Player } from '@/models/player/type'

import { Button } from '@/components/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  player: Player
}

export const PlayerDeleteDialog = ({ player }: Props) => {
  const formSchema = z.object({
    name: z
      .string()
      .refine((data) => data === player.name, { message: '名前が異なります' }),
  })

  type FormSchemaType = z.infer<typeof formSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })
  const { deletePlayer } = usePlayerUsecase()
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const onSubmit = async (value: FormSchemaType) => {
    console.log(value)
    deletePlayer(player.id)
    setOpen(false)
    router.back()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-700">
          <RxTrash />
          削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>プレイヤーを削除</DialogTitle>
              <DialogDescription>
                削除するプレイヤーの名前を入力してください．
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名前</FormLabel>
                    <FormControl>
                      <Input placeholder={player.name} {...field} />
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
              <Button type="submit" className="bg-red-500 hover:bg-red-700">
                削除
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
