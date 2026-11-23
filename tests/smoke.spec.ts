import { test, expect } from "@playwright/test";

const routes = ["/", "/puppies", "/gone-home", "/happy-families", "/how-it-works", "/faq", "/contact", "/puppies/puppy", "/puppies/maltipo"];

for (const r of routes) {
  test(`route ${r} renders`, async ({ page }) => {
    const res = await page.goto(r);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
}

test("unknown route is 404", async ({ page }) => {
  expect((await page.goto("/nope"))?.status()).toBe(404);
});

for (const w of [390, 768, 1440]) {
  test(`home has no horizontal overflow at ${w}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto("/");
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(o).toBeLessThanOrEqual(0);
  });
}

test("pomeranian filter shows 4", async ({ page }) => {
  await page.goto("/puppies?breed=pomeranian");
  await expect(page.locator("main a[href^='/puppies/']")).toHaveCount(4);
});
