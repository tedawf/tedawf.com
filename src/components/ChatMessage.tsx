import { cn } from "@/lib/utils";
import { Message } from "ai";
import { Bot } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({
  message: { role, content },
}: ChatMessageProps) {
  const isBot = role === "assistant";

  return (
    <div
      className={cn(
        "mb-2 flex items-start sm:mb-3",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      {isBot && <Bot className="mr-1.5 mt-0.5 size-4 sm:mr-2 sm:size-5" />}
      <div
        className={cn(
          "max-w-[200px] rounded border px-2 py-1.5 text-sm sm:max-w-64 sm:px-3 sm:py-2 sm:text-base",
          isBot ? "bg-background" : "bg-foreground text-background",
        )}
      >
        <Markdown
          components={{
            a: ({ node, href, ...props }) => (
              <Link
                href={href ?? ""}
                className="underline underline-offset-2"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mt-3 first:mt-0" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="mt-3 list-inside list-disc first:mt-0"
                {...props}
              />
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}
