'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'
import { usePlayers } from '@/usecases/player/reader'

export const RankTable = () => {
  const { data: players } = usePlayers()
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-xs w-20">順位</TableHead>
            <TableHead className="text-start text-xs px-4">
              プレイヤー名
            </TableHead>
            <TableHead className="text-start text-xs px-4">
              最終スコア
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!players ? (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No Records.
              </TableCell>
            </TableRow>
          ) : (
            players
              .sort((a, b) => b.lastScore - a.lastScore)
              .map((player, i) => (
                <TableRow key={player.id}>
                  <TableCell className="text-center">{i + 1}</TableCell>
                  <TableCell className="text-start px-4">
                    {player.name}
                  </TableCell>
                  <TableCell className="text-start px-4">
                    {player.lastScore}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
