// Build the site's imagery. Faye's avatar becomes real pixel art — background
// keyed out, nearest-neighbour downsample. Zinc stays a photograph.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { TRIKE, TRIKE_INK } from './trike.mjs'
import { BUBBLE_INK, BUBBLE_LG, BUBBLE_MD, BUBBLE_SM } from './nemo.mjs'

const SRC = 'assets'
const OUT = 'public/sprites'
const PHOTOS = 'public/photos'
const MANIFEST = 'src/data/sprites.json'
await mkdir(OUT, { recursive: true })
await mkdir(PHOTOS, { recursive: true })

// trim() crops to the artwork, so an output is rarely exactly `size` wide. The
// manifest records what actually came out, and the markup multiplies those
// numbers, so no hardcoded CSS width can drift into fractional scaling.
const manifest = {}

// Background on faye.png is a soft gradient, so a single reference colour misses
// most of it. Grow a region inward from the border instead: each pixel joins the
// background if it resembles the neighbour it spread from. The dino's dark outline
// stops the flood, and the soft ground shadow gets eaten on the way.
async function keyOutBackground(file, tolerance = 20, seedEdges = 'trbl', sideLimit = 1) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const at = (x, y) => (y * width + x) * channels
  const seen = new Uint8Array(width * height)
  const queue = []

  const push = (x, y, from) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const id = y * width + x
    if (seen[id]) return
    const a = at(x, y)
    const d =
      Math.abs(data[a] - from[0]) + Math.abs(data[a + 1] - from[1]) + Math.abs(data[a + 2] - from[2])
    if (d > tolerance) return
    seen[id] = 1
    queue.push(x, y)
  }

  // Only seed from edges that are actually backdrop. Where the subject runs off
  // the frame, a seed lands on the subject and eats it from the inside out.
  const seed = (x, y) => push(x, y, [data[at(x, y)], data[at(x, y) + 1], data[at(x, y) + 2]])

  for (let x = 0; x < width; x++) {
    if (seedEdges.includes('t')) seed(x, 0)
    if (seedEdges.includes('b')) seed(x, height - 1)
  }
  // sideLimit stops seeding down the sides once the subject starts touching them.
  const sideStop = Math.floor(height * sideLimit)
  for (let y = 0; y < sideStop; y++) {
    if (seedEdges.includes('l')) seed(0, y)
    if (seedEdges.includes('r')) seed(width - 1, y)
  }

  while (queue.length) {
    const y = queue.pop()
    const x = queue.pop()
    const a = at(x, y)
    const from = [data[a], data[a + 1], data[a + 2]]
    data[a + 3] = 0
    push(x + 1, y, from)
    push(x - 1, y, from)
    push(x, y + 1, from)
    push(x, y - 1, from)
  }

  return sharp(data, { raw: { width, height, channels } }).png()
}

async function pixelate(input, { size, out, colours }) {
  const img = sharp(await input.toBuffer()).trim({ threshold: 1 })
  const small = await img
    .resize(size, size, { fit: 'inside', kernel: 'nearest', withoutEnlargement: true })
    .png({ palette: true, colours, dither: 0 })
    .toBuffer()

  const name = `${out}-${size}`
  const { width, height } = await sharp(small).toFile(`${OUT}/${name}.png`)
  manifest[name] = { src: `/sprites/${name}.png`, width, height, pixel: true }
  console.log(`${name}.png  ${width}x${height}`)
}

// Hand-drawn art goes straight from its character grid to pixels, one grid cell
// per pixel. Nothing is resampled, so there is nothing to go soft: this is the
// only path here that is pixel art by construction rather than by approximation.
// `ink` is either one colour, painted into every '#' cell, or a map from
// character to colour for art that needs more than one. Either way a character
// with no colour behind it stays transparent — that is how '.' works, and how
// the trike's 'o' punches its holes.
async function drawPixels(rows, { out, ink }) {
  const width = Math.max(...rows.map((r) => r.length))
  const height = rows.length
  const ragged = rows.filter((r) => r.length !== width).length
  if (ragged) throw new Error(`${out}: ${ragged} row(s) are not ${width} characters wide`)

  const palette = Object.fromEntries(
    Object.entries(typeof ink === 'string' ? { '#': ink } : ink).map(([ch, hex]) => [
      ch,
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)),
    ])
  )

  const buf = Buffer.alloc(width * height * 4, 0)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const colour = palette[rows[y][x]]
      if (!colour) continue
      const i = (y * width + x) * 4
      buf[i] = colour[0]
      buf[i + 1] = colour[1]
      buf[i + 2] = colour[2]
      buf[i + 3] = 255
    }
  }

  const name = `${out}-${width}`
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .png({ palette: true, colours: Object.keys(palette).length + 1, dither: 0 })
    .toFile(`${OUT}/${name}.png`)
  manifest[name] = { src: `/sprites/${name}.png`, width, height, pixel: true }
  console.log(`${name}.png  ${width}x${height}`)
}

