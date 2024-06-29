import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import type { NextRequest } from 'next/server'

import { db } from '@/lib/firebase'

export const GET = async () => {
  const docSnap = await getDoc(doc(db, 'player', 'list'))
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    return Response.json(data)
  } else {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}

export const POST = async (req: NextRequest) => {
  const { name } = await req.json()
  const id = uuidv4()
  const player = {
    id,
    name,
    createdAt: format(new Date(), 'yyyy/MM/dd-HH:mm:ss', { locale: ja }),
    lastScore: 0,
  }
  const docRef = doc(db, 'player', 'list')
  const docSnap = await getDoc(doc(db, 'player', 'list'))
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    await setDoc(docRef, { data: [...data, player] })
    return Response.json(player)
  } else {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}
