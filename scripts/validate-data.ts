import fs from "node:fs"
import path from "node:path"

import { entryFileSchema } from "../lib/validation/entry.schema"

const DATA_DIR = path.join(process.cwd(), "data")

function listJsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listJsonFiles(fullPath))
    } else if (entry.name.endsWith(".json")) {
      files.push(fullPath)
    }
  }
  return files
}

function main() {
  const files = listJsonFiles(DATA_DIR)
  let hasError = false
  let totalEntries = 0
  const seenIds = new Set<string>()

  if (files.length === 0) {
    console.warn(`Nenhum arquivo .json encontrado em ${DATA_DIR}`)
  }

  for (const file of files) {
    const relative = path.relative(process.cwd(), file)
    let json: unknown
    try {
      json = JSON.parse(fs.readFileSync(file, "utf-8"))
    } catch (error) {
      hasError = true
      console.error(`✗ ${relative}: JSON inválido — ${(error as Error).message}`)
      continue
    }

    const result = entryFileSchema.safeParse(json)
    if (!result.success) {
      hasError = true
      console.error(`✗ ${relative}:`)
      for (const issue of result.error.issues) {
        console.error(`    [${issue.path.join(".")}] ${issue.message}`)
      }
      continue
    }

    for (const entry of result.data) {
      if (seenIds.has(entry.id)) {
        hasError = true
        console.error(`✗ ${relative}: id duplicado "${entry.id}"`)
      }
      seenIds.add(entry.id)
    }

    totalEntries += result.data.length
    console.log(`✓ ${relative} (${result.data.length} itens)`)
  }

  console.log(
    `\n${files.length} arquivo(s) verificados, ${totalEntries} item(ns) no total.`
  )

  if (hasError) {
    console.error("\nValidação falhou.")
    process.exit(1)
  }
  console.log("Todos os arquivos de dados são válidos.")
}

main()
