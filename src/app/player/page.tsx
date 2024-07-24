import { SessionButton } from '@/components/auth/SessionButton'
import { PlayerList } from '@/components/player/PlayerList'

const PlayerListPage = () => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <div className="mb-5 ml-2 flex items-center justify-between">
          <h1 className="font-bold text-2xl">プレイヤー</h1>
          <div className="md:hidden">
            <SessionButton />
          </div>
        </div>
        <PlayerList />
        <div className="h-24" />
      </div>
    </main>
  )
}

export default PlayerListPage
