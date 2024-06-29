import { getDoc, doc, setDoc } from 'firebase/firestore'

import type { PlayerData } from '@/repositories/player/converter'
import type { NextRequest } from 'next/server'

import { db } from '@/lib/firebase'

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const docSnap = await getDoc(doc(db, 'player', 'list'))
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    const players = data as PlayerData[]
    if (players.filter((player) => player.id === params.id).length !== 1) {
      return Response.json({})
    }
    const player = players.filter((player) => player.id === params.id)[0]
    return Response.json(player)
  } else {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const docRef = doc(db, 'player', 'list')
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    const players = data as PlayerData[]
    await setDoc(docRef, {
      data: players.filter((player) => player.id !== params.id),
    })
    return Response.json({ id: params.id })
  } else {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { name } = await req.json()
  const docRef = doc(db, 'player', 'list')
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    const players = data as PlayerData[]
    if (players.filter((player) => player.id === params.id).length !== 1) {
      return Response.json({})
    }
    const player = players.filter((player) => player.id === params.id)[0]
    await setDoc(docRef, {
      data: [
        ...players.filter((player) => player.id !== params.id),
        { ...player, name },
      ],
    })
    return Response.json({ id: params.id })
  } else {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}
