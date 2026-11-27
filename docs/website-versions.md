# Website versions

Two versions are preserved on GitHub:

- `versions/classic`: previous live website, frozen at `03cf076`.
- `codex/white-void-homepage`: new spatial website, including the supplied CRT and atom artwork.
- `main`: current development and automatic deployment branch.

## Switch the live site

Open GitHub → Actions → Deploy to GitHub Pages → Run workflow. Keep the workflow branch set to `main`, then choose the **version** to deploy:

- `versions/classic` for the previous website.
- `codex/white-void-homepage` for the saved spatial website.
- `main` for the latest main revision.

Running this workflow changes the live site without overwriting either saved branch. A subsequent push to `main` automatically deploys main again.

The previous SVG experiments are kept as source assets; the active CRT and atom use optimized transparent WebP copies of the user-supplied PNGs. Originals remain in the user's Desktop folder.
