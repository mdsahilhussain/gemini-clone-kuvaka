"use client";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const chatId = params.id as string;
  return (
    <div className="chatroom-layout">
      <div className="chatroom-box">
        <ChatMessages chatId={chatId} />
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default Page;
