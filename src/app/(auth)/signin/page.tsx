import Link from "next/link";
import Header from "./_components/Header";
import Image from "next/image";
import LoginStep from "./_components/LoginStep";
import Form from "./_components/Form";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-[8.6875rem]">
      <Header />
      <Form />
    </div>
  );
}
