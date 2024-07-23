'use client'

import { LineChart } from './LineChart'

import { usePlayers } from '@/usecases/player/reader'
import { useScoreRecords } from '@/usecases/scoreRecord/reader'

export const ScoreChart = () => {
  const { data: scoreRecords } = useScoreRecords()
  const { data: players } = usePlayers()

  if (!scoreRecords || !players) {
    return null
  }

  return <LineChart players={players} scoreRecords={scoreRecords} />
}
