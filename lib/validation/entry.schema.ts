import { z } from "zod"

export const difficultySchema = z.enum(["iniciante", "intermediario", "avancado"])

export const entryParameterSchema = z.object({
  name: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
  defaultValue: z.string().optional(),
})

export const entryFlagSchema = z.object({
  flag: z.string(),
  description: z.string(),
})

export const externalReferenceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
})

export const entrySchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  syntax: z.string().optional(),
  example: z.string().optional(),
  result: z.string().optional(),
  shortcut: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  parameters: z.array(entryParameterSchema).optional(),
  flags: z.array(entryFlagSchema).optional(),
  returns: z.string().optional(),
  notes: z.array(z.string()).optional(),
  bestPractices: z.array(z.string()).optional(),
  commonMistakes: z.array(z.string()).optional(),
  relatedCommands: z.array(z.string()).optional(),
  difficulty: difficultySchema,
  platform: z.array(z.string()).optional(),
  language: z.string().optional(),
  version: z.string().optional(),
  officialDocumentation: z.string().url().optional(),
  externalReferences: z.array(externalReferenceSchema).optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  favorite: z.boolean().optional(),
  updatedAt: z.string(),
})

export const entryFileSchema = z.array(entrySchema)

export type EntryInput = z.infer<typeof entrySchema>
