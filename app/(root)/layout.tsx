import ChatroomSidebarList from "@/components/ChatroomSidebarList";
import SearchBar from "@/components/SearchBar";
import SidebarHeader from "@/components/SidebarHeader";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen">
      <aside className="h-screen w-64 border-r border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex flex-col">
        <SidebarHeader />
        <div className="px-3 pt-2 pb-1">
          <SearchBar />
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-1">
          <ChatroomSidebarList />
        </div>
      </aside>
      {children}
    </main>
  );
};
export default RootLayout;
