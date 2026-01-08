"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend?: () => void; // optional: auto-send after speech ends
  className?: string;
};

export function VoiceInputButton({ value, onChange, onSend, className }: Props) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    setIsSupported(Boolean(SpeechRecognition));

    if (!SpeechRecognition) return;

    const r = new SpeechRecognition();
    r.lang = "en-US"; // English-only support
    r.interimResults = true; // live transcript
    r.continuous = false; // stop after a pause

    r.onstart = () => setIsListening(true);

    r.onend = () => {
      setIsListening(false);
      // Auto-send if onSend is provided
      if (onSend && value.trim()) {
        setTimeout(() => onSend(), 100);
      }
    };

    r.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += transcript;
        else interimText += transcript;
      }

      // Update input with live + final
      const next = (value ? value + " " : "") + (finalText || interimText);
      onChange(next.trim());
    };

    recognitionRef.current = r;

    return () => {
      try {
        r.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSupported) return null;

  const start = async () => {
    // iOS/Safari sometimes needs a user gesture; button click counts.
    try {
      recognitionRef.current?.start();
    } catch {
      // ignore: start called twice
    }
  };

  const stop = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={() => (isListening ? stop() : start())}
      aria-label={isListening ? "Stop recording" : "Start voice input"}
      className={cn(
        "rounded-full bg-white/10 p-2.5 transition-all duration-200",
        "hover:bg-white/15 active:scale-95",
        isListening && "bg-red-500/20 hover:bg-red-500/30",
        className
      )}
    >
      {isListening ? (
        <Square className="h-4 w-4 text-white/80" />
      ) : (
        <Mic className="h-4 w-4 text-white/80" />
      )}
    </button>
  );
}

