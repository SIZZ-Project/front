import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import ClientLayout from "./layout.client";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIZZ 뉴스",
  description: "공정하고 신뢰할 수 있는 뉴스 플랫폼",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <ClientLayout>
            <main className="flex-grow">{children}</main>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
