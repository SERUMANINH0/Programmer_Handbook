"use client"

import * as React from "react"

import { EntryCard } from "@/components/entries/entry-card"
import { EmptyState } from "@/components/common/empty-state"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { useStatsStore } from "@/lib/store/stats.store"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

export function MostAccessedList({ limit = 9 }: { limit?: number }) {
  const getMostAccessed = useStatsStore((state) => state.getMostAccessed)
  const accessCounts = useStatsStore((state) => state.accessCounts)
  const { entries } = useSearchIndex()

  const mostAccessed = React.useMemo<IndexedEntry[]>(() => {
    const byId = new Map(entries.map((entry) => [entry.id, entry]))
    return getMostAccessed(limit)
      .map(({ id }) => byId.get(id))
      .filter((entry): entry is IndexedEntry => Boolean(entry))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, accessCounts, limit])

  if (mostAccessed.length === 0) {
    return <EmptyState title={t("common.empty")} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mostAccessed.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
