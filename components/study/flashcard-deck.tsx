"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react"

import { Flashcard } from "@/components/study/flashcard"
import { EmptyState } from "@/components/common/empty-state"
import { LoadingSkeletonGrid } from "@/components/common/loading-skeleton-grid"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { getGroupMeta } from "@/lib/categories/registry"
import { t } from "@/lib/i18n"
import { useStudyStore } from "@/lib/store/study.store"
import type { IndexedEntry } from "@/types/entry"

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function FlashcardDeck() {
  const { entries, isLoading } = useSearchIndex()
  const markFlashcard = useStudyStore((state) => state.markFlashcard)
  const getUnknownIds = useStudyStore((state) => state.getUnknownIds)

  const [group, setGroup] = React.useState<string>("all")
  const [shuffle, setShuffle] = React.useState(false)
  const [reviewMode, setReviewMode] = React.useState(false)
  const [autoAdvance, setAutoAdvance] = React.useState(false)
  const [deck, setDeck] = React.useState<IndexedEntry[]>([])
  const [index, setIndex] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)

  const groups = React.useMemo(
    () => Array.from(new Set(entries.map((e) => e.group))).sort(),
    [entries]
  )

  React.useEffect(() => {
    let pool = entries
    if (group !== "all") pool = pool.filter((e) => e.group === group)
    if (reviewMode) {
      const unknownIds = new Set(getUnknownIds())
      pool = pool.filter((e) => unknownIds.has(e.id))
    }
    setDeck(shuffle ? shuffleArray(pool) : pool)
    setIndex(0)
    setFlipped(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, group, reviewMode, shuffle])

  React.useEffect(() => {
    if (!autoAdvance || deck.length === 0) return
    const interval = setInterval(() => {
      setFlipped((current) => {
        if (!current) return true
        setIndex((i) => (i + 1 < deck.length ? i + 1 : 0))
        return false
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [autoAdvance, deck.length])

  function goTo(delta: number) {
    setFlipped(false)
    setIndex((i) => Math.min(Math.max(i + delta, 0), deck.length - 1))
  }

  function handleMark(review: "known" | "unknown") {
    const current = deck[index]
    if (!current) return
    markFlashcard(current.id, review)
    goTo(1)
  }

  if (isLoading) return <LoadingSkeletonGrid count={1} />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder={t("search.filters.group")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.filters.group")}</SelectItem>
            {groups.map((g) => (
              <SelectItem key={g} value={g}>
                {getGroupMeta(g).label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="flex items-center gap-2 text-sm">
          <Switch checked={shuffle} onCheckedChange={setShuffle} />
          {t("study.flashcards.shuffle")}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={reviewMode} onCheckedChange={setReviewMode} />
          {t("study.flashcards.reviewMode")}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={autoAdvance} onCheckedChange={setAutoAdvance} />
          {t("study.flashcards.autoAdvance")}
        </label>
      </div>

      {deck.length === 0 ? (
        <EmptyState icon={Shuffle} title={t("study.flashcards.finished")} />
      ) : (
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <p className="text-muted-foreground text-center text-sm">
            {t("study.flashcards.progress", { current: index + 1, total: deck.length })}
          </p>
          <Flashcard
            entry={deck[index]}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goTo(-1)}
              disabled={index === 0}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleMark("unknown")}>
                {t("study.flashcards.dontKnow")}
              </Button>
              <Button onClick={() => handleMark("known")}>
                {t("study.flashcards.know")}
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goTo(1)}
              disabled={index === deck.length - 1}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
