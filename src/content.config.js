import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// One post is one Markdown file under src/content/blog/<lang>/<slug>.md.
//
// Language comes from the directory rather than from frontmatter so a
// translation pair is obvious at a glance: en/foo.md and zh/foo.md are the same
// post. Neither has to exist for the other to work — the post page falls back
// to the blog index when a translation is missing, rather than 404ing.
const blog = defineCollection({
  loader: glob({ base: 'src/content/blog', pattern: '*/*.md' }),
  schema: z.object({
    title: z.string(),
    // Written as YYYY-MM-DD; kept as a Date so sorting is not string sorting.
    date: z.coerce.date(),
    // Shown on the index. Not derived from the body: the first paragraph of a
    // post is rarely the sentence that makes someone click.
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    // Set true to keep a post out of the index and out of the build.
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
