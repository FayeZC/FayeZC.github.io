// Keep the address out of the shipped HTML entirely: XOR then base64, so the
// markup contains no "@" and no domain for a scraper to regex out.
// The matching decoder lives in EmailReveal.astro's client script.
export const EMAIL_KEY = 0x2a

export function encodeEmail(email, key = EMAIL_KEY) {
  const xored = Array.from(email, (c) => String.fromCharCode(c.charCodeAt(0) ^ key)).join('')
  return Buffer.from(xored, 'binary').toString('base64')
}
