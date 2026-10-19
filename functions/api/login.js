const CLIENT_ID = env => env.CLIENT_ID || "1551617059090337954";
export const onRequestGet = ({ request, env }) => {
  if (!env.CLIENT_SECRET || !env.SESSION_SECRET) return new Response("Aurora login is not configured yet. Set CLIENT_SECRET and SESSION_SECRET in Cloudflare Pages → Settings → Variables and Secrets.", { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } });
  const u = new URL(request.url);
  const state = crypto.randomUUID();
  const q = new URLSearchParams({ client_id: CLIENT_ID(env), redirect_uri: "https://auroraa.site/api/callback", response_type: "code", scope: "identify guilds", state });
  return new Response(null, { status: 302, headers: { Location: "https://discord.com/oauth2/authorize?" + q.toString(), "Set-Cookie": `st=${state}; Path=/api/callback; Max-Age=600; HttpOnly; Secure; SameSite=Lax`, "Cache-Control": "no-store" } });
};
