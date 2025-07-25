import { ReactNode } from "react";
import "./globals.css";
import MyPageMenu from "@/app/myProfile/components/myPageMenu";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <MyPageMenu />
            {children}
        </div>
    );
}
