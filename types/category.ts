import type { LucideIcon } from "lucide-react"

/** Um "grupo" é uma pasta em data/ (ex: languages, frameworks, devops...). */
export interface CategoryGroupMeta {
  id: string
  label: string
  description: string
  icon: LucideIcon
  color: string
}

/** Uma "categoria" é um arquivo .json dentro de um grupo (ex: data/devops/git.json). */
export interface CategorySummary {
  group: string
  slug: string
  title: string
  description?: string
  entryCount: number
}
