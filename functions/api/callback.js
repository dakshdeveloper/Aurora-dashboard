import { sign, D } from "../_lib.js";
export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const stateCookie = (request.headers.get("cookie") || "").match(/(?:^|;\s*)st=([^;]+)/);
  const state = u.searchParams.get("state");
  const code = u.searchParams.get("code");
  const clearState = "st=; Path=/api/callback; Max-Age=0; HttpOnly; Secure; SameSite=Lax";
  if (u.searchParams.has("error")) return new Response("Discord login was cancelled. Return to Aurora and try again.", { status: 400, headers: { "Set-Cookie": clearState } });
  if (!stateCookie || !state || stateCookie[1] !== state || !code) return new Response("Login verification failed. Please return to Aurora and try again.", { status: 400, headers: { "Set-Cookie": clearState } });
  if (!(env.CLIENT_ID || "1551617059090337954") || !env.CLIENT_SECRET || !env.SESSION_SECRET) return new Response("Aurora login is not configured. Check Cloudflare Pages secrets.", { status: 500, headers: { "Set-Cookie": clearState } });
  const r = await fetch(D + "/oauth2/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.CLIENT_ID || "1551617059090337954", client_secret: env.CLIENT_SECRET, grant_type: "authorization_code", code, redirect_uri: "https://auroraa.site/api/callback" }) });
  const t = await r.json();
  if (!r.ok || !t.access_token) return new Response("Discord could not complete login. Confirm the OAuth2 Redirect URL is exactly https://auroraa.site/api/callback and try again.", { status: 400, headers: { "Set-Cookie": clearState } });
  const token = await sign({ t: t.access_token, exp: Date.now() + 604800000 }, env.SESSION_SECRET);
  const headers = new Headers({ Location: "/dashboard", "Cache-Control": "no-store" });
  headers.append("Set-Cookie", `aurora=${token}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`);
  headers.append("Set-Cookie", clearState);
  return new Response(null, { status: 302, headers });
}
