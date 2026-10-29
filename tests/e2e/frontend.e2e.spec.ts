import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the Enrichers homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle('Enrichers')

    const heading = page.locator('h1').first()

    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Trade Pakistan's/i)
    await expect(heading).toContainText(/licensed/i)
  })
})
