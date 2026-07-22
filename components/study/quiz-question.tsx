"use client"

import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { QuizQuestion } from "@/types/quiz"

export function QuizQuestionView({
  question,
  selectedOptionId,
  onSelect,
}: {
  question: QuizQuestion
  selectedOptionId: string | null
  onSelect: (optionId: string) => void
}) {
  const hasAnswered = selectedOptionId !== null

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId
          const showCorrect = hasAnswered && option.isCorrect
          const showWrong = hasAnswered && isSelected && !option.isCorrect

          return (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              data-testid="quiz-option"
              disabled={hasAnswered}
              onClick={() => onSelect(option.id)}
              className={cn(
                "h-auto justify-start px-4 py-3 text-left whitespace-normal",
                showCorrect && "border-difficulty-iniciante bg-difficulty-iniciante/10",
                showWrong && "border-difficulty-avancado bg-difficulty-avancado/10"
              )}
            >
              {showCorrect ? <Check className="size-4 shrink-0" /> : null}
              {showWrong ? <X className="size-4 shrink-0" /> : null}
              <span>{option.label}</span>
            </Button>
          )
        })}
      </div>
      {hasAnswered && question.explanation ? (
        <p className="text-muted-foreground text-sm">{question.explanation}</p>
      ) : null}
    </div>
  )
}
