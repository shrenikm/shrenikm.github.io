import { getCollection } from "astro:content";
import { BASE_URL, SITE_TITLE } from "../consts";

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

export async function GET() {
  const posts = (await getCollection("posts"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.data.title)}</title>
      <link>${BASE_URL}/posts/${p.id}/</link>
      <guid>${BASE_URL}/posts/${p.id}/</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}/</link>
    <description>${escapeXml(SITE_TITLE)}</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
