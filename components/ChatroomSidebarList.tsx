"use client";

import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Button from "./ui/button";
import Input from "./ui/input";
import { useChatStore } from "@/lib/store/useChatStore";
import { toast } from "sonner";
import Link from "next/link";

export default function ChatroomSidebarList() {
  const { chatrooms, filteredChatrooms, deleteChatroom, renameChatroom } =
    useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

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
          className="flex items-center justify-between gap-2 px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition group"
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
              className="flex-1 bg-transparent text-sm text-neutral-800 dark:text-neutral-50 border-b border-neutral-300 dark:border-neutral-600 outline-none"
            />
          ) : (
            <Link href={`/chatroom/${chat.id}`} className="flex-1">
              <span className="truncate text-sm text-neutral-800 dark:text-neutral-50">
                {chat.title}
              </span>
            </Link>
          )}

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <Button
              type="button"
              onClick={() => {
                setEditingId(chat.id);
                setEditedTitle(chat.title);
              }}
              className="text-neutral-500 hover:text-blue-500"
              aria-label="Rename"
            >
              <Pencil size={14} />
            </Button>
            <Button
              type="button"
              onClick={() => handleDelete(chat.id)}
              className="text-neutral-500 hover:text-red-500"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
