import { chromium } from "playwright-core";

const url = process.argv[2];
const outPath = process.argv[3] || "/tmp/shot.png";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const scrollY = Number(process.argv[6] || 0);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await page.waitForTimeout(500);
await page.screenshot({ path: outPath });
await browser.close();
console.log("saved", outPath);
