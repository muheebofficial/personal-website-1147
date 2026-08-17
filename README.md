# muheebsulaiman.com

Personal site for Muheeb Sulaiman — built with [Astro 5](https://astro.build), deployed as a
static site on Vercel.

---

## Quick start

```bash
npm install
npm run dev      # local dev server, usually http://localhost:4321
npm run build    # static build into ./dist, generates the sitemap
npm run preview  # serve the production build locally
```

Node 18.20.8+, 20.3.0+, or 22+ is required.

## Project structure

```
src/
  layouts/
    Layout.astro        shared shell: <head>, nav, footer, WhatsApp button, cursor JS
    BlogPost.astro      article shell + BlogPosting JSON-LD + prose styles
  components/
    Nav.astro           top menu (edit the `links` array to change it)
    Footer.astro
  pages/
    index.astro         /            + Person & Organization JSON-LD
    about.astro         /about
    services.astro      /services
    results.astro       /results
    ventures.astro      /ventures
    contact.astro       /contact
    404.astro
    blog/
      index.astro       /blog        listing + tag filters
      [...slug].astro   /blog/<slug> one page per Markdown file
  content/blog/*.md     the articles — filename becomes the URL slug
  content.config.ts     blog collection schema
  styles/global.css     the entire visual design — ported verbatim from the old index.html
public/
  images/               self-hosted page images
  og-image.png          1200x630 social share card
  robots.txt
astro.config.mjs        `site`, trailingSlash, sitemap integration
vercel.json             trailingSlash: false, to match the canonical URLs
```

## Publishing an article

Add a Markdown file to `src/content/blog/`. The filename becomes the URL
(`my-post.md` → `/blog/my-post`).

```md
---
title: "Your Headline"
description: "Shown on the listing card and in search results."
pubDate: 2026-08-17
tags: ["Marketing", "Systems"]
draft: false
---

Body copy in ordinary Markdown.
```

Frontmatter fields are validated by `src/content.config.ts`:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `description` | yes | meta description + listing excerpt |
| `pubDate` | yes | `YYYY-MM-DD`; sorts the listing newest-first |
| `updatedDate` | no | renders "Updated …" and sets `dateModified` |
| `tags` | no | `tags[0]` is the card's category label; all tags become filter chips |
| `cover` | no | image relative to the Markdown file, e.g. `./photo.jpg` |
| `coverAlt` | no | required in practice whenever `cover` is set |
| `draft` | no | `true` excludes it from the build, listing, and sitemap |

Reading time is computed from the body word count at build time.

## Conventions worth keeping

- **Don't edit `src/styles/global.css`.** It's the original stylesheet, moved verbatim.
  Article-body typography lives in a scoped block in `BlogPost.astro` so that file stays untouched.
- **Exactly one `<h1>` per page.**
- **Every page needs a unique `title` and `description`** passed to `Layout`.
- **All navigation is real `<a href>`.** The old `goPage()` toggle is gone; don't reintroduce
  JS-only navigation.
- **Images go in `public/images/`** (referenced as `/images/x.jpg`) with `alt`, `width`, and
  `height`. Post covers instead go beside the Markdown file so Astro can optimise them.
- **Reuse existing classes** from `global.css` rather than writing new CSS.

## Deployment

Vercel auto-detects Astro — build command `astro build`, output directory `dist`. Every push
to `main` rebuilds and deploys.

The production domain is set in two places and must match:

- `astro.config.mjs` → `site`
- `public/robots.txt` → `Sitemap:`

Submit `https://muheebsulaiman.com/sitemap-index.xml` to Google Search Console after the
domain goes live.

## Known gaps

- The contact form is markup only — it has no submit endpoint, same as the original site.
- `src/pages/ai-automation.astro` is an empty stub reusing the contact page's title and
  description; it needs content or removal before launch.
