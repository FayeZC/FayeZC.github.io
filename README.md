# fayezc.github.io

Personal academic homepage for Chi (Faye) Zhang. Astro, static output, pixel-art
Cretaceous theme.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site |
| `npm run sprites` | Regenerate pixel sprites from `assets/` and `scripts/trike.mjs` |
| `npm run fonts` | Re-subset the pixel CJK font to the characters the site uses |
| `npm run check:layout` | Overflow / integer-scale / email-gate / route self-check, both languages |
| `npm run cv:sync` | Pull the latest CV from Overleaf into `cv-source/` |

## Layout

```
assets/            source artwork and photos (full resolution)
public/sprites/    generated pixel art — do not hand-edit, run `npm run sprites`
src/data/          site.js (profile, news, members), publications.js,
                   sprites.json (generated — real sprite dimensions)
src/i18n/          language list, path localisation, UI strings
src/lib/           obfuscate.js (email), sprite.js (integer-scale sizing)
src/pages/         thin route files: /* is English, /zh/* is Chinese
src/components/    EmailReveal.astro; pages/ holds the shared page bodies
src/styles/        global.css — the whole design system
cv-source/         Overleaf CV clone, git-ignored (it carries its own .git)
```

## Things worth knowing

**Pixel art must scale by whole numbers.** Fractional scaling makes some art
pixels two screen pixels wide and others one, which looks broken. Sprites are
trimmed to their artwork, so their real dimensions are not round numbers — the
cat comes out 86x96, not 96x96. Never write a sprite width in CSS: the generator
records the true dimensions in `src/data/sprites.json`, and `sprite(name, scale)`
from `src/lib/sprite.js` multiplies them into `width`/`height` attributes.
`npm run check:layout` fails if any image renders at a non-integer scale.

**English lives at `/`, Chinese at `/zh/`.** Two static route trees, not runtime
switching, so both languages are crawlable and shareable and English keeps the
clean root for CV citation. Route files are thin; the page bodies live in
`src/components/pages/` and take a `lang` prop. Translatable strings are `{en, zh}`
pairs read through `pick()`; UI chrome lives in `src/i18n/index.js`. Neither
Silkscreen nor IBM Plex Sans has CJK glyphs, so both font stacks fall through to a
system CJK face — Chinese headings are not pixel-font.

**The email address is never in the HTML.** `EmailReveal.astro` ships an XOR+base64
payload and only decodes it after a real click, so the markup contains no `@` and
no domain. The check script fails the build if the address ever leaks pre-click.

**The phone number from the CV is deliberately not published.**

**Sprites come from two places.** Photographs go through
`scripts/make-sprites.mjs`, which keys out the background by growing a region
inward from the border and then downsamples with nearest-neighbour. The cat needs
a much tighter tolerance than the portrait — he's a photograph, and a loose
threshold lets the flood crawl up the backdrop gradient and eat him.

The triceratops is different: Faye drew it, and it lives as a character grid in
`scripts/trike.mjs` rather than as a PNG, so it can be diffed and nudged a pixel
at a time. `make-sprites.mjs` paints that grid straight into a 2-colour PNG.
`scripts/import-trike.mjs` is the one-off that recovered the grid from her
original drawing; it is kept because the comments record how the drawing's native
resolution was worked out, which was the hard part.

## Deploying

The public `FayeZC.github.io` repository deploys to GitHub Pages through
`.github/workflows/deploy.yml`. Target URL: https://fayezc.github.io
