"use client";

import { useState } from "react";
import { ImageIcon, Send } from "lucide-react";
import { useMessageStore } from "@/lib/store/useMessageStore";
import Button from "../ui/button";
import Input from "../ui/input";

export default function ChatInput({ chatId }: { chatId: string }) {
  const [input, setInput] = useState("");
  const { addUserMessage, addAiMessage, setIsTyping } = useMessageStore();

  const handleSend = () => {
    if (!input.trim()) return;

    const msg = input.trim();
    addUserMessage(chatId, msg);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = `This is a simulated reply to: "${msg}"`;
      addAiMessage(chatId, reply);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      addUserMessage(chatId, "", base64);

      setIsTyping(true);
      setTimeout(() => {
        addAiMessage(chatId, "That’s an interesting image! 📸");
        setIsTyping(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-700 p-4 flex items-center gap-2 bg-white dark:bg-gray-900">
      <label className="cursor-pointer text-gray-500 hover:text-black dark:hover:text-white">
        <ImageIcon size={18} />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white outline-none"
      />
      <Button
        onClick={handleSend}
        className="p-2 rounded-md bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
      >
        <Send size={18} />
      </Button>
    </div>
  );
}
