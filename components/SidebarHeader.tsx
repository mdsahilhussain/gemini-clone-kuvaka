"use client";

import { useChatStore } from "@/lib/store/useChatStore";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Button from "./ui/button";

export default function SidebarHeader() {
  const { addChatroom } = useChatStore();

  const handleNewChat = () => {
    addChatroom("New Chat");
    toast.success("New chat created!");
  };

  return (
    <div className="p-3">
      <Button
        onClick={handleNewChat}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-800 font-medium hover:opacity-90 transition"
      >
        <Plus size={18} /> New Chat
      </Button>
    </div>
  );
}
