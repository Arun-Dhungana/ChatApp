import Button from "@/components/Button";
import { MoveRight } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center bg-gray-400">
      <h1 className="text-black-500  mb-1 text-6xl font-extrabold">ChatApp</h1>
      <p className="mb-8 text-xl ">Makes life happier.</p>

      <Button as={Link} href="/chat">
        Start Chatting
        <MoveRight size={20}></MoveRight>
      </Button>
    </div>
  );
}
