# White void homepage prototype

Implemented on `codex/white-void-homepage`. Not deployed.

## Preview

Run `npm run dev` and open the URL printed by Astro. Both `/` and `/zh/` use the new spatial homepage. Publications, blog articles and CV retain their original design for this first prototype.

## Design

A distributed, white first viewport uses separate identity, biography and research nodes. Small optical disc, CRT, chrome ring and network objects have different sizes, sharpness and pointer movement. The illustrations occupy an isolated decorative layer; text is never rotated or transformed by pointer motion. No glass panels, horizon, room, grid of cards or WebGL runtime.

Full biography, all current research interests, education, selected publications, projects sourced from existing news, recent blog posts, news (including the More toggle), members, CV and contact remain available in the document. Existing source data files are unchanged. The homepage project summaries reuse the existing Hidee and OPAL announcements without inventing new project claims or links.

## Files

- `src/layouts/Spatial.astro`: dedicated document shell, metadata and navigation.
- `src/components/pages/Home.astro`: both language variants, backed by existing site/publication/blog data.
- `src/styles/spatial.css`: responsive design and motion rules, isolated from existing page layouts.
- `src/scripts/spatial.js`: decorative pointer parallax, motion control and news toggle.
- `public/spatial/`: original SVG artwork and small transparent WebP objects; provenance in its README.
- `scripts/check-spatial.mjs`: browser checks for content fidelity, responsive overflow, assets, email reveal/copy, news toggle, reduced motion, anchors and adjacent routes.

## Verification

`npm run build` builds all existing routes. With preview running on port 4321, run `node scripts/check-spatial.mjs`. Override the server with `ORIGIN=http://localhost:PORT` if needed. Screenshots and JSON results go to `output/white-void/` (local review artifacts).

The motion control pauses decorative CSS movement and pointer parallax. OS reduced-motion preferences override animation automatically. Coarse-pointer devices get static object poses. The page remains readable and navigable with JavaScript disabled, while the existing email component provides its original GitHub fallback. No analytics, third-party fonts, or external requests were added to the homepage.

## Composition refinement

The opening viewport includes an explicit contents list. Separate text and object clusters retain the dispersed composition; isolated registration marks replace the long connecting perspective line. Darker chrome and readable labels preserve contrast. Existing section names (About, Education, Research Interests, News, Members and Blog) use the shared translations.

The added Projects section was removed on request. Hidee and OPAL remain solely in News with their original announcement text, links and logos.

## Saved revision — 2026-11-27

Shared spatial styling now covers Publications, Blog and CV. News follows About without rewriting announcements. Navigation and section labels stay visible while scrolling. Photos retain original colour. The opening scene uses neutral text with blue hover states; the smaller clownfish sticker sits to the right of About at 10 degrees. Ne/Mo uses #FE6510, sampled from the dominant orange in the original sprite. Email occupies its own row above social links. This is a local review version, not a deployment.
