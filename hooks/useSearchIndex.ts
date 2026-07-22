"use client"

import * as React from "react"

import type { IndexedEntry } from "@/types/entry"

interface SearchIndexState {
  entries: IndexedEntry[]
  isLoading: boolean
  error: string | null
}

let cachedEntries: IndexedEntry[] | null = null
let inFlightRequest: Promise<IndexedEntry[]> | null = null

function fetchSearchIndex(): Promise<IndexedEntry[]> {
  if (cachedEntries) return Promise.resolve(cachedEntries)
  if (!inFlightRequest) {
    inFlightRequest = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar o índice de busca")
        return res.json() as Promise<IndexedEntry[]>
      })
      .then((data) => {
        cachedEntries = data
        return data
      })
  }
  return inFlightRequest
}

/** Carrega (uma única vez, com cache em memória) o índice gerado em public/search-index.json. */
export function useSearchIndex(): SearchIndexState {
  const [entries, setEntries] = React.useState<IndexedEntry[]>(cachedEntries ?? [])
  const [isLoading, setIsLoading] = React.useState(!cachedEntries)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (cachedEntries) return
    let cancelled = false
    setIsLoading(true)
    fetchSearchIndex()
      .then((data) => {
        if (!cancelled) setEntries(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { entries, isLoading, error }
}
