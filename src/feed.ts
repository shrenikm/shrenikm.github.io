import { getCollection } from "astro:content";
import { AUTHOR, BASE_URL, SITE_DESCRIPTION } from "./consts";
import { excerpt } from "./utils";

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] ?? c,
  );
}

export async function buildFeedResponse(): Promise<Response> {
  const posts = (await getCollection("posts"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const lastBuildDate = (
    posts.length ? posts[0].data.date : new Date(0)
  ).toUTCString();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.data.title)}</title>
      <link>${BASE_URL}/posts/${p.id}/</link>
      <guid>${BASE_URL}/posts/${p.id}/</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(excerpt(p.body))}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss-styles.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AUTHOR.name)}</title>
    <link>${BASE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
