// One-off: recover Faye's hand-drawn triceratops from the big flat PNG she drew
// it in, back down to the resolution she actually drew at.
//
// It is pixel art blown up ~23x, so every art pixel is a solid block. The job is
// to find the block lattice, reduce each block to one pixel, and drop the ground
// dashes underneath — those belong to the Chrome dino's game, not to the animal.
// Prints a character grid for scripts/trike.mjs, so the art lives in the repo as
// text that can be diffed and hand-tweaked rather than as a binary.
//
//   node scripts/import-trike.mjs '    Trico.png'
import sharp from 'sharp'

const SRC = process.argv[2] ?? 'assets/trike.png'

const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info
const ink = (x, y) => (data[y * width + x] < 160 ? 1 : 0)

// The source is a screenshot, so it was rescaled on the way in and the blocks do
// not land on whole pixels — the same block width measures 20px in one place and
// 23px in another. Integer arithmetic (GCD, modal run length) has nothing to
// lock onto, so fit the lattice rather than measuring it: treat each block edge
// as a unit vector at angle 2*pi*x/period and sweep the period. At the true
// block size the vectors all point the same way and their sum is long; anywhere
// else they cancel. The angle of that sum is the sub-pixel offset, for free.
function phaseFit(edges, period) {
  let sx = 0
  let sy = 0
  for (const e of edges) {
    const a = (2 * Math.PI * e) / period
    sx += Math.cos(a)
    sy += Math.sin(a)
  }
  const turns = Math.atan2(sy, sx) / (2 * Math.PI)
  return {
    period,
    score: Math.hypot(sx, sy) / edges.length,
    offset: (((turns * period) % period) + period) % period,
  }
}

const xEdges = []
const yEdges = []
for (let y = 0; y < height; y++) {
  for (let x = 1; x < width; x++) if (ink(x, y) !== ink(x - 1, y)) xEdges.push(x)
}
for (let x = 0; x < width; x++) {
  for (let y = 1; y < height; y++) if (ink(x, y) !== ink(x, y - 1)) yEdges.push(y)
}

// Majority vote over each cell's interior rather than a centre sample: an offset
// that is a shade off still lands on the right answer. The 2px inset skips the
// antialiased seam between blocks.
function sample(cell) {
  const ox = phaseFit(xEdges, cell).offset
  const oy = phaseFit(yEdges, cell).offset
  const cols = Math.floor((width - ox) / cell)
  const rows = Math.floor((height - oy) / cell)
  const bounds = { ox, oy, cols, rows }
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const x0 = Math.round(ox + c * cell) + 2
      const x1 = Math.round(ox + (c + 1) * cell) - 2
      const y0 = Math.round(oy + r * cell) + 2
      const y1 = Math.round(oy + (r + 1) * cell) - 2
      let lit = 0
      let total = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          total++
          lit += ink(x, y)
        }
      }
      return lit / total > 0.5 ? 1 : 0
    }),
  )
  return { grid, bounds }
}

// Choosing the cell size cannot be automated on this image. The phase score
// peaks at 11.66 on the x axis, an exact half-harmonic of the real period, and a
// reproduction-error sweep is no better: a finer grid always reproduces the
// image more faithfully, so the curve has no usable minimum, and its dips at 20,
// 23.5 and 32.5 have indistinguishable prominence. The drift is why — the same
// block measures 20px at one end of the drawing and 23px at the other, so no
// single period fits every edge and every objective is left choosing between
// near-ties.
//
// So measure it off the drawing instead. Three features agree, and they are
// features whose cell counts can be read straight off the picture:
//
//   legs       95px wide, 68px gaps, starting every 163px  -> 4, 3 and 7 cells
//   back slope stair steps of 20-25px in both axes         -> 1 cell
//   strong-edge phase fit, both axes, harmonics excluded   -> 23.6 and 24.0
//
// 23.6 it is; that puts the animal at 45x26. The 32.5 the eye and legs alone
// would suggest is ruled out by the phase fit, which scores it 0.238 against
// 0.357 — she drew the eye slightly off-grid, which is also why it needs a
// hand-correction in trike.mjs.
const cell = Number(process.argv[3]) || 23.6

const { grid, bounds } = sample(cell)
console.error(`lattice: ${cell.toFixed(2)}px cell, ${bounds.cols}x${bounds.rows} grid`)

// Split into connected blobs so the ground can be dropped. Keeping only the
// largest one is too blunt: the front leg meets the belly across a join thinner
// than a cell, so quantising severs it and it comes out as its own 15-cell blob.
// The ground is drawn as loose dashes and every one of them is a single cell
// tall, so filter on that instead — it keeps the animal whole and cannot take a
// leg with it.
const { rows, cols } = bounds
const seen = grid.map((row) => row.map(() => false))
const blobs = []
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!grid[r][c] || seen[r][c]) continue
    const blob = []
    const stack = [[r, c]]
    seen[r][c] = true
    while (stack.length) {
      const [y, x] = stack.pop()
      blob.push([y, x])
      for (const [dy, dx] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const ny = y + dy
        const nx = x + dx
        if (ny < 0 || nx < 0 || ny >= rows || nx >= cols) continue
        if (!grid[ny][nx] || seen[ny][nx]) continue
        seen[ny][nx] = true
        stack.push([ny, nx])
      }
    }
    blob.rows = new Set(blob.map(([y]) => y)).size
    blobs.push(blob)
  }
}

const best = blobs.filter((b) => b.rows > 1).flat()
const keep = new Set(best.map(([y, x]) => `${y},${x}`))
let y0 = Infinity
let y1 = -1
let x0 = Infinity
let x1 = -1
for (const [y, x] of best) {
  if (y < y0) y0 = y
  if (y > y1) y1 = y
  if (x < x0) x0 = x
  if (x > x1) x1 = x
}
const W = x1 - x0 + 1
const H = y1 - y0 + 1

const art = []
for (let r = y0; r <= y1; r++) {
  let line = ''
  for (let c = x0; c <= x1; c++) line += keep.has(`${r},${c}`) ? '#' : '.'
  art.push(line)
}

// A hole fully enclosed by the animal is its eye, not background. Mark those 'o'
// so the grid reads as deliberate; they render transparent either way.
const outside = Array.from({ length: H }, () => new Array(W).fill(false))
const queue = []
const flood = (r, c) => {
  if (art[r][c] !== '.' || outside[r][c]) return
  outside[r][c] = true
  queue.push([r, c])
}
for (let r = 0; r < H; r++) for (const c of [0, W - 1]) flood(r, c)
for (let c = 0; c < W; c++) for (const r of [0, H - 1]) flood(r, c)
while (queue.length) {
  const [r, c] = queue.pop()
  if (r > 0) flood(r - 1, c)
  if (r < H - 1) flood(r + 1, c)
  if (c > 0) flood(r, c - 1)
  if (c < W - 1) flood(r, c + 1)
}

const dropped = grid.flat().reduce((a, b) => a + b, 0) - best.length
console.error(`animal: ${W}x${H}, ${best.length} solid cells, ${dropped} cells of ground dropped`)
console.log(
  art
    .map((line, r) => [...line].map((ch, c) => (ch === '.' && !outside[r][c] ? 'o' : ch)).join(''))
    .join('\n'),
)
