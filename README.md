# Aurora — website + Discord dashboard (Cloudflare Pages)
Static site (`public/`) + serverless API (`functions/`). No separate server needed.

## Deploy
1. Push this folder to your GitHub repo.
2. Cloudflare → Workers & Pages → Create → Pages → connect repo. Build command: none, output dir: `public`.
3. Add custom domain `auroraa.site`.
4. Cloudflare → KV → create namespace `aurora`. Pages project → Settings → Functions → KV bindings: variable `AURORA_KV`.
5. Pages → Settings → Environment variables (secrets): `CLIENT_ID`, `CLIENT_SECRET` (Discord Developer Portal → OAuth2), `DISCORD_BOT_TOKEN`, `SESSION_SECRET` (long random string), `BOT_API_SECRET` (long random string).
6. Discord Developer Portal → OAuth2 → Redirects: add `https://auroraa.site/api/callback`.
7. Replace `YOUR_SUPPORT` in `public/index.html` with your support invite.

## Bot integration
- Read a server's settings: `GET https://auroraa.site/api/bot/<guildId>` with header `Authorization: Bearer <BOT_API_SECRET>`.
- Push live stats: `POST https://auroraa.site/api/bot/stats` with JSON `{"commands":1234,"latency":42}`. Server/user counts come straight from Discord.
- Add or edit dashboard options in the `MODULES` object in `public/dashboard.html`.
