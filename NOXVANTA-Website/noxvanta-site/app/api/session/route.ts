import {NextRequest,NextResponse} from "next/server";
import {createHmac,timingSafeEqual} from "crypto";
export const runtime="nodejs";
export async function GET(req:NextRequest) {
 const token=req.cookies.get("nxv_session")?.value, secret=process.env.SESSION_SECRET;
 if(!token||!secret) return NextResponse.json({authenticated:false},{status:401});
 const [payload,sig]=token.split(".");
 if(!payload||!sig) return NextResponse.json({authenticated:false},{status:401});
 const expected=createHmac("sha256",secret).update(payload).digest("base64url");
 const a=Buffer.from(sig),b=Buffer.from(expected);
 if(a.length!==b.length||!timingSafeEqual(a,b)) return NextResponse.json({authenticated:false},{status:401});
 try {const data=JSON.parse(Buffer.from(payload,"base64url").toString()); if(data.exp<Date.now()) throw Error(); return NextResponse.json({authenticated:true,user:data.user});}
 catch{return NextResponse.json({authenticated:false},{status:401});}
}
