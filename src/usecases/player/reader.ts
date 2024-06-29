import useSWR from 'swr'

import { playerCacheKeyGenerator } from './cache'

import type { Player } from '@/models/player/type'

import { usePlayerRepository } from '@/repositories/player/repository'

export const usePlayers = () => {
  const repository = usePlayerRepository()

  return useSWR<Player[]>(playerCacheKeyGenerator.generateListKey(), () =>
    repository.list(),
  )
}

export const usePlayer = (id: string) => {
  const repository = usePlayerRepository()

  return useSWR<Player>(playerCacheKeyGenerator.generateItemKey(id), () =>
    repository.get(id),
  )
}
