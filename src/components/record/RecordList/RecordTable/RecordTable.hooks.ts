import { useState, useEffect } from 'react'

import { isEqual, compareDesc } from 'date-fns'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

export type RecordTableRow = ScoreRecord & {
  playerName: string
}

export type Sort = 'asc' | 'desc'

export const useRecordTable = (
  scoreRecords: ScoreRecord[],
  players: Player[],
) => {
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
  }, [filterName, dateSort, scoreRecords, players])

  const toggleDateSort = () =>
    setDateSort((dateSort) => (dateSort === 'asc' ? 'desc' : 'asc'))

  return {
    filterName,
    setFilterName,
    dateSort,
    toggleDateSort,
    tableData,
    setTableData,
  }
}
