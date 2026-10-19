const enc=new TextEncoder();
const key=s=>crypto.subtle.importKey('raw',enc.encode(s),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
export async function sign(o,s){const p=btoa(JSON.stringify(o));const g=await crypto.subtle.sign('HMAC',await key(s),enc.encode(p));return p+'.'+btoa(String.fromCharCode(...new Uint8Array(g)))}
export async function verify(t,s){if(!t)return null;const[p,g]=t.split('.');if(!g)return null;const sig=Uint8Array.from(atob(g),c=>c.charCodeAt(0));return await crypto.subtle.verify('HMAC',await key(s),sig,enc.encode(p))?JSON.parse(atob(p)):null}
export const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json'}});
export const D='https://discord.com/api/v10';
export async function session(req,env){const c=(req.headers.get('cookie')||'').match(/aurora=([^;]+)/);const s=await verify(c&&c[1],env.SESSION_SECRET);return s&&s.exp>Date.now()?s:null}
export async function botGuilds(env){let all=[],after='';for(let i=0;i<10;i++){const r=await fetch(`${D}/users/@me/guilds?limit=200&with_counts=true${after}`,{headers:{Authorization:'Bot '+env.DISCORD_BOT_TOKEN}});const a=await r.json();if(!Array.isArray(a))break;all=all.concat(a);if(a.length<200)break;after='&after='+a[a.length-1].id}return all}
export async function userGuilds(s){const r=await fetch(D+'/users/@me/guilds',{headers:{Authorization:'Bearer '+s.t}});const a=await r.json();return Array.isArray(a)?a:[]}
export const canManage=g=>g.owner||(BigInt(g.permissions)&0x28n)!==0n;
