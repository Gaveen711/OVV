/**
 * Drives the site in a real (headless) Chrome and captures the scroll
 * experience as stills plus a frame-timing trace.
 *
 * The in-app Browser pane does not composite when hidden - rAF sits at 0 ticks
 * per second there, so no Framer animation or Lenis tick can advance and
 * nothing can be seen or measured in motion. Headless Chrome composites
 * normally, so this is what actually verifies the feel.
 *
 *   node scripts/capture-scroll.mjs http://localhost:5173 [outDir]
 */
import { launch } from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url = process.argv[2] ?? 'http://localhost:5173';
const outDir = resolve(process.argv[3] ?? 'scroll-capture');
mkdirSync(outDir, { recursive: true });

const browser = await launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
// Give the hero video a beat to reach its first painted frame.
await new Promise((r) => setTimeout(r, 2500));

const shot = (name) => page.screenshot({ path: resolve(outDir, `${name}.png`) });

/* ---- Hero: wheel the expand and capture the wordmark motion ---- */
await shot('01-hero-rest');

const wheel = async (times, delta = 120) => {
  for (let i = 0; i < times; i++) {
    await page.mouse.wheel({ deltaY: delta });
    await new Promise((r) => setTimeout(r, 40));
  }
};

const heroState = () =>
  page.evaluate(() => {
    const acc = document.querySelector('.hero-accent');
    const card = document.querySelector('video')?.closest('div[style*="width"]');
    const letters = [...document.querySelectorAll('.hero-accent__letter')];
    return {
      cardW: card?.style.width,
      accentOpacity: acc?.style.opacity,
      tracking: acc ? getComputedStyle(acc).letterSpacing : null,
      ys: letters.map((l) => l.style.transform.match(/-?[\d.]+/)?.[0]).join(','),
    };
  });

const trace = [{ at: 'rest', ...(await heroState()) }];
await page.mouse.move(720, 450);
for (const step of [2, 2, 2, 2, 3]) {
  await wheel(step);
  trace.push({ at: `+${step}`, ...(await heroState()) });
  await shot(`02-hero-${trace.length - 1}`);
}

/* ---- Frame timing while the page scrolls under Lenis ---- */
await page.evaluate(() => {
  window.__frames = [];
  let last = performance.now();
  const tick = () => {
    const now = performance.now();
    window.__frames.push(now - last);
    last = now;
    if (window.__frames.length < 240) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await wheel(40, 140);

const timing = await page.evaluate(() => {
  const f = window.__frames.slice(1);
  const s = [...f].sort((a, b) => a - b);
  return {
    frames: f.length,
    medianMs: +s[Math.floor(s.length / 2)].toFixed(2),
    p95Ms: +s[Math.floor(s.length * 0.95)].toFixed(2),
    worstMs: +s[s.length - 1].toFixed(2),
    over33ms: f.filter((x) => x > 33).length,
    over50ms: f.filter((x) => x > 50).length,
  };
});

/* ---- Section reveals ---- */
const sections = ['#about', '#amenities', '#inquiry', '#register'];
for (const sel of sections) {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (window.__lenis) window.__lenis.scrollTo(el, { immediate: false, duration: 1.1 });
    else el.scrollIntoView({ behavior: 'smooth' });
  }, sel);
  await new Promise((r) => setTimeout(r, 1600));
  await shot(`03-section${sel.replace('#', '-')}`);
}

await page.evaluate(() => {
  const el = document.querySelector('.site-footer');
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.1 });
});
await new Promise((r) => setTimeout(r, 1600));
await shot('04-footer');

/* Did every reveal actually land at full opacity? A stuck reveal is the main
   failure mode of whileInView + once:true. */
const stuck = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.reveal-word, [style*="opacity"]').forEach((el) => {
    const o = parseFloat(getComputedStyle(el).opacity);
    const r = el.getBoundingClientRect();
    if (o < 0.99 && r.width > 0 && r.height > 0 && el.closest('#about, #amenities, #inquiry, #register, .site-footer')) {
      out.push((el.className || el.tagName) + ' -> ' + o);
    }
  });
  return out.slice(0, 12);
});

console.log(JSON.stringify({ trace, timing, stuckReveals: stuck, consoleErrors }, null, 2));
await browser.close();
