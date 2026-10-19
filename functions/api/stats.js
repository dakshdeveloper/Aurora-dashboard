import { json } from "../_lib.js";
export async function onRequestGet({ env }) {
  if (!env.AURORA_KV) return json({ servers: 0, users: 0, commands: 0, latency: 0 });
  try {
    const extra = JSON.parse(await env.AURORA_KV.get("botstats") || "{}");
    return new Response(JSON.stringify({ servers: Array.isArray(extra.guildIds) ? extra.guildIds.length : Number(extra.servers || 0), users: Number(extra.users || 0), commands: Number(extra.commands || 0), latency: Number(extra.latency || 0) }), { headers: { "content-type": "application/json", "cache-control": "public, max-age=60" } });
  } catch { return json({ servers: 0, users: 0, commands: 0, latency: 0 }); }
}
