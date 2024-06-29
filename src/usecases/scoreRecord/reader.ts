import useSWR from 'swr'

import { scoreRecordCacheKeyGenerator } from './cache'

import type { ScoreRecord } from '@/models/scoreRecord/type'

import { useScoreRecordRepository } from '@/repositories/scoreRecord/repository'

export const useScoreRecords = () => {
  const repository = useScoreRecordRepository()

  return useSWR<ScoreRecord[]>(
    scoreRecordCacheKeyGenerator.generateListKey(),
    () => repository.list(),
  )
}
