"use client";

import { useThemeStore } from "@/lib/store/useThemeStore";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({className}:{className?: string}) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn("p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition w-fit", className)}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
