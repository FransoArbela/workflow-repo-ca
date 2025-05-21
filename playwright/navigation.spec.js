import { test, expect } from "@playwright/test";

test("Verifies that when the venue details page loads there are the words “Venue details” in the heading", async ({
  page,
}) => {
  // 1. Go to homepage
  await page.goto("http://localhost:5500/");

  // 2. Wait for venue list to load
  await page.waitForSelector("#venue-container a");

  // 3. Click the first venue card
  await page.locator("#venue-container a").first().click();

  // 4. Check that the venue details page has the correct heading
  await expect(page.locator("h1")).toHaveText(/Venue details/i);
});
