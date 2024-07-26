'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'

import { PlayerRecordDeleteDialog } from './PlayerRecordDeleteDialog'
import { PlayerRecordEditDialog } from './PlayerRecordEditDialog'
import { usePlayerRecordTable } from './PlayerRecordTable.hooks'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

import { AuthManagementComponent } from '@/components/auth/AuthMangementComponent'
import { Button } from '@/components/shadcn/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'

type Props = {
  scoreRecords: ScoreRecord[]
  player: Player
}

export const PlayerRecordTable = ({ scoreRecords, player }: Props) => {
  const { toggleDateSort, tableData } = usePlayerRecordTable(
    scoreRecords,
    player,
  )

  return (
    <div className="w-full">
      <h2 className="mx-1 my-2 text-lg font-bold">スコア記録</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">名前</TableHead>
              <TableHead className="text-center text-xs px-2">記録</TableHead>
              <TableHead className="text-center px-2">
                <Button
                  variant="ghost"
                  onClick={toggleDateSort}
                  className="text-xs"
                >
                  日付
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length ? (
              tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.playerName}</TableCell>
                  <TableCell className="text-center">{row.diff}</TableCell>
                  <TableCell className="text-xs text-center">
                    {format(row.date, 'yyyy/MM/dd', { locale: ja })}
                  </TableCell>
                  <TableCell className="inline-flex gap-2 px-1 w-32 justify-center">
                    <AuthManagementComponent>
                      <PlayerRecordEditDialog
                        player={player}
                        scoreRecord={row}
                      />
                      <PlayerRecordDeleteDialog
                        player={player}
                        scoreRecord={row}
                      />
                    </AuthManagementComponent>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No Records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
