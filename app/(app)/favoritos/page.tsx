import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { FavoritesGrid } from "@/components/favorites/favorites-grid"
import { MostAccessedList } from "@/components/favorites/most-accessed-list"
import { MostSearchedList } from "@/components/favorites/most-searched-list"
import { RecentEntries } from "@/components/favorites/recent-entries"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("favorites.title") }

export default function FavoritosPage() {
  return (
    <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("favorites.title")} subtitle={t("favorites.subtitle")} />
      <Tabs defaultValue="favorites">
        <TabsList>
          <TabsTrigger value="favorites">{t("favorites.title")}</TabsTrigger>
          <TabsTrigger value="recent">{t("favorites.recent")}</TabsTrigger>
          <TabsTrigger value="most-accessed">{t("favorites.mostAccessed")}</TabsTrigger>
          <TabsTrigger value="most-searched">{t("favorites.mostSearched")}</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites" className="pt-4">
          <FavoritesGrid />
        </TabsContent>
        <TabsContent value="recent" className="pt-4">
          <RecentEntries />
        </TabsContent>
        <TabsContent value="most-accessed" className="pt-4">
          <MostAccessedList />
        </TabsContent>
        <TabsContent value="most-searched" className="pt-4">
          <MostSearchedList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
