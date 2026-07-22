import { beforeEach, describe, expect, it } from "vitest"

import { useFavoritesStore } from "./favorites.store"

describe("favorites store", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] })
  })

  it("starts with no favorites", () => {
    expect(useFavoritesStore.getState().isFavorite("git-commit")).toBe(false)
  })

  it("toggles an id into favorites", () => {
    useFavoritesStore.getState().toggleFavorite("git-commit")
    expect(useFavoritesStore.getState().isFavorite("git-commit")).toBe(true)
  })

  it("toggles an id out of favorites", () => {
    const { toggleFavorite } = useFavoritesStore.getState()
    toggleFavorite("git-commit")
    toggleFavorite("git-commit")
    expect(useFavoritesStore.getState().isFavorite("git-commit")).toBe(false)
  })

  it("clears all favorites", () => {
    useFavoritesStore.getState().toggleFavorite("a")
    useFavoritesStore.getState().toggleFavorite("b")
    useFavoritesStore.getState().clearFavorites()
    expect(useFavoritesStore.getState().ids).toEqual([])
  })
})
