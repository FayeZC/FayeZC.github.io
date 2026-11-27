import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";
import {
  profile,
  education,
  interests,
  members,
  news,
} from "../src/data/site.js";
import { pick } from "../src/i18n/index.js";
const origin = process.env.ORIGIN || "http://localhost:4321";
const browser = await chromium.launch();
const results = [];
await fs.mkdir("output/white-void", { recursive: true });
for (const lang of ["en", "zh"])
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 960 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(origin + (lang === "zh" ? "/zh/" : "/"));
    assert.equal(response.status(), 200);
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
      }
      await Promise.all(
        [...document.images].map((i) => i.decode().catch(() => {})),
      );
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${lang} ${width}: overflow`,
    );
    assert.deepEqual(
      await page.evaluate(() =>
        [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
      ),
      [],
    );
    const body = await page.locator("body").innerText();
    for (const text of [
      ...pick(profile.bio, lang),
      ...interests.map((x) => pick(x, lang)),
      ...education.map((x) => pick(x.school, lang)),
      ...members.map((x) => pick(x.note, lang)),
    ])
      assert.ok(body.includes(text), `Missing content: ${text}`);
    assert.equal(await page.locator("h1").count(), 1);
    const old = page.locator("[data-older]");
    if (await old.count()) {
      assert.equal(await old.first().isVisible(), false);
      await page.locator(".news-toggle").click();
      assert.equal(await old.first().isVisible(), true);
      await page.locator(".news-toggle").click();
      assert.equal(await old.first().isVisible(), false);
    }
    const before = await page.content();
    const email = page.locator(".email-reveal");
    await email.locator("button").click();
    await page.waitForSelector(".email-reveal[data-done]");
    const revealed = await email.locator(".chars").innerText();
    assert.ok(revealed.includes("@"));
    assert.equal(before.includes(revealed), false);
    await email.locator("button").click();
    await page.waitForTimeout(100);
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      revealed,
    );
    await page.locator(".motion-control").click();
    assert.equal(
      await page.locator(".motion-control").getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => el.classList.contains("motion-paused")),
      true,
    );
    const anchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((a) => a.map((x) => x.getAttribute("href").slice(1)));
    for (const id of anchors)
      assert.ok(
        await page.locator(`[id="${id}"]`).count(),
        `Missing anchor ${id}`,
      );
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `output/white-void/${lang}-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".disc img")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    assert.deepEqual(errors, []);
    results.push({
      lang,
      width,
      overflow: false,
      images: true,
      sourceContent: true,
      emailRevealAndCopy: true,
      newsToggle: true,
      reducedMotion: true,
      consoleErrors: errors,
    });
    await context.close();
  }
const page = await browser.newPage();
for (const route of [
  "/publications",
  "/blog",
  "/cv",
  "/zh/publications",
  "/zh/blog",
  "/zh/cv",
  "/cv/chi-zhang-cv.pdf",
]) {
  let r = await page.request.get(origin + route);
  assert.equal(r.status(), 200, route);
}
await fs.writeFile(
  "output/white-void/qa.json",
  JSON.stringify(results, null, 2),
);
console.log(
  "PASS: both languages × four viewport widths; source content, images, email, news, motion, anchors, and adjacent routes.",
);
await browser.close();
