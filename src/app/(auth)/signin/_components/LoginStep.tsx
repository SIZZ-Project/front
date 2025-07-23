import Link from "next/link";

export default function LoginStep() {
  return (
    <div className="w-full mx-auto flex flex-col gap-1">
      <input
        type="text"
        className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
        placeholder="이메일 또는 휴대전화"
      />
      <Link className="text-2xl text-primary-10" href={"/"}>
        이메일을 잊으셨나요?
      </Link>
    </div>
  );
}
