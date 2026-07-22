import { describe, expect, it } from "vitest"

import { slugify, titleCaseFromSlug } from "./slugify"

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Clean Architecture")).toBe("clean-architecture")
  })

  it("strips diacritics", () => {
    expect(slugify("Configuração")).toBe("configuracao")
  })

  it("trims leading/trailing separators", () => {
    expect(slugify("  --Docker Compose--  ")).toBe("docker-compose")
  })
})

describe("titleCaseFromSlug", () => {
  it("converts kebab-case to Title Case", () => {
    expect(titleCaseFromSlug("windows-powershell")).toBe("Windows Powershell")
  })
})
