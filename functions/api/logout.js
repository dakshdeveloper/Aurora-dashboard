export const onRequest = () => {
  const headers = new Headers({ Location: "/", "Cache-Control": "no-store" });
  headers.append("Set-Cookie", "aurora=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
  headers.append("Set-Cookie", "st=; Path=/api/callback; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
  return new Response(null, { status: 302, headers });
};
