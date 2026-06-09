const { chromium } = require('playwright');

async function randomDelay(min = 800, max = 2200) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise(r => setTimeout(r, delay));
}

async function scrapeEtsyTrends() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 },
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  const page = await context.newPage();

  // Hide webdriver
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  const searchTerms = [
    'unhinged shirt',
    'chaotic energy shirt',
    'dark humor shirt',
    'problematic shirt',
    'degenerate shirt'
  ];

  for (const term of searchTerms) {
    console.log(`\n=== Searching: ${term} ===\n`);

    await page.goto(`https://www.etsy.com/search?q=${encodeURIComponent(term)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await randomDelay(1200, 2500);

    // Try multiple possible selectors (Etsy changes often)
    const listings = await page.evaluate(() => {
      const results = [];

      // Try modern Etsy listing cards
      const cards = document.querySelectorAll('[data-listing-id], .v2-listing-card, .js-merchandise');
      
      cards.forEach((card, index) => {
        if (index > 6) return;

        const titleEl = card.querySelector('h3, .v2-listing-card__title, .listing-card-title');
        const priceEl = card.querySelector('.lc-price .lc-price-item, .price, [data-price]');
        const shopEl = card.querySelector('.shop-name, .v2-listing-card__shop');
        const linkEl = card.querySelector('a');

        if (titleEl) {
          results.push({
            title: titleEl.innerText.trim(),
            price: priceEl ? priceEl.innerText.trim() : 'N/A',
            shop: shopEl ? shopEl.innerText.trim() : 'N/A',
            link: linkEl ? linkEl.href : 'N/A'
          });
        }
      });

      return results;
    });

    if (listings.length === 0) {
      console.log('No listings found (possibly blocked or changed layout)');
    } else {
      listings.forEach((listing, i) => {
        console.log(`${i + 1}. ${listing.title}`);
        console.log(`   ${listing.price} | ${listing.shop}`);
        console.log(`   ${listing.link}\n`);
      });
    }

    await randomDelay(1500, 3000);
  }

  await browser.close();
  console.log('\nDone.');
}

scrapeEtsyTrends().catch(console.error);