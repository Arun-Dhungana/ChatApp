import { UserResource } from "@clerk/types";
import MenuBar from "./menuBar";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import { useCallback, useEffect, useState } from "react";
import UserMenu from "./usersMenu";
interface ChatSideBarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}
export default function ChatSideBar({ user, show, onClose }: ChatSideBarProps) {
  const [userMenu, setUsersMenuOpen] = useState(false);
  useEffect(() => {
    if (!show) setUsersMenuOpen(false);
  }, [show]);
  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );
  return (
    <div
      className={`relative h-full w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}
    >
      {userMenu && (
        <UserMenu
          loggedInUser={user}
          onClose={() => setUsersMenuOpen(false)}
          onChannelSelected={() => {
            setUsersMenuOpen(false);
            onClose();
          }}
        ></UserMenu>
      )}
      <MenuBar onUserMenuClick={() => setUsersMenuOpen(true)} />

      <ChannelList
        filters={{ type: "messaging", members: { $in: [user.id] } }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: { filters: { members: { $in: [user.id] } } },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}
