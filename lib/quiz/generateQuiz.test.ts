import { describe, expect, it } from "vitest"

import { generateQuiz } from "./generateQuiz"
import { getAllEntriesFlat } from "@/lib/data/repository"

const entries = getAllEntriesFlat()

describe("generateQuiz", () => {
  it("generates the requested number of questions (capped by pool size)", () => {
    const questions = generateQuiz(entries, { questionCount: 5 })
    expect(questions.length).toBe(5)
  })

  it("each question has exactly one correct option", () => {
    const questions = generateQuiz(entries, { questionCount: 10 })
    for (const question of questions) {
      const correctOptions = question.options.filter((option) => option.isCorrect)
      expect(correctOptions.length).toBe(1)
    }
  })

  it("options contain no duplicate ids within a question", () => {
    const questions = generateQuiz(entries, { questionCount: 10 })
    for (const question of questions) {
      const ids = question.options.map((option) => option.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it("respects the group filter when the pool is large enough", () => {
    const questions = generateQuiz(entries, { group: "devops", questionCount: 3 })
    for (const question of questions) {
      const entry = entries.find((e) => e.id === question.entryId)
      expect(entry?.group).toBe("devops")
    }
  })
})
