import manifest from '../data/sprites.json'

function entry(name) {
  const found = manifest[name]
  if (!found) throw new Error(`unknown asset "${name}" — run \`npm run sprites\``)
  return found
}

/**
 * Resolve a generated sprite to src + explicit pixel dimensions.
 *
 * Pixel art must be scaled by whole numbers: at x2.23 some art pixels land on
 * two screen pixels and their neighbours land on three, and the sprite reads as
 * blurry rather than crisp. Sizes therefore come from the generator's manifest
 * multiplied by an integer, never from a hardcoded CSS width — the sprites are
 * trimmed to their artwork, so their real widths are not round numbers.
 */
export function sprite(name, scale = 1) {
  const size = entry(name)
  if (!size.pixel) throw new Error(`"${name}" is a photograph — use photo() instead`)
  if (!Number.isInteger(scale)) throw new Error(`sprite scale must be an integer, got ${scale}`)

  return { src: size.src, width: size.width * scale, height: size.height * scale }
}

/**
 * Resolve a photograph to src + the dimensions it should display at.
 *
 * Photographs are generated at twice their display size so they stay sharp on
 * retina screens, so the rendered scale is deliberately fractional — the
 * integer rule that governs pixel art does not apply here. `class="photo"` opts
 * the element out of `image-rendering: pixelated`.
 */
export function photo(name, displayWidth) {
  const size = entry(name)
  if (size.pixel) throw new Error(`"${name}" is pixel art — use sprite() instead`)

  return {
    src: size.src,
    class: 'photo',
    width: displayWidth,
    height: Math.round((displayWidth * size.height) / size.width),
  }
}
