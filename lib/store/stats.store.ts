import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StatsState {
  accessCounts: Record<string, number>
  searchTermCounts: Record<string, number>
  registerAccess: (id: string) => void
  registerSearch: (term: string) => void
  getMostAccessed: (limit?: number) => Array<{ id: string; count: number }>
  getMostSearched: (limit?: number) => Array<{ term: string; count: number }>
}

function topEntries(record: Record<string, number>, limit: number) {
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      accessCounts: {},
      searchTermCounts: {},
      registerAccess: (id) =>
        set((state) => ({
          accessCounts: {
            ...state.accessCounts,
            [id]: (state.accessCounts[id] ?? 0) + 1,
          },
        })),
      registerSearch: (term) => {
        const normalized = term.trim().toLowerCase()
        if (!normalized) return
        set((state) => ({
          searchTermCounts: {
            ...state.searchTermCounts,
            [normalized]: (state.searchTermCounts[normalized] ?? 0) + 1,
          },
        }))
      },
      getMostAccessed: (limit = 10) =>
        topEntries(get().accessCounts, limit).map(([id, count]) => ({ id, count })),
      getMostSearched: (limit = 10) =>
        topEntries(get().searchTermCounts, limit).map(([term, count]) => ({
          term,
          count,
        })),
    }),
    { name: "ph-stats", skipHydration: true }
  )
)
