import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className=" flex h-screen items-center justify-center bg-gray-400">
      <SignIn
        appearance={{ baseTheme: dark, variables: { colorPrimary: "#3b82f6" } }}
      ></SignIn>
    </div>
  );
}
