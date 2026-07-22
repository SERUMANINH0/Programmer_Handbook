"use client"

import * as React from "react"

import { QuizQuestionView } from "@/components/study/quiz-question"
import { QuizResultView } from "@/components/study/quiz-result"
import { LoadingSkeletonGrid } from "@/components/common/loading-skeleton-grid"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchIndex } from "@/hooks/useSearchIndex"
import { getGroupMeta } from "@/lib/categories/registry"
import { generateQuiz } from "@/lib/quiz/generateQuiz"
import { t } from "@/lib/i18n"
import { useStudyStore } from "@/lib/store/study.store"
import type { QuizAnswer, QuizQuestion, QuizSessionConfig } from "@/types/quiz"

type Phase = "config" | "playing" | "result"

export function QuizSession() {
  const { entries, isLoading } = useSearchIndex()
  const setLastQuizResult = useStudyStore((state) => state.setLastQuizResult)

  const [phase, setPhase] = React.useState<Phase>("config")
  const [config, setConfig] = React.useState<QuizSessionConfig>({ questionCount: 10 })
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null)
  const [answers, setAnswers] = React.useState<QuizAnswer[]>([])

  const groups = React.useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.group))).sort(),
    [entries]
  )

  function startQuiz() {
    const generated = generateQuiz(entries, config)
    setQuestions(generated)
    setCurrentIndex(0)
    setAnswers([])
    setSelectedOptionId(null)
    setPhase("playing")
  }

  function handleSelect(optionId: string) {
    if (selectedOptionId) return
    const question = questions[currentIndex]
    const option = question.options.find((o) => o.id === optionId)
    setSelectedOptionId(optionId)
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selectedOptionId: optionId,
        correct: option?.isCorrect ?? false,
      },
    ])
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1)
      setSelectedOptionId(null)
    } else {
      const correct = answers.filter((a) => a.correct).length
      const result = { total: questions.length, correct, answers }
      setLastQuizResult(result)
      setPhase("result")
    }
  }

  if (isLoading) return <LoadingSkeletonGrid count={1} />

  if (phase === "config") {
    return (
      <div className="flex max-w-md flex-col gap-4">
        <Select
          value={config.group ?? "all"}
          onValueChange={(value) =>
            setConfig((c) => ({ ...c, group: value === "all" ? undefined : value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("search.filters.group")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.filters.group")}</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {getGroupMeta(group).label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={config.difficulty ?? "all"}
          onValueChange={(value) =>
            setConfig((c) => ({ ...c, difficulty: value === "all" ? undefined : value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("search.filters.difficulty")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.filters.difficulty")}</SelectItem>
            {(["iniciante", "intermediario", "avancado"] as const).map((level) => (
              <SelectItem key={level} value={level}>
                {t(`common.difficultyLevels.${level}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={startQuiz} disabled={entries.length === 0}>
          {t("study.quiz.start")}
        </Button>
      </div>
    )
  }

  if (phase === "result") {
    const correct = answers.filter((a) => a.correct).length
    return (
      <QuizResultView
        result={{ total: questions.length, correct, answers }}
        onRestart={() => setPhase("config")}
      />
    )
  }

  const question = questions[currentIndex]
  if (!question) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground text-sm">
        {currentIndex + 1} / {questions.length}
      </p>
      <QuizQuestionView
        question={question}
        selectedOptionId={selectedOptionId}
        onSelect={handleSelect}
      />
      {selectedOptionId ? (
        <Button onClick={handleNext} data-testid="quiz-next" className="self-start">
          {currentIndex + 1 < questions.length
            ? t("study.quiz.next")
            : t("study.quiz.finish")}
        </Button>
      ) : null}
    </div>
  )
}
