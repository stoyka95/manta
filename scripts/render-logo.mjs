// Sestaví logo Manta z originální značky (public/logo/manta-mark.svg) a
// wordmarku sázeného skutečným fontem Poppins 700 — žádné obtahované křivky.
// Vygeneruje: manta-logo.png (lockup), manta-mark-1024.png (jen značka)
// a app/apple-icon.png (180×180 na světlém brand pozadí).
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "public/logo");
mkdirSync(outDir, { recursive: true });

const markSvg = readFileSync(path.resolve(outDir, "manta-mark.svg"), "utf8");

/** Váha 700 nejlépe odpovídá tloušťce tahů v originálním logu. */
const WEIGHT = 700;
const fontFace = ["latin", "latin-ext"]
  .map((subset) => {
    const b64 = readFileSync(
      path.resolve(
        root,
        `node_modules/@fontsource/poppins/files/poppins-${subset}-${WEIGHT}-normal.woff2`
      )
    ).toString("base64");
    return `@font-face{font-family:'Poppins';font-weight:${WEIGHT};font-style:normal;
      src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
  })
  .join("\n");

// Značka je téměř čtvercová; v originále je její výška ≈ 2,5násobek
// x-výšky wordmarku → font-size ≈ výška značky / 1,37.
const MARK = 260;
const FONT = Math.round(MARK / 1.37);

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${fontFace}
  html,body{margin:0;padding:0;background:transparent;}
  svg{display:block;}
  .square{width:640px;height:640px;display:flex;align-items:center;justify-content:center;}
  .square svg{width:520px;height:520px;}
  .lockup{display:inline-flex;align-items:center;gap:${Math.round(MARK * 0.12)}px;padding:40px;}
  .lockup svg{width:${MARK}px;height:${MARK}px;flex:none;}
  .wordmark{font-family:'Poppins',sans-serif;font-weight:${WEIGHT};font-size:${FONT}px;
    color:#294853;letter-spacing:-0.01em;line-height:1;display:flex;align-items:flex-start;}
  .reg{font-size:0.2em;margin-left:0.06em;margin-top:0.15em;}
  .appleicon{width:180px;height:180px;background:#F6FBFC;display:flex;
    align-items:center;justify-content:center;}
  .appleicon svg{width:142px;height:142px;}
</style></head>
<body>
  <div class="square" id="square">${markSvg}</div>
  <div class="lockup" id="lockup">
    ${markSvg}
    <div class="wordmark">manta<span class="reg">&reg;</span></div>
  </div>
  <div class="appleicon" id="appleicon">${markSvg}</div>
</body></html>`;

writeFileSync(path.resolve(__dirname, "_logo-render.html"), html);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ deviceScaleFactor: 3 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(200);

await page.locator("#square").screenshot({
  path: path.resolve(outDir, "manta-mark-1024.png"),
  omitBackground: true,
});
await page.locator("#lockup").screenshot({
  path: path.resolve(outDir, "manta-logo.png"),
  omitBackground: true,
});

// apple-icon musí být neprůhledný a přesně 180×180 px
const iconPage = await browser.newPage({ deviceScaleFactor: 1 });
await iconPage.setContent(html);
await iconPage.evaluate(() => document.fonts.ready);
await iconPage.locator("#appleicon").screenshot({
  path: path.resolve(root, "app/apple-icon.png"),
});

await browser.close();
console.log(`hotovo — Poppins ${WEIGHT}, značka ${MARK}px, font ${FONT}px`);
