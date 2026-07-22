import ptBR from "./pt-BR"
import type { Locale } from "@/types/settings"

const dictionaries: Record<Locale, typeof ptBR> = {
  "pt-BR": ptBR,
}

function resolvePath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  )
}

/**
 * Tradução simples por chave em "dot.path" (ex: "study.quiz.score").
 * Só existe pt-BR hoje, mas a assinatura já suporta locale para o futuro.
 */
export function t(
  key: string,
  vars?: Record<string, string | number>,
  locale: Locale = "pt-BR"
): string {
  const dictionary = dictionaries[locale]
  const value = resolvePath(dictionary, key)
  if (typeof value !== "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] chave ausente: "${key}"`)
    }
    return key
  }
  return interpolate(value, vars)
}

export { ptBR }
export type { Dictionary } from "./pt-BR"
