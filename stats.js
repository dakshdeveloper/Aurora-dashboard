import{json,botGuilds}from'../_lib.js';
export async function onRequestGet({env}){const g=await botGuilds(env);const extra=env.AURORA_KV?JSON.parse(await env.AURORA_KV.get('botstats')||'{}'):{};
return new Response(JSON.stringify({servers:g.length,users:g.reduce((n,x)=>n+(x.approximate_member_count||0),0),commands:extra.commands||0,latency:extra.latency||0,...extra,servers:g.length}),{headers:{'content-type':'application/json','cache-control':'public, max-age=60'}})}
