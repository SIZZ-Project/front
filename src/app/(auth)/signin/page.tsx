import { Suspense } from "react";
import Form from "./_components/Form";

function SignInForm() {
  return <Form />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
