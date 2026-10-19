import { session, json, userGuilds, canManage, botGuilds } from "../_lib.js";
const INVITE = "https://discord.com/oauth2/authorize?client_id=1551617059090337954";
export async function onRequestGet({ request, env }) {
  const s = await session(request, env);
  if (!s) return json({ error: "auth" }, 401);
  const [mine, bot] = await Promise.all([userGuilds(s), botGuilds(env)]);
  const ids = new Set(bot.map(g => String(g.id)));
  return json(mine.filter(canManage).map(g => ({ id: g.id, name: g.name, icon: g.icon, hasBot: ids.has(String(g.id)), invite: INVITE })).sort((a, b) => Number(b.hasBot) - Number(a.hasBot)));
}
