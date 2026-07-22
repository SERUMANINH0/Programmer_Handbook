import { beforeEach, describe, expect, it } from "vitest"

import { useStatsStore } from "./stats.store"

describe("stats store", () => {
  beforeEach(() => {
    useStatsStore.setState({ accessCounts: {}, searchTermCounts: {} })
  })

  it("increments access counts", () => {
    const { registerAccess } = useStatsStore.getState()
    registerAccess("git-commit")
    registerAccess("git-commit")
    expect(useStatsStore.getState().accessCounts["git-commit"]).toBe(2)
  })

  it("returns most accessed sorted descending", () => {
    const { registerAccess } = useStatsStore.getState()
    registerAccess("a")
    registerAccess("b")
    registerAccess("b")
    const top = useStatsStore.getState().getMostAccessed(2)
    expect(top[0]).toEqual({ id: "b", count: 2 })
  })

  it("normalizes and counts search terms case-insensitively", () => {
    const { registerSearch } = useStatsStore.getState()
    registerSearch("Docker")
    registerSearch("docker")
    registerSearch("  docker  ")
    expect(useStatsStore.getState().searchTermCounts["docker"]).toBe(3)
  })

  it("ignores empty search terms", () => {
    useStatsStore.getState().registerSearch("   ")
    expect(Object.keys(useStatsStore.getState().searchTermCounts)).toHaveLength(0)
  })
})
