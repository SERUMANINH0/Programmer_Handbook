"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { t } from "@/lib/i18n"
import type { QuizResult } from "@/types/quiz"

export function QuizResultView({
  result,
  onRestart,
}: {
  result: QuizResult
  onRestart: () => void
}) {
  const percentage =
    result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <p className="text-3xl font-semibold">
        {t("study.quiz.score", { correct: result.correct, total: result.total })}
      </p>
      <Progress value={percentage} className="w-full max-w-sm" />
      <Button onClick={onRestart}>{t("study.quiz.restart")}</Button>
    </div>
  )
}
