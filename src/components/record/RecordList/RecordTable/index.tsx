'use client'

import { useEffect, useState } from 'react'

import { format, compareDesc, isEqual } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
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
  players: Player[]
}

type RecordTableRow = ScoreRecord & {
  playerName: string
}

type Sort = 'asc' | 'desc'

export const RecordTable = ({ scoreRecords, players }: Props) => {
  const [filterName, setFilterName] = useState<string>('')
  const [dateSort, setDateSort] = useState<Sort>('desc')
  const [tableData, setTableData] = useState<RecordTableRow[]>([])

  useEffect(() => {
    if (dateSort === 'desc') {
      setTableData(
        scoreRecords
          .filter((scoreRecord) =>
            players.find((player) => player.id === scoreRecord.playerId),
          )
          .map((scoreRecord) => ({
            ...scoreRecord,
            playerName: players.filter(
              (player) => player.id === scoreRecord.playerId,
            )[0].name,
          }))
          .filter((row) => row.playerName.includes(filterName))
          .sort((a, b) =>
            isEqual(a.date, b.date)
              ? b.diff - a.diff
              : compareDesc(a.date, b.date),
          ),
      )
    } else {
      setTableData(
        scoreRecords
          .filter((scoreRecord) =>
            players.find((player) => player.id === scoreRecord.playerId),
          )
          .map((scoreRecord) => ({
            ...scoreRecord,
            playerName: players.filter(
              (player) => player.id === scoreRecord.playerId,
            )[0].name,
          }))
          .filter((row) => row.playerName.includes(filterName))
          .sort((a, b) =>
            isEqual(a.date, b.date)
              ? b.diff - a.diff
              : compareDesc(b.date, a.date),
          ),
      )
    }
  }, [filterName, dateSort])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-[240px]"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>記録</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setDateSort((dateSort) =>
                      dateSort === 'asc' ? 'desc' : 'asc',
                    )
                  }
                >
                  日付
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length ? (
              tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.playerName}</TableCell>
                  <TableCell>{row.diff}</TableCell>
                  <TableCell>
                    {format(row.date, 'yyyy/MM/dd', { locale: ja })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
