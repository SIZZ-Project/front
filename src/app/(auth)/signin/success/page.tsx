import PopUp from "@/components/PopUp";

export function AuthSuccessPage() {
  return (
    <PopUp>
      <span className="font-bold">OO님</span>, Sizz에 오신 걸 환영합니다
      <br />
      로그인에 성공했습니다
    </PopUp>
  );
}
