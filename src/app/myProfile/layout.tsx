import { ReactNode } from "react";
import MyPageMenu from "./_components/MyPageMenu";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="absolute top-50 left-10">
        <MyPageMenu />
      </div>
      <div className="absolute top-60 left-90">{children}</div>
    </div>
  );
}
