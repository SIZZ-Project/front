import Link from "next/link";

export default function MyPageMenu() {
  return (
    <div className="flex flex-col gap-3">
      <h2>마이페이지 메뉴</h2>
      <div className="bg-white h-[2px] w-60" />
      <Link href="/myProfile/profile">계정</Link>
      <Link href="/myProfile/scrapArticle">스크랩한 콘텐츠</Link>
      <Link href="/myProfile/goodArticle">좋아요한 콘텐츠</Link>
      <Link href="/myProfile/allWriting">내가 쓴 글 모음</Link>
      <Link href="/myProfile/settings">설정</Link>
    </div>
  );
}
