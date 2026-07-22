"use client"

import * as React from "react"
import { SearchX } from "lucide-react"

import { EntryCard } from "@/components/entries/entry-card"
import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

const PAGE_SIZE = 24

export function EntryGrid({ entries }: { entries: IndexedEntry[] }) {
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE)

  React.useEffect(() => setVisibleCount(PAGE_SIZE), [entries])

  if (entries.length === 0) {
    return <EmptyState icon={SearchX} title={t("search.noResults")} />
  }

  const visibleEntries = entries.slice(0, visibleCount)
  const hasMore = visibleCount < entries.length

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      {hasMore ? (
        <Button
          variant="outline"
          className="mx-auto"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          {t("common.loadMore")}
        </Button>
      ) : null}
    </div>
  )
}
