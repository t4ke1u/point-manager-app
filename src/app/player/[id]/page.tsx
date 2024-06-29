import { PlayerProfile } from '@/components/player/PlayerProfile'

const PlayerPage = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <div className="md:mt-20 sm:mb-16 md:mb-0 px-4 py-8">
        <PlayerProfile id={params.id} />
      </div>
    </main>
  )
}

export default PlayerPage
