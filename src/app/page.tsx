import { RankTable } from '@/components/rank/RankTable'
import { ScoreChart } from '@/components/rank/ScoreChart'

const RankPage = () => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <h1 className="mb-5 ml-2 font-bold text-2xl">JOPT</h1>
        <h2 className="mb-5 mx-2 font-bold">ランキング</h2>
        <RankTable />
        <div className="py-5">
          <h2 className="my-2 mx-2 font-bold">スコア推移</h2>
          <ScoreChart />
        </div>
        <div className="h-24" />
      </div>
    </main>
  )
}

export default RankPage
