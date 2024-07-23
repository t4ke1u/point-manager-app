'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import { PlayerDeleteDialog } from './PlayerDeleteDialog'
import { PlayerEditDialog } from './PlayerEditDialog'

import { Label } from '@/components/shadcn/ui/label'
import { usePlayer, usePlayers } from '@/usecases/player/reader'

type Props = {
  id: string
}

export const PlayerProfile = ({ id }: Props) => {
  const { data: players } = usePlayers()
  const { data: player } = usePlayer(id)

  if (!players || !player) {
    return null
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">プロフィール</h1>
      <div className="mt-2 px-2 flex justify-end gap-2">
        <PlayerEditDialog players={players} player={player} />
        <PlayerDeleteDialog player={player} />
      </div>
      <div className="mt-6 px-4">
        <div className="p-4 flex gap-6 items-center justify-start border-y border-solid border-gray-300">
          <Label className="w-24 text-gray-600">名前</Label>
          <p className="flex-1 font-bold">{player.name}</p>
        </div>
        <div className="p-4 flex gap-6 items-center justify-start border-b border-solid border-gray-300">
          <Label className="w-24 text-gray-600">最終スコア</Label>
          <p className="flex-1 font-bold">{player.lastScore}</p>
        </div>
        <div className="p-4 flex gap-6 items-center justify-start border-b border-solid border-gray-300">
          <Label className="w-24 text-gray-600">作成日時</Label>
          <p className="flex-1 font-bold">
            {format(player.createdAt, 'yyyy/MM/dd HH:mm:ss', { locale: ja })}
          </p>
        </div>
      </div>
    </section>
  )
}
