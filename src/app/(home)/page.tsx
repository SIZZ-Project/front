"use client";

import { useEffect, useState } from "react";
import '../../styles/globals.css';
import TopSection from "@/app/(home)/components/home-top/TopSection";

export default function NavBar() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="w-full flex flex-col items-center justify-center gap-12">
            <TopSection />
        </main>
    );
}