// Build a short plain text excerpt from a raw MDX body, used for the post
// cards on list pages. Strips component tags, markdown syntax and math so the
// preview reads as clean prose.

export function excerpt(body: string | undefined, wordCount = 70): string {
  if (!body) return "";
  let text = body;

  // Drop fenced code blocks entirely.
  text = text.replace(/```[\s\S]*?```/g, " ");
  // Drop display and inline math.
  text = text.replace(/\$\$[\s\S]*?\$\$/g, " ");
  text = text.replace(/\$[^$\n]*\$/g, " ");
  // Drop footnote reference markers like [^ref1].
  text = text.replace(/\[\^[^\]]*\]/g, " ");
  // Drop component / html tags.
  text = text.replace(/<[^>]+>/g, " ");
  // Strip markdown image and link syntax, keeping link text.
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  // Keep link text, including links whose text itself contains brackets,
  // e.g. a reference link like [[1]](#ref1) should reduce to [1].
  text = text.replace(/\[((?:\[[^\]]*\]|[^[\]])*)\]\([^)]*\)/g, "$1");
  // Strip common markdown markers.
  text = text.replace(/[#>*_`~]/g, " ");
  // Collapse whitespace.
  text = text.replace(/\s+/g, " ").trim();

  const words = text.split(" ").filter(Boolean);
  if (words.length <= wordCount) return words.join(" ");
  return words.slice(0, wordCount).join(" ") + "…";
}
