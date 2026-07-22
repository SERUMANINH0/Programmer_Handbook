import { expect, test } from "@playwright/test"

test("wallpaper mode renders fullscreen without the app header/nav", async ({ page }) => {
  await page.goto("/wallpaper")

  await expect(page.getByRole("banner")).toHaveCount(0)
  await expect(page.getByRole("navigation")).toHaveCount(0)
  await expect(page.getByText(/para trocar de categoria/i)).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(page).toHaveURL("/")
})
