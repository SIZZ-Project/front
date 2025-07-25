"use client";

import { RootToaster } from "@/components/RootToaster";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <RootToaster max={3} />
    </>
  );
}
