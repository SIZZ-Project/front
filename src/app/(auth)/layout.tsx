import { ReactNode } from "react";
import Header from "./_components/Logo";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-[6.25rem] pb-[16.125rem] gap-[8.6875rem]">
      <Header />
      {children}
    </div>
  );
}
