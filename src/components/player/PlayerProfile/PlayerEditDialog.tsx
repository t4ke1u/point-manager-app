'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RxPencil1 } from 'react-icons/rx'
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
  players: Player[]
  player: Player
}

export const PlayerEditDialog = ({ players, player }: Props) => {
  const formSchema = z
    .object({
      name: z.string().min(1, { message: '1文字以上の名前にしてください' }),
    })
    .refine(
      (val) => {
        return (
          players
            .filter((val) => val.id !== player.id)
            .findIndex((player) => player.name === val.name) === -1
        )
      },
      { message: '既に使用されている名前です', path: ['name'] },
    )

  type FormSchemaType = z.infer<typeof formSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: player.name },
  })
  const { updatePlayer } = usePlayerUsecase()
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (value: FormSchemaType) => {
    console.log(value)
    updatePlayer(player.id, value.name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-800">
          <RxPencil1 />
          編集
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>プロフィールを編集</DialogTitle>
              <DialogDescription>
                変更する名前を入力してください
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
              <Button type="submit" className="bg-green-600 hover:bg-green-800">
                更新
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
