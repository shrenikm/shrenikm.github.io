# heart-worker

Cloudflare Worker backing the site's per-post heart / like counts. One Durable
Object per post slug holds the count plus salted-hashed visitor IPs (one like
per IP; raw IPs are never stored). The static site calls it from the browser.

## Endpoints

- `GET  /?slug=<post-id>`  ->  `{ "count": <n> }`
- `POST /?slug=<post-id>`  ->  `{ "count": <n> }`  (one like per IP)

## Deploy

```sh
npm install
# set IP_HASH_SALT in src/index.js to any random string
# set ALLOWED_ORIGINS in src/index.js to the site's domain(s)
npx wrangler deploy
```

Auth: either `npx wrangler login` (OAuth) or a scoped API token created from the
"Edit Cloudflare Workers" template, passed as `CLOUDFLARE_API_TOKEN`.

Gotcha: the first deploy on a fresh account fails until a workers.dev subdomain
exists. Open the Workers section of the Cloudflare dashboard once to create it,
then re-run `npx wrangler deploy`.

After deploying, set `HEART_API_URL` in `../src/consts.ts` to the printed URL.

## Free tier

100,000 requests/day; Durable Objects (SQLite-backed) included.

## Local

`npx wrangler dev` runs it at http://localhost:8787 with no account needed.
