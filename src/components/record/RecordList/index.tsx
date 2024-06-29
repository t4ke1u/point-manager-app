'use client'

import { RecordTable } from './RecordTable'

import { usePlayers } from '@/usecases/player/reader'
import { useScoreRecords } from '@/usecases/scoreRecord/reader'

export const RecordList = () => {
  const { data: scoreRecords } = useScoreRecords()
  const { data: players } = usePlayers()

  if (!scoreRecords || !players) {
    return null
  }

  return <RecordTable scoreRecords={scoreRecords} players={players} />
}
