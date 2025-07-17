"use client"

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/useThemeStore';

const ThemeInitializer = () => {
    const setTheme = useThemeStore((state) => state.setTheme);

    useEffect(() => {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
      if (saved === "dark" || (!saved && prefersDark)) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }, [setTheme]);
  
    return null; 
}

export default ThemeInitializer