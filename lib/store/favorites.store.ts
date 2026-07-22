import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesState {
  ids: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      isFavorite: (id) => get().ids.includes(id),
      toggleFavorite: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((existing) => existing !== id)
            : [...state.ids, id],
        })),
      clearFavorites: () => set({ ids: [] }),
    }),
    { name: "ph-favorites", skipHydration: true }
  )
)
