import LoadingButton from "@/components/LoadingButton";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowDownLeftFromCircleIcon, Settings2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div className=" flex h-screen items-center justify-center bg-gray-400">
      <ClerkLoading>
        <ArrowDownLeftFromCircleIcon size={35}></ArrowDownLeftFromCircleIcon>
        Clerk is loading...
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#3b82f6" },
          }}
        ></SignIn>
      </ClerkLoaded>
    </div>
  );
}
