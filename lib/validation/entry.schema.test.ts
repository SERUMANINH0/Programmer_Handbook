import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { entryFileSchema } from "./entry.schema"

const DATA_DIR = path.join(process.cwd(), "data")

function listJsonFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...listJsonFiles(fullPath))
    else if (entry.name.endsWith(".json")) files.push(fullPath)
  }
  return files
}

describe("entryFileSchema against real data/ JSON files", () => {
  const files = listJsonFiles(DATA_DIR)

  it("finds at least one data file", () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it.each(files.map((file) => [path.relative(DATA_DIR, file), file]))(
    "%s conforms to the entry schema",
    (_label, file) => {
      const json = JSON.parse(fs.readFileSync(file, "utf-8"))
      const result = entryFileSchema.safeParse(json)
      expect(result.success).toBe(true)
    }
  )
})
