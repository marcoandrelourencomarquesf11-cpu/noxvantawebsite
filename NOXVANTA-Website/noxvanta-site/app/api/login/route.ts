import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
export const runtime = "nodejs";
function equal(a:string,b:string) {
 const x=Buffer.from(a), y=Buffer.from(b);
 return x.length===y.length && timingSafeEqual(x,y);
}
export async function POST(req:NextRequest) {
 const required=["ADMIN_USERNAME","ADMIN_PASSWORD","SESSION_SECRET","ADMIN_SECURITY_ANSWER"];
 if(required.some(k=>!process.env[k])) return NextResponse.json({error:"Autenticação não configurada no servidor."},{status:503});
 const body=await req.json().catch(()=>null);
 if(!body) return NextResponse.json({error:"Pedido inválido."},{status:400});
 const answer=String(body.answer??"").trim().toLocaleLowerCase("pt-PT");
 const expected=String(process.env.ADMIN_SECURITY_ANSWER).trim().toLocaleLowerCase("pt-PT");
 const valid=equal(String(body.username??""),String(process.env.ADMIN_USERNAME)) &&
 equal(String(body.password??""),String(process.env.ADMIN_PASSWORD)) && equal(answer,expected);
 if(!valid) return NextResponse.json({error:"Credenciais ou resposta incorretas."},{status:401});
 const exp=Date.now()+8*60*60*1000;
 const payload=Buffer.from(JSON.stringify({user:process.env.ADMIN_USERNAME,exp})).toString("base64url");
 const sig=createHmac("sha256",String(process.env.SESSION_SECRET)).update(payload).digest("base64url");
 const res=NextResponse.json({ok:true,user:process.env.ADMIN_USERNAME});
 res.cookies.set("nxv_session",payload+"."+sig,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:8*60*60});
 return res;
}
