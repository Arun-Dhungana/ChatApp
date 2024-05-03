import { ClerkLoaded, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ClerkLoading } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <div className=" flex h-screen items-center justify-center bg-gray-400">
      <ClerkLoading>Clerk is loading...</ClerkLoading>
      <ClerkLoaded>
        <SignUp
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#3b82f6" },
          }}
        ></SignUp>
      </ClerkLoaded>
    </div>
  );
}
