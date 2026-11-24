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
  await expect(page.locator(".pp-sketches a[href^='/puppies/']")).toHaveCount(4);
});

// ---- regression checks (added in the final QA pass) ----
test("no console or page errors on any route", async ({ page }) => {
  const errs: string[] = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  for (const r of routes) { await page.goto(r); await page.waitForLoadState("load"); }
  expect(errs).toEqual([]);
});

test("faq search filters and accordion toggles", async ({ page }) => {
  await page.goto("/faq");
  const all = await page.locator("main button[aria-expanded]").count();
  await page.getByPlaceholder(/delivery, Korea/).fill("vaccin");
  const some = await page.locator("main button[aria-expanded]").count();
  expect(some).toBeGreaterThan(0);
  expect(some).toBeLessThan(all);
  const b = page.locator("main button[aria-expanded]").first();
  const was = await b.getAttribute("aria-expanded");
  await b.click();
  await expect(b).toHaveAttribute("aria-expanded", was === "true" ? "false" : "true");
});

test("puppy gallery next button changes the photo", async ({ page }) => {
  await page.goto("/puppies/maltipoo-max-male");
  const img = page.locator("main img").first();
  const before = await img.getAttribute("src");
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect.poll(() => page.locator("main img").first().getAttribute("src")).not.toBe(before);
});

test("enquiry form validates and is honest that nothing is sent", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Post my letter" }).click();
  await expect(page.getByText("This demo doesn't send messages yet")).toHaveCount(0); // required fields block submit
  await page.getByLabel(/Your name/).fill("Test");
  await page.getByLabel(/Phone/).fill("0500000000");
  await page.getByRole("button", { name: "Post my letter" }).click();
  await expect(page.getByText("This demo doesn't send messages yet")).toBeVisible();
  await expect(page.getByText("Letter posted")).toHaveCount(0);
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL(/\/faq$/);
});

test("back/forward and nested refresh work", async ({ page }) => {
  await page.goto("/puppies?breed=pomeranian");
  await page.goto("/faq");
  await page.goBack();
  await expect(page).toHaveURL(/breed=pomeranian/);
  await expect(page.locator(".pp-sketches a[href^='/puppies/']")).toHaveCount(4);
  await page.goForward();
  await expect(page).toHaveURL(/\/faq$/);
  await page.goto("/puppies/maltipoo-max-male");
  await page.reload();
  await expect(page.locator("h1").first()).toBeVisible();
});

test("keyboard: tab reaches a focusable nav link", async ({ page }) => {
  await page.goto("/faq");
  for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
  const tag = await page.evaluate(() => document.activeElement?.tagName);
  expect(["A", "BUTTON", "INPUT"]).toContain(tag);
});

for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]] as const) {
  test(`roaming dog lands in the footer basket at ${w}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await expect.poll(() => page.evaluate(() => { scrollTo(0, document.documentElement.scrollHeight); return document.documentElement.dataset.basket; })).toBe("in");
  });
}

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("home renders without overflow and the basket pup stays visible", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator(".tpf-pup")).toBeVisible();
    await expect(page.locator("[data-roamer]")).toBeHidden(); // no roaming dog under reduced motion
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  });
});

test("curtain: plays on load, then covers and lifts around an internal navigation", async ({ page }) => {
  await page.goto("/");
  const curtain = page.locator(".cu-curtain");
  await expect(curtain).toHaveAttribute("data-state", "idle");
  await page.locator("header a[href='/faq']").first().click();
  await expect(curtain).not.toHaveAttribute("data-state", "idle"); // covering
  await expect(page).toHaveURL(/\/faq$/);
  await expect(curtain).toHaveAttribute("data-state", "idle");
});

test("header hides on scroll down and returns on scroll up", async ({ page }) => {
  await page.goto("/puppies");
  const header = page.locator("header").first();
  await page.evaluate(() => scrollTo(0, 900));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.evaluate(() => scrollTo(0, 500));
  await expect(header).toHaveAttribute("data-hidden", "false");
});

test("phone: dog is docked at the left edge and trots out for the Paths scene", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const left = () => page.evaluate(() => Math.round(document.querySelector("[data-roamer]")!.getBoundingClientRect().left));
  await page.evaluate(() => scrollTo(0, 1500));
  await expect.poll(left).toBe(-72);
  await page.evaluate(() => scrollTo(0, 4200));
  await expect.poll(left).toBe(205);
});

test("tapping the roaming dog cycles its acts with a speech bubble; pup:cue also speaks", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
  const bubble = page.locator("[data-roamer] .pup-bubble");
  await bubble.waitFor({ state: "attached" }); // created once the roamer has hydrated
  await page.locator("[data-roamer]").dispatchEvent("click");
  await expect(bubble).toHaveAttribute("data-show", "true");
  await expect(bubble).toHaveText(/wheee|boing|yip/);
  await page.locator("[data-roamer]").dispatchEvent("click");
  await expect(bubble).toHaveText("woof!");
  await page.evaluate(() => dispatchEvent(new CustomEvent("pup:cue", { detail: { say: "ooh, photos!" } })));
  await expect(bubble).toHaveText("ooh, photos!");
});

test("wheel smoothing eases out instead of jumping", async ({ page }) => {
  await page.goto("/");
  await page.mouse.move(600, 400);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(40);
  const early = await page.evaluate(() => scrollY);
  expect(early).toBeLessThan(250);
  await expect.poll(() => page.evaluate(() => Math.round(scrollY)), { timeout: 3000 }).toBeGreaterThan(240);
});
