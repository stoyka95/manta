// Zjistí, kterými SKUTEČNÝMI fonty prohlížeč vykreslil text na stránce.
// Používá CDP CSS.getPlatformFontsForNode — ukáže, jestli se část glyfů
// (typicky česká diakritika) nekreslí náhradním systémovým fontem.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:4500";
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send("DOM.enable");
await cdp.send("CSS.enable");

for (const route of ["/", "/kontakt"]) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  console.log(`\n=== ${route} ===`);

  for (const sel of ["h1", "p", "header a span"]) {
    const { nodeId } = await cdp.send("DOM.querySelector", {
      nodeId: root.nodeId,
      selector: sel,
    });
    if (!nodeId) continue;
    const text = (await page.locator(sel).first().innerText()).slice(0, 48).replace(/\n/g, " ");
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    const used = fonts.map((f) => `${f.familyName} (${f.glyphCount} glyfů)`).join(" + ");
    const ok = fonts.length === 1 ? "OK  " : "MIX!";
    console.log(`${ok} ${sel.padEnd(16)} "${text}"\n       → ${used}`);
  }
}

await browser.close();
