import { ChatRequestOptions, Message } from "ai";
import { SendHorizontal, Trash } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface ChatInputProps extends HTMLAttributes<HTMLFormElement> {
  input: string;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  onClearChat?: () => void;
  isLoading: boolean;
  messages: Message[];
}

export default function ChatInput({
  input,
  handleSubmit,
  handleInputChange,
  setMessages,
  onClearChat,
  isLoading,
  messages,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-1.5 border-t px-2 py-2 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2.5"
    >
      <Button
        title="Clear chat"
        variant="outline"
        onClick={() => {
          setMessages([]);
          onClearChat?.();
        }}
        className="h-9 px-3 py-2 touch-target sm:h-10 sm:px-4 sm:py-2.5"
        disabled={messages.length === 0}
        type="button"
      >
        <Trash className="size-4 text-rose-500 sm:size-5" />
      </Button>
      <Input
        autoFocus
        placeholder="Ask something..."
        value={input}
        onChange={handleInputChange}
        className="h-8 text-base sm:h-9 sm:text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button
        title="Send message"
        variant="default"
        className="h-9 px-3 py-2 touch-target sm:h-10 sm:px-4 sm:py-2.5"
        disabled={input.length === 0}
        type="submit"
      >
        <SendHorizontal className="size-4 sm:size-5" />
      </Button>
    </form>
  );
}
