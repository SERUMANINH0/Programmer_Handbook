import { beforeEach, describe, expect, it } from "vitest"

import { useHistoryStore } from "./history.store"

describe("history store", () => {
  beforeEach(() => {
    useHistoryStore.setState({ items: [] })
  })

  it("adds an item to the front of the history", () => {
    useHistoryStore.getState().addToHistory("a")
    useHistoryStore.getState().addToHistory("b")
    expect(useHistoryStore.getState().items.map((i) => i.id)).toEqual(["b", "a"])
  })

  it("moves a re-visited id back to the front instead of duplicating it", () => {
    const { addToHistory } = useHistoryStore.getState()
    addToHistory("a")
    addToHistory("b")
    addToHistory("a")
    const ids = useHistoryStore.getState().items.map((i) => i.id)
    expect(ids).toEqual(["a", "b"])
  })

  it("clears history", () => {
    useHistoryStore.getState().addToHistory("a")
    useHistoryStore.getState().clearHistory()
    expect(useHistoryStore.getState().items).toEqual([])
  })
})
