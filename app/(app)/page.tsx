import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { RecentEntries } from "@/components/favorites/recent-entries"
import { GroupCard } from "@/components/categories/group-card"
import { HomeSearch } from "@/components/home/home-search"
import { Button } from "@/components/ui/button"
import { getGroupMeta } from "@/lib/categories/registry"
import {
  getAllCategorySummaries,
  getGroups,
  getTotalEntryCount,
} from "@/lib/data/repository"
import { t } from "@/lib/i18n"

export default function HomePage() {
  const groups = getGroups()
  const summaries = getAllCategorySummaries()
  const totalEntries = getTotalEntryCount()

  const featuredGroups = groups.slice(0, 6)

  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12">
      <section className="flex flex-col items-center gap-6 py-8 text-center">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {t("home.heroTitle")}
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">{t("home.heroSubtitle")}</p>
        <HomeSearch />
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
          <span>
            <strong className="text-foreground">{totalEntries}</strong>{" "}
            {t("home.totalEntries")}
          </span>
          <span>
            <strong className="text-foreground">{summaries.length}</strong>{" "}
            {t("home.totalCategories")}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t("home.exploreCategories")}</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/categorias">
              {t("common.seeAll")}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGroups.map((groupId) => {
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{t("favorites.recent")}</h2>
        <RecentEntries limit={3} />
      </section>
    </div>
  )
}
