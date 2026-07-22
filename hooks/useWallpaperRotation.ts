"use client"

import * as React from "react"

import { useSettingsStore } from "@/lib/store/settings.store"
import type { IndexedEntry } from "@/types/entry"

export function useWallpaperRotation(entries: IndexedEntry[]) {
  const rotationSeconds = useSettingsStore((state) => state.wallpaperRotationSeconds)

  const groups = React.useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.group))).sort(),
    [entries]
  )

  const [groupIndex, setGroupIndex] = React.useState(0)
  const [entryIndex, setEntryIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const currentGroup = groups[groupIndex]
  const groupEntries = React.useMemo(
    () => entries.filter((entry) => entry.group === currentGroup),
    [entries, currentGroup]
  )
  const currentEntry = groupEntries[entryIndex] ?? null

  const goToNextGroup = React.useCallback(() => {
    setGroupIndex((i) => (groups.length > 0 ? (i + 1) % groups.length : 0))
    setEntryIndex(0)
  }, [groups.length])

  const goToPrevGroup = React.useCallback(() => {
    setGroupIndex((i) =>
      groups.length > 0 ? (i - 1 + groups.length) % groups.length : 0
    )
    setEntryIndex(0)
  }, [groups.length])

  const togglePause = React.useCallback(() => setIsPaused((p) => !p), [])

  React.useEffect(() => {
    if (isPaused || groupEntries.length === 0) return
    const timer = setInterval(() => {
      setEntryIndex((i) => {
        if (i + 1 < groupEntries.length) return i + 1
        goToNextGroup()
        return 0
      })
    }, rotationSeconds * 1000)
    return () => clearInterval(timer)
  }, [isPaused, groupEntries.length, rotationSeconds, goToNextGroup])

  return {
    currentEntry,
    currentGroup,
    isPaused,
    goToNextGroup,
    goToPrevGroup,
    togglePause,
  }
}
