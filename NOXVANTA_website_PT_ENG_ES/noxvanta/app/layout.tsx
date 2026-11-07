import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
const site=process.env.NEXT_PUBLIC_SITE_URL || "https://your-vercel-project.vercel.app";
export const metadata:Metadata={title:"NOXVANTA | Competitive VALORANT",description:"Official NOXVANTA esports organization website.",metadataBase:new URL(site),openGraph:{title:"NOXVANTA | COMPETE WITHOUT LIMITS",description:"Competitive VALORANT organization.",type:"website"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt"><body><LanguageProvider>{children}</LanguageProvider></body></html>; }
