import { cn } from "@/lib/utils";
import React from "react";

const Button = ({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-2 rounded font-medium transition bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
