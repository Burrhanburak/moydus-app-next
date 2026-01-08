"use client";

import { CornerRightUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";
import { VoiceInputButton } from "./VoiceInputButton";

interface AIInputProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  onSubmit?: (value: string) => void;
  className?: string;
  onFocus?: () => void;
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  className,
  onFocus,
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <Textarea
          id={id}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/5 rounded-full pl-6 pr-20",
            "placeholder:text-white/50",
            "border border-white/10",
            "text-white text-wrap",
            "overflow-y-auto resize-none",
            "focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-0",
            "transition-all duration-200 ease-out",
            "leading-[1.2] py-4 px-6",
            "min-h-[56px]",
            "max-h-[200px]",
            "[&::-webkit-resizer]:hidden", // Hide resizer
            "hover:border-white/20 focus:border-white/30",
            "shadow-lg shadow-black/20",
            "backdrop-blur-sm"
          )}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleReset();
            }
          }}
          onFocus={onFocus}
        />

        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 transition-all duration-200",
            inputValue ? "right-14 opacity-0 scale-95 pointer-events-none" : "right-2 opacity-100 scale-100"
          )}
        >
          <VoiceInputButton
            value={inputValue}
            onChange={setInputValue}
            onSend={handleReset}
          />
        </div>
        <button
          onClick={handleReset}
          type="button"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-2",
            "rounded-full bg-white/10 p-2.5",
            "transition-all duration-200",
            "hover:bg-white/15 active:scale-95",
            "cursor-pointer",
            inputValue
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <CornerRightUp className="w-4 h-4 text-white/80" />
        </button>
      </div>
    </div>
  );
}

