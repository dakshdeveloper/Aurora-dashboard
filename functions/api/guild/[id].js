import{session,json,userGuilds,canManage}from'../../_lib.js';
async function auth(request,env,id){const s=await session(request,env);if(!s)return 0;const g=(await userGuilds(s)).find(x=>x.id===id);return g&&canManage(g)}
export async function onRequestGet({request,env,params}){if(!await auth(request,env,params.id))return json({error:'forbidden'},403);
return json(JSON.parse(await env.AURORA_KV.get('guild:'+params.id)||'{}'))}
export async function onRequestPost({request,env,params}){if(!await auth(request,env,params.id))return json({error:'forbidden'},403);
const t=await request.text();if(t.length>50000)return json({error:'too large'},413);JSON.parse(t);await env.AURORA_KV.put('guild:'+params.id,t);return json({ok:true})}
