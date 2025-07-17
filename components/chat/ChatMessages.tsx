"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import Button from "../ui/button";
import { useMessageStore } from "@/lib/store/useMessageStore";
import { cn } from "@/lib/utils";

export default function ChatMessages({ chatId }: { chatId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { getMessages, isTyping } = useMessageStore();
  const allMessages = getMessages(chatId);

  const [visibleCount, setVisibleCount] = useState(20);

  // show latest 20, then 40...
  const messages = allMessages.slice(-visibleCount);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50); // or requestAnimationFrame
    return () => clearTimeout(timeout);
  }, [messages]);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto max-h-full px-4 py-6 space-y-4 no-scrollbar"
    >
      {messages?.map((msg, index) => (
        <div
          key={msg.id}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={cn("group w-fit", {
            "ml-auto": msg.role === "user",
            "mr-auto": msg.role === "ai",
          })}
        >
          <div
            className={cn("w-fit p-4 ", {
              "bg-violet-600 text-neutral-50 rounded-[24px_4px_24px_24px]":
                msg.role === "user",
              "bg-gray-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-50 rounded-[4px_24px_24px_24px]":
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
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(msg.content);
              toast.success("Copied!");
            }}
            className="opacity-0 group-hover:opacity-100 transition text-neutral-600 dark:text-neutral-400  !bg-transparent"
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
    </div>
  );
}
