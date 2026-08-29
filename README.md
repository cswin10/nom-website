# Newton Old Market — thenom.org

The website for **The NOM** (Newton Old Market), Market Street, Newton Abbot,
Devon — a historic market hall brought back to life by
Crop as a home for genuinely local food and trade. This site replaces the old
cropcommunity.org and will be served from all three of their domains.

> Shop here. Eat here. Grow here.

## Stack

Pure static site — no build step, no dependencies. Deployable to GitHub Pages,
Netlify, Vercel, or any static host as-is.

```
index.html        the whole site (single page)
css/styles.css    design system + all styling
js/main.js        scroll reveals, counters, LEAFI bars, nav
assets/logos/     Crop + NOM brand assets (from the client)
assets/img/       photography — see assets/img/README.md for drop-in names
assets/favicon.svg
```

## Adding photography

Drop photos into `assets/img/` using the filenames listed in
[`assets/img/README.md`](assets/img/README.md). Every image slot has a branded
placeholder that automatically gives way to the real photo when the file
exists — no code changes needed.

## Local preview

Open `index.html` directly, or serve it:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Notes

- The Google map is a plain embed (no API key required).
- RSVP / contact actions use `mailto:` links to `jay@cropcommunity.org` —
  swap for a form endpoint later if wanted.
- `assets/logos/nom-window-redrawn.svg` is a vector redraw of the window mark
  at a slightly taller proportion, offered for review.
