import { expect, test } from "@playwright/test"

test("navigates from home to a category and into an entry detail", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

  await page.getByRole("link", { name: "Categorias" }).first().click()
  await expect(page).toHaveURL("/categorias")

  await page
    .getByRole("link", { name: /DevOps/i })
    .first()
    .click()
  await expect(page).toHaveURL(/\/categorias\/devops$/)

  await page.getByRole("link", { name: /Git/i }).first().click()
  await expect(page).toHaveURL(/\/categorias\/devops\/git$/)

  await page
    .getByRole("link", { name: /git commit/i })
    .first()
    .click()
  await expect(page).toHaveURL(/\/entrada\/devops\/git\/git-commit$/)
  await expect(page.getByRole("heading", { name: "git commit" })).toBeVisible()
})
