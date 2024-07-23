import { useEffect, useState } from 'react'

import { compareAsc, format } from 'date-fns'
import { ja } from 'date-fns/locale'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'

type Dataset = {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
}

export type ChartData = {
  labels: string[]
  datasets: Dataset[]
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // 上限は除き、下限は含む
}

export const useScoreChart = (
  players: Player[],
  scoreRecords: ScoreRecord[],
) => {
  const [data, setData] = useState<ChartData>({ labels: [], datasets: [] })

  useEffect(() => {
    const labels: string[] = []
    const datasets: Dataset[] = []
    scoreRecords
      .sort((a, b) => compareAsc(a.date, b.date))
      .forEach((record) => {
        if (
          !labels.includes(
            format(record.date, 'yyyy/MM/dd', {
              locale: ja,
            }),
          )
        ) {
          labels.push(
            format(record.date, 'yyyy/MM/dd', {
              locale: ja,
            }),
          )
        }
      })
    players.forEach((player) => {
      const color = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`
      datasets.push({
        label: player.name,
        data: labels
          .reverse()
          .reduce(
            (scores, label) => {
              const diff = scoreRecords
                .filter(
                  (record) =>
                    record.playerId === player.id &&
                    format(record.date, 'yyyy/MM/dd', {
                      locale: ja,
                    }) === label,
                )
                .reduce((sum, record) => sum + record.diff, 0)
              return [scores[0] - diff, ...scores]
            },
            [player.lastScore],
          )
          .slice(1),
        borderColor: color,
        backgroundColor: color,
      })
    })
    console.log({ labels, datasets })
    setData({ labels, datasets })
  }, [players, scoreRecords])

  return { data }
}
