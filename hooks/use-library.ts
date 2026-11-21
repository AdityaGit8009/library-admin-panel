"use client"

import { useSyncExternalStore, type SetStateAction } from "react"
import { initialBooks } from "@/lib/library/books"
import { initialMembers } from "@/lib/library/members"
import { initialLoans } from "@/lib/library/loans"
import { readLibrarySession, type LibraryRecords } from "@/lib/library/session"

const initialRecords: LibraryRecords = { books: initialBooks, members: initialMembers, loans: initialLoans }
const storageKey = "libraryhub.session.v1"
const listeners = new Set<() => void>()
let current = initialRecords
let loaded = false

function getSnapshot() {
  if (!loaded) {
    loaded = true
    try {
      current = readLibrarySession(window.sessionStorage.getItem(storageKey)) ?? initialRecords
    } catch {
      // Storage can be unavailable in restricted browser sessions.
    }
  }
  return current
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function useLibraryRecords() {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialRecords)
}

export function useLibraryCollection<K extends keyof LibraryRecords>(key: K) {
  const data = useLibraryRecords()

  function setCollection(change: SetStateAction<LibraryRecords[K]>) {
    const previous = getSnapshot()
    const items = typeof change === "function" ? change(previous[key]) : change
    if (items === previous[key]) return
    current = { ...previous, [key]: items }
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ version: 1, records: current }))
    } catch {
      // Keep the current tab usable when its storage quota is exhausted.
    }
    listeners.forEach((listener) => listener())
  }

  return [data[key], setCollection] as const
}
