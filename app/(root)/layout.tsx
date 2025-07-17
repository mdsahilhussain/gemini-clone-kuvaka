"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import Sidebar from "@/components/Sidebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { getSessionItem } = useSessionStorage();

  const token = typeof window !== "undefined" ? getSessionItem("token") : null;
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  return (
    <main className="flex w-full h-screen bg-neutral-50 dark:bg-neutral-900 relative">
      <Sidebar />
      {children}
    </main>
  );
};
export default RootLayout;
