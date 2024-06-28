import type { Player } from '@/models/player/type'

export type ScoreRecord = {
  id: string
  player: Player
  diff: number
  date: Date
  recordedAt: Date
}
