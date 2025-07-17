"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import Button from "../ui/button";
import { useMessageStore } from "@/lib/store/useMessageStore";
import Image from "next/image";

export default function ChatMessages({ chatId }: { chatId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getMessages, isTyping } = useMessageStore();
  const allMessages = getMessages(chatId);

  const [visibleCount, setVisibleCount] = useState(20);

  const messages = allMessages.slice(-visibleCount); // show latest 20, then 40...

  // Load more on scroll to top
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollTop === 0 && visibleCount < allMessages.length) {
      setVisibleCount((prev) => Math.min(prev + 20, allMessages.length));
    }
  }, [visibleCount, allMessages.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className={clsx("group max-w-[80%] p-3 rounded-md relative", {
            "ml-auto bg-blue-600 text-white": msg.role === "user",
            "mr-auto bg-gray-200 dark:bg-gray-800 text-black dark:text-white":
              msg.role === "ai",
          })}
        >
          <p className="whitespace-pre-wrap">{msg.content}</p>
          {msg.image && (
            <Image
              src={msg.image}
              alt="uploaded"
              width={100}
              height={100}
              loading="lazy"
              className="mt-2 rounded max-w-xs border dark:border-gray-600"
            />
          )}
          <span className="block text-xs mt-1 text-gray-500 dark:text-gray-400">
            {formatTime(msg.timestamp)}
          </span>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(msg.content);
              toast.success("Copied!");
            }}
            className="absolute right-1 top-1 p-1 opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-black dark:hover:text-white"
          >
            <Copy size={14} />
          </Button>
        </div>
      ))}

      {isTyping && (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          Gemini is typing...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
