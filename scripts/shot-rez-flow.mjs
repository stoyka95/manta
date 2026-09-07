import { chromium } from "playwright-core";

const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const base = process.argv[2] ?? "http://localhost:4323";

const browser = await chromium.launch({ executablePath: EXEC });

for (const v of [
  { name: "desktop", w: 1440, h: 900 },
  { name: "mobile", w: 390, h: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && !m.text().includes("insights") && errors.push(m.text()));

  await page.goto(`${base}/rezervace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // vyber jiný den (2. chip) a pak 3 volné sloty
  await page.locator("button", { hasText: /^\w{2}\d+\.$/ }).nth(2).click().catch(() => {});
  await page.waitForTimeout(300);

  const free = page.locator('button[aria-label*="Kč"]');
  const n = await free.count();
  let picked = 0;
  for (let i = 0; i < n && picked < 3; i++) {
    const el = free.nth(i);
    if (await el.isEnabled()) {
      await el.click();
      picked++;
      await page.waitForTimeout(120);
    }
  }
  console.log(`${v.name}: vybráno ${picked} slotů`);
  await page.screenshot({ path: `/tmp/flow-${v.name}-1-selected.png` });

  // krok 2 — kontakt
  await page.locator("button:visible", { hasText: "Pokračovat" }).first().click();
  await page.waitForTimeout(450);
  await page.locator('input[placeholder="Jméno a příjmení"]').fill("Jana Nováková");
  await page.locator('input[placeholder="Telefon"]').fill("+420 777 123 456");
  await page.waitForTimeout(200);
  await page.screenshot({ path: `/tmp/flow-${v.name}-2-contact.png` });

  // krok 3 — potvrzení
  await page.locator("button:visible", { hasText: "Rezervovat" }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/flow-${v.name}-3-done.png` });

  const overflow = await page.evaluate(() => {
    const r = document.querySelector("main section").getBoundingClientRect();
    return { bottom: Math.round(r.bottom), viewH: window.innerHeight };
  });
  console.log(
    `${v.name}: po dokončení obsah ${overflow.bottom}px / ${overflow.viewH}px` +
      (errors.length ? ` | ERR: ${errors.join(" | ")}` : " | bez chyb")
  );
  await page.close();
}
await browser.close();
