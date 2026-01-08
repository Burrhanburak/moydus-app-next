import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

function CostumInput({ className, type, icon, ...props }: CustomInputProps) {
  return (
    <div
      className={cn(
        "group w-full h-[50px] flex items-center relative rounded-[10px]",
        "bg-white dark:bg-zinc-950  border border-[#d1d1d1] dark:border-[#313131]  dark:border-[#414141]",
        "focus-within:border-gray-400 dark:focus-within:border-white/10",
        "cursor-text",
        "text-white",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center pl-4 pr-2 pointer-events-none",
            "text-white"
          )}
        >
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "w-full h-full bg-transparent border-none outline-none",
          "text-white text-[16px] font-inter font-normal leading-[1.2em] tracking-[0em]",
          "placeholder:text-[#999999]",
          "overflow-hidden whitespace-nowrap text-ellipsis",
          "cursor-text",
          icon ? "px-2" : "px-4"
        )}
        {...props}
      />
    </div>
  );
}

export { CostumInput };
