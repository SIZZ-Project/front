import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1920px] min-w-[1280px] mx-auto">{children}</div>
  );
}
