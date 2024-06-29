'use client'

import { compareDesc } from 'date-fns'
import Link from 'next/link'
import { IoPerson } from 'react-icons/io5'

import { PlayerCreateDialog } from './PlayerCreateDialog'

import { usePlayers } from '@/usecases/player/reader'

export const PlayerList = () => {
  const { data: players } = usePlayers()

  if (!players) {
    return null
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Players List</h1>
      <div className="mt-2 px-2 flex justify-end">
        <PlayerCreateDialog />
      </div>
      <ul className="mt-2 px-4 flex flex-col gap-2">
        {players
          .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
          .map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
              className="h-12 px-4 inline-flex items-center gap-2 border border-solid border-gray-300 rounded-md bg-white"
            >
              <IoPerson className="text-gray-600" />
              <p className="text-md font-semibold text-gray-600">
                {player.name}
              </p>
            </Link>
          ))}
      </ul>
    </section>
  )
}
