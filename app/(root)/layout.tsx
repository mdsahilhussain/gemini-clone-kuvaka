import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-full h-screen bg-neutral-50 dark:bg-neutral-900 relative">
      <Sidebar />
      {children}
    </main>
  );
};
export default RootLayout;
