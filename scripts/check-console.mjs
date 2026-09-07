import { chromium } from "playwright-core";

const routes = [
  "/",
  "/bowling",
  "/restaurace-a-bar",
  "/oslavy-a-akce",
  "/cenik",
  "/rezervace",
  "/kontakt",
  "/faq",
  "/nonexistent-page",
];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

let hadIssue = false;

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const issues = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") issues.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => issues.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400 && res.url().startsWith("http://localhost")) {
      issues.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const relevant = issues.filter(
    (i) => !(route === "/nonexistent-page" && i.includes("HTTP 404"))
  );

  if (relevant.length) {
    hadIssue = true;
    console.log(`\n--- ${route} ---`);
    relevant.forEach((i) => console.log(i));
  } else {
    console.log(`OK  ${route}`);
  }
  await page.close();
}

await browser.close();
if (hadIssue) process.exitCode = 1;
