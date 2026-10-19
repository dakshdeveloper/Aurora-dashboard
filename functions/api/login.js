export const onRequestGet=({request,env})=>{const u=new URL(request.url);const st=crypto.randomUUID();
const q=new URLSearchParams({client_id:env.CLIENT_ID,redirect_uri:u.origin+'/api/callback',response_type:'code',scope:'identify guilds',state:st});
return new Response(null,{status:302,headers:{Location:'https://discord.com/oauth2/authorize?'+q,'Set-Cookie':`st=${st}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`}})};
