// @ts-check
import fs from "node:fs";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Custom LaTeX macros extracted from the original posts (which declared them
// inline with \newcommand and relied on MathJax's page global scope). KaTeX
// scopes macros per expression, so they are registered globally here instead.
const katexMacros = JSON.parse(
  fs.readFileSync(new URL("./src/katex-macros.json", import.meta.url), "utf8"),
);

// A few macros the posts used that came from MathJax defaults rather than an
// explicit \newcommand, so they are not in the extracted set.
const extraMacros = {
  "\\set": "\\left\\{#1\\right\\}",
  "\\argmin": "\\operatorname*{arg\\,min}",
  "\\argmax": "\\operatorname*{arg\\,max}",
};

const macros = { ...katexMacros, ...extraMacros };

// Code is highlighted client side with highlight.js (matching the original
// theme's useHLJS behavior), so Astro's build time highlighting is disabled.
// MDX inherits these markdown plugins via extendMarkdownConfig (default true).
export default defineConfig({
  site: "https://shrenikm.com",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false, macros }]],
    remarkRehype: { footnoteLabel: "References", footnoteBackLabel: "Back to content" },
  },
  integrations: [mdx(), pagefind()],
});
