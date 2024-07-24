import { PlayerList } from '@/components/player/PlayerList'

const PlayerListPage = () => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <h1 className="mb-5 ml-2 text-2xl font-bold">プレイヤー一覧</h1>
        <PlayerList />
        <div className="h-24" />
      </div>
    </main>
  )
}

export default PlayerListPage
