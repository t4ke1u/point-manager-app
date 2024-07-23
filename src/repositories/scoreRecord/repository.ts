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

  async create(
    playerId: string,
    diff: number,
    date: string,
  ): Promise<ScoreRecord> {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/record`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          diff,
          date,
        }),
      },
    ).then((res) => {
      return res.json()
    })) as ScoreRecordData

    return convertScoreRecordFromData(data)
  },

  async update(
    key: { dateKey: string; id: string },
    record: { playerId: string; diff: number; date: string },
  ) {
    const data = (await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/record`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          record,
        }),
      },
    ).then((res) => {
      return res.json()
    })) as ScoreRecordData

    return convertScoreRecordFromData(data)
  },

  async delete(key: { dateKey: string; id: string }) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/record`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key,
      }),
    }).then((res) => {
      return res.json()
    })
  },
})

export const useScoreRecordRepository = () => {
  return useMemo(() => createScoreRecordRepository(), [])
}

export type ScoreRecordRepository = ReturnType<
  typeof createScoreRecordRepository
>
