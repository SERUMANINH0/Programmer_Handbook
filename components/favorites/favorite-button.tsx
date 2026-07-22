"use client"

import { Bookmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useFavoritesStore } from "@/lib/store/favorites.store"
import { cn } from "@/lib/utils"

export function FavoriteButton({
  entryId,
  className,
}: {
  entryId: string
  className?: string
}) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(entryId))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(entryId)
      }}
      className={cn("shrink-0", className)}
    >
      <Bookmark className={cn("size-4", isFavorite && "fill-brand text-brand")} />
    </Button>
  )
}
