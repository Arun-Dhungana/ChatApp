import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { error } from "console";
import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export default function useInitializeChatClient() {
  const { user } = useUser();
  const [chatClient, setChatCLient] = useState<StreamChat | null>(null);
  useEffect(() => {
    if (!user?.id) return;
    const client = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);
    client
      .connectUser(
        {
          id: user.id,
          name: user.fullName || user.id,
          image: user.imageUrl,
        },
        async () => {
          const response = await fetch("/api/get-token");
          if (!response.ok) {
            throw Error("Failed to get token");
          }
          const body = await response.json();

          return body.token;
        },
      )
      .then(() => setChatCLient(client))
      .catch((error) => console.error("Failed to Connnect User"));
    return () => {
      setChatCLient(null);
      client
        .disconnectUser()
        .then(() => console.log("Connnection closed"))
        .catch((error) => console.error("Failed to disconnectUser"));
    };
  }, [user?.id, user?.fullName, user?.imageUrl]);
  return chatClient;
}
