import { expect, test } from "@playwright/test"

test("searches for an entry and finds a matching result", async ({ page }) => {
  await page.goto("/pesquisar")

  await page.getByPlaceholder(/pesquise por nome/i).fill("docker")
  await expect(page.getByRole("link", { name: /docker run/i })).toBeVisible()
})

test("filters search results by group", async ({ page }) => {
  await page.goto("/pesquisar")

  await page.getByPlaceholder(/pesquise por nome/i).fill("a")
  const groupTrigger = page.getByRole("combobox").first()
  await groupTrigger.click()
  await page.getByRole("option", { name: "Linguagens" }).click()

  await expect(page.getByText(/\d+ resultado/)).toBeVisible()
})
