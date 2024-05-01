import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export default function SignInPage() {
  return (
    <div className=" flex h-screen items-center justify-center bg-gray-400">
      <SignUp
        appearance={{ baseTheme: dark, variables: { colorPrimary: "#3b82f6" } }}
      ></SignUp>
    </div>
  );
}
