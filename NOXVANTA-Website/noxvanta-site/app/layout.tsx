import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "NOXVANTA — Official Esports",
 description: "NOXVANTA VALORANT team and tactical hub",
 metadataBase: new URL("https://noxvanta.gg")
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="pt"><body>{children}</body></html>;
}
