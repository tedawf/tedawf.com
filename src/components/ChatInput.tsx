"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { Textarea } from "./ui/Textarea";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function ChatInput({ className, ...props }: ChatInputProps) {
  const [input, setInput] = useState<string>("");

  return (
    <div {...props} className={cn("border-t", className)}>
      <div className="relative mt-4">
        <Textarea
          rows={2}
          placeholder="Write a message..."
          autoFocus
          className="resize-none border-none bg-muted"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}
