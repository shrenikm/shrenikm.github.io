import { getCollection } from "astro:content";
import { BASE_URL } from "../consts";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

function urlEntry(entry: SitemapEntry): string {
  const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "";
  return `  <url><loc>${entry.loc}</loc>${lastmod}</url>`;
}

// Hand rolled sitemap (no extra integration) covering the home page, the tags
// index, every published post, every static page and every tag listing.
export async function GET(): Promise<Response> {
  const posts = (await getCollection("posts")).filter((p) => !p.data.draft);
  const pages = await getCollection("pages");

  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }

  const entries: SitemapEntry[] = [
    { loc: `${BASE_URL}/` },
    { loc: `${BASE_URL}/tags/` },
  ];
  for (const post of posts) {
    entries.push({
      loc: `${BASE_URL}/posts/${post.id}/`,
      lastmod: post.data.date.toISOString().slice(0, 10),
    });
  }
  for (const page of pages) {
    entries.push({ loc: `${BASE_URL}/pages/${page.id}/` });
  }
  for (const tag of tags) {
    entries.push({ loc: `${BASE_URL}/tags/${tag}/` });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlEntry).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
