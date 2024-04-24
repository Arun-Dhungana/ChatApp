import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp appearance={{ variables: { colorPrimary: "#3b82f6" } }}></SignUp>
    </div>
  );
}
