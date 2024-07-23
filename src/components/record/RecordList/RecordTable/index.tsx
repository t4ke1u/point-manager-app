'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'

import { RecordCreateDialog } from './RecordCreateDialog'
import { RecordDeleteDialog } from './RecordDeleteDialog'
import { RecordEditDialog } from './RecordEditDialog'
import { useRecordTable } from './RecordTable.hooks'

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

export const RecordTable = ({ scoreRecords, players }: Props) => {
  const { filterName, setFilterName, toggleDateSort, tableData } =
    useRecordTable(scoreRecords, players)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter names..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-[240px]"
        />
        <RecordCreateDialog players={players} />
      </div>
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
              <TableHead />
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
                  <TableCell className="inline-flex gap-2 px-1">
                    <RecordEditDialog players={players} scoreRecord={row} />
                    <RecordDeleteDialog players={players} scoreRecord={row} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
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
