import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { QuizSession } from "@/components/study/quiz-session"
import { FocusModeToggle } from "@/components/study/focus-mode-toggle"
import { t } from "@/lib/i18n"

export const metadata: Metadata = { title: t("study.quiz.title") }

export default function QuizPage() {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader title={t("study.quiz.title")} actions={<FocusModeToggle />} />
      <QuizSession />
    </div>
  )
}
