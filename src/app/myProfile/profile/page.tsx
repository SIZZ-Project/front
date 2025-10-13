"use client";

import Image from "next/image";
import ProfileForm from "./ProfileForm";

export default function MyProfile() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <Image
            src={"/image/SiZZ_logo.svg"}
            alt="logo"
            width={70}
            height={70}
          />
          <h2 className="text-7xl font-semibold">SIZZ</h2>
        </div>
        <p>Society insight, zooming zone</p>
      </div>
      <ProfileForm />
    </div>
  );
}
