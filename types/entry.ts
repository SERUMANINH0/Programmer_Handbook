export type Difficulty = "iniciante" | "intermediario" | "avancado"

export interface EntryParameter {
  name: string
  description: string
  required?: boolean
  defaultValue?: string
}

export interface EntryFlag {
  flag: string
  description: string
}

export interface ExternalReference {
  label: string
  url: string
}

/**
 * Unidade central de conteúdo do Programmer Handbook.
 * Um Entry representa um comando, conceito, padrão ou trecho de referência
 * dentro de uma categoria (arquivo JSON) e um grupo (pasta em data/).
 */
export interface Entry {
  id: string
  category: string
  subcategory?: string
  title: string
  description: string
  syntax?: string
  example?: string
  result?: string
  shortcut?: string
  aliases?: string[]
  parameters?: EntryParameter[]
  flags?: EntryFlag[]
  returns?: string
  notes?: string[]
  bestPractices?: string[]
  commonMistakes?: string[]
  relatedCommands?: string[]
  difficulty: Difficulty
  platform?: string[]
  language?: string
  version?: string
  officialDocumentation?: string
  externalReferences?: ExternalReference[]
  tags?: string[]
  keywords?: string[]
  favorite?: boolean
  updatedAt: string
}

/** Entry "achatado" com metadados de localização, usado no índice de busca. */
export interface IndexedEntry extends Entry {
  group: string
  slug: string
}
