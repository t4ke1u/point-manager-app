import { useMemo } from 'react'

import { convertPlayerFromData } from './converter'

import type { Player } from '@/models/player/type'

export const createPlayerRepository = () => ({
  async list(): Promise<Player[]> {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player`,
    ).then((r) => r.json())

    return data.map(convertPlayerFromData)
  },
})

export const usePlayerRepository = () => {
  return useMemo(() => createPlayerRepository(), [])
}

export type PlayerRepository = ReturnType<typeof createPlayerRepository>
