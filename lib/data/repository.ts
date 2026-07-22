import fs from "node:fs"
import path from "node:path"
import { cache } from "react"

import type { CategorySummary } from "@/types/category"
import type { Entry, IndexedEntry } from "@/types/entry"
import { entryFileSchema } from "@/lib/validation/entry.schema"
import { titleCaseFromSlug } from "@/lib/utils/slugify"

/**
 * Camada de acesso a dados: só deve ser importada por Server Components,
 * scripts ou testes. Lê os arquivos de data/**\/*.json diretamente do disco.
 * Adicionar um novo .json em uma pasta existente aparece automaticamente
 * aqui — nada precisa ser registrado em código.
 */

const DATA_DIR = path.join(process.cwd(), "data")

function readGroupDirs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return []
  return fs
    .readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function readCategoryFiles(group: string): string[] {
  const groupDir = path.join(DATA_DIR, group)
  if (!fs.existsSync(groupDir)) return []
  return fs
    .readdirSync(groupDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
    .sort()
}

function readCategoryEntries(group: string, slug: string): Entry[] {
  const filePath = path.join(DATA_DIR, group, `${slug}.json`)
  if (!fs.existsSync(filePath)) return []
  const raw = fs.readFileSync(filePath, "utf-8")
  const parsed = entryFileSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) {
    throw new Error(
      `Falha ao validar data/${group}/${slug}.json: ${parsed.error.message}`
    )
  }
  return parsed.data
}

export const getGroups = cache((): string[] => readGroupDirs())

export const getCategoriesForGroup = cache((group: string): string[] =>
  readCategoryFiles(group)
)

export const getEntries = cache((group: string, slug: string): Entry[] =>
  readCategoryEntries(group, slug)
)

export const getEntryById = cache(
  (group: string, slug: string, id: string): Entry | undefined =>
    getEntries(group, slug).find((entry) => entry.id === id)
)

export const getAllCategorySummaries = cache((): CategorySummary[] => {
  const summaries: CategorySummary[] = []
  for (const group of getGroups()) {
    for (const slug of getCategoriesForGroup(group)) {
      const entries = getEntries(group, slug)
      summaries.push({
        group,
        slug,
        title: entries[0]?.category ?? titleCaseFromSlug(slug),
        entryCount: entries.length,
      })
    }
  }
  return summaries
})

export const getAllEntriesFlat = cache((): IndexedEntry[] => {
  const flat: IndexedEntry[] = []
  for (const group of getGroups()) {
    for (const slug of getCategoriesForGroup(group)) {
      for (const entry of getEntries(group, slug)) {
        flat.push({ ...entry, group, slug })
      }
    }
  }
  return flat
})

export const getTotalEntryCount = cache((): number => getAllEntriesFlat().length)
