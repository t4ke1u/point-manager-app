'use client'

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  Title,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  Title,
)

import { usePlayerScoreChart } from './PlayerScoreChart.hooks'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'
import type { ChartOptions } from 'chart.js'

type Props = {
  player: Player
  scoreRecords: ScoreRecord[]
}

export const PlayerScoreChart = ({ player, scoreRecords }: Props) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const { data } = usePlayerScoreChart(player, scoreRecords)

  return (
    <div className="w-full">
      <h2 className="mx-1 my-2 text-lg font-bold">スコア推移</h2>
      <Line data={data} options={options} />
    </div>
  )
}
