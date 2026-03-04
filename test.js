const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('file:///c:/laragon/www/SDKI/index.html');
  await page.waitForTimeout(2000);
  
  // click SDKI tab (which should be active by default actually)
  console.log('Testing click on first card in SDKI grid...');
  const card = await page..glass-card:not(.modal-content);
  if (card) {
      await card.click();
      await page.waitForTimeout(1000);
      const isVisible = await page.evaluate(() => {
          return document.getElementById('detailsModal').classList.contains('visible');
      });
      console.log('Modal visible after click:', isVisible);
  } else {
      console.log('No cards found');
  }
  await browser.close();
})();
