import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import {
  getAllCategorySummaries,
  getGroups,
  getTotalEntryCount,
} from "@/lib/data/repository"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("about.title") }

export default function SobrePage() {
  const totalEntries = getTotalEntryCount()
  const totalCategories = getAllCategorySummaries().length
  const totalGroups = getGroups().length

  return (
    <div className="container mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("about.title")} />
      <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
        <p>
          O <strong className="text-foreground">{t("app.name")}</strong> é uma biblioteca
          gratuita de referência rápida para programadores: cheat sheets, flashcards, quiz
          e um modo wallpaper, tudo funcionando offline como um Progressive Web App.
        </p>
        <p>
          Todo o conteúdo é armazenado em arquivos JSON versionados neste repositório —
          sem banco de dados, sem backend. Atualmente o catálogo tem{" "}
          <strong className="text-foreground">{totalEntries}</strong> itens em{" "}
          <strong className="text-foreground">{totalCategories}</strong> categorias,
          organizados em <strong className="text-foreground">{totalGroups}</strong> grupos
          temáticos.
        </p>
        <p>
          Quer contribuir com novas categorias ou expandir as existentes? Veja o guia em{" "}
          <code className="bg-muted rounded px-1.5 py-0.5">docs/CONTRIBUTING.md</code> no
          repositório do projeto.
        </p>
      </div>
    </div>
  )
}
