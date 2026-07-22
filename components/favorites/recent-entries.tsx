"use client"

import * as React from "react"

import { EntryCard } from "@/components/entries/entry-card"
import { EmptyState } from "@/components/common/empty-state"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { useHistoryStore } from "@/lib/store/history.store"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

export function RecentEntries({ limit = 6 }: { limit?: number }) {
  const items = useHistoryStore((state) => state.items)
  const { entries } = useSearchIndex()

  const recentEntries = React.useMemo<IndexedEntry[]>(() => {
    const byId = new Map(entries.map((entry) => [entry.id, entry]))
    return items
      .map((item) => byId.get(item.id))
      .filter((entry): entry is IndexedEntry => Boolean(entry))
      .slice(0, limit)
  }, [items, entries, limit])

  if (recentEntries.length === 0) {
    return <EmptyState title={t("common.empty")} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recentEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
