import Link from "next/link";

export default function MyPageMenu() {
    return(
            <div className="flex flex-col gap-3">
                <h2>마이페이지 메뉴</h2>
                <div className="bg-white h-[2px] w-60"></div>
                <Link href="/account">계정</Link>
                <Link href="/scrapArticle">스크립한 기사</Link>
                <Link href="/goodArticle">좋아요 기사</Link>
                <Link href="/settings">설정</Link>
            </div>
    )
}