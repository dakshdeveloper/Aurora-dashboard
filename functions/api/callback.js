import{sign,D}from'../_lib.js';
export async function onRequestGet({request,env}){const u=new URL(request.url);const c=(request.headers.get('cookie')||'').match(/st=([^;]+)/);
if(!c||c[1]!==u.searchParams.get('state'))return new Response('Invalid state',{status:400});
const r=await fetch(D+'/oauth2/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:env.CLIENT_ID,client_secret:env.CLIENT_SECRET,grant_type:'authorization_code',code:u.searchParams.get('code'),redirect_uri:u.origin+'/api/callback'})});
const t=await r.json();if(!t.access_token)return new Response('Login failed',{status:400});
const tok=await sign({t:t.access_token,exp:Date.now()+6048e5},env.SESSION_SECRET);
return new Response(null,{status:302,headers:{Location:'/dashboard',"Set-Cookie":`aurora=${tok}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`}})}
