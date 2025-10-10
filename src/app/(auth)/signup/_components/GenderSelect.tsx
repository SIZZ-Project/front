"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

interface CustomSelectProps {
  onChange: (value: string) => void;
  value?: string;
}

export default function GenderSelect({ onChange, value }: CustomSelectProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        style={{
          backgroundColor: "transparent",
          height: "6.25rem",
        }}
        className="w-full text-4xl py-6 border border-coolGray-10 rounded-xl pl-6"
      >
        <SelectValue placeholder="성별" />
      </SelectTrigger>
      <SelectContent
        style={{
          backgroundColor: "#21272A",
          zIndex: 1000,
        }}
      >
        <SelectGroup>
          <SelectLabel>성별</SelectLabel>
          {["여자", "남자"].map((value) => (
            <SelectItem
              key={value}
              style={{
                height: "66px",
                fontSize: "36px",
                color: "#C1C7CD",
              }}
              value={value}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
