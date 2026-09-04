import { getCollection } from 'astro:content'

// Entry ids are "<lang>/<slug>", straight from the directory layout.
export const langOf = (id) => id.split('/')[0]
export const slugOf = (id) => id.split('/').slice(1).join('/')

/** Published posts in one language, newest first. */
export async function postsFor(lang) {
  const posts = await getCollection('blog', (p) => langOf(p.id) === lang && !p.data.draft)
  return posts.sort((a, b) => b.data.date - a.data.date)
}

/** Every published post, both languages — for building routes. */
export async function allPosts() {
  return getCollection('blog', (p) => !p.data.draft)
}

/**
 * Where the language toggle should go from a post page.
 *
 * A post does not have to exist in both languages. When the translation is
 * missing, send the reader to the blog index instead: the alternative is a
 * link that 404s, which is worse than a link that lands one level up.
 */
export async function translationPath(id, other) {
  const slug = slugOf(id)
  const translated = (await allPosts()).some((p) => p.id === `${other}/${slug}`)
  return translated ? `/blog/${slug}` : '/blog'
}

// Dates are stored as Date and rendered per language: 2026-08-20 reads fine in
// English, but a Chinese page wants 2026年8月20日.
export function formatDate(date, lang) {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
