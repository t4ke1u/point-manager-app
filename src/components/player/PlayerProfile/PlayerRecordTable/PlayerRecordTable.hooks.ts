import { useState, useEffect } from 'react'

import { isEqual, compareDesc } from 'date-fns'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

export type RecordTableRow = ScoreRecord & {
  playerName: string
}

export type Sort = 'asc' | 'desc'

export const usePlayerRecordTable = (
  scoreRecords: ScoreRecord[],
  player: Player,
) => {
  const [dateSort, setDateSort] = useState<Sort>('desc')
  const [tableData, setTableData] = useState<RecordTableRow[]>([])

  useEffect(() => {
    if (dateSort === 'desc') {
      setTableData(
        scoreRecords
          .filter((scoreRecord) => player.id === scoreRecord.playerId)
          .map((scoreRecord) => ({
            ...scoreRecord,
            playerName: player.name,
          }))
          .sort((a, b) =>
            isEqual(a.date, b.date)
              ? b.diff - a.diff
              : compareDesc(a.date, b.date),
          ),
      )
    } else {
      setTableData(
        scoreRecords
          .filter((scoreRecord) => player.id === scoreRecord.playerId)
          .map((scoreRecord) => ({
            ...scoreRecord,
            playerName: player.name,
          }))
          .sort((a, b) =>
            isEqual(a.date, b.date)
              ? b.diff - a.diff
              : compareDesc(b.date, a.date),
          ),
      )
    }
  }, [dateSort, scoreRecords, player])

  const toggleDateSort = () =>
    setDateSort((dateSort) => (dateSort === 'asc' ? 'desc' : 'asc'))

  return {
    dateSort,
    toggleDateSort,
    tableData,
    setTableData,
  }
}
