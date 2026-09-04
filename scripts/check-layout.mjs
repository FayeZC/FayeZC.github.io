// Layout self-check: catch horizontal overflow and oversized elements across
// viewports, and shoot screenshots for eyeballing proportions.
import { chromium } from 'playwright'
import { mkdir, readdir } from 'node:fs/promises'
import { profile } from '../src/data/site.js'
import { EMAIL_KEY } from '../src/lib/obfuscate.js'

// Decode here rather than hardcoding the address: it must not appear in this
// repo either, since the repo is public. This is also a round-trip test of the
// payload — if it is malformed, the strings below will not match what the page
// reveals and the reveal check fails.
const EMAIL = Array.from(Buffer.from(profile.emailPayload, 'base64'), (b) =>
  String.fromCharCode(b ^ EMAIL_KEY),
).join('')
const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@')

const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4321'
// Both language trees get swept: Chinese wraps differently from English, so a
// nav bar or news row that fits in one may not fit in the other.
const HOMES = ['/', '/zh/']

// Post routes come from the content directory rather than a hardcoded list, so
// a new post is covered by this sweep the moment it is written.
async function postPaths(lang) {
  const dir = `src/content/blog/${lang}`
  const files = await readdir(dir).catch(() => [])
  const prefix = lang === 'en' ? '' : `/${lang}`
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => `${prefix}/blog/${f.replace(/\.md$/, '')}`)
}

const PAGES = [
  '/',
  '/publications',
  '/blog',
  '/cv',
  ...(await postPaths('en')),
  '/zh/',
  '/zh/publications',
  '/zh/blog',
  '/zh/cv',
  ...(await postPaths('zh')),
]

// The CV PDF is a committed build artefact, so it can go missing without the
// site failing to build. The download button would then 404 in silence.
const ASSETS = ['/cv/chi-zhang-cv.pdf']
const SHOTS = '/tmp/site-shots'
const VIEWPORTS = [
  { name: '320-small-phone', width: 320, height: 800 },
  { name: '375-phone', width: 375, height: 900 },
  { name: '768-tablet', width: 768, height: 1000 },
  { name: '1024-laptop', width: 1024, height: 900 },
  { name: '1440-desktop', width: 1440, height: 950 },
]

await mkdir(SHOTS, { recursive: true })
const browser = await chromium.launch()
let problems = 0

for (const home of HOMES) {
  const tag = home === '/' ? 'en' : 'zh'
  console.log(`\n=== viewport sweep: ${home} ===`)

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto(`${ORIGIN}${home}`, { waitUntil: 'networkidle' })

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const overflowing = []

      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) continue
        // 1px of slack absorbs subpixel rounding
        if (r.right > vw + 1 || r.left < -1) {
          overflowing.push({
            tag: el.tagName.toLowerCase(),
            cls: el.className?.toString?.().slice(0, 40) ?? '',
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
          })
        }
      }

      // Pixel art has to scale by a whole number. At x2.23 some art pixels cover
      // two screen pixels and their neighbours cover three, and the sprite goes
      // soft and uneven. Report the exact ratio so a near-miss can't hide.
      const images = [...document.images].map((img) => {
        const r = img.getBoundingClientRect()
        const scale = r.width / (img.naturalWidth || 1)
        // Photographs are generated at 2x and rendered down, so their scale is
        // fractional by design. Only pixel art is held to the integer rule.
        const isPhoto = img.classList.contains('photo')
        return {
          src: img.currentSrc.split('/').pop(),
          natural: `${img.naturalWidth}x${img.naturalHeight}`,
          rendered: `${Math.round(r.width)}x${Math.round(r.height)}`,
          scale: +scale.toFixed(3),
          isPhoto,
          // 0.02 of slack for subpixel layout rounding, nothing more.
          integral:
            isPhoto || (Math.abs(scale - Math.round(scale)) < 0.02 && Math.round(scale) >= 1),
        }
      })

      return {
        docScrollWidth: document.documentElement.scrollWidth,
        viewportWidth: vw,
        hasHorizontalScroll: document.documentElement.scrollWidth > vw + 1,
        overflowing: overflowing.slice(0, 12),
        overflowCount: overflowing.length,
        images,
      }
    })

    const fractional = report.images.filter((img) => !img.integral)
    const flag =
      report.hasHorizontalScroll || report.overflowCount > 0 || fractional.length ? 'FAIL' : 'ok  '
    if (flag === 'FAIL') problems++

    console.log(
      `\n[${flag}] ${tag} ${vp.name}  (${report.viewportWidth}px, scrollWidth ${report.docScrollWidth})`,
    )
    if (report.overflowCount) {
      console.log(`  ${report.overflowCount} element(s) past the viewport edge:`)
      for (const o of report.overflowing) {
        console.log(`    <${o.tag} class="${o.cls}">  left=${o.left} right=${o.right} w=${o.width}`)
      }
    }
    for (const img of report.images) {
      const warn = img.integral ? '' : '  <-- NOT an integer scale'
      const kind = img.isPhoto ? ' [photo]' : ''
      console.log(
        `  img ${img.src}${kind}: natural ${img.natural} -> rendered ${img.rendered} (x${img.scale})${warn}`,
      )
    }

    await page.screenshot({ path: `${SHOTS}/${tag}-${vp.name}.png`, fullPage: true })
    await page.close()
  }
}

