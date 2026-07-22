"use client"

import * as React from "react"

import { EntryGrid } from "@/components/entries/entry-grid"
import { FilterBar } from "@/components/search/filter-bar"
import { SearchBar } from "@/components/search/search-bar"
import { LoadingSkeletonGrid } from "@/components/common/loading-skeleton-grid"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useFuseSearch, type SearchFilters } from "@/hooks/useFuseSearch"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { useStatsStore } from "@/lib/store/stats.store"
import { t } from "@/lib/i18n"

export function SearchView({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = React.useState(initialQuery)
  const [filters, setFilters] = React.useState<SearchFilters>({})
  const debouncedQuery = useDebouncedValue(query, 200)
  const registerSearch = useStatsStore((state) => state.registerSearch)
  const { entries: allEntries, isLoading } = useSearchIndex()
  const { results } = useFuseSearch(debouncedQuery, filters)

  React.useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      registerSearch(debouncedQuery)
    }
  }, [debouncedQuery, registerSearch])

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={query} onChange={setQuery} autoFocus className="max-w-xl" />
      <FilterBar entries={allEntries} filters={filters} onChange={setFilters} />
      <p className="text-muted-foreground text-sm">
        {t("search.resultsCount", { count: results.length })}
      </p>
      {isLoading ? <LoadingSkeletonGrid /> : <EntryGrid entries={results} />}
    </div>
  )
}
