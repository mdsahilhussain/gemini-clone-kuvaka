"use client";
import { useState } from "react";

import SidebarHeader from "./SidebarHeader";
import ChatroomSidebarList from "./ChatroomSidebarList";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ui/theme-toggle";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside
      className={cn(
        "h-full bg-neutral-100 dark:bg-neutral-800 flex flex-col gap-2 px-4 py-12",
        "sm:w-fit",
        isExpanded && "absolute sm:relative w-[85%] z-10"
      )}
    >
      <SidebarHeader isExpanded={isExpanded} handler={toggleSidebar} />
      {isExpanded && (
        <div className="flex-1">
          <p className="text-sm text-neutral-800 dark:text-neutral-400 px-2 my-4">
            Recent
          </p>
          <div className="overflow-y-auto no-scrollbar">
            <ChatroomSidebarList />
          </div>
        </div>
      )}
      <ThemeToggle /> 
    </aside>
  );
};

export default Sidebar;
