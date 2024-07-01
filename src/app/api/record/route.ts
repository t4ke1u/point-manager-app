import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import type { ScoreRecordData } from '@/repositories/scoreRecord/converter'
import type { NextRequest } from 'next/server'

import { db } from '@/lib/firebase'

export const GET = async () => {
  const querySnaps = await getDocs(collection(db, 'record'))
  try {
    const records: ScoreRecordData[] = []
    querySnaps.forEach((doc) => {
      const { data } = doc.data() as { data: ScoreRecordData[] }
      data.forEach((record) => records.push(record))
    })
    return Response.json(records)
  } catch {
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}

export const POST = async (req: NextRequest) => {
  const { playerId, diff, date } = await req.json()
  const id = uuidv4()
  const record = {
    id,
    playerId,
    diff,
    date,
    createdAt: format(new Date(), 'yyyy/MM/dd-HH:mm:ss', { locale: ja }),
  }
  const docRef = doc(db, 'record', date)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    await setDoc(docRef, { data: [...data, record] })
    return Response.json(record)
  } else {
    await setDoc(docRef, { data: [record] })
    return Response.json(record)
  }
}
