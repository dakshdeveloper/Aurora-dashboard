export const onRequest=()=>new Response(null,{status:302,headers:{Location:'/','Set-Cookie':'aurora=; Path=/; Max-Age=0; HttpOnly; Secure'}});
