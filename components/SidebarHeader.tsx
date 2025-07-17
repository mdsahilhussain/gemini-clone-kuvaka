"use client";

import { useChatStore } from "@/lib/store/useChatStore";
import { MenuIcon, SquarePenIcon } from "lucide-react";
import { toast } from "sonner";

import Button from "./ui/button";
import SearchBar from "./SearchBar";

export interface SidebarProps {
  isExpanded: boolean;
  handler: () => void;
}

const SidebarHeader = ({ isExpanded, handler }: SidebarProps) => {
  const { addChatroom } = useChatStore();

  const handleNewChat = () => {
    addChatroom("New Chat");
    toast.success("New chat created!");
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <MenuIcon
        size={18}
        className="text-neutral-800 dark:text-neutral-400"
        onClick={handler}
      />

      <Button
        onClick={handleNewChat}
        className="flex items-center justify-center gap-4 !bg-transparent !text-neutral-700 dark:!text-neutral-400"
      >
        <SquarePenIcon size={18} />
        {isExpanded && "New Chat"}
      </Button>
      {isExpanded && <SearchBar />}
    </div>
  );
};

export default SidebarHeader;
