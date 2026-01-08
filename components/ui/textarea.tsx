import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-white dark:bg-[#1c1c1c] border border-[#313131] dark:border-[#414141] transition-all duration-200 text-white placeholder:text-[#999999]",
        "focus:border-[#313131] focus:outline-none focus-visible:border-[#313131] focus-visible:outline-none",
        "placeholder:text-[#999999] rounded-[10px]",
        "md:text-sm px-4 py-2",
        "cursor-text",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
