import { expect, test } from "@playwright/test"

test("favoriting an entry persists across reload and shows up on /favoritos", async ({
  page,
}) => {
  await page.goto("/entrada/devops/git/git-commit")

  const favoriteButton = page.getByRole("button", { name: /adicionar aos favoritos/i })
  await favoriteButton.click()
  await expect(page.getByRole("button", { name: /remover dos favoritos/i })).toBeVisible()

  await page.reload()
  await expect(page.getByRole("button", { name: /remover dos favoritos/i })).toBeVisible()

  await page.goto("/favoritos")
  await expect(page.getByRole("link", { name: /git commit/i })).toBeVisible()
})
