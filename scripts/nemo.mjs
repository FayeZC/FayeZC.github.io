// The bubbles Nemo blows in the corner of the About panel. Drawn here rather
// than cut out of the design sheet because at nine pixels across an extraction
// is all rounding error: nearest-neighbour lands the rim wherever it likes and
// the highlight disappears entirely. Three sizes, so the trail can start small
// at the mouth and open up as it rises.
//
// 'o' rim, '#' body, '*' highlight, '.' transparent. Colours sampled off the
// design sheet, which is also where the palette in the header comes from.
export const BUBBLE_INK = {
  o: '#439ced',
  '#': '#b5dcfa',
  '*': '#ffffff',
}

export const BUBBLE_LG = [
  '..ooooo..',
  '.o#####o.',
  'o##*####o',
  'o#**####o',
  'o#*#####o',
  'o#######o',
  'o#######o',
  '.o#####o.',
  '..ooooo..',
]

export const BUBBLE_MD = ['.oooo.', 'o*###o', 'o####o', 'o####o', 'o####o', '.oooo.']

export const BUBBLE_SM = ['.oo.', 'o*#o', 'o##o', '.oo.']
