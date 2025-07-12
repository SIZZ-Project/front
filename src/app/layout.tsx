import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/layout/NavBar";
import "../styles/globals.css"; // tailwind 포함된 글로벌 CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "SIZZ 뉴스",
    description: "공정하고 신뢰할 수 있는 뉴스 플랫폼",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}