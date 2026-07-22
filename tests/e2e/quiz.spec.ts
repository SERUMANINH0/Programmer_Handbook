import { expect, test } from "@playwright/test"

test("completes a full quiz session and reaches the result screen", async ({ page }) => {
  await page.goto("/quiz")

  await page.getByRole("button", { name: /começar quiz/i }).click()

  for (let i = 0; i < 10; i++) {
    if (
      await page
        .getByText(/você acertou/i)
        .isVisible()
        .catch(() => false)
    )
      break
    await page.getByTestId("quiz-option").first().click()
    await page.getByTestId("quiz-next").click()
  }

  await expect(page.getByText(/você acertou/i)).toBeVisible()
})
