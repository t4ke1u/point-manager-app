import { useMemo } from 'react'

import { convertScoreRecordFromData, type ScoreRecordData } from './converter'

import type { ScoreRecord } from '@/models/scoreRecord/type'

export const createScoreRecordRepository = () => ({
  async list(): Promise<ScoreRecord[]> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/record`,
    ).then((r) => r.json())) as ScoreRecordData[]

    return data.map(convertScoreRecordFromData)
  },
})

export const useScoreRecordRepository = () => {
  return useMemo(() => createScoreRecordRepository(), [])
}

export type ScoreRecordRepository = ReturnType<
  typeof createScoreRecordRepository
>
