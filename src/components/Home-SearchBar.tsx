import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/SearchContext";

export default function HomeSearchBar() {
  const navigate = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      navigate.push(`/news/${encodedQuery}`);
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <input
        type="text"
        className="w-full h-10 pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="검색어를 입력하세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        type="button"
        aria-label="검색"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
        onClick={handleSearch}
      >
        <Search size={20} />
      </button>
    </div>
  );
}
