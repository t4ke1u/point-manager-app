import { useMemo } from 'react'

import { convertPlayerFromData } from './converter'

import type { PlayerData } from './converter'
import type { Player } from '@/models/player/type'

export const createPlayerRepository = () => ({
  async list(): Promise<Player[]> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player`,
    ).then((r) => r.json())) as PlayerData[]

    return data.map(convertPlayerFromData)
  },

  async get(id: string): Promise<Player> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player/${id}`,
    ).then((r) => r.json())) as PlayerData

    return convertPlayerFromData(data)
  },

  async create(name: string): Promise<PlayerData> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
        }),
      },
    ).then((res) => {
      return res.json()
    })) as PlayerData

    return data
  },

  async delete(id: string): Promise<string> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player/${id}`,
      {
        method: 'DELETE',
      },
    ).then((res) => {
      return res.json()
    })) as string

    return data
  },

  async update(id: string, name: string): Promise<string> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/player/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
        }),
      },
    ).then((res) => {
      return res.json()
    })) as string

    return data
  },
})

export const usePlayerRepository = () => {
  return useMemo(() => createPlayerRepository(), [])
}

export type PlayerRepository = ReturnType<typeof createPlayerRepository>
