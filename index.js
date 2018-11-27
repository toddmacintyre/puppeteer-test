require('./.env');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(process.env.href);

  await page.type('input[name$=email]', process.env.USERNAME, {delay: 100});
  await page.type('input[name$=password]', process.env.PASSWORD, {delay: 100});

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('button[name$=submit]'),
  ]);

  await page.screenshot({path: './screeshots/example.png'});

  await browser.close();
})();
