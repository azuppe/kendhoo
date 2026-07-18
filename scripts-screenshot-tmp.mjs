import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } })
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' })
const count = await page.locator('text=View All News').count()
console.log('View All News count:', count)
if (count > 0) {
  const el = page.locator('text=View All News').first().locator('xpath=ancestor::section[1]')
  await el.scrollIntoViewIfNeeded()
  await el.screenshot({ path: 'scripts-latestnewsv2-screenshot.png' })
} else {
  await page.screenshot({ path: 'scripts-fullpage-screenshot.png', fullPage: true })
}
await browser.close()
