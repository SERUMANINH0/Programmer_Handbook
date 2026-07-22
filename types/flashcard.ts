export type FlashcardReview = "unknown" | "known"

export interface FlashcardDeckConfig {
  group?: string
  slug?: string
  difficulty?: string
  shuffle: boolean
}

export interface FlashcardProgress {
  entryId: string
  review: FlashcardReview
  reviewedAt: string
}
