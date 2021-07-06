const puppeteer = require("puppeteer");
const fs = require("fs");

//screenshot("https://example.com").then(() => console.log("screenshot saved"));

async function screenshot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  const screenData = await page.screenshot({ encoding: "binary", type: "jpeg", quality: 100 });
  if (!!screenData) {
    fs.writeFileSync("screenshots/screenshot.jpg", screenData);
  } else {
    throw Error("Unable to take screenshot");
  }

  await page.close();
  await browser.close();
}

uaCheck().then(() => console.log("uaeragent Check Done!"));
async function uaCheck() {
  var url = "https://www.whatsmyua.info/";

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  /*
  browser.setUserAgent(
    "Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.163 Whale/1.0.0.0 Crosswalk/25.80.14.28 Mobile Safari/537.36 NAVER(inapp; search; 1000; 11.4.2)"
  );
  */

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.163 Whale/1.0.0.0 Crosswalk/25.80.14.28 Mobile Safari/537.36 NAVER(inapp; search; 1000; 11.4.2)"
  );

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, {
    timeout: 0,
    waitUntil: "networkidle0",
  });

  console.log("connected!");
  var uaString = await page.evaluate(() => {
    var uaString = document.querySelector("textarea#custom-ua-string").value;
    console.log(uaString);
    return uaString;
  });
  console.log(uaString);

  await page.close();
  await browser.close();
}
