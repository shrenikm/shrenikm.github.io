# Website

Personal site, built with [Astro](https://astro.build) + MDX. Posts and pages are authored as MDX under `src/content/`.

## Commands

```sh
npm install      # install dependencies
npm run dev      # local dev server with hot reload
npm run build    # static build into dist/
npm run preview  # serve the built dist/ locally
```

## Layout

```
src/
  consts.ts                site config: menu, social links, analytics, integrations
  content.config.ts        posts + pages collections (typed frontmatter)
  utils.ts                 excerpt helper for post cards
  feed.ts                  RSS builder (served at /rss.xml and /index.xml)
  katex-macros.json        custom LaTeX macros for KaTeX
  layouts/BaseLayout.astro head, nav, header, footer shell
  components/              Nav, Header, Footer, PostMeta, PostPreview,
                          Figure, YouTube, Gallery, HeartButton, Comments
  pages/                  index, posts/[...slug], pages/[...slug],
                          tags/index, tags/[tag], rss.xml, index.xml
public/
  css/ js/ fonts/         styles, scripts, self-hosted fonts
  posts/ pages/           post and page images
  CNAME                   custom domain
worker/                   Cloudflare Worker backing the like/heart counts
.github/workflows/        GitHub Actions deploy to Pages
```
