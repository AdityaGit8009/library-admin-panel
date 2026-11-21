"use client"

import { useSyncExternalStore } from "react"
import { localDate } from "@/lib/library/calendar"

function subscribe(onChange: () => void) {
  let timer: number
  function schedule() {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    timer = window.setTimeout(refresh, midnight.getTime() - now.getTime())
  }
  function refresh() {
    window.clearTimeout(timer)
    onChange()
    schedule()
  }
  schedule()
  window.addEventListener("focus", refresh)
  return () => {
    window.clearTimeout(timer)
    window.removeEventListener("focus", refresh)
  }
}

export function useLibraryDate() {
  return useSyncExternalStore(subscribe, localDate, () => "")
}
