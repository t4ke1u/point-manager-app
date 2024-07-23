import { useMemo } from 'react'

import { mutate } from 'swr'

import { playerCacheKeyGenerator } from '../player/cache'

import { scoreRecordCacheKeyGenerator } from './cache'

import type { ScoreRecordRepository } from '@/repositories/scoreRecord/repository'

import { useScoreRecordRepository } from '@/repositories/scoreRecord/repository'

export const createScoreRecordUsecase = ({
  repository,
}: {
  repository: ScoreRecordRepository
}) => ({
  createScoreRecord: async (playerId: string, diff: number, date: string) => {
    await repository.create(playerId, diff, date)
    await mutate(scoreRecordCacheKeyGenerator.generateListKey())
  },

  deleteScoreRecord: async (key: { dateKey: string; id: string }) => {
    await repository.delete(key)
    await mutate(scoreRecordCacheKeyGenerator.generateListKey())
  },

  updateScoreRecord: async (
    key: { dateKey: string; id: string },
    record: { playerId: string; diff: number; date: string },
  ) => {
    await repository.update(key, record)
    await mutate(scoreRecordCacheKeyGenerator.generateListKey())
    await mutate(playerCacheKeyGenerator.generateListKey())
  },
})

export const useScoreRecordUsecase = () => {
  const repository = useScoreRecordRepository()

  return useMemo(() => createScoreRecordUsecase({ repository }), [repository])
}
