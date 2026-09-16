# Between the Quiet

Stories for the places darkness lingers.

## Adding a new story

1. Add a file to `content/stories/your-slug.mdx` with frontmatter:

```md
---
title: "Story Title"
slug: "your-slug"
status: "published"   # or "unfinished"
teaser: "One line teaser."
order: 8
theme:
  base: "#hexcolor"
  deep: "#hexcolor"
  accent: "#hexcolor"
soundtrack: null       # or a soundtrack object, see below
---

Story text goes here as Markdown paragraphs.
```

2. Pick `theme` colors that give the story its own atmosphere (see the
   existing stories for the palette language: near-black base, muted,
   desaturated hues — no bright color).

3. To add a soundtrack, first verify the actual recording's license (not
   just the composition). Put the audio file in `public/audio/`, then fill
   in:

```yaml
soundtrack:
  title: "Track Title"
  artist: "Artist Name"
  source: "Free Music Archive"
  sourceUrl: "https://..."
  license: "CC0 1.0"
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  attributionRequired: false
  file: "/audio/your-track.mp3"
  durationLabel: "4:32"
```

The Music Credits page (`/music`) pulls this automatically — no separate
editing needed.

## Development

```
npm install
npm run dev
```

## Architecture

- Next.js App Router, TypeScript, Tailwind.
- Stories live as MDX files with frontmatter in `content/stories/`, parsed
  by `lib/stories.ts`. No database — adding a story is just adding a file.
- Audio is a single global singleton (`lib/audioManager.ts`) that survives
  client-side route changes, so clicking a story card can start playback
  inside that click gesture (required for iOS Safari) before the reading
  page finishes mounting. Volume is persisted to `localStorage`.
- Code is organized so a private `/admin` publishing UI could be added
  later without restructuring the content layer.

_Last updated: 2026-09-16_
