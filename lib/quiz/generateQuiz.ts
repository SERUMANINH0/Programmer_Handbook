import type { QuizOption, QuizQuestion, QuizSessionConfig } from "@/types/quiz"
import type { IndexedEntry } from "@/types/entry"

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function filterPool(entries: IndexedEntry[], config: QuizSessionConfig): IndexedEntry[] {
  return entries.filter((entry) => {
    if (config.group && entry.group !== config.group) return false
    if (config.slug && entry.slug !== config.slug) return false
    if (config.difficulty && entry.difficulty !== config.difficulty) return false
    return true
  })
}

const MIN_OPTIONS = 4

export function generateQuiz(
  allEntries: IndexedEntry[],
  config: QuizSessionConfig
): QuizQuestion[] {
  const pool = filterPool(allEntries, config)
  const questionSource = pool.length >= MIN_OPTIONS ? pool : allEntries
  const distractorSource = allEntries.length >= MIN_OPTIONS ? allEntries : questionSource

  const chosenEntries = shuffle(questionSource).slice(0, config.questionCount)

  return chosenEntries.map((entry): QuizQuestion => {
    const distractors = shuffle(
      distractorSource.filter((candidate) => candidate.id !== entry.id)
    ).slice(0, MIN_OPTIONS - 1)

    const options: QuizOption[] = shuffle([
      { id: entry.id, label: entry.description, isCorrect: true },
      ...distractors.map((distractor) => ({
        id: distractor.id,
        label: distractor.description,
        isCorrect: false,
      })),
    ])

    return {
      id: `quiz-${entry.id}`,
      entryId: entry.id,
      prompt: `Qual é a descrição correta de "${entry.title}"?`,
      options,
      explanation: entry.bestPractices?.[0],
    }
  })
}
