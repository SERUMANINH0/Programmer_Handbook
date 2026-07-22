import Link from "next/link"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CategoryGroupMeta } from "@/types/category"

export function GroupCard({
  group,
  categoryCount,
  entryCount,
}: {
  group: CategoryGroupMeta
  categoryCount: number
  entryCount: number
}) {
  const Icon = group.icon

  return (
    <Link href={`/categorias/${group.id}`} className="group block">
      <Card className="group-hover:border-brand/50 flex h-full flex-col gap-3 p-5 transition-all group-hover:shadow-md">
        <div
          className={cn(
            "bg-brand/10 text-brand flex size-10 items-center justify-center rounded-lg"
          )}
        >
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold">{group.label}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {group.description}
          </p>
        </div>
        <p className="text-muted-foreground mt-auto text-xs">
          {categoryCount} categoria{categoryCount === 1 ? "" : "s"} · {entryCount} itens
        </p>
      </Card>
    </Link>
  )
}
