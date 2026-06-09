const { chromium } = require('playwright');

async function randomDelay(min = 1200, max = 2800) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise(r => setTimeout(r, delay));
}

async function scrapeFacebook() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 }
  });

  const page = await context.newPage();

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  console.log('Trying Facebook search...\n');

  try {
    await page.goto('https://www.facebook.com/search/top?q=unhinged%20shirt', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await randomDelay();

    const content = await page.content();
    
    if (content.includes('login') || content.includes('Log in')) {
      console.log('Facebook is requiring login. Scraping blocked.');
    } else {
      console.log('Page loaded but results may be limited.');
      // Try to extract some text
      const text = await page.evaluate(() => document.body.innerText.slice(0, 2000));
      console.log(text);
    }
  } catch (err) {
    console.log('Error:', err.message);
  }

  await browser.close();
  console.log('\nDone.');
}

scrapeFacebook().catch(console.error);