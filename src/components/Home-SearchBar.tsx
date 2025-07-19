"use client";

import { Search } from "lucide-react";

export default function HomeSearchBar() {
    return (
        <div className="relative w-full max-w-3xl">
            <input
                type="text"
                className="w-full h-10 pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="검색어를 입력하세요."
            />
            <button
                type="button"
                aria-label="검색"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
                <Search size={20} />
            </button>
        </div>
    );
}