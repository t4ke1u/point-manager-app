'use client'

import { useState } from 'react'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { RxTrash } from 'react-icons/rx'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

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
import { useScoreRecordUsecase } from '@/usecases/scoreRecord/usecase'

type Props = {
  player: Player
  scoreRecord: ScoreRecord
}

export const PlayerRecordDeleteDialog = ({ player, scoreRecord }: Props) => {
  const { deleteScoreRecord } = useScoreRecordUsecase()
  const [open, setOpen] = useState<boolean>(false)

  const onClick = () => {
    deleteScoreRecord({
      dateKey: format(scoreRecord.date, 'yyyyMMdd', {
        locale: ja,
      }),
      id: scoreRecord.id,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-1 px-3 bg-red-500 hover:bg-red-700">
          <RxTrash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>記録を削除</DialogTitle>
          <DialogDescription>以下の記録を削除しますか？</DialogDescription>
        </DialogHeader>
        <section className="px-5">
          <div className="flex items-center gap-5">
            <p className="text-sm font-bold text-gray-500 w-24">プレイヤー名</p>
            <p>{player.name}</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-sm font-bold text-gray-500 w-24">スコア</p>
            <p>{scoreRecord.diff.toString()}</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-sm font-bold text-gray-500 w-24">日付</p>
            <p>{format(scoreRecord.date, 'yyyy/MM/dd', { locale: ja })}</p>
          </div>
        </section>
        <DialogFooter>
          <Button onClick={onClick} className="bg-red-500 hover:bg-red-700">
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
