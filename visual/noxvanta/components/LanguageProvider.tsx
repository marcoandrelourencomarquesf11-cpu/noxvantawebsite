"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { dictionaries, Lang } from "@/lib/i18n";
const Ctx = createContext<{lang:Lang;setLang:(v:Lang)=>void; t:typeof dictionaries.pt}>({lang:"pt",setLang:()=>{},t:dictionaries.pt});
export function LanguageProvider({children}:{children:React.ReactNode}) {
 const [lang,setLang]=useState<Lang>("pt");
 const value=useMemo(()=>({lang,setLang,t:dictionaries[lang]}),[lang]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useLanguage=()=>useContext(Ctx);
