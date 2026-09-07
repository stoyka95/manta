import { chromium } from "playwright-core";

const urls = [
  "https://www.bowlingmanta.cz/cz/",
  "https://images.unsplash.com/photo-1552056776-9b5657118ca4",
  "https://images.pexels.com/photos/4192/photography-desk-office-cup.jpg",
  "https://pixabay.com/api/",
  "https://cdn.pixabay.com/photo/2015/09/09/16/05/bowling-931842_1280.jpg",
];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const url of urls) {
  const page = await browser.newPage();
  try {
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    console.log(url, "->", res ? res.status() : "no response");
  } catch (e) {
    console.log(url, "-> ERROR:", e.message.split("\n")[0]);
  }
  await page.close();
}

await browser.close();