// The pixel CJK font is drawn on a 12px grid and only stays crisp at multiples
// of 12. Same discipline as integer sprite scaling, applied to type.
console.log('\n=== pixel Chinese type ===')
{
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } })
  await page.goto(`${ORIGIN}/zh/`, { waitUntil: 'networkidle' })

  const type = await page.evaluate(async () => {
    await document.fonts.ready
    const loaded = [...document.fonts].some(
      (f) => f.family.includes('Ark Pixel') && f.status === 'loaded',
    )

    const offGrid = []
    const selectors = ['h1', 'h2', 'h3', '.topbar .brand', '.topbar nav a', '.pixel']
    for (const el of document.querySelectorAll(selectors.join(','))) {
      // Only the elements actually showing Chinese are constrained; Latin in a
      // pixel-font element comes from Silkscreen, which has no such grid.
      if (!/[⺀-鿿]/.test(el.textContent)) continue
      const size = parseFloat(getComputedStyle(el).fontSize)
      if (size % 12 !== 0) {
        offGrid.push({ sel: el.tagName.toLowerCase() + (el.className ? `.${el.className}` : ''), size })
      }
    }
    return { loaded, offGrid }
  })

  if (!type.loaded) {
    problems++
    console.log('[FAIL] Ark Pixel font did not load on /zh/')
  } else {
    console.log('[ok  ] Ark Pixel font loaded')
  }
  if (type.offGrid.length) {
    problems++
    console.log(`[FAIL] ${type.offGrid.length} Chinese pixel-font element(s) off the 12px grid:`)
    for (const o of type.offGrid) console.log(`    ${o.sel} at ${o.size}px`)
  } else {
    console.log('[ok  ] all Chinese pixel-font sizes are multiples of 12px')
  }
  await page.close()
}

