import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      THis is Chat.
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
}
