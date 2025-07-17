import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  image?: string;
  timestamp: string;
};

type MessageStore = {
  chats: Record<string, Message[]>;
  isTyping: boolean;
  setIsTyping: (val: boolean) => void;
  getMessages: (chatId: string) => Message[];
  addUserMessage: (chatId: string, content: string, image?: string) => void;
  addAiMessage: (chatId: string, content: string, image?: string) => void;
  clearMessages: (chatId: string) => void;
};

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      chats: {},
      isTyping: false,

      setIsTyping: (val) => set({ isTyping: val }),

      getMessages: (chatId) => get().chats[chatId] || [],

      addUserMessage: (chatId, content, image) => {
        const newMsg: Message = {
          id: crypto.randomUUID(),
          role: "user",
          content,
          image,
          timestamp: new Date().toISOString(),
        };

        const current = get().chats[chatId] || [];
        set({
          chats: {
            ...get().chats,
            [chatId]: [...current, newMsg],
          },
        });
      },

      addAiMessage: (chatId, content, image) => {
        const newMsg: Message = {
          id: crypto.randomUUID(),
          role: "ai",
          content,
          image,
          timestamp: new Date().toISOString(),
        };

        const current = get().chats[chatId] || [];
        set({
          chats: {
            ...get().chats,
            [chatId]: [...current, newMsg],
          },
        });
      },

      clearMessages: (chatId) => {
        const updated = { ...get().chats };
        delete updated[chatId];
        set({ chats: updated });
      },
    }),
    {
      name: "chat-messages-store",
    }
  )
);
