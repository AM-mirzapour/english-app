import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import RootProvider from "@/providers/RootProvider";
import "./globals.css";

const vazirFont = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn", 
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "LangPath",
  description: "Learn English",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirFont.variable} font-sans`} suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-blue-200">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}