export interface QuizOption {
  id: string
  label: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  entryId: string
  prompt: string
  options: QuizOption[]
  explanation?: string
}

export interface QuizSessionConfig {
  group?: string
  slug?: string
  difficulty?: string
  questionCount: number
}

export interface QuizAnswer {
  questionId: string
  selectedOptionId: string
  correct: boolean
}

export interface QuizResult {
  total: number
  correct: number
  answers: QuizAnswer[]
}
