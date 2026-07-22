import { describe, expect, it } from "vitest"

import {
  getAllCategorySummaries,
  getAllEntriesFlat,
  getCategoriesForGroup,
  getEntries,
  getEntryById,
  getGroups,
  getTotalEntryCount,
} from "./repository"

describe("data repository", () => {
  it("discovers all group folders under data/", () => {
    const groups = getGroups()
    expect(groups.length).toBeGreaterThan(0)
    expect(groups).toContain("devops")
    expect(groups).toContain("languages")
  })

  it("discovers category files within a group", () => {
    const categories = getCategoriesForGroup("devops")
    expect(categories).toContain("git")
    expect(categories).toContain("docker")
  })

  it("returns an empty array for a non-existent group", () => {
    expect(getCategoriesForGroup("does-not-exist")).toEqual([])
  })

  it("reads and validates entries for a known category", () => {
    const entries = getEntries("devops", "git")
    expect(entries.length).toBeGreaterThan(0)
    expect(entries[0]).toHaveProperty("id")
    expect(entries[0]).toHaveProperty("difficulty")
  })

  it("finds a specific entry by id", () => {
    const entry = getEntryById("devops", "git", "git-commit")
    expect(entry?.title).toBe("git commit")
  })

  it("returns undefined for an unknown entry id", () => {
    expect(getEntryById("devops", "git", "does-not-exist")).toBeUndefined()
  })

  it("builds category summaries with accurate entry counts", () => {
    const summaries = getAllCategorySummaries()
    const gitSummary = summaries.find((s) => s.group === "devops" && s.slug === "git")
    expect(gitSummary?.entryCount).toBe(getEntries("devops", "git").length)
  })

  it("flattens all entries with group/slug metadata attached", () => {
    const flat = getAllEntriesFlat()
    expect(flat.length).toBe(getTotalEntryCount())
    for (const entry of flat) {
      expect(entry.group).toBeTruthy()
      expect(entry.slug).toBeTruthy()
    }
  })

  it("has no duplicate ids across the whole dataset", () => {
    const ids = getAllEntriesFlat().map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
