# Aurora — Discord dashboard (Cloudflare Pages)

This project uses Aurora as the product name. The registered website domain is `auroraa.site` (keep the extra “a” in the domain).

## Correct repository layout

Upload the *contents* of this folder to the root of your GitHub repository, so `public/`, `functions/`, `wrangler.toml`, and `README.md` are at the repository root. Do not upload the outer `aurora/` folder itself as an extra nesting level.

## Cloudflare Pages deployment

- Framework preset: `None`
- Build command: leave empty / `None`
- Build output directory: `public`
- Root directory: leave empty (repository root)
- Do not use `npx wrangler deploy` or `npx wrangler pages deploy public` as a Cloudflare Pages build/deploy command when using the built-in Git integration. Let Pages deploy the connected repository.

Add the custom domain `auroraa.site` in the Cloudflare Pages project. Do not delete or change existing DNS records used by Zoho Mail.

## Cloudflare Pages runtime configuration

In **Cloudflare Dashboard → Workers & Pages → aurora-dashboard → Settings → Variables and Secrets**, add these as encrypted secrets (use the exact names):

- `CLIENT_ID` — Discord Developer Portal → your application → OAuth2 → Client ID (the supplied bot invite uses `1551617059090337954`; keep this value matching the same Discord application)
- `CLIENT_SECRET` — Discord Developer Portal → your application → OAuth2 → Client Secret
- `DISCORD_BOT_TOKEN` — Discord Developer Portal → your bot → Token
- `SESSION_SECRET` — generate a long, random secret; do not reuse another secret
- `BOT_API_SECRET` — generate a different long, random secret

Create a Cloudflare KV namespace, then bind it to the Pages project under **Settings → Bindings → KV namespace** with variable name `AURORA_KV`.

Also add the exact OAuth2 Redirect URL `https://auroraa.site/api/callback` in Discord Developer Portal → OAuth2 → Redirects. Do not use the `www` hostname unless you change the code and redirect URL together.

The website Add to Discord buttons use your supplied invite URL. Server cards will show “Manage server” only after the bot process posts its current guild IDs into `POST /api/bot/stats` as `{"guildIds":["SERVER_ID"],"servers":1,"users":100,"commands":0,"latency":40}`. The web project cannot discover which guilds the bot joined from the bot token alone; the bot process must send these stats.

These are Cloudflare Pages runtime settings. Add them to **GitHub Actions Secrets only if you have a GitHub Actions workflow that explicitly uses them**. Never commit secret values to the repository or share them in chat.

## Discord OAuth redirect

In Discord Developer Portal → OAuth2 → Redirects, add:

`https://auroraa.site/api/callback`

## Bot API notes

- Read a server's settings: `GET https://auroraa.site/api/bot/<guildId>` with header `Authorization: Bearer <BOT_API_SECRET>`.
- Post stats: `POST https://auroraa.site/api/bot/stats` with JSON such as `{"commands":1234,"latency":42}` and the same Bearer secret.
- Replace `YOUR_SUPPORT` in `public/index.html` with your support invite URL before publishing.
- In Cloudflare Pages, set build output directory to `public`, and create the `AURORA_KV` binding before redeploying.
