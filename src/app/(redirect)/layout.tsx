import { ReactNode } from "react";

import Image from "next/image";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1720px] mx-auto">
      <div className="relative h-[979px]">
        <Image
          src="/image/S&L_Image.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {children}
    </div>
  );
}
