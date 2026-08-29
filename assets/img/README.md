# Photography drop-in guide

The site is designed so photos slot straight in — add files with these exact
names and they appear automatically (no code changes needed). Until a file
exists, the site shows a clearly marked "Photograph to follow" slot instead.

| File | Where it appears | Status |
| --- | --- | --- |
| `band.jpg` | Restoration diptych after the story (shown as a true square, uncropped) | ✅ the directors on site |
| `band-produce.jpg` | Full-width band before the Crop section | ⬜ WANTED: a high-res fresh-produce shot (fruit & veg flatlay or market display), 2400px+ wide, landscape |
| `band-farm.jpg` | Tall full-width band after Genuinely local | ✅ cows grazing the South Devon coast (from the deck) |
| `gatherings.jpg` | Gatherings & events row in The Halls | ✅ festoon lights at dusk (from the deck) |
| `restoration.jpg` | Restoration diptych, wide companion image | ✅ hall interior during fit-out (from the deck) |
| `hero.jpg` | Full-screen hero background (dark overlay is applied for legibility) | ✅ roof-truss group shot |
| `building.jpg` | "The old market, reborn" section (portrait crop, 3:3.6) | ✅ the restored rose window (from the deck) |
| `market-hall.jpg` | Market Hall card (arched portrait, 4:4.6) | 🔶 placeholder crop, marked on-site; replace with shoot photography |
| `food-hall.jpg` | Food Hall card (arched portrait, 4:4.6) | ✅ street-food shot (from the deck) |
| `team/andy-johnson.jpg` | Team card (portrait, ~4:4.7) | ✅ |
| `team/jay-jacoby.jpg` | Team card | ✅ |
| `team/tommy-tannock.jpg` | Team card | ✅ |
| `team/mark-oconnell.jpg` | Team card | ✅ |

`map.svg` is a stylised schematic map (currently unused; the Visit section embeds a live Google Map). Kept in case it's wanted for print or a fallback.

Every image uses the shared photo component (`figure.photo > .photo-media > img` + optional `figcaption`), so new photography drops in by filename with no layout changes.

These were generated (resized + compressed) from the high-res originals in the
repo root. Replace any of them the same way — same filename, and the site picks
it up.

Tips:

- Aim for JPGs around 1600–2400px on the long edge, ~200–500KB each
  (export at quality 70–80). The hero can be up to ~3000px wide.
- Portraits work best with a little headroom — the crops centre on the
  middle of the frame.
