import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import type { PlayerData } from '@/repositories/player/converter'
import type { ScoreRecordData } from '@/repositories/scoreRecord/converter'
import type { NextRequest } from 'next/server'

import { db } from '@/lib/firebase'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const maxCount = searchParams.get('limit')
  const ref =
    maxCount === null
      ? collection(db, 'record')
      : query(
          collection(db, 'record'),
          orderBy('date', 'desc'),
          limit(Number(maxCount)),
        )
  const querySnaps = await getDocs(ref)
  try {
    const records: ScoreRecordData[] = []
    querySnaps.forEach(async (docSnap) => {
      const { data } = docSnap.data() as { data: ScoreRecordData[] }
      if (data.length === 0) {
        await deleteDoc(doc(db, 'record', docSnap.id))
      } else {
        data.forEach((record) => records.push(record))
      }
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
    recordedAt: format(new Date(), 'yyyy/MM/dd-HH:mm:ss', { locale: ja }),
  }
  const docRef = doc(db, 'record', date)
  const docSnap = await getDoc(docRef)
  await updatePlayerLastScore(playerId, diff)
  if (docSnap.exists()) {
    const { data } = docSnap.data()
    await setDoc(docRef, { date, data: [...data, record] })
    return Response.json(record)
  } else {
    await setDoc(docRef, { date, data: [record] })
    return Response.json(record)
  }
}

export const DELETE = async (req: NextRequest) => {
  const {
    key: { dateKey, id },
  } = await req.json()
  const docRef = doc(db, 'record', dateKey)
  const docSnap = await getDoc(docRef)
  const { data } = docSnap.data() as { data: ScoreRecordData[] }
  const filteredRecords = data.filter((record) => record.id !== id)
  if (filteredRecords.length === 0) {
    await deleteDoc(doc(db, 'record', dateKey))
  } else {
    await setDoc(docRef, {
      date: dateKey,
      data: filteredRecords,
    })
  }
  const playerId = data.filter((record) => record.id === id)[0].playerId
  const oldDiff = data.filter((record) => record.id === id)[0].diff
  await updatePlayerLastScore(playerId, -oldDiff)
  return Response.json({ id })
}

export const PUT = async (req: NextRequest) => {
  const {
    key: { dateKey, id },
    record: { playerId, diff, date },
  } = await req.json()
  const record = {
    id,
    playerId,
    diff,
    date,
    recordedAt: format(new Date(), 'yyyy/MM/dd-HH:mm:ss', { locale: ja }),
  }
  if (dateKey === date) {
    const docRef = doc(db, 'record', dateKey)
    const docSnap = await getDoc(docRef)
    const { data } = docSnap.data() as { data: ScoreRecordData[] }
    const oldRecord = data.filter((record) => record.id === id)[0]
    await setDoc(docRef, {
      date,
      data: [...data.filter((record) => record.id !== id), record],
    })
    await updatePlayerLastScore(oldRecord.playerId, -oldRecord.diff)
    await updatePlayerLastScore(playerId, diff)
  } else {
    const oldDocRef = doc(db, 'record', dateKey)
    const docSnap = await getDoc(oldDocRef)
    const { data } = docSnap.data() as { data: ScoreRecordData[] }
    const oldRecord = data.filter((record) => record.id === id)[0]
    const filteredRecords = data.filter((record) => record.id !== id)
    if (filteredRecords.length === 0) {
      await deleteDoc(doc(db, 'record', dateKey))
    } else {
      await setDoc(oldDocRef, {
        date: dateKey,
        data: data.filter((record) => record.id !== id),
      })
    }
    const newDocRef = doc(db, 'record', date)
    const newDocSnap = await getDoc(newDocRef)
    if (newDocSnap.exists()) {
      const { data } = newDocSnap.data() as { data: ScoreRecordData[] }
      await setDoc(newDocRef, { date, data: [...data, record] })
    } else {
      await setDoc(newDocRef, { date, data: [record] })
    }
    await updatePlayerLastScore(oldRecord.playerId, -oldRecord.diff)
    await updatePlayerLastScore(playerId, diff)
  }

  return Response.json(record)
}

const updatePlayerLastScore = async (playerId: string, diff: number) => {
  const playerDocRef = doc(db, 'player', 'list')
  const playerDocSnap = await getDoc(playerDocRef)
  if (playerDocSnap.exists()) {
    const { data: players } = playerDocSnap.data() as { data: PlayerData[] }
    if (players.filter((player) => player.id === playerId).length !== 1) {
      return
    }
    const player = players.filter((player) => player.id === playerId)[0]
    await setDoc(playerDocRef, {
      data: [
        ...players.filter((player) => player.id !== playerId),
        { ...player, lastScore: player.lastScore + diff },
      ],
    })
    console.log([
      ...players.filter((player) => player.id !== playerId),
      { ...player, lastScore: player.lastScore + diff },
    ])
  }
}
