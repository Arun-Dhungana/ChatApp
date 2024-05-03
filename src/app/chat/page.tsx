"use client";
import { useUser } from "@clerk/nextjs";
import ChatSideBar from "@/app/chat/chatSideBar";
import {
  Chat,
  Window,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  Streami18n,
} from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/components/hooks/useWindowSize";
import { mdBreakpoint } from "@/utils/tailwind";
import { useTheme } from "../ThemeProvider";

const isInstance = new Streami18n({ language: "en" });
export default function Page() {
  const { theme } = useTheme();
  const chatClient = useInitializeChatClient();
  const { user } = useUser();
  const [chatSideBarOpen, setIt] = useState(false);
  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;
  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) {
      setIt(false);
    }
  }, [windowSize.width]);
  const handleSideBarOnClose = useCallback(() => {
    setIt(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className=" mx-auto  flex h-screen w-screen min-w-[350px] max-w-[1600px] flex-col bg-gray-400 text-black shadow-sm dark:text-white xl:px-20 xl:py-8">
      <Chat
        client={chatClient}
        i18nInstance={isInstance}
        theme={
          theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
        }
      >
        <div className="flex h-full    flex-col md:flex-row">
          <div className=" flex justify-center border-b border-b-[#DBDDE1] p-3 dark:bg-black dark:text-white md:hidden">
            <button type="button" onClick={() => setIt(!chatSideBarOpen)}>
              {!chatSideBarOpen ? (
                <span className=" flex items-center gap-1 ">
                  <Menu />
                  Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <ChatSideBar
            user={user}
            show={isLargeScreen || chatSideBarOpen}
            onClose={handleSideBarOnClose}
          ></ChatSideBar>

          <div
            className={` w-full
              ${!chatSideBarOpen || isLargeScreen ? "block" : "hidden"}`}
          >
            <Channel>
              <Window hideOnThread={!isLargeScreen}>
                <ChannelHeader />

                <MessageList />
                <div className="  sticky bottom-0">
                  <MessageInput />
                </div>
              </Window>

              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
