"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthApiClient from "@/api/UserApiClient";
import { AuthRequest } from "@/type";

type FormValues = {
  email: string;
  password: string;
};

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSignup = async () => {
    try {
      setIsLoading(true);

      const formData = getValues();

      // 임시 닉네임 생성 (이메일 앞부분 사용)
      const nickname = formData.email.split("@")[0];

      const signupData: AuthRequest = {
        email: formData.email,
        password: formData.password,
        nickname: nickname,
      };

      const authApi = AuthApiClient.getInstance();
      const response = await authApi.postAuthSignup(signupData);

      if (response.success) {
        toast.success("회원가입이 완료되었습니다!");
        router.push("/signin");
      } else {
        toast.error(response.message || "회원가입에 실패했습니다.");
      }
    } catch (error: unknown) {
      // 회원가입 실패
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "회원가입에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="max-w-[37.5rem] w-full mx-auto flex flex-col gap-[4rem]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <input
            type={"email"}
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            })}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="이메일@sizz.com"
            disabled={isLoading}
          />
          {errors.email && (
            <span className="text-red-500 text-sm ml-2">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type={"password"}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="비밀번호 입력"
            disabled={isLoading}
          />
          {errors.password && (
            <span className="text-red-500 text-sm ml-2">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-coolGray-40 h-[1px] w-full" />
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "회원가입"}
          </button>
        </div>
      </div>
    </form>
  );
}
