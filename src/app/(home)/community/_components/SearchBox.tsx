"use client";

import Image from "next/image";

export default function SearchBox() {
  return (
    <div className="flex items-center gap-6">
      <div className="w-[570px] h-[60px] rounded-2xl px-[27px] border border-coolGray-30 flex items-center">
        <input
          type="text"
          // value={newComment}
          // onChange={(e) => setNewComment(e.target.value)}
          // onKeyPress={handleKeyPress}
          placeholder={"검색어를 입력하세요."}
          // disabled={!isAuthenticated}
          className="w-full bg-transparent text-coolGray-30 placeholder-coolGray-30 focus:outline-none text-lg disabled:opacity-50"
        />
        <button
          // onClick={handleAddComment}
          // disabled={!newComment.trim() || !isAuthenticated}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src="/icons/icon-enter.png"
            alt="등록"
            width={43}
            height={43}
          />
        </button>
      </div>
      <button className="h-[53px] w-[150px] text-xl py-3 bg-coolGray-80 rounded-[5px]">
        글 작성하기
      </button>
    </div>
  );
}
