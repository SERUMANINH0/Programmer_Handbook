import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { FlashcardDeck } from "@/components/study/flashcard-deck"
import { FocusModeToggle } from "@/components/study/focus-mode-toggle"
import { PomodoroTimer } from "@/components/study/pomodoro-timer"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("study.flashcards.title") }

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("study.flashcards.title")} actions={<FocusModeToggle />} />
      <FlashcardDeck />
      <PomodoroTimer />
    </div>
  )
}
