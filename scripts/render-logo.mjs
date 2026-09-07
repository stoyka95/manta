import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "public/logo");
mkdirSync(outDir, { recursive: true });

const markSvg = readFileSync(path.resolve(outDir, "manta-mark.svg"), "utf8");

const fontPath = path.resolve(
  root,
  "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2"
);
const fontBase64 = readFileSync(fontPath).toString("base64");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face {
    font-family: 'PJS';
    src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
    font-weight: 800;
  }
  html,body{margin:0;padding:0;background:transparent;}
  .square{width:640px;height:640px;display:flex;align-items:center;justify-content:center;}
  .square svg{width:520px;height:520px;}
  .lockup{display:inline-flex;align-items:center;gap:40px;padding:40px;background:transparent;}
  .lockup svg{width:260px;height:260px;flex:none;}
  .wordmark{font-family:'PJS',sans-serif;font-weight:800;font-size:170px;color:#1E353B;
    letter-spacing:-4px;display:flex;align-items:flex-start;line-height:1;position:relative;}
  .reg{font-size:44px;font-weight:800;margin-left:6px;margin-top:6px;}
</style></head>
<body>
  <div class="square" id="square">${markSvg}</div>
  <div class="lockup" id="lockup">
    ${markSvg}
    <div class="wordmark">manta<span class="reg">&reg;</span></div>
  </div>
</body></html>`;

writeFileSync(path.resolve(__dirname, "_logo-render.html"), html);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ deviceScaleFactor: 3 });
await page.setContent(html);
await page.waitForTimeout(150);

await page.locator("#square").screenshot({
  path: path.resolve(outDir, "manta-mark-1024.png"),
  omitBackground: true,
});
await page.locator("#lockup").screenshot({
  path: path.resolve(outDir, "manta-logo.png"),
  omitBackground: true,
});

await browser.close();
console.log("done");
