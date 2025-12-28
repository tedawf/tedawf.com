import { Message } from "ai";
import { Bot, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatPrompts from "./ChatPrompts";

interface ChatMessagesProps {
  messages: Message[];
  error: Error | undefined;
  isLoading: boolean;
  onPromptClick?: (prompt: string) => void;
}

export default function ChatMessages({
  messages,
  error,
  isLoading,
  onPromptClick,
}: ChatMessagesProps) {
  const isLastMessageUser = messages[messages.length - 1]?.role === "user";

  // Scroll to new messages automatically with smooth behavior
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      const scrollOptions: ScrollToOptions = {
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      };
      scrollRef.current.scrollTo(scrollOptions);
    }
  }, [messages]);

  return (
    <div
      className="h-full min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth p-2 sm:p-3"
      ref={scrollRef}
    >
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <ChatMessage message={msg} />
          </li>
        ))}
      </ul>

      {/* empty */}
      {!error && messages.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-3 sm:gap-3 sm:p-4">
          <Bot className="size-6 sm:size-8" />
          <p className="text-sm font-medium">
            Send a message to start the chat!
          </p>
          <p className="max-w-[200px] text-center text-xs text-muted-foreground sm:max-w-[250px]">
            You can ask the bot anything about me and it will help to find the
            relevant information!
          </p>
          {onPromptClick && <ChatPrompts onPromptClick={onPromptClick} />}
          <p className="text-center text-xs text-muted-foreground">
            Powered by{" "}
            <a
              href="https://github.com/tedawf/tacos"
              className="underline underline-offset-2 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              TACOS
            </a>
          </p>
        </div>
      )}

      {/* loading */}
      {isLoading && isLastMessageUser && (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-1.5 size-3 animate-spin text-muted-foreground" />
          <p className="text-center text-xs text-muted-foreground">
            Thinking...
          </p>
        </div>
      )}

      {/* error */}
      {error && (
        <p className="text-center text-xs text-rose-500">
          Something went wrong. Please try again! {error.message}
        </p>
      )}
    </div>
  );
}
