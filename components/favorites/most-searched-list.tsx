"use client"

import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Badge } from "@/components/ui/badge"
import { useStatsStore } from "@/lib/store/stats.store"
import { t } from "@/lib/i18n"

export function MostSearchedList({ limit = 12 }: { limit?: number }) {
  const mostSearched = useStatsStore((state) => state.getMostSearched(limit))

  if (mostSearched.length === 0) {
    return <EmptyState title={t("common.empty")} />
  }

  return (
    <div className="flex flex-wrap gap-2">
      {mostSearched.map(({ term, count }) => (
        <Link key={term} href={`/pesquisar?q=${encodeURIComponent(term)}`}>
          <Badge variant="secondary" className="cursor-pointer gap-1.5 font-normal">
            {term}
            <span className="text-muted-foreground">{count}</span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}
