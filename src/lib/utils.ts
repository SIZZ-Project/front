import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 이름들을 조건에 따라 합치고 중복을 제거함.
 * - clsx: 조건부 클래스 병합
 * - twMerge: Tailwind 중복 클래스 제거
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs));
}