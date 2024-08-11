import { useState, useEffect } from 'react'

import { isEqual, compareDesc, compareAsc, format } from 'date-fns'
import { ja } from 'date-fns/locale'

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
  const [invalidRecordDates, setInvalidRecordDates] = useState<string[]>([])

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
    const dates: string[] = []
    const invalidRecordDates: string[] = []
    scoreRecords
      .sort((a, b) => compareAsc(a.date, b.date))
      .forEach((record) => {
        if (
          !dates.includes(
            format(record.date, 'yyyy/MM/dd', {
              locale: ja,
            }),
          )
        ) {
          dates.push(
            format(record.date, 'yyyy/MM/dd', {
              locale: ja,
            }),
          )
        }
      })
    dates.forEach((date) => {
      if (
        scoreRecords
          .filter(
            (record) =>
              date ===
              format(record.date, 'yyyy/MM/dd', {
                locale: ja,
              }),
          )
          .reduce((sum, record) => sum + record.diff, 0) !== 0
      ) {
        invalidRecordDates.push(date)
      }
    })
    console.log(invalidRecordDates)
    setInvalidRecordDates(invalidRecordDates)
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
    invalidRecordDates,
  }
}
