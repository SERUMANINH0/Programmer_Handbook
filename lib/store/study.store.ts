import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { FlashcardReview } from "@/types/flashcard"
import type { QuizResult } from "@/types/quiz"

interface StudyState {
  flashcardReviews: Record<string, FlashcardReview>
  lastQuizResult: QuizResult | null
  focusMode: boolean
  markFlashcard: (entryId: string, review: FlashcardReview) => void
  resetFlashcardReviews: () => void
  setLastQuizResult: (result: QuizResult) => void
  setFocusMode: (enabled: boolean) => void
  getUnknownIds: () => string[]
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      flashcardReviews: {},
      lastQuizResult: null,
      focusMode: false,
      markFlashcard: (entryId, review) =>
        set((state) => ({
          flashcardReviews: { ...state.flashcardReviews, [entryId]: review },
        })),
      resetFlashcardReviews: () => set({ flashcardReviews: {} }),
      setLastQuizResult: (result) => set({ lastQuizResult: result }),
      setFocusMode: (enabled) => set({ focusMode: enabled }),
      getUnknownIds: () =>
        Object.entries(get().flashcardReviews)
          .filter(([, review]) => review === "unknown")
          .map(([id]) => id),
    }),
    { name: "ph-study", skipHydration: true }
  )
)
