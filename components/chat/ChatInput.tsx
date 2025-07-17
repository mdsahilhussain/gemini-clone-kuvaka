"use client";

import { useState } from "react";
import { ImageUpIcon, SendHorizonalIcon } from "lucide-react";
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
    <div className="shadow-[0_-6px_12px_rgba(0,0,0,0.1)] w-full h-fit p-4 ring-1 ring-neutral-400 dark:ring-neutral-600 flex flex-col gap-2 mb-4 rounded-4xl ">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="focus-visible:ring-0 border-none outline-none"
      />
      <div className="w-[98%] mx-auto flex items-center justify-between">
        <label className="cursor-pointer text-gray-500 hover:text-black dark:hover:text-white">
          <ImageUpIcon size={18} />
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {input.trim() && (
          <Button onClick={handleSend} className="p-2 rounded-full">
            <SendHorizonalIcon size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
