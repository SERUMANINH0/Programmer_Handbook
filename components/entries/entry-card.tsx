import Link from "next/link"

import { DifficultyBadge } from "@/components/entries/difficulty-badge"
import { FavoriteButton } from "@/components/favorites/favorite-button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { IndexedEntry } from "@/types/entry"

export function EntryCard({
  entry,
  className,
}: {
  entry: IndexedEntry
  className?: string
}) {
  const preview = entry.shortcut ?? entry.syntax ?? entry.description

  return (
    <Link
      href={`/entrada/${entry.group}/${entry.slug}/${entry.id}`}
      className="group block focus-visible:outline-none"
    >
      <Card
        className={cn(
          "group-hover:border-brand/50 group-focus-visible:ring-ring flex h-full flex-col gap-3 p-4 transition-all group-hover:shadow-md group-focus-visible:ring-2",
          className
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-muted-foreground truncate text-xs font-medium">
              {entry.category}
              {entry.subcategory ? ` · ${entry.subcategory}` : ""}
            </p>
            <h3 className="truncate text-base font-semibold">{entry.title}</h3>
          </div>
          <FavoriteButton entryId={entry.id} />
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm">{entry.description}</p>

        {preview ? (
          <code className="bg-muted/60 truncate rounded-md px-2 py-1 font-mono text-xs">
            {preview}
          </code>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-1">
          <DifficultyBadge difficulty={entry.difficulty} />
        </div>
      </Card>
    </Link>
  )
}
