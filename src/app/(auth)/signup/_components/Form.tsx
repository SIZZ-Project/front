"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSeleect";
import toast from "react-hot-toast";

type FormValues = {
  lastName: string;
  firstName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  ssn: string;
  gender: string;
  email: string;
  password: string;
};

export default function Form() {
  const [step, setStep] = useState<"NAME" | "INFO" | "ACCOUNT">("NAME");

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      lastName: "",
      firstName: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      ssn: "",
      gender: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (step === "ACCOUNT") {
          console.log(data);
        }
      })}
      className="max-w-[37.5rem] w-full mx-auto flex flex-col gap-[4rem]"
    >
      {step === "NAME" && (
        <div className="flex flex-col gap-3">
          <input
            type={"text"}
            {...register("lastName")}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="성"
          />
          <input
            type={"text"}
            {...register("firstName")}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="이름"
          />
        </div>
      )}

      {step === "INFO" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <input
              type={"text"}
              {...register("birthYear")}
              className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
              placeholder="연"
            />
            <input
              type={"text"}
              {...register("birthMonth")}
              className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
              placeholder="월"
            />
            <input
              type={"text"}
              {...register("birthDay")}
              className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
              placeholder="일"
            />
          </div>
          <input
            type={"text"}
            {...register("ssn")}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="주민등록번호 앞 6자리"
          />
          <CustomSelect
            onChange={(value) => setValue("gender", value)}
            value={watch("gender")}
          />
        </div>
      )}

      {step === "ACCOUNT" && (
        <div className="flex flex-col gap-3">
          <input
            type={"text"}
            {...register("email")}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="이메일@sizz.com"
          />
          <input
            type={"password"}
            {...register("password")}
            className="bg-transparent border border-coolGray-10 rounded-xl w-full h-[6.25rem] text-4xl pl-6"
            placeholder="비밀번호 입력"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="bg-coolGray-40 h-[1px] w-full" />
        <div className="flex items-center justify-between">
          {step !== "NAME" ? (
            <button
              type="button"
              onClick={() =>
                setStep((prev) => (prev === "ACCOUNT" ? "INFO" : "NAME"))
              }
              className="text-2xl text-coolGray-30 cursor-pointer"
            >
              이전으로
            </button>
          ) : (
            <div />
          )}
          {step !== "ACCOUNT" ? (
            <button
              type="button"
              onClick={handleSubmit((data) => {
                if (step === "NAME") {
                  const isValidName =
                    data.lastName.trim() !== "" && data.firstName.trim() !== "";
                  if (!isValidName) {
                    toast.error("성을 포함한 이름을 모두 입력해주세요.");
                    return;
                  }
                  setStep("INFO");
                } else if (step === "INFO") {
                  const isValidBirth =
                    /^\d{4}$/.test(data.birthYear) &&
                    /^\d{2}$/.test(data.birthMonth) &&
                    /^\d{2}$/.test(data.birthDay);
                  const isValidSSN = /^\d{6}$/.test(data.ssn);
                  const isValidGender = !!data.gender;

                  if (!isValidBirth) {
                    toast.error(
                      "년도(0000), 월(00), 일(00)을 정확히 입력해주세요."
                    );
                    return;
                  }

                  if (!isValidSSN) {
                    toast.error("주민등록번호 앞 6자리를 입력해주세요.");
                    return;
                  }

                  if (!isValidGender) {
                    toast.error("성별을 선택해주세요.");
                    return;
                  }

                  setStep("ACCOUNT");
                }
              })}
              className="cursor-pointer text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center"
            >
              다음
            </button>
          ) : (
            <button
              type="submit"
              className="cursor-pointer text-2xl text-coolGray-10 bg-primary-30 w-[5.625rem] h-[3.75rem] rounded-xl flex items-center justify-center"
            >
              제출
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
