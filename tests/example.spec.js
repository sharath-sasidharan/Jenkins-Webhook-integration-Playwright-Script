// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link @dev", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("frames handling", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  const frame = page.frameLocator('frame[src*="frame_3.html"]');
  await frame.locator('input[name*="mytext3"]').fill("great");
});
test("Auto Sugesstion dropdown - flipkart", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  const productName = "watch";
  const searchBox = page.locator("input.Pke_EE");
  await searchBox.waitFor(); // wait for input to be ready
  await searchBox.pressSequentially(productName, { delay: 200 });
  const suggestions = page.locator("ul._1sFryS li"); // Updated selector
  await suggestions.first().waitFor({ timeout: 5000 });

  const count = await suggestions.count();
  console.log("Suggestion count:", count);

  for (let i = 0; i < count; i++) {
    const suggestionText = await suggestions.nth(i).locator("a").textContent();
    console.log(suggestionText, "===");
    if (suggestionText?.includes("wild stone perfume")) {
      await suggestions.nth(i).locator("a").click();
      break;
    }
  }
});
