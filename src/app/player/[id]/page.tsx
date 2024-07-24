import { PlayerProfile } from '@/components/player/PlayerProfile'

const PlayerPage = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <PlayerProfile id={params.id} />
        <div className="h-24" />
      </div>
    </main>
  )
}

export default PlayerPage
