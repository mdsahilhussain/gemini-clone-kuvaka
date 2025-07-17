import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Chatroom = {
  id: string
  title: string
  createdAt: string
}

type ChatStore = {
  chatrooms: Chatroom[]
  search: string
  addChatroom: (title: string) => void
  deleteChatroom: (id: string) => void
  renameChatroom: (id: string, newTitle: string) => void
  setSearch: (value: string) => void
  filteredChatrooms: () => Chatroom[]
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      search: '',
      addChatroom: (title) => {
        const newChat = {
          id: crypto.randomUUID(),
          title,
          createdAt: new Date().toISOString(),
        }
        set({ chatrooms: [newChat, ...get().chatrooms] })
      },
      deleteChatroom: (id) => {
        set({ chatrooms: get().chatrooms.filter((chat) => chat.id !== id) })
      },
      renameChatroom: (id, newTitle) => {
        set((state) => ({
          chatrooms: state.chatrooms.map((chat) =>
            chat.id === id ? { ...chat, title: newTitle } : chat
          ),
        }))
      },
      setSearch: (value) => set({ search: value }),
      filteredChatrooms: () => {
        const search = get().search.toLowerCase()
        return get().chatrooms.filter((chat) =>
          chat.title.toLowerCase().includes(search)
        )
      },
    }),
    {
      name: 'chat-storage', // localStorage key
    }
  )
)