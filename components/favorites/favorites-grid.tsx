"use client"

import * as React from "react"

import { EntryCard } from "@/components/entries/entry-card"
import { EmptyState } from "@/components/common/empty-state"
import { LoadingSkeletonGrid } from "@/components/common/loading-skeleton-grid"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { useFavoritesStore } from "@/lib/store/favorites.store"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

export function FavoritesGrid() {
  const favoriteIds = useFavoritesStore((state) => state.ids)
  const { entries, isLoading } = useSearchIndex()

  const favoriteEntries = React.useMemo<IndexedEntry[]>(() => {
    const idSet = new Set(favoriteIds)
    return entries.filter((entry) => idSet.has(entry.id))
  }, [entries, favoriteIds])

  if (isLoading) return <LoadingSkeletonGrid />

  if (favoriteEntries.length === 0) {
    return <EmptyState title={t("favorites.empty")} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
