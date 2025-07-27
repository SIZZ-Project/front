import ProfileInput from "@/shared/ui/ProfileInput";
import {useEffect, useState} from "react";
import defaultProfileImage from "@/../public/image/defaultImageProfile.svg";
import Image from "next/image";

interface ProfileForm {
    name: string;
    email: string;
    password: string;
    birth: string;
    gender: "남자" | "여자";
}

export default function ProfileForm() {
    useEffect(() => {
        fetch("/api/profile")
            .then((res) => res.json())
            .then((data: ProfileForm) => setForm({...data}))
            .catch((err) => console.log("프로필 로딩 실패",err));
    }, []);

    const [form, setForm] = useState<ProfileForm>({
        name: "이름예시",
        email: "email@sizz.com",
        password: "012345",
        birth: "1999.01.01",
        gender: "여자",
    });

    return(
        <div className="flex flex-col gap-3 w-150">
            <div>
                <Image src={defaultProfileImage} alt="profile" width={80} height={80} />
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <div className="flex flex-row w-[100%]">
                        <h3 className="font-bold">계정 정보</h3>
                        <div className="flex flex-row gap-3 ml-auto">
                            <button>취소</button>
                            <button className="rounded font-bold">완료</button>
                        </div>
                    </div>
                    <div className="bg-gray-400 w-[100%] h-[0.5px]"></div>
                </div>

                <div className="flex flex-col gap-3">
                    <ProfileInput label="이름" value={form.name} onChange={(val) => setForm({...form,name:val})} />
                    <ProfileInput label="메일" value={form.email} onChange={(val) => setForm({...form,email:val})} />
                    <ProfileInput label="비밀번호" value={form.password} onChange={(val) => setForm({...form,password:val})} />
                    <ProfileInput label="생년월일" value={form.birth} onChange={(val) => setForm({...form,birth:val})} />
                    <ProfileInput label="성별" value={form.gender} type="select" options={["남자","여자"]} onChange={(val) => setForm({ ...form,gender:val })} />
                </div>
            </div>
        </div>
    );
}