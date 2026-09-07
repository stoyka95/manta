import { chromium } from "playwright-core";

const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const url = process.argv[2] ?? "http://localhost:4321/rezervace";

const sizes = [
  { name: "desktop-1440x900", w: 1440, h: 900 },
  { name: "laptop-1280x800", w: 1280, h: 800 },
  { name: "laptop-1366x768", w: 1366, h: 768 },
  { name: "tablet-834x1112", w: 834, h: 1112 },
  { name: "mobile-390x844", w: 390, h: 844 },
];

const browser = await chromium.launch({ executablePath: EXEC });
for (const s of sizes) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  const metrics = await page.evaluate(() => {
    const sec = document.querySelector("main section");
    const rect = sec.getBoundingClientRect();
    return {
      sectionBottom: Math.round(rect.bottom),
      viewH: window.innerHeight,
      bodyW: document.body.scrollWidth,
      viewW: window.innerWidth,
    };
  });
  await page.screenshot({ path: `/tmp/rez-${s.name}.png` });
  console.log(
    `${s.name}: obsah končí na ${metrics.sectionBottom}px / viewport ${metrics.viewH}px ` +
      `(${metrics.sectionBottom <= metrics.viewH + 2 ? "VEJDE SE ✓" : `přetéká o ${metrics.sectionBottom - metrics.viewH}px`})` +
      `${metrics.bodyW > metrics.viewW ? ` | H-SCROLL ${metrics.bodyW}>${metrics.viewW}` : ""}` +
      `${errors.length ? ` | ERR: ${errors.join(" | ")}` : ""}`
  );
  await page.close();
}
await browser.close();
