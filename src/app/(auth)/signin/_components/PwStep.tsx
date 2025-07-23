import Image from "next/image";
import Link from "next/link";

export default function PwStep() {
  return (
    <div className="w-full mx-auto flex flex-col gap-[4rem]">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
          placeholder="이메일 또는 휴대전화"
        />
        <Link className="text-2xl text-primary-10" href={""}>
          이메일을 잊으셨나요?
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="bg-coolGray-40 h-[1px] w-full" />
          <div className="flex items-center justify-between">
            <Link className="text-2xl text-coolGray-30" href={""}>
              회원가입
            </Link>
            <button className="text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center">
              다음
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link className="text-2xl text-coolGray-10" href={""}>
            다른 계정으로 로그인하기
          </Link>
          <Image
            src={"/icons/icon-google.svg"}
            width={50}
            height={50}
            alt="구글 로그인 아이콘"
          />
        </div>
      </div>
    </div>
  );
}
