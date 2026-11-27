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
