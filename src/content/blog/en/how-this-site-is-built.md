---
title: How this site is built
date: 2026-08-20
summary: A static site with no trackers, a triceratops recovered from a screenshot, and an email address that is not in the HTML.
tags: ['colophon', 'pixel art']
---

This page is a static file. There is no server, no database, no analytics, and
no cookie banner, because there are no cookies to warn you about. Astro renders
Markdown and components to HTML at build time and the output goes to GitHub
Pages. The only network requests a visit makes are for the fonts, the sprites,
and the page itself.

That is a deliberate choice rather than a minimalist pose. I measure what
software assumes is safe for a living, and the smallest honest thing I could
put on the internet under my own name is a directory of files.

## Pixel art has rules

Pixel art only survives scaling by whole numbers. At 2.23× some art pixels land
on two screen pixels and their neighbours land on three, and a crisp sprite
turns into a soft one. So every sprite here carries explicit width and height
attributes generated from a manifest, multiplied by an integer, and a check
script walks the built pages at five viewport widths and fails the build if any
sprite is rendering at a fractional scale.

The Chinese type has the same problem. Ark Pixel is drawn on a 12px grid and is
only crisp at multiples of 12, so the Chinese route tree snaps every pixel-font
size to a 12px step. The same script fails if a heading lands on 19.5px.

## The triceratops

The triceratops in the footer is mine, drawn by hand. Recovering it turned out
to be the hardest part of the site: what I had was a screenshot of the drawing,
resampled, so the blocks had drifted — the same square measured 20 pixels at one
end of the picture and 23 at the other.

Every automatic way of finding the true cell size failed. Fitting the phase of
the strong edges locked onto 11.66, exactly half the real period. Minimising
reproduction error has no minimum, because a finer grid always reproduces an
image more faithfully. Ranking the dips by prominence put 20.0 and 32.5 ahead of
the right answer.

What worked was measuring features whose cell counts can be read straight off
the drawing. The legs are 95 pixels wide with 68-pixel gaps, repeating every
163 — four cells, three cells, seven cells. The stair steps along the back are
20 to 25 pixels in both axes, which is one cell. That gives 23.6, and the animal
is 45 by 26.

There is a lesson in there about objectives that have no minimum, and I think it
generalises past dinosaurs.

## The email address

My address is not in the HTML. It is stored XOR'd and base64'd, and the plain
text is never produced at build time, so it is not in this repository either.
Clicking the button decodes it in the browser and copies it to your clipboard.

This stops bulk harvesting, which scrapes markup and does not run JavaScript. It
does not stop you, and it is not meant to: anyone who reads one short file can
reverse it in a second. The check script clicks the button on every build and
fails if the address appears in the page before the click.
