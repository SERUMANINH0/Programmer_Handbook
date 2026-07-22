"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { DifficultyBadge } from "@/components/entries/difficulty-badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { IndexedEntry } from "@/types/entry"

export function Flashcard({
  entry,
  flipped,
  onFlip,
}: {
  entry: IndexedEntry
  flipped: boolean
  onFlip: () => void
}) {
  return (
    <div className="[perspective:1200px]" onClick={onFlip}>
      <motion.div
        className="relative h-72 w-full cursor-pointer [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center [backface-visibility:hidden]"
          )}
        >
          <p className="text-muted-foreground text-xs font-medium">
            {entry.category}
            {entry.subcategory ? ` · ${entry.subcategory}` : ""}
          </p>
          <h3 className="text-xl font-semibold">{entry.title}</h3>
          {entry.shortcut ? (
            <code className="bg-muted rounded-md px-2 py-1 font-mono text-sm">
              {entry.shortcut}
            </code>
          ) : null}
          <DifficultyBadge difficulty={entry.difficulty} />
        </Card>

        <Card className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center gap-3 overflow-y-auto p-6 text-center [backface-visibility:hidden]">
          <p className="text-sm">{entry.description}</p>
          {entry.example ? (
            <code className="bg-muted w-full truncate rounded-md px-2 py-1 font-mono text-xs">
              {entry.example}
            </code>
          ) : null}
        </Card>
      </motion.div>
    </div>
  )
}
