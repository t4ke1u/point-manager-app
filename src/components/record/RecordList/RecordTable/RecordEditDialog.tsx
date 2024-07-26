'use client'

import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { RxPencil1 } from 'react-icons/rx'
import { z } from 'zod'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

import { Button } from '@/components/shadcn/ui/button'
import { Calendar } from '@/components/shadcn/ui/calendar'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { cn } from '@/lib/utils'
import { useScoreRecordUsecase } from '@/usecases/scoreRecord/usecase'

type Props = {
  players: Player[]
  scoreRecord: ScoreRecord
}

export const RecordEditDialog = ({ players, scoreRecord }: Props) => {
  const formSchema = z.object({
    playerId: z.string().min(1),
    diff: z.coerce.number(),
    date: z.date(),
  })

  type FormSchemaType = z.infer<typeof formSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerId: scoreRecord.playerId,
      diff: scoreRecord.diff,
      date: scoreRecord.date,
    },
  })

  const { updateScoreRecord } = useScoreRecordUsecase()
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async (value: FormSchemaType) => {
    console.log(
      format(value.date, 'yyyyMMdd', {
        locale: ja,
      }),
    )
    updateScoreRecord(
      {
        dateKey: format(scoreRecord.date, 'yyyyMMdd', {
          locale: ja,
        }),
        id: scoreRecord.id,
      },
      {
        playerId: value.playerId,
        diff: value.diff,
        date: format(value.date, 'yyyyMMdd', {
          locale: ja,
        }),
      },
    )
    setOpen(false)
  }

  useEffect(
    () =>
      form.reset({
        playerId: scoreRecord.playerId,
        diff: scoreRecord.diff,
        date: scoreRecord.date,
      }),
    [scoreRecord, form],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-1 px-3 bg-teal-600 hover:bg-teal-800">
          <RxPencil1 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>記録を編集</DialogTitle>
              <DialogDescription>情報を入力してください</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="playerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>プレイヤー</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="プレイヤー名" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {players.map((player) => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>スコア</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>日付</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'yyyy/MM/dd', {
                                locale: ja,
                              })
                            ) : (
                              <span>日付を選択</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white rounded-md shadow-md"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-800">
                更新
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
