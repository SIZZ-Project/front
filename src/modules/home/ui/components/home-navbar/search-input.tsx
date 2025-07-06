import {SearchIcon} from "lucide-react";

export const SearchInput = () => {
    return(
        <form>
            <div>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요."
                    className=""
                />

                <div>
                    <button
                    type="submit"
                    className=""
                    >
                        <SearchIcon className="size-5" />
                    </button>
                </div>
            </div>
        </form>
    );
}