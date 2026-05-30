# new_website (Astro proof of concept)

A rebuild of the current Hugo site in [Astro](https://astro.build) + MDX, to
prove out moving off Hugo while keeping markdown authoring and gaining a
component escape hatch.

## Commands

```sh
npm install      # install dependencies (already done)
npm run dev      # local dev server with hot reload
npm run build    # static build into dist/
npm run preview  # serve the built dist/ locally
```

## How it works

- Posts and pages are authored as MDX in `src/content/posts` and
  `src/content/pages`. A normal post is plain markdown, exactly like Hugo.
- When markdown is not enough, drop a component tag into the MDX. The
  components are injected automatically (see `src/pages/posts/[...slug].astro`),
  so posts never need import statements:
  - `<Figure src="..." alt="..." />` — replaces the Hugo `figure` shortcode.
  - `<YouTube id="..." />` — replaces the Hugo `youtube` shortcode.
  - `<Gallery images={[...]} />` — new scrollable image gallery. Preview it at
    `/gallery-demo/`.
- Math: `remark-math` + `rehype-katex`. The custom LaTeX macros the posts used
  (declared inline with `\newcommand` under MathJax) are registered globally
  with KaTeX in `astro.config.mjs` via `src/katex-macros.json`.
- Code: highlighted client side with highlight.js, matching the old theme.
- Look: the forked beautifulhugo `main.css` is reused (`public/css`) and the
  layouts reproduce the same markup (navbar, banner header, post cards, author
  footer). There is no theme watermark.

## Layout

```
src/
  consts.ts                site config, menu, social links
  content.config.ts        posts + pages collections (typed frontmatter)
  utils.ts                 excerpt helper for post cards
  katex-macros.json        custom LaTeX macros for KaTeX
  layouts/BaseLayout.astro head, nav, header, footer shell
  components/              Nav, Header, Footer, PostMeta, PostPreview,
                          Figure, YouTube, Gallery
  pages/                  index, posts/[...slug], pages/[...slug],
                          tags/index, tags/[tag], rss.xml, gallery-demo
public/
  css/ js/                theme assets copied from the fork
  posts/ pages/           images and gifs copied from website_src/static
```

## Not yet wired (intentionally, for the POC)

- Disqus comments, social share buttons, SEO/OpenGraph meta, sitemap.
- Deployment to the `shrenikm.github.io` repo (the `dist/` output would go
  there, same as Hugo's `public/`).
- These are straightforward to add if the approach is approved.
