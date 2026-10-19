import{json}from'../../_lib.js';
// Bot-only endpoint. Header: Authorization: Bearer <BOT_API_SECRET>
// GET /api/bot/<guildId> -> guild config | POST /api/bot/stats {commands,latency,uptime,voice}
export async function onRequest({request,env,params}){if(request.headers.get('authorization')!=='Bearer '+env.BOT_API_SECRET)return json({error:'no'},401);
if(request.method==='POST'&&params.id==='stats'){await env.AURORA_KV.put('botstats',JSON.stringify(await request.json()));return json({ok:true})}
return json(JSON.parse(await env.AURORA_KV.get('guild:'+params.id)||'{}'))}
