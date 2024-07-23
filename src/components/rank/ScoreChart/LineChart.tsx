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

import { useScoreChart } from './ScoreChart.hooks'

import type { Player } from '@/models/player/type'
import type { ScoreRecord } from '@/models/scoreRecord/type'
import type { ChartOptions } from 'chart.js'

type Props = {
  players: Player[]
  scoreRecords: ScoreRecord[]
}

export const LineChart = ({ players, scoreRecords }: Props) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const { data } = useScoreChart(players, scoreRecords)

  return <Line data={data} options={options} />
}
