import { parse } from 'date-fns'
import { ja } from 'date-fns/locale'

import type { Player } from '@/models/player/type'

export type PlayerData = {
  id: string
  name: string
  createdAt: string
}

export const convertPlayerFromData = (data: PlayerData): Player => {
  return {
    id: data.id,
    name: data.name,
    createdAt: parse(data.createdAt, 'yyyy/MM/dd-HH:mm:ss', new Date(), {
      locale: ja,
    }),
  }
}
