import defaultProfileImage from "@/../public/image/defaultImageProfile.svg";
import { genderOptions } from "@/constants/options";
import ProfileInput from "@/components/myProfile/profile/ProfileInput";
import Image from "next/image";
import { useEffect, useState } from "react";

type Gender = "미공개" | "남자" | "여자";

interface ProfileForm {
  name: string;
  email: string;
  password: string;
  birth: string;
  gender: Gender;
}

export default function ProfileForm() {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    password: "",
    birth: "",
    gender: "미공개",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data: ProfileForm) => setForm({ ...data }))
      .catch(() => {
        // 프로필 로딩 실패
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 w-150">
      <Image src={defaultProfileImage} alt="profile" width={80} height={80} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row w-full">
          <h3 className="font-bold">계정 정보</h3>
          <div className="flex flex-row gap-3 ml-auto">
            <button>취소</button>
            <button className="rounded font-bold">완료</button>
          </div>
        </div>
        <div className="bg-gray-400 w-full h-[0.5px]" />
        <div className="flex flex-col gap-3">
          <ProfileInput
            label="이름"
            value={form.name}
            onChange={(val) => setForm({ ...form, name: val })}
          />
          <ProfileInput
            label="메일"
            value={form.email}
            onChange={(val) => setForm({ ...form, email: val })}
          />
          <ProfileInput
            label="비밀번호"
            value={form.password}
            onChange={(val) => setForm({ ...form, password: val })}
          />
          <ProfileInput
            label="생년월일"
            value={form.birth}
            onChange={(val) => setForm({ ...form, birth: val })}
          />
          <ProfileInput
            label="성별"
            value={form.gender}
            type="select"
            options={genderOptions}
            onChange={(val) => setForm({ ...form, gender: val as Gender })}
          />
        </div>
      </div>
    </div>
  );
}
