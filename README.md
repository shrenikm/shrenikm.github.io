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
  utils.ts                 excerpt + reading time helpers for posts
  icons.ts                 inline SVG icon data (Font Awesome paths)
  feed.ts                  RSS builder (served at /rss.xml and /index.xml)
  katex-macros.json        custom LaTeX macros for KaTeX
  layouts/BaseLayout.astro head (meta, OG/Twitter, favicon), nav, footer shell
  components/              Nav, Header, Footer, PostMeta, PostPreview, Icon,
                          Figure, YouTube, Gallery, HeartButton, ShareButtons,
                          Comments
  pages/                  index, posts/[...slug], pages/[...slug], tags/index,
                          tags/[tag], search, 404, rss.xml, index.xml, sitemap.xml
public/
  css/ js/ fonts/         styles, scripts, self-hosted fonts
  posts/ pages/           post and page images
  favicon.ico             browser tab icon (apple-touch-icon.png for OG/Apple)
  robots.txt              points crawlers at the sitemap
  CNAME                   custom domain
worker/                   Cloudflare Worker backing the like/heart counts
.github/workflows/        GitHub Actions deploy to Pages
```

Search is powered by [Pagefind](https://pagefind.app): it indexes the built
site at `astro build` time, so search only returns results from `npm run build`
/ `npm run preview` (and production), not from `npm run dev`.
