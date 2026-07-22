"use client"

import * as React from "react"
import Fuse from "fuse.js"

import { useSearchIndex } from "@/hooks/useSearchIndex"
import { fuseOptions } from "@/lib/search/fuseOptions"
import type { IndexedEntry } from "@/types/entry"

export interface SearchFilters {
  group?: string
  difficulty?: string
  platform?: string
  language?: string
}

function matchesFilters(entry: IndexedEntry, filters: SearchFilters): boolean {
  if (filters.group && entry.group !== filters.group) return false
  if (filters.difficulty && entry.difficulty !== filters.difficulty) return false
  if (filters.platform && !entry.platform?.includes(filters.platform)) return false
  if (filters.language && entry.language !== filters.language) return false
  return true
}

export function useFuseSearch(query: string, filters: SearchFilters = {}) {
  const { entries, isLoading, error } = useSearchIndex()

  const fuse = React.useMemo(() => new Fuse(entries, fuseOptions), [entries])

  const results = React.useMemo<IndexedEntry[]>(() => {
    const base = query.trim() ? fuse.search(query).map((result) => result.item) : entries

    return base.filter((entry) => matchesFilters(entry, filters))
  }, [fuse, entries, query, filters])

  return { results, isLoading, error, totalCount: entries.length }
}
