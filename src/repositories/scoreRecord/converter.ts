import { parse } from 'date-fns'
import { ja } from 'date-fns/locale'

import type { ScoreRecord } from '@/models/scoreRecord/type'

export type ScoreRecordData = {
  id: string
  playerId: string
  diff: number
  date: string
  recordedAt: string
}

export const convertScoreRecordFromData = (
  data: ScoreRecordData,
): ScoreRecord => {
  console.log(
    parse(data.recordedAt, 'yyyy/MM/dd-HH:mm:ss', new Date(), {
      locale: ja,
    }),
  )
  return {
    id: data.id,
    playerId: data.playerId,
    diff: data.diff,
    date: parse(data.date, 'yyyyMMdd', new Date(), {
      locale: ja,
    }),
    recordedAt: parse(data.recordedAt, 'yyyy/MM/dd-HH:mm:ss', new Date(), {
      locale: ja,
    }),
  }
}
