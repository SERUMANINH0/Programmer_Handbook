import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { ShortcutGroupTabs } from "@/components/shortcuts/shortcut-group-tabs"
import { getAllEntriesFlat } from "@/lib/data/repository"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("shortcuts.title") }

export default function AtalhosPage() {
  const entriesWithShortcut = getAllEntriesFlat().filter((entry) => entry.shortcut)

  const byContext = new Map<string, typeof entriesWithShortcut>()
  for (const entry of entriesWithShortcut) {
    const context = entry.category
    const existing = byContext.get(context) ?? []
    existing.push(entry)
    byContext.set(context, existing)
  }

  const groups = Array.from(byContext.entries())
    .map(([context, entries]) => ({ context, entries }))
    .sort((a, b) => a.context.localeCompare(b.context))

  return (
    <div className="container mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("shortcuts.title")} subtitle={t("shortcuts.subtitle")} />
      <ShortcutGroupTabs groups={groups} />
    </div>
  )
}
