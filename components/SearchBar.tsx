"use client";

import { useEffect, useState } from "react";

import { useChatStore } from "@/lib/store/useChatStore";
import Input from "./ui/input";

const SearchBar = () => {
  const { setSearch } = useChatStore();
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [value, setSearch]);

  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        placeholder="Search chatroom..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
