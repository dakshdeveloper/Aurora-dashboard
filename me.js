import{session,json,D}from'../_lib.js';
export async function onRequestGet({request,env}){const s=await session(request,env);if(!s)return json({error:'auth'},401);
const r=await fetch(D+'/users/@me',{headers:{Authorization:'Bearer '+s.t}});return json(await r.json(),r.status)}
