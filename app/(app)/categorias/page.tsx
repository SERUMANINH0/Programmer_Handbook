import type { Metadata } from "next"

import { GroupCard } from "@/components/categories/group-card"
import { PageHeader } from "@/components/common/page-header"
import { getAllCategorySummaries, getGroups } from "@/lib/data/repository"
import { getGroupMeta } from "@/lib/categories/registry"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("categories.title") }

export default function CategoriasPage() {
  const groups = getGroups()
  const summaries = getAllCategorySummaries()

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("categories.title")} subtitle={t("categories.subtitle")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((groupId) => {
          const groupSummaries = summaries.filter((s) => s.group === groupId)
          const entryCount = groupSummaries.reduce((sum, s) => sum + s.entryCount, 0)
          return (
            <GroupCard
              key={groupId}
              group={getGroupMeta(groupId)}
              categoryCount={groupSummaries.length}
              entryCount={entryCount}
            />
          )
        })}
      </div>
    </div>
  )
}
