import { useMemo } from 'react'

import { mutate } from 'swr'

import { playerCacheKeyGenerator } from './cache'

import {
  usePlayerRepository,
  type PlayerRepository,
} from '@/repositories/player/repository'

export const createPlayerUsecase = ({
  repository,
}: {
  repository: PlayerRepository
}) => ({
  createPlayer: async (name: string) => {
    await repository.create(name)
    await mutate(playerCacheKeyGenerator.generateListKey())
  },

  deletePlayer: async (id: string) => {
    await repository.delete(id)
    await mutate(playerCacheKeyGenerator.generateListKey())
  },

  updatePlayer: async (id: string, name: string) => {
    await repository.update(id, name)
    await mutate(playerCacheKeyGenerator.generateListKey())
    await mutate(playerCacheKeyGenerator.generateItemKey(id))
  },
})

export const usePlayerUsecase = () => {
  const repository = usePlayerRepository()

  return useMemo(() => createPlayerUsecase({ repository }), [repository])
}
