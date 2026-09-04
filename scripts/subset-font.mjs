// Subset the pixel CJK font down to the characters this site actually uses.
//
// Ark Pixel's Simplified Chinese face is 536KB — far too much to ship for the
// few hundred characters on the Chinese pages. Everything Chinese on the site
// originates in src/, so scan there for non-ASCII characters and keep only
// those. dist/ is scanned too when it exists, as a check that nothing is
// reaching the page from somewhere the src/ scan misses.
import { execFileSync } from 'node:child_process'
import { readFile, readdir, stat, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SOURCE = 'assets/fonts/ark-pixel-12px-proportional-zh_cn.otf.woff2'
const OUT = 'public/fonts/ark-pixel-12px-zh.woff2'
const SCAN = [
  { dir: 'src', exts: ['.js', '.astro', '.json', '.md'] },
  { dir: 'dist', exts: ['.html'] },
]
// Latin comes from Silkscreen, which is listed first in the font stack, but
// keeping ASCII costs almost nothing and covers headings that mix the two.
const ALWAYS = [...Array(0x7f - 0x20)].map((_, i) => String.fromCharCode(0x20 + i)).join('')

/**
 * Drop blog post bodies before counting characters.
 *
 * Everything else on the site is bounded — a bio, a news list, a CV — but post
 * bodies are not, and they are the one place the pixel font is never used:
 * .prose is body copy in IBM Plex, falling through to a system CJK face. Left
 * in, every Chinese post would add a few hundred glyphs to a font file that
 * will never render them. Post titles are excluded from the exclusion, because
 * they do become headings.
 *
 * Both halves of the scan have to strip the same thing or the dist-vs-src
 * cross-check below reports the difference as missing coverage.
 */
function stripPostBodies(file, text) {
  // In src: a Markdown post is frontmatter, then body. Keep the frontmatter.
  if (file.startsWith(`src${path.sep}content${path.sep}`) && file.endsWith('.md')) {
    const end = text.indexOf('\n---', 3)
    return end === -1 ? '' : text.slice(0, end)
  }
  // In dist: the rendered body is exactly the .prose article.
  return text.replace(/<article class="panel prose">[\s\S]*?<\/article>/g, '')
}

async function walk(dir, exts, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, exts, out)
    else if (exts.includes(path.extname(entry.name))) out.push(full)
  }
  return out
}

const found = new Set()
const perSource = {}

for (const { dir, exts } of SCAN) {
  if (!existsSync(dir)) continue
  const chars = new Set()
  for (const file of await walk(dir, exts)) {
    for (const ch of stripPostBodies(file, await readFile(file, 'utf8'))) {
      // Anything outside printable ASCII is a candidate: CJK ideographs plus the
      // full-width punctuation that comes with them (，。《》· —).
      if (ch.codePointAt(0) > 0x7f) chars.add(ch)
    }
  }
  perSource[dir] = chars
  for (const ch of chars) found.add(ch)
}

// A character that reaches the built HTML but is absent from src/ means content
// is coming from somewhere this script does not know to scan.
if (perSource.dist && perSource.src) {
  const unscanned = [...perSource.dist].filter((ch) => !perSource.src.has(ch))
  if (unscanned.length) {
    console.warn(`warning: ${unscanned.length} char(s) in dist/ but not src/: ${unscanned.join('')}`)
  }
}

const text = ALWAYS + [...found].sort().join('')
await mkdir(path.dirname(OUT), { recursive: true })
const textFile = '/tmp/pixel-font-subset.txt'
await writeFile(textFile, text)

execFileSync(
  'python3',
  [
    '-m',
    'fontTools.subset',
    SOURCE,
    `--text-file=${textFile}`,
    '--flavor=woff2',
    `--output-file=${OUT}`,
    '--layout-features=*',
    '--no-hinting',
    '--desubroutinize',
  ],
  { stdio: 'inherit' }
)

// Verify rather than trust: a character silently dropped from the subset falls
// back to the system CJK face mid-heading, which is easy to miss by eye.
//
// Two different problems hide behind "not in the output cmap", so ask the source
// font too. Absent upstream is Ark Pixel's own coverage gap — it is hand-drawn
// and 24K glyphs deep but not complete — and nothing here can fix it; the font
// stack falls through to a system CJK face for those characters. Present
// upstream but absent downstream is this script losing them, which is a bug.
const [absentUpstream, dropped] = execFileSync('python3', [
  '-c',
  `
import sys
from fontTools.ttLib import TTFont
src = TTFont(sys.argv[1]).getBestCmap()
out = TTFont(sys.argv[2]).getBestCmap()
text = open(sys.argv[3], encoding='utf-8').read()
want = {c for c in text if not c.isspace()}
print(''.join(sorted(c for c in want if ord(c) not in src)))
print(''.join(sorted(c for c in want if ord(c) in src and ord(c) not in out)))
`,
  SOURCE,
  OUT,
  textFile,
])
  .toString()
  .split('\n')

if (dropped.trim()) {
  console.error(`FAIL: ${[...dropped.trim()].length} char(s) dropped by the subsetter: ${dropped}`)
  process.exit(1)
}
if (absentUpstream.trim()) {
  const chars = absentUpstream.trim()
  console.warn(
    `note: ${[...chars].length} char(s) are not in Ark Pixel at all and will use the system CJK ` +
      `face: ${chars}\n      Fine in body copy; reword if one ever lands in a heading.`,
  )
}

const before = (await stat(SOURCE)).size
const after = (await stat(OUT)).size
console.log(
  `${OUT}\n  ${found.size} CJK/punctuation chars + ASCII\n` +
    `  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(1)}KB ` +
    `(${((1 - after / before) * 100).toFixed(1)}% smaller)`
)
