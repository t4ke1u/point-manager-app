'use client'

import { useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format, compareDesc } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

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

type RecordTableColumn = ScoreRecord & {
  playerName: string
}

export const RecordTable = ({ scoreRecords, players }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const data = scoreRecords
    .filter((scoreRecord) =>
      players.find((player) => player.id === scoreRecord.playerId),
    )
    .map((scoreRecord) => ({
      ...scoreRecord,
      playerName: players.filter(
        (player) => player.id === scoreRecord.playerId,
      )[0].name,
    }))
    .sort((a, b) => compareDesc(a.date, b.date))

  const columns: ColumnDef<RecordTableColumn>[] = [
    {
      accessorKey: 'playerName',
      header: '名前',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('playerName')}</div>
      ),
    },
    {
      accessorKey: 'diff',
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              className="text-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc', true)
              }
            >
              差分
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('diff')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              console.log('click')
              column.toggleSorting(column.getIsSorted() === 'asc', true)
            }}
          >
            日付
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {format(row.getValue('date'), 'yyyy/MM/dd', { locale: ja })}
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          //   value={
          //     (table.getColumn('playerName')?.getFilterValue() as string) ?? ''
          //   }
          //   onChange={(event) =>
          //     table.getColumn('playerName')?.setFilterValue(event.target.value)
          //   }
          className="max-w-[240px]"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
