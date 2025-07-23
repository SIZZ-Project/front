"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginSuccessModal from "./LoginSuccessModal";

type FormValues = {
  email: string;
  password: string;
};

export default function Form() {
  const [step, setStep] = useState<"ID" | "PASSWORD">("ID");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="max-w-[37.5rem] w-full mx-auto flex flex-col gap-[4rem]"
      >
        <div className="w-full mx-auto flex flex-col gap-1">
          <input
            type={step === "ID" ? "text" : "password"}
            {...register(step === "ID" ? "email" : "password", {
              required: true,
            })}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="이메일 또는 휴대전화"
          />
          {step === "ID" && (
            <Link className="text-2xl text-primary-10" href={"/"}>
              이메일을 잊으셨나요?
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="bg-coolGray-40 h-[1px] w-full" />
            <div className="flex items-center justify-between">
              <button
                className="text-2xl text-coolGray-30 cursor-pointer"
                onClick={() => setStep(step === "ID" ? "PASSWORD" : "ID")}
              >
                {step === "ID" ? "회원가입" : "이전으로"}
              </button>
              <button
                onClick={() => setStep("PASSWORD")}
                className="cursor-pointer text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center"
              >
                {step === "ID" ? "다음" : "완료"}
              </button>
            </div>
          </div>
          {step === "ID" && (
            <div className="flex items-center justify-between">
              <Link className="text-2xl text-coolGray-10" href={"/"}>
                다른 계정으로 로그인하기
              </Link>
              <Image
                src={"/icons/icon-google.svg"}
                width={50}
                height={50}
                alt="구글 로그인 아이콘"
              />
            </div>
          )}
        </div>
      </form>
      <LoginSuccessModal isOpen={true} onClose={() => {}}>
        <div className="w-[37.5rem] h-[38.0625rem] rounded-xl bg-red-400 backdrop-blur-[20px]">
          faokaokgaok
        </div>
      </LoginSuccessModal>
    </>
  );
}
