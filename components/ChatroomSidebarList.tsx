"use client";

import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "./ui/button";
import Input from "./ui/input";
import { useChatStore } from "@/lib/store/useChatStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ChatroomSidebarList() {
  const router = useRouter();
  const { chatrooms, filteredChatrooms, deleteChatroom, renameChatroom } =
    useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelected = (id: string) => {
    setSelectedId(id);
    router.push(`/chatroom/${id}`);
  };
  const handleRename = (id: string, newTitle: string) => {
    const current = chatrooms.find((chat) => chat.id === id);
    if (!current || current.title === newTitle.trim()) {
      setEditingId(null);
      return;
    }

    renameChatroom(id, newTitle.trim());
    toast.success("Chat renamed!");
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteChatroom(id);
    toast.success("Chatroom deleted");
  };

  const chatList = filteredChatrooms();

  return (
    <div className="space-y-2">
      {chatList.map((chat) => (
        <div
          key={chat.id}
          className={cn(
            "flex items-center justify-between gap-2 p-2 rounded",
            "hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300 ease-in-out group/sidebarList",
            chat.id === selectedId && "bg-violet-500/50"
          )}
          onClick={() => handleSelected(chat.id)}
        >
          {editingId === chat.id ? (
            <Input
              type="text"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={() => handleRename(chat.id, editedTitle)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename(chat.id, editedTitle);
                if (e.key === "Escape") setEditingId(null);
              }}
              className="p-0 pl-2"
            />
          ) : (
            <span className="flex-1 truncate text-sm text-neutral-800 dark:text-neutral-50">
              {chat.title}
            </span>
          )}

          <div className="flex gap-2 opacity-0 group-hover/sidebarList:opacity-100 transition">
            <Button
              type="button"
              onClick={() => {
                setEditingId(chat.id);
                setEditedTitle(chat.title);
              }}
              className="p-1 !bg-transparent ring-1 ring-neutral-700 dark:ring-neutral-400"
              aria-label="Rename"
            >
              <Pencil size={14} className="text-yellow-600" />
            </Button>
            <Button
              type="button"
              onClick={() => handleDelete(chat.id)}
              className="p-1 !bg-transparent ring-1 ring-neutral-700 dark:ring-neutral-400"
              aria-label="Delete"
            >
              <Trash2 size={14} className="text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
