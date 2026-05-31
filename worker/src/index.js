// Cloudflare Worker backing the site's heart / like button.
//
// One Durable Object per post slug holds that post's like count plus a set of
// hashed visitor IPs used to enforce one like per IP. The IP is never stored
// raw: only a salted SHA-256 hash is kept, so no personal data is retained.
// A GET returns the current count; a POST records a like (idempotent per IP).

const ALLOWED_ORIGINS = [
  "https://shrenikm.com",
  "https://shrenikm.github.io",
];

// Change this to any random string before deploying. It salts the IP hashes so
// stored values cannot be reversed back to raw addresses.
const IP_HASH_SALT = "change-me-to-a-random-string";

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export class HeartCounter {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    let count = (await this.state.storage.get("count")) || 0;

    if (request.method === "POST") {
      const ip = request.headers.get("CF-Connecting-IP") || "";
      const key = "liked:" + (await sha256(ip + IP_HASH_SALT));
      const already = await this.state.storage.get(key);
      if (!already) {
        count += 1;
        await this.state.storage.put("count", count);
        await this.state.storage.put(key, true);
      }
    }

    return Response.json({ count });
  }
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const slug = new URL(request.url).searchParams.get("slug");
    if (!slug) {
      return new Response(JSON.stringify({ error: "missing slug" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const id = env.HEARTS.idFromName(slug);
    const res = await env.HEARTS.get(id).fetch(request);
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
