"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthApiClient from "@/api/UserApiClient";
import { LoginRequest } from "@/type";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

export default function Form() {
  const [step, setStep] = useState<"ID" | "PASSWORD">("ID");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleStepToggle = () => {
    setStep((prev) => (prev === "ID" ? "PASSWORD" : "ID"));
  };

  const handleNextOrSubmit = async () => {
    if (step === "ID") {
      setStep("PASSWORD");
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      const formData = getValues();
      const loginData: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      const authApi = AuthApiClient.getInstance();
      const response = await authApi.postAuthLogin(loginData);

      console.log("로그인 폼에서 응답 확인:", response);

      // 로그인 성공 토스트 메시지
      toast.success("로그인에 성공했습니다!");

      // 로그인 성공 시 리다이렉트 처리
      const redirectUrl = searchParams.get("redirect") || "/";
      console.log("리다이렉트 URL:", redirectUrl);
      router.push(redirectUrl);
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setError(
        error.response?.data?.message ||
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderHelperLink = () => (
    <Link className="text-2xl text-primary-10" href="/">
      {step === "ID" ? "이메일을 잊으셨나요?" : "비밀번호를 잊으셨나요?"}
    </Link>
  );

  const handleGoogleLogin = () => {
    // 구글 로그인 페이지로 리다이렉트
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const renderSocialLogin = () => (
    <div className="flex items-center justify-between">
      <Link className="text-2xl text-coolGray-10" href="/">
        다른 계정으로 로그인하기
      </Link>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="cursor-pointer"
        disabled={isLoading}
      >
        <Image
          src="/icons/icon-google.svg"
          width={50}
          height={50}
          alt="구글 로그인 아이콘"
        />
      </button>
    </div>
  );

  const isID = step === "ID";

  return (
    <form
      onSubmit={handleSubmit(handleNextOrSubmit)}
      className="max-w-[37.5rem] w-full mx-auto flex flex-col gap-[4rem]"
    >
      {/* 에러 메시지 */}
      {error && (
        <div className="w-full mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* 입력 필드 */}
      <div className="w-full mx-auto flex flex-col gap-1">
        <input
          type={isID ? "email" : "password"}
          {...register(isID ? "email" : "password", {
            required: isID
              ? "이메일을 입력해주세요"
              : "비밀번호를 입력해주세요",
            pattern: isID
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식을 입력해주세요",
                }
              : undefined,
            minLength: isID
              ? undefined
              : {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다",
                },
          })}
          className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
          placeholder={
            isID ? "이메일을 입력해주세요" : "비밀번호를 입력해주세요"
          }
          disabled={isLoading}
        />
        {errors[isID ? "email" : "password"] && (
          <span className="text-red-500 text-sm mt-1">
            {errors[isID ? "email" : "password"]?.message}
          </span>
        )}
        {renderHelperLink()}
      </div>

      {/* 하단 버튼 및 추가 옵션 */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="bg-coolGray-40 h-[1px] w-full" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-2xl text-coolGray-30 cursor-pointer"
              onClick={handleStepToggle}
            >
              {isID ? "회원가입" : "이전으로"}
            </button>
            <button
              type="button"
              onClick={handleNextOrSubmit}
              disabled={isLoading}
              className="cursor-pointer text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : isID ? "다음" : "완료"}
            </button>
          </div>
        </div>
        {isID && renderSocialLogin()}
      </div>
    </form>
  );
}
