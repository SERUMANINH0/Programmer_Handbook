"use client"

import { ShortcutTable } from "@/components/shortcuts/shortcut-table"
import { EmptyState } from "@/components/common/empty-state"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/i18n"
import type { IndexedEntry } from "@/types/entry"

export function ShortcutGroupTabs({
  groups,
}: {
  groups: Array<{ context: string; entries: IndexedEntry[] }>
}) {
  if (groups.length === 0) {
    return <EmptyState title={t("common.empty")} />
  }

  return (
    <Tabs defaultValue={groups[0].context}>
      <TabsList className="flex-wrap">
        {groups.map((group) => (
          <TabsTrigger key={group.context} value={group.context}>
            {group.context}
          </TabsTrigger>
        ))}
      </TabsList>
      {groups.map((group) => (
        <TabsContent key={group.context} value={group.context} className="pt-4">
          <ShortcutTable entries={group.entries} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
