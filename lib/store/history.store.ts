import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface HistoryItem {
  id: string
  viewedAt: string
}

const MAX_HISTORY_ITEMS = 50

interface HistoryState {
  items: HistoryItem[]
  addToHistory: (id: string) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      addToHistory: (id) =>
        set((state) => {
          const withoutExisting = state.items.filter((item) => item.id !== id)
          const next = [{ id, viewedAt: new Date().toISOString() }, ...withoutExisting]
          return { items: next.slice(0, MAX_HISTORY_ITEMS) }
        }),
      clearHistory: () => set({ items: [] }),
    }),
    { name: "ph-history", skipHydration: true }
  )
)
