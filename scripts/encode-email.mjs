// Turn an address into the payload that goes in src/data/site.js.
//
//   npm run email -- fayezc.cs@gmail.com
//
// The plain address lives in your head and in the mail provider, not in this
// repo — that is the whole point, so this script prints and exits rather than
// writing site.js for you.
import { encodeEmail } from '../src/lib/obfuscate.js'

const email = process.argv[2]
if (!email || !email.includes('@')) {
  console.error('usage: npm run email -- someone@example.com')
  process.exit(1)
}

console.log(`\n  emailPayload: '${encodeEmail(email)}',\n`)
console.log('Paste that into profile in src/data/site.js, then npm run build.')
