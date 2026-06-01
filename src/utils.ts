// Helpers for turning a raw MDX body into reader facing text: a short excerpt
// for post cards and a reading time estimate for the post header.

const WORDS_PER_MINUTE = 220;

// Strip component tags, markdown syntax and math from an MDX body so what
// remains is clean prose suitable for counting words or building a preview.
function toPlainText(body: string): string {
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
  // Strip markdown image syntax.
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  // Keep link text, including links whose text itself contains brackets,
  // e.g. a reference link like [[1]](#ref1) should reduce to [1].
  text = text.replace(/\[((?:\[[^\]]*\]|[^[\]])*)\]\([^)]*\)/g, "$1");
  // Strip common markdown markers.
  text = text.replace(/[#>*_`~]/g, " ");
  // Collapse whitespace.
  return text.replace(/\s+/g, " ").trim();
}

export function excerpt(body: string | undefined, wordCount = 70): string {
  if (!body) return "";
  const words = toPlainText(body).split(" ").filter(Boolean);
  if (words.length <= wordCount) return words.join(" ");
  return words.slice(0, wordCount).join(" ") + "…";
}

export function readingTimeMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = toPlainText(body).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
