import { RankTable } from '@/components/rank/RankTable'
import { ScoreChart } from '@/components/rank/ScoreChart'

const RankPage = () => {
  return (
    <main>
      <div className="md:mt-20 sm:mb-16 md:mb-0 px-4 py-8">
        <h1 className="mb-5 mx-2 font-bold">ランキング</h1>
        <RankTable />
        <div className="py-5">
          <ScoreChart />
        </div>
      </div>
    </main>
  )
}

export default RankPage
