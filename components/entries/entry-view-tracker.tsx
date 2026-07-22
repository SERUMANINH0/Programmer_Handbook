"use client"

import * as React from "react"

import { useHistoryStore } from "@/lib/store/history.store"
import { useStatsStore } from "@/lib/store/stats.store"

export function EntryViewTracker({ entryId }: { entryId: string }) {
  const addToHistory = useHistoryStore((state) => state.addToHistory)
  const registerAccess = useStatsStore((state) => state.registerAccess)

  React.useEffect(() => {
    addToHistory(entryId)
    registerAccess(entryId)
  }, [entryId, addToHistory, registerAccess])

  return null
}
