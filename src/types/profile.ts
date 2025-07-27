export type Gender = "남자" | "여자" | "미공개";

export interface ProfileForm{
    name: string;
    email: string;
    password: string;
    birth: string;
    gender: Gender;
}