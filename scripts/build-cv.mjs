// Compile the Overleaf CV to public/cv/ so the site can serve a PDF.
//
//   npm run cv:pdf
//
// cv-source/ is a clone of the Overleaf project and is git-ignored here, so the
// PDF is the only part of it that gets committed. Run `npm run cv:sync` first
// to pull whatever was edited in the browser.
//
// The compile is XeTeX (tectonic), not the pdfLaTeX Overleaf runs. That is a
// feature: anything that only builds on Overleaf is a portability bug in the
// source, and the two engines agree on this document.
import { execFile } from 'node:child_process'
import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { profile } from '../src/data/site.js'
import { EMAIL_KEY } from '../src/lib/obfuscate.js'

const run = promisify(execFile)

const TEX = 'cv-source/main.tex'
const BUILD = '.astro/cv-build'
const OUT = 'public/cv/chi-zhang-cv.pdf'

// The one address the CV is allowed to carry. Decoded from the payload rather
// than written out, for the same reason the payload exists at all.
const EMAIL = Array.from(Buffer.from(profile.emailPayload, 'base64'), (b) =>
  String.fromCharCode(b ^ EMAIL_KEY),
).join('')

// A North American phone number in any of the shapes a CV writes it. Matched by
// pattern rather than by value, because the value must not be in this repo.
const PHONE = /\+?1?[\s.-]?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/
const ANY_EMAIL = /[\w.+-]+@[\w.-]+\.\w+/g

async function which(cmd) {
  try {
    await run('which', [cmd])
    return true
  } catch {
    return false
  }
}

if (!(await which('tectonic'))) {
  console.error('tectonic is not installed — `brew install tectonic`, or export the PDF from Overleaf')
  process.exit(1)
}

await mkdir(BUILD, { recursive: true })
await mkdir('public/cv', { recursive: true })

console.log(`compiling ${TEX} ...`)
await run('tectonic', ['-X', 'compile', TEX, '--outdir', BUILD])

// The whole reason this script exists rather than a one-line npm script: a CV
// carries contact details the site deliberately does not publish, and a PDF is
// as harvestable as a web page. Fail the build rather than ship a leak.
if (await which('pdftotext')) {
  await run('pdftotext', [`${BUILD}/main.pdf`, `${BUILD}/main.txt`])
  const text = await readFile(`${BUILD}/main.txt`, 'utf8')
  const problems = []

  const phone = text.match(PHONE)
  if (phone) problems.push(`a phone number (${phone[0]})`)

  // Any address other than the published one — which catches the old address
  // without this file having to name it.
  const strays = [...new Set(text.match(ANY_EMAIL) ?? [])].filter((a) => a !== EMAIL)
  if (strays.length) problems.push(`an unexpected email address (${strays.join(', ')})`)

  if (problems.length) {
    for (const p of problems) console.error(`[FAIL] the compiled PDF contains ${p}`)
    console.error('\nFix the heading in cv-source/main.tex (and push it to Overleaf), then re-run.')
    process.exit(1)
  }
  console.log('[ok  ] no phone number or unexpected address in the compiled text')
} else {
  console.log('[warn] pdftotext not found — skipping the contact-details leak check')
}

await copyFile(`${BUILD}/main.pdf`, OUT)
console.log(`wrote ${OUT}`)