// Photographs are resized normally — smooth kernel, no palette, no integer-scale
// rule. Downsampling a studio portrait to a 96px palette does not make pixel art,
// it makes a noisy photo, so Zinc is shown as what he is: a framed photograph
// hanging on a pixel-art wall.
// `crop` is an sharp extract rect, applied before the resize. Portraits shot on
// a phone are tall, and the members wall wants squares — cropping here rather
// than in CSS keeps the framing a decision made once, in the open, instead of
// whatever object-fit happens to discard.
// `sharpen` is off by default and only wanted where the source is soft to begin
// with. Sharpening an already-crisp photo just gives it halos.
async function photo(file, { size, out, crop, sharpen }) {
  const name = `${out}-${size}`
  const pipeline = sharp(file)
  if (crop) pipeline.extract(crop)
  pipeline.resize(size, size, { fit: 'inside', withoutEnlargement: true })
  if (sharpen) pipeline.sharpen({ sigma: 1 })
  const { width, height } = await pipeline
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${PHOTOS}/${name}.jpg`)

  manifest[name] = { src: `/photos/${name}.jpg`, width, height, pixel: false }
  console.log(`${name}.jpg  ${width}x${height}`)
}

// Sizes exist so every placement can render at an exact integer multiple.
// Fractional scaling makes some art pixels 2 screen pixels wide and others 1,
// which is the ugliest failure mode in pixel art.
// 48 for the little walking dino, 96 for the hero and the members wall.
// Anything smaller loses the horns and reads as a green blob.
const dino = await keyOutBackground(`${SRC}/faye.png`)
for (const size of [48, 96]) {
  await pixelate(dino, { size, out: 'faye', colours: 16 })
}

// The portraits fill their frame rather than sitting matted inside it, so the
// display size is the card width — around 230px at three columns, more at one.
// 512 keeps that sharp on a retina screen across the whole range.
for (const size of [512, 128]) {
  await photo(`${SRC}/zinc-zhang.png`, { size, out: 'zinc' })
}

// Faye and a triceratops, 1080x1440, and the members wall wants squares. Both
// of them have to survive the crop — the joke is the pair, and she is the only
// member whose card can make it. The full width is the only square that holds
// them both, so the only choice left is where it starts vertically: 120 puts
// her eyes on the upper third and keeps the skull's near horn in frame.
for (const size of [512, 128]) {
  await photo(`${SRC}/faye-dino.jpg`, {
    size,
    out: 'faye-portrait',
    crop: { left: 0, top: 120, width: 1080, height: 1080 },
  })
}

// Byte's is a phone photo, 1279x1773, so it gets squared up first. The rect is
// centred on the cone rather than on the frame: the cone is the point of the
// picture, and centring the image instead would cut the top of it off.
for (const size of [512, 128]) {
  await photo(`${SRC}/byte.jpg`, {
    size,
    out: 'byte',
    crop: { left: 329, top: 400, width: 950, height: 950 },
  })
}

// The monochrome walking trike. Rendered at its drawn size only — there is no
// second size because every placement uses it at an integer multiple of this one.
await drawPixels(TRIKE, { out: 'trike', ink: TRIKE_INK })

// Nemo, in the corner of the About panel, because the lab is called NeMo. Cut
// out of Faye's design sheet, which draws him on a ~7.5px lattice with soft
// shading inside each block; nearest at 64 lands on that lattice and flattens
// each block back to one colour. 64 is also the size the sheet itself specifies.
const fish = await keyOutBackground(`${SRC}/nemo.png`)
await pixelate(fish, { size: 64, out: 'nemo', colours: 16 })

// And the bubbles he blows. Each is its own file rather than one strip, because
// they rise on three different clocks and CSS has to move them independently.
for (const rows of [BUBBLE_LG, BUBBLE_MD, BUBBLE_SM]) {
  await drawPixels(rows, { out: 'bubble', ink: BUBBLE_INK })
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nwrote ${MANIFEST}`)
