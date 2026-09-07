// Změří reálný přenos a Core Web Vitals na produkčním buildu.
//   npm run audit:perf -- http://localhost:3000
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const routes = ["/", "/bowling", "/cenik", "/galerie", "/rezervace", "/faq"];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

const kb = (b) => (b / 1024).toFixed(1);
console.log("route            HTML    JS     CSS   fonty   celkem   req   LCP     CLS");
console.log("─".repeat(78));

const totals = { js: 0, n: 0 };

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const by = { html: 0, js: 0, css: 0, font: 0, other: 0 };
  let requests = 0;

  page.on("response", async (r) => {
    requests++;
    const url = r.url();
    let size = 0;
    try {
      size = (await r.body()).length;
    } catch {
      size = Number(r.headers()["content-length"] ?? 0);
    }
    if (/\.woff2?$/.test(url)) by.font += size;
    else if (/\.css/.test(url)) by.css += size;
    else if (/\.js/.test(url)) by.js += size;
    else if (r.request().resourceType() === "document") by.html += size;
    else by.other += size;
  });

  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const vitals = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0;
        let cls = 0;
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = Math.max(lcp, e.startTime);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve({ lcp: Math.round(lcp), cls: cls.toFixed(3) }), 500);
      })
  );

  const total = by.html + by.js + by.css + by.font + by.other;
  totals.js += by.js;
  totals.n++;

  console.log(
    `${route.padEnd(16)} ${kb(by.html).padStart(6)} ${kb(by.js).padStart(6)} ` +
      `${kb(by.css).padStart(6)} ${kb(by.font).padStart(6)} ${kb(total).padStart(8)} ` +
      `${String(requests).padStart(5)} ${(vitals.lcp + " ms").padStart(7)} ${String(vitals.cls).padStart(6)}`
  );
  await page.close();
}

// obsah v HTML bez JS — to je to, co vidí crawler bez renderování
const noJs = await browser.newPage({ javaScriptEnabled: false });
await noJs.goto(base + "/", { waitUntil: "domcontentloaded" });
const seen = await noJs.evaluate(() => ({
  h1: document.querySelectorAll("h1").length,
  h2: document.querySelectorAll("h2").length,
  words: (document.body.innerText.match(/\S+/g) ?? []).length,
  links: document.querySelectorAll("a[href^='/']").length,
  jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
}));
console.log(
  `\nBez JavaScriptu (co vidí crawler bez renderování): ${seen.words} slov, ` +
    `${seen.h1}× h1, ${seen.h2}× h2, ${seen.links} interních odkazů, ${seen.jsonLd}× JSON-LD`
);
console.log(`Průměrně JS na stránku: ${kb(totals.js / totals.n)} kB`);

await browser.close();
