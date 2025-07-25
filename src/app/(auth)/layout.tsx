import { ReactNode } from "react";
import Header from "./_components/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-[6.25rem] gap-[8.6875rem]">
      <Header />
      {children}
    </div>
  );
}
