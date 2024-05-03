import { useEffect, useState } from "react";
import { Channel, UserResponse } from "stream-chat";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { string } from "zod";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import useDebounce from "@/components/hooks/useDebounce";
import Button from "@/components/Button";
interface Anything {
  loggedInUser: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}
export default function UserMenu({
  loggedInUser,
  onChannelSelected,
  onClose,
}: Anything) {
  const { client, setActiveChannel } = useChatContext();
  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [moreUserLoading, setMoreUsersLoading] = useState(false);
  const [endosPagination, setendofPagination] = useState<boolean>();
  const [searchInput, setsearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);
  const pageSize = 2;
  useEffect(() => {
    async function loadInitialUsrs() {
      setUsers(undefined);
      setendofPagination(undefined);
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
            ...(searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {}),
          },
          { id: 1 },
          { limit: pageSize + 1 },
        );
        setUsers(response.users.slice(0, pageSize));
        setendofPagination(response.users.length <= pageSize);
      } catch (error) {
        alert("Error loading users");
      }
    }
    loadInitialUsrs();
  }, [client, searchInputDebounced, loggedInUser.id]);

  //function to load more users
  async function loadmoreUsers() {
    setMoreUsersLoading(true);

    try {
      const lastUserId = users?.[users.length - 1].id;
      if (!lastUserId) return;
      const response = await client.queryUsers(
        {
          $and: [
            { id: { $ne: loggedInUser.id } },
            { id: { $gt: lastUserId } },
            searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {},
          ],
        },
        { id: 1 },
        { limit: pageSize + 1 },
      );
      setUsers([...users, ...response.users.slice(0, pageSize)]);
      setendofPagination(response.users.length <= pageSize);
    } catch (error) {
      alert("Eror loading users");
    } finally {
      setMoreUsersLoading(false);
    }
  }

  //function for highlightinging active channel
  function handleChannelSelected(channel: Channel) {
    setActiveChannel(channel);
    onChannelSelected();
  }
  //Group chat
  async function startGroupChat(members: string[], name?: string) {
    try {
      const channel = client.channel("messaging", {
        members,
        name,
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      alert("Error creating channel.");
    }
  }

  //one-on-one Chat
  async function startChatWithUser(userId: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUser.id],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      alert("Error creating channel.");
    }
  }
  return (
    <div className="str-chat absolute z-10 h-full w-full overflow-y-auto border-e border-e-[#DBDDE1] bg-white dark:border-e-gray-800 dark:bg-[#17191c]">
      <div className="flex flex-col p-3">
        <span
          className="mb-2 flex cursor-pointer flex-row pe-1"
          onClick={onClose}
        >
          <ArrowLeft></ArrowLeft>User
        </span>
        <input
          type="search"
          placeholder="Search"
          className="rounded-full border border-gray-300 bg-transparent px-4 py-2 dark:border-gray-800 dark:text-white"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        ></input>
      </div>
      {selectedUsers.length > 0 && (
        <StartGroupChatHeader
          onConfirm={(name) =>
            startGroupChat([loggedInUser.id, ...selectedUsers], name)
          }
          onClearSelection={() => setSelectedUsers([])}
        ></StartGroupChatHeader>
      )}
      <div>
        {users?.map((userr) => (
          <UserResult
            key={userr.id}
            user={userr}
            onUserClicked={startChatWithUser}
            selected={selectedUsers.includes(userr.id)}
            onChangeSelected={(selected) =>
              setSelectedUsers(
                selected
                  ? [...selectedUsers, userr.id]
                  : selectedUsers.filter((userId) => userId !== userr.id),
              )
            }
          ></UserResult>
        ))}

        <div className="px-3">
          {!users && !searchInputDebounced && <LoadingUsers />}
          {!users && searchInputDebounced && "Searching ..."}
          {users?.length === 0 && <div>No users Found ...</div>}
        </div>
        {endosPagination === false && (
          <LoadingButton
            onClick={loadmoreUsers}
            loading={moreUserLoading}
            className=" mb-3 w-full bg-blue-600 text-black dark:bg-gray-700 dark:text-white"
          >
            Load more..
          </LoadingButton>
        )}
      </div>
    </div>
  );
}
interface UserResultsProps {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
  selected?: boolean;
  onChangeSelected: (selected: boolean) => void;
}
function UserResult({
  user,
  onUserClicked,
  selected,
  onChangeSelected,
}: UserResultsProps) {
  return (
    <button
      className="mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed] dark:hover:bg-[#1c1e22]"
      onClick={() => onUserClicked(user.id)}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChangeSelected(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        className="mx-1 scale-125"
      />
      <span>
        <Avatar
          image={user.image}
          name={user.name || user.id}
          size={40}
        ></Avatar>
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
  );
}
interface StartGroupChatHeader {
  onConfirm: (name?: string) => void;
  onClearSelection: () => void;
}
function StartGroupChatHeader({
  onConfirm,
  onClearSelection,
}: StartGroupChatHeader) {
  const [groupChatNameInput, setGroupChatNameInput] = useState("");
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white p-3 shadow-sm dark:bg-[#17191c]">
      <input
        placeholder="Group Name"
        className="rounded border border-gray-300 bg-transparent p-2 dark:border-gray-800 dark:text-white"
        value={groupChatNameInput}
        onChange={(e) => setGroupChatNameInput(e.target.value)}
      ></input>
      <div>
        <Button onClick={() => onConfirm(groupChatNameInput)} className="py-2">
          Start Group Chat
        </Button>
        <Button
          onClick={onClearSelection}
          className="bg-gray-400 py-2 active:bg-gray-500"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
}
