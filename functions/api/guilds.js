import{session,json,botGuilds,userGuilds,canManage}from'../_lib.js';
export async function onRequestGet({request,env}){const s=await session(request,env);if(!s)return json({error:'auth'},401);
const [mine,bot]=await Promise.all([userGuilds(s),botGuilds(env)]);const ids=new Set(bot.map(g=>g.id));
return json(mine.filter(canManage).map(g=>({id:g.id,name:g.name,icon:g.icon,hasBot:ids.has(g.id),
invite:`https://discord.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands&guild_id=${g.id}&disable_guild_select=true`})).sort((a,b)=>b.hasBot-a.hasBot))}
