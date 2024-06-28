import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import type { Player } from '@/models/player/type'
import type { NextRequest } from 'next/server'

import { db } from '@/lib/firebase'

export const GET = async () => {
  const querySnapshot = await getDocs(collection(db, 'player'))
  const players: Player[] = []
  querySnapshot.forEach((doc) => {
    const player = doc.data()
    players.push(player as Player)
  })

  return Response.json(players)
}

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json()
    const id = uuidv4()
    const player = {
      id,
      name,
      createdAt: format(new Date(), 'yyyy/MM/dd-HH:mm:ss', { locale: ja }),
    }
    const docRef = doc(db, 'player', id)
    await setDoc(docRef, player)
    return Response.json(player)
  } catch (e) {
    console.log(e)
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}
