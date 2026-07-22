import fs from "node:fs"
import path from "node:path"

import { entryFileSchema } from "../lib/validation/entry.schema"
import type { IndexedEntry } from "../types/entry"

const DATA_DIR = path.join(process.cwd(), "data")
const OUTPUT_FILE = path.join(process.cwd(), "public", "search-index.json")

function main() {
  const groups = fs.existsSync(DATA_DIR)
    ? fs
        .readdirSync(DATA_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : []

  const flat: IndexedEntry[] = []

  for (const group of groups) {
    const groupDir = path.join(DATA_DIR, group)
    const files = fs.readdirSync(groupDir).filter((file) => file.endsWith(".json"))

    for (const file of files) {
      const slug = file.replace(/\.json$/, "")
      const raw = fs.readFileSync(path.join(groupDir, file), "utf-8")
      const parsed = entryFileSchema.parse(JSON.parse(raw))
      for (const entry of parsed) {
        flat.push({ ...entry, group, slug })
      }
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(flat), "utf-8")
  console.log(`Índice de busca gerado: ${flat.length} itens → public/search-index.json`)
}

main()
