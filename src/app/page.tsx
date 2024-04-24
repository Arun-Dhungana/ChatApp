import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold text-blue-500 mb-1"></h1>
      <p className="mb-10">Live chat app.</p>
      <Button as={Link} href='/chat'> Start Chatting</Button>
    </div>
  );
}
