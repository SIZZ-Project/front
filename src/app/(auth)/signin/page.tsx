import Link from "next/link";
import Header from "./_components/Header";

export default function SignInPage() {
  return (
    <div>
      <Header />

      <div className="flex flex-col gap-1">
        <input
          type="text"
          className="bg-transparent border border-coolGray-10 rounded-xl w-[37.5rem] h-[6.25rem] text-4xl pl-6"
          placeholder="이메일 또는 휴대전화"
        />
        <Link className="text-2xl text-[#C3D7FF]" href={""}>
          이메일을 잊으셨나요?
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <Link className="text-2xl text-coolGray-30" href={""}>
          회원가입
        </Link>
        <button className="text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center">
          다음
        </button>
      </div>
    </div>
  );
}