// Exercise the email reveal on both trees: it must not leak the address before
// a click, and must not blow out the layout after one.
for (const home of HOMES) {
  const tag = home === '/' ? 'en' : 'zh'
  // An explicit context, because the copy check below needs to grant clipboard
  // permission and that is a context-level call.
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${ORIGIN}${home}`, { waitUntil: 'networkidle' })

  const htmlBefore = await page.content()
  const leaks = [EMAIL, EMAIL_USER, `@${EMAIL_DOMAIN}`].filter((s) => htmlBefore.includes(s))
  if (leaks.length) {
    problems++
    console.log(`\n[FAIL] ${tag}: email visible in HTML before click: ${leaks.join(', ')}`)
  } else {
    console.log(`\n[ok  ] ${tag}: email absent from pre-click HTML`)
  }

  await page.click('.email-reveal .trigger')
  await page.waitForSelector('.email-reveal[data-done]', { timeout: 5000 })
  const revealed = await page.textContent('.email-reveal .chars')
  if (revealed !== EMAIL) {
    problems++
    console.log(`[FAIL] ${tag}: click revealed "${revealed}", expected the encoded address`)
  } else {
    console.log(`[ok  ] ${tag}: revealed after click: ${revealed}`)
  }

  // The second click copies rather than navigating. Grant the permission first,
  // since headless Chromium denies clipboard writes by default and the
  // component would silently take its execCommand fallback path instead.
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN })
  await page.click('.email-reveal .trigger')
  await page.waitForSelector('.email-reveal[data-flash]', { timeout: 5000 })
  const clipboard = await page.evaluate(() => navigator.clipboard.readText())
  if (clipboard !== EMAIL) {
    problems++
    console.log(`[FAIL] ${tag}: second click put "${clipboard}" on the clipboard`)
  } else {
    console.log(`[ok  ] ${tag}: second click copied the address`)
  }

  const afterOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  )
  if (afterOverflow) {
    problems++
    console.log(`[FAIL] ${tag}: reveal introduced horizontal overflow`)
  }
  await page.screenshot({ path: `${SHOTS}/${tag}-email-revealed.png`, fullPage: true })
  await context.close()
}

// Every nav destination must exist, declare the right language, survive a
// narrow viewport, and avoid rendering the removed language switch.
console.log('\n=== routes ===')
for (const path of PAGES) {
  const p = await browser.newPage({ viewport: { width: 375, height: 900 } })
  const response = await p.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle' })
  const status = response?.status() ?? 0
  const { overflow, lang, hasLanguageSwitch } = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    lang: document.documentElement.lang,
    hasLanguageSwitch: document.querySelector('.lang-toggle') !== null,
  }))

  const expected = path.startsWith('/zh') ? 'zh-CN' : 'en'
  const langWrong = lang !== expected
  const bad = status !== 200 || overflow || langWrong || hasLanguageSwitch
  if (bad) problems++
  console.log(
    `[${bad ? 'FAIL' : 'ok  '}] ${path} -> ${status}` +
      `${overflow ? ' (horizontal overflow at 375px)' : ''}` +
      `${langWrong ? ` (lang="${lang}", expected "${expected}")` : ''}` +
      `${hasLanguageSwitch ? ' (language switch still rendered)' : '  no language switch'}`,
  )
  await p.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle' })
  await p.screenshot({ path: `${SHOTS}/page${path.replace(/\//g, '_')}.png`, fullPage: true })
  await p.close()
}

// An unmatched path must reach the 404 page, and reach it with a 404 status —
// a soft 404 that returns 200 gets the missing page indexed.
console.log('\n=== not found ===')
{
  const p = await browser.newPage({ viewport: { width: 375, height: 900 } })
  const response = await p.goto(`${ORIGIN}/no-such-page-here`, { waitUntil: 'networkidle' })
  const status = response?.status() ?? 0
  const heading = await p.textContent('h1').catch(() => null)
  const bad = status !== 404 || !heading?.includes('404')
  if (bad) problems++
  console.log(`[${bad ? 'FAIL' : 'ok  '}] /no-such-page-here -> ${status}, h1 "${heading}"`)
  await p.screenshot({ path: `${SHOTS}/404.png`, fullPage: true })
  await p.close()
}

// fetch, not page.goto: navigating to a PDF makes Chromium start a download
// rather than load a document, and Playwright throws.
console.log('\n=== static assets ===')
for (const asset of ASSETS) {
  const response = await fetch(`${ORIGIN}${asset}`).catch(() => null)
  const status = response?.status ?? 0
  const size = response?.ok ? (await response.arrayBuffer()).byteLength : 0
  const bad = status !== 200 || size === 0
  if (bad) problems++
  console.log(`[${bad ? 'FAIL' : 'ok  '}] ${asset} -> ${status} (${(size / 1024).toFixed(0)}KB)`)
}

await browser.close()
console.log(`\nshots in ${SHOTS}`)
console.log(problems ? `\n${problems} problem group(s).` : '\nno layout problems found.')
process.exit(problems ? 1 : 0)
