# heart-worker

Cloudflare Worker that stores the site's per-post heart / like counts. One
Durable Object per post slug holds the count and a set of salted-hashed visitor
IPs (one like per IP; raw IPs are never stored). The static site calls it from
the browser; nothing here runs on your machine after you deploy.

## One-time deploy

```sh
cd worker
npm install                 # installs wrangler locally
npx wrangler login          # opens a browser, authorizes your Cloudflare account (free)
# edit src/index.js: set IP_HASH_SALT to any random string
npx wrangler deploy         # uploads the worker; prints its URL
```

After `deploy` you get a URL like `https://heart-worker.<you>.workers.dev`.
Put that URL in `../src/consts.ts` as `HEART_API_URL`, rebuild the site, and the
heart goes live. You only re-run `deploy` if you change this worker's code.

## Endpoints

- `GET  /?slug=<post-id>` -> `{ "count": <n> }` (current likes)
- `POST /?slug=<post-id>` -> `{ "count": <n> }` (records one like for this IP)

## Free tier

Workers free allows 100,000 requests/day and Durable Objects (SQLite-backed
storage) are included on the free plan. A blog doing a few hundred views a month
is nowhere near any limit.

## Local testing

```sh
npx wrangler dev            # serves the worker at http://localhost:8787
```

`http://localhost:4321` (Astro dev) is already in the allowed CORS origins.
